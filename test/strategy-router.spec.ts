import assert from 'assert';
import { Provider, TransactionResponse } from '@ethersproject/abstract-provider';
import { BigNumber, PayableOverrides, getDefaultProvider, utils } from 'ethers';
import { suite, suiteSetup, test } from 'mocha';
import { StrategyRouter } from '../src/index.js';
import { ADDRESSES, mockExecutor, mockMethod, mockResponse } from './helpers/index.js';

suite.only('strategy-router', () => {

    const overrides: PayableOverrides = {
        gasLimit: '10000',
        nonce: 3,
    };

    let provider: Provider;

    suiteSetup(() => {

        provider = getDefaultProvider();
    });

    test('create instance', () => {

        const router = new StrategyRouter(ADDRESSES.STRATEGY_ROUTER, provider);

        assert(router instanceof StrategyRouter);

        assert.strictEqual(router.address, ADDRESSES.STRATEGY_ROUTER);
    });

    suite('mint', () => {

        const strategy = '0xstrategy';
        const assets = utils.parseEther('100').toString();
        const pts = utils.parseEther('100').toString();
        const minRatio = utils.parseUnits('0.2', 18).toString();
        const maxRatio = utils.parseUnits('0.5', 18).toString();

        test('converts arguments and accepts transaction overrides', async () => {

            const router = new StrategyRouter(ADDRESSES.STRATEGY_ROUTER, provider, mockExecutor());

            const mint = mockMethod<TransactionResponse>(router, 'mint');
            const response = mockResponse();
            mint.resolves(response);

            let result = await router.mint(strategy, assets, pts, minRatio, maxRatio);

            assert.deepStrictEqual(result, response);

            let args = mint.getCall(0).args;

            assert.strictEqual(args.length, 6);

            let [passedStrategy, passedAssets, passedPts, passedMin, passedMax, passedOverrides] = args;

            assert.strictEqual(passedStrategy, strategy);
            assert.deepStrictEqual(passedAssets, BigNumber.from(assets));
            assert.deepStrictEqual(passedPts, BigNumber.from(pts));
            assert.deepStrictEqual(passedMin, BigNumber.from(minRatio));
            assert.deepStrictEqual(passedMax, BigNumber.from(maxRatio));
            assert.deepStrictEqual(passedOverrides, {});

            // with overrides

            result = await router.mint(strategy, assets, pts, minRatio, maxRatio, overrides);

            assert.strictEqual(result, response);

            args = mint.getCall(1).args;

            assert.strictEqual(args.length, 6);

            [passedStrategy, passedAssets, passedPts, passedMin, passedMax, passedOverrides] = args;

            assert.strictEqual(passedStrategy, strategy);
            assert.deepStrictEqual(passedAssets, BigNumber.from(assets));
            assert.deepStrictEqual(passedPts, BigNumber.from(pts));
            assert.deepStrictEqual(passedMin, BigNumber.from(minRatio));
            assert.deepStrictEqual(passedMax, BigNumber.from(maxRatio));
            assert.deepStrictEqual(passedOverrides, overrides);
        });
    });

    suite('mintWithUnderlying', () => {

        const strategy = '0xstrategy';
        const assets = utils.parseEther('100').toString();
        const ptsToBuy = utils.parseEther('50').toString();
        const minRatio = utils.parseUnits('0', 18).toString();
        const maxRatio = utils.parseUnits('0.7', 18).toString();

        test('converts arguments and accepts transaction overrides', async () => {

            const router = new StrategyRouter(ADDRESSES.STRATEGY_ROUTER, provider, mockExecutor());

            const mintWithUnderlying = mockMethod<TransactionResponse>(router, 'mintWithUnderlying');
            const response = mockResponse();
            mintWithUnderlying.resolves(response);

            let result = await router.mintWithUnderlying(strategy, assets, ptsToBuy, minRatio, maxRatio);

            assert.deepStrictEqual(result, response);

            let args = mintWithUnderlying.getCall(0).args;

            assert.strictEqual(args.length, 6);

            let [passedStrategy, passedAssets, passedPts, passedMin, passedMax, passedOverrides] = args;

            assert.strictEqual(passedStrategy, strategy);
            assert.deepStrictEqual(passedAssets, BigNumber.from(assets));
            assert.deepStrictEqual(passedPts, BigNumber.from(ptsToBuy));
            assert.deepStrictEqual(passedMin, BigNumber.from(minRatio));
            assert.deepStrictEqual(passedMax, BigNumber.from(maxRatio));
            assert.deepStrictEqual(passedOverrides, {});

            // with overrides

            result = await router.mintWithUnderlying(strategy, assets, ptsToBuy, minRatio, maxRatio, overrides);

            assert.strictEqual(result, response);

            args = mintWithUnderlying.getCall(1).args;

            assert.strictEqual(args.length, 6);

            [passedStrategy, passedAssets, passedPts, passedMin, passedMax, passedOverrides] = args;

            assert.strictEqual(passedStrategy, strategy);
            assert.deepStrictEqual(passedAssets, BigNumber.from(assets));
            assert.deepStrictEqual(passedPts, BigNumber.from(ptsToBuy));
            assert.deepStrictEqual(passedMin, BigNumber.from(minRatio));
            assert.deepStrictEqual(passedMax, BigNumber.from(maxRatio));
            assert.deepStrictEqual(passedOverrides, overrides);
        });
    });

    suite('mintDivested', () => {

        const strategy = '0xstrategy';
        const assets = utils.parseEther('100').toString();

        test('converts arguments and accepts transaction overrides', async () => {

            const router = new StrategyRouter(ADDRESSES.STRATEGY_ROUTER, provider, mockExecutor());

            const mintDivested = mockMethod<TransactionResponse>(router, 'mintDivested');
            const response = mockResponse();
            mintDivested.resolves(response);

            let result = await router.mintDivested(strategy, assets);

            assert.deepStrictEqual(result, response);

            let args = mintDivested.getCall(0).args;

            assert.strictEqual(args.length, 3);

            let [passedStrategy, passedAssets, passedOverrides] = args;

            assert.strictEqual(passedStrategy, strategy);
            assert.deepStrictEqual(passedAssets, BigNumber.from(assets));
            assert.deepStrictEqual(passedOverrides, {});

            // with overrides

            result = await router.mintDivested(strategy, assets, overrides);

            assert.strictEqual(result, response);

            args = mintDivested.getCall(1).args;

            assert.strictEqual(args.length, 3);

            [passedStrategy, passedAssets, passedOverrides] = args;

            assert.strictEqual(passedStrategy, strategy);
            assert.deepStrictEqual(passedAssets, BigNumber.from(assets));
            assert.deepStrictEqual(passedOverrides, overrides);
        });
    });

    suite('burn', () => {

        const strategy = '0xstrategy';
        const shares = utils.parseEther('100').toString();
        const minRatio = utils.parseUnits('0.2', 18).toString();
        const maxRatio = utils.parseUnits('0.5', 18).toString();

        test('converts arguments and accepts transaction overrides', async () => {

            const router = new StrategyRouter(ADDRESSES.STRATEGY_ROUTER, provider, mockExecutor());

            const burn = mockMethod<TransactionResponse>(router, 'burn');
            const response = mockResponse();
            burn.resolves(response);

            let result = await router.burn(strategy, shares, minRatio, maxRatio);

            assert.deepStrictEqual(result, response);

            let args = burn.getCall(0).args;

            assert.strictEqual(args.length, 5);

            let [passedStrategy, passedShares, passedMin, passedMax, passedOverrides] = args;

            assert.strictEqual(passedStrategy, strategy);
            assert.deepStrictEqual(passedShares, BigNumber.from(shares));
            assert.deepStrictEqual(passedMin, BigNumber.from(minRatio));
            assert.deepStrictEqual(passedMax, BigNumber.from(maxRatio));
            assert.deepStrictEqual(passedOverrides, {});

            // with overrides

            result = await router.burn(strategy, shares, minRatio, maxRatio, overrides);

            assert.strictEqual(result, response);

            args = burn.getCall(1).args;

            assert.strictEqual(args.length, 5);

            [passedStrategy, passedShares, passedMin, passedMax, passedOverrides] = args;

            assert.strictEqual(passedStrategy, strategy);
            assert.deepStrictEqual(passedShares, BigNumber.from(shares));
            assert.deepStrictEqual(passedMin, BigNumber.from(minRatio));
            assert.deepStrictEqual(passedMax, BigNumber.from(maxRatio));
            assert.deepStrictEqual(passedOverrides, overrides);
        });
    });

    suite('burnForUnderlying', () => {

        const strategy = '0xstrategy';
        const shares = utils.parseEther('1000').toString();
        const minRatio = utils.parseUnits('0', 18).toString();
        const maxRatio = utils.parseUnits('1', 18).toString();

        test('converts arguments and accepts transaction overrides', async () => {

            const router = new StrategyRouter(ADDRESSES.STRATEGY_ROUTER, provider, mockExecutor());

            const burnForUnderlying = mockMethod<TransactionResponse>(router, 'burnForUnderlying');
            const response = mockResponse();
            burnForUnderlying.resolves(response);

            let result = await router.burnForUnderlying(strategy, shares, minRatio, maxRatio);

            assert.deepStrictEqual(result, response);

            let args = burnForUnderlying.getCall(0).args;

            assert.strictEqual(args.length, 5);

            let [passedStrategy, passedShares, passedMin, passedMax, passedOverrides] = args;

            assert.strictEqual(passedStrategy, strategy);
            assert.deepStrictEqual(passedShares, BigNumber.from(shares));
            assert.deepStrictEqual(passedMin, BigNumber.from(minRatio));
            assert.deepStrictEqual(passedMax, BigNumber.from(maxRatio));
            assert.deepStrictEqual(passedOverrides, {});

            // with overrides

            result = await router.burnForUnderlying(strategy, shares, minRatio, maxRatio, overrides);

            assert.strictEqual(result, response);

            args = burnForUnderlying.getCall(1).args;

            assert.strictEqual(args.length, 5);

            [passedStrategy, passedShares, passedMin, passedMax, passedOverrides] = args;

            assert.strictEqual(passedStrategy, strategy);
            assert.deepStrictEqual(passedShares, BigNumber.from(shares));
            assert.deepStrictEqual(passedMin, BigNumber.from(minRatio));
            assert.deepStrictEqual(passedMax, BigNumber.from(maxRatio));
            assert.deepStrictEqual(passedOverrides, overrides);
        });
    });

    suite('burnDivested', () => {

        const strategy = '0xstrategy';
        const shares = utils.parseEther('1000').toString();

        test('converts arguments and accepts transaction overrides', async () => {

            const router = new StrategyRouter(ADDRESSES.STRATEGY_ROUTER, provider, mockExecutor());

            const burnDivested = mockMethod<TransactionResponse>(router, 'burnDivested');
            const response = mockResponse();
            burnDivested.resolves(response);

            let result = await router.burnDivested(strategy, shares);

            assert.deepStrictEqual(result, response);

            let args = burnDivested.getCall(0).args;

            assert.strictEqual(args.length, 3);

            let [passedStrategy, passedShares, passedOverrides] = args;

            assert.strictEqual(passedStrategy, strategy);
            assert.deepStrictEqual(passedShares, BigNumber.from(shares));
            assert.deepStrictEqual(passedOverrides, {});

            // with overrides

            result = await router.burnDivested(strategy, shares, overrides);

            assert.strictEqual(result, response);

            args = burnDivested.getCall(1).args;

            assert.strictEqual(args.length, 3);

            [passedStrategy, passedShares, passedOverrides] = args;

            assert.strictEqual(passedStrategy, strategy);
            assert.deepStrictEqual(passedShares, BigNumber.from(shares));
            assert.deepStrictEqual(passedOverrides, overrides);
        });
    });
});
