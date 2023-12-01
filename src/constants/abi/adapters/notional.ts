import { Adapter, ParameterEncoder } from './adapter.js';

export const NOTIONAL_LEND_ENCODER = {
    abi: [],
    encode () {
        return '';
    },
} satisfies ParameterEncoder;

export const NOTIONAL_REDEEM_ENCODER = {
    abi: [],
    encode () {
        return '';
    },
} satisfies ParameterEncoder;

export const NOTIONAL_ADAPTER = {
    lend: NOTIONAL_LEND_ENCODER,
    redeem: NOTIONAL_REDEEM_ENCODER,
} satisfies Adapter;
