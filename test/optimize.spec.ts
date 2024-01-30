import assert from 'assert';
import { BigNumber, Contract, PayableOverrides } from 'ethers';
import { suite } from 'mocha';
import { addGasLimitAdjustment, optimizeGas } from '../src/helpers/optimize.js';

suite('optimize', () => {

    test('calculates a correct gas limit', () => {

        const estimated = BigNumber.from('200000');

        // we expect a gas limit 10% higher than the estimated gas limit
        const expected = '220000';

        const limit = addGasLimitAdjustment(estimated);

        assert.strictEqual(limit._isBigNumber, true, 'should create a BigNumber instance');
        assert.strictEqual(limit.gt(estimated), true, 'the limit should be greater than the estimate');
        assert.strictEqual(limit.toString(), expected, 'the limit should be 10% greater than the estimate');
    });

    test('does not perform optimizations if custom gasLimit is set', async () => {

        const options: PayableOverrides = {
            gasLimit: BigNumber.from('200000'),
        };

        const optimized = await optimizeGas({} as Contract, 'method', [], options);

        assert.deepStrictEqual(optimized, options, 'no optimizations should be performed');
    });
});
