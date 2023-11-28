import { BigNumberish, utils } from 'ethers';
import { Adapter, ParameterEncoder } from './adapter.js';

const EXACTLY_LEND_ENCODER = {
    abi: [
        'uint256 exactlyMaturity',
        'uint256 minimumAssets',
    ],
    /**
     * @param exactlyMaturity - maturity of the exactly market
     * @param minimumAssets - minimum amount of principal tokens to receive when lending
     */
    encode (exactlyMaturity: BigNumberish, minimumAssets: BigNumberish) {
        return utils.defaultAbiCoder.encode(
            this.abi,
            [
                exactlyMaturity,
                minimumAssets,
            ],
        );
    },
} satisfies ParameterEncoder;

const EXACTLY_REDEEM_ENCODER = {
    abi: [
        'uint256 exactlyMaturity',
    ],
    /**
     * @param exactlyMaturity - maturity of the exactly market
     */
    encode (exactlyMaturity: BigNumberish) {
        return utils.defaultAbiCoder.encode(
            this.abi,
            [
                exactlyMaturity,
            ],
        );
    },
} satisfies ParameterEncoder;

export const EXACTLY_ADAPTER = {
    lend: EXACTLY_LEND_ENCODER,
    redeem: EXACTLY_REDEEM_ENCODER,
} satisfies Adapter;
