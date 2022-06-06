import assert from 'assert';
import { Provider } from '@ethersproject/abstract-provider';
import { Signer } from '@ethersproject/abstract-signer';
import { getDefaultProvider, providers, Wallet } from 'ethers';
import { suite, suiteSetup, test } from 'mocha';
import { MarketPlace } from '../src/index.js';
import { ADDRESSES, mock } from './helpers/index.js';

suite('marketplace', () => {

    let provider: Provider;
    let signer: Signer;

    suiteSetup(() => {

        provider = getDefaultProvider();
        signer = Wallet.createRandom().connect(provider);
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

            const markets = await marketplace.markets('0xeb8f08a975ab53e34d8a0330e0d34de942c95926', '1654288343');

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

    test('admin exists and unwraps the `Result`', async () => {

        const marketplace = new MarketPlace(ADDRESSES.MARKETPLACE, provider);

        const expected = '0xadmin';

        // mock the MarketPlace contract's `admin` method and tell it to resolve with a typed `Result`
        // mock will throw if 'admin' doesn't exist on the contract, so tests will fail if it's removed from the abi
        mock<string>(marketplace, 'admin').resolves([expected]);

        const result = await marketplace.admin();

        assert.strictEqual(result, expected);
    });

    test('redeemer exists and unwraps the `Result`', async () => {

        const marketplace = new MarketPlace(ADDRESSES.MARKETPLACE, provider);

        const expected = '0xredeemer';

        mock<string>(marketplace, 'redeemer').resolves([expected]);

        const result = await marketplace.redeemer();

        assert.strictEqual(result, expected);
    });
});
