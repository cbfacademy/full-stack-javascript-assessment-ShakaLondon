import { useCallback, useEffect, useState } from "react";
import { Container, PageContainerRef } from "../../../components/utils/containers";
import { ViewPage } from "../../../components/utils/pages";
import { DropImage } from '../../../components/draggables/drop-image';
import { dragItemTypes } from '../../../hooks/drag-hooks'
import { getCurrentGame, updateGameRecords } from "../../../redux/slices/game-status-slice";
import { useDispatch, useSelector } from "react-redux";
import { loading } from "../../../redux/slices/app-state-slice";


const ShapeSnap = () => {

    const appDispatch = useDispatch()
    const loadingState = useSelector((state) => state.appState.loading )
    const gameAssetsState = useSelector((state) => state.gameState.gameAssets )
    // console.log(shapesState)
    const [itemTypes, setItemTypes] = useState( null )
    const [itemSize, setItemSize] = useState( null )

    const getCurrentGameInfo = async (gameName) => {
        const currentGame = await appDispatch(getCurrentGame(gameName) )
        appDispatch(loading(false))
        if (currentGame.payload) {
            console.log(loadingState, itemTypes, currentGame)
        setItemTypes(() => currentGame.payload.gameAssets );
        }
    };

    const getItemSize = ( elementID ) => {
        console.log(itemTypes, elementID)
        const imgWrapper = document.getElementById(elementID);
        console.log(imgWrapper)
        const myObserver = new ResizeObserver(entries => {
            entries.forEach(entry => {
                setItemSize(() => ({
                    width: entry.contentRect.width,
                    height: entry.contentRect.height,
                }))
            });
        });
        if (imgWrapper)
        myObserver.observe(imgWrapper)
    };


    useEffect(() => {
        getCurrentGameInfo('shape-snap')
    }, []); 

    const getItemOffset = useCallback(
        (left, top, itemID) => {
            appDispatch( updateGameRecords({ left:left, top:top, itemID:itemID }) ) 
        },
        [gameAssetsState],
      )

    return (
        <>
        { !loadingState && gameAssetsState && <ViewPage nameID='shape-snap-page' flex justify='center'>
            <PageContainerRef nameID='shape-snap-page-cont' size='size' flex justify='center' align='center'>
                <Container flex justify='center'>
                    {gameAssetsState && gameAssetsState.map((item, key) => (
                        console.log(item),
                        <DropImage key={`${item.imagePath}-${key}`} getItemOffset={ getItemOffset } dropItem={ item } dragItem={ item.dragSourcePath } dragSrc={ item.dragSourcePath.imagePath } getItemSize={ getItemSize } itemSize={ itemSize } align='self-center' justify='center'/>
                    ))}
                </Container>
            </PageContainerRef>
      </ViewPage>
      }
      </>
    )
};
  
export default ShapeSnap;