import { useState } from 'react';
import { useDrag } from 'react-dnd'

export const DragImage = ({ children, nameID=null, dragItem, getItemOffset, src='', alt='', height=null, width=null, classes='', imgClasses='', align=null, justify=null }) => {

    const [itemDropped, setItemDropped] = useState( null );
    const [itemOffset, setItemOffset] = useState( null );
    
    const [{diffOffset, isDragging, dropComplete, check}, drag] = useDrag(() => ({
        type: dragItem.type,
        item: dragItem,
        collect: monitor => ({
          isDragging: !!monitor.isDragging(),
          dropComplete: !!monitor.getDropResult(),
          diffOffset: monitor.getDifferenceFromInitialOffset(),
        }),
        end: ( item, monitor ) => {
            const dropResult = monitor.getDropResult();
            const clientOffset = monitor.getSourceClientOffset()
            if (dropResult === null) {
              getItemOffset(clientOffset.x, clientOffset.y, item.name)
            }
            dropResult ? setItemDropped(() => true) : setItemDropped(() => false)
        }
      }),
      [dragItem]);

      const getItemStyles = ((dragItem, diffOffset) => {

        const transform = diffOffset ? diffOffset : { x:0, y:0 }
        return { 
          top: dragItem.top,
          left: dragItem.left,
          height: height, 
          width: width, 
          transform: `translate(${transform.x}px, ${transform.y}px)`,
          cursor: 'move',
          zIndex: 999 
      }
      })

      if (isDragging) {
        return <div ref={drag} />
      }

    return (
        <>
            { ( dropComplete ) || ( !isDragging ) && 
            <img
            id={ nameID } 
            src={ src } 
            alt={ alt } 
            className={ imgClasses + 'absolute' } 
            ref={ drag }
            style={getItemStyles(dragItem, diffOffset)} />
             } 
        </>
    );
};