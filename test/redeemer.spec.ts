import assert from 'assert';
import { Provider, TransactionResponse } from '@ethersproject/abstract-provider';
import { Signer } from '@ethersproject/abstract-signer';
import { BigNumber, BigNumberish, CallOverrides, PayableOverrides, Wallet, getDefaultProvider, utils } from 'ethers';
import { ADAPTERS, TokenOutput, buildTokenOutput } from '../src/constants/abi/index.js';
import { Principals, Redeemer } from '../src/index.js';
import { ADDRESSES, assertArguments, assertGetter, assertMethod, assertTransaction, mockExecutor, mockMethod, mockResponse } from './helpers/index.js';

suite('redeemer', () => {

    const callOverrides: CallOverrides = {
        gasLimit: '1000',
        from: '0xfrom',
        nonce: 1,
    };

    let provider: Provider;
    let signer: Signer;

    suiteSetup(() => {

        provider = getDefaultProvider();
        signer = Wallet.createRandom().connect(provider);
    });

    test('create instance', () => {

        const redeemer = new Redeemer(ADDRESSES.REDEEMER, provider);

        assert(redeemer instanceof Redeemer);

        assert.strictEqual(redeemer.address, ADDRESSES.REDEEMER);
    });

    suite('HOLD', () => {

        test('unwraps and converts result and accepts transaction overrides', async () => {

            await assertGetter(
                new Redeemer(ADDRESSES.REDEEMER, provider),
                'HOLD',
                [BigNumber.from('259200')],
                '259200',
                callOverrides,
            );
        });
    });

    suite('MIN_FEENOMINATOR', () => {

        test('unwraps result and accepts transaction overrides', async () => {

            await assertGetter(
                new Redeemer(ADDRESSES.REDEEMER, provider),
                'MIN_FEENOMINATOR',
                [BigNumber.from('500')],
                '500',
                callOverrides,
            );
        });
    });

    suite('admin', () => {

        test('unwraps result and accepts transaction overrides', async () => {

            await assertGetter(
                new Redeemer(ADDRESSES.REDEEMER, provider),
                'admin',
                ['0xadmin'],
                '0xadmin',
                callOverrides,
            );
        });
    });

    suite('marketplace', () => {

        test('unwraps result and accepts transaction overrides', async () => {

            await assertGetter(
                new Redeemer(ADDRESSES.REDEEMER, provider),
                'marketplace',
                ['0xmarketplace'],
                '0xmarketplace',
                callOverrides,
            );
        });
    });

    suite('lender', () => {

        test('unwraps result and accepts transaction overrides', async () => {

            await assertGetter(
                new Redeemer(ADDRESSES.REDEEMER, provider),
                'lender',
                ['0xlender'],
                '0xlender',
                callOverrides,
            );
        });
    });

    suite('redeemer', () => {

        test('unwraps result and accepts transaction overrides', async () => {

            await assertGetter(
                new Redeemer(ADDRESSES.REDEEMER, provider),
                'redeemer',
                ['0xredeemer'],
                '0xredeemer',
                callOverrides,
            );
        });
    });

    suite('feenominator', () => {

        test('unwraps result and accepts transaction overrides', async () => {

            await assertGetter(
                new Redeemer(ADDRESSES.REDEEMER, provider),
                'feenominator',
                [BigNumber.from('9000')],
                '9000',
                callOverrides,
            );
        });
    });

    suite('feeChange', () => {

        test('unwraps result and accepts transaction overrides', async () => {

            await assertGetter(
                new Redeemer(ADDRESSES.REDEEMER, provider),
                'feeChange',
                [BigNumber.from('1663257880')],
                '1663257880',
                callOverrides,
            );
        });
    });

    suite('converters', () => {

        const index = 0;
        const expected = '0xconverter';

        test('converts arguments, unwraps result and accepts transaction overrides', async () => {

            await assertMethod(
                new Redeemer(ADDRESSES.REDEEMER, provider),
                'converters',
                [index],
                [index],
                [expected],
                expected,
                callOverrides,
            );
        });
    });

    suite('paused', () => {

        const underlying = '0xunderlying';
        const maturity = '1663257880';
        const expected = true;

        test('converts arguments, unwraps result and accepts transaction overrides', async () => {

            await assertMethod(
                new Redeemer(ADDRESSES.REDEEMER, provider),
                'paused',
                [underlying, BigNumber.from(maturity)],
                [underlying, maturity],
                [expected],
                expected,
                callOverrides,
            );
        });
    });

    suite('holdings', () => {

        const underlying = '0xunderlying';
        const maturity = '1663257880';
        const expected = utils.parseEther('10000').toString();

        test('converts arguments, unwraps result and accepts transaction overrides', async () => {

            await assertMethod(
                new Redeemer(ADDRESSES.REDEEMER, provider),
                'holdings',
                [underlying, BigNumber.from(maturity)],
                [underlying, maturity],
                [BigNumber.from(expected)],
                expected,
                callOverrides,
            );
        });
    });

    suite('depositHoldings', () => {

        const underlying = '0xunderlying';
        const maturity = '1663257880';
        const amount = utils.parseEther('1000').toString();

        const overrides: PayableOverrides = {
            gasLimit: '1000',
            nonce: 1,
        };

        test('converts arguments and accepts transaction overrides', async () => {

            await assertTransaction(
                new Redeemer(ADDRESSES.REDEEMER, signer, mockExecutor()),
                'depositHoldings',
                [underlying, BigNumber.from(maturity), BigNumber.from(amount)],
                [underlying, maturity, amount],
                overrides,
            );
        });
    });

    suite('redeem', () => {

        let principal: Principals;

        const underlying = '0xunderlying';
        const maturity = '1654638431';

        const overrides: PayableOverrides = {
            gasLimit: '1000',
            nonce: 1,
        };

        // NOTE: ideally we would want to use `assertTransaction` for the redeem method, however,
        // as the redeem method is overloaded, we cannot use the `assertTransaction` helper due to
        // TypeScript not being able to infer the `Parameters<T>` type for the correct overload
        // (TS will infer the `Parameters<T>` type for the last overload, which is incorrect)

        test('illuminate', async () => {

            const redeemer = new Redeemer(ADDRESSES.REDEEMER, signer, mockExecutor());

            principal = Principals.Illuminate;

            const redeem = mockMethod<TransactionResponse>(redeemer, Redeemer.redeemSignatures.position);
            const response = mockResponse();
            redeem.resolves(response);

            const expectedArgs = [
                underlying,
                BigNumber.from(maturity),
            ];

            let result = await redeemer.redeem(principal, underlying, maturity);

            assert.strictEqual(result, response);

            assertArguments(redeem.getCall(0).args, [...expectedArgs, {}]);

            // do another call with overrides

            result = await redeemer.redeem(principal, underlying, maturity, [], overrides);

            assert.strictEqual(result, response);

            assertArguments(redeem.getCall(1).args, [...expectedArgs, overrides]);
        });

        test('yield', async () => {

            const redeemer = new Redeemer(ADDRESSES.REDEEMER, signer, mockExecutor());

            principal = Principals.Yield;

            const d: unknown[] = [];

            const redeem = mockMethod<TransactionResponse>(redeemer, Redeemer.redeemSignatures.protocol);
            const response = mockResponse();
            redeem.resolves(response);

            const expectedArgs = [
                principal,
                underlying,
                BigNumber.from(maturity),
                ADAPTERS[principal].redeem.encode(...d),
            ];

            let result = await redeemer.redeem(principal, underlying, maturity, d);

            assert.strictEqual(result, response);

            assertArguments(redeem.getCall(0).args, [...expectedArgs, {}]);

            // do another call with overrides

            result = await redeemer.redeem(principal, underlying, maturity, d, overrides);

            assert.strictEqual(result, response);

            assertArguments(redeem.getCall(1).args, [...expectedArgs, overrides]);
        });

        test('swivel', async () => {

            const redeemer = new Redeemer(ADDRESSES.REDEEMER, signer, mockExecutor());

            principal = Principals.Swivel;

            const d: unknown[] = [];

            const redeem = mockMethod<TransactionResponse>(redeemer, Redeemer.redeemSignatures.protocol);
            const response = mockResponse();
            redeem.resolves(response);

            const expectedArgs = [
                principal,
                underlying,
                BigNumber.from(maturity),
                ADAPTERS[principal].redeem.encode(...d),
            ];

            let result = await redeemer.redeem(principal, underlying, maturity, d);

            assert.strictEqual(result, response);

            assertArguments(redeem.getCall(0).args, [...expectedArgs, {}]);

            // do another call with overrides

            result = await redeemer.redeem(principal, underlying, maturity, d, overrides);

            assert.strictEqual(result, response);

            assertArguments(redeem.getCall(1).args, [...expectedArgs, overrides]);
        });

        test('pendle', async () => {

            const underlying = '0x1234567890000000000000000000000000000001';
            const maturity = '1654638431';
            const amount = utils.parseEther('100').toString();

            const redeemer = new Redeemer(ADDRESSES.REDEEMER, signer, mockExecutor());

            principal = Principals.Pendle;

            const d: [TokenOutput] = [buildTokenOutput(amount, underlying)];

            const redeem = mockMethod<TransactionResponse>(redeemer, Redeemer.redeemSignatures.protocol);
            const response = mockResponse();
            redeem.resolves(response);

            const expectedArgs = [
                principal,
                underlying,
                BigNumber.from(maturity),
                ADAPTERS[principal].redeem.encode(...d),
            ];

            let result = await redeemer.redeem(principal, underlying, maturity, d);

            assert.strictEqual(result, response);

            assertArguments(redeem.getCall(0).args, [...expectedArgs, {}]);

            // do another call with overrides

            result = await redeemer.redeem(principal, underlying, maturity, d, overrides);

            assert.strictEqual(result, response);

            assertArguments(redeem.getCall(1).args, [...expectedArgs, overrides]);
        });

        test('notional', async () => {

            const underlying = '0x1234567890000000000000000000000000000001';
            const maturity = '1654638431';

            const redeemer = new Redeemer(ADDRESSES.REDEEMER, signer, mockExecutor());

            principal = Principals.Notional;

            const d: [] = [];

            const redeem = mockMethod<TransactionResponse>(redeemer, Redeemer.redeemSignatures.protocol);
            const response = mockResponse();
            redeem.resolves(response);

            const expectedArgs = [
                principal,
                underlying,
                BigNumber.from(maturity),
                ADAPTERS[principal].redeem.encode(...d),
            ];

            let result = await redeemer.redeem(principal, underlying, maturity, d);

            assert.strictEqual(result, response);

            assertArguments(redeem.getCall(0).args, [...expectedArgs, {}]);

            // do another call with overrides

            result = await redeemer.redeem(principal, underlying, maturity, d, overrides);

            assert.strictEqual(result, response);

            assertArguments(redeem.getCall(1).args, [...expectedArgs, overrides]);
        });

        test('exactly', async () => {

            const underlying = '0x1234567890000000000000000000000000000001';
            const maturity = '1654638431';
            const exactlymaturity = '1654638431';

            const redeemer = new Redeemer(ADDRESSES.REDEEMER, signer, mockExecutor());

            principal = Principals.Exactly;

            const d: [BigNumberish] = [exactlymaturity];

            const redeem = mockMethod<TransactionResponse>(redeemer, Redeemer.redeemSignatures.protocol);
            const response = mockResponse();
            redeem.resolves(response);

            const expectedArgs = [
                principal,
                underlying,
                BigNumber.from(maturity),
                ADAPTERS[principal].redeem.encode(...d),
            ];

            let result = await redeemer.redeem(principal, underlying, maturity, d);

            assert.strictEqual(result, response);

            assertArguments(redeem.getCall(0).args, [...expectedArgs, {}]);

            // do another call with overrides

            result = await redeemer.redeem(principal, underlying, maturity, d, overrides);

            assert.strictEqual(result, response);

            assertArguments(redeem.getCall(1).args, [...expectedArgs, overrides]);
        });

        test('term', async () => {

            const underlying = '0x1234567890000000000000000000000000000001';
            const maturity = '1654638431';
            const targetRedeemer = '0x1234567890000000000000000000000000000002';
            const targetToken = '0x1234567890000000000000000000000000000003';

            const redeemer = new Redeemer(ADDRESSES.REDEEMER, signer, mockExecutor());

            principal = Principals.Term;

            const d: [string, string] = [targetRedeemer, targetToken];

            const redeem = mockMethod<TransactionResponse>(redeemer, Redeemer.redeemSignatures.protocol);
            const response = mockResponse();
            redeem.resolves(response);

            const expectedArgs = [
                principal,
                underlying,
                BigNumber.from(maturity),
                ADAPTERS[principal].redeem.encode(...d),
            ];

            let result = await redeemer.redeem(principal, underlying, maturity, d);

            assert.strictEqual(result, response);

            assertArguments(redeem.getCall(0).args, [...expectedArgs, {}]);

            // do another call with overrides

            result = await redeemer.redeem(principal, underlying, maturity, d, overrides);

            assert.strictEqual(result, response);

            assertArguments(redeem.getCall(1).args, [...expectedArgs, overrides]);
        });
    });
});
