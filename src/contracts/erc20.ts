import { Provider, TransactionResponse } from '@ethersproject/abstract-provider';
import { Signer } from '@ethersproject/abstract-signer';
import { BigNumber, BigNumberish, CallOverrides, Contract, PayableOverrides } from 'ethers';
import { ERC20_ABI } from '../constants/abi/erc20.js';
import { TransactionExecutor, executeTransaction } from '../helpers/execute.js';
import { unwrap } from '../helpers/result.js';

/**
 * A contract wrapper for a standard ERC20 token.
 */
export class ERC20 {

    protected contract: Contract;

    protected executor: TransactionExecutor;

    /**
     * Get the contract address.
     */
    get address (): string {

        return this.contract.address;
    }

    /**
     * Create an ERC20 contract instance.
     *
     * @param a - address of the deployed ERC20 contract
     * @param p - ethers provider or signer (for write methods a signer is needed)
     * @param e - a {@link TransactionExecutor} (can be swapped out, e.g. during testing)
     */
    constructor (a: string, p: Provider | Signer, e: TransactionExecutor = executeTransaction) {

        this.contract = new Contract(a, ERC20_ABI, p);
        this.executor = e;
    }

    async name (o: CallOverrides = {}): Promise<string> {

        return unwrap<string>(await this.contract.functions.name(o));
    }

    async symbol (o: CallOverrides = {}): Promise<string> {

        return unwrap<string>(await this.contract.functions.symbol(o));
    }

    async decimals (o: CallOverrides = {}): Promise<number> {

        return unwrap<number>(await this.contract.functions.decimals(o));
    }

    async totalSupply (o: CallOverrides = {}): Promise<string> {

        return unwrap<BigNumber>(await this.contract.functions.totalSupply(o)).toString();
    }

    async balanceOf (owner: string, o: CallOverrides = {}): Promise<string> {

        return unwrap<BigNumber>(await this.contract.functions.balanceOf(owner, o)).toString();
    }

    async allowance (owner: string, spender: string, o: CallOverrides = {}): Promise<string> {

        return unwrap<BigNumber>(await this.contract.functions.allowance(owner, spender, o)).toString();
    }

    async approve (spender: string, amount: BigNumberish, o: PayableOverrides = {}): Promise<TransactionResponse> {

        return await this.executor(
            this.contract,
            'approve',
            [
                spender,
                BigNumber.from(amount),
            ],
            o,
            false,
        );
    }

    async transfer (recipient: string, amount: BigNumberish, o: PayableOverrides = {}): Promise<TransactionResponse> {

        return await this.executor(
            this.contract,
            'transfer',
            [
                recipient,
                BigNumber.from(amount),
            ],
            o,
            false,
        );
    }

    async transferFrom (sender: string, recipient: string, amount: BigNumberish, o: PayableOverrides = {}): Promise<TransactionResponse> {

        return await this.executor(
            this.contract,
            'transferFrom',
            [
                sender,
                recipient,
                BigNumber.from(amount),
            ],
            o,
            false,
        );
    }
}
