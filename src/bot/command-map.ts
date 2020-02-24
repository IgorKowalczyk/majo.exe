
export class CommandMap extends Map<string, Array<Function>> {

    on(cmd: string, handler: Function): this {
        if(!this.has(cmd))
            this.set(cmd, [handler]);
        else
            this.get(cmd).push(handler);
        return this;
    }

    off(cmd: string, handler?: Function): this {
        if(!handler) {
            this.delete(cmd);
        } else {
            let array = this.get(cmd);
            if(array) {
                let idx = array.indexOf(handler);
                if(idx > -1)
                    array.splice(idx, 1);
            }
        }
        return this;
    }

}
