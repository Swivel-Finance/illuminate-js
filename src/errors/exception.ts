import { utils } from 'ethers';
import { MARKETPLACE_ABI } from '../constants/abi/marketplace.js';
import { Exception, ExceptionResult, isStaticCallError, isUnpredictableGasLimitError, JsonRpcProviderError, MetaMaskProviderRpcError } from './types.js';

// swivel abi for decoding exception data
const ILLUMINATE_INTERFACE = new utils.Interface(MARKETPLACE_ABI);

// abi fragment name of the custom error
const ILLUMINATE_ERROR_FRAGMENT = 'Exception';

/**
 * Parses the custom error data from an `UNPREDICTABLE_GAS_LIMIT` or `CALL_EXCEPTION` error.
 *
 * @param e - an ethers error/rejection reason that may contain custom error data or a string representing the abi-encoded exception data
 * @returns an {@link Exception} if `errorOrData` contains custom error data, `undefined` otherwise
 *
 * @example
 */
export const parseException = (e: unknown): Exception | undefined => {

    const data = (typeof e === 'string')
        ? e
        : isUnpredictableGasLimitError(e)
            // extract custom error data from an unpredictable gas limit error - they are abi-encoded
            ? (e.error as JsonRpcProviderError)?.error?.error?.data ?? (e.error as MetaMaskProviderRpcError)?.data?.originalError?.data
            : undefined;

    if (data) {

        try {

            // parse custom error data from an abi-encoded data string
            const [code, amount, amountExpected, address, addressExpected] = ILLUMINATE_INTERFACE.decodeErrorResult(
                ILLUMINATE_ERROR_FRAGMENT,
                data,
            ) as ExceptionResult;

            return {
                code,
                amount,
                amountExpected,
                address,
                addressExpected,
            };

        } catch (error) {

            // if we can't successfully parse the error data, there wasn't a custom error
            // we can ignore that and return undefined
        }

    } else if (isStaticCallError(e)) {

        // extract custom error data from a `callStatic` call exception - they are parsed by ethers already
        const [code, amount, amountExpected, address, addressExpected] = e.errorArgs as ExceptionResult;

        return {
            code,
            amount,
            amountExpected,
            address,
            addressExpected,
        };
    }
};
