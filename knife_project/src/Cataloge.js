import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Modal, Form } from "react-bootstrap";
import a from "./image/a.jpg";
import b from "./image/b.jpg";
import fi from "./image/fi.jpg";
import background from "./image/bac_1.jpg";
import styled, { keyframes } from "styled-components";
import { submitClientForm } from "./api";

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
  .body {
    background-color: rgb(119, 206, 234);
    background-size: cover;
    background-position: center;
    min-height: 100vh;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

 .card-custom { 
 width: 18rem; 
 display: flex; 
 flex-direction: column; 
 } 

 .card-body-custom { 
 flex: 1 1 auto;
  display: flex; 
  flex-direction: column; 
  justify-content: space-between; 
  } 

 .card-wrapper { 
 margin-bottom: 3.5rem; 
 display: flex; 
 justify-content: center; 
 }



  @keyframes flicker {
    0%, 19%, 21%, 99%, 100% { opacity: 2; }
    20% { opacity: 0.3; }
  }

  .prew {
    margin-top: 50px;
    color: orange;
    font-size: 3rem;
    text-align: center;
    animation: flicker 1.5s infinite alternate;
    text-shadow:
      0 0 12px rgba(255, 140, 0, 0.9),
      0 0 10px rgba(255, 140, 0, 0.8),
      0 0 15px rgba(255, 0, 0, 0.7),
      0 0 20px rgba(255, 0, 0, 0.6),
      0 0 25px rgba(255, 0, 0, 0.5);
  }

 
  .desc-wrapper {
    overflow: hidden;
    transition: max-height 300ms ease, opacity 300ms ease;
    max-height: 0;
    opacity: 0;
  }

  .desc-wrapper.open {
    max-height: 300px;
    opacity: 1;
  }

  .card-custom {
    width: 18rem;
  }

  .card-body-custom {
    background: rgb(188, 198, 204);
  }


  .fire-btn {
    position: relative;
    color: #fff;
    background: linear-gradient(180deg, #ff6a00 0%, #cc2300 100%);
    border: none;
    padding: 0.45rem 0.9rem;
    font-weight: 700;
    letter-spacing: 0.4px;
    transition: transform 0.12s ease;
    transform-origin: center;
    animation: ${glow} 2.2s infinite ease-in-out;
    overflow: visible;
  }
  .fire-text {
    position: relative;
    z-index: 2;
    text-shadow:
      0 0 6px rgba(255, 200, 80, 0.95),
      0 0 14px rgba(255, 120, 0, 0.8),
      0 0 28px rgba(255, 60, 0, 0.6);
    display: inline-block;
    animation: ${flameFlicker} 1.6s infinite ease-in-out;
  }

  @media (max-width: 768px) {
    .card-custom { width: 100%; margin: 0 0.5rem; }
    .prew { font-size: 2rem; }
    .body { padding: 1rem; }
  }
`;

const products = [
    { id: 1, name: "Модель 1", short: "Короткое описание 1", long: "Длинное подробное описание продукта 1. Здесь можно перечислить характеристики, материалы, размеры, опции и т.д.", image: a },
    { id: 2, name: "Модель 2", short: "Короткое описание 2", long: "Длинное подробное описание продукта 2. Полезно добавить цену, сроки и рекомендации.", image: b },
    { id: 3, name: "Модель 3", short: "Короткое описание 3", long: "Длинное подробное описание продукта 3. Технические параметры, комплектация и варианты отделки.", image: fi },
    { id: 4, name: "Модель 4", short: "Короткое описание 4", long: "Длинное подробное описание продукта 4.", image: a },
    { id: 5, name: "Модель 5", short: "Короткое описание 5", long: "Длинное подробное описание продукта 5.", image: a },
    { id: 6, name: "Модель 6", short: "Короткое описание 6", long: "Длинное подробное описание продукта 6.", image: a },
];

export const CatalogePage = () => {
    const [openSet, setOpenSet] = useState(new Set());
    const toggleOpen = (id) => {
        setOpenSet(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };


    const [show, setShow] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        desiredModel: "",
        remember: false,
    });
    const [errors, setErrors] = useState({});

    const handleClose = () => {
        setShow(false);
        setForm({ name: "", email: "", desiredModel: "", remember: false });
        setErrors({});
    };

    const openFormWithModel = (modelName) => {
        setForm(prev => ({ ...prev, desiredModel: modelName || prev.desiredModel }));
        setShow(true);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
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
                <Container
                    className="body"
                    style={{ backgroundImage: `url(${background})`, paddingTop: "5rem", paddingBottom: "3rem" }}
                    as="main"
                >
                    <Container style={{ textAlign: "center", paddingBottom: "1rem" }}>
                        <h1 className="prew">Представляем каталог наших моделей</h1>
                    </Container>

                    <Row style={{ paddingTop: "1rem", paddingBottom: "3rem", rowGap: "3rem", columnGap: "1.5rem", justifyContent: "center" }}>
                        {products.map((product) => {
                            const isOpen = openSet.has(product.id);
                            return (
                                <Col key={product.id} xs={12} sm={6} md={4} lg={3} style={{ display: "flex", justifyContent: "center" }}>
                                    <Card className="card-custom" aria-labelledby={`title-${product.id}`}>
                                        <Card.Img style={{ height: '144px', objectFit: 'cover' }} variant="top" src={product.image} alt={product.name} />
                                        <div className="card-body-custom">
                                            <Card.Body>
                                                <Card.Title id={`title-${product.id}`}>{product.name}</Card.Title>
                                                <Card.Text>{product.short}</Card.Text>

                                                <div
                                                    className={`desc-wrapper ${isOpen ? "open" : ""}`}
                                                    aria-hidden={!isOpen}
                                                    id={`desc-${product.id}`}
                                                >
                                                    <Card.Text style={{ marginTop: "0.5rem" }}>{product.long}</Card.Text>
                                                </div>

                                                <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem" }}>
                                                    <Button
                                                        variant="primary"
                                                        onClick={() => toggleOpen(product.id)}
                                                        aria-expanded={isOpen}
                                                        aria-controls={`desc-${product.id}`}
                                                        style={{ background: "rgba(255, 140, 0, 0.9)", border: "none" }}
                                                    >
                                                        {isOpen ? "Свернуть" : "Узнать больше"}
                                                    </Button>

                                                    <Button
                                                        variant="primary"
                                                        className="fire-btn"
                                                        aria-haspopup="dialog"
                                                        onClick={() => openFormWithModel(product.name)}
                                                        title={`Заказать ${product.name}`}
                                                    >
                                                        <span className="fire-text">Заполнить анкету</span>
                                                    </Button>
                                                </div>
                                            </Card.Body>
                                        </div>
                                    </Card>
                                </Col>
                            );
                        })}
                    </Row>
                </Container>
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
                                placeholder="Укажите желаемую модель"
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
};