
export class IterationEvent {
    public _stop: boolean = false;
    public _skip: boolean = false;
    public hasOwnProperty: boolean;
    public deepIteration: boolean;
    
    constructor(hasOwnProperty: boolean = true, deepIteration: boolean = false) {
        this.hasOwnProperty = hasOwnProperty;
        this.deepIteration = deepIteration;
    }

    public stop(): void {
        this._stop = true;
    }

    public skip(): void {
        this._skip = true;
    }

    public reset() : void {
        this._skip = false;
    }

}

export class MapIterationEvent extends IterationEvent {
    public buildTarget: any;
    public addToBuild: (item: any, target: any) => void;

    constructor(hasOwnProperty: boolean = true, buildTarget: any = [], addToBuild: (item: any, target: any) => void = (x, y) => y.push(x)) {
        super(hasOwnProperty, false);
        this.buildTarget = buildTarget;
        this.addToBuild = addToBuild;
    }

    add(item: any) {
        this.addToBuild(item, this.buildTarget);
    }
    
}

export class MatchIterationEvent extends IterationEvent {
    public explicit: boolean = false;
    public checkType: boolean = false;

    constructor(hasOwnProperty: boolean = true, deepIteration: boolean = true, explicit: boolean = false, checkType: boolean = false) {
        super(hasOwnProperty, deepIteration);
        this.explicit = explicit;
        this.checkType = checkType;
    }

}
