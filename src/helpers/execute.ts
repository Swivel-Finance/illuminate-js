import { TransactionResponse } from '@ethersproject/abstract-provider';
import { Contract, PayableOverrides } from 'ethers';
import { optimizeGas } from './optimize.js';

/**
 * Interface for a method that executes transactions
 */
export interface TransactionExecutor {
    /**
     * Execute a transaction safely.
     *
     * @param c - the contract instance
     * @param m - the method name
     * @param a - the method arguments array
     * @param t - optional transaction overrides (default: `{}`)
     * @param o - should `gasLimit` for this call be optimized (default: `true`)
     */
    (c: Contract, m: string, a: unknown[], t?: PayableOverrides, o?: boolean): Promise<TransactionResponse>;
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
 * @param t - optional transaction overrides (default: `{}`)
 * @param o - should `gasLimit` for this call be optimized (default: `true`)
 * @returns an ethers {@link TransactionResponse} if successful, otherwise rejects with ethers' original error
 */
export const executeTransaction: TransactionExecutor = async (
    c: Contract,
    m: string,
    a: unknown[],
    t: PayableOverrides = {},
    o = true,
): Promise<TransactionResponse> => {

    let options: PayableOverrides = { ...t };

    if (options.gasLimit) {

        // with a gas limit, ethers will skip the `estimateGas` call
        // use `callStatic` to simulate tx and fail on any errors
        // then execute the tx with the provided gas options

        await c.callStatic[m](...a, options) as unknown;

    } else {

        if (o) {

            // if gas should be optimized, run custom gas optimization
            // then execute tx with optimized gas options

            options = await optimizeGas(c, m, a, t);

        } else {

            // with no gas limit and no optimization, let ethers do its default `estimateGas` call
            // just execute the tx as is
        }
    }

    // with no gas limit, ethers will do its default `estimateGas` call
    // just execute the tx as is (`estimateGas` will fail on custom errors)
    return await c.functions[m](...a, options) as TransactionResponse;
};
