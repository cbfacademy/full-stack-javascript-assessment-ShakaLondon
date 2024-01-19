import { Container, Box } from "./utils/containers";
import { useSelector } from "react-redux";

export const MenuDrop = () => {

    const menuOpenState = useSelector((state) => state.appState.menuOpen)

    return (
        <>
            { menuOpenState &&
                <Container nameID='menu-dropdown-cont' flex size='height' width='33vw' justify='between' align='start' classes='fixed bg-grey-one right'>
                    <Box nameID='menu-dropdown-box' flex justify='center' align='center'>
                    </Box>
                </Container>
            }
        </>
    )
};