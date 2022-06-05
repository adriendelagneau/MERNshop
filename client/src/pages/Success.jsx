import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userRequest } from "../requestMethods";
import { Link } from "react-router-dom";
import axios from "axios";



const Success = () => {
    
    
    const cart = useSelector(state=>state.cart)
    const currentUser = useSelector((state) => state.user.user);
    const [orderId, setOrderId] = useState(null);

    
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const stripeSessionId = params.get('session_id');////////////////////////////
    const [stripeInfos, setstripeInfos] = useState(false)
    
    const [odNumber, setOdNumber]  = useState(0)


    
    useEffect(()=> {
        const getOrderNumber = async () => {
        try{
            const orderNumber = await userRequest.get("/orderNumber")
            setOdNumber(orderNumber.data)
        }catch(err) {
            console.log(err)
        }
    }
    getOrderNumber()
}, [])



    useEffect(() => {
        if(stripeInfos.customer_details === false ){
            
            console.log("no data")
        }else{
            const createOrder = async () => {
                try {
                    
                    const res = await userRequest.post("/orders", {
                        orderNumber: odNumber,
                        userEmail: stripeInfos.customer_details.email,
                        userName: stripeInfos.shipping.name,
                        userId: currentUser._id ,
                        products: cart.cartItems.map((item) => ({
                            productId: item._id,
                            title: item.title,
                            quantity: item.quantity,
                        })),
                        amount: stripeInfos.amount_total,
                        address: stripeInfos.shipping.address,
                    });
                    setOrderId(res.data._id);
                } catch (err){
                    console.log(err)
                }
            };
            createOrder();
         
        }
    }, [cart, currentUser,odNumber, stripeInfos]);
    
 
    useEffect(()=>{
        const getStripeInfos = async () => {
            try{
               const res =  await axios.get("http://localhost:5000/api/checkout/checkout-session/" + stripeSessionId)
               setstripeInfos(res.data)
             
            }catch(err) {
                console.log(err)
            }
        }
        getStripeInfos()
    },[stripeSessionId])
      
      return (
          <div
          style={{
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
            >
            {orderId
                ? `Order has been created successfully. Your order number is ${odNumber}`
                : `Successfull. Your order is being prepared...`}
                <Link to="/home">
                <button style={{ padding: 10, marginTop: 20 }}>Go to Homepage</button>
        </Link>
    </div>
    );
};

export default Success;