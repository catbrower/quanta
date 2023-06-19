
// A field that defines a 4D vector
export default class Field4 {
    private rawFunction: string;

    public constructor(rawFunction: string) {
        this.rawFunction = rawFunction;
    }

    public buildShader() {
        return this.rawFunction;
    }
}