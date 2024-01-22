import { Column, PageContainer } from '../../components/utils/containers';
import { ViewPage } from '../../components/utils/pages'
import { ProfileHeader } from '../../components/profile-page/profile-header'
import { ProfileFormOne } from '../../components/profile-page/profile-form-one'

const ProfilePage = () => {
    return (
        <ViewPage nameID='profile-page' flex classes=''>
          <PageContainer nameID='profile-page-header-cont' flex  height='40vh' justify='center' align='center'>
              <ProfileHeader/>
          </PageContainer>
          <PageContainer nameID='profile-page-form-cont' flex height='60vh' justify='center' align='center'>
            <Column nameID='profile-page-header-col-1' flex small={8} med={8} large={8} align='baseline' justify='start'>
              <ProfileFormOne/>
            </Column>
            <Column nameID='profile-page-header-col-2' classes='' small={8} med={8} large={8} justify='center' align='center'>
            </Column>
          </PageContainer>
        </ViewPage>
      );
  };
  
export default ProfilePage;