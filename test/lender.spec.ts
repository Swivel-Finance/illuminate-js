import assert from 'assert';
import { Provider, TransactionResponse } from '@ethersproject/abstract-provider';
import { Signer } from '@ethersproject/abstract-signer';
import { SignatureLike } from '@ethersproject/bytes';
import { BigNumber, CallOverrides, getDefaultProvider, PayableOverrides, utils, Wallet } from 'ethers';
import { suite, suiteSetup, test } from 'mocha';
import { parseOrder } from '../src/helpers/index.js';
import { Lender, Principals } from '../src/index.js';
import { Order } from '../src/types/index.js';
import { ADDRESSES, assertGetter, mockExecutor, mockMethod, mockResponse } from './helpers/index.js';

suite('lender', () => {

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

        const lender = new Lender(ADDRESSES.LENDER, provider);

        assert(lender instanceof Lender);

        assert.strictEqual(lender.address, ADDRESSES.LENDER);
    });

    suite('HOLD', () => {

        test('unwraps result and accepts transaction overrides', async () => {

            await assertGetter(
                new Lender(ADDRESSES.LENDER, provider),
                'HOLD',
                '259200',
                callOverrides,
            );
        });
    });

    suite('admin', () => {

        test('unwraps result and accepts transaction overrides', async () => {

            await assertGetter(
                new Lender(ADDRESSES.LENDER, provider),
                'admin',
                '0xadmin',
                callOverrides,
            );
        });
    });

    suite('marketPlace', () => {

        test('unwraps result and accepts transaction overrides', async () => {

            await assertGetter(
                new Lender(ADDRESSES.LENDER, provider),
                'marketPlace',
                '0xmarketPlace',
                callOverrides,
            );
        });
    });

    suite('swivelAddr', () => {

        test('unwraps result and accepts transaction overrides', async () => {

            await assertGetter(
                new Lender(ADDRESSES.LENDER, provider),
                'swivelAddr',
                '0xswivelAddr',
                callOverrides,
            );
        });
    });

    suite('pendleAddr', () => {

        test('unwraps result and accepts transaction overrides', async () => {

            await assertGetter(
                new Lender(ADDRESSES.LENDER, provider),
                'pendleAddr',
                '0xpendleAddr',
                callOverrides,
            );
        });
    });

    suite('paused', () => {

        const principal = Principals.Notional;
        const expected = true;

        test('unwraps and converts result', async () => {

            const lender = new Lender(ADDRESSES.LENDER, provider);

            const paused = mockMethod<boolean>(lender, 'paused');
            paused.resolves([expected]);

            const result = await lender.paused(principal);

            assert.strictEqual(result, expected);

            const args = paused.getCall(0).args;

            assert.strictEqual(args.length, 2);

            const [passedPrincipal, passedOverrides] = args;

            assert.strictEqual(passedPrincipal, principal);
            assert.deepStrictEqual(passedOverrides, {});
        });

        test('accepts transaction overrides', async () => {

            const lender = new Lender(ADDRESSES.LENDER, provider);

            const paused = mockMethod<boolean>(lender, 'paused');
            paused.resolves([expected]);

            const result = await lender.paused(principal, callOverrides);

            assert.strictEqual(result, expected);

            const args = paused.getCall(0).args;

            assert.strictEqual(args.length, 2);

            const [passedPrincipal, passedOverrides] = args;

            assert.strictEqual(passedPrincipal, principal);
            assert.deepStrictEqual(passedOverrides, callOverrides);
        });
    });

    suite('feenominator', () => {

        const expected = '1000';

        test('unwraps and converts result', async () => {

            const lender = new Lender(ADDRESSES.LENDER, provider);

            // feenominator returns a uint256, so ethers will return a BigNumber
            // we create a mock Result with a BigNumber and assert the HOC converts it to string
            const feenominator = mockMethod<BigNumber>(lender, 'feenominator');
            feenominator.resolves([BigNumber.from(expected)]);

            const result = await lender.feenominator();

            assert.strictEqual(result, expected);

            const args = feenominator.getCall(0).args;

            assert.strictEqual(args.length, 1);

            const [passedOverrides] = args;

            assert.deepStrictEqual(passedOverrides, {});
        });

        test('accepts transaction overrides', async () => {

            const lender = new Lender(ADDRESSES.LENDER, provider);

            // feenominator returns a uint256, so ethers will return a BigNumber
            // we create a mock Result with a BigNumber and assert the HOC converts it to string
            const feenominator = mockMethod<BigNumber>(lender, 'feenominator');
            feenominator.resolves([BigNumber.from(expected)]);

            const result = await lender.feenominator(callOverrides);

            assert.strictEqual(result, expected);

            const args = feenominator.getCall(0).args;

            assert.strictEqual(args.length, 1);

            const [passedOverrides] = args;

            assert.deepStrictEqual(passedOverrides, callOverrides);
        });
    });

    suite('feeChange', () => {

        const expected = '50000000000';

        test('unwraps and converts result', async () => {

            const lender = new Lender(ADDRESSES.LENDER, provider);

            // feeChange returns a uint256, so ethers will return a BigNumber
            // we create a mock Result with a BigNumber and assert the HOC converts it to string
            const feeChange = mockMethod<BigNumber>(lender, 'feeChange');
            feeChange.resolves([BigNumber.from(expected)]);

            const result = await lender.feeChange();

            assert.strictEqual(result, expected);

            const args = feeChange.getCall(0).args;

            assert.strictEqual(args.length, 1);

            const [passedOverrides] = args;

            assert.deepStrictEqual(passedOverrides, {});
        });

        test('accepts transaction overrides', async () => {

            const lender = new Lender(ADDRESSES.LENDER, provider);

            // feeChange returns a uint256, so ethers will return a BigNumber
            // we create a mock Result with a BigNumber and assert the HOC converts it to string
            const feeChange = mockMethod<BigNumber>(lender, 'feeChange');
            feeChange.resolves([BigNumber.from(expected)]);

            const result = await lender.feeChange(callOverrides);

            assert.strictEqual(result, expected);

            const args = feeChange.getCall(0).args;

            assert.strictEqual(args.length, 1);

            const [passedOverrides] = args;

            assert.deepStrictEqual(passedOverrides, callOverrides);
        });
    });

    suite('MIN_FEENOMINATOR', () => {

        const expected = '200';

        test('unwraps and converts result', async () => {

            const lender = new Lender(ADDRESSES.LENDER, provider);

            // MIN_FEENOMINATOR returns a uint256, so ethers will return a BigNumber
            // we create a mock Result with a BigNumber and assert the HOC converts it to string
            const MIN_FEENOMINATOR = mockMethod<BigNumber>(lender, 'MIN_FEENOMINATOR');
            MIN_FEENOMINATOR.resolves([BigNumber.from(expected)]);

            const result = await lender.MIN_FEENOMINATOR();

            assert.strictEqual(result, expected);

            const args = MIN_FEENOMINATOR.getCall(0).args;

            assert.strictEqual(args.length, 1);

            const [passedOverrides] = args;

            assert.deepStrictEqual(passedOverrides, {});
        });

        test('accepts transaction overrides', async () => {

            const lender = new Lender(ADDRESSES.LENDER, provider);

            // MIN_FEENOMINATOR returns a uint256, so ethers will return a BigNumber
            // we create a mock Result with a BigNumber and assert the HOC converts it to string
            const MIN_FEENOMINATOR = mockMethod<BigNumber>(lender, 'MIN_FEENOMINATOR');
            MIN_FEENOMINATOR.resolves([BigNumber.from(expected)]);

            const result = await lender.MIN_FEENOMINATOR(callOverrides);

            assert.strictEqual(result, expected);

            const args = MIN_FEENOMINATOR.getCall(0).args;

            assert.strictEqual(args.length, 1);

            const [passedOverrides] = args;

            assert.deepStrictEqual(passedOverrides, callOverrides);
        });
    });

    suite('fees', () => {

        const underlying = '0xunderlying';
        const expected = '0';

        test('unwraps and converts result', async () => {

            const lender = new Lender(ADDRESSES.LENDER, provider);

            // fees returns a uint256, so ethers will return a BigNumber
            // we create a mock Result with a BigNumber and assert the HOC converts it to string
            const fees = mockMethod<BigNumber>(lender, 'fees');
            fees.resolves([BigNumber.from(expected)]);

            const result = await lender.fees(underlying);

            assert.strictEqual(result, expected);

            const args = fees.getCall(0).args;

            assert.strictEqual(args.length, 2);

            const [passedUnderlying, passedOverrides] = args;

            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedOverrides, {});
        });

        test('accepts transaction overrides', async () => {

            const lender = new Lender(ADDRESSES.LENDER, provider);

            // fees returns a uint256, so ethers will return a BigNumber
            // we create a mock Result with a BigNumber and assert the HOC converts it to string
            const fees = mockMethod<BigNumber>(lender, 'fees');
            fees.resolves([BigNumber.from(expected)]);

            const result = await lender.fees(underlying, callOverrides);

            assert.strictEqual(result, expected);

            const args = fees.getCall(0).args;

            assert.strictEqual(args.length, 2);

            const [passedUnderlying, passedOverrides] = args;

            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedOverrides, callOverrides);
        });
    });

    suite('withdrawals', () => {

        const underlying = '0xunderlying';
        const expected = '1656526007';

        test('unwraps and converts result', async () => {

            const lender = new Lender(ADDRESSES.LENDER, provider);

            // withdrawals returns a uint256, so ethers will return a BigNumber
            // we create a mock Result with a BigNumber and assert the HOC converts it to string
            const withdrawals = mockMethod<BigNumber>(lender, 'withdrawals');
            withdrawals.resolves([BigNumber.from(expected)]);

            const result = await lender.withdrawals(underlying);

            assert.strictEqual(result, expected);

            const args = withdrawals.getCall(0).args;

            assert.strictEqual(args.length, 2);

            const [passedUnderlying, passedOverrides] = args;

            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedOverrides, {});
        });

        test('accepts transaction overrides', async () => {

            const lender = new Lender(ADDRESSES.LENDER, provider);

            // withdrawals returns a uint256, so ethers will return a BigNumber
            // we create a mock Result with a BigNumber and assert the HOC converts it to string
            const withdrawals = mockMethod<BigNumber>(lender, 'withdrawals');
            withdrawals.resolves([BigNumber.from(expected)]);

            const result = await lender.withdrawals(underlying, callOverrides);

            assert.strictEqual(result, expected);

            const args = withdrawals.getCall(0).args;

            assert.strictEqual(args.length, 2);

            const [passedUnderlying, passedOverrides] = args;

            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedOverrides, callOverrides);
        });
    });

    suite('mint', () => {

        const principal = Principals.Swivel;
        const underlying = '0xunderlying';
        const maturity = '1654638431';
        const amount = utils.parseEther('100').toString();

        const overrides: PayableOverrides = {
            gasLimit: '10000',
            nonce: 3,
        };

        test('converts arguments', async () => {

            const lender = new Lender(ADDRESSES.LENDER, signer, mockExecutor());

            const mint = mockMethod<TransactionResponse>(lender, 'mint');
            const response = mockResponse();
            mint.resolves(response);

            const result = await lender.mint(principal, underlying, maturity, amount);

            assert.strictEqual(result.hash, response.hash);

            const args = mint.getCall(0).args;

            assert.strictEqual(args.length, 5);

            const [passedPrincipal, passedUnderlying, passedMaturity, passedAmount, passedOverrides] = args;

            assert.strictEqual(passedPrincipal, principal);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
            assert.deepStrictEqual(passedOverrides, {});
        });

        test('accepts transaction overrides', async () => {

            const lender = new Lender(ADDRESSES.LENDER, signer, mockExecutor());

            const mint = mockMethod<TransactionResponse>(lender, 'mint');
            const response = mockResponse();
            mint.resolves(response);

            const result = await lender.mint(principal, underlying, maturity, amount, overrides);

            assert.strictEqual(result.hash, response.hash);

            const args = mint.getCall(0).args;

            assert.strictEqual(args.length, 5);

            const [passedPrincipal, passedUnderlying, passedMaturity, passedAmount, passedOverrides] = args;

            assert.strictEqual(passedPrincipal, principal);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
            assert.deepStrictEqual(passedOverrides, overrides);
        });
    });

    suite('lend', () => {

        let principal: Principals;

        const underlying = '0xunderlying';
        const maturity = '1654638431';
        const amount = utils.parseEther('100').toString();
        const minReturn = utils.parseEther('95').toString();
        const deadline = '1654642073';
        const pool = '0xpool';
        const apwineRouter = '0xapwinerouter';

        const overrides: PayableOverrides = {
            gasLimit: '1000',
            nonce: 1,
        };

        test('illuminate', async () => {

            const lender = new Lender(ADDRESSES.LENDER, signer, mockExecutor());

            principal = Principals.Illuminate;

            const lend = mockMethod<TransactionResponse>(lender, Lender.lendSignatures[principal]);
            const response = mockResponse();
            lend.resolves(response);

            let result = await lender.lend(principal, underlying, maturity, amount, pool, minReturn);

            assert.strictEqual(result.hash, '0xresponse');

            // get the call arguments
            let args = lend.getCall(0).args;

            // assert the correct amount of call arguments
            assert.strictEqual(args.length, 7);

            let [passedPrincipal, passedUnderlying, passedMaturity, passedAmount, passedPool, passedMinReturn, passedOverrides] = args;

            // assert the arguments are being converted correctly
            assert.strictEqual(passedPrincipal, principal);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
            assert.strictEqual(passedPool, pool);
            assert.deepStrictEqual(passedMinReturn, BigNumber.from(minReturn));
            assert.deepStrictEqual(passedOverrides, {});

            // do another call with overrides
            result = await lender.lend(principal, underlying, maturity, amount, pool, minReturn, overrides);

            assert.strictEqual(result.hash, '0xresponse');

            // get the call arguments for the second call
            args = lend.getCall(1).args;

            // assert the correct amount of call arguments
            assert.strictEqual(args.length, 7);

            [passedPrincipal, passedUnderlying, passedMaturity, passedAmount, passedPool, passedMinReturn, passedOverrides] = args;

            // assert the arguments are being converted correctly
            assert.strictEqual(passedPrincipal, principal);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
            assert.strictEqual(passedPool, pool);
            assert.deepStrictEqual(passedMinReturn, BigNumber.from(minReturn));
            assert.deepStrictEqual(passedOverrides, overrides);
        });

        test('yield', async () => {

            const lender = new Lender(ADDRESSES.LENDER, signer, mockExecutor());

            principal = Principals.Yield;

            const lend = mockMethod<TransactionResponse>(lender, Lender.lendSignatures[principal]);
            const response = mockResponse();
            lend.resolves(response);

            let result = await lender.lend(principal, underlying, maturity, amount, pool, minReturn);

            assert.strictEqual(result.hash, '0xresponse');

            // get the call arguments
            let args = lend.getCall(0).args;

            // assert the correct amount of call arguments
            assert.strictEqual(args.length, 7);

            let [passedPrincipal, passedUnderlying, passedMaturity, passedAmount, passedPool, passedMinReturn, passedOverrides] = args;

            // assert the arguments are being converted correctly
            assert.strictEqual(passedPrincipal, principal);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
            assert.strictEqual(passedPool, pool);
            assert.deepStrictEqual(passedMinReturn, BigNumber.from(minReturn));
            assert.deepStrictEqual(passedOverrides, {});

            // do another call with overrides
            result = await lender.lend(principal, underlying, maturity, amount, pool, minReturn, overrides);

            assert.strictEqual(result.hash, '0xresponse');

            // get the call arguments for the second call
            args = lend.getCall(1).args;

            // assert the correct amount of call arguments
            assert.strictEqual(args.length, 7);

            [passedPrincipal, passedUnderlying, passedMaturity, passedAmount, passedPool, passedMinReturn, passedOverrides] = args;

            // assert the arguments are being converted correctly
            assert.strictEqual(passedPrincipal, principal);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
            assert.strictEqual(passedPool, pool);
            assert.deepStrictEqual(passedMinReturn, BigNumber.from(minReturn));
            assert.deepStrictEqual(passedOverrides, overrides);
        });

        test('swivel', async () => {

            const lender = new Lender(ADDRESSES.LENDER, signer, mockExecutor());

            principal = Principals.Swivel;

            const amounts = [
                utils.parseEther('10').toString(),
                utils.parseEther('200').toString(),
            ];

            const orders: Order[] = [
                {
                    key: '0xfb1700b125bdb80a6c11c181325a5a744fe00a098f379aa31fcbcdfb1d6d1c01',
                    protocol: 0,
                    maker: '0xmaker1',
                    underlying: '0xunderlying',
                    vault: false,
                    exit: false,
                    principal: '10000000000000000000',
                    premium: '1000000000000000000',
                    maturity: '12345678',
                    expiry: '22345678',
                },
                {
                    key: '0xfb1700b125bdb80a6c11c181325a5a744fe00a098f379aa31fcbcdfb1d6d1c01',
                    protocol: 1,
                    maker: '0xmaker2',
                    underlying: '0xunderlying',
                    vault: false,
                    exit: false,
                    principal: '200000000000000000000',
                    premium: '20000000000000000000',
                    maturity: '12345678',
                    expiry: '22345678',
                },
            ];

            const signatures: SignatureLike[] = [
                '0xa5af5edd029fb82bef79cae459d8007ff20c078e25114217c921dc60e31ce0a06014954014d6ee16840a1ead70ec6797b64e42532a86edc744a451b07a1bb41d1b',
                '0xe3dea176cfd7dacd1fe7424f633789b8fc7da0fa23d7e1bd64404bd29d9115d4656c0bf83af468dc5036309403d8f1a0809be0a9db18e314c40fd7f252e6fb971b',
            ];

            const swap = true;
            const slippage = utils.parseEther('0.05').toString();

            const lend = mockMethod<TransactionResponse>(lender, Lender.lendSignatures[principal]);
            const response = mockResponse();
            lend.resolves(response);

            let result = await lender.lend(principal, underlying, maturity, amounts, pool, orders, signatures, swap, slippage);

            assert.strictEqual(result.hash, '0xresponse');

            // get the call arguments
            let args = lend.getCall(0).args;

            // assert the correct amount of call arguments
            assert.strictEqual(args.length, 10);

            let [
                passedPrincipal,
                passedUnderlying,
                passedMaturity,
                passedAmounts,
                passedPool,
                passedOrders,
                passedSignatures,
                passedSwap,
                passedSlippage,
                passedOverrides,
            ] = args;

            // assert the arguments are being converted correctly
            assert.strictEqual(passedPrincipal, principal);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedAmounts, amounts.map(amount => BigNumber.from(amount)));
            assert.strictEqual(passedPool, pool);
            assert.deepStrictEqual(passedOrders, orders.map(order => parseOrder(order)));
            assert.deepStrictEqual(passedSignatures, signatures.map(signature => utils.splitSignature(signature)));
            assert.strictEqual(passedSwap, swap);
            assert.deepStrictEqual(passedSlippage, BigNumber.from(slippage));
            assert.deepStrictEqual(passedOverrides, {});

            result = await lender.lend(principal, underlying, maturity, amounts, pool, orders, signatures, swap, slippage, overrides);

            assert.strictEqual(result.hash, '0xresponse');

            // get the call arguments
            args = lend.getCall(1).args;

            // assert the correct amount of call arguments
            assert.strictEqual(args.length, 10);

            [
                passedPrincipal,
                passedUnderlying,
                passedMaturity,
                passedAmounts,
                passedPool,
                passedOrders,
                passedSignatures,
                passedSwap,
                passedSlippage,
                passedOverrides,
            ] = args;

            // assert the arguments are being converted correctly
            assert.strictEqual(passedPrincipal, principal);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedAmounts, amounts.map(amount => BigNumber.from(amount)));
            assert.strictEqual(passedPool, pool);
            assert.deepStrictEqual(passedOrders, orders.map(order => parseOrder(order)));
            assert.deepStrictEqual(passedSignatures, signatures.map(signature => utils.splitSignature(signature)));
            assert.strictEqual(passedSwap, swap);
            assert.deepStrictEqual(passedSlippage, BigNumber.from(slippage));
            assert.deepStrictEqual(passedOverrides, overrides);
        });

        test('element', async () => {

            const lender = new Lender(ADDRESSES.LENDER, signer, mockExecutor());

            principal = Principals.Element;

            const poolId = '0xpoolId';

            const lend = mockMethod<TransactionResponse>(lender, Lender.lendSignatures[principal]);
            const response = mockResponse();
            lend.resolves(response);

            let result = await lender.lend(principal, underlying, maturity, amount, minReturn, deadline, pool, poolId);

            assert.strictEqual(result.hash, '0xresponse');

            // get the call arguments
            let args = lend.getCall(0).args;

            // assert the correct amount of call arguments
            assert.strictEqual(args.length, 9);

            let [passedPrincipal, passedUnderlying, passedMaturity, passedAmount, passedMinReturn, passedDeadline, passedPool, passedPoolId, passedOverrides] = args;

            // assert the arguments are being converted correctly
            assert.strictEqual(passedPrincipal, principal);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
            assert.deepStrictEqual(passedMinReturn, BigNumber.from(minReturn));
            assert.deepStrictEqual(passedDeadline, BigNumber.from(deadline));
            assert.strictEqual(passedPool, pool);
            assert.strictEqual(passedPoolId, poolId);
            assert.deepStrictEqual(passedOverrides, {});

            result = await lender.lend(principal, underlying, maturity, amount, minReturn, deadline, pool, poolId, overrides);

            assert.strictEqual(result.hash, '0xresponse');

            // get the call arguments
            args = lend.getCall(1).args;

            // assert the correct amount of call arguments
            assert.strictEqual(args.length, 9);

            [passedPrincipal, passedUnderlying, passedMaturity, passedAmount, passedMinReturn, passedDeadline, passedPool, passedPoolId, passedOverrides] = args;

            // assert the arguments are being converted correctly
            assert.strictEqual(passedPrincipal, principal);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
            assert.deepStrictEqual(passedMinReturn, BigNumber.from(minReturn));
            assert.deepStrictEqual(passedDeadline, BigNumber.from(deadline));
            assert.strictEqual(passedPool, pool);
            assert.strictEqual(passedPoolId, poolId);
            assert.deepStrictEqual(passedOverrides, overrides);
        });

        test('pendle', async () => {

            const lender = new Lender(ADDRESSES.LENDER, signer, mockExecutor());

            principal = Principals.Pendle;

            const lend = mockMethod<TransactionResponse>(lender, Lender.lendSignatures[principal]);
            const response = mockResponse();
            lend.resolves(response);

            let result = await lender.lend(principal, underlying, maturity, amount, minReturn, deadline);

            assert.strictEqual(result.hash, '0xresponse');

            // get the call arguments
            let args = lend.getCall(0).args;

            // assert the correct amount of call arguments
            assert.strictEqual(args.length, 7);

            let [passedPrincipal, passedUnderlying, passedMaturity, passedAmount, passedMinReturn, passedDeadline, passedOverrides] = args;

            // assert the arguments are being converted correctly
            assert.strictEqual(passedPrincipal, principal);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
            assert.deepStrictEqual(passedMinReturn, BigNumber.from(minReturn));
            assert.deepStrictEqual(passedDeadline, BigNumber.from(deadline));
            assert.deepStrictEqual(passedOverrides, {});

            result = await lender.lend(principal, underlying, maturity, amount, minReturn, deadline, overrides);

            assert.strictEqual(result.hash, '0xresponse');

            // get the call arguments
            args = lend.getCall(1).args;

            // assert the correct amount of call arguments
            assert.strictEqual(args.length, 7);

            [passedPrincipal, passedUnderlying, passedMaturity, passedAmount, passedMinReturn, passedDeadline, passedOverrides] = args;

            // assert the arguments are being converted correctly
            assert.strictEqual(passedPrincipal, principal);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
            assert.deepStrictEqual(passedMinReturn, BigNumber.from(minReturn));
            assert.deepStrictEqual(passedDeadline, BigNumber.from(deadline));
            assert.deepStrictEqual(passedOverrides, overrides);
        });

        test('tempus', async () => {

            const lender = new Lender(ADDRESSES.LENDER, signer, mockExecutor());

            principal = Principals.Tempus;

            const lend = mockMethod<TransactionResponse>(lender, Lender.lendSignatures[principal]);
            const response = mockResponse();
            lend.resolves(response);

            let result = await lender.lend(principal, underlying, maturity, amount, minReturn, deadline, pool);

            assert.strictEqual(result.hash, '0xresponse');

            // get the call arguments
            let args = lend.getCall(0).args;

            // assert the correct amount of call arguments
            assert.strictEqual(args.length, 8);

            let [passedPrincipal, passedUnderlying, passedMaturity, passedAmount, passedMinReturn, passedDeadline, passedPool, passedOverrides] = args;

            // assert the arguments are being converted correctly
            assert.strictEqual(passedPrincipal, principal);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
            assert.deepStrictEqual(passedMinReturn, BigNumber.from(minReturn));
            assert.deepStrictEqual(passedDeadline, BigNumber.from(deadline));
            assert.strictEqual(passedPool, pool);
            assert.deepStrictEqual(passedOverrides, {});

            result = await lender.lend(principal, underlying, maturity, amount, minReturn, deadline, pool, overrides);

            assert.strictEqual(result.hash, '0xresponse');

            // get the call arguments
            args = lend.getCall(1).args;

            // assert the correct amount of call arguments
            assert.strictEqual(args.length, 8);

            [passedPrincipal, passedUnderlying, passedMaturity, passedAmount, passedMinReturn, passedDeadline, passedPool, passedOverrides] = args;

            // assert the arguments are being converted correctly
            assert.strictEqual(passedPrincipal, principal);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
            assert.deepStrictEqual(passedMinReturn, BigNumber.from(minReturn));
            assert.deepStrictEqual(passedDeadline, BigNumber.from(deadline));
            assert.strictEqual(passedPool, pool);
            assert.deepStrictEqual(passedOverrides, overrides);
        });

        test('sense', async () => {

            const lender = new Lender(ADDRESSES.LENDER, signer, mockExecutor());

            principal = Principals.Sense;

            // const amm = '0xamm';
            const senseMaturity = '1654628431';
            const senseAdapter = '0xadapter';

            const lend = mockMethod<TransactionResponse>(lender, Lender.lendSignatures[principal]);
            const response = mockResponse();
            lend.resolves(response);

            let result = await lender.lend(principal, underlying, maturity, amount, minReturn, pool, senseMaturity, senseAdapter);

            assert.strictEqual(result.hash, '0xresponse');

            // get the call arguments
            let args = lend.getCall(0).args;

            // assert the correct amount of call arguments
            assert.strictEqual(args.length, 9);

            let [
                passedPrincipal,
                passedUnderlying,
                passedMaturity,
                passedAmount,
                passedMinReturn,
                passedPool,
                passedSenseMaturity,
                passedSenseAdapter,
                passedOverrides,
            ] = args;

            // assert the arguments are being converted correctly
            assert.strictEqual(passedPrincipal, principal);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
            assert.deepStrictEqual(passedMinReturn, BigNumber.from(minReturn));
            assert.strictEqual(passedPool, pool);
            assert.deepStrictEqual(passedSenseMaturity, BigNumber.from(senseMaturity));
            assert.strictEqual(passedSenseAdapter, senseAdapter);
            assert.deepStrictEqual(passedOverrides, {});

            result = await lender.lend(principal, underlying, maturity, amount, minReturn, pool, senseMaturity, senseAdapter, overrides);

            assert.strictEqual(result.hash, '0xresponse');

            // get the call arguments
            args = lend.getCall(1).args;

            // assert the correct amount of call arguments
            assert.strictEqual(args.length, 9);

            [
                passedPrincipal,
                passedUnderlying,
                passedMaturity,
                passedAmount,
                passedMinReturn,
                passedPool,
                passedSenseMaturity,
                passedSenseAdapter,
                passedOverrides,
            ] = args;

            // assert the arguments are being converted correctly
            assert.strictEqual(passedPrincipal, principal);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
            assert.deepStrictEqual(passedMinReturn, BigNumber.from(minReturn));
            assert.strictEqual(passedPool, pool);
            assert.deepStrictEqual(passedSenseMaturity, BigNumber.from(senseMaturity));
            assert.strictEqual(passedSenseAdapter, senseAdapter);
            assert.deepStrictEqual(passedOverrides, overrides);
        });

        test('apwine', async () => {

            const lender = new Lender(ADDRESSES.LENDER, signer, mockExecutor());

            principal = Principals.Apwine;

            const lend = mockMethod<TransactionResponse>(lender, Lender.lendSignatures[principal]);
            const response = mockResponse();
            lend.resolves(response);

            let result = await lender.lend(principal, underlying, maturity, amount, minReturn, deadline, apwineRouter, pool);

            assert.strictEqual(result.hash, '0xresponse');

            // get the call arguments
            let args = lend.getCall(0).args;

            // assert the correct amount of call arguments
            assert.strictEqual(args.length, 9);

            let [passedPrincipal, passedUnderlying, passedMaturity, passedAmount, passedMinReturn, passedDeadline, passedRouter, passedPool, passedOverrides] = args;

            // assert the arguments are being converted correctly
            assert.strictEqual(passedPrincipal, principal);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
            assert.deepStrictEqual(passedMinReturn, BigNumber.from(minReturn));
            assert.deepStrictEqual(passedDeadline, BigNumber.from(deadline));
            assert.deepStrictEqual(passedRouter, apwineRouter);
            assert.strictEqual(passedPool, pool);
            assert.deepStrictEqual(passedOverrides, {});

            result = await lender.lend(principal, underlying, maturity, amount, minReturn, deadline, apwineRouter, pool, overrides);

            assert.strictEqual(result.hash, '0xresponse');

            // get the call arguments
            args = lend.getCall(1).args;

            // assert the correct amount of call arguments
            assert.strictEqual(args.length, 9);

            [passedPrincipal, passedUnderlying, passedMaturity, passedAmount, passedMinReturn, passedDeadline, passedRouter, passedPool, passedOverrides] = args;

            // assert the arguments are being converted correctly
            assert.strictEqual(passedPrincipal, principal);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
            assert.deepStrictEqual(passedMinReturn, BigNumber.from(minReturn));
            assert.deepStrictEqual(passedDeadline, BigNumber.from(deadline));
            assert.deepStrictEqual(passedRouter, apwineRouter);
            assert.strictEqual(passedPool, pool);
            assert.deepStrictEqual(passedOverrides, overrides);
        });

        test('notional', async () => {

            const lender = new Lender(ADDRESSES.LENDER, signer, mockExecutor());

            principal = Principals.Notional;

            const lend = mockMethod<TransactionResponse>(lender, Lender.lendSignatures[principal]);
            const response = mockResponse();
            lend.resolves(response);

            let result = await lender.lend(principal, underlying, maturity, amount, minReturn);

            assert.strictEqual(result.hash, '0xresponse');

            // get the call arguments
            let args = lend.getCall(0).args;

            // assert the correct amount of call arguments
            assert.strictEqual(args.length, 6);

            let [passedPrincipal, passedUnderlying, passedMaturity, passedAmount, passedMinRatio, passedOverrides] = args;

            // assert the arguments are being converted correctly
            assert.strictEqual(passedPrincipal, principal);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
            assert.deepStrictEqual(passedMinRatio, BigNumber.from(minReturn));
            assert.deepStrictEqual(passedOverrides, {});

            result = await lender.lend(principal, underlying, maturity, amount, minReturn, overrides);

            assert.strictEqual(result.hash, '0xresponse');

            // get the call arguments
            args = lend.getCall(1).args;

            // assert the correct amount of call arguments
            assert.strictEqual(args.length, 6);

            [passedPrincipal, passedUnderlying, passedMaturity, passedAmount, passedMinRatio, passedOverrides] = args;

            // assert the arguments are being converted correctly
            assert.strictEqual(passedPrincipal, principal);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
            assert.deepStrictEqual(passedMinRatio, BigNumber.from(minReturn));
            assert.deepStrictEqual(passedOverrides, overrides);
        });
    });
});
