import { PrimaryButton } from '../../components/utils/buttons';
import { PageContainer } from '../../components/utils/containers';
import { ViewPage } from '../../components/utils/pages'

const ErrorPage = () => {
    return (
        <ViewPage nameID='error-page' flex justify='center'>
          <PageContainer nameID='error-page-cont' flex size='size' classes='flex-column' justify='center' align='center'>
            <p className='h'>Oops!</p>
            <p className='py-half p5'>Sorry, an unexpected error has occurred.</p>
            <p>
              {/* <i>{error.statusText || error.message}</i> */}
            </p>
            <PrimaryButton nameID='error-page-btn' link='home' >Go Home</PrimaryButton>
          </PageContainer>
        </ViewPage>
      );
  };
  
export default ErrorPage;