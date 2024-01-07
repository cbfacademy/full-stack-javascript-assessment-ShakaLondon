import { Column, Container, PageContainer } from '../../components/utils/containers';
import { ViewPage } from '../../components/utils/pages'
import { ProfileHeader } from '../../components/profile-page/profile-header'
import { ProfileFormOne } from '../../components/profile-page/profile-form-one'

const ProfilePage = () => {
    return (
        <ViewPage nameID='profile-page' flex classes=''>
          <PageContainer flex  height='40vh' justify='center' align='center'>
            {/* <Column small={16} med={16} large={16}> */}
              <ProfileHeader/>
            {/* </Column> */}
          </PageContainer>
          <PageContainer flex height='60vh' justify='center' align='center'>
            <Column flex classes='bg-grey-one' small={8} med={8} large={8} align='baseline' justify='start'>
            </Column>
            <Column classes='' small={8} med={8} large={8} justify='center' align='center'>
            </Column>
          </PageContainer>
        </ViewPage>
      );
  };
  
export default ProfilePage;