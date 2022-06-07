import { Provider } from '@ethersproject/abstract-provider';
import { Signer } from '@ethersproject/abstract-signer';
import { BigNumber, CallOverrides, Contract } from 'ethers';
import { LENDER_ABI } from '../constants/abi/index.js';
import { unwrap } from '../helpers/index.js';

export class Lender {

    protected contract: Contract;

    get address (): string {

        return this.contract.address;
    }

    constructor (address: string, provider: Provider | Signer) {

        this.contract = new Contract(address, LENDER_ABI, provider);
    }

    async admin (overrides: CallOverrides = {}): Promise<string> {

        return unwrap<string>(await this.contract.functions.admin(overrides));
    }

    async marketPlace (overrides: CallOverrides = {}): Promise<string> {

        return unwrap<string>(await this.contract.functions.marketPlace(overrides));
    }

    async swivelAddr (overrides: CallOverrides = {}): Promise<string> {

        return unwrap<string>(await this.contract.functions.swivelAddr(overrides));
    }

    async pendleAddr (overrides: CallOverrides = {}): Promise<string> {

        return unwrap<string>(await this.contract.functions.pendleAddr(overrides));
    }

    async tempusAddr (overrides: CallOverrides = {}): Promise<string> {

        return unwrap<string>(await this.contract.functions.tempusAddr(overrides));
    }

    async feenominator (overrides: CallOverrides = {}): Promise<string> {

        return unwrap<BigNumber>(await this.contract.functions.feenominator(overrides)).toString();
    }

    async fees (underlying: string, overrides: CallOverrides = {}): Promise<string> {

        return unwrap<BigNumber>(await this.contract.functions.fees(underlying, overrides)).toString();
    }
}
