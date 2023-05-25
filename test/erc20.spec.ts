import assert from 'assert';
import { Provider, TransactionResponse } from '@ethersproject/abstract-provider';
import { BigNumber, CallOverrides, PayableOverrides, getDefaultProvider, utils } from 'ethers';
import { suite, suiteSetup, test } from 'mocha';
import { ERC20 } from '../src/index.js';
import { ADDRESSES, assertGetter, mockExecutor, mockMethod, mockResponse } from './helpers/index.js';

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
                6,
                overrides,
            );
        });
    });

    suite('totalSupply', () => {

        const returned = BigNumber.from('1000000000');
        const expected = returned.toString();

        test('unwraps and converts result and accepts transaction overrides', async () => {

            const erc20 = new ERC20(ADDRESSES.STRATEGY, provider);
            const totalSupply = mockMethod<BigNumber>(erc20, 'totalSupply');
            totalSupply.resolves([returned]);

            let result = await erc20.totalSupply();

            assert.strictEqual(result, expected);

            let args = totalSupply.getCall(0).args;

            assert.strictEqual(args.length, 1);

            let [passedOverrides] = args;

            assert.deepStrictEqual(passedOverrides, {});

            // with overrides

            result = await erc20.totalSupply(overrides);

            assert.strictEqual(result, expected);

            args = totalSupply.getCall(1).args;

            assert.strictEqual(args.length, 1);

            [passedOverrides] = args;

            assert.deepStrictEqual(passedOverrides, overrides);
        });
    });

    suite('balanceOf', () => {

        const owner = '0xowner';
        const returned = BigNumber.from('500000000');
        const expected = returned.toString();

        test('unwraps and converts result and accepts transaction overrides', async () => {

            const erc20 = new ERC20(ADDRESSES.STRATEGY, provider);
            const balanceOf = mockMethod<BigNumber>(erc20, 'balanceOf');
            balanceOf.resolves([returned]);

            let result = await erc20.balanceOf(owner);

            assert.strictEqual(result, expected);

            let args = balanceOf.getCall(0).args;

            assert.strictEqual(args.length, 2);

            let [passedOwner, passedOverrides] = args;

            assert.strictEqual(passedOwner, owner);
            assert.deepStrictEqual(passedOverrides, {});

            // with overrides

            result = await erc20.balanceOf(owner, overrides);

            assert.strictEqual(result, expected);

            args = balanceOf.getCall(1).args;

            assert.strictEqual(args.length, 2);

            [passedOwner, passedOverrides] = args;

            assert.strictEqual(passedOwner, owner);
            assert.deepStrictEqual(passedOverrides, overrides);
        });
    });

    suite('allowance', () => {

        const owner = '0xowner';
        const spender = '0xspender';
        const returned = BigNumber.from('500000000');
        const expected = returned.toString();

        test('unwraps and converts result and accepts transaction overrides', async () => {

            const erc20 = new ERC20(ADDRESSES.STRATEGY, provider);
            const allowance = mockMethod<BigNumber>(erc20, 'allowance');
            allowance.resolves([returned]);

            let result = await erc20.allowance(owner, spender);

            assert.strictEqual(result, expected);

            let args = allowance.getCall(0).args;

            assert.strictEqual(args.length, 3);

            let [passedOwner, passedSpender, passedOverrides] = args;

            assert.strictEqual(passedOwner, owner);
            assert.strictEqual(passedSpender, spender);
            assert.deepStrictEqual(passedOverrides, {});

            // with overrides

            result = await erc20.allowance(owner, spender, overrides);

            assert.strictEqual(result, expected);

            args = allowance.getCall(1).args;

            assert.strictEqual(args.length, 3);

            [passedOwner, passedSpender, passedOverrides] = args;

            assert.strictEqual(passedOwner, owner);
            assert.strictEqual(passedSpender, spender);
            assert.deepStrictEqual(passedOverrides, overrides);
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

            const erc20 = new ERC20(ADDRESSES.STRATEGY, provider, mockExecutor());

            const approve = mockMethod<TransactionResponse>(erc20, 'approve');
            const response = mockResponse();
            approve.resolves(response);

            let result = await erc20.approve(spender, amount);

            assert.deepStrictEqual(result, response);

            let args = approve.getCall(0).args;

            assert.strictEqual(args.length, 3);

            let [passedSpender, passedAmount, passedOverrides] = args;

            assert.strictEqual(passedSpender, spender);
            assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
            assert.deepStrictEqual(passedOverrides, {});

            // with overrides

            result = await erc20.approve(spender, amount, overrides);

            assert.deepStrictEqual(result, response);

            args = approve.getCall(1).args;

            assert.strictEqual(args.length, 3);

            [passedSpender, passedAmount, passedOverrides] = args;

            assert.strictEqual(passedSpender, spender);
            assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
            assert.deepStrictEqual(passedOverrides, overrides);
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

            const erc20 = new ERC20(ADDRESSES.STRATEGY, provider, mockExecutor());

            const transfer = mockMethod<TransactionResponse>(erc20, 'transfer');
            const response = mockResponse();
            transfer.resolves(response);

            let result = await erc20.transfer(recipient, amount);

            assert.deepStrictEqual(result, response);

            let args = transfer.getCall(0).args;

            assert.strictEqual(args.length, 3);

            let [passedRecipient, passedAmount, passedOverrides] = args;

            assert.strictEqual(passedRecipient, recipient);
            assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
            assert.deepStrictEqual(passedOverrides, {});

            // with overrides

            result = await erc20.transfer(recipient, amount, overrides);

            assert.deepStrictEqual(result, response);

            args = transfer.getCall(1).args;

            assert.strictEqual(args.length, 3);

            [passedRecipient, passedAmount, passedOverrides] = args;

            assert.strictEqual(passedRecipient, recipient);
            assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
            assert.deepStrictEqual(passedOverrides, overrides);
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

            const erc20 = new ERC20(ADDRESSES.STRATEGY, provider, mockExecutor());

            const transferFrom = mockMethod<TransactionResponse>(erc20, 'transferFrom');
            const response = mockResponse();
            transferFrom.resolves(response);

            let result = await erc20.transferFrom(sender, recipient, amount);

            assert.deepStrictEqual(result, response);

            let args = transferFrom.getCall(0).args;

            assert.strictEqual(args.length, 4);

            let [passedSender, passedRecipient, passedAmount, passedOverrides] = args;

            assert.strictEqual(passedSender, sender);
            assert.strictEqual(passedRecipient, recipient);
            assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
            assert.deepStrictEqual(passedOverrides, {});

            // with overrides

            result = await erc20.transferFrom(sender, recipient, amount, overrides);

            assert.deepStrictEqual(result, response);

            args = transferFrom.getCall(1).args;

            assert.strictEqual(args.length, 4);

            [passedSender, passedRecipient, passedAmount, passedOverrides] = args;

            assert.strictEqual(passedSender, sender);
            assert.strictEqual(passedRecipient, recipient);
            assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
            assert.deepStrictEqual(passedOverrides, overrides);
        });
    });
});
