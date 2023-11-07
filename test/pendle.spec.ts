import assert from 'assert';
import { constants, utils } from 'ethers';
import { suite } from 'mocha';
import { ADAPTERS, SwapType, buildApproxParams, buildTokenInput, buildTokenOutput } from '../src/constants/abi/index.js';
import { Principals } from '../src/index.js';

suite('pendle', () => {

    const amountIn = utils.parseEther('1').toString();
    const amountOut = utils.parseEther('1').toString();
    const tokenIn = '0x1234567890000000000000000000000000000001';
    const market = '0x1234567890000000000000000000000000000002';
    const slippage = 0.01;

    test('encode lend data', () => {

        const approxParams = buildApproxParams(amountOut, slippage);

        // assert that the approxParams are built correctly
        assert.deepStrictEqual(approxParams, {
            guessMin: '990000000000000000',
            guessMax: '1050000000000000000',
            guessOffchain: '1000000000000000000',
            maxIteration: '9',
            eps: '1000000000000000'
        });

        const tokenInput = buildTokenInput(amountIn, tokenIn);

        // assert that the tokenInput is built correctly
        assert.deepStrictEqual(tokenInput, {
            tokenIn: tokenIn,
            netTokenIn: amountIn,
            tokenMintSy: tokenIn,
            bulk: constants.AddressZero,
            pendleSwap: constants.AddressZero,
            swapData: {
                swapType: SwapType.NONE,
                extRouter: constants.AddressZero,
                extCalldata: '0x',
                needScale: false,
            },
        });

        // encode pendle's lend data
        const encoded = ADAPTERS[Principals.Pendle].lend.encode(
            // the minimum is what we already calculated in the `guessMin` property of `approxParams`
            approxParams.guessMin,
            market,
            approxParams,
            tokenInput,
        );

        // decode the encoded lend data using the encoder's abi
        const decoded = utils.defaultAbiCoder.decode(ADAPTERS[Principals.Pendle].lend.abi, encoded);

        // assert that the decoded data matches the original data
        // (we need to assert properties separately to handle additional BigNumber conversions and ignore numeric indices in the decoded result)

        assert.strictEqual(decoded.market, market);

        assert.strictEqual(decoded.minimum.toString(), approxParams.guessMin);

        assert.strictEqual(decoded.approxParams.guessMin.toString(), approxParams.guessMin);
        assert.strictEqual(decoded.approxParams.guessMax.toString(), approxParams.guessMax);
        assert.strictEqual(decoded.approxParams.guessOffchain.toString(), approxParams.guessOffchain);
        assert.strictEqual(decoded.approxParams.maxIteration.toString(), approxParams.maxIteration);
        assert.strictEqual(decoded.approxParams.eps.toString(), approxParams.eps);

        assert.strictEqual(decoded.tokenInput.tokenIn, tokenInput.tokenIn);
        assert.strictEqual(decoded.tokenInput.netTokenIn.toString(), tokenInput.netTokenIn);
        assert.strictEqual(decoded.tokenInput.tokenMintSy, tokenInput.tokenMintSy);
        assert.strictEqual(decoded.tokenInput.bulk, tokenInput.bulk);
        assert.strictEqual(decoded.tokenInput.pendleSwap, tokenInput.pendleSwap);
        assert.strictEqual(decoded.tokenInput.swapData.swapType, tokenInput.swapData.swapType);
        assert.strictEqual(decoded.tokenInput.swapData.extRouter, tokenInput.swapData.extRouter);
        assert.strictEqual(decoded.tokenInput.swapData.extCalldata, tokenInput.swapData.extCalldata);
        assert.strictEqual(decoded.tokenInput.swapData.needScale, tokenInput.swapData.needScale);
    });

    test('encode redeem data', () => {

        const tokenOuput = buildTokenOutput(amountOut, tokenIn);

        // assert that the tokenInput is built correctly
        assert.deepStrictEqual(tokenOuput, {
            tokenOut: tokenIn,
            minTokenOut: amountOut,
            tokenRedeemSy: tokenIn,
            bulk: constants.AddressZero,
            pendleSwap: constants.AddressZero,
            swapData: {
                swapType: SwapType.NONE,
                extRouter: constants.AddressZero,
                extCalldata: '0x',
                needScale: false,
            },
        });

        // encode pendle's redeem data
        const encoded = ADAPTERS[Principals.Pendle].redeem.encode(
            tokenOuput,
        );

        // decode the encoded redeem data using the encoder's abi
        const decoded = utils.defaultAbiCoder.decode(ADAPTERS[Principals.Pendle].redeem.abi, encoded);

        assert.strictEqual(decoded.tokenOutput.tokenOut, tokenOuput.tokenOut);
        assert.strictEqual(decoded.tokenOutput.minTokenOut.toString(), tokenOuput.minTokenOut);
        assert.strictEqual(decoded.tokenOutput.tokenRedeemSy, tokenOuput.tokenRedeemSy);
        assert.strictEqual(decoded.tokenOutput.bulk, tokenOuput.bulk);
        assert.strictEqual(decoded.tokenOutput.pendleSwap, tokenOuput.pendleSwap);
        assert.strictEqual(decoded.tokenOutput.swapData.swapType, tokenOuput.swapData.swapType);
        assert.strictEqual(decoded.tokenOutput.swapData.extRouter, tokenOuput.swapData.extRouter);
        assert.strictEqual(decoded.tokenOutput.swapData.extCalldata, tokenOuput.swapData.extCalldata);
        assert.strictEqual(decoded.tokenOutput.swapData.needScale, tokenOuput.swapData.needScale);
    });
});
