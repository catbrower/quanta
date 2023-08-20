import AppBarBottom from './AppBarBottom';
import AppBarTop from './AppBarTop';
import { DragDropContext } from "react-beautiful-dnd";

export default function GUI() {
  // a little function to help us with reordering the result
  const reorder = (list: any, startIndex: any, endIndex: any) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    // const items = reorder(
    //   this.state.items,
    //   result.source.index,
    //   result.destination.index
    // );

    // this.setState({
    //   items
    // });
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <AppBarTop />
      <AppBarBottom />
    </DragDropContext>
  )
}