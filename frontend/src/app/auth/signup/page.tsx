"use client"
import { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';

import sign_up_service from "@/services/auth/sign_up";
import './global.css';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Username:', username);
    console.log('Password:', password);

    if (confirm_password != password) {
      console.log("Confirm password incorrect.")
    } else {
      await sign_up_service(password, username, email)
    }
  };

  return (
    <>
      <Container>
        <h1>Sign Up</h1>
        <Form onSubmit={handleSubmit} className='form'>
        <Form.Group controlId="formBasicEmail" className='form-group'>
            <Form.Label className='form-label'>Email</Form.Label>
            <Form.Control
              className='form-control'
              type="text"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail" className='form-group'>
            <Form.Label className='form-label'>Username</Form.Label>
            <Form.Control
              className='form-control'
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className='form-group'>
            <Form.Label className='form-label'>Password</Form.Label>
            <Form.Control
              className='form-control'
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className='form-group'>
            <Form.Label className='form-label'>Confirm Password</Form.Label>
            <Form.Control
              className='form-control'
              type="confirm_password"
              placeholder="Confirm Password"
              value={confirm_password}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className='form-buton'>
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
}
