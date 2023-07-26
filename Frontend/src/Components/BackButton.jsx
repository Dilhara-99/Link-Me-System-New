import React from 'react';
import { Button } from 'react-bootstrap';

function BackButton() {
  const handleClick = () => {
    window.history.back();
  };

  return (
    <div className='back-btn' style={{ marginLeft: '65%'}}>
      <Button
        variant='dark'
        style={{ width: '40%', fontWeight: 'bold' }}
        onClick={handleClick}
      >Back</Button>
    </div>
  );
}

export default BackButton;
