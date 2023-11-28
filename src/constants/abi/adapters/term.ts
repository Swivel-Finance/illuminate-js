import { utils } from 'ethers';
import { Adapter, ParameterEncoder } from './adapter.js';

const TERM_LEND_ENCODER = {
    abi: [],
    encode () {
        throw new Error('Lending on Term is not supported.');
    },
} satisfies ParameterEncoder;

const TERM_REDEEM_ENCODER = {
    abi: [
        'address targetRedeemer',
        'address targetToken',
    ],
    /**
     * @param targetRedeemer - address of the redeemer for the provided target term repo token
     * @param targetToken - address of the term repo token to be redeemed
     */
    encode (targetRedeemer: string, targetToken: string) {
        return utils.defaultAbiCoder.encode(
            this.abi,
            [
                targetRedeemer,
                targetToken,
            ],
        );
    },
} satisfies ParameterEncoder;

export const TERM_ADAPTER = {
    lend: TERM_LEND_ENCODER,
    redeem: TERM_REDEEM_ENCODER,
} satisfies Adapter;
