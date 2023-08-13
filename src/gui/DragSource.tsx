import { memo, FC, ReactNode } from "react"
import { DragSourceMonitor, useDrag } from "react-dnd"

interface IDragSourceProps {
  style?: any,
  type: string,
  children?: ReactNode
}

export const DragSource: FC<IDragSourceProps> = memo(function DragSource({ style, type, children }) {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: type,
      canDrag: true,
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(),
      }),
    })
  )

  return (
    <div ref={drag} role="SourceBox" style={style}>
      {children}
    </div>
  )
})