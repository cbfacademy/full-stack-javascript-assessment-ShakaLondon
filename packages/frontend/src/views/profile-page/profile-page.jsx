import { Column, PageContainer } from '../../components/utils/containers';
import { ViewPage } from '../../components/utils/pages'
import { ProfileHeader } from '../../components/profile-page/profile-header'
import { ProfileFormOne } from '../../components/profile-page/profile-form-one'
import { useDispatch, useSelector } from 'react-redux';
import { navigateTo } from '../../hooks/location-path-hooks';
import { profileOpen } from '../../redux/slices/app-state-slice';
import { userLogin, userUpdate, userUpdateImage } from '../../redux/slices/user-state-slice';
import { useEffect, useState } from 'react';
import userData from '../../services/user/user-data';
import { ProfileFormTwo } from '../../components/profile-page/profile-form-two';
import { getDateFormat } from '../../hooks/get-date';

const ProfilePage = () => {

  const appDispatch = useDispatch()
  const loggedInState = useSelector((state) => state.userState.loggedIn)
  const userState = useSelector((state) => state.userState.user)

  const [getUser, setUser] = useState({
    name: userState?.name,
    surname: userState?.surname,
    username: userState?.username,
    dateOfBirth: getDateFormat( userState?.dateOfBirth ),
      email: userState?.email,
      password: '',
      newPassword: '',
      childsName: userState?.childsName,
      childDateOfBirth: userState?.childDateOfBirth,
      avatar: userState?.avatar.imagePath,
    });

    const [image, setImage] = useState({
    });

    useEffect(() => {
        appDispatch(profileOpen(true))
    }, [appDispatch])

    useEffect(() => {
  
      return () => {
        appDispatch(profileOpen(false))
      }
    }, [appDispatch])

  if (!loggedInState) { 
    appDispatch(profileOpen(false))
    return navigateTo('login')
  }


  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    userData.updatePassword(getUser.password, getUser.newPassword)
};

const handleSubmit = async (e) => {
  e.preventDefault();
  appDispatch(userUpdate( getUser ) )
};

const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...getUser, [`${name}`]: value });
};

const handleSubmitImage = (e) => {
  e.preventDefault();
  console.log(image);
    const fd = new FormData();
  fd.append("image", image);
  fd.append("imageName", `${getUser.name}-${getUser.surname}-${Date.now()}`);
  fd.append("imageTag", `${getUser.username}`);
  appDispatch( userUpdateImage(fd))
    // appDispatch( userUpdateImage({ image: image, imageName: `${getUser.name}-${getUser.surname}-${Date.now()}`, imageTag: `${getUser.username}`}));
};

const addFile = (e) => {
  const file = document.getElementById('profile-page-image-input').files[0];
  setImage(() => file);
};

    return (
        <ViewPage nameID='profile-page' flex classes=''>
          <PageContainer nameID='profile-page-header-cont' size='width' flex  height='40vh' justify='center' align='center'>
              <ProfileHeader getUser={ getUser }/>
          </PageContainer>
          <PageContainer nameID='profile-page-form-cont' size='width' flex height='60vh' justify='center' align='center' classes=''>
            <Column nameID='profile-page-header-col-1' flex small={16} med={8} large={8} align='baseline' justify='start'>
              <ProfileFormOne handleChange={ handleChange } handleSubmit={ handleSubmit } getUser={ getUser }/>
            </Column>
            <Column nameID='profile-page-header-col-2' classes='' small={16} med={8} large={8} justify='center' align='baseline'>
            <ProfileFormTwo handleChange={ handleChange } handleSubmitPassword={ handleSubmitPassword } handleSubmitImage={ handleSubmitImage } addFile={ addFile } getUser={ getUser }/>
            </Column>
          </PageContainer>
        </ViewPage>
      );
  };
  
export default ProfilePage;