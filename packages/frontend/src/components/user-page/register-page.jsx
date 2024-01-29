import { PageContainer } from '../utils/containers';
import { FormGroup, FormFloatingInput } from '../utils/form';
import { SVGLink } from '../utils/svg-link';
import { navigateTo } from '../../hooks/location-path-hooks';
import { ReactComponent as ArrowRight } from '../../assets/svg/arrow-right.svg'

const RegisterPage = ({ handleChange, getUser }) => {

    return (
          <PageContainer nameID='register-page-cont' flex size='size' classes='flex-column' justify='center' align='center'>
            <FormGroup nameID='register-page-form' classes='flex-column register-form' justify='center' align='center' onSubmit={ navigateTo('/register-child') } >
            <FormFloatingInput nameID='register-page-name' type='text' value={ getUser?.name } placeholder='Enter parents name' label='Name' inputName='name' handleChange={ handleChange }/>
            <FormFloatingInput nameID='register-page-surname' type='text' value={ getUser?.surname } placeholder='Enter parents surname' label='Surname' inputName='surname' handleChange={ handleChange }/>
            <FormFloatingInput nameID='register-page-username' type='text' value={ getUser?.username } placeholder='Enter your username here' label='Username' inputName='username' handleChange={ handleChange }/>
            <FormFloatingInput nameID='register-page-dateOfBirth' type='date' value={ getUser?.dateOfBirth } placeholder='Enter your date of birth' label='Date of Birth' inputName='dateOfBirth' handleChange={ handleChange }/>
                <FormFloatingInput nameID='register-page-email' type='email' value={ getUser?.email } placeholder='Enter your email here' label='Email' inputName='email' handleChange={ handleChange }/>
                <FormFloatingInput nameID='register-page-password' type='password' value={ getUser?.password } placeholder='Enter your password here' label='Password' inputName='password' handleChange={ handleChange }/>
                <SVGLink nameID='register-page-next-btn' link='register-child' classes='svg-link-background button align-center rounded' height='2rem' width='1rem'>
                        <ArrowRight height="1rem" width="1rem" className=""/>
                    </SVGLink>
            </FormGroup>
          </PageContainer>
      );
  };
  
export default RegisterPage;