
import { each, index, fuse, map, filter, sort, distinct, group, indexOf, copy, clone, first, last, all, any, match } from './functions';
import { IterationEvent, MapIterationEvent, MatchIterationEvent } from './events';
import { SortOptions } from './config';

export class Flow {
    source: any;

    constructor(source: any) {
        this.source = source;
    }

    static from<T>(source: T): Flow {
        return new Flow(source);
    }

    all(handler : (value: any, key: string|number, event: IterationEvent) => boolean, event : IterationEvent = null): boolean {
        return all(this.source, handler);
    }

    any(handler : (value: any, key: string|number, event: IterationEvent) => boolean, event : IterationEvent = null): boolean {
        return any(this.source, handler);
    }

    clone(): this {
        this.source = clone(this.source);
        return this;
    }

    copy(): this {
        this.source = copy(this.source);
        return this;
    }

    distinct(handler : (value: any, key: string|number, event: IterationEvent) => any, event : IterationEvent = null): this {
        if(Array.isArray(this.source))
            this.source = distinct(this.source, handler, event);
        return this;
    }

    each(handler : (value: any, key: string|number, event: IterationEvent) => void, event : IterationEvent = null): this {
        each(this.source, handler, event);
        return this;
    }

    filter(handler : (value: any, key: string|number, event: IterationEvent) => boolean, event : IterationEvent = null): this {
        this.source = filter(this.source, handler, event);
        return this;
    }

    first(): any {
        return first(this.source);
    }

    fuse(source: any, event: IterationEvent = null): this {
        this.source = fuse(this.source, source, event);
        return this;
    }

    group<K>(handler : (value: any, key: string|number, event: IterationEvent) => K, event : IterationEvent = null): this {
        if(Array.isArray(this.source))
            this.source = group(this.source, handler, event);
        return this;
    }

    last(): any {
        return last(this.source);
    }

    map(handler : (value: any, key: string|number, event: MapIterationEvent) => any, event : MapIterationEvent = null): this {
        this.source = map(this.source, handler, event);
        return this;
    }

    match(source: any, event: MatchIterationEvent = null): boolean {
        return match(this.source, source, event);
    }

    remove(object: any): this {
        let index = indexOf(this.source, object);
        this.removeAt(index);
        return this;
    }

    removeAt(key: string | number): any {
        let item = this.source[key];
        if(Array.isArray(this.source)) {
            if(<number>key > -1)
                this.source.splice(<number>key, 1);
        } else {
            delete this.source[key];
        }
        return item;
    }

    sort(options: Array<SortOptions>): this {
        if(Array.isArray(this.source))
            this.source = <any>sort(this.source, options);
        return this;
    }

    toArray<V>(): Array<V> {
        return Array.isArray(this.source) ? this.source : this.map(x => x).toArray();
    }

    toMap<K, V>(key: (value: any, key: string|number) => K, value: (value: any, key: string|number) => V): Map<K, V> {
        return index(this.source, key, value);
    }

}
