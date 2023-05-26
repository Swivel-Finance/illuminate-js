import assert from 'assert';
import { Provider } from '@ethersproject/abstract-provider';
import { BigNumber, CallOverrides, getDefaultProvider } from 'ethers';
import { suite, suiteSetup, test } from 'mocha';
import { Strategy } from '../src/index.js';
import { ADDRESSES, assertGetter, mockMethod } from './helpers/index.js';

// The Strategy contract is an ERC-20, but we skip testing its ERC-20 methods, as these are inherited

suite('strategy', () => {

    const overrides: CallOverrides = {
        gasLimit: '1000',
        from: '0xfrom',
        nonce: 1,
    };

    let provider: Provider;

    suiteSetup(() => {

        provider = getDefaultProvider();
    });

    test('create instance', () => {

        const strategy = new Strategy(ADDRESSES.STRATEGY, provider);

        assert(strategy instanceof Strategy);

        assert.strictEqual(strategy.address, ADDRESSES.STRATEGY);
    });

    suite('admin', () => {

        test('unwraps result and accepts transaction overrides', async () => {

            await assertGetter(
                new Strategy(ADDRESSES.STRATEGY, provider),
                'admin',
                '0xadmin',
                overrides,
            );
        });
    });

    suite('lender', () => {

        test('unwraps result and accepts transaction overrides', async () => {

            await assertGetter(
                new Strategy(ADDRESSES.STRATEGY, provider),
                'lender',
                '0xlender',
                overrides,
            );
        });
    });

    suite('state', () => {

        test('unwraps result and accepts transaction overrides', async () => {

            await assertGetter(
                new Strategy(ADDRESSES.STRATEGY, provider),
                'state',
                2,
                overrides,
            );
        });
    });

    suite('pool', () => {

        test('unwraps result and accepts transaction overrides', async () => {

            await assertGetter(
                new Strategy(ADDRESSES.STRATEGY, provider),
                'pool',
                '0xpool',
                overrides,
            );
        });
    });

    suite('base', () => {

        test('unwraps result and accepts transaction overrides', async () => {

            await assertGetter(
                new Strategy(ADDRESSES.STRATEGY, provider),
                'base',
                '0xbase',
                overrides,
            );
        });
    });

    suite('fyToken', () => {

        test('unwraps result and accepts transaction overrides', async () => {

            await assertGetter(
                new Strategy(ADDRESSES.STRATEGY, provider),
                'fyToken',
                '0xfyToken',
                overrides,
            );
        });
    });

    suite('maturity', () => {

        const returned = BigNumber.from('12345678');
        const expected = returned.toString();

        test('unwraps and converts result and accepts transaction overrides', async () => {

            const strategy = new Strategy(ADDRESSES.STRATEGY, provider);
            const maturity = mockMethod<BigNumber>(strategy, 'maturity');
            maturity.resolves([returned]);

            let result = await strategy.maturity();

            assert.strictEqual(result, expected);

            let args = maturity.getCall(0).args;

            assert.strictEqual(args.length, 1);

            let [passedOverrides] = args;

            assert.deepStrictEqual(passedOverrides, {});

            // with overrides

            result = await strategy.maturity(overrides);

            assert.strictEqual(result, expected);

            args = maturity.getCall(1).args;

            assert.strictEqual(args.length, 1);

            [passedOverrides] = args;

            assert.deepStrictEqual(passedOverrides, overrides);
        });
    });

    suite('poolCached', () => {

        const returned = BigNumber.from('19875000000');
        const expected = returned.toString();

        test('unwraps and converts result and accepts transaction overrides', async () => {

            const strategy = new Strategy(ADDRESSES.STRATEGY, provider);
            const poolCached = mockMethod<BigNumber>(strategy, 'poolCached');
            poolCached.resolves([returned]);

            let result = await strategy.poolCached();

            assert.strictEqual(result, expected);

            let args = poolCached.getCall(0).args;

            assert.strictEqual(args.length, 1);

            let [passedOverrides] = args;

            assert.deepStrictEqual(passedOverrides, {});

            // with overrides

            result = await strategy.poolCached(overrides);

            assert.strictEqual(result, expected);

            args = poolCached.getCall(1).args;

            assert.strictEqual(args.length, 1);

            [passedOverrides] = args;

            assert.deepStrictEqual(passedOverrides, overrides);
        });
    });

    suite('baseCached', () => {

        const returned = BigNumber.from('0');
        const expected = returned.toString();

        test('unwraps and converts result and accepts transaction overrides', async () => {

            const strategy = new Strategy(ADDRESSES.STRATEGY, provider);
            const baseCached = mockMethod<BigNumber>(strategy, 'baseCached');
            baseCached.resolves([returned]);

            let result = await strategy.baseCached();

            assert.strictEqual(result, expected);

            let args = baseCached.getCall(0).args;

            assert.strictEqual(args.length, 1);

            let [passedOverrides] = args;

            assert.deepStrictEqual(passedOverrides, {});

            // with overrides

            result = await strategy.baseCached(overrides);

            assert.strictEqual(result, expected);

            args = baseCached.getCall(1).args;

            assert.strictEqual(args.length, 1);

            [passedOverrides] = args;

            assert.deepStrictEqual(passedOverrides, overrides);
        });
    });

    suite('fyTokenCached', () => {

        const returned = BigNumber.from('0');
        const expected = returned.toString();

        test('unwraps and converts result and accepts transaction overrides', async () => {

            const strategy = new Strategy(ADDRESSES.STRATEGY, provider);
            const fyTokenCached = mockMethod<BigNumber>(strategy, 'fyTokenCached');
            fyTokenCached.resolves([returned]);

            let result = await strategy.fyTokenCached();

            assert.strictEqual(result, expected);

            let args = fyTokenCached.getCall(0).args;

            assert.strictEqual(args.length, 1);

            let [passedOverrides] = args;

            assert.deepStrictEqual(passedOverrides, {});

            // with overrides

            result = await strategy.fyTokenCached(overrides);

            assert.strictEqual(result, expected);

            args = fyTokenCached.getCall(1).args;

            assert.strictEqual(args.length, 1);

            [passedOverrides] = args;

            assert.deepStrictEqual(passedOverrides, overrides);
        });
    });

    // ensure the ERC20 interface is inherited correctly by testing a few getters
    // the ERC20 contract is tested separately, this just ensures the interface and ABI is inherited

    suite('name', () => {

        test('unwraps result and accepts transaction overrides', async () => {

            await assertGetter(
                new Strategy(ADDRESSES.STRATEGY, provider),
                'name',
                'FooBar',
                overrides,
            );
        });
    });

    suite('symbol', () => {

        test('unwraps result and accepts transaction overrides', async () => {

            await assertGetter(
                new Strategy(ADDRESSES.STRATEGY, provider),
                'symbol',
                'FB',
                overrides,
            );
        });
    });

    suite('decimals', () => {

        test('unwraps result and accepts transaction overrides', async () => {

            await assertGetter(
                new Strategy(ADDRESSES.STRATEGY, provider),
                'decimals',
                6,
                overrides,
            );
        });
    });
});
