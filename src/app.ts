import config from 'config';
import _ from 'lodash';
import Mali from 'mali';

export declare namespace mikudos {
    interface ConfigFunc {
        (app: Application): void;
    }
}

export interface Scene {
    instance: { [key: string]: any };
    info: '';
}

export class Application extends Mali {
    public settings: any;
    public context: any;
    public sceneName: string = '';
    public scenes: { [id: string]: Scene } = {};
    public services: { [key: string]: any } = {};
    constructor(
        path: any,
        name?: string | ReadonlyArray<string>,
        options?: any
    ) {
        super(path, name, options);
        this.settings = _.merge({}, config);
    }

    get(name: string) {
        return this.settings[name];
    }

    set(name: string, value: any) {
        this.settings[name] = value;
        return this;
    }

    disable(name: string) {
        this.settings[name] = false;
        return this;
    }

    disabled(name: string) {
        return !this.settings[name];
    }

    enable(name: string) {
        this.settings[name] = true;
        return this;
    }

    enabled(name: string) {
        return !!this.settings[name];
    }

    configure(fn: mikudos.ConfigFunc): Application {
        fn.call(this, this);

        return this;
    }
}
