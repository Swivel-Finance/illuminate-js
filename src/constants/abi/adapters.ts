import { SignatureLike } from '@ethersproject/bytes';
import { BigNumberish, utils } from 'ethers';
import { Principals } from '../principals.js';
import { Order } from '../../types/index.js';
import { parseOrder, parseSignature } from '../../helpers/swivel.js';

// struct type of a swivel order
const SWIVEL_ORDER = '(bytes32 key, uint8 protocol, address maker, bool vault, bool exit, uint256 principal, uint256 premium, uint256 maturity, uint256 expiry)';

// struct type of a swivel signature
const SWIVEL_SIGNATURE = '(uint8 v, bytes32 r, bytes32 s)';

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
 * Generic Adapter interface.
 *
 * @remarks
 * Each adapter on illuminate has a `lend` and `redeem` method, both of which require `bytes`-encoded input data to be
 * passed in. The `Adapter` interface contains `ParameterEncoder`s for encoding the input data for each adapter.
 */
export interface Adapter {
    lend: ParameterEncoder,
    redeem: ParameterEncoder,
}

// -----------------------
// Encoder implementations
// -----------------------

// TODO: this is temporary until we have all the adpater ABIs in place...

const DEFAULT_LEND_ENCODER = {
    abi: [],
    encode (...args: any[]) {
        return '';
    },
} satisfies ParameterEncoder;

/**
 * Default `redeem` parameter encoder.
 *
 * @remarks
 * The `redeem` method on most adapters has the same signature, so we can use a default encoder for those.
 */
const DEFAULT_REDEEM_ENCODER = {
    abi: [
        'address underlying',
        'uint256 maturity',
    ],
    /**
     * @param underlying - address of the underlying token
     * @param maturity - maturity timestamp of the market
     */
    encode (underlying: string, maturity: BigNumberish) {
        return utils.defaultAbiCoder.encode(
            this.abi,
            [
                underlying,
                maturity,
            ],
        );
    },
} satisfies ParameterEncoder;

const ILLUMINATE_LEND_ENCODER = {
    abi: [
        'uint256 minimum',
        'address pool',
    ],
    /**
     * @param pool - yieldspace pool that will execute the swap for the illuminate PT
     * @param minimum - minimum amount of PTs to buy from the yieldspace pool
     */
    encode (pool: string, minimum: BigNumberish) {
        return utils.defaultAbiCoder.encode(
            this.abi,
            [
                minimum,
                pool,
            ],
        );
    },
} satisfies ParameterEncoder;

const SWIVEL_LEND_ENCODER = {
    abi: [
        `${ SWIVEL_ORDER }[] orders`,
        `${ SWIVEL_SIGNATURE }[] signatures`,
        'address pool',
        'uint256 swapMinimum',
        'bool swapFlag',
    ],
    /**
     * @param orders - array of Swivel orders to fill
     * @param signatures - array of signatures for each order in the orders array
     * @param pool - yieldspace pool that will execute the swap of premium for illuminate PT
     * @param swapMinimum - only used if swapFlag is true, the minimum amount of PTs returned for the premium
     * @param swapFlag - flag to indicate if returned premium should be swapped in yieldspace pool
     */
    encode (orders: Order[], signatures: SignatureLike[], pool: string, swapMinimum: BigNumberish, swapFlag: boolean) {
        return utils.defaultAbiCoder.encode(
            this.abi,
            [
                orders.map(o => parseOrder(o)),
                signatures.map(s => parseSignature(s)),
                pool,
                swapMinimum,
                swapFlag,
            ],
        );
    },
} satisfies ParameterEncoder;

/**
 * Adapter ABIs for each principal.
 *
 * @remarks
 * We're co-locating the adapter ABIs with the parameter encoders here because they're closely related. If the ABIs
 * change in the future, we'll need to update the parameter encoders as well.
 * In the `Lender` we can simply consume the `ADAPTERS` and get type safety for the parameter encoders.
 */
export const ADAPTERS = {
    [Principals.Illuminate]: {
        lend: ILLUMINATE_LEND_ENCODER,
        redeem: DEFAULT_REDEEM_ENCODER,
    },
    [Principals.Swivel]: {
        lend: SWIVEL_LEND_ENCODER,
        redeem: DEFAULT_REDEEM_ENCODER,
    },
    [Principals.Yield]: {
        lend: ILLUMINATE_LEND_ENCODER,
        redeem: DEFAULT_REDEEM_ENCODER,
    },
    [Principals.Element]: {
        lend: DEFAULT_LEND_ENCODER,
        redeem: DEFAULT_REDEEM_ENCODER,
    },
    [Principals.Pendle]: {
        lend: DEFAULT_LEND_ENCODER,
        redeem: DEFAULT_REDEEM_ENCODER,
    },
    [Principals.Tempus]: {
        lend: DEFAULT_LEND_ENCODER,
        redeem: DEFAULT_REDEEM_ENCODER,
    },
    [Principals.Sense]: {
        lend: DEFAULT_LEND_ENCODER,
        redeem: DEFAULT_REDEEM_ENCODER,
    },
    [Principals.Apwine]: {
        lend: DEFAULT_LEND_ENCODER,
        redeem: DEFAULT_REDEEM_ENCODER,
    },
    [Principals.Notional]: {
        lend: DEFAULT_LEND_ENCODER,
        redeem: DEFAULT_REDEEM_ENCODER,
    },
} satisfies Record<Principals, Adapter>;
