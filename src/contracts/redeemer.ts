import { Provider, TransactionResponse } from '@ethersproject/abstract-provider';
import { Signer } from '@ethersproject/abstract-signer';
import { BigNumber, BigNumberish, CallOverrides, Contract, PayableOverrides } from 'ethers';
import { ADAPTERS, REDEEMER_ABI } from '../constants/abi/index.js';
import { Principals } from '../constants/index.js';
import { TransactionExecutor, executeTransaction, unwrap } from '../helpers/index.js';

/**
 * The Redeemer contract wrapper.
 */
export class Redeemer {

    /**
     * A static map of overload signatures for the redeem method.
     *
     * @remarks
     * Ethers.js supports solidity function overloading by creating entries in the `Contract.functions` map
     * which carry the specific overloaded signature in the function name (that's because JS is not typed).
     * When we want to invoke a specific overload, we need to address the method by its full signature.
     *
     * NOTE: This needs to be manually updated if the the abi for the redeem method changes. We can't rely on
     * the order of method overloads in the generated abi to be stable in order to automatically create this map.
     * If the abi changes, tests should fail, as the generated method signatures from ethers should no longer
     * match these signatures here.
     *
     * NOTE: When the signatures change, the TS overloads need to be updated too, as well as the actual
     * `redeem` implementation which converts and passes arguments to the specific contract method overload.
     */
    static redeemSignatures = {
        position: 'redeem(address,uint256)',
        protocol: 'redeem(uint8,address,uint256,bytes)',
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
     * Create a Redeemer contract instance.
     *
     * @param a - address of the deployed Redeemer contract
     * @param p - ethers provider or signer (for write methods a signer is needed)
     * @param e - a {@link TransactionExecutor} (can be swapped out, e.g. during testing)
     */
    constructor (a: string, p: Provider | Signer, e: TransactionExecutor = executeTransaction) {

        this.contract = new Contract(a, REDEEMER_ABI, p);
        this.executor = e;
    }

    /**
     * Get the contract's hold time.
     *
     * @remarks
     * The hold time is the minimum wait before the admin may withdraw funds or change the fee rate.
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
     * Get the address of the deployed Marketplace contract.
     *
     * @param o - optional transaction overrides
     */
    async marketplace (o: CallOverrides = {}): Promise<string> {

        return unwrap<string>(await this.contract.functions.marketplace(o));
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
     * Get the address of the deployed Redeemer contract (this is this contract's address).
     *
     * @param o - optional transaction overrides
     */
    async redeemer (o: CallOverrides = {}): Promise<string> {

        return unwrap<string>(await this.contract.functions.redeemer(o));
    }

    /**
     * Get the contract's feenominator.
     *
     * @remarks
     * Determines the amount of fees paid on auto redemptions.
     *
     * @param o - optional transaction overrides
     */
    async feenominator (o: CallOverrides = {}): Promise<string> {

        return unwrap<BigNumber>(await this.contract.functions.feenominator(o)).toString();
    }

    /**
     * Get the contract's feeChange.
     *
     * @remarks
     * Represents a point in time when the `feenominator` may change.
     *
     * @param o - optional transaction overrides
     */
    async feeChange (o: CallOverrides = {}): Promise<string> {

        return unwrap<BigNumber>(await this.contract.functions.feeChange(o)).toString();
    }

    /**
     * Get the contract's MIN_FEENOMINATOR.
     *
     * @remarks
     * Represents a minimum that the `feenominator` must exceed.
     *
     * @param o - optional transaction overrides
     */
    async MIN_FEENOMINATOR (o: CallOverrides = {}): Promise<string> {

        return unwrap<BigNumber>(await this.contract.functions.MIN_FEENOMINATOR(o)).toString();
    }

    /**
     * Check if a market is paused.
     *
     * @remarks
     * Determines if a market's principal token can be redeemed.
     *
     * @param u - underlying address of the market
     * @param m - maturity timestamp of the market
     * @param o - optional transaction overrides
     */
    async paused (u: string, m: BigNumberish, o: CallOverrides = {}): Promise<boolean> {

        return unwrap<boolean>(await this.contract.functions.paused(u, BigNumber.from(m), o));
    }

    /**
     * Check how much underlying has been redeemed by a market.
     *
     * @param u - underlying address of the market
     * @param m - maturity timestamp of the market
     * @param o - optional transaction overrides
     */
    async holdings (u: string, m: BigNumberish, o: CallOverrides = {}): Promise<string> {

        return unwrap<BigNumber>(await this.contract.functions.holdings(u, BigNumber.from(m), o)).toString();
    }

    /**
     * Allows for external deposit of underlying for a market.
     *
     * @remarks
     * This is to be used in emergency situations where the redeem method is not functioning for a market.
     *
     * @param u - underlying address of the market
     * @param m - maturity timestamp of the market
     * @param a - amount of underlying to be deposited
     * @param o - optional transaction overrides
     */
    async depositHoldings (u: string, m: BigNumberish, a: BigNumberish, o: PayableOverrides = {}): Promise<TransactionResponse> {

        return await this.executor(
            this.contract,
            'depositHoldings',
            [
                u,
                BigNumber.from(m),
                BigNumber.from(a),
            ],
            o,
        );
    }

    /**
     * Redeem illuminate principal tokens for underlying.
     *
     * @remarks
     * Burns illuminate principal tokens and sends underlying to sender.
     *
     * @param p - illuminate's {@link Principals} identifier (`Principals.Illuminate`)
     * @param u - underlying address of the market
     * @param m - maturity timestamp of the market
     * @param d - protocol-specific data for the redeem method (not used, must be an empty array)
     * @param o - optional transaction overrides
     */
    redeem (p: Principals.Illuminate, u: string, m: BigNumberish, d?: never[], o?: PayableOverrides): Promise<TransactionResponse>;

    /**
     * Redeem principal tokens held by the Lender contract via its adapter.
     *
     * @remarks
     * Redeems protocol specific principal tokens and sends underlying to the Redeemer's `holdings`.
     *
     * @param p - a {@link Principals} identifier
     * @param u - underlying address of the market
     * @param m - maturity timestamp of the market
     * @param d - protocol-specific data for the redeem method
     * @param o - optional transaction overrides
     */
    redeem (p: Exclude<Principals, Principals.Illuminate>, u: string, m: BigNumberish, d?: unknown[], o?: PayableOverrides): Promise<TransactionResponse>;

    /**
     * Redeem principal tokens.
     *
     * @remarks
     * This method is overloaded to support both `redeem` signatures of the on-chain Redeemer contract:
     * - `redeem(address, uint256)` for redeeming ipts for underlying
     * - `redeem(uint8, address, uint256, bytes)` for redeeming pts from other protocols for holdings
     *
     * @param p - a {@link Principals} identifier
     * @param u - underlying address of the market
     * @param m - maturity timestamp of the market
     * @param d - protocol-specific data for the redeem method
     * @param o - optional transaction overrides
     */
    async redeem (p: Principals, u: string, m: BigNumberish, d: unknown[] = [], o: PayableOverrides = {}): Promise<TransactionResponse> {

        let method = '';
        let data = '';
        let params: unknown[] = [];
        let overrides: PayableOverrides = o;

        switch (p) {

            // when redeeming illuminate principal tokens, the sender's full iPT balance
            // will be redeemed and the redeemed underlying is returned to the sender
            case Principals.Illuminate:

                method = Redeemer.redeemSignatures.position;
                params = [
                    u,
                    BigNumber.from(m),
                ];
                break;

            // when redeeming principal tokens from other protocols, the Lender's balance
            // of the PT will be redeemed and the underlying is moved to the Redeemer's holdings
            default:

                method = Redeemer.redeemSignatures.protocol;
                data = ADAPTERS[p].redeem.encode(...d);
                params = [
                    p,
                    u,
                    BigNumber.from(m),
                    data,
                ];
                break;
        }

        return await this.executor(this.contract, method, params, overrides);
    }
}
