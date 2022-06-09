import assert from 'assert';
import { Provider, TransactionResponse } from '@ethersproject/abstract-provider';
import { Signer } from '@ethersproject/abstract-signer';
import { BigNumber, CallOverrides, getDefaultProvider, PayableOverrides, Wallet } from 'ethers';
import { Principals, Redeemer } from '../src/index.js';
import { ADDRESSES, assertGetter, mockMethod, mockResponse } from './helpers/index.js';

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

    suite('redeem', () => {

        let principal: Principals;

        const underlying = '0xunderlying';
        const maturity = '1654638431';

        const overrides: PayableOverrides = {
            gasLimit: '1000',
            nonce: 1,
        };

        test('swivel', async () => {

            const redeemer = new Redeemer(ADDRESSES.REDEEMER, signer);

            principal = Principals.Swivel;

            const redeem = mockMethod<TransactionResponse>(redeemer, Redeemer.redeemSignatures[principal]);
            const response = mockResponse();
            redeem.resolves(response);

            let result = await redeemer.redeem(principal, underlying, maturity);

            assert.strictEqual(result.hash, '0xresponse');

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

            assert.strictEqual(result.hash, '0xresponse');

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

            const redeemer = new Redeemer(ADDRESSES.REDEEMER, signer);

            principal = Principals.Yield;

            const redeem = mockMethod<TransactionResponse>(redeemer, Redeemer.redeemSignatures[principal]);
            const response = mockResponse();
            redeem.resolves(response);

            let result = await redeemer.redeem(principal, underlying, maturity);

            assert.strictEqual(result.hash, '0xresponse');

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

            assert.strictEqual(result.hash, '0xresponse');

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

            const redeemer = new Redeemer(ADDRESSES.REDEEMER, signer);

            principal = Principals.Element;

            const redeem = mockMethod<TransactionResponse>(redeemer, Redeemer.redeemSignatures[principal]);
            const response = mockResponse();
            redeem.resolves(response);

            let result = await redeemer.redeem(principal, underlying, maturity);

            assert.strictEqual(result.hash, '0xresponse');

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

            assert.strictEqual(result.hash, '0xresponse');

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

            const redeemer = new Redeemer(ADDRESSES.REDEEMER, signer);

            principal = Principals.Notional;

            const redeem = mockMethod<TransactionResponse>(redeemer, Redeemer.redeemSignatures[principal]);
            const response = mockResponse();
            redeem.resolves(response);

            let result = await redeemer.redeem(principal, underlying, maturity);

            assert.strictEqual(result.hash, '0xresponse');

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

            assert.strictEqual(result.hash, '0xresponse');

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

        test('illuminate', async () => {

            const redeemer = new Redeemer(ADDRESSES.REDEEMER, signer);

            principal = Principals.Illuminate;

            const controller = '0xcontroller';

            const redeem = mockMethod<TransactionResponse>(redeemer, Redeemer.redeemSignatures[principal]);
            const response = mockResponse();
            redeem.resolves(response);

            let result = await redeemer.redeem(principal, underlying, maturity, controller);

            assert.strictEqual(result.hash, '0xresponse');

            // get the call arguments
            let args = redeem.getCall(0).args;

            // assert the correct amount of call arguments
            assert.strictEqual(args.length, 5);

            let [passedPrincipal, passedUnderlying, passedMaturity, passedController, passedOverrides] = args;

            // assert the arguments are being converted correctly
            assert.strictEqual(passedPrincipal, principal);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.strictEqual(passedController, controller);
            assert.deepStrictEqual(passedOverrides, {});

            // do another call with overrides
            result = await redeemer.redeem(principal, underlying, maturity, controller, overrides);

            assert.strictEqual(result.hash, '0xresponse');

            // get the call arguments for the second call
            args = redeem.getCall(1).args;

            // assert the correct amount of call arguments
            assert.strictEqual(args.length, 5);

            [passedPrincipal, passedUnderlying, passedMaturity, passedController, passedOverrides] = args;

            // assert the arguments are being converted correctly
            assert.strictEqual(passedPrincipal, principal);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.strictEqual(passedController, controller);
            assert.deepStrictEqual(passedOverrides, overrides);
        });

        test('apwine', async () => {

            const redeemer = new Redeemer(ADDRESSES.REDEEMER, signer);

            principal = Principals.Apwine;

            const controller = '0xcontroller';

            const redeem = mockMethod<TransactionResponse>(redeemer, Redeemer.redeemSignatures[principal]);
            const response = mockResponse();
            redeem.resolves(response);

            let result = await redeemer.redeem(principal, underlying, maturity, controller);

            assert.strictEqual(result.hash, '0xresponse');

            // get the call arguments
            let args = redeem.getCall(0).args;

            // assert the correct amount of call arguments
            assert.strictEqual(args.length, 5);

            let [passedPrincipal, passedUnderlying, passedMaturity, passedController, passedOverrides] = args;

            // assert the arguments are being converted correctly
            assert.strictEqual(passedPrincipal, principal);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.strictEqual(passedController, controller);
            assert.deepStrictEqual(passedOverrides, {});

            // do another call with overrides
            result = await redeemer.redeem(principal, underlying, maturity, controller, overrides);

            assert.strictEqual(result.hash, '0xresponse');

            // get the call arguments for the second call
            args = redeem.getCall(1).args;

            // assert the correct amount of call arguments
            assert.strictEqual(args.length, 5);

            [passedPrincipal, passedUnderlying, passedMaturity, passedController, passedOverrides] = args;

            // assert the arguments are being converted correctly
            assert.strictEqual(passedPrincipal, principal);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.strictEqual(passedController, controller);
            assert.deepStrictEqual(passedOverrides, overrides);
        });

        test('tempus', async () => {

            const redeemer = new Redeemer(ADDRESSES.REDEEMER, signer);

            principal = Principals.Tempus;

            const controller = '0xcontroller';

            const redeem = mockMethod<TransactionResponse>(redeemer, Redeemer.redeemSignatures[principal]);
            const response = mockResponse();
            redeem.resolves(response);

            let result = await redeemer.redeem(principal, underlying, maturity, controller);

            assert.strictEqual(result.hash, '0xresponse');

            // get the call arguments
            let args = redeem.getCall(0).args;

            // assert the correct amount of call arguments
            assert.strictEqual(args.length, 5);

            let [passedPrincipal, passedUnderlying, passedMaturity, passedController, passedOverrides] = args;

            // assert the arguments are being converted correctly
            assert.strictEqual(passedPrincipal, principal);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.strictEqual(passedController, controller);
            assert.deepStrictEqual(passedOverrides, {});

            // do another call with overrides
            result = await redeemer.redeem(principal, underlying, maturity, controller, overrides);

            assert.strictEqual(result.hash, '0xresponse');

            // get the call arguments for the second call
            args = redeem.getCall(1).args;

            // assert the correct amount of call arguments
            assert.strictEqual(args.length, 5);

            [passedPrincipal, passedUnderlying, passedMaturity, passedController, passedOverrides] = args;

            // assert the arguments are being converted correctly
            assert.strictEqual(passedPrincipal, principal);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.strictEqual(passedController, controller);
            assert.deepStrictEqual(passedOverrides, overrides);
        });

        test('pendle', async () => {

            const redeemer = new Redeemer(ADDRESSES.REDEEMER, signer);

            principal = Principals.Pendle;

            const forgeId = 'forgeid';

            const redeem = mockMethod<TransactionResponse>(redeemer, Redeemer.redeemSignatures[principal]);
            const response = mockResponse();
            redeem.resolves(response);

            let result = await redeemer.redeem(principal, underlying, maturity, forgeId);

            assert.strictEqual(result.hash, '0xresponse');

            // get the call arguments
            let args = redeem.getCall(0).args;

            // assert the correct amount of call arguments
            assert.strictEqual(args.length, 5);

            let [passedPrincipal, passedUnderlying, passedMaturity, passedId, passedOverrides] = args;

            // assert the arguments are being converted correctly
            assert.strictEqual(passedPrincipal, principal);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.strictEqual(passedId, forgeId);
            assert.deepStrictEqual(passedOverrides, {});

            // do another call with overrides
            result = await redeemer.redeem(principal, underlying, maturity, forgeId, overrides);

            assert.strictEqual(result.hash, '0xresponse');

            // get the call arguments for the second call
            args = redeem.getCall(1).args;

            // assert the correct amount of call arguments
            assert.strictEqual(args.length, 5);

            [passedPrincipal, passedUnderlying, passedMaturity, passedId, passedOverrides] = args;

            // assert the arguments are being converted correctly
            assert.strictEqual(passedPrincipal, principal);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.strictEqual(passedId, forgeId);
            assert.deepStrictEqual(passedOverrides, overrides);
        });

        test('sense', async () => {

            const redeemer = new Redeemer(ADDRESSES.REDEEMER, signer);

            principal = Principals.Sense;

            const splitter = '0xsplitter';
            const adapter = '0xadapter';

            const redeem = mockMethod<TransactionResponse>(redeemer, Redeemer.redeemSignatures[principal]);
            const response = mockResponse();
            redeem.resolves(response);

            let result = await redeemer.redeem(principal, underlying, maturity, splitter, adapter);

            assert.strictEqual(result.hash, '0xresponse');

            // get the call arguments
            let args = redeem.getCall(0).args;

            // assert the correct amount of call arguments
            assert.strictEqual(args.length, 6);

            let [passedPrincipal, passedUnderlying, passedMaturity, passedSplitter, passedAdapter, passedOverrides] = args;

            // assert the arguments are being converted correctly
            assert.strictEqual(passedPrincipal, principal);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.strictEqual(passedSplitter, splitter);
            assert.strictEqual(passedAdapter, adapter);
            assert.deepStrictEqual(passedOverrides, {});

            // do another call with overrides
            result = await redeemer.redeem(principal, underlying, maturity, splitter, adapter, overrides);

            assert.strictEqual(result.hash, '0xresponse');

            // get the call arguments for the second call
            args = redeem.getCall(1).args;

            // assert the correct amount of call arguments
            assert.strictEqual(args.length, 6);

            [passedPrincipal, passedUnderlying, passedMaturity, passedSplitter, passedAdapter, passedOverrides] = args;

            // assert the arguments are being converted correctly
            assert.strictEqual(passedPrincipal, principal);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.strictEqual(passedSplitter, splitter);
            assert.strictEqual(passedAdapter, adapter);
            assert.deepStrictEqual(passedOverrides, overrides);
        });
    });
});
