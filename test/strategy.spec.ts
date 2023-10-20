import assert from 'assert';
import { Provider } from '@ethersproject/abstract-provider';
import { BigNumber, CallOverrides, getDefaultProvider } from 'ethers';
import { suite, suiteSetup, test } from 'mocha';
import { Strategy } from '../src/index.js';
import { ADDRESSES, assertGetter } from './helpers/index.js';

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
                ['0xadmin'],
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
                ['0xlender'],
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
                [2],
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
                ['0xpool'],
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
                ['0xbase'],
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
                ['0xfyToken'],
                '0xfyToken',
                overrides,
            );
        });
    });

    suite('maturity', () => {

        const returned = BigNumber.from('12345678');
        const expected = returned.toString();

        test('unwraps and converts result and accepts transaction overrides', async () => {

            await assertGetter(
                new Strategy(ADDRESSES.STRATEGY, provider),
                'maturity',
                [returned],
                expected,
                overrides,
            );
        });
    });

    suite('poolCached', () => {

        const returned = BigNumber.from('19875000000');
        const expected = returned.toString();

        test('unwraps and converts result and accepts transaction overrides', async () => {

            await assertGetter(
                new Strategy(ADDRESSES.STRATEGY, provider),
                'poolCached',
                [returned],
                expected,
                overrides,
            );
        });
    });

    suite('baseCached', () => {

        const returned = BigNumber.from('0');
        const expected = returned.toString();

        test('unwraps and converts result and accepts transaction overrides', async () => {

            await assertGetter(
                new Strategy(ADDRESSES.STRATEGY, provider),
                'baseCached',
                [returned],
                expected,
                overrides,
            );
        });
    });

    suite('fyTokenCached', () => {

        const returned = BigNumber.from('0');
        const expected = returned.toString();

        test('unwraps and converts result and accepts transaction overrides', async () => {

            await assertGetter(
                new Strategy(ADDRESSES.STRATEGY, provider),
                'fyTokenCached',
                [returned],
                expected,
                overrides,
            );
        });
    });

    // ensure the ERC20 interface is inherited correctly by testing a few getters
    // the ERC20 contract is tested separately, this just ensures the interface and ABI is inherited

    suite('name', () => {

        test('unwraps result and accepts transaction overrides', async () => {

            await assertGetter(
                new Strategy(ADDRESSES.STRATEGY, provider),
                'name',
                ['FooBar'],
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
                ['FB'],
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
                [18],
                18,
                overrides,
            );
        });
    });
});
