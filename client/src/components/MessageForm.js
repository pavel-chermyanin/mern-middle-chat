import React from 'react'
import { Button, Col, Form, FormControl, FormGroup, Row } from 'react-bootstrap'
import './MessageForm.css'

const MessageForm = () => {
    const handleSubmit = (e) => {
        e.preventDefault()
    }
    return (
        <>
            <div className="message-output">

            </div>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={10}>
                        <FormGroup>
                            <FormControl
                                type="text"
                                placeholder="Your message">
                            </FormControl>
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <Button
                            style={{
                                // flexBasis: '80px',
                                width: '100%',
                                backgroundColor: 'orange'
                            }}
                            variant="primary"
                            type="submit">
                            <i className="fas fa-paper-plane"></i>
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}

export default MessageForm