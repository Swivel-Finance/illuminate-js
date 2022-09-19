import { TransactionResponse } from '@ethersproject/abstract-provider';
import { Contract, PayableOverrides } from 'ethers';

/**
 * Interface for a method that executes transactions
 */
export interface TransactionExecutor {
    (c: Contract, m: string, a: unknown[], t?: PayableOverrides): Promise<TransactionResponse>;
}

/**
 * Execute a transaction safely.
 *
 * @remarks
 * This method ensures a transaction won't fail by simulating the transaction before executing it on-chain.
 * The simulation is done bey either calling `estimateGas` (for calls which don't provide a custom gas limit
 * through transaction overrides) or `callStatic` (for calls which do provide a custom gas limit) on the
 * contract before invoking the on-chain contract method.
 * Any errors during simulation are thrown and can be caught to extract (custom) error data by the consumer.
 *
 * @example
 * ```ts
 * try {
 *
 *   const principal = Principals.Illuminate;
 *   const underlying = '0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643';
 *   const maturity = '1685592000';
 *
 *   const contract = new ethers.Contract(REDEEMER_ADDRESS, REDEEMER_ABI, signer);
 *
 *   const response = await executeTransaction(contract, 'redeem', [principal, underlying, maturity]);
 *
 * } catch (error) {
 *
 *   // pass ethers' exception to the parseIlluminateError method to extract custom error data
 *   const customError = parseIlluminateError(error);
 * }
 * ```
 *
 * @param c - the contract instance
 * @param m - the method name
 * @param a - the method arguments array
 * @param o - optional transaction overrides (default: `{}`)
 * @returns an ethers {@link TransactionResponse} if successful, otherwise rejects with ethers' original error
 */
export const executeTransaction: TransactionExecutor = async (
    c: Contract,
    m: string,
    a: unknown[],
    o: PayableOverrides = {},
): Promise<TransactionResponse> => {

    const options: PayableOverrides = { ...o };

    if (options.gasLimit) {

        // with a gas limit, ethers will skip the `estimateGas` call
        // use `callStatic` to simulate tx and fail on any errors
        // then execute the tx with the provided gas options

        await c.callStatic[m](...a, options) as unknown;
    }

    // with no gas limit, ethers will do its default `estimateGas` call
    // just execute the tx as is (`estimateGas` will fail on custom errors)
    return await c.functions[m](...a, options) as TransactionResponse;
};
