import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';
import RoomIcon from '@mui/icons-material/Room';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Container = styled.div`
  display: flex;
  margin: 30px 0 30px 0;
  ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
  margin: 20px 0px;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;

  &:hover{
    cursor: pointer;
  }
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;

`;

const Title = styled.h2`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin: 8px 0;
  font-size: 18px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  

`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const EmailContact = styled.div`
cursor: pointer;
&:hover{
  text-decoration: underline;
}
`

const Image = styled.img`
   width: 232px;
   height 25px;
`;

const Footer = () => {

  const handleSocialNetwork = (e) => {
        e.preventDefault()
      toast.info("Liens vers les reseaux sociaux de votre boutique en ligne ")
  } 

   return (
    <Container>
      <Left>
        <Logo>LE SHOP.</Logo>
        <Desc>
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don’t look even slightly believable.
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour.
        </Desc>
        <SocialContainer >
          <SocialIcon color="3B5999" onClick={handleSocialNetwork}>
            <FacebookIcon />
          </SocialIcon>
          <SocialIcon color="E4405F" onClick={handleSocialNetwork}>
            <InstagramIcon />
          </SocialIcon>
          <SocialIcon color="55ACEE" onClick={handleSocialNetwork}>
            <TwitterIcon />
          </SocialIcon>
          <SocialIcon color="E60023" onClick={handleSocialNetwork}>
            <PinterestIcon />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Liens Utiles</Title>
        <List>
          <ListItem><Link to="/home" >Accueil</Link></ListItem>
          <ListItem><Link to="/cart" >Pannier</Link></ListItem>
          <ListItem><Link to="/products/homme" >Mode Homme</Link></ListItem>
          <ListItem><Link to="/products/femme" >Mode Femme</Link></ListItem>
          <ListItem><Link to="/products/enfant" >Mode Enfant</Link></ListItem>
   {/* check user.state,   */}
          <ListItem><Link to="/profil"  >Mon Compte</Link></ListItem>
          <ListItem><Link to="/products/soldes">Soldes</Link></ListItem>
          <ListItem><Link to="/" >Termes Legals</Link></ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contacte</Title>
        <ContactItem>
          <RoomIcon style={{marginRight:"10px"}}/> 12 rue des cerisiers, vannes 56000
        </ContactItem>
        <ContactItem>
          <PhoneIcon style={{marginRight:"10px"}}/> + 06 27 28 14 77
        </ContactItem>
        <ContactItem >
          <EmailOutlinedIcon style={{marginRight:"10px"}} />
          <EmailContact onClick={() => window.location = 'mailto:contact-le-shop@gmx.com'}>contact-le-shop@gmx.com</EmailContact> 
        </ContactItem>
        <Image src="https://firebasestorage.googleapis.com/v0/b/shop-21c07.appspot.com/o/paiement-CB.webp?alt=media&token=e8d7af7d-897c-4748-a656-7a372d974a70" alt="Logo cartes bancaires: eurocard, mastercard, american expresse"/>
      </Right>
    </Container>
  );
};

export default Footer;
