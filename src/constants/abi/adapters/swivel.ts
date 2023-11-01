import { SignatureLike } from '@ethersproject/bytes';
import { BigNumber, BigNumberish, Signature, utils } from 'ethers';
import { Adapter, DEFAULT_REDEEM_ENCODER, ParameterEncoder } from './adapter.js';

// struct type abis for swivel

const SWIVEL_ORDER = '(bytes32 key, uint8 protocol, address maker, bool vault, bool exit, uint256 principal, uint256 premium, uint256 maturity, uint256 expiry)';

const SWIVEL_SIGNATURE = '(uint8 v, bytes32 r, bytes32 s)';

/**
 * Swivel protocols.
 */
export const enum Protocols {
    Erc4626,
    Compound,
    Rari,
    Yearn,
    Aave,
    Euler,
    Lido,
}

/**
 * A Swivel order.
 */
export interface Order {
    key: string;
    protocol: Protocols;
    maker: string;
    underlying: string;
    vault: boolean;
    exit: boolean;
    principal: string;
    premium: string;
    maturity: string;
    expiry: string;
}

/**
 * A parsed Swivel order ready for on-chain use.
 */
export interface ParsedOrder {
    key: Uint8Array;
    protocol: number;
    maker: string;
    underlying: string;
    vault: boolean;
    exit: boolean;
    principal: BigNumber;
    premium: BigNumber;
    maturity: BigNumber;
    expiry: BigNumber;
}

/**
 * Converts an {@link Order} into an on-chain usable {@link ParsedOrder}.
 *
 * @param o - the order to convert
 */
export function parseOrder (o: Order): ParsedOrder {

    return {
        key: utils.arrayify(o.key),
        protocol: o.protocol,
        maker: o.maker,
        underlying: o.underlying,
        vault: o.vault,
        exit: o.exit,
        principal: BigNumber.from(o.principal),
        premium: BigNumber.from(o.premium),
        maturity: BigNumber.from(o.maturity),
        expiry: BigNumber.from(o.expiry),
    };
}

/**
 * Converts a signature into its `r`, `s` and `v` components.
 *
 * @param s - the signature to convert
 */
export function parseSignature (s: SignatureLike): Signature {

    return utils.splitSignature(s);
}

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

export const SWIVEL_ADAPTER = {
    lend: SWIVEL_LEND_ENCODER,
    redeem: DEFAULT_REDEEM_ENCODER,
} satisfies Adapter;
