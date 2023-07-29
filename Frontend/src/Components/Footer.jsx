import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle,  faYoutube, faLinkedin } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <footer className='footer-login' style={{backgroundColor: '#455A64'}}>
      <Container className='pt-4' style={{paddingLeft:'520px'}}>
        <section className='mb-4'>
          <Button
            variant='link'
            size='lg'
            className='text-dark m-1'
            href='https://www.facebook.com/linknaturalproducts'
            role='button'
            style={{height:'60px',width:'60px',lineHeight:'42px',border:'solid 2px rgba(159, 240, 146,0.5)'}}
          >
            <FontAwesomeIcon icon={faFacebookF} />
          </Button>

          <Button
            variant='link'
            size='lg'
            className='text-dark m-1'
            href='https://www.linkedin.com/company/link-natural-products/'
            role='button'
            style={{height:'60px',width:'60px',lineHeight:'42px',border:'solid 2px rgba(159, 240, 146,0.5)'}}
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </Button>

          <Button
            variant='link'
            size='lg'
            className='text-dark m-1'
            href='https://linknaturalproducts.com/'
            role='button'
            style={{height:'60px',width:'60px',lineHeight:'42px',border:'solid 2px rgba(159, 240, 146,0.5)'}}
          >
            <FontAwesomeIcon icon={faGoogle} />
          </Button>

          <Button
            variant='link'
            size='lg'
            className='text-dark m-1'
            href='https://www.youtube.com/@linknaturalproducts/videos'
            role='button'
            style={{height:'60px',width:'60px',lineHeight:'42px',border:'solid 2px rgba(159, 240, 146,0.5)'}}
          >
            <FontAwesomeIcon icon={faYoutube} />
          </Button>
        </section>
      </Container>

      <div className='text-center text-dark p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2023 All rights reserved.
        <a className='text-dark' href='https://linknaturalproducts.com/'>&nbsp;
          Link Natural Products Pvt(Ltd).com
        </a>
      </div>
    </footer>
  );
}