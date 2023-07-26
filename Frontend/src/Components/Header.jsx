import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import linklogoImg from '../Components/linklogoImg.jpg'



function Header() {
  return (
    <div>
      <Navbar style={{backgroundColor:'#4bbf8d',width:'100%',color:'white',padding:'20px'}}>
      <a href='https://linknaturalproducts.com/'><img src={linklogoImg} alt='link-logo-image' width={'120px'} style={{marginLeft:'-5px',paddingRight:'25px'}}/></a>
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="https://linknaturalproducts.com/" style={{color:'white',marginRight:'40px'}}>Home</Nav.Link>
            <Nav.Link href="https://linknaturalproducts.com/company-profile/" style={{color:'white',marginRight:'40px'}}>About Us</Nav.Link>
            <Nav.Link href="https://linknaturalproducts.com/contact/" style={{color:'white'}}>Contact Us</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;