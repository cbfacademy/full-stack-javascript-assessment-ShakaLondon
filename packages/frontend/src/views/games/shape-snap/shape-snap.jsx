import { useCallback, useEffect, useState } from "react";
import { Container, PageContainerRef } from "../../../components/utils/containers";
import { ViewPage } from "../../../components/utils/pages";
import { DropImage } from '../../../components/draggables/drop-image';
import { dragItemTypes } from '../../../hooks/drag-hooks'


const ShapeSnap = () => {
    // const getItemTypesList = async (itemTypes) => {
    
    //     const keys = Object.values(itemTypes)
    //     const typeList = keys.map((shape) => {
    //         return shape.type
    //     })
    //     console.log(typeList)

    //     return typeList

    //   }

    const [itemTypes, setItemTypes] = useState( dragItemTypes.SHAPES )
    const [getItemSize, setItemSize] = useState( null )
    // const [itemTypesList, setItemTypesList] = useState('')

    // useEffect(() => {
    //     setItemTypesList( () => getItemTypesList(itemTypes) )
    // }, [itemTypes]); 

    useEffect(() => {
      const imgWrapper = document.getElementById(`DRAGTRIANGLE`);
      const myObserver = new ResizeObserver(entries => {
          entries.forEach(entry => {
              setItemSize(() => ({
                  width: entry.contentRect.width,
                  height: entry.contentRect.height,
              }))
          });
      });
      myObserver.observe(imgWrapper)
  }, []); 

    const getItemOffset = useCallback(
        (left, top, itemName) => {
            setItemTypes(() => ({ ...itemTypes, 
              [`${itemName}`]: { ...itemTypes[`${itemName}`], left: left, top: top },
            }))
        },
        [itemTypes, setItemTypes],
      )

    return (
        <ViewPage nameID='shape-snap-page' flex justify='center'>
            <PageContainerRef nameID='shape-snap-page-cont' size='size' flex justify='center' align='center'>
                <Container flex justify='center'>
                    {Object.keys(itemTypes).map((key) => (
                        <DropImage key={key} getItemSize={ getItemSize } getItemOffset={ getItemOffset } src={ itemTypes[`${key}`].dropSrc } dragItem={ itemTypes[`${key}`] } dragSrc={ itemTypes[`${key}`].path } align='self-center' justify='center'/>
                    ))}
                </Container>
            </PageContainerRef>
      </ViewPage>
    )
};
  
export default ShapeSnap;