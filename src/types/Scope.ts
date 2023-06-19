export default class Scope {
    private variables: any;

    constructor() {
        this.variables = {};
    }

    public setVariable(key: string, value: number) {
        this.variables[key] = {type: "f", value: value}
    }

    public getVariable(key: string) {
        return this.variables[key];
    }

    public getAllVariables() {
        // return Object.entries(this.variables).map((key, value) => {
        //     return {key: {type: "f", value: value}}
        // })
        return this.variables;
    }
}