import { useCallback, useEffect, useState } from "react";
import { Container, PageContainerRef } from "../../../components/utils/containers";
import { ViewPage } from "../../../components/utils/pages";
import { DropImage } from '../../../components/draggables/drop-image';
import { dragItemTypes } from '../../../hooks/drag-hooks'


const ShapeSnap = () => {

    const [itemTypes, setItemTypes] = useState( dragItemTypes.SHAPES )
    const [getItemSize, setItemSize] = useState( null )
    // const [itemTypesList, setItemTypesList] = useState('')


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
                </Container>
            </PageContainerRef>
      </ViewPage>
    )
};
  
export default ShapeSnap;