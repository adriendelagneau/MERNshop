import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
//import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Newsletter from "../components/Newsletter"
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import React, { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeFromCart, getTotals, increaseCart, decreaseCart } from "../slices/cartSlice";
import { toast } from "react-toastify";
import { useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  text-align: center;
  ${mobile({ padding: "10px", textAlign: "left" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  
  ${mobile({ flexDirection: "column" })}

`;

const Info = styled.div`
flex: 3;

`;
const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  position: sticky;
  top:90px;
  text-align:center;
  height: 50vh; 

`;



const Product = styled.div`
  display: flex;
  margin: 20px 0;
  height: 160px;
  justify-content: space-between;
 
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  ${mobile({ width: "50%"})}
`;

const Image = styled.img`
  width: 167.13px;
  height: 160px;
`;

const Details = styled.div`

  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;




const ProductSize = styled.span`
margin-top: 0px;
`;


const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  padding:20px;
  
  `;
  
  
  const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ fontSize: "15px"})}
  
  `;
  
  const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;

  padding-left:20px;
  ${mobile({ fontSize: "15px"})}
  
  `;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;


const SummaryTitle = styled.h1`
font-weight: 200;

`;

const SummaryItem = styled.div`
margin: 30px 0px;
  display: flex;
  justify-content: space-between;
 
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
  `;
  
  const SummaryItemText = styled.span``;
  
  const SummaryItemPrice = styled.span``;

const ButtonTop = styled.button`
width: 180px;
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


const Button = styled.button`
width: 200px;
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
const Counter = styled.div`
display: flex;
justify-content: center;
align-items: center;
${mobile({  fontSize: "16px" })}
`
const Price = styled.div`
  margin-top: 25px;
  ${mobile({ fontSize: "15px"})}
  `
const ProductTrash = styled.div`
height: 94px;
width:80px;
text-align: right;
margin-top:10px;
${mobile({ marginTop: "20px", width: "50px" })}

`
const InfosContainer = styled.div`
width:auto;
${mobile({ width: "auto" })}
`

const Cart = () => {

  const stripe = useStripe()
  const navigate = useNavigate()
  
  const cart = useSelector(state=>state.cart)
  const userState =  useSelector(state=> state.user)
  // IF userState EXIST
  const user = userState.user && userState.user._id


  const dispatch = useDispatch();
  //const navigate = useNavigate()
  
  
  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };
  const handleIncreaseCart= (product) => {
    dispatch(increaseCart(product))
  }
  const handleDecreaseCart= (product) => {
    dispatch(decreaseCart(product))
  }
  

  const handleCheckout = async () => {

    if(user){
      const line_items = cart.cartItems.map(item => {
          return {
              quantity: item.quantity,
              price_data: {
                  currency: 'eur',
                  unit_amount: item.price * 100,
                  product_data: {
                      name: item.title,
                      description: item.description,
                  }
              }
          }
      })
      
      const res = await axios.post('http://localhost:5000/api/checkout/create-checkout-session', { line_items })
      const { sessionId } = res.data
      const { error } = await stripe.redirectToCheckout({sessionId})
      
      if (error) {
          console.log(error)
      }
      
    }else{
      toast.error('Vous devez être connecté pour valider votre commande')
      navigate('/login')
    }
}


useEffect(() => {
 dispatch(getTotals());
}, [cart, dispatch]);



  return (
    <Container>
      <Announcement />
      <Navbar />

      <Wrapper>
        <Title>VOTRE PANNIER</Title>

        <Top>
          <ButtonTop to="/" className="link-button">CONTINUE SHOPPING</ButtonTop>
        </Top>




        <Bottom>
          <Info>
          {cart.cartItems &&
            cart.cartItems.map((product, i)=>(
            <Product key={i}>
            
              <ProductDetail>
                <Image src={product.img} alt="toto"/>
                <Details>
                  <ProductName>
                    {product.title}
                  </ProductName>
                  <ProductSize>
                    <b>Size:</b> {product.size}
                  </ProductSize>
                </Details>
              </ProductDetail>

              <PriceDetail>
                <InfosContainer>
                  <Counter>
                    <RemoveIcon className="cart-decrease" onClick={() => handleDecreaseCart(product)} />
                    <ProductAmount>{product.quantity}</ProductAmount>
                    <AddIcon className="cart-increase" onClick={() => handleIncreaseCart(product)} />
                  </Counter>
                  <Price>
                        <ProductPrice>{product.price * product.quantity} €</ProductPrice>
                  </Price>
                </InfosContainer>
                  <ProductTrash>
                    <DeleteOutlineOutlinedIcon  className="trash" onClick={() => handleRemoveFromCart(product)} />
                  </ProductTrash>
              </PriceDetail>
            </Product>
          ))}
          <Hr />
          </Info>



        <Summary>
          <SummaryTitle>ORDER SUMMARY</SummaryTitle>
          <SummaryItem>
            <SummaryItemText>Total</SummaryItemText>
            <SummaryItemPrice>{cart.cartTotalAmount} €</SummaryItemPrice>
          </SummaryItem>
          <SummaryItem>
            <SummaryItemText>Estimated Shipping</SummaryItemText>
            <SummaryItemPrice>5.90 €</SummaryItemPrice>
          </SummaryItem>
          {cart.cartTotalAmount >= 50 &&
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>-5.90 €</SummaryItemPrice>
            </SummaryItem>
          }
          <SummaryItem type="total">
            <SummaryItemText>Total</SummaryItemText>
            <SummaryItemPrice>{ cart.cartTotalAmount >= 50 ? cart.cartTotalAmount : cart.cartTotalAmount +5.9} €</SummaryItemPrice>
          </SummaryItem>

          <Button onClick={handleCheckout}>PAYER</Button>
        </Summary>

        
      </Bottom>
    </Wrapper>


    <Newsletter />
    <Footer />
  </Container>  );
};

export default Cart;