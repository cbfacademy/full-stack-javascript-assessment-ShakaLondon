import { Container, PageContainer } from "../utils/containers";
import { FormGroup, FormFloatingInput, FormInput } from "../utils/form";

export const ProfileFormOne = ({ handleChange, getUser }) => {
    return (
        <Container nameID='profile-form-one-cont' flex size='size' classes='flex-column pe-1 mt-1' justify='center' align='content-end'>
        <FormGroup nameID='profile-form-one-form' classes='flex-column' justify='start' align='center' width='90%' onSubmit={ handleSubmit }>
        <FormFloatingInput nameID='profile-form-one-name' type='text' value={ getUser?.name } placeholder='Enter parents name' label='Name' inputName='name' handleChange={ handleChange }/>
        <FormFloatingInput nameID='profile-form-one-surname' type='text' value={ getUser?.surname } placeholder='Enter parents surname' label='Surname' inputName='surname' handleChange={ handleChange }/>
        <FormFloatingInput nameID='profile-form-one-username' type='text' value={ getUser?.username } placeholder='Enter your username here' label='Username' inputName='username' handleChange={ handleChange }/>
        <FormFloatingInput nameID='profile-form-one-dateOfBirth' isDisabled={ true } type='date' value={ getUser?.dateOfBirth } placeholder='Enter your date of birth' label='Date of Birth' inputName='dateOfBirth' handleChange={ handleChange }/>
            <FormFloatingInput nameID='profile-form-one-email' type='email' value={ getUser?.email } placeholder='Enter your email here' label='Email' inputName='email' handleChange={ handleChange }/>
            <FormInput nameID='profile-form-one-btn' type='submit' value='Update Details' classes='mt-1' />
        </FormGroup>
        </Container>
    )
};