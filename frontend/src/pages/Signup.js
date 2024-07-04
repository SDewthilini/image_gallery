import React from 'react';
import './Signup.css';
import ColorSchemesExample from '../components/nav';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCheckbox,
    MDBBtn,
    MDBIcon
} from 'mdb-react-ui-kit';

export default function Login() {
    return (
        <div>  <ColorSchemesExample />
            <div className="login-page">

                <MDBContainer fluid className='p-4'>
                    <MDBRow>
                        <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
                            <h1 className="my-5 display-3 fw-bold ls-tight px-3 login-title">
                                Secure Your Memories:) <br />
                                <span className="text-primary">Encrypt and Protect Your Images Online</span>
                            </h1>
                            <p className='px-3' style={{ color: 'hsl(217, 10%, 50.8%)' }}>
                                Worried about the safety of your digital photos? Our cutting-edge online image encryption service is here to provide the ultimate protection for your personal and professional images. By joining our platform, you can easily encrypt your images, rendering them unreadable to anyone but you, and securely store them in your private gallery.

                                Our user-friendly interface makes it simple to upload, encrypt, and store your images in just a few steps. When you need to access your photos, our decryption process ensures you can retrieve them quickly and safely. Don’t leave your precious memories vulnerable—sign up today and take control of your image security with our state-of-the-art encryption technology.







                            </p>
                        </MDBCol>
                        <MDBCol md='6'>
                            <MDBCard className='my-5'>
                                <MDBCardBody className='p-5'>
                                    <MDBRow>
                                        <MDBCol col='6'>
                                            <MDBInput wrapperClass='mb-4' label='First name' id='form1' type='text' />
                                        </MDBCol>
                                        <MDBCol col='6'>
                                            <MDBInput wrapperClass='mb-4' label='Last name' id='form1' type='text' />
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBInput wrapperClass='mb-4' label='Email' id='form1' type='email' />
                                    <MDBInput wrapperClass='mb-4' label='Password' id='form1' type='password' />
                                    <div className='d-flex justify-content-center mb-4'>
                                        <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' />
                                    </div>
                                    <MDBBtn className='w-100 mb-4' size='md'>Sign up</MDBBtn>
                                    <div className="text-center">
                                        <p>or sign up with:</p>
                                        <MDBBtn tag='a' color='none' className='mx-3 social-btn'>
                                            <MDBIcon fab icon='facebook-f' size="sm" />
                                        </MDBBtn>
                                        <MDBBtn tag='a' color='none' className='mx-3 social-btn'>
                                            <MDBIcon fab icon='twitter' size="sm" />
                                        </MDBBtn>
                                        <MDBBtn tag='a' color='none' className='mx-3 social-btn'>
                                            <MDBIcon fab icon='google' size="sm" />
                                        </MDBBtn>
                                        <MDBBtn tag='a' color='none' className='mx-3 social-btn'>
                                            <MDBIcon fab icon='github' size="sm" />
                                        </MDBBtn>
                                    </div>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        </div>
    );
}
