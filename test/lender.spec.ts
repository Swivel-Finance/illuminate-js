import assert from 'assert';
import { Provider, TransactionResponse } from '@ethersproject/abstract-provider';
import { Signer } from '@ethersproject/abstract-signer';
import { SignatureLike } from '@ethersproject/bytes';
import { BigNumber, CallOverrides, getDefaultProvider, PayableOverrides, providers, utils, Wallet } from 'ethers';
import { suite, suiteSetup, test } from 'mocha';
import { parseOrder } from '../src/helpers/index.js';
import { Lender, Principals } from '../src/index.js';
import { Order } from '../src/types/index.js';
import { ADDRESSES, mockMethod, mockResponse } from './helpers/index.js';

suite('lender', () => {

    let provider: Provider;
    let signer: Signer;

    suiteSetup(() => {

        provider = getDefaultProvider();
        signer = Wallet.createRandom().connect(provider);
    });

    // TODO: on-chain test calls are only temporary for debugging, will be removed soon...
    test.skip('on-chain test calls', async () => {

        // bypass rate limiting of default provider...
        const provider = new providers.JsonRpcProvider('https://rinkeby.infura.io/v3/2935bd3e4bef4fa1a392304441c1bb3e', 4);
        const lender = new Lender(ADDRESSES.LENDER, provider);

        const marketPlace = await lender.marketPlace();

        console.log('marketPlace: ', marketPlace);

        const feenominator = await lender.feenominator();

        console.log('feenominator: ', feenominator);

        try {

            const fees = await lender.fees('0xeb8f08a975ab53e34d8a0330e0d34de942c95926');

            console.log('fees: ', fees);

        } catch (error) {

            console.log('fees: ', error);
        }
    });

    test('create instance', () => {

        const lender = new Lender(ADDRESSES.LENDER, provider);

        assert(lender instanceof Lender);

        assert.strictEqual(lender.address, ADDRESSES.LENDER);
    });

    suite('admin', () => {

        const expected = '0xadmin';

        const overrides: CallOverrides = {
            gasLimit: '1000',
            from: '0xfrom',
            nonce: 1,
        };

        test('unwraps result', async () => {

            const lender = new Lender(ADDRESSES.LENDER, provider);

            // mock the Lender contract's `admin` method and tell it to resolve with a typed `Result`
            // mock will throw if 'admin' doesn't exist on the contract, so tests will fail if it's removed from the abi
            const admin = mockMethod<string>(lender, 'admin');
            admin.resolves([expected]);

            const result = await lender.admin();

            assert.strictEqual(result, expected);

            const args = admin.getCall(0).args;

            assert.strictEqual(args.length, 1);

            const [passedOverrides] = args;

            assert.deepStrictEqual(passedOverrides, {});
        });

        test('accepts transaction overrides', async () => {

            const lender = new Lender(ADDRESSES.LENDER, provider);

            const admin = mockMethod<string>(lender, 'admin');
            admin.resolves([expected]);

            const result = await lender.admin(overrides);

            assert.strictEqual(result, expected);

            const args = admin.getCall(0).args;

            assert.strictEqual(args.length, 1);

            const [passedOverrides] = args;

            assert.deepStrictEqual(passedOverrides, overrides);
        });
    });

    suite('marketPlace', () => {

        const expected = '0xmarketPlace';

        const overrides: CallOverrides = {
            gasLimit: '1000',
            from: '0xfrom',
            nonce: 1,
        };

        test('unwraps result', async () => {

            const lender = new Lender(ADDRESSES.LENDER, provider);

            const marketPlace = mockMethod<string>(lender, 'marketPlace');
            marketPlace.resolves([expected]);

            const result = await lender.marketPlace();

            assert.strictEqual(result, expected);

            const args = marketPlace.getCall(0).args;

            assert.strictEqual(args.length, 1);

            const [passedOverrides] = args;

            assert.deepStrictEqual(passedOverrides, {});
        });

        test('accepts transaction overrides', async () => {

            const lender = new Lender(ADDRESSES.LENDER, provider);

            const marketPlace = mockMethod<string>(lender, 'marketPlace');
            marketPlace.resolves([expected]);

            const result = await lender.marketPlace(overrides);

            assert.strictEqual(result, expected);

            const args = marketPlace.getCall(0).args;

            assert.strictEqual(args.length, 1);

            const [passedOverrides] = args;

            assert.deepStrictEqual(passedOverrides, overrides);
        });
    });

    suite('swivelAddr', () => {

        const expected = '0xswivelAddr';

        const overrides: CallOverrides = {
            gasLimit: '1000',
            from: '0xfrom',
            nonce: 1,
        };

        test('unwraps result', async () => {

            const lender = new Lender(ADDRESSES.LENDER, provider);

            const swivelAddr = mockMethod<string>(lender, 'swivelAddr');
            swivelAddr.resolves([expected]);

            const result = await lender.swivelAddr();

            assert.strictEqual(result, expected);

            const args = swivelAddr.getCall(0).args;

            assert.strictEqual(args.length, 1);

            const [passedOverrides] = args;

            assert.deepStrictEqual(passedOverrides, {});
        });

        test('accepts transaction overrides', async () => {

            const lender = new Lender(ADDRESSES.LENDER, provider);

            const swivelAddr = mockMethod<string>(lender, 'swivelAddr');
            swivelAddr.resolves([expected]);

            const result = await lender.swivelAddr(overrides);

            assert.strictEqual(result, expected);

            const args = swivelAddr.getCall(0).args;

            assert.strictEqual(args.length, 1);

            const [passedOverrides] = args;

            assert.deepStrictEqual(passedOverrides, overrides);
        });
    });

    suite('pendleAddr', () => {

        const expected = '0xpendleAddr';

        const overrides: CallOverrides = {
            gasLimit: '1000',
            from: '0xfrom',
            nonce: 1,
        };

        test('unwraps result', async () => {

            const lender = new Lender(ADDRESSES.LENDER, provider);

            const pendleAddr = mockMethod<string>(lender, 'pendleAddr');
            pendleAddr.resolves([expected]);

            const result = await lender.pendleAddr();

            assert.strictEqual(result, expected);

            const args = pendleAddr.getCall(0).args;

            assert.strictEqual(args.length, 1);

            const [passedOverrides] = args;

            assert.deepStrictEqual(passedOverrides, {});
        });

        test('accepts transaction overrides', async () => {

            const lender = new Lender(ADDRESSES.LENDER, provider);

            const pendleAddr = mockMethod<string>(lender, 'pendleAddr');
            pendleAddr.resolves([expected]);

            const result = await lender.pendleAddr(overrides);

            assert.strictEqual(result, expected);

            const args = pendleAddr.getCall(0).args;

            assert.strictEqual(args.length, 1);

            const [passedOverrides] = args;

            assert.deepStrictEqual(passedOverrides, overrides);
        });
    });

    suite('tempusAddr', () => {

        const expected = '0xtempusAddr';

        const overrides: CallOverrides = {
            gasLimit: '1000',
            from: '0xfrom',
            nonce: 1,
        };

        test('unwraps result', async () => {

            const lender = new Lender(ADDRESSES.LENDER, provider);

            const tempusAddr = mockMethod<string>(lender, 'tempusAddr');
            tempusAddr.resolves([expected]);

            const result = await lender.tempusAddr();

            assert.strictEqual(result, expected);

            const args = tempusAddr.getCall(0).args;

            assert.strictEqual(args.length, 1);

            const [passedOverrides] = args;

            assert.deepStrictEqual(passedOverrides, {});
        });

        test('accepts transaction overrides', async () => {

            const lender = new Lender(ADDRESSES.LENDER, provider);

            const tempusAddr = mockMethod<string>(lender, 'tempusAddr');
            tempusAddr.resolves([expected]);

            const result = await lender.tempusAddr(overrides);

            assert.strictEqual(result, expected);

            const args = tempusAddr.getCall(0).args;

            assert.strictEqual(args.length, 1);

            const [passedOverrides] = args;

            assert.deepStrictEqual(passedOverrides, overrides);
        });
    });

    suite('feenominator', () => {

        const expected = '1000';

        const overrides: CallOverrides = {
            gasLimit: '1000',
            from: '0xfrom',
            nonce: 1,
        };

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

            const result = await lender.feenominator(overrides);

            assert.strictEqual(result, expected);

            const args = feenominator.getCall(0).args;

            assert.strictEqual(args.length, 1);

            const [passedOverrides] = args;

            assert.deepStrictEqual(passedOverrides, overrides);
        });
    });

    suite('fees', () => {

        const underlying = '0xunderlying';
        const expected = '0';

        const overrides: CallOverrides = {
            gasLimit: '1000',
            from: '0xfrom',
            nonce: 1,
        };

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

            const result = await lender.fees(underlying, overrides);

            assert.strictEqual(result, expected);

            const args = fees.getCall(0).args;

            assert.strictEqual(args.length, 2);

            const [passedUnderlying, passedOverrides] = args;

            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedOverrides, overrides);
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

            const lender = new Lender(ADDRESSES.LENDER, signer);

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

        test('accepts overrides', async () => {

            const lender = new Lender(ADDRESSES.LENDER, signer);

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

        const overrides: PayableOverrides = {
            gasLimit: '1000',
            nonce: 1,
        };

        test('illuminate', async () => {

            const lender = new Lender(ADDRESSES.LENDER, signer);

            principal = Principals.Illuminate;

            const lend = mockMethod<TransactionResponse>(lender, Lender.lendSignatures[principal]);
            const response = mockResponse();
            lend.resolves(response);

            let result = await lender.lend(principal, underlying, maturity, amount, pool);

            assert.strictEqual(result.hash, '0xresponse');

            // get the call arguments
            let args = lend.getCall(0).args;

            // assert the correct amount of call arguments
            assert.strictEqual(args.length, 6);

            let [passedPrincipal, passedUnderlying, passedMaturity, passedAmount, passedPool, passedOverrides] = args;

            // assert the arguments are being converted correctly
            assert.strictEqual(passedPrincipal, principal);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
            assert.strictEqual(passedPool, pool);
            assert.deepStrictEqual(passedOverrides, {});

            // do another call with overrides
            result = await lender.lend(principal, underlying, maturity, amount, pool, overrides);

            assert.strictEqual(result.hash, '0xresponse');

            // get the call arguments for the second call
            args = lend.getCall(1).args;

            // assert the correct amount of call arguments
            assert.strictEqual(args.length, 6);

            [passedPrincipal, passedUnderlying, passedMaturity, passedAmount, passedPool, passedOverrides] = args;

            // assert the arguments are being converted correctly
            assert.strictEqual(passedPrincipal, principal);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
            assert.strictEqual(passedPool, pool);
            assert.deepStrictEqual(passedOverrides, overrides);
        });

        test('yield', async () => {

            const lender = new Lender(ADDRESSES.LENDER, signer);

            principal = Principals.Yield;

            const lend = mockMethod<TransactionResponse>(lender, Lender.lendSignatures[principal]);
            const response = mockResponse();
            lend.resolves(response);

            let result = await lender.lend(principal, underlying, maturity, amount, pool);

            assert.strictEqual(result.hash, '0xresponse');

            // get the call arguments
            let args = lend.getCall(0).args;

            // assert the correct amount of call arguments
            assert.strictEqual(args.length, 6);

            let [passedPrincipal, passedUnderlying, passedMaturity, passedAmount, passedPool, passedOverrides] = args;

            // assert the arguments are being converted correctly
            assert.strictEqual(passedPrincipal, principal);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
            assert.strictEqual(passedPool, pool);
            assert.deepStrictEqual(passedOverrides, {});

            result = await lender.lend(principal, underlying, maturity, amount, pool, overrides);

            assert.strictEqual(result.hash, '0xresponse');

            // get the call arguments
            args = lend.getCall(1).args;

            // assert the correct amount of call arguments
            assert.strictEqual(args.length, 6);

            [passedPrincipal, passedUnderlying, passedMaturity, passedAmount, passedPool, passedOverrides] = args;

            // assert the arguments are being converted correctly
            assert.strictEqual(passedPrincipal, principal);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
            assert.strictEqual(passedPool, pool);
            assert.deepStrictEqual(passedOverrides, overrides);
        });

        test('swivel', async () => {

            const lender = new Lender(ADDRESSES.LENDER, signer);

            principal = Principals.Swivel;

            const amounts = [
                utils.parseEther('10').toString(),
                utils.parseEther('200').toString(),
            ];

            const orders: Order[] = [
                {
                    key: '0xfb1700b125bdb80a6c11c181325a5a744fe00a098f379aa31fcbcdfb1d6d1c01',
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

            const lend = mockMethod<TransactionResponse>(lender, Lender.lendSignatures[principal]);
            const response = mockResponse();
            lend.resolves(response);

            let result = await lender.lend(principal, underlying, maturity, amounts, pool, orders, signatures);

            assert.strictEqual(result.hash, '0xresponse');

            // get the call arguments
            let args = lend.getCall(0).args;

            // assert the correct amount of call arguments
            assert.strictEqual(args.length, 8);

            let [passedPrincipal, passedUnderlying, passedMaturity, passedAmounts, passedPool, passedOrders, passedSignatures, passedOverrides] = args;

            // assert the arguments are being converted correctly
            assert.strictEqual(passedPrincipal, principal);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedAmounts, amounts.map(amount => BigNumber.from(amount)));
            assert.strictEqual(passedPool, pool);
            assert.deepStrictEqual(passedOrders, orders.map(order => parseOrder(order)));
            assert.deepStrictEqual(passedSignatures, signatures.map(signature => utils.splitSignature(signature)));
            assert.deepStrictEqual(passedOverrides, {});

            result = await lender.lend(principal, underlying, maturity, amounts, pool, orders, signatures, overrides);

            assert.strictEqual(result.hash, '0xresponse');

            // get the call arguments
            args = lend.getCall(1).args;

            // assert the correct amount of call arguments
            assert.strictEqual(args.length, 8);

            [passedPrincipal, passedUnderlying, passedMaturity, passedAmounts, passedPool, passedOrders, passedSignatures, passedOverrides] = args;

            // assert the arguments are being converted correctly
            assert.strictEqual(passedPrincipal, principal);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedAmounts, amounts.map(amount => BigNumber.from(amount)));
            assert.strictEqual(passedPool, pool);
            assert.deepStrictEqual(passedOrders, orders.map(order => parseOrder(order)));
            assert.deepStrictEqual(passedSignatures, signatures.map(signature => utils.splitSignature(signature)));
            assert.deepStrictEqual(passedOverrides, overrides);
        });

        test('element', async () => {

            const lender = new Lender(ADDRESSES.LENDER, signer);

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

            const lender = new Lender(ADDRESSES.LENDER, signer);

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

            const lender = new Lender(ADDRESSES.LENDER, signer);

            principal = Principals.Tempus;

            const amm = '0xamm';

            const lend = mockMethod<TransactionResponse>(lender, Lender.lendSignatures[principal]);
            const response = mockResponse();
            lend.resolves(response);

            let result = await lender.lend(principal, underlying, maturity, amount, minReturn, deadline, pool, amm);

            assert.strictEqual(result.hash, '0xresponse');

            // get the call arguments
            let args = lend.getCall(0).args;

            // assert the correct amount of call arguments
            assert.strictEqual(args.length, 9);

            let [passedPrincipal, passedUnderlying, passedMaturity, passedAmount, passedMinReturn, passedDeadline, passedPool, passedAmm, passedOverrides] = args;

            // assert the arguments are being converted correctly
            assert.strictEqual(passedPrincipal, principal);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
            assert.deepStrictEqual(passedMinReturn, BigNumber.from(minReturn));
            assert.deepStrictEqual(passedDeadline, BigNumber.from(deadline));
            assert.strictEqual(passedPool, pool);
            assert.strictEqual(passedAmm, amm);
            assert.deepStrictEqual(passedOverrides, {});

            result = await lender.lend(principal, underlying, maturity, amount, minReturn, deadline, pool, amm, overrides);

            assert.strictEqual(result.hash, '0xresponse');

            // get the call arguments
            args = lend.getCall(1).args;

            // assert the correct amount of call arguments
            assert.strictEqual(args.length, 9);

            [passedPrincipal, passedUnderlying, passedMaturity, passedAmount, passedMinReturn, passedDeadline, passedPool, passedAmm, passedOverrides] = args;

            // assert the arguments are being converted correctly
            assert.strictEqual(passedPrincipal, principal);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
            assert.deepStrictEqual(passedMinReturn, BigNumber.from(minReturn));
            assert.deepStrictEqual(passedDeadline, BigNumber.from(deadline));
            assert.strictEqual(passedPool, pool);
            assert.strictEqual(passedAmm, amm);
            assert.deepStrictEqual(passedOverrides, overrides);
        });

        test('sense', async () => {

            const lender = new Lender(ADDRESSES.LENDER, signer);

            principal = Principals.Sense;

            const amm = '0xamm';
            const token = '0xtoken';

            const lend = mockMethod<TransactionResponse>(lender, Lender.lendSignatures[principal]);
            const response = mockResponse();
            lend.resolves(response);

            let result = await lender.lend(principal, underlying, maturity, amount, minReturn, amm, token);

            assert.strictEqual(result.hash, '0xresponse');

            // get the call arguments
            let args = lend.getCall(0).args;

            // assert the correct amount of call arguments
            assert.strictEqual(args.length, 8);

            let [passedPrincipal, passedUnderlying, passedMaturity, passedAmount, passedMinReturn, passedAmm, passedToken, passedOverrides] = args;

            // assert the arguments are being converted correctly
            assert.strictEqual(passedPrincipal, principal);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
            assert.deepStrictEqual(passedMinReturn, BigNumber.from(minReturn));
            assert.strictEqual(passedAmm, amm);
            assert.strictEqual(passedToken, token);
            assert.deepStrictEqual(passedOverrides, {});

            result = await lender.lend(principal, underlying, maturity, amount, minReturn, amm, token, overrides);

            assert.strictEqual(result.hash, '0xresponse');

            // get the call arguments
            args = lend.getCall(1).args;

            // assert the correct amount of call arguments
            assert.strictEqual(args.length, 8);

            [passedPrincipal, passedUnderlying, passedMaturity, passedAmount, passedMinReturn, passedAmm, passedToken, passedOverrides] = args;

            // assert the arguments are being converted correctly
            assert.strictEqual(passedPrincipal, principal);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
            assert.deepStrictEqual(passedMinReturn, BigNumber.from(minReturn));
            assert.strictEqual(passedAmm, amm);
            assert.strictEqual(passedToken, token);
            assert.deepStrictEqual(passedOverrides, overrides);
        });

        test('apwine', async () => {

            const lender = new Lender(ADDRESSES.LENDER, signer);

            principal = Principals.Apwine;

            const poolId = '12345678';

            const lend = mockMethod<TransactionResponse>(lender, Lender.lendSignatures[principal]);
            const response = mockResponse();
            lend.resolves(response);

            let result = await lender.lend(principal, underlying, maturity, amount, minReturn, pool, poolId);

            assert.strictEqual(result.hash, '0xresponse');

            // get the call arguments
            let args = lend.getCall(0).args;

            // assert the correct amount of call arguments
            assert.strictEqual(args.length, 8);

            let [passedPrincipal, passedUnderlying, passedMaturity, passedAmount, passedMinReturn, passedPool, passedPoolId, passedOverrides] = args;

            // assert the arguments are being converted correctly
            assert.strictEqual(passedPrincipal, principal);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
            assert.deepStrictEqual(passedMinReturn, BigNumber.from(minReturn));
            assert.strictEqual(passedPool, pool);
            assert.deepStrictEqual(passedPoolId, BigNumber.from(poolId));
            assert.deepStrictEqual(passedOverrides, {});

            result = await lender.lend(principal, underlying, maturity, amount, minReturn, pool, poolId, overrides);

            assert.strictEqual(result.hash, '0xresponse');

            // get the call arguments
            args = lend.getCall(1).args;

            // assert the correct amount of call arguments
            assert.strictEqual(args.length, 8);

            [passedPrincipal, passedUnderlying, passedMaturity, passedAmount, passedMinReturn, passedPool, passedPoolId, passedOverrides] = args;

            // assert the arguments are being converted correctly
            assert.strictEqual(passedPrincipal, principal);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
            assert.deepStrictEqual(passedMinReturn, BigNumber.from(minReturn));
            assert.strictEqual(passedPool, pool);
            assert.deepStrictEqual(passedPoolId, BigNumber.from(poolId));
            assert.deepStrictEqual(passedOverrides, overrides);
        });

        test('notional', async () => {

            const lender = new Lender(ADDRESSES.LENDER, signer);

            principal = Principals.Notional;

            const lend = mockMethod<TransactionResponse>(lender, Lender.lendSignatures[principal]);
            const response = mockResponse();
            lend.resolves(response);

            let result = await lender.lend(principal, underlying, maturity, amount);

            assert.strictEqual(result.hash, '0xresponse');

            // get the call arguments
            let args = lend.getCall(0).args;

            // assert the correct amount of call arguments
            assert.strictEqual(args.length, 5);

            let [passedPrincipal, passedUnderlying, passedMaturity, passedAmount, passedOverrides] = args;

            // assert the arguments are being converted correctly
            assert.strictEqual(passedPrincipal, principal);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
            assert.deepStrictEqual(passedOverrides, {});

            result = await lender.lend(principal, underlying, maturity, amount, overrides);

            assert.strictEqual(result.hash, '0xresponse');

            // get the call arguments
            args = lend.getCall(1).args;

            // assert the correct amount of call arguments
            assert.strictEqual(args.length, 5);

            [passedPrincipal, passedUnderlying, passedMaturity, passedAmount, passedOverrides] = args;

            // assert the arguments are being converted correctly
            assert.strictEqual(passedPrincipal, principal);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
            assert.deepStrictEqual(passedOverrides, overrides);
        });
    });
});
