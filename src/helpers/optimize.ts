import { BigNumber, FixedNumber, Contract, PayableOverrides } from 'ethers';

/**
 * We want to add an additional 10% of gas to most transactions, as the `estimateGas` call
 * tends to underestimate the required gas.
 */
const GAS_LIMIT_MULTIPLIER = FixedNumber.from('1.1');

/**
 * A regular expression to remove trailing decimals from a number string.
 */
const TRAILING_DECIMALS = /\.\d*$/;

/**
 * Calculates a higher gas limit to prevent out-of-gas errors in certain situations.
 *
 * @param e - estimated gas for a contract call
 * @returns estimated gas plus buffer to prevent out-of-gas errors
 */
export const addGasLimitAdjustment = (e: BigNumber): BigNumber => {

    const gasLimit = FixedNumber.from(e).mulUnsafe(GAS_LIMIT_MULTIPLIER).round(0);

    return BigNumber.from(gasLimit.toString().replace(TRAILING_DECIMALS, ''));
};

/**
 * Creates a {@link PayableOverrides} object with an optimized gas limit.
 *
 * @param c - contract instance
 * @param m - method name on the contract
 * @param a - arguments for the contract method call
 * @param t - optional transaction overrides provided by the user
 * @returns a {@link PayableOverrides} object with an optimized gas limit for the specified call
 */
export const optimizeGas = async (
    c: Contract,
    m: string,
    a: unknown[],
    t: PayableOverrides = {},
): Promise<PayableOverrides> => {

    const options = { ...t };

    // user-provided `gasLimit` has precedence
    if (options.gasLimit) {

        return options;
    }

    // if `estimateGas` fails, we don't catch the error, as we want to
    // extract custom error data from the UNPREDICTABLE_GAS_LIMIT error
    const estimate = await c.estimateGas[m](...a, t);

    options.gasLimit = addGasLimitAdjustment(estimate);

    return options;
};
