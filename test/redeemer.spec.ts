import assert from 'assert';
import { Provider, TransactionResponse } from '@ethersproject/abstract-provider';
import { Signer } from '@ethersproject/abstract-signer';
import { BigNumber, CallOverrides, getDefaultProvider, PayableOverrides, utils, Wallet } from 'ethers';
import { Principals, Redeemer } from '../src/index.js';
import { ADDRESSES, assertGetter, mockExecutor, mockMethod, mockResponse } from './helpers/index.js';

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

    suite('admin', () => {

        test('unwraps result and accepts transaction overrides', async () => {

            await assertGetter(
                new Redeemer(ADDRESSES.REDEEMER, provider),
                'admin',
                '0xadmin',
                callOverrides,
            );
        });
    });

    suite('marketPlace', () => {

        test('unwraps result and accepts transaction overrides', async () => {

            await assertGetter(
                new Redeemer(ADDRESSES.REDEEMER, provider),
                'marketPlace',
                '0xmarketPlace',
                callOverrides,
            );
        });
    });

    suite('lender', () => {

        test('unwraps result and accepts transaction overrides', async () => {

            await assertGetter(
                new Redeemer(ADDRESSES.REDEEMER, provider),
                'lender',
                '0xlender',
                callOverrides,
            );
        });
    });

    suite('converter', () => {

        test('unwraps result and accepts transaction overrides', async () => {

            await assertGetter(
                new Redeemer(ADDRESSES.REDEEMER, provider),
                'converter',
                '0xconverter',
                callOverrides,
            );
        });
    });

    suite('swivelAddr', () => {

        test('unwraps result and accepts transaction overrides', async () => {

            await assertGetter(
                new Redeemer(ADDRESSES.REDEEMER, provider),
                'swivelAddr',
                '0xswivelAddr',
                callOverrides,
            );
        });
    });

    suite('pendleAddr', () => {

        test('unwraps result and accepts transaction overrides', async () => {

            await assertGetter(
                new Redeemer(ADDRESSES.REDEEMER, provider),
                'pendleAddr',
                '0xpendleAddr',
                callOverrides,
            );
        });
    });

    suite('tempusAddr', () => {

        test('unwraps result and accepts transaction overrides', async () => {

            await assertGetter(
                new Redeemer(ADDRESSES.REDEEMER, provider),
                'tempusAddr',
                '0xtempusAddr',
                callOverrides,
            );
        });
    });

    suite('apwineAddr', () => {

        test('unwraps result and accepts transaction overrides', async () => {

            await assertGetter(
                new Redeemer(ADDRESSES.REDEEMER, provider),
                'apwineAddr',
                '0xapwineAddr',
                callOverrides,
            );
        });
    });

    suite('paused', () => {

        const underlying = '0xunderlying';
        const maturity = '1663257880';
        const expected = true;

        test('unwraps and converts result', async () => {

            const redeemer = new Redeemer(ADDRESSES.REDEEMER, provider);

            const paused = mockMethod<boolean>(redeemer, 'paused');
            paused.resolves([expected]);

            const result = await redeemer.paused(underlying, maturity);

            assert.strictEqual(result, expected);

            const args = paused.getCall(0).args;

            assert.strictEqual(args.length, 3);

            const [passedUnderlying, passedMaturity, passedOverrides] = args;

            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedOverrides, {});
        });

        test('accepts transaction overrides', async () => {

            const redeemer = new Redeemer(ADDRESSES.REDEEMER, provider);

            const paused = mockMethod<boolean>(redeemer, 'paused');
            paused.resolves([expected]);

            const result = await redeemer.paused(underlying, maturity, callOverrides);

            assert.strictEqual(result, expected);

            const args = paused.getCall(0).args;

            assert.strictEqual(args.length, 3);

            const [passedUnderlying, passedMaturity, passedOverrides] = args;

            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedOverrides, callOverrides);
        });
    });

    suite('holdings', () => {

        const underlying = '0xunderlying';
        const maturity = '1663257880';
        const expected = utils.parseEther('10000').toString();

        test('unwraps and converts result', async () => {

            const redeemer = new Redeemer(ADDRESSES.REDEEMER, provider);

            const holdings = mockMethod<BigNumber>(redeemer, 'holdings');
            holdings.resolves([BigNumber.from(expected)]);

            const result = await redeemer.holdings(underlying, maturity);

            assert.strictEqual(result, expected);

            const args = holdings.getCall(0).args;

            assert.strictEqual(args.length, 3);

            const [passedUnderlying, passedMaturity, passedOverrides] = args;

            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedOverrides, {});
        });

        test('accepts transaction overrides', async () => {

            const redeemer = new Redeemer(ADDRESSES.REDEEMER, provider);

            const holdings = mockMethod<BigNumber>(redeemer, 'holdings');
            holdings.resolves([BigNumber.from(expected)]);

            const result = await redeemer.holdings(underlying, maturity, callOverrides);

            assert.strictEqual(result, expected);

            const args = holdings.getCall(0).args;

            assert.strictEqual(args.length, 3);

            const [passedUnderlying, passedMaturity, passedOverrides] = args;

            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedOverrides, callOverrides);
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

        test('illuminate', async () => {

            const redeemer = new Redeemer(ADDRESSES.REDEEMER, signer, mockExecutor());

            principal = Principals.Illuminate;

            const redeem = mockMethod<TransactionResponse>(redeemer, Redeemer.redeemSignatures[principal]);
            const response = mockResponse();
            redeem.resolves(response);

            let result = await redeemer.redeem(principal, underlying, maturity);

            assert.strictEqual(result.hash, response.hash);

            // get the call arguments
            let args = redeem.getCall(0).args;

            // assert the correct amount of call arguments
            assert.strictEqual(args.length, 3);

            // NOTE: we pass the Principals to the HOC's redeem method (for proper function overloading)
            // however, the contract method for illuminate redeem does not receive the Principals
            let [passedUnderlying, passedMaturity, passedOverrides] = args;

            // assert the arguments are being converted correctly
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedOverrides, {});

            // do another call with overrides
            result = await redeemer.redeem(principal, underlying, maturity, overrides);

            assert.strictEqual(result.hash, response.hash);

            // get the call arguments for the second call
            args = redeem.getCall(1).args;

            // assert the correct amount of call arguments
            assert.strictEqual(args.length, 3);

            [passedUnderlying, passedMaturity, passedOverrides] = args;

            // assert the arguments are being converted correctly
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedOverrides, overrides);
        });

        test('swivel', async () => {

            const redeemer = new Redeemer(ADDRESSES.REDEEMER, signer, mockExecutor());

            principal = Principals.Swivel;

            const redeem = mockMethod<TransactionResponse>(redeemer, Redeemer.redeemSignatures[principal]);
            const response = mockResponse();
            redeem.resolves(response);

            let result = await redeemer.redeem(principal, underlying, maturity);

            assert.strictEqual(result.hash, response.hash);

            // get the call arguments
            let args = redeem.getCall(0).args;

            // assert the correct amount of call arguments
            assert.strictEqual(args.length, 4);

            let [passedPrincipal, passedUnderlying, passedMaturity, passedOverrides] = args;

            // assert the arguments are being converted correctly
            assert.strictEqual(passedPrincipal, principal);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedOverrides, {});

            // do another call with overrides
            result = await redeemer.redeem(principal, underlying, maturity, overrides);

            assert.strictEqual(result.hash, response.hash);

            // get the call arguments for the second call
            args = redeem.getCall(1).args;

            // assert the correct amount of call arguments
            assert.strictEqual(args.length, 4);

            [passedPrincipal, passedUnderlying, passedMaturity, passedOverrides] = args;

            // assert the arguments are being converted correctly
            assert.strictEqual(passedPrincipal, principal);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedOverrides, overrides);
        });

        test('yield', async () => {

            const redeemer = new Redeemer(ADDRESSES.REDEEMER, signer, mockExecutor());

            principal = Principals.Yield;

            const redeem = mockMethod<TransactionResponse>(redeemer, Redeemer.redeemSignatures[principal]);
            const response = mockResponse();
            redeem.resolves(response);

            let result = await redeemer.redeem(principal, underlying, maturity);

            assert.strictEqual(result.hash, response.hash);

            // get the call arguments
            let args = redeem.getCall(0).args;

            // assert the correct amount of call arguments
            assert.strictEqual(args.length, 4);

            let [passedPrincipal, passedUnderlying, passedMaturity, passedOverrides] = args;

            // assert the arguments are being converted correctly
            assert.strictEqual(passedPrincipal, principal);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedOverrides, {});

            // do another call with overrides
            result = await redeemer.redeem(principal, underlying, maturity, overrides);

            assert.strictEqual(result.hash, response.hash);

            // get the call arguments for the second call
            args = redeem.getCall(1).args;

            // assert the correct amount of call arguments
            assert.strictEqual(args.length, 4);

            [passedPrincipal, passedUnderlying, passedMaturity, passedOverrides] = args;

            // assert the arguments are being converted correctly
            assert.strictEqual(passedPrincipal, principal);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedOverrides, overrides);
        });

        test('element', async () => {

            const redeemer = new Redeemer(ADDRESSES.REDEEMER, signer, mockExecutor());

            principal = Principals.Element;

            const redeem = mockMethod<TransactionResponse>(redeemer, Redeemer.redeemSignatures[principal]);
            const response = mockResponse();
            redeem.resolves(response);

            let result = await redeemer.redeem(principal, underlying, maturity);

            assert.strictEqual(result.hash, response.hash);

            // get the call arguments
            let args = redeem.getCall(0).args;

            // assert the correct amount of call arguments
            assert.strictEqual(args.length, 4);

            let [passedPrincipal, passedUnderlying, passedMaturity, passedOverrides] = args;

            // assert the arguments are being converted correctly
            assert.strictEqual(passedPrincipal, principal);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedOverrides, {});

            // do another call with overrides
            result = await redeemer.redeem(principal, underlying, maturity, overrides);

            assert.strictEqual(result.hash, response.hash);

            // get the call arguments for the second call
            args = redeem.getCall(1).args;

            // assert the correct amount of call arguments
            assert.strictEqual(args.length, 4);

            [passedPrincipal, passedUnderlying, passedMaturity, passedOverrides] = args;

            // assert the arguments are being converted correctly
            assert.strictEqual(passedPrincipal, principal);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedOverrides, overrides);
        });

        test('notional', async () => {

            const redeemer = new Redeemer(ADDRESSES.REDEEMER, signer, mockExecutor());

            principal = Principals.Notional;

            const redeem = mockMethod<TransactionResponse>(redeemer, Redeemer.redeemSignatures[principal]);
            const response = mockResponse();
            redeem.resolves(response);

            let result = await redeemer.redeem(principal, underlying, maturity);

            assert.strictEqual(result.hash, response.hash);

            // get the call arguments
            let args = redeem.getCall(0).args;

            // assert the correct amount of call arguments
            assert.strictEqual(args.length, 4);

            let [passedPrincipal, passedUnderlying, passedMaturity, passedOverrides] = args;

            // assert the arguments are being converted correctly
            assert.strictEqual(passedPrincipal, principal);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedOverrides, {});

            // do another call with overrides
            result = await redeemer.redeem(principal, underlying, maturity, overrides);

            assert.strictEqual(result.hash, response.hash);

            // get the call arguments for the second call
            args = redeem.getCall(1).args;

            // assert the correct amount of call arguments
            assert.strictEqual(args.length, 4);

            [passedPrincipal, passedUnderlying, passedMaturity, passedOverrides] = args;

            // assert the arguments are being converted correctly
            assert.strictEqual(passedPrincipal, principal);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedOverrides, overrides);
        });

        test('apwine', async () => {

            const redeemer = new Redeemer(ADDRESSES.REDEEMER, signer, mockExecutor());

            principal = Principals.Apwine;

            const redeem = mockMethod<TransactionResponse>(redeemer, Redeemer.redeemSignatures[principal]);
            const response = mockResponse();
            redeem.resolves(response);

            let result = await redeemer.redeem(principal, underlying, maturity);

            assert.strictEqual(result.hash, response.hash);

            // get the call arguments
            let args = redeem.getCall(0).args;

            // assert the correct amount of call arguments
            assert.strictEqual(args.length, 4);

            let [passedPrincipal, passedUnderlying, passedMaturity, passedOverrides] = args;

            // assert the arguments are being converted correctly
            assert.strictEqual(passedPrincipal, principal);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedOverrides, {});

            // do another call with overrides
            result = await redeemer.redeem(principal, underlying, maturity, overrides);

            assert.strictEqual(result.hash, response.hash);

            // get the call arguments for the second call
            args = redeem.getCall(1).args;

            // assert the correct amount of call arguments
            assert.strictEqual(args.length, 4);

            [passedPrincipal, passedUnderlying, passedMaturity, passedOverrides] = args;

            // assert the arguments are being converted correctly
            assert.strictEqual(passedPrincipal, principal);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedOverrides, overrides);
        });

        test('tempus', async () => {

            const redeemer = new Redeemer(ADDRESSES.REDEEMER, signer, mockExecutor());

            principal = Principals.Tempus;

            const redeem = mockMethod<TransactionResponse>(redeemer, Redeemer.redeemSignatures[principal]);
            const response = mockResponse();
            redeem.resolves(response);

            let result = await redeemer.redeem(principal, underlying, maturity);

            assert.strictEqual(result.hash, response.hash);

            // get the call arguments
            let args = redeem.getCall(0).args;

            // assert the correct amount of call arguments
            assert.strictEqual(args.length, 4);

            let [passedPrincipal, passedUnderlying, passedMaturity, passedOverrides] = args;

            // assert the arguments are being converted correctly
            assert.strictEqual(passedPrincipal, principal);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedOverrides, {});

            // do another call with overrides
            result = await redeemer.redeem(principal, underlying, maturity, overrides);

            assert.strictEqual(result.hash, response.hash);

            // get the call arguments for the second call
            args = redeem.getCall(1).args;

            // assert the correct amount of call arguments
            assert.strictEqual(args.length, 4);

            [passedPrincipal, passedUnderlying, passedMaturity, passedOverrides] = args;

            // assert the arguments are being converted correctly
            assert.strictEqual(passedPrincipal, principal);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedOverrides, overrides);
        });

        test('pendle', async () => {

            const redeemer = new Redeemer(ADDRESSES.REDEEMER, signer, mockExecutor());

            principal = Principals.Pendle;

            const redeem = mockMethod<TransactionResponse>(redeemer, Redeemer.redeemSignatures[principal]);
            const response = mockResponse();
            redeem.resolves(response);

            let result = await redeemer.redeem(principal, underlying, maturity);

            assert.strictEqual(result.hash, response.hash);

            // get the call arguments
            let args = redeem.getCall(0).args;

            // assert the correct amount of call arguments
            assert.strictEqual(args.length, 4);

            let [passedPrincipal, passedUnderlying, passedMaturity, passedOverrides] = args;

            // assert the arguments are being converted correctly
            assert.strictEqual(passedPrincipal, principal);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedOverrides, {});

            // do another call with overrides
            result = await redeemer.redeem(principal, underlying, maturity, overrides);

            assert.strictEqual(result.hash, response.hash);

            // get the call arguments for the second call
            args = redeem.getCall(1).args;

            // assert the correct amount of call arguments
            assert.strictEqual(args.length, 4);

            [passedPrincipal, passedUnderlying, passedMaturity, passedOverrides] = args;

            // assert the arguments are being converted correctly
            assert.strictEqual(passedPrincipal, principal);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedOverrides, overrides);
        });

        test('sense', async () => {

            const redeemer = new Redeemer(ADDRESSES.REDEEMER, signer, mockExecutor());

            principal = Principals.Sense;

            const senseMaturity = '1663258804';

            const redeem = mockMethod<TransactionResponse>(redeemer, Redeemer.redeemSignatures[principal]);
            const response = mockResponse();
            redeem.resolves(response);

            let result = await redeemer.redeem(principal, underlying, maturity, senseMaturity);

            assert.strictEqual(result.hash, response.hash);

            // get the call arguments
            let args = redeem.getCall(0).args;

            // assert the correct amount of call arguments
            assert.strictEqual(args.length, 5);

            let [passedPrincipal, passedUnderlying, passedMaturity, passedSenseMaturity, passedOverrides] = args;

            // assert the arguments are being converted correctly
            assert.strictEqual(passedPrincipal, principal);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedSenseMaturity, BigNumber.from(senseMaturity));
            assert.deepStrictEqual(passedOverrides, {});

            // do another call with overrides
            result = await redeemer.redeem(principal, underlying, maturity, senseMaturity, overrides);

            assert.strictEqual(result.hash, response.hash);

            // get the call arguments for the second call
            args = redeem.getCall(1).args;

            // assert the correct amount of call arguments
            assert.strictEqual(args.length, 5);

            [passedPrincipal, passedUnderlying, passedMaturity, passedSenseMaturity, passedOverrides] = args;

            // assert the arguments are being converted correctly
            assert.strictEqual(passedPrincipal, principal);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedSenseMaturity, BigNumber.from(senseMaturity));
            assert.deepStrictEqual(passedOverrides, overrides);
        });
    });
});
