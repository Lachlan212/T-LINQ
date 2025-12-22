import { describe, expect, it } from 'vitest';
import { from } from '../../src/index';

describe('Sequence', () => {
    it('correctly uses lazy operators', () => {
        let count = 0;
        const source = [1, 2, 3, 4, 5];
        const sequence = from(source)
            .where((x) => {
                count++;
                return x > 2;
            })
            .select((x) => {
                count++;
                return x * 1;
            });

        expect(count).toBe(0); // No iteration yet

        const result = sequence.toArray();
        expect(count).toBeGreaterThan(0);
        expect(result).toEqual([3, 4, 5]);
    });
});
