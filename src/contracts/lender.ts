import { Provider, TransactionResponse } from '@ethersproject/abstract-provider';
import { Signer } from '@ethersproject/abstract-signer';
import { SignatureLike } from '@ethersproject/bytes';
import { BigNumber, BigNumberish, CallOverrides, Contract, PayableOverrides, utils } from 'ethers';
import { LENDER_ABI } from '../constants/abi/index.js';
import { Principals } from '../constants/index.js';
import { executeTransaction, parseOrder, TransactionExecutor, unwrap } from '../helpers/index.js';
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
        [Principals.Illuminate]: 'lend(uint8,address,uint256,uint256,address,uint256)',
        [Principals.Yield]: 'lend(uint8,address,uint256,uint256,address,uint256)',
        [Principals.Swivel]: 'lend(uint8,address,uint256,uint256[],address,(bytes32,uint8,address,address,bool,bool,uint256,uint256,uint256,uint256)[],(uint8,bytes32,bytes32)[],bool,uint256)',
        [Principals.Element]: 'lend(uint8,address,uint256,uint256,uint256,uint256,address,bytes32)',
        [Principals.Pendle]: 'lend(uint8,address,uint256,uint256,uint256,uint256)',
        [Principals.Tempus]: 'lend(uint8,address,uint256,uint256,uint256,uint256,address)',
        [Principals.Apwine]: 'lend(uint8,address,uint256,uint256,uint256,uint256,address)',
        [Principals.Sense]: 'lend(uint8,address,uint256,uint128,uint256,address,uint256,address)',
        [Principals.Notional]: 'lend(uint8,address,uint256,uint256,uint256)',
    };

    protected contract: Contract;

    protected executor: TransactionExecutor;

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
     * @param e - a {@link TransactionExecutor} (can be swapped out, e.g. during testing)
     */
    constructor (a: string, p: Provider | Signer, e: TransactionExecutor = executeTransaction) {

        this.contract = new Contract(a, LENDER_ABI, p);
        this.executor = e;
    }

    /**
     * Get the contract's hold time.
     *
     * @remarks
     * The hold time is the minimum amount of time the admin must wait before executing a withdrawal.
     *
     * @param o - optional transaction overrides
     */
    async HOLD (o: CallOverrides = {}): Promise<string> {

        return unwrap<BigNumber>(await this.contract.functions.HOLD(o)).toString();
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
     * Check if a principal is paused.
     *
     * @param p - a {@link Principals} identifier
     * @param o - optional transaction overrides
     */
    async paused (p: Principals, o: CallOverrides = {}): Promise<boolean> {

        return unwrap<boolean>(await this.contract.functions.paused(p, o));
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
     * Get the contract's feeChange
     *
     * @param o - optional transaction overrides
     */
    async feeChange (o: CallOverrides = {}): Promise<string> {

        return unwrap<BigNumber>(await this.contract.functions.feeChange(o)).toString();
    }

    /**
     * Get the contract's MIN_FEENOMINATOR
     *
     * @param o - optional transaction overrides
     */
    async MIN_FEENOMINATOR (o: CallOverrides = {}): Promise<string> {

        return unwrap<BigNumber>(await this.contract.functions.MIN_FEENOMINATOR(o)).toString();
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
     * Get the hold period for the withdrawal of an underlying token address.
     *
     * @param u - underlying token address
     * @param o - optional transaction overrides
     */
    async withdrawals (u: string, o: CallOverrides = {}): Promise<string> {

        return unwrap<BigNumber>(await this.contract.functions.withdrawals(u, o)).toString();
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

        return await this.executor(
            this.contract,
            'mint',
            [
                p,
                u,
                BigNumber.from(m),
                BigNumber.from(a),
            ],
            o,
        );
    }

    /**
     * Lend underlying on Illuminate.
     *
     * @param p - a {@link Principals} identifier
     * @param u - underlying address of the market
     * @param m - maturity timestamp of the market
     * @param a - amount of underlying tokens to lend
     * @param y - yieldspace pool that will execute the swap for the principal token
     * @param min - minimum amount of principal tokens to buy from the yieldspace pool
     * @param o - optional transaction overrides
     */
    lend (
        p: Principals.Illuminate,
        u: string,
        m: BigNumberish,
        a: BigNumberish,
        y: string,
        min: BigNumberish,
        o?: PayableOverrides,
    ): Promise<TransactionResponse>;

    /**
     * Lend underlying on Yield.
     *
     * @param p - a {@link Principals} identifier
     * @param u - underlying address of the market
     * @param m - maturity timestamp of the market
     * @param a - amount of underlying tokens to lend
     * @param y - yield pool that will execute the swap for the principal token
     * @param min - minimum amount of principal tokens to buy from the yieldspace pool
     * @param o - optional transaction overrides
     */
    lend (
        p: Principals.Yield,
        u: string,
        m: BigNumberish,
        a: BigNumberish,
        y: string,
        min: BigNumberish,
        o?: PayableOverrides,
    ): Promise<TransactionResponse>;

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
     * @param e - flag to indicate if returned funds should be swapped in yield pool
     * @param slippage - only used if e is true, the minimum amount for the yield pool swap on the premium
     * @param overrides - optional transaction overrides
     */
    lend (
        p: Principals.Swivel,
        u: string,
        m: BigNumberish,
        a: BigNumberish[],
        y: string,
        o: Order[],
        s: SignatureLike[],
        e: boolean,
        slippage: BigNumberish,
        overrides?: PayableOverrides,
    ): Promise<TransactionResponse>;

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
    lend (
        p: Principals.Element,
        u: string,
        m: BigNumberish,
        a: BigNumberish,
        r: BigNumberish,
        d: BigNumberish,
        e: string,
        i: string,
        o?: PayableOverrides,
    ): Promise<TransactionResponse>;

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
    lend (
        p: Principals.Pendle,
        u: string,
        m: BigNumberish,
        a: BigNumberish,
        r: BigNumberish,
        d: BigNumberish,
        o?: PayableOverrides,
    ): Promise<TransactionResponse>;

    /**
     * Lend underlying on Tempus.
     *
     * @param p - a {@link Principals} identifier
     * @param u - underlying address of the market
     * @param m - maturity timestamp of the market
     * @param a - amount of principal tokens to lend
     * @param r - minimum amount to return (this puts a cap on allowed slippage)
     * @param d - deadline timestamp by which the swap must be executed
     * @param x - tempus amm that executes the swap
     * @param o - optional transaction overrides
     */
    lend (
        p: Principals.Tempus,
        u: string,
        m: BigNumberish,
        a: BigNumberish,
        r: BigNumberish,
        d: BigNumberish,
        x: string,
        o?: PayableOverrides,
    ): Promise<TransactionResponse>;

    /**
     * Lend underlying on APWine.
     *
     * @param p - a {@link Principals} identifier
     * @param u - underlying address of the market
     * @param m - maturity timestamp of the market
     * @param a - amount of principal tokens to lend
     * @param r - minimum amount to return (this puts a cap on allowed slippage)
     * @param d - deadline timestamp by which the swap must be executed
     * @param x - apwine amm that executes the swap
     * @param o - optional transaction overrides
     */
    lend (
        p: Principals.Apwine,
        u: string,
        m: BigNumberish,
        a: BigNumberish,
        r: BigNumberish,
        d: BigNumberish,
        x: string,
        o?: PayableOverrides,
    ): Promise<TransactionResponse>;

    /**
     * Lend underlying on Sense.
     *
     * @param p - a {@link Principals} identifier
     * @param u - underlying address of the market
     * @param m - maturity timestamp of the market
     * @param a - amount of underlying tokens to lend (this is a 128 bit int)
     * @param r - minimum amount to return (this puts a cap on allowed slippage)
     * @param x - sense amm that executes the swap
     * @param s - sense's maturity for the given market
     * @param adapter - sense's adapter necessary to facilitate the swap
     * @param o - optional transaction overrides
     */
    lend (
        p: Principals.Sense,
        u: string,
        m: BigNumberish,
        a: BigNumberish,
        r: BigNumberish,
        x: string,
        s: BigNumberish,
        adapter: string,
        o?: PayableOverrides,
    ): Promise<TransactionResponse>;

    /**
     * Lend underlying on Notional.
     *
     * @param p - a {@link Principals} identifier
     * @param u - underlying address of the market
     * @param m - maturity timestamp of the market
     * @param a - amount of principal tokens to lend
     * @param r - minimum amount to return (this puts a cap on allowed slippage)
     * @param o - optional transaction overrides
     */
    lend (
        p: Principals.Notional,
        u: string,
        m: BigNumberish,
        a: BigNumberish,
        r: BigNumberish,
        o?: PayableOverrides,
    ): Promise<TransactionResponse>;

    async lend (
        p: Principals,
        u: string,
        m: BigNumberish,
        a1?: unknown,
        a2?: unknown,
        a3?: unknown,
        a4?: unknown,
        a5?: unknown,
        a6?: unknown,
        a7?: unknown,
    ): Promise<TransactionResponse> {

        let method = '';
        let params: unknown[] = [];
        let overrides: PayableOverrides = {};

        switch (p) {

            case Principals.Illuminate:

                method = Lender.lendSignatures[Principals.Illuminate];
                params = [
                    p,
                    u,
                    BigNumber.from(m),
                    BigNumber.from(a1),
                    a2,
                    BigNumber.from(a3),
                ];
                overrides = a4 as PayableOverrides ?? {};
                break;

            case Principals.Yield:

                method = Lender.lendSignatures[Principals.Yield];
                params = [
                    p,
                    u,
                    BigNumber.from(m),
                    BigNumber.from(a1),
                    a2,
                    BigNumber.from(a3),
                ];
                overrides = a4 as PayableOverrides ?? {};
                break;

            case Principals.Swivel:

                method = Lender.lendSignatures[Principals.Swivel];
                params = [
                    p,
                    u,
                    BigNumber.from(m),
                    (a1 as BigNumberish[]).map(amount => BigNumber.from(amount)),
                    a2,
                    (a3 as Order[]).map(order => parseOrder(order)),
                    (a4 as SignatureLike[]).map(signature => utils.splitSignature(signature)),
                    a5,
                    BigNumber.from(a6),
                ];
                overrides = a7 as PayableOverrides ?? {};
                break;

            case Principals.Element:

                method = Lender.lendSignatures[Principals.Element];
                params = [
                    p,
                    u,
                    BigNumber.from(m),
                    BigNumber.from(a1),
                    BigNumber.from(a2),
                    BigNumber.from(a3),
                    a4,
                    a5,
                ];
                overrides = a6 as PayableOverrides ?? {};
                break;

            case Principals.Pendle:

                method = Lender.lendSignatures[Principals.Pendle];
                params = [
                    p,
                    u,
                    BigNumber.from(m),
                    BigNumber.from(a1),
                    BigNumber.from(a2),
                    BigNumber.from(a3),
                ];
                overrides = a4 as PayableOverrides ?? {};
                break;

            case Principals.Tempus:

                method = Lender.lendSignatures[Principals.Tempus];
                params = [
                    p,
                    u,
                    BigNumber.from(m),
                    BigNumber.from(a1),
                    BigNumber.from(a2),
                    BigNumber.from(a3),
                    a4,
                ];
                overrides = a5 as PayableOverrides ?? {};
                break;

            case Principals.Apwine:

                method = Lender.lendSignatures[Principals.Apwine];
                params = [
                    p,
                    u,
                    BigNumber.from(m),
                    BigNumber.from(a1),
                    BigNumber.from(a2),
                    BigNumber.from(a3),
                    a4,
                ];
                overrides = a5 as PayableOverrides ?? {};
                break;

            case Principals.Sense:

                method = Lender.lendSignatures[Principals.Sense];
                params = [
                    p,
                    u,
                    BigNumber.from(m),
                    BigNumber.from(a1),
                    BigNumber.from(a2),
                    a3,
                    BigNumber.from(a4),
                    a5,
                ];
                overrides = a6 as PayableOverrides ?? {};
                break;

            case Principals.Notional:

                method = Lender.lendSignatures[Principals.Notional];
                params = [
                    p,
                    u,
                    BigNumber.from(m),
                    BigNumber.from(a1),
                    BigNumber.from(a2),
                ];
                overrides = a3 as PayableOverrides ?? {};
                break;
        }

        return await this.executor(
            this.contract,
            method,
            params,
            overrides,
        );
    }
}
