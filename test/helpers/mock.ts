import { Contract, ContractFunction } from 'ethers';
import { SinonStub, stub } from 'sinon';
import { Result } from '../../src/helpers/result.js';
import { Lender, MarketPlace } from '../../src/index.js';

// TODO: add other HOCs later...
/**
 * The HOCs which are allowed to be stubbed.
 */
export type IlluminateContract = MarketPlace | Lender;

/**
 * A helper type to access the protected `contract` property on the HOCs.
 */
export type HasContract = {
    contract: Contract;
};

/**
 * A helper type to define the return type of an ethers contract method.
 */
export type TypedContractResult<T = unknown> = T extends unknown[] ? Result<T> : Result<[T]>;

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
export const mock = <T = unknown>(c: IlluminateContract, m: string): SinonStub<unknown[], Promise<TypedContractResult<T>>> => {

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
