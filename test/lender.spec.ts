import assert from 'assert';
import { Provider, TransactionResponse } from '@ethersproject/abstract-provider';
import { Signer } from '@ethersproject/abstract-signer';
import { SignatureLike } from '@ethersproject/bytes';
import { BigNumber, CallOverrides, PayableOverrides, Wallet, getDefaultProvider, utils } from 'ethers';
import { suite, suiteSetup, test } from 'mocha';
import { ADAPTERS, LENDER_ABI, Order, buildApproxParams, buildTokenInput } from '../src/constants/abi/index.js';
import { Lender, Principals } from '../src/index.js';
import { ADDRESSES, assertArguments, assertGetter, assertMethod, assertTransaction, mockExecutor, mockMethod, mockResponse } from './helpers/index.js';

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

    suite('hold', () => {

        test('unwraps result and accepts transaction overrides', async () => {

            await assertGetter(
                new Lender(ADDRESSES.LENDER, provider),
                'hold',
                [BigNumber.from('259200')],
                '259200',
                callOverrides,
            );
        });
    });

    suite('minimumFeenominator', () => {

        const expected = '200';

        test('unwraps result and accepts transaction overrides', async () => {

            await assertGetter(
                new Lender(ADDRESSES.LENDER, provider),
                'minimumFeenominator',
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

    suite('curvePools', () => {

        const lst = '0xsteth';
        const expected = '0xcurvepool';

        test('unwraps result and accepts transaction overrides', async () => {

            await assertMethod(
                new Lender(ADDRESSES.LENDER, provider),
                'curvePools',
                [lst],
                [lst],
                [expected],
                expected,
                callOverrides,
            );
        });
    });

    suite('feenominator', () => {

        const maturity = '1654638431';
        const expected = '1000';

        test('unwraps result and accepts transaction overrides', async () => {

            await assertMethod(
                new Lender(ADDRESSES.LENDER, provider),
                'feenominator',
                [BigNumber.from(maturity)],
                [maturity],
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
        const principalToken = '0x1234567890000000000000000000000000000002';
        const amount = utils.parseEther('100').toString();

        const overrides: PayableOverrides = {
            gasLimit: '10000',
            nonce: 3,
        };

        // create an interface for the lender ABI to encode the batch inputs
        const iface = new utils.Interface(LENDER_ABI);
        // encode multiple `mint` calls to be batched
        const inputs = [
            iface.encodeFunctionData('mint', [Principals.Illuminate, underlying, maturity, principalToken, amount]),
            iface.encodeFunctionData('mint', [Principals.Swivel, underlying, maturity, principalToken, amount]),
            iface.encodeFunctionData('mint', [Principals.Yield, underlying, maturity, principalToken, amount]),
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
        const principalToken = '0xprincipalToken';
        const amount = utils.parseEther('100').toString();

        const overrides: PayableOverrides = {
            gasLimit: '10000',
            nonce: 3,
        };

        test('converts arguments and accepts transaction overrides', async () => {

            await assertTransaction(
                new Lender(ADDRESSES.LENDER, signer, mockExecutor()),
                'mint',
                [principal, underlying, BigNumber.from(maturity), principalToken, BigNumber.from(amount)],
                [principal, underlying, maturity, principalToken, amount],
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

                assertArguments(lend.getCall(0).args, [...expectedArgs, { value: BigNumber.from(amount) }]);

                // do another call with overrides

                result = await lender.lend(principal, underlying, maturity, amount, [pool, minimum], [lst, swapMinimum], overrides);

                assert.deepStrictEqual(result, response);

                assertArguments(lend.getCall(1).args, [...expectedArgs, { ...overrides, value: BigNumber.from(amount) }]);
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

                assertArguments(lend.getCall(0).args, [...expectedArgs, { value: BigNumber.from(amount) }]);

                // do another call with overrides

                result = await lender.lend(principal, underlying, maturity, amount, [pool, minimum], [lst, swapMinimum], overrides);

                assert.deepStrictEqual(result, response);

                assertArguments(lend.getCall(1).args, [...expectedArgs, { ...overrides, value: BigNumber.from(amount) }]);
            });
        });

        suite('swivel', () => {

            const maker = '0x1234567890000000000000000000000000000009';
            const expiry = deadline;

            const orders: Order[] = [
                {
                    key: '0xfb1700b125bdb80a6c11c181325a5a744fe00a098f379aa31fcbcdfb1d6d1c01',
                    protocol: 0,
                    maker,
                    underlying,
                    vault: false,
                    exit: false,
                    principal: '10000000000000000000',
                    premium: '1000000000000000000',
                    maturity,
                    expiry,
                },
                {
                    key: '0xfb1700b125bdb80a6c11c181325a5a744fe00a098f379aa31fcbcdfb1d6d1c01',
                    protocol: 1,
                    maker,
                    underlying,
                    vault: false,
                    exit: false,
                    principal: '200000000000000000000',
                    premium: '20000000000000000000',
                    maturity,
                    expiry,
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

                assertArguments(lend.getCall(0).args, [...expectedArgs, { value: amounts.reduce((total, current) => total.add(BigNumber.from(current)), BigNumber.from('0')) }]);

                // do another call with overrides

                result = await lender.lend(principal, underlying, maturity, amounts, [orders, signatures, pool, swapMinimum, swapFlag], [lst, swapMinimum], overrides);

                assert.deepStrictEqual(result, response);

                assertArguments(lend.getCall(1).args, [...expectedArgs, { ...overrides, value: amounts.reduce((total, current) => total.add(BigNumber.from(current)), BigNumber.from('0')) }]);
            });
        });

        suite('pendle', () => {

            const pendleMarket = '0x1234567890000000000000000000000000000004';
            const amountOut = utils.parseEther('99').toString();
            const slippage = 0.01;

            const approxParams = buildApproxParams(amountOut, slippage);
            const tokenInput = buildTokenInput(amount, underlying);

            test('stable', async () => {

                const lender = new Lender(ADDRESSES.LENDER, signer, mockExecutor());

                principal = Principals.Pendle;

                const lend = mockMethod<TransactionResponse>(lender, Lender.lendSignatures['stable']);
                const response = mockResponse();
                lend.resolves(response);

                // the converted arguments we expect to be passed to the internal contract method
                const expectedArgs = [
                    principal,
                    underlying,
                    BigNumber.from(maturity),
                    [BigNumber.from(amount)],
                    ADAPTERS[principal].lend.encode(minimum, pendleMarket, approxParams, tokenInput),
                ];

                let result = await lender.lend(principal, underlying, maturity, amount, [minimum, pendleMarket, approxParams, tokenInput]);

                assert.deepStrictEqual(result, response);

                assertArguments(lend.getCall(0).args, [...expectedArgs, {}]);

                // do another call with overrides

                result = await lender.lend(principal, underlying, maturity, amount, [minimum, pendleMarket, approxParams, tokenInput], overrides);

                assert.deepStrictEqual(result, response);

                assertArguments(lend.getCall(1).args, [...expectedArgs, overrides]);
            });

            test('ether', async () => {

                const lender = new Lender(ADDRESSES.LENDER, signer, mockExecutor());

                principal = Principals.Pendle;

                const lend = mockMethod<TransactionResponse>(lender, Lender.lendSignatures['ether']);
                const response = mockResponse();
                lend.resolves(response);

                // the converted arguments we expect to be passed to the internal contract method
                const expectedArgs = [
                    principal,
                    underlying,
                    BigNumber.from(maturity),
                    [BigNumber.from(amount)],
                    ADAPTERS[principal].lend.encode(minimum, pendleMarket, approxParams, tokenInput),
                    lst,
                    BigNumber.from(swapMinimum),
                ];

                let result = await lender.lend(principal, underlying, maturity, amount, [minimum, pendleMarket, approxParams, tokenInput], [lst, swapMinimum]);

                assert.deepStrictEqual(result, response);

                assertArguments(lend.getCall(0).args, [...expectedArgs, { value: BigNumber.from(amount) }]);

                // do another call with overrides

                result = await lender.lend(principal, underlying, maturity, amount, [minimum, pendleMarket, approxParams, tokenInput], [lst, swapMinimum], overrides);

                assert.deepStrictEqual(result, response);

                assertArguments(lend.getCall(1).args, [...expectedArgs, { ...overrides, value: BigNumber.from(amount) }]);
            });
        });

        suite('notional', () => {

            test('stable', async () => {

                const lender = new Lender(ADDRESSES.LENDER, signer, mockExecutor());

                principal = Principals.Notional;

                const lend = mockMethod<TransactionResponse>(lender, Lender.lendSignatures['stable']);
                const response = mockResponse();
                lend.resolves(response);

                // the converted arguments we expect to be passed to the internal contract method
                const expectedArgs = [
                    principal,
                    underlying,
                    BigNumber.from(maturity),
                    [BigNumber.from(amount)],
                    ADAPTERS[principal].lend.encode(),
                ];

                let result = await lender.lend(principal, underlying, maturity, amount, []);

                assert.deepStrictEqual(result, response);

                assertArguments(lend.getCall(0).args, [...expectedArgs, {}]);

                // do another call with overrides

                result = await lender.lend(principal, underlying, maturity, amount, [], overrides);

                assert.deepStrictEqual(result, response);

                assertArguments(lend.getCall(1).args, [...expectedArgs, overrides]);
            });

            test('ether', async () => {

                const lender = new Lender(ADDRESSES.LENDER, signer, mockExecutor());

                principal = Principals.Notional;

                const lend = mockMethod<TransactionResponse>(lender, Lender.lendSignatures['ether']);
                const response = mockResponse();
                lend.resolves(response);

                // the converted arguments we expect to be passed to the internal contract method
                const expectedArgs = [
                    principal,
                    underlying,
                    BigNumber.from(maturity),
                    [BigNumber.from(amount)],
                    ADAPTERS[principal].lend.encode(),
                    lst,
                    BigNumber.from(swapMinimum),
                ];

                let result = await lender.lend(principal, underlying, maturity, amount, [], [lst, swapMinimum]);

                assert.deepStrictEqual(result, response);

                assertArguments(lend.getCall(0).args, [...expectedArgs, { value: BigNumber.from(amount) }]);

                // do another call with overrides

                result = await lender.lend(principal, underlying, maturity, amount, [], [lst, swapMinimum], overrides);

                assert.deepStrictEqual(result, response);

                assertArguments(lend.getCall(1).args, [...expectedArgs, { ...overrides, value: BigNumber.from(amount) }]);
            });
        });

        suite('exactly', () => {

            const exactlyMaturity = '1654638431';

            test('stable', async () => {

                const lender = new Lender(ADDRESSES.LENDER, signer, mockExecutor());

                principal = Principals.Exactly;

                const lend = mockMethod<TransactionResponse>(lender, Lender.lendSignatures['stable']);
                const response = mockResponse();
                lend.resolves(response);

                // the converted arguments we expect to be passed to the internal contract method
                const expectedArgs = [
                    principal,
                    underlying,
                    BigNumber.from(maturity),
                    [BigNumber.from(amount)],
                    ADAPTERS[principal].lend.encode(exactlyMaturity, minimum),
                ];

                let result = await lender.lend(principal, underlying, maturity, amount, [exactlyMaturity, minimum]);

                assert.deepStrictEqual(result, response);

                assertArguments(lend.getCall(0).args, [...expectedArgs, {}]);

                // do another call with overrides

                result = await lender.lend(principal, underlying, maturity, amount, [exactlyMaturity, minimum], overrides);

                assert.deepStrictEqual(result, response);

                assertArguments(lend.getCall(1).args, [...expectedArgs, overrides]);
            });

            test('ether', async () => {

                const lender = new Lender(ADDRESSES.LENDER, signer, mockExecutor());

                principal = Principals.Exactly;

                const lend = mockMethod<TransactionResponse>(lender, Lender.lendSignatures['ether']);
                const response = mockResponse();
                lend.resolves(response);

                // the converted arguments we expect to be passed to the internal contract method
                const expectedArgs = [
                    principal,
                    underlying,
                    BigNumber.from(maturity),
                    [BigNumber.from(amount)],
                    ADAPTERS[principal].lend.encode(exactlyMaturity, minimum),
                    lst,
                    BigNumber.from(swapMinimum),
                ];

                let result = await lender.lend(principal, underlying, maturity, amount, [exactlyMaturity, minimum], [lst, swapMinimum]);

                assert.deepStrictEqual(result, response);

                assertArguments(lend.getCall(0).args, [...expectedArgs, { value: BigNumber.from(amount) }]);

                // do another call with overrides

                result = await lender.lend(principal, underlying, maturity, amount, [exactlyMaturity, minimum], [lst, swapMinimum], overrides);

                assert.deepStrictEqual(result, response);

                assertArguments(lend.getCall(1).args, [...expectedArgs, { ...overrides, value: BigNumber.from(amount) }]);
            });
        });

        suite('term (should throw)', () => {

            test('stable', () => {

                const lender = new Lender(ADDRESSES.LENDER, signer, mockExecutor());

                principal = Principals.Term;

                const lend = mockMethod<TransactionResponse>(lender, Lender.lendSignatures['stable']);
                const response = mockResponse();
                lend.resolves(response);

                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                assert.rejects(lender.lend(principal, underlying, maturity, amount, []));
            });

            test('ether', () => {

                const lender = new Lender(ADDRESSES.LENDER, signer, mockExecutor());

                principal = Principals.Term;

                const lend = mockMethod<TransactionResponse>(lender, Lender.lendSignatures['stable']);
                const response = mockResponse();
                lend.resolves(response);

                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                assert.rejects(lender.lend(principal, underlying, maturity, amount, [], [lst, swapMinimum]));
            });
        });
    });
});
