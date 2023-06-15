export default class Scope {
    private variables: Record<string, number>;

    constructor() {
        this.variables = {};
    }

    public setVariable(key: string, value: number) {
        this.variables[key] = value
    }

    public getVariable(key: string) {
        return this.variables[key];
    }
}