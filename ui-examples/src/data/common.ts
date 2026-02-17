import { getRandomBase } from "./common-data";

export class RandomContext {
    private _items: number[];
    private _ticker: number = 0;
    constructor(items?: number[]) {
        this._items = items || (Array.from({length: 200}).map(() => Math.random()))
    }

    seed(seed: number) {
        this._ticker = seed % this._items.length;
    }

    random() {
        this._ticker = (this._ticker + 1) % this._items.length;
        return this._items[this._ticker];
    }

    randint(min: number, max: number) {
        const delta = max - min;
        return Math.floor(min + delta * this.random());
    }

    randbool(): boolean {
        return this.random() < 0.5;
    }

    choice<T>(entries: T[]): T {
        const index = Math.min(this.randint(0, entries.length), entries.length - 1);
        return entries[index]
    }

    choices<T>(entries: T[], count: number) {
        const localEntries = [...entries];
        return (Array.from({length: count}).map(() => {
            const index = Math.min(this.randint(0, localEntries.length), localEntries.length - 1);
            const [value] = localEntries.splice(index, 1);
            return value;
        }))
    }

    randdaterange(start: Date, end: Date, maxLength?: number): [Date, Date] {
        const rangeStart = this.randdate(start, end);
        const delta = end.getTime() - rangeStart.getTime();
        const limitedDelta = maxLength === undefined ? delta : Math.min(delta, maxLength);
        const rangeEnd = this.randdate(rangeStart, new Date(rangeStart.getTime() + limitedDelta));
        return [rangeStart, rangeEnd]
    }

    randdate(start: Date, end: Date): Date {
        const delta = end.getTime() - start.getTime();
        return new Date(start.getTime() + this.randint(0, delta));
    }

    reset() {
        this._ticker = 0;
    }
}

export type DataGenerator<T extends object> = {
    createData(): T;
}

function extendRandomBase(values: number[]): number[] {
    return [
        ...values,
        ...values.map(i => Math.pow(Math.sin(i * 2 * Math.PI), 2)),
        ...values.map(i => Math.pow(Math.cos(i * 2 * Math.PI + 0.25), 2)),
        ...values.map(i => Math.pow(Math.sin(i * 2 * Math.PI + 0.5), 2)),
        ...values.map(i => Math.pow(Math.cos(i * 2 * Math.PI + 0.75), 2))
    ]
}

export function getFixedRandom() {
    return new RandomContext(extendRandomBase(extendRandomBase(getRandomBase())))
}
