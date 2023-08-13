import AppBarBottom from './AppBarBottom';
import AppBarTop from './AppBarTop';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export default function GUI() {
  return (
    <DndProvider backend={HTML5Backend}>
      <AppBarTop />
      <AppBarBottom />
    </DndProvider>
  )
}