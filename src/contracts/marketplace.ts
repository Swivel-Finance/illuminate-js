import { Provider } from '@ethersproject/abstract-provider';
import { Signer } from '@ethersproject/abstract-signer';
import { BigNumberish, CallOverrides, Contract } from 'ethers';
import { MARKETPLACE_ABI } from '../constants/abi/index.js';
import { unwrap } from '../helpers/index.js';

export type Markets = [string, string, string, string, string, string, string, string, string];

export class MarketPlace {

    protected contract: Contract;

    get address (): string {

        return this.contract.address;
    }

    constructor (address: string, provider: Provider | Signer) {

        this.contract = new Contract(address, MARKETPLACE_ABI, provider);
    }

    async admin (overrides: CallOverrides = {}): Promise<string> {

        return unwrap<string>(await this.contract.functions.admin(overrides));
    }

    async redeemer (overrides: CallOverrides = {}): Promise<string> {

        return unwrap<string>(await this.contract.functions.redeemer(overrides));
    }

    async markets (underlying: string, maturity: BigNumberish, overrides: CallOverrides = {}): Promise<Markets> {

        return unwrap<Markets>(await this.contract.functions.markets(underlying, maturity, overrides));
    }
}
