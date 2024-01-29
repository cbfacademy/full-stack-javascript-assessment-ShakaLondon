import { useDragLayer } from 'react-dnd'

export const CustomDragLayer = ({ itemSize }) => {
  const { itemType, isDragging, item, initialOffset, currentOffset } =
    useDragLayer((monitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
    }))

    const layerStyles = {
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 1030,
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
      }
      function getItemStyles(initialOffset, currentOffset) {
        if (!initialOffset || !currentOffset) {
          return {
            display: 'none',
          }
        }
        let { x, y } = currentOffset
        console.log(x, y)
       
        const transform = `translate(${x-367}px, ${y}px)`
        return {
          transform,
          WebkitTransform: transform,
        }
      }
      
  function renderItem() {
    console.log(item, itemType)
    switch (true) {
      case /^drag/.test(itemType):
        console.log(item)
        return <img src={ item.imagePath } style={{ width: itemSize.width, height: itemSize.height }}/>
      default:
        return null
    }
  }
  if (!isDragging) {
    return null
  }
  return (
    <div style={layerStyles}>
      <div
        style={getItemStyles(initialOffset, currentOffset)}
      >
        {renderItem()}
      </div>
    </div>
  )
}
