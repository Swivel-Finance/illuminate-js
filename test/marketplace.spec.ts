import assert from 'assert';
import { Provider } from '@ethersproject/abstract-provider';
import { BigNumber, CallOverrides, getDefaultProvider, providers } from 'ethers';
import { suite, suiteSetup, test } from 'mocha';
import { MarketPlace, Principals } from '../src/index.js';
import { ADDRESSES, mockMethod } from './helpers/index.js';

suite('marketplace', () => {

    let provider: Provider;

    suiteSetup(() => {

        provider = getDefaultProvider();
    });

    // TODO: on-chain test calls are only temporary for debugging, will be removed soon...
    test.skip('on-chain test calls', async () => {

        const provider = new providers.JsonRpcProvider('https://rinkeby.infura.io/v3/2935bd3e4bef4fa1a392304441c1bb3e', 4);
        const marketplace = new MarketPlace(ADDRESSES.MARKETPLACE, provider);

        const admin = await marketplace.admin();

        console.log('admin: ', admin);

        const redeemer = await marketplace.redeemer();

        console.log('redeemer: ', redeemer);

        try {

            const markets = await marketplace.markets('0xeb8f08a975ab53e34d8a0330e0d34de942c95926', '1654288343', Principals.Swivel);

            console.log('markets: ', markets);

        } catch (error) {

            console.log('markets: ', error);
        }
    });

    test('create instance', () => {

        const marketplace = new MarketPlace(ADDRESSES.MARKETPLACE, provider);

        assert(marketplace instanceof MarketPlace);

        assert.strictEqual(marketplace.address, ADDRESSES.MARKETPLACE);
    });

    suite('admin', () => {

        const expected = '0xadmin';

        const overrides: CallOverrides = {
            gasLimit: '1000',
            from: '0xfrom',
            nonce: 1,
        };

        test('unwraps result', async () => {

            const marketplace = new MarketPlace(ADDRESSES.MARKETPLACE, provider);

            // mock the MarketPlace contract's `admin` method and tell it to resolve with a typed `Result`
            // mock will throw if 'admin' doesn't exist on the contract, so tests will fail if it's removed from the abi
            const admin = mockMethod<string>(marketplace, 'admin');
            admin.resolves([expected]);

            const result = await marketplace.admin();

            assert.strictEqual(result, expected);

            const args = admin.getCall(0).args;

            assert.strictEqual(args.length, 1);

            const [passedOverrides] = args;

            assert.deepStrictEqual(passedOverrides, {});
        });

        test('accepts transaction overrides', async () => {

            const marketplace = new MarketPlace(ADDRESSES.MARKETPLACE, provider);

            // mock the MarketPlace contract's `admin` method and tell it to resolve with a typed `Result`
            // mock will throw if 'admin' doesn't exist on the contract, so tests will fail if it's removed from the abi
            const admin = mockMethod<string>(marketplace, 'admin');
            admin.resolves([expected]);

            const result = await marketplace.admin(overrides);

            assert.strictEqual(result, expected);

            const args = admin.getCall(0).args;

            assert.strictEqual(args.length, 1);

            const [passedOverrides] = args;

            assert.deepStrictEqual(passedOverrides, overrides);
        });
    });

    suite('redeemer', () => {

        const expected = '0xredeemer';

        const overrides: CallOverrides = {
            gasLimit: '1000',
            from: '0xfrom',
            nonce: 1,
        };

        test('unwraps result', async () => {

            const marketplace = new MarketPlace(ADDRESSES.MARKETPLACE, provider);

            const redeemer = mockMethod<string>(marketplace, 'redeemer');
            redeemer.resolves([expected]);

            const result = await marketplace.redeemer();

            assert.strictEqual(result, expected);

            const args = redeemer.getCall(0).args;

            assert.strictEqual(args.length, 1);

            const [passedOverrides] = args;

            assert.deepStrictEqual(passedOverrides, {});
        });

        test('accepts transaction overrides', async () => {

            const marketplace = new MarketPlace(ADDRESSES.MARKETPLACE, provider);

            const redeemer = mockMethod<string>(marketplace, 'redeemer');
            redeemer.resolves([expected]);

            const result = await marketplace.redeemer(overrides);

            assert.strictEqual(result, expected);

            const args = redeemer.getCall(0).args;

            assert.strictEqual(args.length, 1);

            const [passedOverrides] = args;

            assert.deepStrictEqual(passedOverrides, overrides);
        });
    });

    suite('markets', () => {

        const underlying = '0xunderlying';
        const maturity = '12345678';
        const principal = Principals.Swivel;

        const overrides: CallOverrides = {
            gasLimit: '1000',
            from: '0xfrom',
            nonce: 1,
        };

        const expected = '0xswivel';

        test('converts arguments and unwraps result', async () => {

            const marketplace = new MarketPlace(ADDRESSES.MARKETPLACE, provider);

            const markets = mockMethod<string>(marketplace, 'markets');
            markets.resolves([expected]);

            const result = await marketplace.markets(underlying, maturity, principal);

            assert.deepStrictEqual(result, expected);

            const args = markets.getCall(0).args;

            assert.strictEqual(args.length, 4);

            const [passedUnderlying, passsedMaturity, passedPrincipal, passedOverrides] = args;

            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passsedMaturity, BigNumber.from(maturity));
            assert.strictEqual(passedPrincipal, principal);
            assert.deepStrictEqual(passedOverrides, {});
        });

        test('accepts transaction overrides', async () => {

            const marketplace = new MarketPlace(ADDRESSES.MARKETPLACE, provider);

            const markets = mockMethod<string>(marketplace, 'markets');
            markets.resolves([expected]);

            const result = await marketplace.markets(underlying, maturity, principal, overrides);

            assert.deepStrictEqual(result, expected);

            const args = markets.getCall(0).args;

            assert.strictEqual(args.length, 4);

            const [passedUnderlying, passsedMaturity, passedPrincipal, passedOverrides] = args;

            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passsedMaturity, BigNumber.from(maturity));
            assert.strictEqual(passedPrincipal, principal);
            assert.deepStrictEqual(passedOverrides, overrides);
        });
    });
});
