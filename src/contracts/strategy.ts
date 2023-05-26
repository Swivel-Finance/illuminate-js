import { Provider } from '@ethersproject/abstract-provider';
import { Signer } from '@ethersproject/abstract-signer';
import { BigNumber, CallOverrides, Contract } from 'ethers';
import { STRATEGY_ABI } from '../constants/abi/index.js';
import { StrategyState } from '../constants/strategy.js';
import { TransactionExecutor, executeTransaction, unwrap } from '../helpers/index.js';
import { ERC20 } from './erc20.js';

/**
 * The Strategy contract wrapper.
 */
export class Strategy extends ERC20 {

    /**
     * Create a Strategy contract instance.
     *
     * @param a - address of the deployed Strategy contract
     * @param p - ethers provider or signer (for write methods a signer is needed)
     * @param e - a {@link TransactionExecutor} (can be swapped out, e.g. during testing)
     */
    constructor (a: string, p: Provider | Signer, e: TransactionExecutor = executeTransaction) {

        super(a, p, e);

        this.contract = new Contract(a, STRATEGY_ABI, p);
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
     * Get the strategy's {@link StrategyState}.
     *
     * @param o - optional transaction overrides
     */
    async state (o: CallOverrides = {}): Promise<StrategyState> {

        return unwrap<number>(await this.contract.functions.state(o));
    }

    /**
     * Get the address of the pool that this strategy currently invests in.
     *
     * @param o - optional transaction overrides
     */
    async pool (o: CallOverrides = {}): Promise<string> {

        return unwrap<string>(await this.contract.functions.pool(o));
    }

    /**
     * Get the address of the base token for this strategy.
     *
     * @param o - optional transaction overrides
     */
    async base (o: CallOverrides = {}): Promise<string> {

        return unwrap<string>(await this.contract.functions.base(o));
    }

    /**
     * Get the address of the fy token for this strategy.
     *
     * @param o - optional transaction overrides
     */
    async fyToken (o: CallOverrides = {}): Promise<string> {

        return unwrap<string>(await this.contract.functions.fyToken(o));
    }

    /**
     * Get the current maturity for this strategy.
     *
     * @param o - optional transaction overrides
     */
    async maturity (o: CallOverrides = {}): Promise<string> {

        return unwrap<BigNumber>(await this.contract.functions.maturity(o)).toString();
    }

    /**
     * Get the amount of pool tokens held by this strategy.
     *
     * @remarks
     * The strategy holds pool (LP) tokens while in `INVESTED` state (base is provided to pool).
     *
     * @param o - optional transaction overrides
     */
    async poolCached (o: CallOverrides = {}): Promise<string> {

        return unwrap<BigNumber>(await this.contract.functions.poolCached(o)).toString();
    }

    /**
     * Get the amount of base tokens held by this strategy.
     *
     * @remarks
     * The strategy holds base tokens while in `DIVESTED` state (LP tokens are redeemed).
     *
     * @param o - optional transaction overrides
     */
    async baseCached (o: CallOverrides = {}): Promise<string> {

        return unwrap<BigNumber>(await this.contract.functions.baseCached(o)).toString();
    }

    /**
     * Get the amount of fy tokens held by this strategy.
     *
     * @remarks
     * This is usually 0, but in emergencies, the strategy might hold fy tokens.
     *
     * @param o - optional transaction overrides
     */
    async fyTokenCached (o: CallOverrides = {}): Promise<string> {

        return unwrap<BigNumber>(await this.contract.functions.fyTokenCached(o)).toString();
    }
}
