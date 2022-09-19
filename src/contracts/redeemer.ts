import { Provider, TransactionResponse } from '@ethersproject/abstract-provider';
import { Signer } from '@ethersproject/abstract-signer';
import { BigNumber, BigNumberish, CallOverrides, Contract, PayableOverrides } from 'ethers';
import { REDEEMER_ABI } from '../constants/abi/index.js';
import { Principals } from '../constants/index.js';
import { unwrap } from '../helpers/index.js';

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
        [Principals.Swivel]: 'redeem(uint8,address,uint256)',
        [Principals.Element]: 'redeem(uint8,address,uint256)',
        [Principals.Pendle]: 'redeem(uint8,address,uint256)',
        [Principals.Tempus]: 'redeem(uint8,address,uint256)',
        [Principals.Sense]: 'redeem(uint8,address,uint256,uint256)',
        [Principals.Apwine]: 'redeem(uint8,address,uint256)',
        [Principals.Notional]: 'redeem(uint8,address,uint256)',
    };

    protected contract: Contract;

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
     */
    constructor (a: string, p: Provider | Signer) {

        this.contract = new Contract(a, REDEEMER_ABI, p);
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
     * Get the contract's apwine address.
     *
     * @param o - optional transaction overrides
     */
    async apwineAddr (o: CallOverrides = {}): Promise<string> {

        return unwrap<string>(await this.contract.functions.apwineAddr(o));
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
     * Redeem illuminate principal tokens for underlying from Illuminate.
     *
     * @param u - underlying address of the market
     * @param m - maturity timestamp of the market
     * @param o - optional transaction overrides
     */
    redeem (p: Principals.Illuminate, u: string, m: BigNumberish, o?: PayableOverrides): Promise<TransactionResponse>;

    /**
     * Redeem underlying from Swivel, Yield, Element, Pendle, APWine, Tempus or Notional.
     *
     * @param p - a {@link Principals} identifier
     * @param u - underlying address of the market
     * @param m - maturity timestamp of the market
     * @param o - optional transaction overrides
     */
    redeem (
        p: Principals.Swivel | Principals.Yield | Principals.Element | Principals.Pendle | Principals.Apwine | Principals.Tempus | Principals.Notional,
        u: string,
        m: BigNumberish,
        o?: PayableOverrides,
    ): Promise<TransactionResponse>;

    /**
     * Redeem underlying from Sense.
     *
     * @param p - a {@link Principals} identifier
     * @param u - underlying address of the market
     * @param m - maturity timestamp of the market
     * @param s - sense's maturity for the given market (needed to extract the pt address)
     * @param o - optional transaction overrides
     */
    redeem (p: Principals.Sense, u: string, m: BigNumberish, s: string, o?: PayableOverrides): Promise<TransactionResponse>;

    async redeem (p: Principals, u: string, m: BigNumberish, a1?: unknown, a2?: unknown): Promise<TransactionResponse> {

        switch (p) {

            case Principals.Illuminate:

                return await this.contract.functions[Redeemer.redeemSignatures[Principals.Illuminate]](
                    u,
                    BigNumber.from(m),
                    a1 ?? {},
                ) as TransactionResponse;

            case Principals.Swivel:
            case Principals.Yield:
            case Principals.Element:
            case Principals.Pendle:
            case Principals.Apwine:
            case Principals.Tempus:
            case Principals.Notional:

                return await this.contract.functions[Redeemer.redeemSignatures[Principals.Swivel]](
                    p,
                    u,
                    BigNumber.from(m),
                    a1 ?? {},
                ) as TransactionResponse;

            case Principals.Sense:

                return await this.contract.functions[Redeemer.redeemSignatures[Principals.Sense]](
                    p,
                    u,
                    BigNumber.from(m),
                    BigNumber.from(a1),
                    a2 ?? {},
                ) as TransactionResponse;
        }
    }
}
