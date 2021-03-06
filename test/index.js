'use strict';

const assert = require('assert');
const sc = require('../lib');
const schema = require('./data/schema');

describe('schema-casting', function() {

  it('should type cast string literals to appropriate types', () => {
    const output = sc(schema, {
      'a': '1',
      'b': 'true',
      'c': '2.34',
      'd': {
        'e': {
          'f': '5'
        },
      },
    });

    assert.deepStrictEqual(output, {
      'a': 1,
      'b': true,
      'c': 2.34,
      'd': {
        'e': {
          'f': 5
        }
      }
    });
  });

  it('should type cast constant string literals to appropriate types', () => {
    const constantSchema = {
      type: 'integer'
    };
    const output = sc(constantSchema, '11');

    assert.deepStrictEqual(output, 11);
  });

  it('should ignore string literals if casting unfeasible', () => {
    const output = sc(schema, {
      'a': 'hello',
      'b': true,
      'c': 'float',
      'd': {
        'e': {
          'f': '5'
        },
      },
    });

    assert.deepStrictEqual(output, {
      'a': 'hello',
      'b': true,
      'c': 'float',
      'd': {
        'e': {
          'f': 5
        }
      }
    });
  });

});
