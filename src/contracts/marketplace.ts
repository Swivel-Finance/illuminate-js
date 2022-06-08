import { Provider } from '@ethersproject/abstract-provider';
import { Signer } from '@ethersproject/abstract-signer';
import { BigNumber, BigNumberish, CallOverrides, Contract } from 'ethers';
import { MARKETPLACE_ABI } from '../constants/abi/index.js';
import { unwrap } from '../helpers/index.js';
import { Markets } from '../types/index.js';

/**
 * The MarketPlace contract wrapper.
 */
export class MarketPlace {

    protected contract: Contract;

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
     */
    constructor (a: string, p: Provider | Signer) {

        this.contract = new Contract(a, MARKETPLACE_ABI, p);
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
     * Get the contract's redeemer address.
     *
     * @param o - optional transaction overrides
     */
    async redeemer (o: CallOverrides = {}): Promise<string> {

        return unwrap<string>(await this.contract.functions.redeemer(o));
    }

    /**
     * Get the principal token addresses for a specified market.
     *
     * @param u - underlying token address of the market
     * @param m - maturity timestamp of the market
     * @param o - optional transaction overrides
     */
    async markets (u: string, m: BigNumberish, o: CallOverrides = {}): Promise<Markets> {

        return unwrap<Markets>(await this.contract.functions.markets(u, BigNumber.from(m), o));
    }
}
