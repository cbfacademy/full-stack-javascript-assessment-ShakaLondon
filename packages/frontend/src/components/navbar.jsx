import { Container, Box, PageContainer } from "./utils/containers";
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
            <Container nameID='nav-bar-cont' flex size='width' height='5rem' justify='between' align='center' classes='fixed-top px-1'>
                <Box nameID='nav-bar-box' flex justify='center' align='center'>
                { profileOpenState && <SVGLink nameID='circle-arrow-left' link='home' >
                         <CircleArrowLeft className='svg-icon' />
                </SVGLink>
                }
                </Box>
                <Box flex justify='end' align='center'>
                { !profileOpenState  && !menuOpenState && <SVGLink nameID='profile-circle' link='profile' >
                        <ProfileCircle height='5rem' width='5rem' className='svg-icon' />
                    </SVGLink>
                }
                { !profileOpenState && !menuOpenState  && <SVGLink nameID='menu-bars' >
                    <MenuBars className='svg-icon' onClick={ () => appDispatch( menuOpen(true) )} />
                </SVGLink>
                }
                { !profileOpenState && menuOpenState  && <SVGLink nameID='cross-exit' >
                    <CrossExit className='svg-icon' onClick={ () => appDispatch( menuOpen(false))} />
                </SVGLink> 
                }
                </Box>
            </Container>
    )
};