import { describe, expect, it } from 'vitest';
import { from } from '../../src/index';

describe('count()', () => {
    it('counts all items when no predicate is provided', () => {
        const source = [1, 2, 3, 4, 5];
        const count = from(source).count();
        expect(count).toBe(5);
    });

    it('counts items matching the predicate', () => {
        const source = [1, 2, 3, 4, 5];
        const count = from(source).count((x) => x % 2 === 0);
        expect(count).toBe(2);
    });
});
