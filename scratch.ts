import { IProgramUniform } from "./src/Program";

export function getVariableByName(collection: IProgramUniform, targetName: string): number {
    console.log(targetName)
    for(const item of collection) {
        if(item.name.trim() === targetName.trim()) {
            return parseFloat(item.value);
        }
    };

    throw new Error(`scale not in [${collection.map((item) => item.name).join(',')}]`);
}

let items = [
  {name: "scale", type: "float", "value": "0.0"},
  {name: "foo", type: "float", "value": "0.0"},
  {name: "bar", type: "float", "value": "0.0"}
]

let x = getVariableByName(items, "scale");