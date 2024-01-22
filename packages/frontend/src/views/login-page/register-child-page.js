import { useDispatch, useSelector } from 'react-redux';
import { PageContainer } from '../../components/utils/containers';
import { FormGroup, FormFloatingInput, FormInput } from '../../components/utils/form';
import { navigateTo } from '../../hooks/location-path-hooks';
import { profileOpen } from '../../redux/slices/app-state-slice';

const RegisterChildPage = ({ handleChange, getUser, handleSubmit }) => {

  const loggedInState = useSelector((state) => state.userState.loggedIn)
  const appDispatch = useDispatch()

  if (loggedInState) { 
    appDispatch(profileOpen(true))
    return navigateTo('profile')
  }

    return (
          <PageContainer nameID='register-child-page-cont' flex size='size' classes='flex-column' justify='center' align='center'>
            <FormGroup nameID='register-child-page-form' classes='flex-column' justify='center' align='center' width='50%' onSubmit={ handleSubmit }>
                <FormFloatingInput nameID='register-child-page-name' type='text' value={ getUser.childsName } placeholder='Enter your childs name here' label="Child's name" inputName='childsName' handleChange={ handleChange }/>
                <FormFloatingInput nameID='register-child-page-dateOfBirth' type='date' value={ getUser.childDateOfBirth } placeholder='Enter your childs date of birth' label='Date of birth' inputName='childDateOfBirth' handleChange={ handleChange }/>
                <FormInput nameID='register-child-page-btn' type='submit' value='Register' />
            </FormGroup>
          </PageContainer>
      );
  };
  
export default RegisterChildPage;