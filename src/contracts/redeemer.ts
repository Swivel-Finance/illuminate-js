import { Provider, TransactionResponse } from '@ethersproject/abstract-provider';
import { Signer } from '@ethersproject/abstract-signer';
import { BigNumber, BigNumberish, CallOverrides, Contract, PayableOverrides } from 'ethers';
import { REDEEMER_ABI } from '../constants/abi/index.js';
import { Principals } from '../constants/index.js';
import { executeTransaction, TransactionExecutor, unwrap } from '../helpers/index.js';
import { Protocols } from '../types/index.js';

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
    static redeemSignatures: Record<Principals, string> = {
        [Principals.Illuminate]: 'redeem(address,uint256)',
        [Principals.Yield]: 'redeem(uint8,address,uint256)',
        [Principals.Element]: 'redeem(uint8,address,uint256)',
        [Principals.Pendle]: 'redeem(uint8,address,uint256)',
        [Principals.Tempus]: 'redeem(uint8,address,uint256)',
        [Principals.Apwine]: 'redeem(uint8,address,uint256)',
        [Principals.Notional]: 'redeem(uint8,address,uint256)',
        [Principals.Swivel]: 'redeem(uint8,address,uint256,uint8)',
        [Principals.Sense]: 'redeem(uint8,address,uint256,uint256,uint256,address)',
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
     * Get the contract's marketplace address.
     *
     * @param o - optional transaction overrides
     */
    async marketPlace (o: CallOverrides = {}): Promise<string> {

        return unwrap<string>(await this.contract.functions.marketPlace(o));
    }

    /**
     * Get the contract's lender address.
     *
     * @param o - optional transaction overrides
     */
    async lender (o: CallOverrides = {}): Promise<string> {

        return unwrap<string>(await this.contract.functions.lender(o));
    }

    /**
     * Get the contract's converter address.
     *
     * @remarks
     * Address that converts compounding tokens to their underlying, used by pendle's redeem.
     *
     * @param o - optional transaction overrides
     */
    async converter (o: CallOverrides = {}): Promise<string> {

        return unwrap<string>(await this.contract.functions.converter(o));
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
    async depositHoldings (u: string, m: BigNumberish, a: BigNumberish, o: CallOverrides = {}): Promise<TransactionResponse> {

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
     * Redeem illuminate principal tokens for underlying from Illuminate.
     *
     * @param u - underlying address of the market
     * @param m - maturity timestamp of the market
     * @param o - optional transaction overrides
     */
    redeem (p: Principals.Illuminate, u: string, m: BigNumberish, o?: PayableOverrides): Promise<TransactionResponse>;

    /**
     * Redeem underlying from Yield, Element, Pendle, APWine, Tempus or Notional.
     *
     * @param p - a {@link Principals} identifier
     * @param u - underlying address of the market
     * @param m - maturity timestamp of the market
     * @param o - optional transaction overrides
     */
    redeem (
        p: Principals.Yield | Principals.Element | Principals.Pendle | Principals.Apwine | Principals.Tempus | Principals.Notional,
        u: string,
        m: BigNumberish,
        o?: PayableOverrides,
    ): Promise<TransactionResponse>;

    /**
     * Redeem underlying from Swivel.
     *
     * @param p - a {@link Principals} identifier
     * @param u - underlying address of the market
     * @param m - maturity timestamp of the market
     * @param protocol - the {@link Protocols} identifier of the market
     * @param o - optional transaction overrides
     */
    redeem (
        p: Principals.Swivel,
        u: string,
        m: BigNumberish,
        protocol: Protocols,
        o?: PayableOverrides,
    ): Promise<TransactionResponse>;

    /**
     * Redeem underlying from Sense.
     *
     * @param p - a {@link Principals} identifier
     * @param u - underlying address of the market
     * @param m - maturity timestamp of the market
     * @param s - sense's maturity for the given market (needed to extract the pt address)
     * @param a - sense's adapter index for the given market (needed to conduct the swap)
     * @param periphery - sense's periphery contract (used to get the verified adapter)
     * @param o - optional transaction overrides
     */
    redeem (
        p: Principals.Sense,
        u: string,
        m: BigNumberish,
        s: BigNumberish,
        a: BigNumberish,
        periphery: string,
        o?: PayableOverrides,
    ): Promise<TransactionResponse>;

    async redeem (p: Principals, u: string, m: BigNumberish, a1?: unknown, a2?: unknown, a3?: unknown, a4?: unknown): Promise<TransactionResponse> {

        let method = '';
        let params: unknown[] = [];
        let overrides: PayableOverrides = {};

        switch (p) {

            case Principals.Illuminate:

                method = Redeemer.redeemSignatures[Principals.Illuminate];
                params = [
                    u,
                    BigNumber.from(m),
                ];
                overrides = a1 as PayableOverrides ?? {};
                break;

            case Principals.Yield:
            case Principals.Element:
            case Principals.Pendle:
            case Principals.Apwine:
            case Principals.Tempus:
            case Principals.Notional:

                method = Redeemer.redeemSignatures[p];
                params = [
                    p,
                    u,
                    BigNumber.from(m),
                ];
                overrides = a1 as PayableOverrides ?? {};
                break;

            case Principals.Swivel:

                method = Redeemer.redeemSignatures[p];
                params = [
                    p,
                    u,
                    BigNumber.from(m),
                    a1,
                ];
                overrides = a2 as PayableOverrides ?? {};
                break;

            case Principals.Sense:

                method = Redeemer.redeemSignatures[Principals.Sense];
                params = [
                    p,
                    u,
                    BigNumber.from(m),
                    BigNumber.from(a1),
                    BigNumber.from(a2),
                    a3,
                ];
                overrides = a4 as PayableOverrides ?? {};
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
