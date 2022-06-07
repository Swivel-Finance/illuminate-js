import { Provider, TransactionResponse } from '@ethersproject/abstract-provider';
import { Signer } from '@ethersproject/abstract-signer';
import { SignatureLike } from '@ethersproject/bytes';
import { BigNumber, BigNumberish, CallOverrides, Contract, utils } from 'ethers';
import { LENDER_ABI } from '../constants/abi/index.js';
import { Principals } from '../constants/principals.js';
import { parseOrder, unwrap } from '../helpers/index.js';
import { Order } from '../types/index.js';

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

    get address (): string {

        return this.contract.address;
    }

    constructor (address: string, provider: Provider | Signer) {

        this.contract = new Contract(address, LENDER_ABI, provider);
    }

    async admin (overrides: CallOverrides = {}): Promise<string> {

        return unwrap<string>(await this.contract.functions.admin(overrides));
    }

    async marketPlace (overrides: CallOverrides = {}): Promise<string> {

        return unwrap<string>(await this.contract.functions.marketPlace(overrides));
    }

    async swivelAddr (overrides: CallOverrides = {}): Promise<string> {

        return unwrap<string>(await this.contract.functions.swivelAddr(overrides));
    }

    async pendleAddr (overrides: CallOverrides = {}): Promise<string> {

        return unwrap<string>(await this.contract.functions.pendleAddr(overrides));
    }

    async tempusAddr (overrides: CallOverrides = {}): Promise<string> {

        return unwrap<string>(await this.contract.functions.tempusAddr(overrides));
    }

    async feenominator (overrides: CallOverrides = {}): Promise<string> {

        return unwrap<BigNumber>(await this.contract.functions.feenominator(overrides)).toString();
    }

    async fees (underlying: string, overrides: CallOverrides = {}): Promise<string> {

        return unwrap<BigNumber>(await this.contract.functions.fees(underlying, overrides)).toString();
    }

    /**
     * Lend underlying on Illuminate.
     *
     * @param p - a {@link Principals} identifier
     * @param u - underlying address of the market
     * @param m - maturity timestamp of the market
     * @param a - amount of underlying tokens to lend
     * @param y - yield pool that will execute the swap for the principal token
     */
    lend (p: Principals.Illuminate, u: string, m: BigNumberish, a: BigNumberish, y: string): Promise<TransactionResponse>;

    /**
     * Lend underlying on Yield.
     *
     * @param p - a {@link Principals} identifier
     * @param u - underlying address of the market
     * @param m - maturity timestamp of the market
     * @param a - amount of underlying tokens to lend
     * @param y - yield pool that will execute the swap for the principal token
     */
    lend (p: Principals.Yield, u: string, m: BigNumberish, a: BigNumberish, y: string): Promise<TransactionResponse>;

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
     */
    lend (p: Principals.Swivel, u: string, m: BigNumberish, a: BigNumberish[], y: string, o: Order[], s: SignatureLike[]): Promise<TransactionResponse>;

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
     */
    lend (p: Principals.Element, u: string, m: BigNumberish, a: BigNumberish, r: BigNumberish, d: BigNumberish, e: string, i: string): Promise<TransactionResponse>;

    /**
     * Lend underlying on Pendle.
     *
     * @param p - a {@link Principals} identifier
     * @param u - underlying address of the market
     * @param m - maturity timestamp of the market
     * @param a - amount of principal tokens to lend
     * @param r - minimum amount to return (this puts a cap on allowed slippage)
     * @param d - deadline timestamp by which the swap must be executed
     */
    lend (p: Principals.Pendle, u: string, m: BigNumberish, a: BigNumberish, r: BigNumberish, d: BigNumberish): Promise<TransactionResponse>;

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
     */
    lend (p: Principals.Tempus, u: string, m: BigNumberish, a: BigNumberish, r: BigNumberish, d: BigNumberish, t: string, x: string): Promise<TransactionResponse>;

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
     */
    lend (p: Principals.Sense, u: string, m: BigNumberish, a: BigNumberish, r: BigNumberish, x: string, s: string): Promise<TransactionResponse>;

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
     */
    lend (p: Principals.Apwine, u: string, m: BigNumberish, a: BigNumberish, r: BigNumberish, pool: string, i: BigNumberish): Promise<TransactionResponse>;

    /**
     * Lend underlying on Notional.
     *
     * @param p - a {@link Principals} identifier
     * @param u - underlying address of the market
     * @param m - maturity timestamp of the market
     * @param a - amount of principal tokens to lend
     */
    lend (p: Principals.Notional, u: string, m: BigNumberish, a: BigNumberish): Promise<TransactionResponse>;

    async lend (p: Principals, u: string, m: BigNumberish, a1?: unknown, a2?: unknown, a3?: unknown, a4?: unknown, a5?: unknown): Promise<TransactionResponse> {

        switch (p) {

            case Principals.Illuminate:

                return await this.contract.functions[Lender.lendSignatures[Principals.Illuminate]](
                    p,
                    u,
                    BigNumber.from(m),
                    BigNumber.from(a1),
                    a2,
                ) as TransactionResponse;

            case Principals.Yield:

                return await this.contract.functions[Lender.lendSignatures[Principals.Yield]](
                    p,
                    u,
                    BigNumber.from(m),
                    BigNumber.from(a1),
                    a2,
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
                ) as TransactionResponse;

            case Principals.Pendle:

                return await this.contract.functions[Lender.lendSignatures[Principals.Pendle]](
                    p,
                    u,
                    BigNumber.from(m),
                    BigNumber.from(a1),
                    BigNumber.from(a2),
                    BigNumber.from(a3),
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
                ) as TransactionResponse;

            case Principals.Notional:

                return await this.contract.functions[Lender.lendSignatures[Principals.Notional]](
                    p,
                    u,
                    BigNumber.from(m),
                    BigNumber.from(a1),
                ) as TransactionResponse;
        }
    }
}
