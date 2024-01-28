import { Container, PageContainer } from "../utils/containers";
import { FormGroup, FormFloatingInput } from "../utils/form";

export const ProfileFormOne = ({ handleChange, getUser }) => {
    return (
        <Container nameID='profile-form-one-cont' flex size='size' classes='flex-column' justify='center' align='center'>
        <FormGroup nameID='profile-form-one-form' classes='flex-column' justify='center' align='center' width='50%'>
        <FormFloatingInput nameID='profile-form-one-name' type='text' value={ getUser?.name } placeholder='Enter parents name' label='Name' inputName='name' handleChange={ handleChange }/>
        <FormFloatingInput nameID='profile-form-one-surname' type='text' value={ getUser?.surname } placeholder='Enter parents surname' label='Surname' inputName='surname' handleChange={ handleChange }/>
        <FormFloatingInput nameID='profile-form-one-username' type='text' value={ getUser?.username } placeholder='Enter your username here' label='Username' inputName='username' handleChange={ handleChange }/>
        <FormFloatingInput nameID='profile-form-one-dateOfBirth' type='date' value={ getUser?.dateOfBirth } placeholder='Enter your date of birth' label='Date of Birth' inputName='dateOfBirth' handleChange={ handleChange }/>
            <FormFloatingInput nameID='profile-form-one-email' type='email' value={ getUser?.email } placeholder='Enter your email here' label='Email' inputName='email' handleChange={ handleChange }/>
            <FormFloatingInput nameID='profile-form-one-password' type='password' value={ getUser?.password } placeholder='Enter your password here' label='Password' inputName='password' handleChange={ handleChange }/>
        </FormGroup>
        </Container>
    )
};