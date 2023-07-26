import React from 'react'
import{Form} from 'react-bootstrap'

export default function DetailsForPayroll() {
  return (
    <div>
        <br/>
        <div className="sub-header" style={{fontSize:'20px'}}>
          <div className="row">
            <div className="col" style={{padding:'0 0 15px 0',textAlign:'right',fontFamily:'serif'}}>Name :</div>
            <div className="col" style={{marginRight:'110px',textAlign:'left'}}>Mr. Ravindu Dilhara</div>
          </div>
          <div className="row">
            <div className="col" style={{padding:'0 0 15px 0',textAlign:'right',fontFamily:'serif'}}>EPF &nbsp;&nbsp;:</div>
            <div className="col" style={{marginRight:'115px',textAlign:'left'}}>1111</div>
          </div>
          <div className="row">
            <div className="col" style={{padding:'0 0 15px 0',textAlign:'right',fontFamily:'serif'}}>Designation :</div>
            <div className="col" style={{marginRight:'15px',textAlign:'left'}}>Production Supervisor</div>
          </div>
          <div className="row">
            <div className="col" style={{padding:'0 0 15px 0',textAlign:'right',fontFamily:'serif'}}>Month :</div>
            <div className="col" style={{marginRight:'102px',textAlign:'left'}}>
            <Form.Group controlId='maritalStatus' style={{textAlign:'left' ,fontWeight:'bold',padding:'0px 40px 0px 10px',width:'50%'}}>
                    <Form.Control as='select' style={{textAlign:'center'}}>
                      <option value='January'>January</option>
                      <option value='February'>February</option>
                      <option value='married'>March</option>
                      <option value='April'>April</option>
                      <option value='May'>May</option>
                      <option value='June'>June</option>
                      <option value='July'>July</option>
                      <option value='August'>August</option>
                      <option value='September'>September</option>
                      <option value='October'>October</option>
                      <option value='November'>November</option>
                      <option value='December'>December</option>
                    </Form.Control>
                  </Form.Group>
            </div>
          </div>
        </div>
    </div>
  )
}
