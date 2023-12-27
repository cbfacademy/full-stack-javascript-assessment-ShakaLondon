import { PrimaryButton } from '../../components/utils/buttons';
import { Container } from '../../components/utils/containers';
import { ViewPage } from '../../components/utils/pages'

const ErrorPage = () => {
    return (
        <ViewPage nameID='error-page' flex >
          <Container flex classes='flex-column'>
            <h>Oops!</h>
            <p5 className='py-half'>Sorry, an unexpected error has occurred.</p5>
            <p>
              {/* <i>{error.statusText || error.message}</i> */}
            </p>
            <PrimaryButton classes='bg-grey-one white'>Go Home</PrimaryButton>
          </Container>
        </ViewPage>
      );
  };
  
export default ErrorPage;