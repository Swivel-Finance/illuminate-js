import { BigNumber, utils } from 'ethers';
import { Order } from '../types/index.js';

interface EthersOrder {
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
 * Converts an {@link Order} into an `ethers.js` specific order.
 *
 * @param o - the order to convert
 */
export function parseOrder (o: Order): EthersOrder {

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
