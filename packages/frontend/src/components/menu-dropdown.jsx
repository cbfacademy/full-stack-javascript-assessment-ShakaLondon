import { Container, Box } from "./utils/containers";
import { ReactComponent as CircleArrowLeft } from '../assets/svg/circle-arrow-left.svg'
import { ReactComponent as MenuBars } from '../assets/svg/menu-bars.svg'
import { ReactComponent as ProfileCircle } from '../assets/svg/profile-circle.svg'
import { ReactComponent as CrossExit } from '../assets/svg/cross-exit.svg'
import { getProfileState } from "../redux/slices/app-state-slice";
import { useSelector } from "react-redux";
import { navigateTo } from "../hooks/location-path-hooks";
import { SVGLink } from "./utils/svg-link";

export const MenuDrop = () => {

    const menuOpenState = useSelector((state) => state.appState.menuOpen)

    return (
        <>
            { menuOpenState &&
                <Container flex size='height' width='33vw' justify='between' align='start' classes='fixed bg-grey-one right'>
                    <Box flex>
                        {/* <SVGLink link='home' >
                            { profileOpenState && <CircleArrowLeft className='svg-icon' onClick={ () => navigateTo('home')} />}
                        </SVGLink>
                    </Box>
                    <Box flex>
                        <SVGLink link='profile' >
                            { !profileOpenState  && <ProfileCircle className='svg-icon' onClick={ () => navigateTo('profile')} />}
                        </SVGLink>
                        { !profileOpenState  && <MenuBars className='svg-icon' onClick={ () => navigateTo('')} />}
                        { !profileOpenState  && <CrossExit className='svg-icon' onClick={ () => navigateTo('')} />} */}
                    </Box>
                </Container>
            }
        </>
    )
};