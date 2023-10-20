import { BigNumber } from 'ethers';
import { ApproxParams } from '../types/index.js';

interface EthersApproxParams {
    guessMin: BigNumber;
    guessMax: BigNumber;
    guessOffchain: BigNumber;
    maxIteration: BigNumber;
    eps: BigNumber;
}

/**
 * Converts an {@link ApproxParams} object into an `ethers.js` specific one.
 *
 * @param g - Pendle guess params
 */
export function parseApproxParams (g: ApproxParams): EthersApproxParams {

    return {
        guessMin: BigNumber.from(g.guessMin),
        guessMax: BigNumber.from(g.guessMax),
        guessOffchain: BigNumber.from(g.guessOffchain),
        maxIteration: BigNumber.from(g.maxIteration),
        eps: BigNumber.from(g.eps),
    };
}
