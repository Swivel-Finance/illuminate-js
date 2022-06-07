import assert from 'assert';
import { Provider } from '@ethersproject/abstract-provider';
import { Signer } from '@ethersproject/abstract-signer';
import { BigNumber, getDefaultProvider, providers, Wallet } from 'ethers';
import { suite, suiteSetup, test } from 'mocha';
import { Lender } from '../src/index.js';
import { ADDRESSES, mock } from './helpers/index.js';

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
        mock<string>(lender, 'admin').resolves([expected]);

        const result = await lender.admin();

        assert.strictEqual(result, expected);
    });

    test('marketPlace exists and unwraps the `Result`', async () => {

        const lender = new Lender(ADDRESSES.LENDER, provider);

        const expected = '0xmarketPlace';

        mock<string>(lender, 'marketPlace').resolves([expected]);

        const result = await lender.marketPlace();

        assert.strictEqual(result, expected);
    });

    test('swivelAddr exists and unwraps the `Result`', async () => {

        const lender = new Lender(ADDRESSES.LENDER, provider);

        const expected = '0xswivelAddr';

        mock<string>(lender, 'swivelAddr').resolves([expected]);

        const result = await lender.swivelAddr();

        assert.strictEqual(result, expected);
    });

    test('pendleAddr exists and unwraps the `Result`', async () => {

        const lender = new Lender(ADDRESSES.LENDER, provider);

        const expected = '0xpendleAddr';

        mock<string>(lender, 'pendleAddr').resolves([expected]);

        const result = await lender.pendleAddr();

        assert.strictEqual(result, expected);
    });

    test('tempusAddr exists and unwraps the `Result`', async () => {

        const lender = new Lender(ADDRESSES.LENDER, provider);

        const expected = '0xtempusAddr';

        mock<string>(lender, 'tempusAddr').resolves([expected]);

        const result = await lender.tempusAddr();

        assert.strictEqual(result, expected);
    });

    test('feenominator exists and unwraps and converts the `Result`', async () => {

        const lender = new Lender(ADDRESSES.LENDER, provider);

        const expected = '1000';

        // feenominator returns a uint256, so ethers will return a BigNumber
        // we create a mock Result with a BigNumber and assert the HOC converts it to string
        mock<BigNumber>(lender, 'feenominator').resolves([BigNumber.from(expected)]);

        const result = await lender.feenominator();

        assert.strictEqual(result, expected);
    });

    test('fees exists and unwraps and converts the `Result`', async () => {

        const lender = new Lender(ADDRESSES.LENDER, provider);

        const underlying = '0xunderlying';
        const expected = '0';

        // fees returns a uint256, so ethers will return a BigNumber
        // we create a mock Result with a BigNumber and assert the HOC converts it to string
        mock<BigNumber>(lender, 'fees').resolves([BigNumber.from(expected)]);

        const result = await lender.fees(underlying);

        assert.strictEqual(result, expected);
    });
});
