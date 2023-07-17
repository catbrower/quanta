import { useAppSelector } from "../Hooks";

function buildShader(shader: any) : string {
    return '';
}

export default function compile() {
    const code = useAppSelector(state => state.code);

    const shaders : string[] = [];

    const program = `
    <html>
      <head>
      </head>

      <body>
        ${shaders.join('\n')}
      </body>
    </hmtl>
    `
}