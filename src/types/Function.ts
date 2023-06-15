import Scope from "./Scope";

export default class Function<T> {
    private evalFunc: (scope: Scope) => T;

    constructor(evalFunc: (scope: Scope) => T) {
        this.evalFunc = evalFunc;
    }
    
    public evaluate(scope: Scope): T {
        return this.evalFunc(scope);
    }
}