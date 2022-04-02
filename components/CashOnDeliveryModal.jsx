import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";

export default function CashOnDeliveryModal(props) {
  const createOrder = (e) => {
    e.preventDefault();
    props.createOrder({
      customer: e.target[0].value,
      phone: e.target[1].value,
      adress: e.target[2].value,
      total: props.total,
      paymentMethode: 0,
    });
  };
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Cash On Delivery
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>You Will Pay {props.total.toFixed(2) + 25} L.E After Delivery</h4>
        <small className="text-danger">* 25 L.E For Delivery</small>
        <Form onSubmit={createOrder}>
          <FloatingLabel
            controlId="floatingInput"
            label="Name"
            className="my-2"
          >
            <Form.Control required type="text" placeholder="name@example.com" />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingPassword"
            label="Phone"
            className="my-2"
          >
            <Form.Control required type="text" placeholder="Password" />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingPassword"
            label="Adress"
            className="my-2"
          >
            <Form.Control required type="text" placeholder="Password" />
          </FloatingLabel>
          <div className="d-flex justify-content-center">
            <Button className="w-50" variant="secondary" type="submit">
              Order
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
