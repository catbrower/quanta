import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Collapse, Container } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { useSpring, animated } from '@react-spring/web';
import { useAppDispatch, useAppSelector } from "../Hooks";
import { openObjectWindow } from "./GUISlice";

function TransitionComponent(props: TransitionProps) {
    const style = useSpring({
      from: {
        opacity: 0,
        transform: 'translate3d(20px, 0, 0)',
      },
      to: {
        opacity: props.in ? 1 : 0,
        transform: `translate3d(${props.in ? 0 : 20}px, 0, 0)`,
      },
    });
  
    return (
      <animated.div style={style}>
        <Collapse {...props} />
      </animated.div>
    );
  }

export default function ProgramEditor() {
  const dispatch = useAppDispatch();
  const objects = useAppSelector(state => state.code.objects);

  return (
      <Container sx={{py: "15px"}}>
          <TreeView
              aria-label="file system navigator"
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
              sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
              >
              <TreeItem nodeId="1" label="Objects">
                  {objects.map((object) => (
                      <TreeItem nodeId="0" label={object.name} onDoubleClick={() => dispatch(openObjectWindow(object))}/>
                  ))}
              </TreeItem>
              <TreeItem nodeId="5" label="Scripts">
              </TreeItem>
          </TreeView>
      </Container>
  )
}
