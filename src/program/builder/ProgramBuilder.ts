import { useAppSelector } from "../../redux/Hooks";
import { IProgram } from "../Interfaces";
import { FRAGMENT, VERTEX } from "../ShaderTypes";
import { buildShaders } from "./ShaderBuilder";

function buildShaderName(type: string, objectId: string, eventName: string) {
  return `${type}.${objectId}.${eventName}`;
}

// Build all shaders and return them as a dictionary
function buildAllShaders(code: IProgram) : string {
  let uniforms = code.globals;
    let result: {[name: string] : string} = {};
    for(const obj of code.objects) {
      for(const event of obj.events) {
        const shaders = buildShaders(event, uniforms, obj.mesh.type);
        result[buildShaderName(FRAGMENT, obj.id, event.name)] = shaders.fragmentShader;
        result[buildShaderName(VERTEX, obj.id, event.name)] = shaders.vertextShader;
      }
    }

    return `${result}`;
}

// TODO program is fixed to one scene atm
// TODO add window resize handling
function buildAllScenes(programData: IProgram): string {
  return `
    var camera = THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.z = 10;

    var renderer = THREE.WebGLRenderer({
      canvas: document.getElementById("canvas"),
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    var raycaster = new THREE.Raycaster();
    var pointer = new THREE.Vector2();

    document.addEventListener("pointermove", (event) => { onPointerMove(event) });
  `
}

function buildAllObjects(programData: IProgram): string {
  return '';
}

// TODO update scope
function buildMainLoop(programData: IProgram): string {
  return `
    function animationLoop() {
      requestAnimationFrame(() => animationLoop());

      raycaster.setFromCamera(pointer, camera);
      objects.forEach((item) => {
        item.update(scope, raycaster);
      });

      renderer.render(scene, camera);
    }

    animationLoop();
  `
}

export default function buildProgram(): string {
    const code = useAppSelector(state => state.code);

    // Fetch the latest minified threejs code
    // https://stackoverflow.com/questions/50694881/how-to-download-file-in-react-js
    const THREE = "";
    let rawCode = `
      ${buildAllShaders(code)}
      ${buildAllScenes(code)}
      ${buildAllObjects(code)}
      ${buildMainLoop(code)}
    `
    // TODO either prettify or minify based on user specification
    let finalCode = rawCode;

    const program = `
    <html>
      <head>
        <title>my program</title>
      </head>

      <body>
        <script>${THREE}</script>
        <script>
          ${finalCode}
        </script>
      </body>
    </hmtl>
    `
    return program;
}