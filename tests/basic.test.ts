import { describe, expect, it } from 'vitest';
import { from } from '../src/index';

describe('Sequence', () => {
    it('correctly uses lazy operators', () => {
        let count = 0;
        const source = [1, 2, 3, 4, 5];
        const sequence = from(source).where((x) => {
            count++;
            return x > 2;
        });

        expect(count).toBe(0); // No iteration yet

        const result = sequence.toArray();
        expect(count).toBe(5);
        expect(result).toEqual([3, 4, 5]);
    });
});

describe('where()', () => {
    it('filters items based on a predicate', () => {
        const source = [1, 2, 3, 4, 5];
        const result = from(source)
            .where((x) => x % 2 === 0)
            .toArray();

        expect(result).toEqual([2, 4]);
    });

    it('correctly supplies index to predicate', () => {
        const source = ['a', 'b', 'c', 'd'];
        let indices: number[] = [];

        const result = from(source)
            .where((_, index) => {
                indices.push(index);
                return true;
            })
            .toArray();

        expect(result).toEqual(source);
        expect(indices).toEqual([0, 1, 2, 3]);
    });
});

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

describe('select()', () => {
    it('projects each element of a sequence into a new form', () => {
        const source = [1, 2, 3];
        const result = from(source)
            .select((x) => x * 2)
            .toArray();

        expect(result).toEqual([2, 4, 6]);
    });

    it('correctly supplies index to selector', () => {
        const source = ['a', 'b', 'c'];
        let indices: number[] = [];

        const result = from(source)
            .select((item, index) => {
                indices.push(index);
                return item.toUpperCase();
            })
            .toArray();

        expect(result).toEqual(['A', 'B', 'C']);
        expect(indices).toEqual([0, 1, 2]);
    });

    it('correctly maps to a different type', () => {
        const source = [1, 2, 3];
        type ResultType = { value: number };

        const result = from(source)
            .select<ResultType>((x) => ({ value: x }))
            .toArray();

        expect(result).toEqual([{ value: 1 }, { value: 2 }, { value: 3 }]);
    });

    it('does not iterate until needed', () => {
        let iterationCount = 0;
        const source = [1, 2, 3];

        const sequence = from(source).select((x) => {
            iterationCount++;
            return x * 2;
        });

        expect(iterationCount).toBe(0); // No iteration yet

        const result = sequence.toArray();
        expect(iterationCount).toBe(3);
        expect(result).toEqual([2, 4, 6]);
    });
});

describe('orderBy()', () => {
    it('sorts items in ascending order based on a key selector', () => {
        const source = [5, 3, 8, 1, 2];
        const result = from(source)
            .orderBy((x) => x)
            .toArray();

        expect(result).toEqual([1, 2, 3, 5, 8]);
    });

    it('uses the provided comparer for sorting', () => {
        const source = [
            {
                name: 'Banana',
            },
            {
                name: 'apple',
            },
            {
                name: 'date',
            },
            {
                name: 'cherry',
            },
        ];

        const result = from(source)
            .orderBy(
                (x) => x.name,
                (a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }),
            )
            .toArray();

        expect(result).toEqual([
            { name: 'apple' },
            { name: 'Banana' },
            { name: 'cherry' },
            { name: 'date' },
        ]);
    });

    it('is stable: preserves original order for equal keys', () => {
        const source = [
            { id: 1, group: 'A' },
            { id: 2, group: 'B' },
            { id: 3, group: 'A' },
            { id: 4, group: 'B' },
        ];

        const result = from(source)
            .orderBy((x) => x.group)
            .toArray();

        expect(result).toEqual([
            { id: 1, group: 'A' },
            { id: 3, group: 'A' },
            { id: 2, group: 'B' },
            { id: 4, group: 'B' },
        ]);
    });

    it('handles empty sequences', () => {
        const source: number[] = [];
        const result = from(source)
            .orderBy((x) => x)
            .toArray();

        expect(result).toEqual([]);
    });

    it('handles sequences with one element', () => {
        const source = [42];
        const result = from(source)
            .orderBy((x) => x)
            .toArray();

        expect(result).toEqual([42]);
    });

    it('handles sequences with all equal keys', () => {
        const source = [7, 7, 7, 7];
        const result = from(source)
            .orderBy((x) => x)
            .toArray();

        expect(result).toEqual([7, 7, 7, 7]);
    });

    it('does not iterate until needed', () => {
        let iterationCount = 0;
        const source = [3, 1, 2];

        const sequence = from(source).orderBy((x) => {
            iterationCount++;
            return x;
        });

        expect(iterationCount).toBe(0); // No iteration yet

        const result = sequence.toArray();
        //TODO: when optimized with key caching, this should be 3
        expect(result).toEqual([1, 2, 3]);
    });
});

describe('orderByDescending()', () => {
    it('sorts items in descending order based on a key selector', () => {
        const source = [5, 3, 8, 1, 2];
        const result = from(source)
            .orderByDescending((x) => x)
            .toArray();

        expect(result).toEqual([8, 5, 3, 2, 1]);
    });

    it('uses the provided comparer for sorting', () => {
        const source = [
            {
                name: 'Banana',
            },
            {
                name: 'apple',
            },
            {
                name: 'date',
            },
            {
                name: 'cherry',
            },
        ];

        const result = from(source)
            .orderByDescending(
                (x) => x.name,
                (a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }),
            )
            .toArray();

        expect(result).toEqual([
            { name: 'date' },
            { name: 'cherry' },
            { name: 'Banana' },
            { name: 'apple' },
        ]);
    });
});

describe('toSet()', () => {
    it('converts a sequence to a Set', () => {
        const source = [1, 2, 2, 3, 4, 4, 5];
        const result = from(source).toSet();

        expect(result).toBeInstanceOf(Set);
        expect(Array.from(result)).toEqual([1, 2, 3, 4, 5]);
    });

    it('handles empty sequences', () => {
        const source: number[] = [];
        const result = from(source).toSet();

        expect(result).toBeInstanceOf(Set);
        expect(Array.from(result)).toEqual([]);
    });

    it('handles sequences with one element', () => {
        const source = [42];
        const result = from(source).toSet();

        expect(result).toBeInstanceOf(Set);
        expect(Array.from(result)).toEqual([42]);
    });
});

describe('first()', () => {
    it('returns the first element of a sequence', () => {
        const source = [10, 20, 30];
        const result = from(source).first();
        expect(result).toBe(10);
    });

    it('throws an error if the sequence is empty', () => {
        const source: number[] = [];
        expect(() => from(source).first()).toThrowError('The source sequence is empty.');
    });

    it('returns the first element that matches the predicate', () => {
        const source = [1, 2, 3, 4, 5];
        const result = from(source).first((x) => x > 3);
        expect(result).toBe(4);
    });

    it('throws an error if no elements match the predicate', () => {
        const source = [1, 2, 3];
        expect(() => from(source).first((x) => x > 5)).toThrowError(
            'No element satisfies the condition.',
        );
    });
});

describe('firstOrDefault()', () => {
    it('returns the first element of a sequence', () => {
        const source = [10, 20, 30];
        const result = from(source).firstOrDefault();
        expect(result).toBe(10);
    });

    it('returns undefined if the sequence is empty', () => {
        const source: number[] = [];
        const result = from(source).firstOrDefault();
        expect(result).toBeUndefined();
    });

    it('returns the first element that matches the predicate', () => {
        const source = [1, 2, 3, 4, 5];
        const result = from(source).firstOrDefault((x) => x > 3);
        expect(result).toBe(4);
    });

    it('returns undefined if no elements match the predicate', () => {
        const source = [1, 2, 3];
        const result = from(source).firstOrDefault((x) => x > 5);
        expect(result).toBeUndefined();
    });
});

describe('single()', () => {
    it('returns the single element of a sequence', () => {
        const source = [42];
        const result = from(source).single();
        expect(result).toBe(42);
    });

    it('throws an error if the sequence is empty', () => {
        const source: number[] = [];
        expect(() => from(source).single()).toThrowError('The source sequence is empty.');
    });

    it('throws an error if the sequence has more than one element', () => {
        const source = [1, 2];
        expect(() => from(source).single()).toThrowError(
            'The source sequence contains more than one element.',
        );
    });

    it('returns the single element that matches the predicate', () => {
        const source = [1, 2, 3];
        const result = from(source).single((x) => x === 2);
        expect(result).toBe(2);
    });
});

describe('singleOrDefault()', () => {
    it('returns the single element of a sequence', () => {
        const source = [42];
        const result = from(source).singleOrDefault();
        expect(result).toBe(42);
    });

    it('returns undefined if the sequence is empty', () => {
        const source: number[] = [];
        const result = from(source).singleOrDefault();
        expect(result).toBeUndefined();
    });

    it('throws an error if the sequence has more than one element', () => {
        const source = [1, 2];
        expect(() => from(source).singleOrDefault()).toThrowError(
            'The source sequence contains more than one element.',
        );
    });

    it('returns the single element that matches the predicate', () => {
        const source = [1, 2, 3];
        const result = from(source).singleOrDefault((x) => x === 2);
        expect(result).toBe(2);
    });

    it('returns undefined if no elements match the predicate', () => {
        const source = [1, 2, 3];
        const result = from(source).singleOrDefault((x) => x === 5);
        expect(result).toBeUndefined();
    });
});

describe('groupBy()', () => {
    it('groups elements by a specified key', () => {
        const source = [
            { id: 1, category: 'A' },
            { id: 2, category: 'B' },
            { id: 3, category: 'A' },
            { id: 4, category: 'B' },
            { id: 5, category: 'C' },
        ];

        const result = from(source)
            .groupBy((item) => item.category)
            .toLookup((x) => x.key);

        expect(result.get('A')).toEqual([
            { id: 1, category: 'A' },
            { id: 3, category: 'A' },
        ]);
        expect(result.get('B')).toEqual([
            { id: 2, category: 'B' },
            { id: 4, category: 'B' },
        ]);
        expect(result.get('C')).toEqual([{ id: 5, category: 'C' }]);
    });
});
