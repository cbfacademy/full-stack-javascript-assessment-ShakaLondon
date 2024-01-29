import { useState } from 'react';
import { ViewPage } from '../../components/utils/pages'
import { useDispatch, useSelector } from 'react-redux';
import { userLogin, userRegister } from '../../redux/slices/user-state-slice';
import { navigateTo, usePathString } from '../../hooks/location-path-hooks';
import RegisterPage from '../../components/user-page/register-page';
import LoginPage from '../../components/user-page/login-page';
import RegisterChildPage from '../../components/user-page/register-child-page';

const UserPage = () => {
    const [getUser, setUser] = useState({
        name: "",
        surname: "",
        username: "",
        dateOfBirth: "",
          email: "",
          password: "",
          childsName: "",
          childDateOfBirth: "",
        });

        const path = usePathString()
  
      const appDispatch = useDispatch()
      const loggedInState = useSelector((state) => state.userState.loggedIn)
  
      const handleSubmit = async (e) => {
            e.preventDefault();
            switch (path) {
                case "register-child":
                    appDispatch(userRegister( getUser ))
                    return navigateTo('profile')
                    break;
                case "login":
                    appDispatch(userLogin({ email: getUser.email, password: getUser.password}))
                    return navigateTo('profile')
                    break;
                default:
                    break;
            }
        };
      
        const handleChange = (event) => {
            const { name, value } = event.target;
            setUser({ ...getUser, [`${name}`]: value });
        };

    return (
        <ViewPage nameID='user-page' flex justify='center'>
            {path === "register-child" ? (
                <RegisterChildPage getUser={ getUser } handleChange={ handleChange } handleSubmit={ handleSubmit } />
            ) : path === "login" ? (
                <LoginPage getUser={ getUser } handleChange={ handleChange } handleSubmit={ handleSubmit } />
            ) : path === "register" ? (
                <RegisterPage getUser={ getUser } handleChange={ handleChange } />
            ) : null }
        </ViewPage>
    );
  };
  
export default UserPage;