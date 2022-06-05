import styled from "styled-components";
import {mobile} from "../responsive";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from '../slices/authSlice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

import { publicRequest } from "../requestMethods";
import VisibilityIcon from '@mui/icons-material/Visibility';



const Container = styled.div`
width: 100vw;
height: 87vh;
background: linear-gradient(
  rgba(255, 255, 255, 0.5),
  rgba(255, 255, 255, 0.5)
  ),
  url("/img/login-shop.webp");
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  `;
  
  const Wrapper = styled.div`
  width: 400px;
 
  padding: 20px;
  background-color: white;
  text-align: center;
  ${mobile({ width: "340px" })}
  `;
  
  const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  `;
  
  const Form = styled.form`
  display: flex;
  flex-direction: column;
  `;

  
  const FormGroup = styled.div`
  display: flex;
  position: relative;
  `
const PasswordIcon = styled.div`
display: flex;
align-items: center;
position: absolute;
top: 50%;
right: 20px;
transform: translateY(-50%);
width: 20px;
`

  const Input = styled.input`
  flex: 1;
  min-width: 25%;
  margin: 10px 0;
  padding: 10px;
  background: white;
  font-size: 18px;

  :focus {
    outline: none !important;
    border:2px solid teal;
  }
  `;
  
  const Button = styled.button`
  width: 160px;
  font-size: 17px;
      letter-spacing:2px;
      font-weight: 900;
  border: none;
  margin: 25px 0;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  border-radius: 5px;
  
  &:hover{
    background-color: rgb(0, 107, 107);
  }
  
  &:active{
    font-size: 17px;
    padding: 15px 18px;
    transform: scale(0.95)
  }
  `;
  const Error = styled.span`
  margin-top:10px;
  font-size: 19px;
  letter-spacing: 2px;
  color: red;
  `;
  const ForgotPassword = styled.div`
  margin-top: 15px;
  cursor: pointer;
  &:hover{
    text-decoration: underline;
  }

  `
  /*
  const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  `;
  */
 const Login = () => {

  const [passwordShown, setPasswordShown] = useState(false);
   const [formData, setFormData] = useState({
     email: '',
    password: '',
  })
  const { email, password } = formData
  
  //const  error  = useSelector((state) => state.user.isError);
  
  const message = useSelector((state) => state.user.message)


  const user = useSelector((state) => state.user.user)
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  
  
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  
  const onSubmit = (e) => {
    e.preventDefault()
    const userData = {
      email,
      password,
    }
    dispatch(login(userData))
  }
  
  const forgotPassword = async () => {
   
    if(!email){
      toast.error(`entrer votre Email et recliquer sur ce lien`)
    }else{
      try{
        
       const isEmailExist = await publicRequest.post('http://localhost:5000/api/auth/isEmailExist', {email})

        if(isEmailExist.data !== false){
          
           await publicRequest.post('http://localhost:5000/api/auth/password-reset', {email: email})
        
          toast.success(`un Email viens de vous etre envoyé`)

        }else{
          toast.error(`Votre email n'existe pas`)
        }
      }catch(err) {
        console.log(err)
      }
    }
  }

  useEffect(() => {
    if(user) navigate("/")
  }, [user, navigate]);
  

  // Password toggle handler
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };


  return (
    <React.Fragment>
    <Announcement />
    
    <Navbar />
      <Container>
        <Wrapper>
          <Title>CONNEXION</Title>
          <Form onSubmit={onSubmit}>
          <FormGroup>
          <Input
          type='email'
          className='form-control'
          id='email'
          name='email'
          value={email}
          placeholder='Email'
          onChange={onChange}
          />
          </FormGroup>
          <FormGroup>
          <Input
          type={passwordShown ? "text" : "password"} 
          className='form-control pwd'
          id='password'
          name='password'
          
          value={password}
          placeholder='Mot de passe'
          onChange={onChange}
          />

          <PasswordIcon>
         <VisibilityIcon onClick={togglePassword} id="eye"/>
          
        </PasswordIcon>

          </FormGroup>
          <Error>{message && message.login}</Error>
          <div className='form-group'>
            <Button type='submit' className='btn btn-block'>Connexion</Button>
          </div>
        </Form>

        <ForgotPassword onClick={forgotPassword}>Mot de passe oublié ?</ForgotPassword>
        </Wrapper>
      </Container>
    </React.Fragment>
  );
};

export default Login;
