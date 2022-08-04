import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Col, Container, Row } from 'react-bootstrap'
import './Signup.css'
import { Link } from 'react-router-dom';
import botImg from '../assets/bot.jpg'


const Signup = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    //image upload states
    const [image, setImage] = useState(null);
    const [uploadingImg, setUploadingImg] = useState(false)
    const [imagePreview, setImagePreview] = useState(null)



    const validateImg = (e) => {
        const file = e.target.files[0]
        if (file.size >= 1048576) {
            return alert('Max file size is 1mb')
        } else {
            setImage(file)
            setImagePreview(URL.createObjectURL(file))
        }
    }

    const uploadImage = async () => {
        const data = new FormData()
        data.append('file', image)
        data.append('upload_preset', 'xcaj8olc')
        try {
            setUploadingImg(true)
            let res = await fetch('http://api.cloudinary.com/v1_1/dzypna0qj/image/upload', {
                method: 'post',
                body: data
            })
            const urlData = await res.json()
            setUploadingImg(false)
            return urlData.url
        } catch (err) {
            setUploadingImg(false)
            console.log(err);
        }
    }

    const handleSignup = async (e) => {
        e.preventDefault()
        if (!image) {
            return alert('Please upload your profile picture')
        }
        const url = await uploadImage(image)
        console.log(url);
        // signup the user
    }

    return (
        <Container>
            <Row>

                <Col md={7} className="d-flex align-items-center justify-content-center flex-direction-column">
                    <Form
                        onSubmit={handleSignup}
                        style={{
                            width: '80%',
                            maxWidth: 500
                        }}>
                        <h1 className="text-center signup__title">Create account</h1>
                        <div className="signup-profile-pic__container">
                            <img
                                src={imagePreview || botImg}
                                alt="avatar" className="signup-profile-pic" />
                            <label
                                className="image-upload-label"
                                htmlFor="image-upload">
                                <i className="fas fa-plus-circle add-picture-icon"></i>
                            </label>
                            <input
                                type="file"
                                id="image-upload"
                                accept="image/png, image/jpg"
                                hidden
                                onChange={validateImg} />
                        </div>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                onChange={e => setName(e.target.value)}
                                value={name} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                onChange={e => setEmail(e.target.value)}
                                value={email}
                            />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                onChange={e => setPassword(e.target.value)}
                                value={password}
                            />
                        </Form.Group>

                        <Button
                            disabled={uploadingImg}
                            variant="primary"
                            type="submit">
                            {
                                uploadingImg
                                    ? 'Signing you up...'
                                    : 'Signup!!!!'
                            }
                        </Button>
                        <div className="py-4">
                            <p className="text-center">
                                Already have an account ? <Link to='/login'>Login</Link>
                            </p>
                        </div>
                    </Form>
                </Col>
                <Col md={5} className="signup__bg"></Col>
            </Row>
        </Container>
    )
}

export default Signup