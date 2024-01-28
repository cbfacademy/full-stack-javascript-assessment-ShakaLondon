import { Container, Box } from "./utils/containers";
import { ReactComponent as CircleArrowLeft } from '../assets/svg/circle-arrow-left.svg'
import { ReactComponent as MenuBars } from '../assets/svg/menu-bars.svg'
import { ReactComponent as ProfileCircle } from '../assets/svg/profile-circle.svg'
import { ReactComponent as CrossExit } from '../assets/svg/cross-exit.svg'
import { ReactComponent as ArrowLeft } from '../assets/svg/arrow-left.svg'
import { menuOpen, profileOpen } from "../redux/slices/app-state-slice";
import { useDispatch, useSelector } from "react-redux";
import { SVGLink } from "./utils/svg-link";
import { usePathString } from "../hooks/location-path-hooks";

export const Navbar = () => {

    
    const profileOpenState = useSelector((state) => state.appState.profileOpen)
    const menuOpenState = useSelector((state) => state.appState.menuOpen)
    // const pathname = usePathString()

    const appDispatch = useDispatch()

    return (
            <Container nameID='nav-bar-cont' flex size='width' height='5rem' justify='between' align='center' classes='fixed-top px-1'>
                <Box nameID='nav-bar-box' flex justify='center' align='center'>
                {/* {( pathname === 'register-child' ) && <SVGLink nameID='circle-arrow-left-register' link='register' classes='svg-link-background button align-center rounded' height='2rem' width='1rem'>
                         <ArrowLeft height="1rem" width="1rem" />
                </SVGLink>
                } */}
                { profileOpenState && <SVGLink nameID='circle-arrow-left-profile' link='home' classes='svg-link-background button align-center rounded' height='2rem' width='1rem' click={ () => appDispatch( profileOpen(false) )} >
                         <ArrowLeft height="1rem" width="1rem" className='svg-icon' />
                </SVGLink>
                }
                </Box>
                <Box flex justify='end' align='center'>
                { !profileOpenState  && !menuOpenState && <SVGLink nameID='profile-circle' link='profile'  click={ () => appDispatch( profileOpen(true) )} >
                        <ProfileCircle height='5rem' width='5rem' className='svg-icon'/>
                    </SVGLink>
                }
                { !menuOpenState  && <SVGLink nameID='menu-bars' >
                    <MenuBars className='svg-icon' onClick={ () => appDispatch( menuOpen() )} />
                </SVGLink>
                }
                {  menuOpenState  && <SVGLink nameID='cross-exit' >
                    <CrossExit className='svg-icon' onClick={ () => appDispatch( menuOpen())} />
                </SVGLink> 
                }
                </Box>
            </Container>
    )
};