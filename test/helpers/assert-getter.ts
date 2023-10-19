/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import assert from 'assert';
import { CallOverrides } from 'ethers';
import { IlluminateContract, mockMethod } from './mock.js';

// TODO: remove this file once all tests are updated to use helpers from ./assert.ts

/**
 * A test helper for contract getters.
 *
 * @remarks
 * This helper mocks the contract getter with the specified mock result and asserts that
 * - the getter exists on the contract's ABI
 * - the getter unwraps the ethers `Result` (https://docs.ethers.io/v5/api/utils/abi/interface/#Result)
 * - the getter can be called with optional transaction overrides
 */
export const assertGetter = async <C extends IlluminateContract, K extends Extract<keyof C, string>, T extends (C[K] extends (...args: any[]) => Promise<infer R> ? R : never)> (
    contract: C,
    methodName: K,
    mockResult: T,
    overrides: CallOverrides,
): Promise<void> => {

    const getter = mockMethod(contract, methodName);
    getter.resolves([mockResult]);

    let result = await (contract[methodName] as any)() as T;

    assert.strictEqual(result, mockResult);

    let args = getter.getCall(0).args;

    assert.strictEqual(args.length, 1);

    let [passedOverrides] = args;

    assert.deepStrictEqual(passedOverrides, {});

    result = await (contract[methodName] as any)(overrides) as T;

    assert.strictEqual(result, mockResult);

    args = getter.getCall(1).args;

    assert.strictEqual(args.length, 1);

    [passedOverrides] = args;

    assert.deepStrictEqual(passedOverrides, overrides);
};
