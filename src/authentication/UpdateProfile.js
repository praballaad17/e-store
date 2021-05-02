import React, { useRef, useState  } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import CenterContainer from './CenterContainer';

export default function UpdateProfile() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordconfirmRef = useRef()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { currentUser, updateEmail, updatePassword } = useAuth()
    const history = useHistory()

     function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordconfirmRef.current.value) {
            return setError('Password do not match')
        }

        const promises = []
        setLoading(true)
        setError("")

        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }
        if (passwordRef.current.value ) {
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises).then(() => {
            history.push('/user')
        }).catch(() => {
            setError("Failed to update account")
        }).finally(() => {
            setLoading(false)
        }) 
    }  

    return (
       <CenterContainer>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">
                        Update Profile
                    </h2>
                    {error && <Alert variant="danger" >{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control defaultValue={currentUser.email} type="email" ref={emailRef}  required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control placeholder={"Leave blank to keep the password"} type="password" ref={passwordRef}  />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Password confirmation</Form.Label>
                            <Form.Control placeholder={"Leave blank to keep the password"} type="password" ref={passwordconfirmRef}  />
                        </Form.Group>
                   
                    <Button disabled={loading}  
                        className="w-100" type="submit">Update</Button>
                    
                     </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Link to="/user">Cancel</Link>
            </div>
       </CenterContainer>
    )
}
