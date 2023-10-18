import assert from 'assert';
import { utils } from 'ethers';
import { suite, test } from 'mocha';

suite('abi-coder', () => {

    test('encoding abis with named and unnamed params returns the same result', () => {

        const pool = utils.getAddress('0x1234500000000000000000000000000000006789');
        const minimum = utils.parseEther('2');

        const r1 = utils.defaultAbiCoder.encode(['address', 'uint256'], [pool, minimum]);

        const r2 = utils.defaultAbiCoder.encode(['address pool', 'uint256 minimum'], [pool, minimum]);

        assert.strictEqual(r1, r2);
    });
});
