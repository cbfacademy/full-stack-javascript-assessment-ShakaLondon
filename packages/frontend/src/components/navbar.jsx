import { Container, Box } from "./utils/containers";
import { ReactComponent as CircleArrowLeft } from '../assets/svg/circle-arrow-left.svg'
import { ReactComponent as MenuBars } from '../assets/svg/menu-bars.svg'
import { ReactComponent as ProfileCircle } from '../assets/svg/profile-circle.svg'
import { ReactComponent as CrossExit } from '../assets/svg/cross-exit.svg'
import { getProfileState, menuOpen } from "../redux/slices/app-state-slice";
import { useDispatch, useSelector } from "react-redux";
import { navigateTo } from "../hooks/location-path-hooks";
import { SVGLink } from "./utils/svg-link";

export const Navbar = () => {

    const appDispatch = useDispatch()

    const profileOpenState = useSelector((state) => state.appState.profileOpen)
    const menuOpenState = useSelector((state) => state.appState.menuOpen)

    return (
            <Container flex size='width' height='5rem' justify='between' classes='fixed-top'>
                <Box flex>
                    <SVGLink link='home' >
                        { profileOpenState && <CircleArrowLeft className='svg-icon' />}
                    </SVGLink>
                </Box>
                <Box flex>
                    <SVGLink link='profile' >
                        { !profileOpenState  && !menuOpenState && <ProfileCircle height='5rem' width='5rem' className='svg-icon' />}
                    </SVGLink>
                    { !menuOpenState  && <MenuBars className='svg-icon' onClick={ () => appDispatch( menuOpen(true) )} />}
                    { menuOpenState  && <CrossExit className='svg-icon' onClick={ () => appDispatch( menuOpen(false))} />}
                </Box>
            </Container>
    )
};