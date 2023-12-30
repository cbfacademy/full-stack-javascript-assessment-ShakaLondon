import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { PrimaryButton } from '../../components/utils/buttons';
import { Container } from '../../components/utils/containers';
import { ViewPage } from '../../components/utils/pages'
// import { usePathString } from '../../hooks/location-path-hooks';
// import { useAppDispatch } from '../../hooks/redux-hooks';
// import { profileOpen } from '../../redux/slices/app-state-slice'

const ProfilePage = () => {
    return (
        <ViewPage nameID='profile-page' flex >
          <Container flex size='size'>
            <h>Oops!</h>
            <p5 className='py-half'>Sorry, an unexpected error has occurred.</p5>
            <p>
              {/* <i>{error.statusText || error.message}</i> */}
            </p>
            <PrimaryButton classes='bg-grey-one white' link='home' >Go Home</PrimaryButton>
          </Container>
        </ViewPage>
      );
  };
  
export default ProfilePage;