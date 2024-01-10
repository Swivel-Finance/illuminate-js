import assert from 'assert';
import { Provider } from '@ethersproject/abstract-provider';
import { BigNumber, PayableOverrides, getDefaultProvider, utils } from 'ethers';
import { suite, suiteSetup, test } from 'mocha';
import { ETHStrategyRouter } from '../src/index.js';
import { ADDRESSES, assertTransaction, mockExecutor } from './helpers/index.js';

suite('eth-strategy-router', () => {

    const overrides: PayableOverrides = {
        gasLimit: '10000',
        nonce: 3,
    };

    let provider: Provider;

    suiteSetup(() => {

        provider = getDefaultProvider();
    });

    test('create instance', () => {

        const router = new ETHStrategyRouter(ADDRESSES.ETH_STRATEGY_ROUTER, provider);

        assert(router instanceof ETHStrategyRouter);

        assert.strictEqual(router.address, ADDRESSES.ETH_STRATEGY_ROUTER);
    });

    suite('mint', () => {

        const strategy = '0xstrategy';
        const assets = utils.parseEther('100').toString();
        const pts = utils.parseEther('100').toString();
        const minRatio = utils.parseUnits('0.2', 18).toString();
        const maxRatio = utils.parseUnits('0.5', 18).toString();

        const payableOverrides: PayableOverrides = {
            ...overrides,
            value: assets,
        };

        test('converts arguments and accepts transaction overrides', async () => {

            await assertTransaction(
                new ETHStrategyRouter(ADDRESSES.ETH_STRATEGY_ROUTER, provider, mockExecutor()),
                'mint',
                [strategy, BigNumber.from(assets), BigNumber.from(pts), BigNumber.from(minRatio), BigNumber.from(maxRatio)],
                [strategy, assets, pts, minRatio, maxRatio],
                payableOverrides,
            );
        });
    });

    suite('mintWithUnderlying', () => {

        const strategy = '0xstrategy';
        const assets = utils.parseEther('100').toString();
        const ptsToBuy = utils.parseEther('50').toString();
        const minRatio = utils.parseUnits('0', 18).toString();
        const maxRatio = utils.parseUnits('0.7', 18).toString();

        const payableOverrides: PayableOverrides = {
            ...overrides,
            value: assets,
        };

        test('converts arguments and accepts transaction overrides', async () => {

            await assertTransaction(
                new ETHStrategyRouter(ADDRESSES.ETH_STRATEGY_ROUTER, provider, mockExecutor()),
                'mintWithUnderlying',
                [strategy, BigNumber.from(assets), BigNumber.from(ptsToBuy), BigNumber.from(minRatio), BigNumber.from(maxRatio)],
                [strategy, assets, ptsToBuy, minRatio, maxRatio],
                payableOverrides,
            );
        });
    });

    suite('mintDivested', () => {

        const strategy = '0xstrategy';
        const assets = utils.parseEther('100').toString();

        const payableOverrides: PayableOverrides = {
            ...overrides,
            value: assets,
        };

        test('converts arguments and accepts transaction overrides', async () => {

            await assertTransaction(
                new ETHStrategyRouter(ADDRESSES.ETH_STRATEGY_ROUTER, provider, mockExecutor()),
                'mintDivested',
                [strategy, BigNumber.from(assets)],
                [strategy, assets],
                payableOverrides,
            );
        });
    });

    suite('burn', () => {

        const strategy = '0xstrategy';
        const shares = utils.parseEther('100').toString();
        const minRatio = utils.parseUnits('0.2', 18).toString();
        const maxRatio = utils.parseUnits('0.5', 18).toString();

        test('converts arguments and accepts transaction overrides', async () => {

            await assertTransaction(
                new ETHStrategyRouter(ADDRESSES.ETH_STRATEGY_ROUTER, provider, mockExecutor()),
                'burn',
                [strategy, BigNumber.from(shares), BigNumber.from(minRatio), BigNumber.from(maxRatio)],
                [strategy, shares, minRatio, maxRatio],
                overrides,
            );
        });
    });

    suite('burnForUnderlying', () => {

        const strategy = '0xstrategy';
        const shares = utils.parseEther('1000').toString();
        const minRatio = utils.parseUnits('0', 18).toString();
        const maxRatio = utils.parseUnits('1', 18).toString();

        test('converts arguments and accepts transaction overrides', async () => {

            await assertTransaction(
                new ETHStrategyRouter(ADDRESSES.ETH_STRATEGY_ROUTER, provider, mockExecutor()),
                'burnForUnderlying',
                [strategy, BigNumber.from(shares), BigNumber.from(minRatio), BigNumber.from(maxRatio)],
                [strategy, shares, minRatio, maxRatio],
                overrides,
            );
        });
    });

    suite('burnDivested', () => {

        const strategy = '0xstrategy';
        const shares = utils.parseEther('1000').toString();

        test('converts arguments and accepts transaction overrides', async () => {

            await assertTransaction(
                new ETHStrategyRouter(ADDRESSES.ETH_STRATEGY_ROUTER, provider, mockExecutor()),
                'burnDivested',
                [strategy, BigNumber.from(shares)],
                [strategy, shares],
                overrides,
            );
        });
    });
});
