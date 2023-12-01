/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { utils } from 'ethers';

/**
 * Generic `Adapter` interface.
 *
 * @remarks
 * Each adapter on illuminate has a `lend` and `redeem` method, both of which require `bytes`-encoded input data to be
 * passed in. The `Adapter` interface contains `ParameterEncoder`s for encoding the input data for each adapter.
 */
export interface Adapter {
    lend: ParameterEncoder,
    redeem: ParameterEncoder,
}

/**
 * Parameter encoder interface.
 *
 * @remarks
 * Adapters require `bytes`-encoded input data to be passed to their `lend` and `redeem` methods. The `ParameterEncoder`
 * interface is used to encode the input data for each adapter.
 * Each parameter encoder has an `abi` property which is an array of strings representing the types of the parameters.
 * The `encode` method takes an array of arguments and returns a `bytes`-encoded string.
 */
export interface ParameterEncoder {
    /**
     * Array of strings representing the types of the parameters.
     */
    abi: string[];
    /**
     * Encode an array of arguments into a `bytes`-encoded string.
     *
     * @param args - the arguments to encode
     * @returns a `bytes`-encoded string
     */
    encode: (...args: any[]) => string;
}

/**
 * Default `lend` parameter encoder.
 *
 * @remarks
 * The default `lend` encoder accepts any arguments and returns an empty `bytes` encoded string.
 */
export const DEFAULT_LEND_ENCODER = {
    abi: [],
    encode (...args: any[]) {
        // encode empty bytes
        return utils.hexlify(utils.toUtf8Bytes(''));
    },
} satisfies ParameterEncoder;

/**
 * Default `redeem` parameter encoder.
 *
 * @remarks
 * The default `redeem` encoder accepts any arguments and returns an empty `bytes` encoded string.
 */
export const DEFAULT_REDEEM_ENCODER = {
    abi: [],
    encode (...args: any[]) {
        // encode empty bytes
        return utils.hexlify(utils.toUtf8Bytes(''));
    },
} satisfies ParameterEncoder;

/**
 * Parameter encoder for empty input data.
 */
export const EMPTY_PARAMETER_ENCODER = {
    abi: [],
    encode () {
        // encode empty bytes
        return utils.hexlify(utils.toUtf8Bytes(''));
    },
} satisfies ParameterEncoder;

// TODO: remove this when all adapters are implemented...

/**
 * Default `Adapter`.
 *
 * @remarks
 * The default adapter is used when an adapter is not yet implemented.
 */
export const DEFAULT_ADAPTER = {
    lend: DEFAULT_LEND_ENCODER,
    redeem: DEFAULT_REDEEM_ENCODER,
} satisfies Adapter;
