import { Provider, TransactionResponse } from '@ethersproject/abstract-provider';
import { Signer } from '@ethersproject/abstract-signer';
import { SignatureLike } from '@ethersproject/bytes';
import { BigNumber, BigNumberish, CallOverrides, Contract, PayableOverrides, utils } from 'ethers';
import { LENDER_ABI } from '../constants/abi/index.js';
import { Principals } from '../constants/principals.js';
import { parseOrder, unwrap } from '../helpers/index.js';
import { Order } from '../types/index.js';

/**
 * The Lender contract wrapper.
 */
export class Lender {

    /**
     * A static map of overload signatures for the lend method.
     *
     * @remarks
     * Ethers.js supports solidity function overloading by creating entries in the `Contract.functions` map
     * which carry the specific overloaded signature in the function name (that's because JS is not typed).
     * When we want to invoke a specific overload, we need to address the method by its full signature.
     *
     * NOTE: This needs to be manually updated if the the abi for the lend method changes. We can't rely on
     * the order of method overloads in the generated abi to be stable in order to automatically create this map.
     * If the abi changes, tests should fail, as the generated method signatures from ethers should no longer
     * match these signatures here.
     *
     * NOTE: When the signatures change, the TS overloads need to be updated too, as well as the actual
     * `lend` implementation which converts and passes arguments to the specific contract method overload.
     */
    static lendSignatures: Record<Principals, string> = {
        [Principals.Illuminate]: 'lend(uint8,address,uint256,uint256,address)',
        [Principals.Yield]: 'lend(uint8,address,uint256,uint256,address)',
        [Principals.Swivel]: 'lend(uint8,address,uint256,uint256[],address,(bytes32,address,address,bool,bool,uint256,uint256,uint256,uint256)[],(uint8,bytes32,bytes32)[])',
        [Principals.Element]: 'lend(uint8,address,uint256,uint256,uint256,uint256,address,bytes32)',
        [Principals.Pendle]: 'lend(uint8,address,uint256,uint256,uint256,uint256)',
        [Principals.Tempus]: 'lend(uint8,address,uint256,uint256,uint256,uint256,address,address)',
        [Principals.Sense]: 'lend(uint8,address,uint256,uint128,uint256,address,address)',
        [Principals.Apwine]: 'lend(uint8,address,uint256,uint256,uint256,address,uint256)',
        [Principals.Notional]: 'lend(uint8,address,uint256,uint256)',
    };

    protected contract: Contract;

    /**
     * Get the contract address.
     */
    get address (): string {

        return this.contract.address;
    }

    /**
     * Create a Lender contract instance.
     *
     * @param a - address of the deployed Lender contract
     * @param p - ethers provider or signer (for write methods a signer is needed)
     */
    constructor (a: string, p: Provider | Signer) {

        this.contract = new Contract(a, LENDER_ABI, p);
    }

    /**
     * Get the contract's admin address.
     *
     * @param o - optional transaction overrides
     */
    async admin (o: CallOverrides = {}): Promise<string> {

        return unwrap<string>(await this.contract.functions.admin(o));
    }

    /**
     * Get the contract's marketplace address.
     *
     * @param o - optional transaction overrides
     */
    async marketPlace (o: CallOverrides = {}): Promise<string> {

        return unwrap<string>(await this.contract.functions.marketPlace(o));
    }

    /**
     * Get the contract's swivel address.
     *
     * @param o - optional transaction overrides
     */
    async swivelAddr (o: CallOverrides = {}): Promise<string> {

        return unwrap<string>(await this.contract.functions.swivelAddr(o));
    }

    /**
     * Get the contract's pendle address.
     *
     * @param o - optional transaction overrides
     */
    async pendleAddr (o: CallOverrides = {}): Promise<string> {

        return unwrap<string>(await this.contract.functions.pendleAddr(o));
    }

    /**
     * Get the contract's tempus address.
     *
     * @param o - optional transaction overrides
     */
    async tempusAddr (o: CallOverrides = {}): Promise<string> {

        return unwrap<string>(await this.contract.functions.tempusAddr(o));
    }

    /**
     * Get the contract's feenominator.
     *
     * @param o - optional transaction overrides
     */
    async feenominator (o: CallOverrides = {}): Promise<string> {

        return unwrap<BigNumber>(await this.contract.functions.feenominator(o)).toString();
    }

    /**
     * Get the accrued fees for an underlying token address.
     *
     * @param u - underlying token address
     * @param o - optional transaction overrides
     */
    async fees (u: string, o: CallOverrides = {}): Promise<string> {

        return unwrap<BigNumber>(await this.contract.functions.fees(u, o)).toString();
    }

    /**
     * Swap principal tokens for Illuminate's zcTokens.
     *
     * @param p - a {@link Principals} identifier
     * @param u - underlying address of the market
     * @param m - maturity timestamp of the market
     * @param a - amount being minted
     * @param o - optional transaction overrides
     */
    async mint (p: Principals, u: string, m: BigNumberish, a: BigNumberish, o: PayableOverrides = {}): Promise<TransactionResponse> {

        return await this.contract.functions.mint(p, u, BigNumber.from(m), BigNumber.from(a), o) as TransactionResponse;
    }

    /**
     * Lend underlying on Illuminate.
     *
     * @param p - a {@link Principals} identifier
     * @param u - underlying address of the market
     * @param m - maturity timestamp of the market
     * @param a - amount of underlying tokens to lend
     * @param y - yield pool that will execute the swap for the principal token
     * @param o - optional transaction overrides
     */
    lend (p: Principals.Illuminate, u: string, m: BigNumberish, a: BigNumberish, y: string, o?: PayableOverrides): Promise<TransactionResponse>;

    /**
     * Lend underlying on Yield.
     *
     * @param p - a {@link Principals} identifier
     * @param u - underlying address of the market
     * @param m - maturity timestamp of the market
     * @param a - amount of underlying tokens to lend
     * @param y - yield pool that will execute the swap for the principal token
     * @param o - optional transaction overrides
     */
    lend (p: Principals.Yield, u: string, m: BigNumberish, a: BigNumberish, y: string, o?: PayableOverrides): Promise<TransactionResponse>;

    /**
     * Lend underlying on Swivel.
     *
     * @param p - a {@link Principals} identifier
     * @param u - underlying address of the market
     * @param m - maturity timestamp of the market
     * @param a - array of amounts of underlying tokens lent to each order in the orders array
     * @param y - yield pool
     * @param o - array of Swivel orders to fill
     * @param s - array of signatures for each order in the orders array
     * @param overrides - optional transaction overrides
     */
    lend (p: Principals.Swivel, u: string, m: BigNumberish, a: BigNumberish[], y: string, o: Order[], s: SignatureLike[], overrides?: PayableOverrides): Promise<TransactionResponse>;

    /**
     * Lend underlying on Element.
     *
     * @param p - a {@link Principals} identifier
     * @param u - underlying address of the market
     * @param m - maturity timestamp of the market
     * @param a - amount of principal tokens to lend
     * @param r - minimum amount to return (this puts a cap on allowed slippage)
     * @param d - deadline timestamp by which the swap must be executed
     * @param e - element pool to lend to
     * @param i - id of the pool
     * @param o - optional transaction overrides
     */
    lend (p: Principals.Element, u: string, m: BigNumberish, a: BigNumberish, r: BigNumberish, d: BigNumberish, e: string, i: string, o?: PayableOverrides): Promise<TransactionResponse>;

    /**
     * Lend underlying on Pendle.
     *
     * @param p - a {@link Principals} identifier
     * @param u - underlying address of the market
     * @param m - maturity timestamp of the market
     * @param a - amount of principal tokens to lend
     * @param r - minimum amount to return (this puts a cap on allowed slippage)
     * @param d - deadline timestamp by which the swap must be executed
     * @param o - optional transaction overrides
     */
    lend (p: Principals.Pendle, u: string, m: BigNumberish, a: BigNumberish, r: BigNumberish, d: BigNumberish, o?: PayableOverrides): Promise<TransactionResponse>;

    /**
     * Lend underlying on Tempus.
     *
     * @param p - a {@link Principals} identifier
     * @param u - underlying address of the market
     * @param m - maturity timestamp of the market
     * @param a - amount of principal tokens to lend
     * @param r - minimum amount to return (this puts a cap on allowed slippage)
     * @param d - deadline timestamp by which the swap must be executed
     * @param t - tempus pool that houses the underlying principal tokens
     * @param x - tempus amm that executes the swap
     * @param o - optional transaction overrides
     */
    lend (p: Principals.Tempus, u: string, m: BigNumberish, a: BigNumberish, r: BigNumberish, d: BigNumberish, t: string, x: string, o?: PayableOverrides): Promise<TransactionResponse>;

    /**
     * Lend underlying on Sense.
     *
     * @param p - a {@link Principals} identifier
     * @param u - underlying address of the market
     * @param m - maturity timestamp of the market
     * @param a - amount of underlying tokens to lend (this is a 128 bit int)
     * @param r - minimum amount to return (this puts a cap on allowed slippage)
     * @param x - sense amm that executes the swap
     * @param s - contract that holds the principal token for this market
     * @param o - optional transaction overrides
     */
    lend (p: Principals.Sense, u: string, m: BigNumberish, a: BigNumberish, r: BigNumberish, x: string, s: string, o?: PayableOverrides): Promise<TransactionResponse>;

    /**
     * Lend underlying on APWine.
     *
     * @param p - a {@link Principals} identifier
     * @param u - underlying address of the market
     * @param m - maturity timestamp of the market
     * @param a - amount of principal tokens to lend
     * @param r - minimum amount to return (this puts a cap on allowed slippage)
     * @param pool - address of a given APWine pool
     * @param i - id of the pool
     * @param o - optional transaction overrides
     */
    lend (p: Principals.Apwine, u: string, m: BigNumberish, a: BigNumberish, r: BigNumberish, pool: string, i: BigNumberish, o?: PayableOverrides): Promise<TransactionResponse>;

    /**
     * Lend underlying on Notional.
     *
     * @param p - a {@link Principals} identifier
     * @param u - underlying address of the market
     * @param m - maturity timestamp of the market
     * @param a - amount of principal tokens to lend
     * @param o - optional transaction overrides
     */
    lend (p: Principals.Notional, u: string, m: BigNumberish, a: BigNumberish, o?: PayableOverrides): Promise<TransactionResponse>;

    async lend (p: Principals, u: string, m: BigNumberish, a1?: unknown, a2?: unknown, a3?: unknown, a4?: unknown, a5?: unknown, a6?: unknown): Promise<TransactionResponse> {

        switch (p) {

            case Principals.Illuminate:

                return await this.contract.functions[Lender.lendSignatures[Principals.Illuminate]](
                    p,
                    u,
                    BigNumber.from(m),
                    BigNumber.from(a1),
                    a2,
                    a3 ?? {},
                ) as TransactionResponse;

            case Principals.Yield:

                return await this.contract.functions[Lender.lendSignatures[Principals.Yield]](
                    p,
                    u,
                    BigNumber.from(m),
                    BigNumber.from(a1),
                    a2,
                    a3 ?? {},
                ) as TransactionResponse;

            case Principals.Swivel:

                return await this.contract.functions[Lender.lendSignatures[Principals.Swivel]](
                    p,
                    u,
                    BigNumber.from(m),
                    (a1 as BigNumberish[]).map(amount => BigNumber.from(amount)),
                    a2,
                    (a3 as Order[]).map(order => parseOrder(order)),
                    (a4 as SignatureLike[]).map(signature => utils.splitSignature(signature)),
                    a5 ?? {},
                ) as TransactionResponse;

            case Principals.Element:

                return await this.contract.functions[Lender.lendSignatures[Principals.Element]](
                    p,
                    u,
                    BigNumber.from(m),
                    BigNumber.from(a1),
                    BigNumber.from(a2),
                    BigNumber.from(a3),
                    a4,
                    a5,
                    a6 ?? {},
                ) as TransactionResponse;

            case Principals.Pendle:

                return await this.contract.functions[Lender.lendSignatures[Principals.Pendle]](
                    p,
                    u,
                    BigNumber.from(m),
                    BigNumber.from(a1),
                    BigNumber.from(a2),
                    BigNumber.from(a3),
                    a4 ?? {},
                ) as TransactionResponse;

            case Principals.Tempus:

                return await this.contract.functions[Lender.lendSignatures[Principals.Tempus]](
                    p,
                    u,
                    BigNumber.from(m),
                    BigNumber.from(a1),
                    BigNumber.from(a2),
                    BigNumber.from(a3),
                    a4,
                    a5,
                    a6 ?? {},
                ) as TransactionResponse;

            case Principals.Sense:

                return await this.contract.functions[Lender.lendSignatures[Principals.Sense]](
                    p,
                    u,
                    BigNumber.from(m),
                    BigNumber.from(a1),
                    BigNumber.from(a2),
                    a3,
                    a4,
                    a5 ?? {},
                ) as TransactionResponse;

            case Principals.Apwine:

                return await this.contract.functions[Lender.lendSignatures[Principals.Apwine]](
                    p,
                    u,
                    BigNumber.from(m),
                    BigNumber.from(a1),
                    BigNumber.from(a2),
                    a3,
                    BigNumber.from(a4),
                    a5 ?? {},
                ) as TransactionResponse;

            case Principals.Notional:

                return await this.contract.functions[Lender.lendSignatures[Principals.Notional]](
                    p,
                    u,
                    BigNumber.from(m),
                    BigNumber.from(a1),
                    a2 ?? {},
                ) as TransactionResponse;
        }
    }
}
