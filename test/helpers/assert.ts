/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import assert from 'assert';
import { TransactionResponse } from '@ethersproject/abstract-provider';
import { CallOverrides, PayableOverrides } from 'ethers';
import { IlluminateContract, TypedContractResult, mockMethod, mockResponse } from './mock.js';

type Keys<C extends IlluminateContract> = Extract<keyof C, string>;

type Arguments<C extends IlluminateContract, K extends Keys<C>> = C[K] extends (...args: any[]) => Promise<any> ? Parameters<C[K]> : never;

type Result<C extends IlluminateContract, K extends Keys<C>> = C[K] extends (...args: any[]) => Promise<infer R> ? R : never;

/**
 * A test helper to assert the correctness of the arguments passed to a contract method.
 *
 * @param args - the arguments passed to the contract method
 * @param expected - the expected arguments passed to the contract method
 */
export const assertArguments = (args: any[], expected: any[]) => {

    // assert the correct amount of arguments were passed
    assert.strictEqual(args.length, expected.length);

    // assert the arguments are being converted correctly
    assert.deepStrictEqual(args, expected);
};

/**
 * A test helper for contract methods.
 *
 * @remarks
 * This helper mocks the contract method with the specified mock results and asserts that
 * - the method exists on the contract's ABI
 * - the method converts the external arguments to internal arguments (i.e. string to BigNumber)
 * - the method unwraps/converts the internal ethers `Result` (https://docs.ethers.io/v5/api/utils/abi/interface/#Result) into the external result
 * - the method can be called with optional transaction overrides
 */
export const assertMethod = async <
    C extends IlluminateContract,
    K extends Keys<C>,
    A extends Arguments<C, K>,
    R extends Result<C, K>,
    RI extends unknown,
> (
    contract: C,
    methodName: K,
    internalArgs: unknown[],
    externalArgs: A,
    internalResult: TypedContractResult<RI>,
    externalResult: R,
    overrides: CallOverrides | PayableOverrides = {},
): Promise<void> => {

    // mock the internal ethers contract method
    const method = mockMethod<RI>(contract, methodName);
    // mock the method's internal return value
    method.resolves(internalResult);

    // call the external wrapper contract method with the external arguments
    let result = await (contract[methodName] as any)(...externalArgs) as R;

    // assert that the wrapper contract method correctly converts the internal return value
    assert.deepStrictEqual(result, externalResult);

    // assert the correct amount and conversion of arguments passed to the internal ethers contract method
    assertArguments(method.getCall(0).args, [...internalArgs, {}]);

    // call the external wrapper contract method a second time,
    // this time with transaction overrides

    result = await (contract[methodName] as any)(...externalArgs, overrides) as R;

    assert.deepStrictEqual(result, externalResult);

    assertArguments(method.getCall(1).args, [...internalArgs, overrides]);
};

/**
 * A test helper for contract getters.
 *
 * @remarks
 * Getters are argument-less methods which return a value.
 * We can use the {@link assertMethod} helper internally.
 */
export const assertGetter = async <
    C extends IlluminateContract,
    K extends Keys<C>,
    R extends Result<C, K>,
    RI extends unknown,
> (
    contract: C,
    methodName: K,
    internalResult: TypedContractResult<RI>,
    externalResult: R,
    overrides: CallOverrides = {},
): Promise<void> => {

    await assertMethod(
        contract,
        methodName,
        [],
        [] as unknown as Arguments<C, K>,
        internalResult,
        externalResult,
        overrides,
    );
};

/**
 * A test helper for contract transactions.
 *
 * @remarks
 * Transactions are methods which return a {@link TransactionResponse} object.
 * We can use the {@link assertMethod} helper internally.
 */
export const assertTransaction = async <
    C extends IlluminateContract,
    K extends Keys<C>,
    A extends Arguments<C, K>,
> (
    contract: C,
    methodName: K,
    internalArgs: unknown[],
    externalArgs: A,
    overrides: PayableOverrides = {},
): Promise<void> => {

    const response = mockResponse();

    await assertMethod(
        contract,
        methodName,
        internalArgs,
        externalArgs as unknown as Arguments<C, K>,
        response,
        response as Result<C, K>,
        overrides,
    );
};
