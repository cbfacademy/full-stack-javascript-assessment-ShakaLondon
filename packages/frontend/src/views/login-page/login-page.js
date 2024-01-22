import { useState } from 'react';
import { PageContainer } from '../../components/utils/containers';
import { FormGroup, FormFloatingInput, FormInput } from '../../components/utils/form';
import { PrimaryButton } from '../../components/utils/buttons';

const LoginPage = ({ handleChange, getUser, handleSubmit }) => {

    return (
          <PageContainer nameID='login-page-cont' flex size='size' classes='flex-column' justify='center' align='center'>
            <FormGroup nameID='login-page-form' classes='flex-column' justify='center' align='center' width='50%' onSubmit={ handleSubmit }>
                <FormFloatingInput nameID='login-page-email' type='email' value={ getUser.email } inputName="email" placeholder='Enter your email here' label='Email' handleChange={ handleChange }/>
                <FormFloatingInput nameID='login-page-password' type='password' value={ getUser.password } inputName="password" placeholder='Enter your password here' label='Password' handleChange={ handleChange }/>
                <FormInput nameID='login-page-btn' type='submit' value='Login' size='p5'/>
            </FormGroup>
                <PrimaryButton nameID='login-page-register-btn' link='register' classes='mt-1'>
                    Register
                </PrimaryButton>
          </PageContainer>
      );
  };
  
export default LoginPage;