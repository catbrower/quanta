import { v4 as uuidv4 } from 'uuid';
import { useAppSelector } from "../../redux/Hooks"
import { useEffect } from 'react';

const frameId = uuidv4();

export default function PreviewWindow() {
  const compiledProgram = useAppSelector(state => state.code.compiledProgram);

  useEffect(() => {
    const element = document.getElementById(frameId) as HTMLIFrameElement;

    if (element && compiledProgram) {
      element.contentWindow?.document.write(compiledProgram);
    }
  });

  return (
    <iframe style={{ width: "50vw", height: "50vh" }} id={frameId}></iframe>
  )
}