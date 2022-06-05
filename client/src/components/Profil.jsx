import React from 'react';
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { userRequest } from "../requestMethods";
import styled from "styled-components";

import { publicRequest } from '../requestMethods';
import { toast } from 'react-toastify'


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';





const Wrapper = styled.div`

`;

const Title = styled.h1`
width: 100%;
padding: 60px;
text-align: center;
`

const Titles = styled.h2`
margin: 40px 0 50px 0;
font-size: 24px;
font-weight: 300;
`;

const Container = styled.div`
max-width: 700px;
margin: 30px 0 80px 35px;
`
const Form = styled.form`
display: flex;
flex-direction: column;

width: 360px;
text-align: center;
`;

const Input = styled.input`
flex: 1;
width:200px;
height: 40px;
margin-bottom: 20px;


background: white;

:focus {
  outline: none !important;
  border:2px solid teal;
}
`;

const Button = styled.button`
width: 130px;
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

/*
const TableContainer = styled.div`

`
const Table = styled.table`

width:850px;
`
const TableHead = styled.th`
margin-top: 30px;
color: white;
  background-color: teal;
  
  border-radius: 3px;
`
const TableBody = styled.tbody`
margin-top: 30px;
`
const TableRow = styled.tr`
text-align: center;
`
const TableCell = styled.td`
padding: 15px;
border: 2px solid teal;
border-radius: 3px;
`
*/

const Profil = () => {

    const userId = useSelector(state=>state.user.user._id )
    const email = useSelector(state=> state.user.user.email)
    const pseudo = useSelector(state=> state.user.user.pseudo)
    const [array, setArray] = useState([])
    const [newPassword, setNewPassword] = useState('')
    const [newPassword2, setNewPassword2] = useState('')

    
      const onSubmit = async(e) => {
        e.preventDefault()
    
        const userData = {
          email: email,
          password: newPassword,
        }
        if (newPassword.length < 8)  {
          return toast.error('Min length')
        }else if( newPassword !== newPassword2 ) {
          return toast.error('Passwords do not match')
        }else {
            try{
                publicRequest.put('auth/newPwdUser', userData)
                toast.success('Password change')
                setNewPassword("")
                setNewPassword2("")
           }catch(err){
               console.log(err)
           }
        }
      }
  
    useEffect(() => {
      const getUserOrder = async () => {
            const res =  await userRequest.get(`/orders/find/${userId}`)
            setArray(res.data)
          }
        getUserOrder()
    }, [userId]);

    console.log(array.orders)

    return (
        <React.Fragment>
        <Title>Bonjour {pseudo}</Title>
            <Container>
                <Titles>Historique de commandes :</Titles>
                <TableContainer component={Paper}>
                    <Table >
                        <TableHead>
                            <TableRow>
                                <TableCell>Commande n°</TableCell>
                                <TableCell >Date</TableCell>
                                <TableCell >Prix</TableCell>
                                <TableCell >status</TableCell>
                            </TableRow>   
                           
                        </TableHead>
                        <TableBody>
                            {array.orders &&
                            array.orders.map((row, i) => (
                            <TableRow key={i}>
                                <TableCell>{row.commande}</TableCell>
                                <TableCell>{row.date}</TableCell>
                                <TableCell>{(row.prix)/100} €</TableCell>
                                <TableCell>{row.status}</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
            <Container>
            <Wrapper>
            <Titles>Changement de mot de passe :</Titles>
            <Form onSubmit={onSubmit}>
          
            <div className='form-group'>
              <Input
                type='password'
                className='form-control'
                id='password'
                name='password'
                value={newPassword}
                placeholder='Enter password'
                onChange={(e)=> setNewPassword(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <Input
                type='password'
                className='form-control'
                id='password2'
                name='password2'
                value={newPassword2}
                placeholder='Enter password'
                onChange={(e)=> setNewPassword2(e.target.value)}
              />
            </div>
  
            <div className='form-group'>
              <Button type='submit' className='btn btn-block'>
                Submit
              </Button>
            </div>
          </Form>
          </Wrapper>
            </Container>
            <Container>
               
            </Container>
        </React.Fragment>


        
    );
};

export default Profil;