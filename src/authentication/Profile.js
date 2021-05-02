import React, { useState } from 'react'
import { Card ,Button, Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import CenterContainer from './CenterContainer';

export default function Profile() {
    const [error, setError] = useState("")
    const {currentUser, logout, deleteUser} =  useAuth()
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleLogout() {
        setError('')

        try {
            await logout()
            setLoading(true)
            history.push("/login")
        } catch  {
            setError("Failed to log out")
        }
        setLoading(false)
    }

    async function handleDelete() {
        setError('')

        try {
            await deleteUser()
            setLoading(true)
            history.push("/login")    
        } catch (error) {
            setError("Failed to Delete")
        }
    }

    return (
        <CenterContainer>
            <Card> 
                <Card.Body>
                    <h2 className="text-center mb-4">Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <strong>Email:</strong>{currentUser.email}
                    <Link to="/update-profile" className="btn btn-primary w-100 mt-3">Update</Link>
                    <Button onClick={handleLogout} className="btn btn-secondary w-100 mt-3">Log Out</Button>
                    <Button onClick={handleDelete} className="btn btn-danger w-100 mt-3">Delete Your Account</Button>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Link to="/">Cancel</Link>
            </div>
        </CenterContainer>
    )
}
