import React, { useRef, useState } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import CenterContainer from './CenterContainer';

export default function ForgetPassword() {
    const emailRef = useRef()
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const { forgetPassword } = useAuth()
   
    async function handleSubmit(e) {
        e.preventDefault()
        
        try {
            setError('')
            setMessage('')
            setLoading(true)
            await forgetPassword(emailRef.current.value)
            setMessage("Check your Inbox for funther Instruction.")
        } catch {
            setError("Failed to reset!")
        }
        setLoading(false)
    }

    return (
       <CenterContainer>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">
                        Reset Password
                    </h2>
                    {error && <Alert variant="danger" >{error}</Alert>}
                    {message && <Alert variant="success" >{message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        
                    <Button 
                        className="w-100" type="submit">Reset Password</Button>
                     </Form>
                     <div className="w-100 text-center mt-3">
                        <Link to="/login">Log In</Link>
                        
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Don't have an account? 
                <Link to="/signup">Sign Up</Link>
                
            </div>
            
       </CenterContainer>
    )
}
