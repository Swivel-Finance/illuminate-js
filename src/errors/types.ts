/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/quotes */
import { BigNumber } from 'ethers';
import { Principals, PRINCIPAL_NAMES } from '../constants/principals.js';

export const EXCEPTION = {
    0: {
        name: 'UNAUTHORIZED',
        message: (e: Exception): string => `Unauthorized.`,
    },
    1: {
        name: 'PAUSED',
        message: (e: Exception): string => `${ PRINCIPAL_NAMES[e.amount.toNumber() as Principals] } is paused.`,
    },
    2: {
        name: 'ARGUMENT.MATURITY',
        message: (e: Exception): string => `Incorrect maturity.`,
    },
    3: {
        name: 'ARGUMENT.UNDERLYING',
        message: (e: Exception): string => `Incorrect underlying.`,
    },
    4: {
        name: 'ARGUMENT.ARRAY_MISMATCH',
        message: (e: Exception): string => `Provided array lengths are not equal.`,
    },
    5: {
        name: 'MARKETPLACE.SET',
        message: (e: Exception): string => `MarketPlace already set.`,
    },
    6: {
        name: 'ARGUMENT.PRINCIPAL',
        message: (e: Exception): string => `Invalid principal.`,
    },
    7: {
        name: 'MARKET.UNMATURED',
        message: (e: Exception): string => `Market is not matured.`,
    },
    8: {
        name: 'LENDER.SET',
        message: (e: Exception): string => `Lender already set.`,
    },
    9: {
        name: 'MARKET.EXISTS',
        message: (e: Exception): string => `Market already exists.`,
    },
    10: {
        name: 'POOL.EXISTS',
        message: (e: Exception): string => `Pool already exists.`,
    },
    11: {
        name: 'LEND.PRINCIPAL',
        message: (e: Exception): string => `Principal tokens not received.`,
    },
    12: {
        name: 'LEND.YIELDSPACE',
        message: (e: Exception): string => `YieldSpace pool does not match principal token.`,
    },
    13: {
        name: 'LEND.UNDERLYING',
        message: (e: Exception): string => `Underlying tokens not received.`,
    },
    14: {
        name: 'LEND.FEE',
        message: (e: Exception): string => `Minimum fee not paid.`,
    },
    15: {
        name: 'REDEEM.ZCTOKEN',
        message: (e: Exception): string => `zcToken redemption failed.`,
    },
    16: {
        name: 'LEND.SLIPPAGE',
        message: (e: Exception): string => `Too much slippage.`,
    },
    17: {
        name: 'REDEEM.PAUSED',
        message: (e: Exception): string => `Redemption is paused on this market.`,
    },
    18: {
        name: 'WITHDRAWAL.SCHEDULE',
        message: (e: Exception): string => `Withdrawal is not scheduled.`,
    },
    19: {
        name: 'WITHDRAWAL.HOLD',
        message: (e: Exception): string => `Withdrawal is on hold.`,
    },
    20: {
        name: 'ALLOWANCE',
        message: (e: Exception): string => `Insufficient allowance.`,
    },
    21: {
        name: 'MARKET.MATURED',
        message: (e: Exception): string => `Market is past maturity.`,
    },
};


export type ExceptionCode = keyof typeof EXCEPTION;

export type ExceptionResult = [ExceptionCode, BigNumber, BigNumber, string, string];

/**
 * Interface for custom errors thrown by Swivel's contracts.
 */
export interface Exception {
    code: ExceptionCode;
    amount: BigNumber;
    amountExpected: BigNumber;
    address: string;
    addressExpected: string;
}

/**
 * Interface for transaction data attached to ethers errors.
 */
export interface TransactionDetails {
    // from address
    from: string;
    // to address
    to: string;
    // abi encoded contract call
    data: string;
    maxPriorityFeePerGas?: BigNumber;
    maxFeePerGas?: BigNumber;
    gasLimit?: BigNumber;
}

/**
 * Interface for MetaMask RPC provider errors.
 *
 * @remarks
 * When transactions fail using the MetaMask as a provider/signer, ethers-js includes
 * MetaMask's `ProviderRpcError` in its own error object.
 *
 * https://docs.metamask.io/guide/ethereum-provider.html#errors
 */
export interface MetaMaskProviderRpcError {
    // e.g. `-32603`
    code: number;
    // e.g. `"execution reverted"`
    message: string;
    data: {
        originalError?: {
            // seems to be `3` for reverts
            code: number;
            // seems to be `"execution reverted"`
            message: string;
            // this is our encoded `Exception` data
            data: string;
        };
    };
}

/**
 * Interface for JsonRpcProvider error.
 *
 * @remarks
 * When transactions fail using the JsonRpcProvider as provider/signer, ethers-js
 * includes this interface in its own error object.
 */
export interface JsonRpcProviderError {
    // e.g. `"execution reverted"`
    reason: string;
    // e.g. `"UNPREDICTABLE_GAS_LIMIT"`
    code: string;
    // e.g. `"estimateGas"`
    method: string;
    transaction: TransactionDetails;
    error: {
        // seems to be 'processing response error' for reverts
        reason: string;
        // seems to be 'SERVER_ERROR' for reverts
        code: string;
        // JSON payload of the error, details available in the error property below
        body: string;
        error: {
            // seems to be 3 for reverts
            code: number;
            // this is our encoded `Exception` data
            data: string;
        };
        // JSON payload of the `eth_estimateGas` call
        requestBody: string;
        // 'POST'
        requestMethod: string;
        // the JSONRPC provider url, i.e. https://rinkeby.infura.io/v3/<API_KEY>
        url: string;
    };
}

/**
 * Interface for ethers UNPREDICTABLE_GAS_LIMIT error.
 *
 * @remarks
 * Depending on how we connect to the blockchain, our error shapes may be different.
 * Currently we handle MetaMask-based rpc errors and JsonRpcProvider-based errors
 * (which are most likely to occur in browser and node environments).
 */
export interface UnpredictableGasLimitError {
    reason: string;
    code: 'UNPREDICTABLE_GAS_LIMIT';
    error: MetaMaskProviderRpcError | JsonRpcProviderError;
}

/**
 * Interface for ethers CALL_EXCEPTION error during `contract.callStatic` calls.
 *
 * @remarks
 * This error signature seems to be identical for JsonRpcProviders and MetaMask.
 */
export interface StaticCallError {
    code: 'CALL_EXCEPTION';
    // contract address
    address: string;
    // signature of the failed contract call
    method: string;
    // abi encoded contract call
    data: string;
    // parsed/decoded contract call arguments
    args: unknown[];
    // signature of the (custom) error
    errorSignature: string;
    // interface name of the error (`Exception` in case of Swivel v3)
    errorName: string;
    // parsed/decoded arguments passed to the (custom) error
    errorArgs: unknown[];
    transaction: TransactionDetails;
}

/**
 * A typeguard for {@link UnpredictableGasLimitError}s.
 */
export const isUnpredictableGasLimitError = (e: unknown): e is UnpredictableGasLimitError => {

    return (e as UnpredictableGasLimitError).code === 'UNPREDICTABLE_GAS_LIMIT'
        && !!(e as UnpredictableGasLimitError).error;
};

/**
 * A typeguard for {@link StaticCallError}s.
 */
export const isStaticCallError = (e: unknown): e is StaticCallError => {

    return (e as StaticCallError).code === 'CALL_EXCEPTION'
        && (e as StaticCallError).errorName === 'Exception'
        && (e as StaticCallError).errorArgs?.length > 0;
};
