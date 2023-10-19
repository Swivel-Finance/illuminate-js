import { TransactionReceipt, TransactionResponse } from '@ethersproject/abstract-provider';
import { BigNumber, Contract, ContractFunction, PayableOverrides } from 'ethers';
import { SinonStub, stub } from 'sinon';
import { TransactionExecutor } from '../../src/helpers/index.js';
import { ERC20, Lender, MarketPlace, Redeemer, Strategy, StrategyRouter, Struct } from '../../src/index.js';

/**
 * The HOCs which are allowed to be stubbed.
 */
export type IlluminateContract = MarketPlace | Lender | Redeemer | Strategy | StrategyRouter | ERC20;

/**
 * A helper type to access the protected `contract` property on the HOCs.
 */
export type HasContract = {
    contract: Contract;
};

export type Tuple = unknown[];

/**
 * A helper type to define the return type of an ethers contract method.
 */
export type TypedContractResult<T = unknown> = T extends (TransactionResponse | Struct | Tuple) ? T : [T];

/**
 * A helper type to add a return type an ethers `Contract`'s `functions` object.
 */
export type TypedContractFunctions<T = unknown> = {
    [name: string]: ContractFunction<TypedContractResult<T>>;
};

/**
 * Mock a contract method of a higher order contract.
 *
 * @param c - the HOC to mock
 * @param m - the contract method to mock
 * @returns the mocked method as {@link SinonStub}
 */
export const mockMethod = <T = unknown> (c: IlluminateContract, m: string): SinonStub<unknown[], Promise<TypedContractResult<T>>> => {

    // clone the protected ethers contract to make it configurable
    const contract = clone((c as unknown as HasContract).contract);

    // stub the desired method on the cloned contract
    const mock = stub(contract.functions as TypedContractFunctions<T>, m);

    // replace the original ethers contract with the stubbed clone
    (c as unknown as HasContract).contract = contract;

    // return the mock method
    return mock;
};

/**
 * Mock a transaction response object.
 *
 * @param response - an optional partial transaction response
 */
export const mockResponse = (response?: Partial<TransactionResponse>): TransactionResponse => ({
    chainId: 1,
    confirmations: 1,
    data: '',
    from: '',
    gasLimit: BigNumber.from('1000'),
    hash: '0xresponse',
    nonce: 1,
    value: BigNumber.from('0'),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    wait: (c?: number) => Promise.resolve({} as TransactionReceipt),
    ...response,
});

/**
 * Clone an object to make a frozen or non-configurable object configurable again.
 *
 * @param o - the object to clone
 * @returns a configurable clone of the object
 */
export function clone<T = unknown> (o: T): T {

    if (Array.isArray(o)) {

        return o.map<unknown>(item => clone(item)) as unknown as T;
    }

    if (typeof o === 'object' && o !== null) {

        const result: Record<string, unknown> = {};

        for (const key in o) {

            result[key] = clone(o[key]);
        }

        return result as T;
    }

    return o;
}

/**
 * Create a mock transaction executor for tests.
 */
export const mockExecutor = (): TransactionExecutor => {

    return async (c: Contract, m: string, a: unknown[], o: PayableOverrides = {}) => {

        // the mocked executor will skip `callStatic` and `estimateGas` during tests and invoke
        // the mocked method immediately

        return await c.functions[m](...a, o) as TransactionResponse;
    };
};
