
import { IterationEvent, MapIterationEvent, MatchIterationEvent } from './events';
import { SortOptions } from './config';

export function each(target : any, handler : (value: any, key: string|number, event: IterationEvent) => void, event : IterationEvent = null) : void {
    event = event || new IterationEvent();
    if(Array.isArray(target) || typeof target === 'string') {
        let length = target.length;
        for(let i = 0; i < length; i++) {
            handler(target[i], i, event);
            if(event.deepIteration && !event._stop && !event._skip && (Array.isArray(target[i]) || typeof target[i] === 'object'))
                each(target[i], handler, event);
            if(event._stop) break;
        }
    } else if(typeof target === 'number') {
        let count = 0,
            goal = Math.abs(target);
        while(count < target) {
            count++;
            handler(count, goal, event);
            if(event._stop) break;
        }
    } else {
        for(let i in target) {
            if(!event.hasOwnProperty || target.hasOwnProperty(i)) {
                handler(target[i], i, event);
                if(event.deepIteration && !event._stop && !event._skip && (Array.isArray(target[i]) || typeof target[i] === 'object'))
                    each(target[i], handler, event);
                if(event._stop) break;
            }
        }
    }
}

export function filter(target: any, handler : (value: any, key: string|number, event: IterationEvent) => boolean, event : IterationEvent = null) : any {
    event = event || new IterationEvent();
    let result = null;
    if(Array.isArray(target)) {
        result = [];
        each(target, (x, y, z) => {
            if(handler(x, y, z))
                result.push(x); 
        }, event);
    } else {
        result = {};
        each(target, (x, y, z) => {
            if(handler(x, y, z))
                result[y] = x;
        }, event);
    }
    return result;
}

export function map(target: any, handler : (value: any, key: string|number, event: MapIterationEvent) => any, event : MapIterationEvent = null) : any {
    let temp = null;
    event = event || new MapIterationEvent(true, (item, build) => build.push(item));
    each(target, (x, y, z) => {
        temp = handler(x, y, <MapIterationEvent>z);
        if(!event._skip)
            event.add(temp);
    }, event);
    return event.buildTarget;
}

export function index<K, V>(target: any, key: (value: any, key: string|number) => K, value: (value: any, key: string|number) => V) : Map<K, V> {
    let map = new Map(),
        keyFunc = key || function(x, y) { return y; },
        valueFunc = value || function(x, y,) { return x; },
        keyVal, valueVal;
    each(target, (x, y) => {
        keyVal = keyFunc(x, y);
        valueVal = valueFunc(x, y);

        if(!map.has(keyVal))
            map.set(keyVal, valueVal);
    });
    return map;
}

export function sort<T>(target: Array<T>, options: Array<SortOptions> | SortOptions): Array<T> {
    options = Array.isArray(options) ? options : [options];
    let temp = target.slice(),
        len = options.length,
        rev, result, A, B, i, opt;

    options.forEach(x => {
        x.dir = x.dir || 'asc';
        x.key = x.key || function(x) { return x; };
    });
    return temp.sort(function(a, b) {
        for(i = 0; i < len; i++) {
            opt = options[i];
            rev = opt.dir == 'asc';
            result = 0;
            A = opt.key(a);
            B = opt.key(b);

            result = (A < B ? -1 : A > B ? 1 : 0) * [-1, 1][+!!rev];

            if(result != 0)
                break;
        }
        return result;
    });
}

export function find(target: any, handler: (value: any, key: string|number, event: IterationEvent) => boolean, event : IterationEvent = null) : any {
    let retval = null,
        flag = false;
    event = event || new IterationEvent();
    each(target, (x, y, z) => {
        flag = handler(x, y, z);
        if(flag) {
            z.stop();
            retval = x;
        }
    }, event);
    return retval;
}

export function indexOf(target: any, obj: any) : any  {
    let retval = null,
        flag = false;
    if(Array.isArray(target))
        retval = target.indexOf(obj);
    else {
        each(target, (x, y, z) => {
            if(x == obj) {
                z.stop();
                retval = y;
            }
        });
    }
    return retval;
}

export function contains(target: any, handler: (value: any, key: string|number, event: IterationEvent) => boolean, event : IterationEvent = null) : boolean {
    return find(target, handler, event) != null;
}

export function fuse(target: any, source: any, event: IterationEvent = null) : any {
    event = event || new IterationEvent(true, true);
    each(source, (object, key) => {
        if(object && object._iter_tag === 'updateable')
            object.update(target, true);
        else {
            if(event.deepIteration && (Array.isArray(object) || typeof object === 'object')) {
                if(!target[key]) {
                    if(typeof object === 'object')
                        target[key] = {};
                    else if(Array.isArray(object))
                        target[key] = [];
                }
                fuse(target[key], object, event);
            } else
                target[key] = object;
        }
    });
    return target;
}

export function distinct<T>(target: Array<T>, handler : (value: any, key: string|number, event: IterationEvent) => any, event : IterationEvent = null): Array<T> {
    let hash = new Set<any>(),
        value = null;
    event = event || new IterationEvent();
    return filter(target, (x, y, z) => {
        value = handler(x, y, z);
        if(hash.has(value))
            return false;
        hash.add(value);
        return true;
    }, event);
}

export function group<K>(target: any, key: (value: any, key: string|number, event: IterationEvent) => K, event: IterationEvent): Map<K, Array<any>> {
    let map = new Map<K, Array<any>>(),
        value = null;
    event = event || new IterationEvent();
    each(target, (x, y, z) => {
        value = key(x, y, z);
        if(!map.has(value))
            map.set(value, []);
        map.get(value).push(x);
    });
    return map;
}

export function first(target: any): any {
    if(Array.isArray(target)) {
        return target[0];
    } else {
        let item = null;
        for(let i in target) {
            item = target[i];
            break;
        }
        return item;
    }
}

export function last(target: any): any {
    if(Array.isArray(target)) {
        return target[target.length - 1];
    } else {
        let item = null;
        for(let i in target) {
            item = target[i];
        }
        return item;
    }
}

export function any(target: any, handler : (value: any, key: string|number, event: IterationEvent) => boolean, event : IterationEvent = null): boolean {
    let state = false;
    event = event || new IterationEvent();
    each(target, (x, y, z) => {
        if(handler(x, y, z)) {
            state = true;
            z.stop();
        }
    }, event);
    return state;
}

export function all(target: any, handler : (value: any, key: string|number, event: IterationEvent) => boolean, event : IterationEvent = null): boolean {
    let state = true;
    event = event || new IterationEvent();
    each(target, (x, y, z) => {
        if(!handler(x, y, z)) {
            state = false;
            z.stop();
        }
    }, event);
    return state;
}

export function match(target1: any, target2: any, event: MatchIterationEvent = null): boolean {
    let flag = true;
    event = event || new MatchIterationEvent();
    if(event.checkType && (typeof target1 != typeof target2))
        return false;
    if((!target1 && target2) || (target1 && !target2))
        return false;
    each(target1, (x, y, z) => {
        if(event.deepIteration && (Array.isArray(x) || typeof x === 'object')) {
            if(!match(x, target2[y], event)) {
                z.stop();
                flag = false;
            }
        } else if(event.explicit ? target2[y] !== x : target2[y] != x) {
            z.stop();
            flag = false;
        }
    });
    return flag;
}

export function copy(target: any): any {
    return fuse(Array.isArray(target) ? [] : {}, target);
}

export function clone(target: any): any {
    return JSON.parse(JSON.stringify(target));
}
