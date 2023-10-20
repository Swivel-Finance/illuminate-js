import assert from 'assert';
import { Provider } from '@ethersproject/abstract-provider';
import { BigNumber, CallOverrides, PayableOverrides, getDefaultProvider, utils } from 'ethers';
import { suite, suiteSetup, test } from 'mocha';
import { Market, MarketPlace, Principals } from '../src/index.js';
import { ADDRESSES, assertGetter, assertMethod, assertTransaction, mockExecutor } from './helpers/index.js';

suite('marketplace', () => {

    const overrides: CallOverrides = {
        gasLimit: '1000',
        from: '0xfrom',
        nonce: 1,
    };

    let provider: Provider;

    suiteSetup(() => {

        provider = getDefaultProvider();
    });

    test('create instance', () => {

        const marketplace = new MarketPlace(ADDRESSES.MARKETPLACE, provider);

        assert(marketplace instanceof MarketPlace);

        assert.strictEqual(marketplace.address, ADDRESSES.MARKETPLACE);
    });

    suite('admin', () => {

        test('unwraps result and accepts transaction overrides', async () => {

            await assertGetter(
                new MarketPlace(ADDRESSES.MARKETPLACE, provider),
                'admin',
                ['0xadmin'],
                '0xadmin',
                overrides,
            );
        });
    });

    suite('creator', () => {

        test('unwraps result and accepts transaction overrides', async () => {

            await assertGetter(
                new MarketPlace(ADDRESSES.MARKETPLACE, provider),
                'creator',
                ['0xcreator'],
                '0xcreator',
                overrides,
            );
        });
    });

    suite('lender', () => {

        test('unwraps result and accepts transaction overrides', async () => {

            await assertGetter(
                new MarketPlace(ADDRESSES.MARKETPLACE, provider),
                'lender',
                ['0xlender'],
                '0xlender',
                overrides,
            );
        });
    });

    suite('marketplace', () => {

        test('unwraps result and accepts transaction overrides', async () => {

            await assertGetter(
                new MarketPlace(ADDRESSES.MARKETPLACE, provider),
                'marketplace',
                ['0xmarketplace'],
                '0xmarketplace',
                overrides,
            );
        });
    });

    suite('redeemer', () => {

        test('unwraps result and accepts transaction overrides', async () => {

            await assertGetter(
                new MarketPlace(ADDRESSES.MARKETPLACE, provider),
                'redeemer',
                ['0xredeemer'],
                '0xredeemer',
                overrides,
            );
        });
    });

    suite('adapters', () => {

        const adapters = [
            '0xilluminateAdapter',
            '0xswivelAdapter',
            '0xyieldAdapter',
            '0xelementAdapter',
            '0xpendleAdapter',
            '0xtempusAdapter',
            '0xsenseAdapter',
            '0xapwineAdapter',
            '0xnotionalAdapter',
        ];

        const principal = Principals.Notional;

        test('unwraps result and accepts transaction overrides', async () => {

            await assertMethod(
                new MarketPlace(ADDRESSES.MARKETPLACE, provider),
                'adapters',
                [principal],
                [principal],
                [adapters[principal]],
                adapters[principal],
                overrides,
            );
        });
    });

    suite('markets', () => {

        const underlying = '0xunderlying';
        const maturity = '12345678';

        const market: Market = {
            tokens: [
                '0xilluminate',
                '0xswivel',
                '0xyield',
                '0xelement',
                '0xpendle',
                '0xtempus',
                '0xsense',
                '0xapwine',
                '0xnotional',
            ],
            pool: '0xpool',
        };

        test('converts arguments and result and accepts transaction overrides', async () => {

            await assertMethod(
                new MarketPlace(ADDRESSES.MARKETPLACE, provider),
                'markets',
                [underlying, BigNumber.from(maturity)],
                [underlying, maturity],
                market,
                market,
                overrides,
            );
        });
    });

    suite('sellPrincipalToken', () => {

        const underlying = '0xunderlying';
        const maturity = '12345678';
        const amount = utils.parseEther('100').toString();
        const slippage = utils.parseEther('95').toString();

        const overrides: PayableOverrides = {
            gasLimit: '10000',
            nonce: 3,
        };

        test('converts arguments and accepts transaction overrides', async () => {

            await assertTransaction(
                new MarketPlace(ADDRESSES.MARKETPLACE, provider, mockExecutor()),
                'sellPrincipalToken',
                [underlying, BigNumber.from(maturity), BigNumber.from(amount), BigNumber.from(slippage)],
                [underlying, maturity, amount, slippage],
                overrides,
            );
        });
    });

    suite('buyPrincipalToken', () => {

        const underlying = '0xunderlying';
        const maturity = '12345678';
        const amount = utils.parseEther('100').toString();
        const slippage = utils.parseEther('95').toString();

        const overrides: PayableOverrides = {
            gasLimit: '10000',
            nonce: 3,
        };

        test('converts arguments and accepts transaction overrides', async () => {

            await assertTransaction(
                new MarketPlace(ADDRESSES.MARKETPLACE, provider, mockExecutor()),
                'buyPrincipalToken',
                [underlying, BigNumber.from(maturity), BigNumber.from(amount), BigNumber.from(slippage)],
                [underlying, maturity, amount, slippage],
                overrides,
            );
        });
    });

    suite('sellUnderlying', () => {

        const underlying = '0xunderlying';
        const maturity = '12345678';
        const amount = utils.parseEther('100').toString();
        const slippage = utils.parseEther('95').toString();

        const overrides: PayableOverrides = {
            gasLimit: '10000',
            nonce: 3,
        };

        test('converts arguments and accepts transaction overrides', async () => {

            await assertTransaction(
                new MarketPlace(ADDRESSES.MARKETPLACE, provider, mockExecutor()),
                'sellUnderlying',
                [underlying, BigNumber.from(maturity), BigNumber.from(amount), BigNumber.from(slippage)],
                [underlying, maturity, amount, slippage],
                overrides,
            );
        });
    });

    suite('buyUnderlying', () => {

        const underlying = '0xunderlying';
        const maturity = '12345678';
        const amount = utils.parseEther('100').toString();
        const slippage = utils.parseEther('95').toString();

        const overrides: PayableOverrides = {
            gasLimit: '10000',
            nonce: 3,
        };

        test('converts arguments and accepts transaction overrides', async () => {

            await assertTransaction(
                new MarketPlace(ADDRESSES.MARKETPLACE, provider, mockExecutor()),
                'buyUnderlying',
                [underlying, BigNumber.from(maturity), BigNumber.from(amount), BigNumber.from(slippage)],
                [underlying, maturity, amount, slippage],
                overrides,
            );
        });
    });

    suite('mint', () => {

        const underlying = '0xunderlying';
        const maturity = '12345678';
        const baseAmount = utils.parseEther('100').toString();
        const principalAmount = utils.parseEther('100').toString();
        const minRatio = utils.parseEther('0.95').toString();
        const maxRatio = utils.parseEther('1.05').toString();

        const overrides: PayableOverrides = {
            gasLimit: '10000',
            nonce: 3,
        };

        test('converts arguments and accepts transaction overrides', async () => {

            await assertTransaction(
                new MarketPlace(ADDRESSES.MARKETPLACE, provider, mockExecutor()),
                'mint',
                [underlying, BigNumber.from(maturity), BigNumber.from(baseAmount), BigNumber.from(principalAmount), BigNumber.from(minRatio), BigNumber.from(maxRatio)],
                [underlying, maturity, baseAmount, principalAmount, minRatio, maxRatio],
                overrides,
            );
        });
    });

    suite('mintWithUnderlying', () => {

        const underlying = '0xunderlying';
        const maturity = '12345678';
        const baseAmount = utils.parseEther('100').toString();
        const principalAmount = utils.parseEther('100').toString();
        const minRatio = utils.parseEther('0.95').toString();
        const maxRatio = utils.parseEther('1.05').toString();

        const overrides: PayableOverrides = {
            gasLimit: '10000',
            nonce: 3,
        };

        test('converts arguments and accepts transaction overrides', async () => {

            await assertTransaction(
                new MarketPlace(ADDRESSES.MARKETPLACE, provider, mockExecutor()),
                'mintWithUnderlying',
                [underlying, BigNumber.from(maturity), BigNumber.from(baseAmount), BigNumber.from(principalAmount), BigNumber.from(minRatio), BigNumber.from(maxRatio)],
                [underlying, maturity, baseAmount, principalAmount, minRatio, maxRatio],
                overrides,
            );
        });
    });

    suite('burn', () => {

        const underlying = '0xunderlying';
        const maturity = '12345678';
        const burnAmount = '123';
        const minRatio = utils.parseEther('0.95').toString();
        const maxRatio = utils.parseEther('1.05').toString();

        const overrides: PayableOverrides = {
            gasLimit: '10000',
            nonce: 3,
        };

        test('converts arguments and accepts transaction overrides', async () => {

            await assertTransaction(
                new MarketPlace(ADDRESSES.MARKETPLACE, provider, mockExecutor()),
                'burn',
                [underlying, BigNumber.from(maturity), BigNumber.from(burnAmount), BigNumber.from(minRatio), BigNumber.from(maxRatio)],
                [underlying, maturity, burnAmount, minRatio, maxRatio],
                overrides,
            );
        });
    });

    suite('burnForUnderlying', () => {

        const underlying = '0xunderlying';
        const maturity = '12345678';
        const minRatio = utils.parseEther('0.95').toString();
        const maxRatio = utils.parseEther('1.05').toString();
        const burnAmount = '123';

        const overrides: PayableOverrides = {
            gasLimit: '10000',
            nonce: 3,
        };

        test('converts arguments and accepts transaction overrides', async () => {

            await assertTransaction(
                new MarketPlace(ADDRESSES.MARKETPLACE, provider, mockExecutor()),
                'burnForUnderlying',
                [underlying, BigNumber.from(maturity), BigNumber.from(burnAmount), BigNumber.from(minRatio), BigNumber.from(maxRatio)],
                [underlying, maturity, burnAmount, minRatio, maxRatio],
                overrides,
            );
        });
    });
});
