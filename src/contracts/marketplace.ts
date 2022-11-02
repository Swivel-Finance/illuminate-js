import { Provider, TransactionResponse } from '@ethersproject/abstract-provider';
import { Signer } from '@ethersproject/abstract-signer';
import { BigNumber, BigNumberish, CallOverrides, Contract, PayableOverrides } from 'ethers';
import { MARKETPLACE_ABI } from '../constants/abi/index.js';
import { Principals } from '../constants/index.js';
import { executeTransaction, TransactionExecutor, unwrap } from '../helpers/index.js';

/**
 * The MarketPlace contract wrapper.
 */
export class MarketPlace {

    protected contract: Contract;

    protected executor: TransactionExecutor;

    /**
     * Get the contract address.
     */
    get address (): string {

        return this.contract.address;
    }

    /**
     * Create a MarketPlace contract instance.
     *
     * @param a - address of the deployed MarketPlace contract
     * @param p - ethers provider or signer
     * @param e - a {@link TransactionExecutor} (can be swapped out, e.g. during testing)
     */
    constructor (a: string, p: Provider | Signer, e: TransactionExecutor = executeTransaction) {

        this.contract = new Contract(a, MARKETPLACE_ABI, p);
        this.executor = e;
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
     * Get the address of the deployed Lender contract.
     *
     * @param o - optional transaction overrides
     */
    async lender (o: CallOverrides = {}): Promise<string> {

        return unwrap<string>(await this.contract.functions.lender(o));
    }

    /**
     * Get the address of the deployed Redeemer contract.
     *
     * @param o - optional transaction overrides
     */
    async redeemer (o: CallOverrides = {}): Promise<string> {

        return unwrap<string>(await this.contract.functions.redeemer(o));
    }

    /**
     * Get the principal token address for a market.
     *
     * @param u - underlying token address of the market
     * @param m - maturity timestamp of the market
     * @param p - a {@link Principals} identifier
     * @param o - optional transaction overrides
     */
    async markets (u: string, m: BigNumberish, p: Principals, o: CallOverrides = {}): Promise<string> {

        return unwrap<string>(await this.contract.functions.markets(u, BigNumber.from(m), p, o));
    }

    /**
     * Get the YieldSpace pool address for the MetaPrincipal token of a market.
     *
     * @param u - underlying token address of the market
     * @param m - maturity timestamp of the market
     * @param o - optional transaction overrides
     */
    async pools (u: string, m: BigNumberish, o: CallOverrides = {}): Promise<string> {

        return unwrap<string>(await this.contract.functions.pools(u, BigNumber.from(m), o));
    }

    // TODO: this one seems duplicated from illuminate-js perspective (it's the same as markets)
    /**
     * Get the principal token addresses for a market.
     *
     * @param u - underlying token address of the market
     * @param m - maturity timestamp of the market
     * @param p - a {@link Principals} identifier
     * @param o - optional transaction overrides
     */
    async token (u: string, m: BigNumberish, p: Principals, o: CallOverrides = {}): Promise<string> {

        return unwrap<string>(await this.contract.functions.token(u, BigNumber.from(m), p, o));
    }

    /**
     * Sell principal tokens for underlying tokens via the pool.
     *
     * @param u - address of the underlying asset
     * @param m - maturity timestamp of the market
     * @param a - amount of principal tokens to swap
     * @param s - slippage cap (minimum number of tokens that must be received)
     * @param o - optional transaction overrides
     */
    async sellPrincipalToken (u: string, m: BigNumberish, a: BigNumberish, s: BigNumberish, o: PayableOverrides = {}): Promise<TransactionResponse> {

        return await this.executor(
            this.contract,
            'sellPrincipalToken',
            [
                u,
                BigNumber.from(m),
                BigNumber.from(a),
                BigNumber.from(s),
            ],
            o,
        );
    }

    /**
     * Buy principal tokens for underlying tokens via the pool.
     *
     * @param u - address of the underlying asset
     * @param m - maturity timestamp of the market
     * @param a - amount of underlying tokens to swap
     * @param s - slippage cap (minimum number of tokens that must be received)
     * @param o - optional transaction overrides
     */
    async buyPrincipalToken (u: string, m: BigNumberish, a: BigNumberish, s: BigNumberish, o: PayableOverrides = {}): Promise<TransactionResponse> {

        return await this.executor(
            this.contract,
            'buyPrincipalToken',
            [
                u,
                BigNumber.from(m),
                BigNumber.from(a),
                BigNumber.from(s),
            ],
            o,
        );
    }

    /**
     * Sell underlying tokens for principal tokens via the pool.
     *
     * @param u - address of the underlying asset
     * @param m - maturity timestamp of the market
     * @param a - amount of underlying tokens to swap
     * @param s - slippage cap (minimum number of tokens that must be received)
     * @param o - optional transaction overrides
     */
    async sellUnderlying (u: string, m: BigNumberish, a: BigNumberish, s: BigNumberish, o: PayableOverrides = {}): Promise<TransactionResponse> {

        return await this.executor(
            this.contract,
            'sellUnderlying',
            [
                u,
                BigNumber.from(m),
                BigNumber.from(a),
                BigNumber.from(s),
            ],
            o,
        );
    }

    /**
     * Buy underlying tokens for principal tokens via the pool.
     *
     * @param u - address of the underlying asset
     * @param m - maturity timestamp of the market
     * @param a - amount of principal tokens to swap
     * @param s - slippage cap (minimum number of tokens that must be received)
     * @param o - optional transaction overrides
     */
    async buyUnderlying (u: string, m: BigNumberish, a: BigNumberish, s: BigNumberish, o: PayableOverrides = {}): Promise<TransactionResponse> {

        return await this.executor(
            this.contract,
            'buyUnderlying',
            [
                u,
                BigNumber.from(m),
                BigNumber.from(a),
                BigNumber.from(s),
            ],
            o,
        );
    }

    /**
     * Mint liquidity tokens in exchange for adding underlying and principal tokens.
     *
     * @param u - address of the underlying token
     * @param m - maturity timestamp of the principal token
     * @param b - amount of base tokens
     * @param p - amount of principal tokens
     * @param minRatio - minimum ratio of underlying to principal tokens in the pool
     * @param maxRatio - maximum ratio of underlying to principal tokens in the pool
     * @param o - optional transaction overrides
     */
    async mint (
        u: string,
        m: BigNumberish,
        b: BigNumberish,
        p: BigNumberish,
        minRatio: BigNumberish,
        maxRatio: BigNumberish,
        o: PayableOverrides = {},
    ): Promise<TransactionResponse> {

        return await this.executor(
            this.contract,
            'mint',
            [
                u,
                BigNumber.from(m),
                BigNumber.from(b),
                BigNumber.from(p),
                BigNumber.from(minRatio),
                BigNumber.from(maxRatio),
            ],
            o,
        );
    }

    /**
     * Mint liquidity tokens in exchange for adding only underlying tokens.
     *
     * @param u - address of the underlying token
     * @param m - maturity timestamp of the principal token
     * @param a - amount of underlying tokens
     * @param p - amount of principal tokens being bought in the pool
     * @param minRatio - minimum ratio of underlying to principal tokens in the pool
     * @param maxRatio - maximum ratio of underlying to principal tokens in the pool
     * @param o - optional transaction overrides
     */
    async mintWithUnderlying (
        u: string,
        m: BigNumberish,
        a: BigNumberish,
        p: BigNumberish,
        minRatio: BigNumberish,
        maxRatio: BigNumberish,
        o: PayableOverrides = {},
    ): Promise<TransactionResponse> {

        return await this.executor(
            this.contract,
            'mintWithUnderlying',
            [
                u,
                BigNumber.from(m),
                BigNumber.from(a),
                BigNumber.from(p),
                BigNumber.from(minRatio),
                BigNumber.from(maxRatio),
            ],
            o,
        );
    }

    /**
     * Burn liquidity tokens in exchange for underlying and principal tokens.
     *
     * @param u - address of the underlying token
     * @param m - maturity timestamp of the principal token
     * @param a - the amount of liquidity tokens to burn
     * @param minRatio - minimum ratio of underlying to principal tokens in the pool
     * @param maxRatio - maximum ratio of underlying to principal tokens in the pool
     * @param o - optional transaction overrides
     */
    async burn (
        u: string,
        m: BigNumberish,
        a: BigNumberish,
        minRatio: BigNumberish,
        maxRatio: BigNumberish,
        o: PayableOverrides = {},
    ): Promise<TransactionResponse> {

        return await this.executor(
            this.contract,
            'burn',
            [
                u,
                BigNumber.from(m),
                BigNumber.from(a),
                BigNumber.from(minRatio),
                BigNumber.from(maxRatio),
            ],
            o,
        );
    }

    /**
     * Burn liquidity tokens in exchange for underlying tokens.
     *
     * @param u - address of the underlying token
     * @param m - maturity timestamp of the principal token
     * @param a - the amount of liquidity tokens to burn
     * @param minRatio - minimum ratio of underlying to principal tokens in the pool
     * @param maxRatio - maximum ratio of underlying to principal tokens in the pool
     * @param o - optional transaction overrides
     */
    async burnForUnderlying (
        u: string,
        m: BigNumberish,
        a: BigNumberish,
        minRatio: BigNumberish,
        maxRatio: BigNumberish,
        o: PayableOverrides = {},
    ): Promise<TransactionResponse> {

        return await this.executor(
            this.contract,
            'burnForUnderlying',
            [
                u,
                BigNumber.from(m),
                BigNumber.from(a),
                BigNumber.from(minRatio),
                BigNumber.from(maxRatio),
            ],
            o,
        );
    }
}
