"use client"
import { useState } from 'react';
import Head from 'next/head';
import { Container, Form, Button } from 'react-bootstrap';

import login_service from "@/services/auth/login";
import './global.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Username:', username);
    console.log('Password:', password);
    await login_service(password, username)
  };

  return (
    <>
      <Container>
        <h1>Login</h1>
        <Form onSubmit={handleSubmit} className='form'>
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

          <Button variant="primary" type="submit" className='form-buton'>
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
}
