import assert from 'assert';
import { BigNumber } from 'ethers';
import { suite } from 'mocha';
import { Order, parseOrder } from '../src/constants/abi/adapters/swivel.js';

suite('parseOrder', () => {

    test('parse an order', () => {

        const order: Order = {
            key: '0xf15a6cb51c934f862f17844898a7f39cf1015349a670e6eaf4a90ff6b246d752',
            protocol: 0,
            maker: '0x1fd4F104738cB95a9e100a5d2a8AEF6989850D4a',
            underlying: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
            exit: true,
            vault: false,
            principal: '27141789513',
            premium: '54283579',
            maturity: '1656039600',
            expiry: '1654737361',
        };

        const parsed = parseOrder(order);

        assert(parsed.key instanceof Uint8Array);
        assert(parsed.key.length === 32);

        assert.strictEqual(parsed.protocol, order.protocol);
        assert.strictEqual(parsed.maker, order.maker);
        assert.strictEqual(parsed.underlying, order.underlying);
        assert.strictEqual(parsed.exit, order.exit);
        assert.strictEqual(parsed.vault, order.vault);

        assert(parsed.principal instanceof BigNumber);
        assert.strictEqual(parsed.principal.toString(), order.principal);

        assert(parsed.premium instanceof BigNumber);
        assert.strictEqual(parsed.premium.toString(), order.premium);

        assert(parsed.maturity instanceof BigNumber);
        assert.strictEqual(parsed.maturity.toString(), order.maturity);

        assert(parsed.expiry instanceof BigNumber);
        assert.strictEqual(parsed.expiry.toString(), order.expiry);
    });
});
