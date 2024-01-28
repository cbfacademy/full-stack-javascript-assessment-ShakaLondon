import { memo, useState } from 'react';
import { useDrop } from 'react-dnd'
import { BoxRef } from "../utils/containers";
import { DragImage } from './drag-image';

export const DropImage = memo(({ children, nameID=null, dragItem, getItemSize, itemSize, getItemOffset, dropItem, dragSrc='', alt='', height=null, width=null, classes='', imgClasses='', align=null, justify=null }) => {

    const [itemDropped, setItemDropped] = useState( false );
    
    const [{ isOver }, dropRef] = useDrop({
        accept: dragItem.imageTag,
        drop:(item) => {
            setItemDropped(() => item)
            return {}
        },
        collect: (monitor) => ({
            isOver: monitor.isOver()
        }),
    });
console.log('hello')

    return (
        <div>
        { dragItem && itemSize && <DragImage nameID={ dragItem.imageName } src={ dragSrc } dragItem={ dragItem } getItemOffset={ getItemOffset } height={ `${itemSize.height}px` } width={ `${itemSize.width}px` } classes='absolute' />}
        <BoxRef id={ nameID } height={ height } width={ width } align={ align } justify={ justify } classes={ `shapeSize ${classes}`}>
            <img 
            id={ dropItem.imageName }
             ref={ dropRef }
            src={ itemDropped !== false ? dragItem.imagePath : dropItem.imagePath } 
            alt={ alt } 
            className={ imgClasses + ' shapeSize ' } 
            style={{ 
                height: height, 
                width: width, 
            }}
            onLoad={ (e) => getItemSize(dropItem.imageName)}
          /> 
        </BoxRef>
        </div>
    );
    });