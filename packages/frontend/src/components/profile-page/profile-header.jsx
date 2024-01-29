import { Box, Column, Container } from "../utils/containers";
import { Image } from "../utils/image";
import { Text } from "../utils/text";

export const ProfileHeader = ({ getUser }) => {
    return (
        <Container nameID='profile-header' flex size='size' justify='center' align='center'>

            <Column nameID='profile-header-col-1' flex small={16} med={11} large={11} justify='end' align='start' classes='ps-3'>
                <Box flex height='250px' classes='flex-column' align='start' justify='center'>
                    <Text size='h3'>{getUser?.childsName}</Text>
                    <Text size='p5'>Child's Name</Text>
                </Box>
            </Column>
            <Column nameID='profile-header-col-2' flex small={16} med={5} large={5} justify='end' align='end' classes='pe-3'>
                <Box flex height='250px' justify='center' align='center'>
                    <Image src={getUser?.avatar} imgClasses='rounded profile-header-avatar' align='self-center' justify='center'/>
                </Box>
            </Column>
        </Container>
    )
};