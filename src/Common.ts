import { IProgramUniform, IProgramUniforms } from "./code/Program";

export function uniformsToString(uniforms: IProgramUniforms): string {
    return Object.entries(uniforms).map((pair: any) => {
        const name: string = pair[0];
        const uniform: IProgramUniform = pair[1];
        return `uniform ${uniform.type} ${name};`
    }).join("\n");
}