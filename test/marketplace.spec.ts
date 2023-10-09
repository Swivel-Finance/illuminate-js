import assert from 'assert';
import { Provider, TransactionResponse } from '@ethersproject/abstract-provider';
import { BigNumber, CallOverrides, PayableOverrides, getDefaultProvider, utils } from 'ethers';
import { suite, suiteSetup, test } from 'mocha';
import { Market, MarketPlace, MarketResponse } from '../src/index.js';
import { ADDRESSES, assertGetter, mockExecutor, mockMethod, mockResponse } from './helpers/index.js';

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
                '0xadmin',
                overrides,
            );
        });
    });

    suite('lender', () => {

        test('unwraps result and accepts transaction overrides', async () => {

            await assertGetter(
                new MarketPlace(ADDRESSES.MARKETPLACE, provider),
                'lender',
                '0xlender',
                overrides,
            );
        });
    });

    suite('redeemer', () => {

        test('unwraps result and accepts transaction overrides', async () => {

            await assertGetter(
                new MarketPlace(ADDRESSES.MARKETPLACE, provider),
                'redeemer',
                '0xredeemer',
                overrides,
            );
        });
    });

    suite('creator', () => {

        test('unwraps result and accepts transaction overrides', async () => {

            await assertGetter(
                new MarketPlace(ADDRESSES.MARKETPLACE, provider),
                'creator',
                '0xcreator',
                overrides,
            );
        });
    });

    suite('markets', () => {

        const underlying = '0xunderlying';
        const maturity = '12345678';

        const market: Market = {
            adapters: [
                '0xilluminateAdapter',
                '0xswivelAdapter',
                '0xyieldAdapter',
                '0xelementAdapter',
                '0xpendleAdapter',
                '0xtempusAdapter',
                '0xsenseAdapter',
                '0xapwineAdapter',
                '0xnotionalAdapter',
            ],
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

        test('converts arguments and parses result', async () => {

            const marketplace = new MarketPlace(ADDRESSES.MARKETPLACE, provider);

            const markets = mockMethod<MarketResponse>(marketplace, 'markets');
            markets.resolves(market as MarketResponse);

            const result = await marketplace.markets(underlying, maturity);

            assert.notStrictEqual(result, market);
            assert.deepStrictEqual(result, market);

            const args = markets.getCall(0).args;

            assert.strictEqual(args.length, 3);

            const [passedUnderlying, passedMaturity, passedOverrides] = args;

            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedOverrides, {});
        });

        test('accepts transaction overrides', async () => {

            const marketplace = new MarketPlace(ADDRESSES.MARKETPLACE, provider);

            const markets = mockMethod<MarketResponse>(marketplace, 'markets');
            markets.resolves(market as MarketResponse);

            const result = await marketplace.markets(underlying, maturity, overrides);

            assert.notStrictEqual(result, market);
            assert.deepStrictEqual(result, market);

            const args = markets.getCall(0).args;

            assert.strictEqual(args.length, 3);

            const [passedUnderlying, passedMaturity, passedOverrides] = args;

            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedOverrides, overrides);
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

        test('converts arguments and unwraps result', async () => {

            const marketplace = new MarketPlace(ADDRESSES.MARKETPLACE, provider, mockExecutor());

            const sellPrincipalToken = mockMethod<TransactionResponse>(marketplace, 'sellPrincipalToken');
            const response = mockResponse();
            sellPrincipalToken.resolves(response);

            const result = await marketplace.sellPrincipalToken(underlying, maturity, amount, slippage);

            assert.deepStrictEqual(result.hash, response.hash);

            const args = sellPrincipalToken.getCall(0).args;

            assert.strictEqual(args.length, 5);

            const [passedUnderlying, passedMaturity, passedAmount, passedSlippage, passedOverrides] = args;

            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
            assert.deepStrictEqual(passedSlippage, BigNumber.from(slippage));
            assert.deepStrictEqual(passedOverrides, {});
        });

        test('accepts transaction overrides', async () => {

            const marketplace = new MarketPlace(ADDRESSES.MARKETPLACE, provider, mockExecutor());

            const sellPrincipalToken = mockMethod<TransactionResponse>(marketplace, 'sellPrincipalToken');
            const response = mockResponse();
            sellPrincipalToken.resolves(response);

            const result = await marketplace.sellPrincipalToken(underlying, maturity, amount, slippage, overrides);

            assert.deepStrictEqual(result.hash, response.hash);

            const args = sellPrincipalToken.getCall(0).args;

            assert.strictEqual(args.length, 5);

            const [passedUnderlying, passedMaturity, passedAmount, passedSlippage, passedOverrides] = args;

            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
            assert.deepStrictEqual(passedSlippage, BigNumber.from(slippage));
            assert.deepStrictEqual(passedOverrides, overrides);
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

        test('converts arguments and unwraps result', async () => {

            const marketplace = new MarketPlace(ADDRESSES.MARKETPLACE, provider, mockExecutor());

            const buyPrincipalToken = mockMethod<TransactionResponse>(marketplace, 'buyPrincipalToken');
            const response = mockResponse();
            buyPrincipalToken.resolves(response);

            const result = await marketplace.buyPrincipalToken(underlying, maturity, amount, slippage);

            assert.deepStrictEqual(result.hash, response.hash);

            const args = buyPrincipalToken.getCall(0).args;

            assert.strictEqual(args.length, 5);

            const [passedUnderlying, passedMaturity, passedAmount, passedSlippage, passedOverrides] = args;

            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
            assert.deepStrictEqual(passedSlippage, BigNumber.from(slippage));
            assert.deepStrictEqual(passedOverrides, {});
        });

        test('accepts transaction overrides', async () => {

            const marketplace = new MarketPlace(ADDRESSES.MARKETPLACE, provider, mockExecutor());

            const buyPrincipalToken = mockMethod<TransactionResponse>(marketplace, 'buyPrincipalToken');
            const response = mockResponse();
            buyPrincipalToken.resolves(response);

            const result = await marketplace.buyPrincipalToken(underlying, maturity, amount, slippage, overrides);

            assert.deepStrictEqual(result.hash, response.hash);

            const args = buyPrincipalToken.getCall(0).args;

            assert.strictEqual(args.length, 5);

            const [passedUnderlying, passedMaturity, passedAmount, passedSlippage, passedOverrides] = args;

            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
            assert.deepStrictEqual(passedSlippage, BigNumber.from(slippage));
            assert.deepStrictEqual(passedOverrides, overrides);
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

        test('converts arguments and unwraps result', async () => {

            const marketplace = new MarketPlace(ADDRESSES.MARKETPLACE, provider, mockExecutor());

            const sellUnderlying = mockMethod<TransactionResponse>(marketplace, 'sellUnderlying');
            const response = mockResponse();
            sellUnderlying.resolves(response);

            const result = await marketplace.sellUnderlying(underlying, maturity, amount, slippage);

            assert.deepStrictEqual(result.hash, response.hash);

            const args = sellUnderlying.getCall(0).args;

            assert.strictEqual(args.length, 5);

            const [passedUnderlying, passedMaturity, passedAmount, passedSlippage, passedOverrides] = args;

            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
            assert.deepStrictEqual(passedSlippage, BigNumber.from(slippage));
            assert.deepStrictEqual(passedOverrides, {});
        });

        test('accepts transaction overrides', async () => {

            const marketplace = new MarketPlace(ADDRESSES.MARKETPLACE, provider, mockExecutor());

            const sellUnderlying = mockMethod<TransactionResponse>(marketplace, 'sellUnderlying');
            const response = mockResponse();
            sellUnderlying.resolves(response);

            const result = await marketplace.sellUnderlying(underlying, maturity, amount, slippage, overrides);

            assert.deepStrictEqual(result.hash, response.hash);

            const args = sellUnderlying.getCall(0).args;

            assert.strictEqual(args.length, 5);

            const [passedUnderlying, passedMaturity, passedAmount, passedSlippage, passedOverrides] = args;

            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
            assert.deepStrictEqual(passedSlippage, BigNumber.from(slippage));
            assert.deepStrictEqual(passedOverrides, overrides);
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

        test('converts arguments and unwraps result', async () => {

            const marketplace = new MarketPlace(ADDRESSES.MARKETPLACE, provider, mockExecutor());

            const buyUnderlying = mockMethod<TransactionResponse>(marketplace, 'buyUnderlying');
            const response = mockResponse();
            buyUnderlying.resolves(response);

            const result = await marketplace.buyUnderlying(underlying, maturity, amount, slippage);

            assert.deepStrictEqual(result.hash, response.hash);

            const args = buyUnderlying.getCall(0).args;

            assert.strictEqual(args.length, 5);

            const [passedUnderlying, passedMaturity, passedAmount, passedSlippage, passedOverrides] = args;

            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
            assert.deepStrictEqual(passedSlippage, BigNumber.from(slippage));
            assert.deepStrictEqual(passedOverrides, {});
        });

        test('accepts transaction overrides', async () => {

            const marketplace = new MarketPlace(ADDRESSES.MARKETPLACE, provider, mockExecutor());

            const buyUnderlying = mockMethod<TransactionResponse>(marketplace, 'buyUnderlying');
            const response = mockResponse();
            buyUnderlying.resolves(response);

            const result = await marketplace.buyUnderlying(underlying, maturity, amount, slippage, overrides);

            assert.deepStrictEqual(result.hash, response.hash);

            const args = buyUnderlying.getCall(0).args;

            assert.strictEqual(args.length, 5);

            const [passedUnderlying, passedMaturity, passedAmount, passedSlippage, passedOverrides] = args;

            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedAmount, BigNumber.from(amount));
            assert.deepStrictEqual(passedSlippage, BigNumber.from(slippage));
            assert.deepStrictEqual(passedOverrides, overrides);
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

        test('converts arguments and unwraps result', async () => {

            const marketplace = new MarketPlace(ADDRESSES.MARKETPLACE, provider, mockExecutor());

            const mint = mockMethod<TransactionResponse>(marketplace, 'mint');
            const response = mockResponse();
            mint.resolves(response);

            const result = await marketplace.mint(underlying, maturity, baseAmount, principalAmount, minRatio, maxRatio);

            assert.deepStrictEqual(result.hash, response.hash);

            const args = mint.getCall(0).args;

            assert.strictEqual(args.length, 7);

            const [passedUnderlying, passedMaturity, passedBaseAmount, passedPrincipalAmount, passedMinRatio, passedMaxRatio, passedOverrides] = args;

            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedBaseAmount, BigNumber.from(baseAmount));
            assert.deepStrictEqual(passedPrincipalAmount, BigNumber.from(principalAmount));
            assert.deepStrictEqual(passedMinRatio, BigNumber.from(minRatio));
            assert.deepStrictEqual(passedMaxRatio, BigNumber.from(maxRatio));
            assert.deepStrictEqual(passedOverrides, {});
        });

        test('accepts transaction overrides', async () => {

            const marketplace = new MarketPlace(ADDRESSES.MARKETPLACE, provider, mockExecutor());

            const mint = mockMethod<TransactionResponse>(marketplace, 'mint');
            const response = mockResponse();
            mint.resolves(response);

            const result = await marketplace.mint(underlying, maturity, baseAmount, principalAmount, minRatio, maxRatio, overrides);

            assert.deepStrictEqual(result.hash, response.hash);

            const args = mint.getCall(0).args;

            assert.strictEqual(args.length, 7);

            const [passedUnderlying, passedMaturity, passedBaseAmount, passedPrincipalAmount, passedMinRatio, passedMaxRatio, passedOverrides] = args;

            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedBaseAmount, BigNumber.from(baseAmount));
            assert.deepStrictEqual(passedPrincipalAmount, BigNumber.from(principalAmount));
            assert.deepStrictEqual(passedMinRatio, BigNumber.from(minRatio));
            assert.deepStrictEqual(passedMaxRatio, BigNumber.from(maxRatio));
            assert.deepStrictEqual(passedOverrides, overrides);
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

        test('converts arguments and unwraps result', async () => {

            const marketplace = new MarketPlace(ADDRESSES.MARKETPLACE, provider, mockExecutor());

            const mintWithUnderlying = mockMethod<TransactionResponse>(marketplace, 'mintWithUnderlying');
            const response = mockResponse();
            mintWithUnderlying.resolves(response);

            const result = await marketplace.mintWithUnderlying(underlying, maturity, baseAmount, principalAmount, minRatio, maxRatio);

            assert.deepStrictEqual(result.hash, response.hash);

            const args = mintWithUnderlying.getCall(0).args;

            assert.strictEqual(args.length, 7);

            const [passedUnderlying, passedMaturity, passedBaseAmount, passedPrincipalAmount, passedMinRatio, passedMaxRatio, passedOverrides] = args;

            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedBaseAmount, BigNumber.from(baseAmount));
            assert.deepStrictEqual(passedPrincipalAmount, BigNumber.from(principalAmount));
            assert.deepStrictEqual(passedMinRatio, BigNumber.from(minRatio));
            assert.deepStrictEqual(passedMaxRatio, BigNumber.from(maxRatio));
            assert.deepStrictEqual(passedOverrides, {});
        });

        test('accepts transaction overrides', async () => {

            const marketplace = new MarketPlace(ADDRESSES.MARKETPLACE, provider, mockExecutor());

            const mintWithUnderlying = mockMethod<TransactionResponse>(marketplace, 'mintWithUnderlying');
            const response = mockResponse();
            mintWithUnderlying.resolves(response);

            const result = await marketplace.mintWithUnderlying(underlying, maturity, baseAmount, principalAmount, minRatio, maxRatio, overrides);

            assert.deepStrictEqual(result.hash, response.hash);

            const args = mintWithUnderlying.getCall(0).args;

            assert.strictEqual(args.length, 7);

            const [passedUnderlying, passedMaturity, passedBaseAmount, passedPrincipalAmount, passedMinRatio, passedMaxRatio, passedOverrides] = args;

            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedBaseAmount, BigNumber.from(baseAmount));
            assert.deepStrictEqual(passedPrincipalAmount, BigNumber.from(principalAmount));
            assert.deepStrictEqual(passedMinRatio, BigNumber.from(minRatio));
            assert.deepStrictEqual(passedMaxRatio, BigNumber.from(maxRatio));
            assert.deepStrictEqual(passedOverrides, overrides);
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

        test('converts arguments and unwraps result', async () => {

            const marketplace = new MarketPlace(ADDRESSES.MARKETPLACE, provider, mockExecutor());

            const burn = mockMethod<TransactionResponse>(marketplace, 'burn');
            const response = mockResponse();
            burn.resolves(response);

            const result = await marketplace.burn(underlying, maturity, burnAmount, minRatio, maxRatio);

            assert.deepStrictEqual(result.hash, response.hash);

            const args = burn.getCall(0).args;

            assert.strictEqual(args.length, 6);

            const [passedUnderlying, passedMaturity, passedAmount, passedMinRatio, passedMaxRatio, passedOverrides] = args;

            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedAmount, BigNumber.from(burnAmount));
            assert.deepStrictEqual(passedMinRatio, BigNumber.from(minRatio));
            assert.deepStrictEqual(passedMaxRatio, BigNumber.from(maxRatio));
            assert.deepStrictEqual(passedOverrides, {});
        });

        test('accepts transaction overrides', async () => {

            const marketplace = new MarketPlace(ADDRESSES.MARKETPLACE, provider, mockExecutor());

            const burn = mockMethod<TransactionResponse>(marketplace, 'burn');
            const response = mockResponse();
            burn.resolves(response);

            const result = await marketplace.burn(underlying, maturity, burnAmount, minRatio, maxRatio, overrides);

            assert.deepStrictEqual(result.hash, response.hash);

            const args = burn.getCall(0).args;

            assert.strictEqual(args.length, 6);

            const [passedUnderlying, passedMaturity, passedAmount, passedMinRatio, passedMaxRatio, passedOverrides] = args;

            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedAmount, BigNumber.from(burnAmount));
            assert.deepStrictEqual(passedMinRatio, BigNumber.from(minRatio));
            assert.deepStrictEqual(passedMaxRatio, BigNumber.from(maxRatio));
            assert.deepStrictEqual(passedOverrides, overrides);
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

        test('converts arguments and unwraps result', async () => {

            const marketplace = new MarketPlace(ADDRESSES.MARKETPLACE, provider, mockExecutor());

            const burnForUnderlying = mockMethod<TransactionResponse>(marketplace, 'burnForUnderlying');
            const response = mockResponse();
            burnForUnderlying.resolves(response);


            const result = await marketplace.burnForUnderlying(underlying, maturity, burnAmount, minRatio, maxRatio);

            assert.deepStrictEqual(result.hash, response.hash);

            const args = burnForUnderlying.getCall(0).args;

            assert.strictEqual(args.length, 6);

            const [passedUnderlying, passedMaturity, passedAmount, passedMinRatio, passedMaxRatio, passedOverrides] = args;

            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedAmount, BigNumber.from(burnAmount));
            assert.deepStrictEqual(passedMinRatio, BigNumber.from(minRatio));
            assert.deepStrictEqual(passedMaxRatio, BigNumber.from(maxRatio));
            assert.deepStrictEqual(passedOverrides, {});
        });

        test('accepts transaction overrides', async () => {

            const marketplace = new MarketPlace(ADDRESSES.MARKETPLACE, provider, mockExecutor());

            const burnForUnderlying = mockMethod<TransactionResponse>(marketplace, 'burnForUnderlying');
            const response = mockResponse();
            burnForUnderlying.resolves(response);

            const result = await marketplace.burnForUnderlying(underlying, maturity, burnAmount, minRatio, maxRatio, overrides);

            assert.deepStrictEqual(result.hash, response.hash);

            const args = burnForUnderlying.getCall(0).args;

            assert.strictEqual(args.length, 6);

            const [passedUnderlying, passedMaturity, passedAmount, passedMinRatio, passedMaxRatio, passedOverrides] = args;

            assert.strictEqual(passedUnderlying, underlying);
            assert.deepStrictEqual(passedMaturity, BigNumber.from(maturity));
            assert.deepStrictEqual(passedAmount, BigNumber.from(burnAmount));
            assert.deepStrictEqual(passedMinRatio, BigNumber.from(minRatio));
            assert.deepStrictEqual(passedMaxRatio, BigNumber.from(maxRatio));
            assert.deepStrictEqual(passedOverrides, overrides);
        });
    });
});
