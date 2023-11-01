// TODO: remove this file when lender-v1.ts is removed...

import { SignatureLike } from '@ethersproject/bytes';
import { BigNumber, Signature, utils } from 'ethers';
import { Order } from '../types/swivel.js';

interface ParsedOrder {
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
