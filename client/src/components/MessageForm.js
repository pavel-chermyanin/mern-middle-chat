import React from "react";
import {
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
  Row,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import "./MessageForm.css";

const MessageForm = () => {
  const user = useSelector((state) => state.user);
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div className="message-output">
        {!user && <div className="alert alert-danger">Please login</div>}
      </div>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={10}>
            <FormGroup>
              <FormControl
                disabled={!user}
                type="text"
                placeholder="Your message"
              ></FormControl>
            </FormGroup>
          </Col>
          <Col md={2}>
            <Button
              style={{
                // flexBasis: '80px',
                width: "100%",
                backgroundColor: "orange",
              }}
              variant="primary"
              type="submit"
              disabled={!user}
            >
              <i className="fas fa-paper-plane"></i>
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default MessageForm;
