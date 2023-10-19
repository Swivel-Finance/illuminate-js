import assert from 'assert';
import { Provider, TransactionResponse } from '@ethersproject/abstract-provider';
import { Signer } from '@ethersproject/abstract-signer';
import { SignatureLike } from '@ethersproject/bytes';
import { BigNumber, CallOverrides, PayableOverrides, Wallet, getDefaultProvider, utils } from 'ethers';
import { suite, suiteSetup, test } from 'mocha';
import { ADAPTERS } from '../src/constants/abi/adapters.js';
import { LENDER_ABI } from '../src/constants/abi/lender.js';
import { Lender, Order, Principals } from '../src/index.js';
import { assertArguments, assertGetter, assertMethod, assertTransaction, } from './helpers/assert.js';
import { ADDRESSES, mockExecutor, mockMethod, mockResponse } from './helpers/index.js';

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
                [BigNumber.from('259200')],
                '259200',
                callOverrides,
            );
        });
    });

    suite('MIN_FEENOMINATOR', () => {

        const expected = '200';

        test('unwraps result and accepts transaction overrides', async () => {

            await assertGetter(
                new Lender(ADDRESSES.LENDER, provider),
                'MIN_FEENOMINATOR',
                [BigNumber.from(expected)],
                expected,
                callOverrides,
            );
        });
    });

    suite('WETH', () => {

        test('unwraps result and accepts transaction overrides', async () => {

            await assertGetter(
                new Lender(ADDRESSES.LENDER, provider),
                'WETH',
                ['0xWETH'],
                '0xWETH',
                callOverrides,
            );
        });
    });

    suite('admin', () => {

        test('unwraps result and accepts transaction overrides', async () => {

            await assertGetter(
                new Lender(ADDRESSES.LENDER, provider),
                'admin',
                ['0xadmin'],
                '0xadmin',
                callOverrides,
            );
        });
    });

    suite('lender', () => {

        test('unwraps result and accepts transaction overrides', async () => {

            await assertGetter(
                new Lender(ADDRESSES.LENDER, provider),
                'lender',
                ['0xlender'],
                '0xlender',
                callOverrides,
            );
        });
    });

    suite('marketplace', () => {

        test('unwraps result and accepts transaction overrides', async () => {

            await assertGetter(
                new Lender(ADDRESSES.LENDER, provider),
                'marketplace',
                ['0xmarketplace'],
                '0xmarketplace',
                callOverrides,
            );
        });
    });

    suite('redeemer', () => {

        test('unwraps result and accepts transaction overrides', async () => {

            await assertGetter(
                new Lender(ADDRESSES.LENDER, provider),
                'redeemer',
                ['0xredeemer'],
                '0xredeemer',
                callOverrides,
            );
        });
    });

    suite('ETHWrapper', () => {

        test('unwraps result and accepts transaction overrides', async () => {

            await assertGetter(
                new Lender(ADDRESSES.LENDER, provider),
                'ETHWrapper',
                ['0xETHWrapper'],
                '0xETHWrapper',
                callOverrides,
            );
        });
    });

    suite('feenominator', () => {

        const expected = '1000';

        test('unwraps result and accepts transaction overrides', async () => {

            await assertGetter(
                new Lender(ADDRESSES.LENDER, provider),
                'feenominator',
                [BigNumber.from(expected)],
                expected,
                callOverrides,
            );
        });
    });

    suite('feeChange', () => {

        const expected = '50000000000';

        test('unwraps result and accepts transaction overrides', async () => {

            await assertGetter(
                new Lender(ADDRESSES.LENDER, provider),
                'feeChange',
                [BigNumber.from(expected)],
                expected,
                callOverrides,
            );
        });
    });

    suite('fees', () => {

        const underlying = '0xunderlying';
        const expected = '0';

        test('unwraps result and accepts transaction overrides', async () => {

            await assertMethod(
                new Lender(ADDRESSES.LENDER, provider),
                'fees',
                [underlying],
                [underlying],
                [BigNumber.from(expected)],
                expected,
                callOverrides,
            );
        });
    });

    suite('withdrawals', () => {

        const underlying = '0xunderlying';
        const expected = '1656526007';

        test('unwraps result and accepts transaction overrides', async () => {

            await assertMethod(
                new Lender(ADDRESSES.LENDER, provider),
                'withdrawals',
                [underlying],
                [underlying],
                [BigNumber.from(expected)],
                expected,
                callOverrides,
            );
        });
    });

    suite('maximumValue', () => {

        const expected = '100000000000000000000000';

        test('unwraps result and accepts transaction overrides', async () => {

            await assertGetter(
                new Lender(ADDRESSES.LENDER, provider),
                'maximumValue',
                [BigNumber.from(expected)],
                expected,
                callOverrides,
            );
        });
    });

    suite('etherPrice', () => {

        const expected = '2500';

        test('unwraps result and accepts transaction overrides', async () => {

            await assertGetter(
                new Lender(ADDRESSES.LENDER, provider),
                'etherPrice',
                [BigNumber.from(expected)],
                expected,
                callOverrides,
            );
        });
    });

    suite('protocolFlow', () => {

        const principal = Principals.Swivel;
        const expected = '10000';

        test('unwraps result and accepts transaction overrides', async () => {

            await assertMethod(
                new Lender(ADDRESSES.LENDER, provider),
                'protocolFlow',
                [principal],
                [principal],
                [BigNumber.from(expected)],
                expected,
                callOverrides,
            );
        });
    });

    suite('periodStart', () => {

        const principal = Principals.Apwine;
        const expected = '1671726936';

        test('unwraps result and accepts transaction overrides', async () => {

            await assertMethod(
                new Lender(ADDRESSES.LENDER, provider),
                'periodStart',
                [principal],
                [principal],
                [BigNumber.from(expected)],
                expected,
                callOverrides,
            );
        });
    });

    suite('paused', () => {

        const principal = Principals.Notional;
        const expected = true;

        test('unwraps result and accepts transaction overrides', async () => {

            await assertMethod(
                new Lender(ADDRESSES.LENDER, provider),
                'paused',
                [principal],
                [principal],
                [expected],
                expected,
                callOverrides,
            );
        });
    });

    suite('halted', () => {

        test('unwraps result and accepts transaction overrides', async () => {

            await assertGetter(
                new Lender(ADDRESSES.LENDER, provider),
                'halted',
                [true],
                true,
                callOverrides,
            );
        });
    });

    suite('batch', () => {

        const underlying = '0x1234567890000000000000000000000000000001';
        const maturity = '1654638431';
        const amount = utils.parseEther('100').toString();

        const overrides: PayableOverrides = {
            gasLimit: '10000',
            nonce: 3,
        };

        // create an interface for the lender ABI to encode the batch inputs
        const iface = new utils.Interface(LENDER_ABI);
        // encode multiple `mint` calls to be batched
        const inputs = [
            iface.encodeFunctionData('mint', [Principals.Illuminate, underlying, maturity, amount]),
            iface.encodeFunctionData('mint', [Principals.Swivel, underlying, maturity, amount]),
            iface.encodeFunctionData('mint', [Principals.Yield, underlying, maturity, amount]),
        ];

        test('accepts transaction overrides', async () => {

            await assertTransaction(
                new Lender(ADDRESSES.LENDER, signer, mockExecutor()),
                'batch',
                [inputs],
                [inputs],
                overrides,
            );
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

        test('converts arguments and accepts transaction overrides', async () => {

            await assertTransaction(
                new Lender(ADDRESSES.LENDER, signer, mockExecutor()),
                'mint',
                [principal, underlying, BigNumber.from(maturity), BigNumber.from(amount)],
                [principal, underlying, maturity, amount],
                overrides,
            );
        });
    });

    suite('lend', () => {

        let principal: Principals;

        const underlying = '0x1234567890000000000000000000000000000001';
        const maturity = '1654638431';
        const pool = '0x1234567890000000000000000000000000000002';
        const amount = utils.parseEther('100').toString();
        const minimum = utils.parseEther('98').toString();
        const deadline = '1654642073';
        const lst = '0x1234567890000000000000000000000000000003';
        const swapMinimum = utils.parseEther('99').toString();

        const overrides: PayableOverrides = {
            gasLimit: '1000',
            nonce: 1,
        };

        // NOTE: ideally we would want to use `assertTransaction` for the lend method, however,
        // as the lend method is overloaded, we cannot use the `assertTransaction` helper due to
        // TypeScript not being able to infer the `Parameters<T>` type for the correct overload
        // (TS will infer the `Parameters<T>` type for the last overload, which is incorrect)

        suite('illuminate', () => {

            test('stable', async () => {

                const lender = new Lender(ADDRESSES.LENDER, signer, mockExecutor());

                principal = Principals.Illuminate;

                const lend = mockMethod<TransactionResponse>(lender, Lender.lendSignatures['stable']);
                const response = mockResponse();
                lend.resolves(response);

                // the converted arguments we expect to be passed to the internal contract method
                const expectedArgs = [
                    principal,
                    underlying,
                    BigNumber.from(maturity),
                    [BigNumber.from(amount)],
                    ADAPTERS[principal].lend.encode(pool, minimum),
                ];

                let result = await lender.lend(principal, underlying, maturity, amount, [pool, minimum]);

                assert.deepStrictEqual(result, response);

                assertArguments(lend.getCall(0).args, [...expectedArgs, {}]);

                // do another call with overrides

                result = await lender.lend(principal, underlying, maturity, amount, [pool, minimum], overrides);

                assert.deepStrictEqual(result, response);

                assertArguments(lend.getCall(1).args, [...expectedArgs, overrides]);
            });

            test('ether', async () => {

                const lender = new Lender(ADDRESSES.LENDER, signer, mockExecutor());

                principal = Principals.Illuminate;

                const lend = mockMethod<TransactionResponse>(lender, Lender.lendSignatures['ether']);
                const response = mockResponse();
                lend.resolves(response);

                // the converted arguments we expect to be passed to the internal contract method
                const expectedArgs = [
                    principal,
                    underlying,
                    BigNumber.from(maturity),
                    [BigNumber.from(amount)],
                    ADAPTERS[principal].lend.encode(pool, minimum),
                    lst,
                    BigNumber.from(swapMinimum),
                ];

                let result = await lender.lend(principal, underlying, maturity, amount, [pool, minimum], [lst, swapMinimum]);

                assert.deepStrictEqual(result, response);

                assertArguments(lend.getCall(0).args, [...expectedArgs, {}]);

                // do another call with overrides

                result = await lender.lend(principal, underlying, maturity, amount, [pool, minimum], [lst, swapMinimum], overrides);

                assert.deepStrictEqual(result, response);

                assertArguments(lend.getCall(1).args, [...expectedArgs, overrides]);
            });
        });

        suite('yield', () => {

            test('stable', async () => {

                const lender = new Lender(ADDRESSES.LENDER, signer, mockExecutor());

                principal = Principals.Yield;

                const lend = mockMethod<TransactionResponse>(lender, Lender.lendSignatures['stable']);
                const response = mockResponse();
                lend.resolves(response);

                // the converted arguments we expect to be passed to the internal contract method
                const expectedArgs = [
                    principal,
                    underlying,
                    BigNumber.from(maturity),
                    [BigNumber.from(amount)],
                    ADAPTERS[principal].lend.encode(pool, minimum),
                ];

                let result = await lender.lend(principal, underlying, maturity, amount, [pool, minimum]);

                assert.deepStrictEqual(result, response);

                assertArguments(lend.getCall(0).args, [...expectedArgs, {}]);

                // do another call with overrides

                result = await lender.lend(principal, underlying, maturity, amount, [pool, minimum], overrides);

                assert.deepStrictEqual(result, response);

                assertArguments(lend.getCall(1).args, [...expectedArgs, overrides]);
            });

            test('ether', async () => {

                const lender = new Lender(ADDRESSES.LENDER, signer, mockExecutor());

                principal = Principals.Yield;

                const lend = mockMethod<TransactionResponse>(lender, Lender.lendSignatures['ether']);
                const response = mockResponse();
                lend.resolves(response);

                // the converted arguments we expect to be passed to the internal contract method
                const expectedArgs = [
                    principal,
                    underlying,
                    BigNumber.from(maturity),
                    [BigNumber.from(amount)],
                    ADAPTERS[principal].lend.encode(pool, minimum),
                    lst,
                    BigNumber.from(swapMinimum),
                ];

                let result = await lender.lend(principal, underlying, maturity, amount, [pool, minimum], [lst, swapMinimum]);

                assert.deepStrictEqual(result, response);

                assertArguments(lend.getCall(0).args, [...expectedArgs, {}]);

                // do another call with overrides

                result = await lender.lend(principal, underlying, maturity, amount, [pool, minimum], [lst, swapMinimum], overrides);

                assert.deepStrictEqual(result, response);

                assertArguments(lend.getCall(1).args, [...expectedArgs, overrides]);
            });
        });

        suite('swivel', () => {

            const maker = '0x1234567890000000000000000000000000000009';
            const expiry = deadline;

            const orders: Order[] = [
                {
                    key: '0xfb1700b125bdb80a6c11c181325a5a744fe00a098f379aa31fcbcdfb1d6d1c01',
                    protocol: 0,
                    maker: maker,
                    underlying: underlying,
                    vault: false,
                    exit: false,
                    principal: '10000000000000000000',
                    premium: '1000000000000000000',
                    maturity: maturity,
                    expiry: expiry,
                },
                {
                    key: '0xfb1700b125bdb80a6c11c181325a5a744fe00a098f379aa31fcbcdfb1d6d1c01',
                    protocol: 1,
                    maker: maker,
                    underlying: underlying,
                    vault: false,
                    exit: false,
                    principal: '200000000000000000000',
                    premium: '20000000000000000000',
                    maturity: maturity,
                    expiry: expiry,
                },
            ];

            const signatures: SignatureLike[] = [
                '0xa5af5edd029fb82bef79cae459d8007ff20c078e25114217c921dc60e31ce0a06014954014d6ee16840a1ead70ec6797b64e42532a86edc744a451b07a1bb41d1b',
                '0xe3dea176cfd7dacd1fe7424f633789b8fc7da0fa23d7e1bd64404bd29d9115d4656c0bf83af468dc5036309403d8f1a0809be0a9db18e314c40fd7f252e6fb971b',
            ];

            const amounts = [
                utils.parseEther('10').toString(),
                utils.parseEther('200').toString(),
            ];

            const swapMinimum = utils.parseEther('2').toString();
            const swapFlag = true;

            test('stable', async () => {

                const lender = new Lender(ADDRESSES.LENDER, signer, mockExecutor());

                principal = Principals.Swivel;

                const lend = mockMethod<TransactionResponse>(lender, Lender.lendSignatures['stable']);
                const response = mockResponse();
                lend.resolves(response);

                // the converted arguments we expect to be passed to the internal contract method
                const expectedArgs = [
                    principal,
                    underlying,
                    BigNumber.from(maturity),
                    amounts.map(amount => BigNumber.from(amount)),
                    ADAPTERS[principal].lend.encode(orders, signatures, pool, swapMinimum, swapFlag),
                ];

                let result = await lender.lend(principal, underlying, maturity, amounts, [orders, signatures, pool, swapMinimum, swapFlag]);

                assert.deepStrictEqual(result, response);

                assertArguments(lend.getCall(0).args, [...expectedArgs, {}]);

                // do another call with overrides

                result = await lender.lend(principal, underlying, maturity, amounts, [orders, signatures, pool, swapMinimum, swapFlag], overrides);

                assert.deepStrictEqual(result, response);

                assertArguments(lend.getCall(1).args, [...expectedArgs, overrides]);
            });

            test('ether', async () => {

                const lender = new Lender(ADDRESSES.LENDER, signer, mockExecutor());

                principal = Principals.Swivel;

                const lend = mockMethod<TransactionResponse>(lender, Lender.lendSignatures['ether']);
                const response = mockResponse();
                lend.resolves(response);

                // the converted arguments we expect to be passed to the internal contract method
                const expectedArgs = [
                    principal,
                    underlying,
                    BigNumber.from(maturity),
                    amounts.map(amount => BigNumber.from(amount)),
                    ADAPTERS[principal].lend.encode(orders, signatures, pool, swapMinimum, swapFlag),
                    lst,
                    BigNumber.from(swapMinimum),
                ];

                let result = await lender.lend(principal, underlying, maturity, amounts, [orders, signatures, pool, swapMinimum, swapFlag], [lst, swapMinimum]);

                assert.deepStrictEqual(result, response);

                assertArguments(lend.getCall(0).args, [...expectedArgs, {}]);

                // do another call with overrides

                result = await lender.lend(principal, underlying, maturity, amounts, [orders, signatures, pool, swapMinimum, swapFlag], [lst, swapMinimum], overrides);

                assert.deepStrictEqual(result, response);

                assertArguments(lend.getCall(1).args, [...expectedArgs, overrides]);
            });
        });

        // TODO: remove these once all lend overloads are implemented...

        // test('illuminate', async () => {

        //     const lender = new Lender(ADDRESSES.LENDER, signer, mockExecutor());

        //     principal = Principals.Illuminate;

        //     const lend = mockMethod<TransactionResponse>(lender, Lender.lendSignatures[principal]);
        //     const response = mockResponse();
        //     lend.resolves(response);

        //     let result = await lender.lend(principal, underlying, maturity, amount, pool, minReturn);

        //     assert.strictEqual(result.hash, '0xresponse');

        //     // get the call arguments
        //     let args = lend.getCall(0).args;

        //     // assert the correct amount of call arguments
        //     assert.strictEqual(args.length, 7);

        //     let [passedPrincipal, passedUnderlying, passedMaturity, passedAmount, passedPool, passedMinReturn, passedOverrides] = args;

        //     // assert the arguments are being converted correctly
        //     assert.strictEqual(passedPrincipal, principal);
        //     assert.strictEqual(passedUnderlying, underlying);
        //     assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
        //     assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
        //     assert.strictEqual(passedPool, pool);
        //     assert.deepStrictEqual(passedMinReturn, BigNumber.from(minReturn));
        //     assert.deepStrictEqual(passedOverrides, {});

        //     // do another call with overrides
        //     result = await lender.lend(principal, underlying, maturity, amount, pool, minReturn, overrides);

        //     assert.strictEqual(result.hash, '0xresponse');

        //     // get the call arguments for the second call
        //     args = lend.getCall(1).args;

        //     // assert the correct amount of call arguments
        //     assert.strictEqual(args.length, 7);

        //     [passedPrincipal, passedUnderlying, passedMaturity, passedAmount, passedPool, passedMinReturn, passedOverrides] = args;

        //     // assert the arguments are being converted correctly
        //     assert.strictEqual(passedPrincipal, principal);
        //     assert.strictEqual(passedUnderlying, underlying);
        //     assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
        //     assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
        //     assert.strictEqual(passedPool, pool);
        //     assert.deepStrictEqual(passedMinReturn, BigNumber.from(minReturn));
        //     assert.deepStrictEqual(passedOverrides, overrides);
        // });

        // test('yield', async () => {

        //     const lender = new Lender(ADDRESSES.LENDER, signer, mockExecutor());

        //     principal = Principals.Yield;

        //     const lend = mockMethod<TransactionResponse>(lender, Lender.lendSignatures[principal]);
        //     const response = mockResponse();
        //     lend.resolves(response);

        //     let result = await lender.lend(principal, underlying, maturity, amount, pool, minReturn);

        //     assert.strictEqual(result.hash, '0xresponse');

        //     // get the call arguments
        //     let args = lend.getCall(0).args;

        //     // assert the correct amount of call arguments
        //     assert.strictEqual(args.length, 7);

        //     let [passedPrincipal, passedUnderlying, passedMaturity, passedAmount, passedPool, passedMinReturn, passedOverrides] = args;

        //     // assert the arguments are being converted correctly
        //     assert.strictEqual(passedPrincipal, principal);
        //     assert.strictEqual(passedUnderlying, underlying);
        //     assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
        //     assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
        //     assert.strictEqual(passedPool, pool);
        //     assert.deepStrictEqual(passedMinReturn, BigNumber.from(minReturn));
        //     assert.deepStrictEqual(passedOverrides, {});

        //     // do another call with overrides
        //     result = await lender.lend(principal, underlying, maturity, amount, pool, minReturn, overrides);

        //     assert.strictEqual(result.hash, '0xresponse');

        //     // get the call arguments for the second call
        //     args = lend.getCall(1).args;

        //     // assert the correct amount of call arguments
        //     assert.strictEqual(args.length, 7);

        //     [passedPrincipal, passedUnderlying, passedMaturity, passedAmount, passedPool, passedMinReturn, passedOverrides] = args;

        //     // assert the arguments are being converted correctly
        //     assert.strictEqual(passedPrincipal, principal);
        //     assert.strictEqual(passedUnderlying, underlying);
        //     assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
        //     assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
        //     assert.strictEqual(passedPool, pool);
        //     assert.deepStrictEqual(passedMinReturn, BigNumber.from(minReturn));
        //     assert.deepStrictEqual(passedOverrides, overrides);
        // });

        // test('swivel', async () => {

        //     const lender = new Lender(ADDRESSES.LENDER, signer, mockExecutor());

        //     principal = Principals.Swivel;

        //     const amounts = [
        //         utils.parseEther('10').toString(),
        //         utils.parseEther('200').toString(),
        //     ];

        //     const orders: Order[] = [
        //         {
        //             key: '0xfb1700b125bdb80a6c11c181325a5a744fe00a098f379aa31fcbcdfb1d6d1c01',
        //             protocol: 0,
        //             maker: '0xmaker1',
        //             underlying: '0xunderlying',
        //             vault: false,
        //             exit: false,
        //             principal: '10000000000000000000',
        //             premium: '1000000000000000000',
        //             maturity: '12345678',
        //             expiry: '22345678',
        //         },
        //         {
        //             key: '0xfb1700b125bdb80a6c11c181325a5a744fe00a098f379aa31fcbcdfb1d6d1c01',
        //             protocol: 1,
        //             maker: '0xmaker2',
        //             underlying: '0xunderlying',
        //             vault: false,
        //             exit: false,
        //             principal: '200000000000000000000',
        //             premium: '20000000000000000000',
        //             maturity: '12345678',
        //             expiry: '22345678',
        //         },
        //     ];

        //     const signatures: SignatureLike[] = [
        //         '0xa5af5edd029fb82bef79cae459d8007ff20c078e25114217c921dc60e31ce0a06014954014d6ee16840a1ead70ec6797b64e42532a86edc744a451b07a1bb41d1b',
        //         '0xe3dea176cfd7dacd1fe7424f633789b8fc7da0fa23d7e1bd64404bd29d9115d4656c0bf83af468dc5036309403d8f1a0809be0a9db18e314c40fd7f252e6fb971b',
        //     ];

        //     const swap = true;
        //     const slippage = utils.parseEther('0.05').toString();

        //     const lend = mockMethod<TransactionResponse>(lender, Lender.lendSignatures[principal]);
        //     const response = mockResponse();
        //     lend.resolves(response);

        //     let result = await lender.lend(principal, underlying, maturity, amounts, pool, orders, signatures, swap, slippage);

        //     assert.strictEqual(result.hash, '0xresponse');

        //     // get the call arguments
        //     let args = lend.getCall(0).args;

        //     // assert the correct amount of call arguments
        //     assert.strictEqual(args.length, 10);

        //     let [
        //         passedPrincipal,
        //         passedUnderlying,
        //         passedMaturity,
        //         passedAmounts,
        //         passedPool,
        //         passedOrders,
        //         passedSignatures,
        //         passedSwap,
        //         passedSlippage,
        //         passedOverrides,
        //     ] = args;

        //     // assert the arguments are being converted correctly
        //     assert.strictEqual(passedPrincipal, principal);
        //     assert.strictEqual(passedUnderlying, underlying);
        //     assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
        //     assert.deepStrictEqual(passedAmounts, amounts.map(amount => BigNumber.from(amount)));
        //     assert.strictEqual(passedPool, pool);
        //     assert.deepStrictEqual(passedOrders, orders.map(order => parseOrder(order)));
        //     assert.deepStrictEqual(passedSignatures, signatures.map(signature => utils.splitSignature(signature)));
        //     assert.strictEqual(passedSwap, swap);
        //     assert.deepStrictEqual(passedSlippage, BigNumber.from(slippage));
        //     assert.deepStrictEqual(passedOverrides, {});

        //     result = await lender.lend(principal, underlying, maturity, amounts, pool, orders, signatures, swap, slippage, overrides);

        //     assert.strictEqual(result.hash, '0xresponse');

        //     // get the call arguments
        //     args = lend.getCall(1).args;

        //     // assert the correct amount of call arguments
        //     assert.strictEqual(args.length, 10);

        //     [
        //         passedPrincipal,
        //         passedUnderlying,
        //         passedMaturity,
        //         passedAmounts,
        //         passedPool,
        //         passedOrders,
        //         passedSignatures,
        //         passedSwap,
        //         passedSlippage,
        //         passedOverrides,
        //     ] = args;

        //     // assert the arguments are being converted correctly
        //     assert.strictEqual(passedPrincipal, principal);
        //     assert.strictEqual(passedUnderlying, underlying);
        //     assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
        //     assert.deepStrictEqual(passedAmounts, amounts.map(amount => BigNumber.from(amount)));
        //     assert.strictEqual(passedPool, pool);
        //     assert.deepStrictEqual(passedOrders, orders.map(order => parseOrder(order)));
        //     assert.deepStrictEqual(passedSignatures, signatures.map(signature => utils.splitSignature(signature)));
        //     assert.strictEqual(passedSwap, swap);
        //     assert.deepStrictEqual(passedSlippage, BigNumber.from(slippage));
        //     assert.deepStrictEqual(passedOverrides, overrides);
        // });

        // test('element', async () => {

        //     const lender = new Lender(ADDRESSES.LENDER, signer, mockExecutor());

        //     principal = Principals.Element;

        //     const poolId = '0xpoolId';

        //     const lend = mockMethod<TransactionResponse>(lender, Lender.lendSignatures[principal]);
        //     const response = mockResponse();
        //     lend.resolves(response);

        //     let result = await lender.lend(principal, underlying, maturity, amount, minReturn, deadline, pool, poolId);

        //     assert.strictEqual(result.hash, '0xresponse');

        //     // get the call arguments
        //     let args = lend.getCall(0).args;

        //     // assert the correct amount of call arguments
        //     assert.strictEqual(args.length, 9);

        //     let [passedPrincipal, passedUnderlying, passedMaturity, passedAmount, passedMinReturn, passedDeadline, passedPool, passedPoolId, passedOverrides] = args;

        //     // assert the arguments are being converted correctly
        //     assert.strictEqual(passedPrincipal, principal);
        //     assert.strictEqual(passedUnderlying, underlying);
        //     assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
        //     assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
        //     assert.deepStrictEqual(passedMinReturn, BigNumber.from(minReturn));
        //     assert.deepStrictEqual(passedDeadline, BigNumber.from(deadline));
        //     assert.strictEqual(passedPool, pool);
        //     assert.strictEqual(passedPoolId, poolId);
        //     assert.deepStrictEqual(passedOverrides, {});

        //     result = await lender.lend(principal, underlying, maturity, amount, minReturn, deadline, pool, poolId, overrides);

        //     assert.strictEqual(result.hash, '0xresponse');

        //     // get the call arguments
        //     args = lend.getCall(1).args;

        //     // assert the correct amount of call arguments
        //     assert.strictEqual(args.length, 9);

        //     [passedPrincipal, passedUnderlying, passedMaturity, passedAmount, passedMinReturn, passedDeadline, passedPool, passedPoolId, passedOverrides] = args;

        //     // assert the arguments are being converted correctly
        //     assert.strictEqual(passedPrincipal, principal);
        //     assert.strictEqual(passedUnderlying, underlying);
        //     assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
        //     assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
        //     assert.deepStrictEqual(passedMinReturn, BigNumber.from(minReturn));
        //     assert.deepStrictEqual(passedDeadline, BigNumber.from(deadline));
        //     assert.strictEqual(passedPool, pool);
        //     assert.strictEqual(passedPoolId, poolId);
        //     assert.deepStrictEqual(passedOverrides, overrides);
        // });

        // test('pendle', async () => {

        //     const lender = new Lender(ADDRESSES.LENDER, signer, mockExecutor());

        //     principal = Principals.Pendle;

        //     const guess: ApproxParams = {
        //         guessMin: '1',
        //         guessMax: '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
        //         guessOffchain: '0',
        //         maxIteration: '256',
        //         eps: '1000000000000000',
        //     };

        //     const market = '0x7b246B8dBC2a640BF2D8221890cEe8327fC23917';

        //     const lend = mockMethod<TransactionResponse>(lender, Lender.lendSignatures[principal]);
        //     const response = mockResponse();
        //     lend.resolves(response);

        //     let result = await lender.lend(principal, underlying, maturity, amount, minReturn, guess, market);

        //     assert.strictEqual(result.hash, '0xresponse');

        //     // get the call arguments
        //     let args = lend.getCall(0).args;

        //     // assert the correct amount of call arguments
        //     assert.strictEqual(args.length, 8);

        //     let [passedPrincipal, passedUnderlying, passedMaturity, passedAmount, passedMinReturn, passedGuess, passedMarket, passedOverrides] = args;

        //     // assert the arguments are being converted correctly
        //     assert.strictEqual(passedPrincipal, principal);
        //     assert.strictEqual(passedUnderlying, underlying);
        //     assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
        //     assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
        //     assert.deepStrictEqual(passedMinReturn, BigNumber.from(minReturn));
        //     assert.deepStrictEqual(passedGuess, parseApproxParams(guess));
        //     assert.strictEqual(passedMarket, market);
        //     assert.deepStrictEqual(passedOverrides, {});

        //     result = await lender.lend(principal, underlying, maturity, amount, minReturn, guess, market, overrides);

        //     assert.strictEqual(result.hash, '0xresponse');

        //     // get the call arguments
        //     args = lend.getCall(1).args;

        //     // assert the correct amount of call arguments
        //     assert.strictEqual(args.length, 8);

        //     [passedPrincipal, passedUnderlying, passedMaturity, passedAmount, passedMinReturn, passedGuess, passedMarket, passedOverrides] = args;

        //     // assert the arguments are being converted correctly
        //     assert.strictEqual(passedPrincipal, principal);
        //     assert.strictEqual(passedUnderlying, underlying);
        //     assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
        //     assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
        //     assert.deepStrictEqual(passedMinReturn, BigNumber.from(minReturn));
        //     assert.deepStrictEqual(passedGuess, parseApproxParams(guess));
        //     assert.strictEqual(passedMarket, market);
        //     assert.deepStrictEqual(passedOverrides, overrides);
        // });

        // test('tempus', async () => {

        //     const lender = new Lender(ADDRESSES.LENDER, signer, mockExecutor());

        //     principal = Principals.Tempus;

        //     const lend = mockMethod<TransactionResponse>(lender, Lender.lendSignatures[principal]);
        //     const response = mockResponse();
        //     lend.resolves(response);

        //     let result = await lender.lend(principal, underlying, maturity, amount, minReturn, deadline, pool);

        //     assert.strictEqual(result.hash, '0xresponse');

        //     // get the call arguments
        //     let args = lend.getCall(0).args;

        //     // assert the correct amount of call arguments
        //     assert.strictEqual(args.length, 8);

        //     let [passedPrincipal, passedUnderlying, passedMaturity, passedAmount, passedMinReturn, passedDeadline, passedPool, passedOverrides] = args;

        //     // assert the arguments are being converted correctly
        //     assert.strictEqual(passedPrincipal, principal);
        //     assert.strictEqual(passedUnderlying, underlying);
        //     assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
        //     assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
        //     assert.deepStrictEqual(passedMinReturn, BigNumber.from(minReturn));
        //     assert.deepStrictEqual(passedDeadline, BigNumber.from(deadline));
        //     assert.strictEqual(passedPool, pool);
        //     assert.deepStrictEqual(passedOverrides, {});

        //     result = await lender.lend(principal, underlying, maturity, amount, minReturn, deadline, pool, overrides);

        //     assert.strictEqual(result.hash, '0xresponse');

        //     // get the call arguments
        //     args = lend.getCall(1).args;

        //     // assert the correct amount of call arguments
        //     assert.strictEqual(args.length, 8);

        //     [passedPrincipal, passedUnderlying, passedMaturity, passedAmount, passedMinReturn, passedDeadline, passedPool, passedOverrides] = args;

        //     // assert the arguments are being converted correctly
        //     assert.strictEqual(passedPrincipal, principal);
        //     assert.strictEqual(passedUnderlying, underlying);
        //     assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
        //     assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
        //     assert.deepStrictEqual(passedMinReturn, BigNumber.from(minReturn));
        //     assert.deepStrictEqual(passedDeadline, BigNumber.from(deadline));
        //     assert.strictEqual(passedPool, pool);
        //     assert.deepStrictEqual(passedOverrides, overrides);
        // });

        // test('sense', async () => {

        //     const lender = new Lender(ADDRESSES.LENDER, signer, mockExecutor());

        //     principal = Principals.Sense;

        //     // const amm = '0xamm';
        //     const senseMaturity = '1654628431';
        //     const senseAdapter = '0xadapter';

        //     const lend = mockMethod<TransactionResponse>(lender, Lender.lendSignatures[principal]);
        //     const response = mockResponse();
        //     lend.resolves(response);

        //     let result = await lender.lend(principal, underlying, maturity, amount, minReturn, pool, senseMaturity, senseAdapter);

        //     assert.strictEqual(result.hash, '0xresponse');

        //     // get the call arguments
        //     let args = lend.getCall(0).args;

        //     // assert the correct amount of call arguments
        //     assert.strictEqual(args.length, 9);

        //     let [
        //         passedPrincipal,
        //         passedUnderlying,
        //         passedMaturity,
        //         passedAmount,
        //         passedMinReturn,
        //         passedPool,
        //         passedSenseMaturity,
        //         passedSenseAdapter,
        //         passedOverrides,
        //     ] = args;

        //     // assert the arguments are being converted correctly
        //     assert.strictEqual(passedPrincipal, principal);
        //     assert.strictEqual(passedUnderlying, underlying);
        //     assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
        //     assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
        //     assert.deepStrictEqual(passedMinReturn, BigNumber.from(minReturn));
        //     assert.strictEqual(passedPool, pool);
        //     assert.deepStrictEqual(passedSenseMaturity, BigNumber.from(senseMaturity));
        //     assert.strictEqual(passedSenseAdapter, senseAdapter);
        //     assert.deepStrictEqual(passedOverrides, {});

        //     result = await lender.lend(principal, underlying, maturity, amount, minReturn, pool, senseMaturity, senseAdapter, overrides);

        //     assert.strictEqual(result.hash, '0xresponse');

        //     // get the call arguments
        //     args = lend.getCall(1).args;

        //     // assert the correct amount of call arguments
        //     assert.strictEqual(args.length, 9);

        //     [
        //         passedPrincipal,
        //         passedUnderlying,
        //         passedMaturity,
        //         passedAmount,
        //         passedMinReturn,
        //         passedPool,
        //         passedSenseMaturity,
        //         passedSenseAdapter,
        //         passedOverrides,
        //     ] = args;

        //     // assert the arguments are being converted correctly
        //     assert.strictEqual(passedPrincipal, principal);
        //     assert.strictEqual(passedUnderlying, underlying);
        //     assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
        //     assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
        //     assert.deepStrictEqual(passedMinReturn, BigNumber.from(minReturn));
        //     assert.strictEqual(passedPool, pool);
        //     assert.deepStrictEqual(passedSenseMaturity, BigNumber.from(senseMaturity));
        //     assert.strictEqual(passedSenseAdapter, senseAdapter);
        //     assert.deepStrictEqual(passedOverrides, overrides);
        // });

        // test('apwine', async () => {

        //     const lender = new Lender(ADDRESSES.LENDER, signer, mockExecutor());

        //     principal = Principals.Apwine;

        //     const lend = mockMethod<TransactionResponse>(lender, Lender.lendSignatures[principal]);
        //     const response = mockResponse();
        //     lend.resolves(response);

        //     let result = await lender.lend(principal, underlying, maturity, amount, minReturn, deadline, pool);

        //     assert.strictEqual(result.hash, '0xresponse');

        //     // get the call arguments
        //     let args = lend.getCall(0).args;

        //     // assert the correct amount of call arguments
        //     assert.strictEqual(args.length, 8);

        //     let [passedPrincipal, passedUnderlying, passedMaturity, passedAmount, passedMinReturn, passedDeadline, passedPool, passedOverrides] = args;

        //     // assert the arguments are being converted correctly
        //     assert.strictEqual(passedPrincipal, principal);
        //     assert.strictEqual(passedUnderlying, underlying);
        //     assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
        //     assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
        //     assert.deepStrictEqual(passedMinReturn, BigNumber.from(minReturn));
        //     assert.deepStrictEqual(passedDeadline, BigNumber.from(deadline));
        //     assert.strictEqual(passedPool, pool);
        //     assert.deepStrictEqual(passedOverrides, {});

        //     result = await lender.lend(principal, underlying, maturity, amount, minReturn, deadline, pool, overrides);

        //     assert.strictEqual(result.hash, '0xresponse');

        //     // get the call arguments
        //     args = lend.getCall(1).args;

        //     // assert the correct amount of call arguments
        //     assert.strictEqual(args.length, 8);

        //     [passedPrincipal, passedUnderlying, passedMaturity, passedAmount, passedMinReturn, passedDeadline, passedPool, passedOverrides] = args;

        //     // assert the arguments are being converted correctly
        //     assert.strictEqual(passedPrincipal, principal);
        //     assert.strictEqual(passedUnderlying, underlying);
        //     assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
        //     assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
        //     assert.deepStrictEqual(passedMinReturn, BigNumber.from(minReturn));
        //     assert.deepStrictEqual(passedDeadline, BigNumber.from(deadline));
        //     assert.strictEqual(passedPool, pool);
        //     assert.deepStrictEqual(passedOverrides, overrides);
        // });

        // test('notional', async () => {

        //     const lender = new Lender(ADDRESSES.LENDER, signer, mockExecutor());

        //     principal = Principals.Notional;

        //     const lend = mockMethod<TransactionResponse>(lender, Lender.lendSignatures[principal]);
        //     const response = mockResponse();
        //     lend.resolves(response);

        //     let result = await lender.lend(principal, underlying, maturity, amount, minReturn);

        //     assert.strictEqual(result.hash, '0xresponse');

        //     // get the call arguments
        //     let args = lend.getCall(0).args;

        //     // assert the correct amount of call arguments
        //     assert.strictEqual(args.length, 6);

        //     let [passedPrincipal, passedUnderlying, passedMaturity, passedAmount, passedMinRatio, passedOverrides] = args;

        //     // assert the arguments are being converted correctly
        //     assert.strictEqual(passedPrincipal, principal);
        //     assert.strictEqual(passedUnderlying, underlying);
        //     assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
        //     assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
        //     assert.deepStrictEqual(passedMinRatio, BigNumber.from(minReturn));
        //     assert.deepStrictEqual(passedOverrides, {});

        //     result = await lender.lend(principal, underlying, maturity, amount, minReturn, overrides);

        //     assert.strictEqual(result.hash, '0xresponse');

        //     // get the call arguments
        //     args = lend.getCall(1).args;

        //     // assert the correct amount of call arguments
        //     assert.strictEqual(args.length, 6);

        //     [passedPrincipal, passedUnderlying, passedMaturity, passedAmount, passedMinRatio, passedOverrides] = args;

        //     // assert the arguments are being converted correctly
        //     assert.strictEqual(passedPrincipal, principal);
        //     assert.strictEqual(passedUnderlying, underlying);
        //     assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
        //     assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
        //     assert.deepStrictEqual(passedMinRatio, BigNumber.from(minReturn));
        //     assert.deepStrictEqual(passedOverrides, overrides);
        // });
    });
});
