import assert from 'assert';
import { Provider, TransactionResponse } from '@ethersproject/abstract-provider';
import { Signer } from '@ethersproject/abstract-signer';
import { SignatureLike } from '@ethersproject/bytes';
import { BigNumber, getDefaultProvider, providers, utils, Wallet } from 'ethers';
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

    test('admin exists and unwraps the `Result`', async () => {

        const lender = new Lender(ADDRESSES.LENDER, provider);

        const expected = '0xadmin';

        // mock the Lender contract's `admin` method and tell it to resolve with a typed `Result`
        // mock will throw if 'admin' doesn't exist on the contract, so tests will fail if it's removed from the abi
        mockMethod<string>(lender, 'admin').resolves([expected]);

        const result = await lender.admin();

        assert.strictEqual(result, expected);
    });

    test('marketPlace exists and unwraps the `Result`', async () => {

        const lender = new Lender(ADDRESSES.LENDER, provider);

        const expected = '0xmarketPlace';

        mockMethod<string>(lender, 'marketPlace').resolves([expected]);

        const result = await lender.marketPlace();

        assert.strictEqual(result, expected);
    });

    test('swivelAddr exists and unwraps the `Result`', async () => {

        const lender = new Lender(ADDRESSES.LENDER, provider);

        const expected = '0xswivelAddr';

        mockMethod<string>(lender, 'swivelAddr').resolves([expected]);

        const result = await lender.swivelAddr();

        assert.strictEqual(result, expected);
    });

    test('pendleAddr exists and unwraps the `Result`', async () => {

        const lender = new Lender(ADDRESSES.LENDER, provider);

        const expected = '0xpendleAddr';

        mockMethod<string>(lender, 'pendleAddr').resolves([expected]);

        const result = await lender.pendleAddr();

        assert.strictEqual(result, expected);
    });

    test('tempusAddr exists and unwraps the `Result`', async () => {

        const lender = new Lender(ADDRESSES.LENDER, provider);

        const expected = '0xtempusAddr';

        mockMethod<string>(lender, 'tempusAddr').resolves([expected]);

        const result = await lender.tempusAddr();

        assert.strictEqual(result, expected);
    });

    test('feenominator exists and unwraps and converts the `Result`', async () => {

        const lender = new Lender(ADDRESSES.LENDER, provider);

        const expected = '1000';

        // feenominator returns a uint256, so ethers will return a BigNumber
        // we create a mock Result with a BigNumber and assert the HOC converts it to string
        mockMethod<BigNumber>(lender, 'feenominator').resolves([BigNumber.from(expected)]);

        const result = await lender.feenominator();

        assert.strictEqual(result, expected);
    });

    test('fees exists and unwraps and converts the `Result`', async () => {

        const lender = new Lender(ADDRESSES.LENDER, provider);

        const underlying = '0xunderlying';
        const expected = '0';

        // fees returns a uint256, so ethers will return a BigNumber
        // we create a mock Result with a BigNumber and assert the HOC converts it to string
        mockMethod<BigNumber>(lender, 'fees').resolves([BigNumber.from(expected)]);

        const result = await lender.fees(underlying);

        assert.strictEqual(result, expected);
    });

    suite('lend', () => {

        let principal: Principals;

        const underlying = '0xunderlying';
        const maturity = '1654638431';
        const amount = utils.parseEther('100').toString();
        const minReturn = utils.parseEther('95').toString();
        const deadline = '1654642073';
        const pool = '0xpool';

        test('illuminate', async () => {

            const lender = new Lender(ADDRESSES.LENDER, signer);

            principal = Principals.Illuminate;

            const lend = mockMethod<TransactionResponse>(lender, Lender.lendSignatures[principal]);
            const response = mockResponse();
            lend.resolves(response);

            const result = await lender.lend(principal, underlying, maturity, amount, pool);

            assert.strictEqual(result.hash, '0xresponse');

            // get the call arguments
            const args = lend.getCall(0).args;

            // assert the correct amount of call arguments
            assert.strictEqual(args.length, 5);

            const [passedPrincipal, passedUnderlying, passedMaturity, passedAmount, passedPool] = args;

            // assert the arguments are being converted correctly
            assert.strictEqual(passedPrincipal, principal);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
            assert.strictEqual(passedPool, pool);
        });

        test('yield', async () => {

            const lender = new Lender(ADDRESSES.LENDER, signer);

            principal = Principals.Yield;

            const lend = mockMethod<TransactionResponse>(lender, Lender.lendSignatures[principal]);
            const response = mockResponse();
            lend.resolves(response);

            const result = await lender.lend(principal, underlying, maturity, amount, pool);

            assert.strictEqual(result.hash, '0xresponse');

            // get the call arguments
            const args = lend.getCall(0).args;

            // assert the correct amount of call arguments
            assert.strictEqual(args.length, 5);

            const [passedPrincipal, passedUnderlying, passedMaturity, passedAmount, passedPool] = args;

            // assert the arguments are being converted correctly
            assert.strictEqual(passedPrincipal, principal);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
            assert.strictEqual(passedPool, pool);
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

            const result = await lender.lend(principal, underlying, maturity, amounts, pool, orders, signatures);

            assert.strictEqual(result.hash, '0xresponse');

            // get the call arguments
            const args = lend.getCall(0).args;

            // assert the correct amount of call arguments
            assert.strictEqual(args.length, 7);

            const [passedPrincipal, passedUnderlying, passedMaturity, passedAmounts, passedPool, passedOrders, passedSignatures] = args;

            // assert the arguments are being converted correctly
            assert.strictEqual(passedPrincipal, principal);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedAmounts, amounts.map(amount => BigNumber.from(amount)));
            assert.strictEqual(passedPool, pool);
            assert.deepStrictEqual(passedOrders, orders.map(order => parseOrder(order)));
            assert.deepStrictEqual(passedSignatures, signatures.map(signature => utils.splitSignature(signature)));
        });

        test('element', async () => {

            const lender = new Lender(ADDRESSES.LENDER, signer);

            principal = Principals.Element;

            const poolId = '0xpoolId';

            const lend = mockMethod<TransactionResponse>(lender, Lender.lendSignatures[principal]);
            const response = mockResponse();
            lend.resolves(response);

            const result = await lender.lend(principal, underlying, maturity, amount, minReturn, deadline, pool, poolId);

            assert.strictEqual(result.hash, '0xresponse');

            // get the call arguments
            const args = lend.getCall(0).args;

            // assert the correct amount of call arguments
            assert.strictEqual(args.length, 8);

            const [passedPrincipal, passedUnderlying, passedMaturity, passedAmount, passedMinReturn, passedDeadline, passedPool, passedPoolId] = args;

            // assert the arguments are being converted correctly
            assert.strictEqual(passedPrincipal, principal);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
            assert.deepStrictEqual(passedMinReturn, BigNumber.from(minReturn));
            assert.deepStrictEqual(passedDeadline, BigNumber.from(deadline));
            assert.strictEqual(passedPool, pool);
            assert.strictEqual(passedPoolId, poolId);
        });

        test('pendle', async () => {

            const lender = new Lender(ADDRESSES.LENDER, signer);

            principal = Principals.Pendle;

            const lend = mockMethod<TransactionResponse>(lender, Lender.lendSignatures[principal]);
            const response = mockResponse();
            lend.resolves(response);

            const result = await lender.lend(principal, underlying, maturity, amount, minReturn, deadline);

            assert.strictEqual(result.hash, '0xresponse');

            // get the call arguments
            const args = lend.getCall(0).args;

            // assert the correct amount of call arguments
            assert.strictEqual(args.length, 6);

            const [passedPrincipal, passedUnderlying, passedMaturity, passedAmount, passedMinReturn, passedDeadline] = args;

            // assert the arguments are being converted correctly
            assert.strictEqual(passedPrincipal, principal);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
            assert.deepStrictEqual(passedMinReturn, BigNumber.from(minReturn));
            assert.deepStrictEqual(passedDeadline, BigNumber.from(deadline));
        });

        test('tempus', async () => {

            const lender = new Lender(ADDRESSES.LENDER, signer);

            principal = Principals.Tempus;

            const amm = '0xamm';

            const lend = mockMethod<TransactionResponse>(lender, Lender.lendSignatures[principal]);
            const response = mockResponse();
            lend.resolves(response);

            const result = await lender.lend(principal, underlying, maturity, amount, minReturn, deadline, pool, amm);

            assert.strictEqual(result.hash, '0xresponse');

            // get the call arguments
            const args = lend.getCall(0).args;

            // assert the correct amount of call arguments
            assert.strictEqual(args.length, 8);

            const [passedPrincipal, passedUnderlying, passedMaturity, passedAmount, passedMinReturn, passedDeadline, passedPool, passedAmm] = args;

            // assert the arguments are being converted correctly
            assert.strictEqual(passedPrincipal, principal);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
            assert.deepStrictEqual(passedMinReturn, BigNumber.from(minReturn));
            assert.deepStrictEqual(passedDeadline, BigNumber.from(deadline));
            assert.strictEqual(passedPool, pool);
            assert.strictEqual(passedAmm, amm);
        });

        test('sense', async () => {

            const lender = new Lender(ADDRESSES.LENDER, signer);

            principal = Principals.Sense;

            const amm = '0xamm';
            const token = '0xtoken';

            const lend = mockMethod<TransactionResponse>(lender, Lender.lendSignatures[principal]);
            const response = mockResponse();
            lend.resolves(response);

            const result = await lender.lend(principal, underlying, maturity, amount, minReturn, amm, token);

            assert.strictEqual(result.hash, '0xresponse');

            // get the call arguments
            const args = lend.getCall(0).args;

            // assert the correct amount of call arguments
            assert.strictEqual(args.length, 7);

            const [passedPrincipal, passedUnderlying, passedMaturity, passedAmount, passedMinReturn, passedAmm, passedToken] = args;

            // assert the arguments are being converted correctly
            assert.strictEqual(passedPrincipal, principal);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
            assert.deepStrictEqual(passedMinReturn, BigNumber.from(minReturn));
            assert.strictEqual(passedAmm, amm);
            assert.strictEqual(passedToken, token);
        });

        test('apwine', async () => {

            const lender = new Lender(ADDRESSES.LENDER, signer);

            principal = Principals.Apwine;

            const poolId = '12345678';

            const lend = mockMethod<TransactionResponse>(lender, Lender.lendSignatures[principal]);
            const response = mockResponse();
            lend.resolves(response);

            const result = await lender.lend(principal, underlying, maturity, amount, minReturn, pool, poolId);

            assert.strictEqual(result.hash, '0xresponse');

            // get the call arguments
            const args = lend.getCall(0).args;

            // assert the correct amount of call arguments
            assert.strictEqual(args.length, 7);

            const [passedPrincipal, passedUnderlying, passedMaturity, passedAmount, passedMinReturn, passedPool, passedPoolId] = args;

            // assert the arguments are being converted correctly
            assert.strictEqual(passedPrincipal, principal);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
            assert.deepStrictEqual(passedMinReturn, BigNumber.from(minReturn));
            assert.strictEqual(passedPool, pool);
            assert.deepStrictEqual(passedPoolId, BigNumber.from(poolId));
        });

        test('notional', async () => {

            const lender = new Lender(ADDRESSES.LENDER, signer);

            principal = Principals.Notional;

            const lend = mockMethod<TransactionResponse>(lender, Lender.lendSignatures[principal]);
            const response = mockResponse();
            lend.resolves(response);

            const result = await lender.lend(principal, underlying, maturity, amount);

            assert.strictEqual(result.hash, '0xresponse');

            // get the call arguments
            const args = lend.getCall(0).args;

            // assert the correct amount of call arguments
            assert.strictEqual(args.length, 4);

            const [passedPrincipal, passedUnderlying, passedMaturity, passedAmount] = args;

            // assert the arguments are being converted correctly
            assert.strictEqual(passedPrincipal, principal);
            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
        });
    });
});
