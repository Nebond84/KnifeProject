
import React from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';


const Styles = styled.div`
.hero-wrap {
    margin-top: 70px;

  position: relative;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height:700px;
  min-height:80vh; 
  display: flex;
  align-items: center;
  width: 100%;
  color: #fff;
}

.hero-overlay {
  position: absolute;
  inset: 0; /* top:0; right:0; bottom:0; left:0; */
  background: rgba(0,0,0,0.35); 
  z-index: 2;
}

.hero-content {
  position: relative;
  z-index: 1;
  padding: 1rem 2rem;
  max-width: 1200px;
  margin-bottom: 60px;
}
/* адаптивность текста */
@media (max-width: 576px) {
  .hero-content {
    text-align: center;
  }
  .hero-content .col-md-8 {
    margin: 0 auto;
  }
}
`

export const Hero = ({ title = 'Заголовок', subtitle, bg }) => {

    const style = bg ? { backgroundImage: `url(${bg})` } : {};
    return (
        <Styles>
            <header className="hero-wrap" style={style} role="banner" aria-label="Hero">
                <div className="hero-overlay" />
                <Container className="hero-content text-white">
                    <h1 className="display-5 fw-bold">{title}</h1>
                    <br />
                    {subtitle && <p className="col-md-8 fs-4">{subtitle}</p>}
                </Container>
            </header>
        </Styles>
    );
};