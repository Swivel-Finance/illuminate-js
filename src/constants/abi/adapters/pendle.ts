import { BigNumberish, utils } from 'ethers';
import { Adapter, ParameterEncoder } from './adapter.js';

// struct type abis for pendle

const PENDLE_APPROX_PARAMS = '(uint256 guessMin, uint256 guessMax, uint256 guessOffchain, uint256 maxIteration, uint256 eps)';

const PENDLE_SWAP_DATA = '(uint8 swapType, address extRouter, bytes extCalldata, bool needScale)';

const PENDLE_TOKEN_INPUT = `(address tokenIn, uint256 netTokenIn, address tokenMintSy, address bulk, address pendleSwap, ${ PENDLE_SWAP_DATA } swapData)`;

const PENDLE_TOKEN_OUTPUT = `(address tokenOut, uint256 minTokenOut, address tokenRedeemSy, address bulk, address pendleSwap, ${ PENDLE_SWAP_DATA } swapData)`;

/**
 * Pendle's ApproxParams for lending on Pendle.
 */
export interface ApproxParams {
    guessMin: string;
    guessMax: string;
    guessOffchain: string;
    maxIteration: string;
    eps: string;
}

export const enum SwapType {
    NONE,
    KYBERSWAP,
    ONE_INCH,
    ETH_WETH,
}

export interface SwapData {
    swapType: SwapType;
    extRouter: string;
    extCalldata: string;
    needScale: boolean;
}

export interface TokenInput {
    tokenIn: string;
    netTokenIn: string;
    tokenMintSy: string;
    bulk: string;
    pendleSwap: string;
    swapData: SwapData;
}

export interface TokenOutput {
    tokenOut: string;
    minTokenOut: string;
    tokenRedeemSy: string;
    bulk: string;
    pendleSwap: string;
    swapData: SwapData;
}

const PENDLE_LEND_ENCODER = {
    abi: [
        'uint256 minimum',
        'address market',
        `${ PENDLE_APPROX_PARAMS } approxParams`,
        `${ PENDLE_TOKEN_INPUT } tokenInput`,
    ],
    /**
     * @param minimum
     * @param market
     * @param approxParams
     * @param tokenInput
     */
    encode (minimum: BigNumberish, market: string, approxParams: ApproxParams, tokenInput: TokenInput) {
        return utils.defaultAbiCoder.encode(
            this.abi,
            [
                minimum,
                market,
                approxParams,
                tokenInput,
            ],
        );
    },
} satisfies ParameterEncoder;

const PENDLE_REDEEM_ENCODER = {
    abi: [
        `${ PENDLE_TOKEN_OUTPUT } tokenOutput`,
    ],
    /**
     * @param tokenOutput
     */
    encode (tokenOutput: TokenOutput) {
        return utils.defaultAbiCoder.encode(
            this.abi,
            [
                tokenOutput,
            ],
        );
    },
} satisfies ParameterEncoder;

export const PENDLE_ADAPTER = {
    lend: PENDLE_LEND_ENCODER,
    redeem: PENDLE_REDEEM_ENCODER,
} satisfies Adapter;
