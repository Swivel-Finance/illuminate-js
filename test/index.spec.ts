import assert from 'assert';
import { illuminate } from '../src/index.js';

suite('tests', () => {

    test('illuminate', () => {

        assert.strictEqual(illuminate, 'awesome');
    });
});
