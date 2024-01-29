import { menuOpen } from "../redux/slices/app-state-slice";
import { logout } from "../redux/slices/user-state-slice";
import { PrimaryButton } from "./utils/buttons";
import { Container } from "./utils/containers";
import { useDispatch, useSelector } from "react-redux";

export const MenuDrop = () => {

    const menuOpenState = useSelector((state) => state.appState.menuOpen)
    const loggedInState = useSelector((state) => state.userState.loggedIn)
    const appDispatch = useDispatch()

    const menuHandleClick = (dispatchFunction) => {
        if (dispatchFunction) {
        appDispatch(dispatchFunction);
        };
        appDispatch(menuOpen(false));
    };

    return (
        <>
            { menuOpenState &&
                <Container nameID='menu-dropdown-cont' flex size='height' width='33vw' justify='center' align='content-end' classes='fixed bg-grey-one right pb-5'>
                    <Container nameID='menu-dropdown-box' justify='center' align='center' >
                    <PrimaryButton nameID='menu-drop-login-btn' link={ !loggedInState ? 'login' : 'home' } width='60%' classes='mt-1 button-invert' click={ () => !loggedInState ? menuHandleClick() : menuHandleClick( logout() ) } >
                    { !loggedInState ? 'Login' : 'Logout' }
                </PrimaryButton>
                </Container>
                <Container nameID='menu-dropdown-box' justify='center' align='center' >
                { !loggedInState && <PrimaryButton nameID='menu-drop-register-btn' link='register' width='60%' classes='mt-1 button-invert' click={ () => menuHandleClick() } >
                    Register
                </PrimaryButton>}
                </Container>
                </Container>
            }
        </>
    )
};