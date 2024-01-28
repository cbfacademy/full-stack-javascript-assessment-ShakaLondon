import { useEffect, useState } from 'react';
import { useDrag } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend';

export const DragImage = ({ children, nameID=null, dragItem, getItemOffset, src='', alt='', height=null, width=null, classes='', imgClasses='', align=null, justify=null }) => {

    const [itemDropped, setItemDropped] = useState( false );
    const [itemOffset, setItemOffset] = useState( null );
    
    const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
        type: dragItem.imageTag,
        item: dragItem,
        collect: monitor => ({
          isDragging: !!monitor.isDragging(),
          dropComplete: !!monitor.getDropResult(),
          didDrop: monitor.didDrop(),
        }),
        end: ( item, monitor ) => {
            const dropResult = monitor.getDropResult();
            const clientOffset = monitor.getSourceClientOffset()
            console.log(item, clientOffset)
            if (dropResult === null) {
              getItemOffset(clientOffset.x, clientOffset.y, item._id)
            }
            console.log(dropResult)
            dropResult ? setItemDropped(() => true) : setItemDropped(() => false)
        }
      }),
      [dragItem]);

      useEffect(() => {
        dragPreview(getEmptyImage(), { captureDraggingState: true })
      }, [isDragging])

      const getItemStyles = ((dragItem, isDragging) => {

        return { 
          top: dragItem.dragLocation.top,
          left: dragItem.dragLocation.left,
          height: height, 
          width: width, 
          opacity: isDragging ? 0 : 1,
          cursor: 'move',
          zIndex: 999 
      }
      })

    return (
        <>
            { !itemDropped && 
            <img
            id={ nameID } 
            src={ src } 
            alt={ alt } 
            className={ imgClasses + 'absolute' } 
            ref={ drag }
            style={getItemStyles(dragItem, isDragging)} />
             } 
        </>
    );
};