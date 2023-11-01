// TODO: remove this file when lender-v1.ts is removed...

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
