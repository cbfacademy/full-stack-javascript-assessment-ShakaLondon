import FilesUploadComponent from "../file-upload/file-upload-component";
import { Container, PageContainer } from "../utils/containers";
import { FormGroup, FormFloatingInput, FormInput } from "../utils/form";

export const ProfileFormTwo = ({ handleChange, getUser, addFile, handleSubmitPassword, handleSubmitImage }) => {
    return (
        <Container nameID='profile-form-two-cont' flex size='size' classes=' ps-1 mt-1' justify='center' align='content-start'>
            <FilesUploadComponent nameID='profile-page-image-input' addFile={ addFile } handleSubmitImage={ handleSubmitImage } />
        <FormGroup nameID='profile-form-two-form' classes='flex-column mt-2' justify='start' align='center' width='90%' onSubmit={ handleSubmitPassword }>
            <FormFloatingInput nameID='profile-form-two-password' type='password' value={ getUser?.password } placeholder='Enter your existing password here' label='Current Password' inputName='password' handleChange={ handleChange }/>
            <FormFloatingInput nameID='profile-form-two-new-password' type='password' value={ getUser?.newPassword } placeholder='Enter your new password here' label='New Password' inputName='newPassword' handleChange={ handleChange }/>
            <FormInput nameID='profile-form-two-new-btn' type='submit' value='Update Password' classes='mt-1'/>
        </FormGroup>
        </Container>
    )
};