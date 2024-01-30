/**
 * Represents an ethers.js `Result` object, but adds support for typed tuples.
 *
 * {@link https://docs.ethers.io/v5/api/utils/abi/interface/#Result}
 */
export type Result<T extends unknown[]> = T;

/**
 * Unwrap an ethers.js `Result` object.
 *
 * @remarks
 * Use only for constract getters or methods which are read-only.
 * {@link https://docs.ethers.io/v5/api/contract/contract/#Contract--readonly}
 *
 * @param r - an ethers.js `Result` object
 * @returns - the unwrapped value of the `Result` object
 */
export const unwrap = <T> (result: unknown): T => {

    const value = result as Result<T extends unknown[] ? T : [T]>;
    const length = value.length;

    if (length <= 1) {

        return value[0] as T;
    }

    const unwrapped = [] as unknown[];

    for (let i = 0; i < length; i++) {

        unwrapped.push(value[i]);
    }

    return unwrapped as T;
};
