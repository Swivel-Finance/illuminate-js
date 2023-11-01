import { BigNumberish, utils } from 'ethers';
import { Adapter, DEFAULT_REDEEM_ENCODER, ParameterEncoder } from './adapter.js';

const YIELD_LEND_ENCODER = {
    abi: [
        'uint256 minimum',
        'address pool',
    ],
    /**
     * @param pool - yieldspace pool that will execute the swap for the principal token
     * @param minimum - minimum amount of principal tokens to buy from the yieldspace pool
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

export const YIELD_ADAPTER = {
    lend: YIELD_LEND_ENCODER,
    redeem: DEFAULT_REDEEM_ENCODER,
} satisfies Adapter;
