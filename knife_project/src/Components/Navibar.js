import React, { useState } from "react";
import { Navbar, Nav, Button, Container, Modal, Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { submitClientForm } from "../api"; 

const flameFlicker = keyframes`
  0% { transform: translateY(0) scaleY(1); opacity: 1; }
  30% { transform: translateY(-2px) scaleY(0.98); opacity: 0.9; }
  60% { transform: translateY(1px) scaleY(1.02); opacity: 0.95; }
  100% { transform: translateY(0) scaleY(1); opacity: 1; }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 6px rgba(255,140,0,0.7), 0 0 18px rgba(255,60,0,0.25); }
  50% { box-shadow: 0 0 10px rgba(255,180,0,0.95), 0 0 30px rgba(255,80,0,0.35); }
  100% { box-shadow: 0 0 6px rgba(255,140,0,0.7), 0 0 18px rgba(255,60,0,0.25); }
`;

const Styles = styled.div`
  .navbar-brand {
    color: red;
    font-weight: 900;
    font-size: 30px;
    margin-right: 50px;
    margin-left: 30px;
  }

  .nav-link {
    color: #adb1b8 !important;
    margin-left: 20px;
    &:hover {
      color: #fff !important;
    }
    &.active {
      color: #fff !important;
      font-weight: 600;
    }
  }

  .modal-body {
    max-height: 70vh;
    overflow-y: auto;
  }

  /* Горящая кнопка */
  .fire-btn {
    position: relative;
    color: #fff;
    background: linear-gradient(180deg, #ff6a00 0%, #cc2300 100%);
    border: none;
    padding: 0.55rem 1.1rem;
    font-weight: 700;
    letter-spacing: 0.4px;
    transition: transform 0.12s ease;
    transform-origin: center;
    animation: ${glow} 2.2s infinite ease-in-out;
    overflow: visible;
  }

  .fire-btn:hover,
  .fire-btn:focus {
    transform: translateY(-2px);
    outline: none;
    box-shadow: 0 6px 30px rgba(255, 120, 0, 0.28);
  }

  .fire-btn .fire-text {
    position: relative;
    z-index: 2;
    text-shadow:
      0 0 6px rgba(255, 200, 80, 0.95),
      0 0 14px rgba(255, 120, 0, 0.8),
      0 0 28px rgba(255, 60, 0, 0.6);
    display: inline-block;
    animation: ${flameFlicker} 1.6s infinite ease-in-out;
  }

  .fire-btn::after {
    content: "";
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: -18px;
    width: 140%;
    height: 30px;
    background: radial-gradient(ellipse at 50% 0%,
      rgba(255,200,80,0.85) 0%,
      rgba(255,140,0,0.65) 25%,
      rgba(255,80,0,0.35) 55%,
      rgba(0,0,0,0) 70%);
    filter: blur(14px);
    opacity: 0.9;
    pointer-events: none;
    z-index: 1;
    transform-origin: center;
    animation: flameRise 1.8s infinite linear;
  }

  @keyframes flameRise {
    0% { transform: translateX(-50%) translateY(0) scaleX(1); opacity: 0.9; }
    50% { transform: translateX(-50%) translateY(-6px) scaleX(1.02); opacity: 1; }
    100% { transform: translateX(-50%) translateY(0) scaleX(1); opacity: 0.9; }
  }

  @media (max-width: 576px) {
    .fire-btn::after { height: 18px; filter: blur(10px); bottom: -12px; width: 160%; }
    .fire-btn { padding: 0.45rem 0.9rem; font-size: 0.95rem; }
  }
`;

export function NaviBar() {
    const [show, setShow] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        desiredModel: "",
        remember: false,
    });
    const [errors, setErrors] = useState({});

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    };

    const validate = () => {
        const errs = {};
        if (!form.name.trim()) errs.name = "Введите имя";
        if (!form.email.trim()) errs.email = "Введите email";
        if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "Неверный формат email";
        if (!form.desiredModel.trim()) errs.desiredModel = "Укажите желаемую модель";
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        const payload = {
            name: form.name,
            email: form.email,
            desired_model: form.desiredModel, 
            remember: form.remember,
        };

        try {
            const created = await submitClientForm(payload);
            console.log("Client created:", created);
            // пользовательский фидбек
            alert("Спасибо! Ваша анкета отправлена.");
            setForm({ name: "", email: "", desiredModel: "", remember: false });
            setErrors({});
            handleClose();
        } catch (err) {
            console.error(err);
            if (err.response && err.response.data) {
                const data = err.response.data;
                const newErrors = {};
                Object.keys(data).forEach((key) => {
                    const mappedKey = key === "desired_model" ? "desiredModel" : key;
                    newErrors[mappedKey] = Array.isArray(data[key]) ? data[key].join(" ") : String(data[key]);
                });
                setErrors(newErrors);
            } else {
                alert("Ошибка отправки. Попробуйте позже.");
            }
        }
    };

    return (
        <>
            <Styles>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="fixed-top">
                    <Container>
                        <Navbar.Brand>Exclusive Knife Co.</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-between">
                            <Nav className="me-auto">
                                <Nav.Link as={NavLink} to="/" end>
                                    Главная
                                </Nav.Link>
                                <Nav.Link as={NavLink} to="/about">
                                    О нас
                                </Nav.Link>
                                <Nav.Link as={NavLink} to="/catalog">
                                    Каталог
                                </Nav.Link>
                            </Nav>

                            <Nav>
                                <Button
                                    variant="primary"
                                    onClick={handleShow}
                                    className="fire-btn"
                                    aria-haspopup="dialog"
                                >
                                    <span className="fire-text">Заполнить анкету</span>
                                </Button>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </Styles>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Расскажите о себе</Modal.Title>
                </Modal.Header>

                <Form noValidate onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group controlId="contactName" className="mb-3">
                            <Form.Label>ФИО</Form.Label>
                            <Form.Control
                                name="name"
                                type="text"
                                placeholder="Фамилия Имя Отчество"
                                value={form.name}
                                onChange={handleChange}
                                isInvalid={!!errors.name}
                                required
                            />
                            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="contactEmail" className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                name="email"
                                type="email"
                                placeholder="Адрес эл. почты"
                                value={form.email}
                                onChange={handleChange}
                                isInvalid={!!errors.email}
                                required
                            />
                            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="contactDesiredModel" className="mb-3">
                            <Form.Label>Желаемая модель</Form.Label>
                            <Form.Control
                                name="desiredModel"
                                type="text"
                                placeholder="Укажите жедаемую модель"
                                value={form.desiredModel}
                                onChange={handleChange}
                                isInvalid={!!errors.desiredModel}
                                required
                            />
                            <Form.Control.Feedback type="invalid">{errors.desiredModel}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="contactRemember" className="mb-0">
                            <Form.Check
                                name="remember"
                                type="checkbox"
                                label="Запомнить меня"
                                checked={form.remember}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Закрыть
                        </Button>
                        <Button type="submit" variant="primary">
                            Отправить
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}