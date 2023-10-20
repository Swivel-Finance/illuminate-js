import assert from 'assert';
import { Provider } from '@ethersproject/abstract-provider';
import { BigNumber, CallOverrides, PayableOverrides, getDefaultProvider, utils } from 'ethers';
import { suite, suiteSetup, test } from 'mocha';
import { ERC20 } from '../src/index.js';
import { ADDRESSES, assertGetter, assertMethod, assertTransaction, mockExecutor } from './helpers/index.js';

suite('erc20', () => {

    const overrides: CallOverrides = {
        gasLimit: '1000',
        from: '0xfrom',
        nonce: 1,
    };

    let provider: Provider;

    suiteSetup(() => {

        provider = getDefaultProvider('goerli');
    });

    test('create instance', () => {

        const erc20 = new ERC20(ADDRESSES.STRATEGY, provider);

        assert(erc20 instanceof ERC20);

        assert.strictEqual(erc20.address, ADDRESSES.STRATEGY);
    });

    suite('name', () => {

        test('unwraps result and accepts transaction overrides', async () => {

            await assertGetter(
                new ERC20(ADDRESSES.STRATEGY, provider),
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
                new ERC20(ADDRESSES.STRATEGY, provider),
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
                new ERC20(ADDRESSES.STRATEGY, provider),
                'decimals',
                [6],
                6,
                overrides,
            );
        });
    });

    suite('totalSupply', () => {

        const returned = BigNumber.from('1000000000');
        const expected = returned.toString();

        test('unwraps and converts result and accepts transaction overrides', async () => {

            await assertGetter(
                new ERC20(ADDRESSES.STRATEGY, provider),
                'totalSupply',
                [returned],
                expected,
                overrides,
            );
        });
    });

    suite('balanceOf', () => {

        const owner = '0xowner';
        const returned = BigNumber.from('500000000');
        const expected = returned.toString();

        test('unwraps and converts result and accepts transaction overrides', async () => {

            await assertMethod(
                new ERC20(ADDRESSES.STRATEGY, provider),
                'balanceOf',
                [owner],
                [owner],
                [returned],
                expected,
                overrides,
            );
        });
    });

    suite('allowance', () => {

        const owner = '0xowner';
        const spender = '0xspender';
        const returned = BigNumber.from('500000000');
        const expected = returned.toString();

        test('unwraps and converts result and accepts transaction overrides', async () => {

            await assertMethod(
                new ERC20(ADDRESSES.STRATEGY, provider),
                'allowance',
                [owner, spender],
                [owner, spender],
                [returned],
                expected,
                overrides,
            );
        });
    });

    suite('approve', () => {

        const spender = '0xspender';
        const amount = utils.parseEther('100').toString();

        const overrides: PayableOverrides = {
            gasLimit: '10000',
            nonce: 3,
        };

        test('converts arguments and accepts transaction overrides', async () => {

            await assertTransaction(
                new ERC20(ADDRESSES.STRATEGY, provider, mockExecutor()),
                'approve',
                [spender, BigNumber.from(amount)],
                [spender, amount],
                overrides,
            );
        });
    });

    suite('transfer', () => {

        const recipient = '0xrecipient';
        const amount = utils.parseEther('100').toString();

        const overrides: PayableOverrides = {
            gasLimit: '10000',
            nonce: 3,
        };

        test('converts arguments and accepts transaction overrides', async () => {

            await assertTransaction(
                new ERC20(ADDRESSES.STRATEGY, provider, mockExecutor()),
                'transfer',
                [recipient, BigNumber.from(amount)],
                [recipient, amount],
                overrides,
            );
        });
    });

    suite('transferFrom', () => {

        const sender = '0xsender';
        const recipient = '0xrecipient';
        const amount = utils.parseEther('100').toString();

        const overrides: PayableOverrides = {
            gasLimit: '10000',
            nonce: 3,
        };

        test('converts arguments and accepts transaction overrides', async () => {

            await assertTransaction(
                new ERC20(ADDRESSES.STRATEGY, provider, mockExecutor()),
                'transferFrom',
                [sender, recipient, BigNumber.from(amount)],
                [sender, recipient, amount],
                overrides,
            );
        });
    });
});
