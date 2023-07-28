import { buildShaderName } from "../../Common";
import { IProgram, IProgramUniforms } from "../ProgramInterfaces";
import { FRAGMENT, VERTEX } from "../ShaderTypes";
import buildObject from "./ObjectBuilder";
import { buildShaders } from "./ShaderBuilder";

function buildAllUniforms(uniforms: IProgramUniforms): string {
  const uniformsString = Object.entries(uniforms).map((pair) => {
    return `${pair[0]}: { type: "${pair[1].type}", value: ${pair[1].value} }`
  }).join(",\n");

  return `var uniforms = {${uniformsString}};`
}

// Build all shaders and return them as a dictionary
function buildAllShaders(code: IProgram): string {
  let uniforms = code.globals;
  let result: { [name: string]: string } = {};
  for (const obj of code.objects) {
    for (const [key, event] of Object.entries(obj.events)) {
      const shaders = buildShaders(event, { ...uniforms, ...obj.properties }, obj.mesh.type);
      result[buildShaderName(FRAGMENT, obj.id, event.name)] = shaders.fragmentShader;
      result[buildShaderName(VERTEX, obj.id, event.name)] = shaders.vertextShader;
    }
  }

  return `var SHADERS = ${JSON.stringify(result)};\n`;
}

// TODO program is fixed to one scene atm
// TODO add window resize handling
function buildAllScenes(programData: IProgram): string {
  return ``;
}

function buildAllObjects(programData: IProgram): string {
  const objectCode = programData.objects.map(buildObject).reduce((acc, item) => `${acc},\n${item}`);
  return `var objects = [
    ${objectCode}
  ];\n`;
}

// TODO update scope
function buildMainLoop(programData: IProgram): string {
  return `
    var START_TIME = new Date().getTime();
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.z = 10;

    var renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById("renderContext"),
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    var raycaster = new THREE.Raycaster();
    var pointer = new THREE.Vector2();

    objects.forEach((obj) => {
      scene.add(obj);
    });

    document.addEventListener("pointermove", (event) => { 
      pointer.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      );
    });

    function animationLoop() {
      requestAnimationFrame(() => animationLoop());

      uniforms.time.value = (new Date().getTime() - START_TIME) / 1000;
      raycaster.setFromCamera(pointer, camera);

      objects.forEach((obj) => {
        if(obj.events.step) {
          obj.events.step.apply(obj, uniforms)
        }
      })

      renderer.render(scene, camera);
    }

    animationLoop();
  `
}

export default async function buildProgram(code: IProgram): Promise<string> {
  // Fetch the latest minified threejs code
  // https://stackoverflow.com/questions/50694881/how-to-download-file-in-react-js

  const threeUrl = "https://cdnjs.cloudflare.com/ajax/libs/three.js/0.154.0/three.min.js";
  let THREE = await fetch(threeUrl, {
    method: 'GET'
  }).then(response => response.text());

  let rawCode = `
      ${buildAllUniforms(code.globals)}
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
        <style>
          body: {
            padding: none;
            margin: none;
            overflow: hidden;
          }

          #renderContext {
            position: absolute;
            top: 0px;
            left: 0px;
            width: 100vw;
            height: 100vh;
          }
        </style>
      </head>
      <body>
        <canvas id="renderContext"></canvas>
        <script>
          ${THREE}
          var pow = Math.pow;
          var sin = Math.sin;
          var time = 0;
          ${finalCode}
        </script>
      </body>
    </hmtl>
    `
  return program;
}