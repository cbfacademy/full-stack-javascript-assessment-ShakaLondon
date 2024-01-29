import { useSelector } from "react-redux";
import { PrimaryButton } from "../../components/utils/buttons";
import { Container, PageContainer } from "../../components/utils/containers";
import { ViewPage } from "../../components/utils/pages";
import { Text } from "../../components/utils/text";


const LandingPage = () => {
    const loggedInState = useSelector((state) => state.userState.loggedIn)
    return (
        <ViewPage nameID='home-page' flex justify='center'>
            <PageContainer nameID='home-page-cont' flex size='size' justify='center' align='center'>
                <Container nameID='home-page-cont-1' flex size='width' justify='center' align='center'>
                <Text size='p1' nameID='dynamo-header'>
                    Dynamo
                    </Text>
                </Container>
                <Container nameID='home-page-cont-2' flex size='width' justify='center' align='center'>
                <Text size='p4' nameID='dynamo-header'>
                    Learning App
                    </Text>
                </Container>
                    <PrimaryButton link={ loggedInState ? 'games/shape-snap' : 'login' } classes="mt-4">
                        Get Started
                    </PrimaryButton>
            </PageContainer>
      </ViewPage>
    )
};
  
export default LandingPage;