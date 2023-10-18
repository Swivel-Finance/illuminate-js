import assert from 'assert';
import { SignatureLike } from '@ethersproject/bytes';
import { utils } from 'ethers';
import { ADAPTERS } from '../src/constants/abi/adapters.js';
import { Order, Principals } from '../src/index.js';

// TODO: we can very likely remove this file - it's not really testing anything useful...

suite.skip('adapters', () => {

    const underlying = '0x1234567890000000000000000000000000000001';
    const maturity = '1654638431';
    const pool = '0x1234567890000000000000000000000000000002';
    const amount = utils.parseEther('100').toString();
    const minimum = utils.parseEther('98').toString();
    const deadline = '1654642073';

    suite('illuminate', () => {

        test('lend', () => {

            const parts = [
                '0x',
                '0000000000000000000000001234567890000000000000000000000000000001',
                '00000000000000000000000000000000000000000000000000000000629fc75f',
                '0000000000000000000000000000000000000000000000055005f0c614480000',
                '0000000000000000000000001234567890000000000000000000000000000002',
            ];

            const expected = parts.join('');

            const result = ADAPTERS[Principals.Illuminate].lend.encode(
                underlying,
                maturity,
                pool,
                minimum,
            );

            assert.strictEqual(result, expected);
        });

        test('redeem', () => {

            const parts = [
                '0x',
                '0000000000000000000000001234567890000000000000000000000000000001',
                '00000000000000000000000000000000000000000000000000000000629fc75f',
            ];

            const expected = parts.join('');

            const result = ADAPTERS[Principals.Illuminate].redeem.encode(
                underlying,
                maturity,
            );

            assert.strictEqual(result, expected);
        });
    });

    suite('swivel', () => {

        const maker = '0x1234567890000000000000000000000000000003';
        const expiry = deadline;

        test('lend', () => {

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

            const swapMinimum = utils.parseEther('2').toString();
            const swapFlag = true;

            const parts = [
                '0x',
                '00000000000000000000000000000000000000000000000000000000000000a0',
                '0000000000000000000000000000000000000000000000000000000000000300',
                '0000000000000000000000001234567890000000000000000000000000000002',
                '0000000000000000000000000000000000000000000000001bc16d674ec80000',
                '0000000000000000000000000000000000000000000000000000000000000001',
                '0000000000000000000000000000000000000000000000000000000000000002',
                'fb1700b125bdb80a6c11c181325a5a744fe00a098f379aa31fcbcdfb1d6d1c01',
                '0000000000000000000000000000000000000000000000000000000000000000',
                '0000000000000000000000001234567890000000000000000000000000000003',
                '0000000000000000000000000000000000000000000000000000000000000000',
                '0000000000000000000000000000000000000000000000000000000000000000',
                '0000000000000000000000000000000000000000000000008ac7230489e80000',
                '0000000000000000000000000000000000000000000000000de0b6b3a7640000',
                '00000000000000000000000000000000000000000000000000000000629fc75f',
                '00000000000000000000000000000000000000000000000000000000629fd599',
                'fb1700b125bdb80a6c11c181325a5a744fe00a098f379aa31fcbcdfb1d6d1c01',
                '0000000000000000000000000000000000000000000000000000000000000001',
                '0000000000000000000000001234567890000000000000000000000000000003',
                '0000000000000000000000000000000000000000000000000000000000000000',
                '0000000000000000000000000000000000000000000000000000000000000000',
                '00000000000000000000000000000000000000000000000ad78ebc5ac6200000',
                '000000000000000000000000000000000000000000000001158e460913d00000',
                '00000000000000000000000000000000000000000000000000000000629fc75f',
                '00000000000000000000000000000000000000000000000000000000629fd599',
                '0000000000000000000000000000000000000000000000000000000000000002',
                '000000000000000000000000000000000000000000000000000000000000001b',
                'a5af5edd029fb82bef79cae459d8007ff20c078e25114217c921dc60e31ce0a0',
                '6014954014d6ee16840a1ead70ec6797b64e42532a86edc744a451b07a1bb41d',
                '000000000000000000000000000000000000000000000000000000000000001b',
                'e3dea176cfd7dacd1fe7424f633789b8fc7da0fa23d7e1bd64404bd29d9115d4',
                '656c0bf83af468dc5036309403d8f1a0809be0a9db18e314c40fd7f252e6fb97',
            ];

            const expected = parts.join('');

            const result = ADAPTERS[Principals.Swivel].lend.encode(
                orders,
                signatures,
                pool,
                swapMinimum,
                swapFlag,
            );

            assert.strictEqual(result, expected);
        });

        test('redeem', () => {

            const parts = [
                '0x',
                '0000000000000000000000001234567890000000000000000000000000000001',
                '00000000000000000000000000000000000000000000000000000000629fc75f',
            ];

            const expected = parts.join('');

            const result = ADAPTERS[Principals.Swivel].redeem.encode(
                underlying,
                maturity,
            );

            assert.strictEqual(result, expected);
        });
    });
});
