import { Sequence, type Selector } from '../..';

export default function select<TSource, TResult>(
    source: Iterable<TSource>,
    selector: Selector<TSource, TResult>,
): Sequence<TResult> {
    if (!source) {
        throw new Error('source is null or undefined');
    }

    if (!selector) {
        throw new Error('selector is null or undefined');
    }

    return Sequence.defer(function* () {
        let i = 0;
        for (const item of source) {
            yield selector(item, i++);
        }
    });
}
