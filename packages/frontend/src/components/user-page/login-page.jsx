import { useState } from 'react';
import { Box, PageContainer } from '../utils/containers';
import { FormGroup, FormFloatingInput, FormInput } from '../utils/form';
import { PrimaryButton } from '../utils/buttons';

const LoginPage = ({ handleChange, getUser, handleSubmit }) => {

    return (
          <PageContainer nameID='login-page-cont' flex size='size' classes='flex-column' justify='center' align='center'>
            <FormGroup nameID='login-page-form' classes='flex-column register-form' justify='center' align='center' width='50%' onSubmit={ handleSubmit }>
                <FormFloatingInput nameID='login-page-email' type='email' value={ getUser.email } inputName="email" placeholder='Enter your email here' label='Email' handleChange={ handleChange }/>
                <FormFloatingInput nameID='login-page-password' type='password' value={ getUser.password } inputName="password" placeholder='Enter your password here' label='Password' handleChange={ handleChange }/>
                <FormInput nameID='login-page-btn' type='submit' value='Login' size='p5' inputWidth='60%' classes='mt-1'/>
            </FormGroup>
            <Box nameID='login-page-register-box'>
                <PrimaryButton nameID='login-page-register-btn' link='register' classes='mt-1' width='60%' >
                    Register
                </PrimaryButton>
                </Box>
          </PageContainer>
      );
  };
  
export default LoginPage;