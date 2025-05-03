import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import "./Toast.css"

function MyToast({show,message}) {
  

  return (
    <Row>
      <Col xs={6}>
        <Toast className='mytoast'  show={show} delay={3000}  >
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </Col>
    </Row>
  );
}

export default MyToast;