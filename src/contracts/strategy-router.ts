import { Provider, TransactionResponse } from '@ethersproject/abstract-provider';
import { Signer } from '@ethersproject/abstract-signer';
import { BigNumber, BigNumberish, Contract, PayableOverrides } from 'ethers';
import { STRATEGY_ROUTER_ABI } from '../constants/abi/index.js';
import { TransactionExecutor, executeTransaction } from '../helpers/index.js';

/**
 * The StrategyRouter contract wrapper.
 */
export class StrategyRouter {

    protected contract: Contract;

    protected executor: TransactionExecutor;

    /**
     * Get the contract address.
     */
    get address (): string {

        return this.contract.address;
    }

    /**
     * Create a Redeemer contract instance.
     *
     * @param a - address of the deployed Redeemer contract
     * @param p - ethers provider or signer (for write methods a signer is needed)
     * @param e - a {@link TransactionExecutor} (can be swapped out, e.g. during testing)
     */
    constructor (a: string, p: Provider | Signer, e: TransactionExecutor = executeTransaction) {

        this.contract = new Contract(a, STRATEGY_ROUTER_ABI, p);
        this.executor = e;
    }

    /**
     * Mints shares to the user in exchange for base and principal tokens.
     *
     * @param strategy - address of the strategy being used to mint
     * @param assets - amount of base tokens to use to mint shares
     * @param pts - amount of principal tokens to use to mint shares
     * @param minRatio - minimum ratio used in pool's mint call
     * @param maxRatio - maximum ratio used in pool's mint call
     * @param o - optional transaction overrides
     */
    async mint (
        strategy: string,
        assets: BigNumberish,
        pts: BigNumberish,
        minRatio: BigNumberish,
        maxRatio: BigNumberish,
        o: PayableOverrides = {},
    ): Promise<TransactionResponse> {

        return await this.executor(
            this.contract,
            'mint',
            [
                strategy,
                BigNumber.from(assets),
                BigNumber.from(pts),
                BigNumber.from(minRatio),
                BigNumber.from(maxRatio),
            ],
            o,
        );
    }

    /**
     * Mints shares to the user in exchange for base.
     *
     * @param strategy - address of the strategy being used to mint
     * @param assets - amount of base tokens to use to buy principal tokens and mint shares
     * @param ptsToBuy - amount of principal tokens to buy
     * @param minRatio - minimum ratio used in pool's mint call
     * @param maxRatio - maximum ratio used in pool's mint call
     * @param o - optional transaction overrides
     */
    async mintWithUnderlying (
        strategy: string,
        assets: BigNumberish,
        ptsToBuy: BigNumberish,
        minRatio: BigNumberish,
        maxRatio: BigNumberish,
        o: PayableOverrides = {},
    ): Promise<TransactionResponse> {

        return await this.executor(
            this.contract,
            'mintWithUnderlying',
            [
                strategy,
                BigNumber.from(assets),
                BigNumber.from(ptsToBuy),
                BigNumber.from(minRatio),
                BigNumber.from(maxRatio),
            ],
            o,
        );
    }

    /**
     * Mints shares when strategy is divested.
     *
     * @param strategy - address of the strategy being used to mint
     * @param assets - amount of base tokens to use to mint shares
     * @param o - optional transaction overrides
     */
    async mintDivested (
        strategy: string,
        assets: BigNumberish,
        o: PayableOverrides = {},
    ): Promise<TransactionResponse> {

        return await this.executor(
            this.contract,
            'mintDivested',
            [
                strategy,
                BigNumber.from(assets),
            ],
            o,
        );
    }

    /**
     * Burns shares from the user and returns base and principal tokens.
     *
     * @param strategy - address of the strategy being used to burn
     * @param shares - amount of strategy shares to burn
     * @param minRatio - minimum ratio used in pool's burn call
     * @param maxRatio - maximum ratio used in pool's burn call
     * @param o - optional transaction overrides
     */
    async burn (
        strategy: string,
        shares: BigNumberish,
        minRatio: BigNumberish,
        maxRatio: BigNumberish,
        o: PayableOverrides = {},
    ): Promise<TransactionResponse> {

        return await this.executor(
            this.contract,
            'burn',
            [
                strategy,
                BigNumber.from(shares),
                BigNumber.from(minRatio),
                BigNumber.from(maxRatio),
            ],
            o,
        );
    }

    /**
     * Burns shares from the user and returns base.
     *
     * @param strategy - address of the strategy being used to burn
     * @param shares - amount of strategy shares to burn
     * @param minRatio - minimum ratio used in pool's burn call
     * @param maxRatio - maximum ratio used in pool's burn call
     * @param o - optional transaction overrides
     */
    async burnForUnderlying (
        strategy: string,
        shares: BigNumberish,
        minRatio: BigNumberish,
        maxRatio: BigNumberish,
        o: PayableOverrides = {},
    ): Promise<TransactionResponse> {

        return await this.executor(
            this.contract,
            'burnForUnderlying',
            [
                strategy,
                BigNumber.from(shares),
                BigNumber.from(minRatio),
                BigNumber.from(maxRatio),
            ],
            o,
        );
    }

    /**
     * Burns shares when strategy is divested.
     *
     * @param strategy - address of the strategy being used to burn
     * @param shares - amount of strategy shares to burn
     * @param o - optional transaction overrides
     */
    async burnDivested (
        strategy: string,
        shares: BigNumberish,
        o: PayableOverrides = {},
    ): Promise<TransactionResponse> {

        return await this.executor(
            this.contract,
            'burnDivested',
            [
                strategy,
                BigNumber.from(shares),
            ],
            o,
        );
    }
}
