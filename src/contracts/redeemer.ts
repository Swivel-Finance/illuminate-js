import { Provider, TransactionResponse } from '@ethersproject/abstract-provider';
import { Signer } from '@ethersproject/abstract-signer';
import { BigNumber, BigNumberish, CallOverrides, Contract, PayableOverrides } from 'ethers';
import { REDEEMER_ABI } from '../constants/abi/index.js';
import { Principals } from '../constants/principals.js';
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
        [Principals.Illuminate]: 'redeem(uint8,address,uint256,address)',
        [Principals.Yield]: 'redeem(uint8,address,uint256)',
        [Principals.Swivel]: 'redeem(uint8,address,uint256)',
        [Principals.Element]: 'redeem(uint8,address,uint256)',
        [Principals.Pendle]: 'redeem(uint8,address,uint256,bytes32)',
        [Principals.Tempus]: 'redeem(uint8,address,uint256,address)',
        [Principals.Sense]: 'redeem(uint8,address,uint256,address,address)',
        [Principals.Apwine]: 'redeem(uint8,address,uint256,address)',
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
     * Redeem underlying from Swivel, Yield, Element or Notional.
     *
     * @param p - a {@link Principals} identifier
     * @param u - underlying address of the market
     * @param m - maturity timestamp of the market
     * @param o - optional transaction overrides
     */
    redeem (p: Principals.Swivel | Principals.Yield | Principals.Element | Principals.Notional, u: string, m: BigNumberish, o?: PayableOverrides): Promise<TransactionResponse>;

    /**
     * Redeem underlying from Illuminate, APWine or Tempus.
     *
     * @param p - a {@link Principals} identifier
     * @param u - underlying address of the market
     * @param m - maturity timestamp of the market
     * @param c - address of the controller or contract that manages the underlying token
     * @param o - optional transaction overrides
     */
    redeem (p: Principals.Illuminate | Principals.Apwine | Principals.Tempus, u: string, m: BigNumberish, c: string, o?: PayableOverrides): Promise<TransactionResponse>;

    /**
     * Redeem underlying from Pendle.
     *
     * @param p - a {@link Principals} identifier
     * @param u - underlying address of the market
     * @param m - maturity timestamp of the market
     * @param i - forge id used by pendle to redeem the underlying token
     * @param o - optional transaction overrides
     */
    redeem (p: Principals.Pendle, u: string, m: BigNumberish, i: string, o?: PayableOverrides): Promise<TransactionResponse>;

    /**
     * Redeem underlying from Sense.
     *
     * @param p - a {@link Principals} identifier
     * @param u - underlying address of the market
     * @param m - maturity timestamp of the market
     * @param c - sense contract that splits the loan's prinicpal and yield
     * @param d - sense contract that [c] calls into to adapt the underlying to sense
     * @param o - optional transaction overrides
     */
    redeem (p: Principals.Sense, u: string, m: BigNumberish, c: string, d: string, o?: PayableOverrides): Promise<TransactionResponse>;

    async redeem (p: Principals, u: string, m: BigNumberish, a1?: unknown, a2?: unknown, a3?: unknown): Promise<TransactionResponse> {

        switch (p) {

            case Principals.Swivel:
            case Principals.Yield:
            case Principals.Element:
            case Principals.Notional:

                return await this.contract.functions[Redeemer.redeemSignatures[Principals.Swivel]](
                    p,
                    u,
                    BigNumber.from(m),
                    a1 ?? {},
                ) as TransactionResponse;

            case Principals.Illuminate:
            case Principals.Apwine:
            case Principals.Tempus:

                return await this.contract.functions[Redeemer.redeemSignatures[Principals.Illuminate]](
                    p,
                    u,
                    BigNumber.from(m),
                    a1,
                    a2 ?? {},
                ) as TransactionResponse;

            case Principals.Pendle:

                return await this.contract.functions[Redeemer.redeemSignatures[Principals.Pendle]](
                    p,
                    u,
                    BigNumber.from(m),
                    a1,
                    a2 ?? {},
                ) as TransactionResponse;

            case Principals.Sense:

                return await this.contract.functions[Redeemer.redeemSignatures[Principals.Sense]](
                    p,
                    u,
                    BigNumber.from(m),
                    a1,
                    a2,
                    a3 ?? {},
                ) as TransactionResponse;
        }
    }
}
