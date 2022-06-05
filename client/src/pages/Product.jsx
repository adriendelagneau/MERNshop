import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import {  useDispatch, useSelector } from "react-redux";

import { productFetch } from '../slices/singleProductSlice';
import { addToCart } from "../slices/cartSlice";

import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

import styled from "styled-components";
import Rating from '@mui/material/Rating';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import { mobile } from "../responsive";
import { toast } from 'react-toastify';

import { postReviews } from '../slices/singleProductSlice';
import { publicRequest } from '../requestMethods';


const Container = styled.div`

`;

const Wrapper = styled.div`

  padding: 10px 20px 30px 20px;
  display: flex;
  margin-top 55px;
  ${mobile({ flexDirection: "column" })}

`;

const ImgContainer = styled.div`
flex:1;
  text-align: center;
`;

const RightSide = styled.div`
flex:1;
`
const Image = styled.img`
width: 599px;
height: 700px;

`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
 
`;

const Title = styled.h1`
  font-weight: 200;
`;
const RatingBox = styled.div`
margin-top: 15px;
`
const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const OldPrice = styled.span`
  color:red;
  text-decoration:line-through;
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;

`;

const Filter = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 140px;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;
const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
 
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
width: 160px;
font-size: 17px;
letter-spacing:2px;
font-weight: 900;
border: none;
margin-left: 30px;
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
    font-size: 20px;
    padding: 13px 18px;
    transform: scale(0.95)
  }
`;


const SetComment = styled.div`
`
const Form = styled.form`
text-align: center;

`
const TextArea = styled.textarea`
width: 70%;
height: 60px;
margin-top: 12px;

:focus {
    outline: none !important;
    border:2px solid teal;
  }
  ${mobile({ width: "auto"
})}
  `
  const PostButton = styled.button`
  width: 150px;
  height: 50px;
  
  font-size: 17px;
  letter-spacing:2px;
  font-weight: 900;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-top: 18px;
 
  border-radius: 5px;
  
  &:hover{
      background-color: rgb(0, 107, 107);
  }
  
  &:active{
          font-size: 20px;
          padding: 13px 18px;
          transform: scale(0.95)
      }
      `
  
const Bottom = styled.div`
margin-top: 60px;
display: flex;
`
const BottomRight = styled.div`
width:50%;
text-align: center;
`
const BottomLeft = styled.div`
width: 50%;
`

const LastTwoReviews = styled.div`
margin: 5px 0;
`
const ReviewsItem = styled.div`
display: flex;
margin: 10px;
`
const BlocStars = styled.div`


`
const CommenterName = styled.div`
padding-top: 2px;
padding-right: 5px;
`





const ProdductSingle = () => {

  const form = useRef(null);

  const dispatch = useDispatch();
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  const [total, setTotal] = useState("")
  const [value, setValue] = useState(0)
  const [comment, setComment] = useState("")

  const product = useSelector(state=> state.product.item)
  const reviews = useSelector(state=> state.product.item.reviews)
  const numberOfReviews = useSelector(state=> state.product.item.numReviews)

  const [userBoughtIt, setUserBoughtIt] = useState(false)
        
  const userState =  useSelector(state=> state.user)
  // IF userState EXIST
  const user = userState.user && userState.user.pseudo
  const userId = userState.user && userState.user._id
  //
  let lastTwoReviews = []
  if(reviews) {
        lastTwoReviews = reviews.slice(-2)
  }
 
    // OBJECT TO SEND NEW REVIEW
    const newReviews = {
      "id": id,
      "name": user,
      "comment": comment,
      "rating": value
}

  
  useEffect(() => {
    try {
      dispatch(productFetch(id))
    } catch (err){ console.log(err)}
  }, [dispatch,id]);
  

  // CREATE newArray WITH RATING VALUES, REDUCE IT AND SET TOTAL  WITH IT
  useEffect(()=> {
    if(reviews){
          const newArray = []
          
          reviews.forEach(element => {
                newArray.push(element.rating)
          })
          
          const sum = newArray.reduce(
                (p, c) => p + c,
                )
                setTotal(sum) 
          }
},[reviews] )

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };
  
  const handleAddToCart = () => {

    if(size !== "") {
      dispatch(
        addToCart({ ...product, quantity, size })
        );
    } else {
      toast.error("Veuiller choisir une taille")
    }
  };
  ////////////////////////////////
 //DISPATCH NEW REVIEW AND REEST
 const handleSubmit = async(e) => {
  e.preventDefault()

  
  if(!userId){
        toast.error("vous devez être connecté")
  }else if(userBoughtIt === false){
        toast.error("vous devez avoir acheté ce produit pout donner votre avis")
  }else if (newReviews.rating  === 0) {
        toast.error("choisir une note ( 1 à 5 )")          
  }
  else{
        try{
              dispatch(postReviews( newReviews))
              toast.success("vote commentaire a été ajouté.")
              form.current.reset();
              setValue(0)
            
             
        }catch(err)  {console.log(err)}
  }
}




//DID USER BOUGHT IT
useEffect(()=> {
  const toto = async () => {
        try{
              const res = await publicRequest.post(`/products/isAlreadyBought/${id}`, {userId})
              setUserBoughtIt(res.data)
        }catch(err){
  console.log((err))
        }
  }
  toto()
},[dispatch, id, userId])


    return (
        <Container>
          <Announcement />
          <Navbar />

          <Wrapper>
            <ImgContainer>
              <Image src={product.img} alt={product.alt}/>
            </ImgContainer>
        
            <RightSide>
              <InfoContainer>
                <Title>{product.title}</Title>
                <RatingBox>
                  <Rating name="read-only" precision={0.5} value={Math.round((total/numberOfReviews)*2)*0.5} size="large" readOnly />
                </RatingBox>

                <Desc>{product.desc}</Desc>
                {product.oldPrice && <OldPrice>{product.oldPrice}€</OldPrice>}
                <Price> {product.price}€</Price>

                <FilterContainer>
                  <Filter>
                    <FilterTitle>Taille : </FilterTitle>
                    <FilterSize   onChange={(e) => setSize(e.target.value)}>
                      <FilterSizeOption >Disponible</FilterSizeOption>
                        {product.size &&
                          product.size.map((s) => (
                            <FilterSizeOption key={s}>{s}</FilterSizeOption>
                        ))}
                    </FilterSize>
                  </Filter>
                </FilterContainer>

                <AddContainer>
                  <AmountContainer>
                    <RemoveIcon onClick={() => handleQuantity("dec")}/>
                    <Amount>{quantity}</Amount>
                    <AddIcon onClick={() => handleQuantity("inc")}/>
                  </AmountContainer>
                  <Button onClick={() => handleAddToCart(product)}>AJOUTER</Button>
                </AddContainer>
              </InfoContainer>
                {/**/}

<Bottom>
  <BottomLeft>

    <Title>Derniers avis:</Title>
      {lastTwoReviews.map((x, i)=> 
        <LastTwoReviews key={i}>

          <ReviewsItem>
          <CommenterName>{x.name} </CommenterName>
            <BlocStars>
              <Rating name="read-only" precision={0.5} value={x.rating} readOnly />
            </BlocStars>
          </ReviewsItem>

          <ReviewsItem>{x.comment}</ReviewsItem>
        </LastTwoReviews>
      )}    

  </BottomLeft>
  <BottomRight>

    <div>Laissez votre avis:</div>
      <Rating
        name="simple-controlled"
        size="large"
        value={value}
        precision={0.5} 
        //defaultValue={0} 
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />

      <Form ref={form}>
    
            <TextArea placeholder='Votre avis' onChange={(e) => setComment(e.target.value)}   />
            <br/>
            <PostButton type='submit' onClick={handleSubmit}> POST</PostButton>
      </Form>

  </BottomRight>
</Bottom>

  <SetComment>
  </SetComment>



            </RightSide>
          </Wrapper>
          <Newsletter />
          <Footer />
          </Container>

          );
    };

export default ProdductSingle;