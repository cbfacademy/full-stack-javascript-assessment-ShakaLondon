import { memo, useEffect, useState } from 'react';
import { useDrop } from 'react-dnd'
import { BoxRef } from "../utils/containers";
import { DragImage } from './drag-image';

export const DropImage = memo(({ children, nameID=null, dragItem, getItemSize, getItemOffset, src='', dragSrc='', alt='', height=null, width=null, classes='', imgClasses='', align=null, justify=null }) => {

    const [itemDropped, setItemDropped] = useState( false );
    
    const [{ isOver }, dropRef] = useDrop({
        accept: dragItem.type,
        drop:(item) => {
            setItemDropped(() => item)
            return {}
        },
        collect: (monitor) => ({
            isOver: monitor.isOver()
        }),
    });


    return (
        <div>
        { dragItem && getItemSize && <DragImage nameID={ dragItem.name } src={ dragSrc } dragItem={ dragItem } getItemOffset={ getItemOffset } height={ `${getItemSize.height}px` } width={ `${getItemSize.width}px` } classes='absolute' />}
        <BoxRef id={ nameID } height={ height } width={ width } align={ align } justify={ justify } classes={ `shapeSize ${classes}`}>
            <img 
            id={ dragItem.name }
             ref={ dropRef }
            src={ itemDropped !== false ? dragItem.path : src } 
            alt={ alt } 
            className={ imgClasses + ' shapeSize ' } 
            style={{ 
                height: height, 
                width: width, 
            }}
          /> 
        </BoxRef>
        </div>
    );
    });