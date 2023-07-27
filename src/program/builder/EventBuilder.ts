import THREE from "three";
import { format } from "../../Common";
import { EVENT_STEPS } from "../../Constants";
import { IProgramEvent } from "../ProgramInterfaces";
import { newColor, newEuler } from "./CodeBuilder";

// Note to self, event functions must be called using apply so that 'this' refers to the correct thing
export function buildEvent(event: IProgramEvent) {
  let lines = [];
  let x: THREE.Mesh;
  // x.mat
  lines.push(`() => {`)
  for (const step of event.steps) {
    switch (step.type) {
      case EVENT_STEPS.SET_COLOR:
        lines.push(`this.material.color = ${newColor(step.content)};`);
        break;
      case EVENT_STEPS.SET_ROTATION:
        lines.push(`this.rotation = ${newEuler(step.content)}`);
        break;
    }
    lines.push('}')
  }
  return format(lines.join('\n'));
}