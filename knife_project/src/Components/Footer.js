import React from "react";
import { Container } from "react-bootstrap";

export const Footer = () => (
    <div style={{ backgroundColor: ' rgb(188, 198, 204)' }}>
        < Container fluid style={{ background: '#212529', color: '#fff' }}>
            <Container style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
                <p>Свяжитесь с нами: info@example.com</p>
                <p>© 2025 Exclusive Knife Co.</p>
            </Container>
        </Container >
    </div >
)