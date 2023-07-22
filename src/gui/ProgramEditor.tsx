import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Container } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../redux/Hooks";
import { openObjectWindow } from "../redux/GUISlice";

export default function ProgramEditor() {
  const dispatch = useAppDispatch();
  const objects = useAppSelector(state => state.code.program.objects);

  return (
    <Container sx={{ py: "15px" }}>
      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
      >
        <TreeItem nodeId="1" label="Objects">
          {objects.map((object) => (
            <TreeItem nodeId={object.id} key={object.id} label={object.name} onDoubleClick={() => dispatch(openObjectWindow(object))} />
          ))}
        </TreeItem>
        <TreeItem nodeId="5" label="Scripts">
        </TreeItem>
      </TreeView>
    </Container>
  )
}
