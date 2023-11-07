import { BigNumberish, BytesLike, FixedNumber, constants, utils } from 'ethers';
import { Adapter, ParameterEncoder } from './adapter.js';

// struct type abis for pendle

const PENDLE_APPROX_PARAMS = '(uint256 guessMin, uint256 guessMax, uint256 guessOffchain, uint256 maxIteration, uint256 eps)';

const PENDLE_SWAP_DATA = '(uint8 swapType, address extRouter, bytes extCalldata, bool needScale)';

const PENDLE_TOKEN_INPUT = `(address tokenIn, uint256 netTokenIn, address tokenMintSy, address bulk, address pendleSwap, ${ PENDLE_SWAP_DATA } swapData)`;

const PENDLE_TOKEN_OUTPUT = `(address tokenOut, uint256 minTokenOut, address tokenRedeemSy, address bulk, address pendleSwap, ${ PENDLE_SWAP_DATA } swapData)`;

// struct type interfaces for pendle

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
    extCalldata: BytesLike;
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

// parameter encoders for pendle

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

// adapter for pendle

export const PENDLE_ADAPTER = {
    lend: PENDLE_LEND_ENCODER,
    redeem: PENDLE_REDEEM_ENCODER,
} satisfies Adapter;

// helpers for pendle

/**
 * Create Pendle's `ApproxParams` struct for lending on Pendle.
 *
 * @remarks
 * https://docs.pendle.finance/Developers/Contracts/PendleRouter#approxparams
 *
 * @param guessAmountOut - the estimated amount of PT to receive
 * @param slippage - the amount of tolerated slippage
 */
export function buildApproxParams (guessAmountOut: string, slippage: number): ApproxParams {

    return getApproxParamsToPullPt(guessAmountOut, slippage);
};

/**
 * Create Pendle's `TokenInput` struct for lending on Pendle.
 *
 * @remarks
 * https://docs.pendle.finance/Developers/Contracts/PendleRouter#tokeninput
 *
 * For Illuminate, `tokenIn` and `tokenMintSy` are the same because Illuminate performs any swaps/conversions
 * before calling the Pendle adapter in order to have more accurate previews.
 *
 * @param amountIn - the amount of tokens to lend
 * @param tokenIn - the address of the token to lend
 */
export function buildTokenInput (amountIn: string, tokenIn: string): TokenInput {

    return {
        tokenIn: tokenIn,
        netTokenIn: amountIn,
        tokenMintSy: tokenIn,
        bulk: constants.AddressZero,
        pendleSwap: constants.AddressZero,
        swapData: {
            swapType: SwapType.NONE,
            extRouter: constants.AddressZero,
            // encode empty bytes
            extCalldata: utils.hexlify(utils.toUtf8Bytes('')),
            needScale: false,
        },
    };
};

/**
 * Create Pendle's `TokenOutput` struct for redeeming on Pendle.
 *
 * @remarks
 * https://docs.pendle.finance/Developers/Contracts/PendleRouter#tokenoutput
 *
 * For Illuminate, `tokenOut` and `tokenRedeemSy` are the same because Illuminate performs any swaps/conversions
 * after calling the Pendle adapter in order to have more accurate previews.
 *
 * @param amountOut - the minimum amount of tokens to be returned by redemption
 * @param tokenOut - the address of the token to be returned by redemption
 * @returns
 */
export function buildTokenOutput (amountOut: string, tokenOut: string): TokenOutput {

    return {
        tokenOut: tokenOut,
        minTokenOut: amountOut,
        tokenRedeemSy: tokenOut,
        bulk: constants.AddressZero,
        pendleSwap: constants.AddressZero,
        swapData: {
            swapType: SwapType.NONE,
            extRouter: constants.AddressZero,
            // encode empty bytes
            extCalldata: utils.hexlify(utils.toUtf8Bytes('')),
            needScale: false,
        },
    };
};

// ******************************************************************************
//
// For details on the implementation below, see Pendle's JavaScript SDK v2:
// https://www.npmjs.com/package/@pendle/sdk-v2
//
// The constants and internal methods below are taken from Pendle's `BasicRouter`
// implementation and adapted for usage in Illuminate frontend.
//
// ******************************************************************************

const BASE = FixedNumber.from(utils.parseUnits('1', 18).toString());
const EPS = FixedNumber.from('0.001');
const MIN_AMOUNT = '0';
const MAX_AMOUNT = constants.MaxUint256.toString();

const DEFAULT_APPROX_PARAMS: ApproxParams = {
    guessMin: MIN_AMOUNT,
    guessMax: MAX_AMOUNT,
    guessOffchain: MIN_AMOUNT,
    maxIteration: '256',
    eps: toBigNumberString(BASE.mulUnsafe(EPS).round()),
};

function toBigNumberString (number: FixedNumber): string {

    return number.floor().toString().replace(/\.\d*$/, '');
}

function calcSlippedDownAmount (amount: BigNumberish, slippage: number): string {

    const a = FixedNumber.from(amount.toString());
    const f = FixedNumber.from((1 - slippage).toString());

    return toBigNumberString(a.mulUnsafe(f));
}

function calcSlippedUpAmount (amount: BigNumberish, slippage: number): string {

    const a = FixedNumber.from(amount.toString());
    const f = FixedNumber.from((1 + slippage).toString());

    return toBigNumberString(a.mulUnsafe(f));
}

function calcMaxIteration (slippage: number): string {

    const x = 6 * slippage / EPS.toUnsafeFloat();

    const iterations = (x <= 1)
        ? 3
        : 3 + Math.ceil(Math.log2(x));

    return iterations.toString();
}

function getApproxParamsToPullPt (guessAmountOut: string, slippage: number): ApproxParams {

    return {
        ...DEFAULT_APPROX_PARAMS,
        guessMin: calcSlippedDownAmount(guessAmountOut, 1 * slippage),
        guessMax: calcSlippedUpAmount(guessAmountOut, 5 * slippage),
        guessOffchain: guessAmountOut,
        maxIteration: calcMaxIteration(slippage),
    };
}
