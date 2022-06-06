import assert from 'assert';
import { suite } from 'mocha';
import { Result, unwrap } from '../src/helpers/index.js';

suite('result', () => {

    test('unwrap a single return value', () => {

        const stringResult: Result<[string]> = ['test'];

        assert.strictEqual(unwrap<string>(stringResult), 'test');

        const numberResult: Result<[number]> = [0];

        assert.strictEqual(unwrap<number>(numberResult), 0);

        const arrayResult: Result<[number[]]> = [[0, 1, 2]];

        assert.deepStrictEqual(unwrap<[number[]]>(arrayResult), [0, 1, 2]);

        const objectResult: Result<[{ [key: string]: string; }]> = [{ foo: 'bar', bar: 'foo' }];

        assert.deepStrictEqual(unwrap<[{ [key: string]: string; }]>(objectResult), { foo: 'bar', bar: 'foo' });
    });

    test('unwrap a tuple return value', () => {

        const stringResult: Result<[string, string, string]> = ['foo', 'bar', 'baz'];

        assert.deepStrictEqual(unwrap<[string, string, string]>(stringResult), ['foo', 'bar', 'baz']);

        const numberResult: Result<[number, number, number]> = [0, 1, 2];

        assert.deepStrictEqual(unwrap<[number, number, number]>(numberResult), [0, 1, 2]);

        type T = { [key: string]: string; };

        const mixedResult: Result<[T, T, string]> = [{ foo: 'bar' }, { bar: 'foo' }, 'baz'];

        assert.deepStrictEqual(unwrap<[T, T, string]>(mixedResult), [{ foo: 'bar' }, { bar: 'foo' }, 'baz']);
    });
});
