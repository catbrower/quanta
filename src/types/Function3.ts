import { Vector3 } from "three";

export default class Function3 {
    private origin: Vector3;
    private evalFunc: (state: any) => Vector3;

    constructor(evalFunc: (state: any) => Vector3) {
        this.origin = new Vector3(0, 0, 0);
        this.evalFunc = evalFunc;
    }

    public evaluate(state: any): Vector3 {
        return this.evalFunc(state)
    }
}