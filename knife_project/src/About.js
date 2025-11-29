import React from "react";
import { Container } from "react-bootstrap";
import L_height from "./image/L_height.jpg";
import cvb from "./image/cvb.jpg";
import sdf from "./image/sdf.jpg";


export const AboutPage = () => {
    return (
        <div className="bg" style={{ backgroundColor: 'rgb(188, 198, 204)', backgroundSize: 'cover', height: '1800px',marginTop: '50px' }}>
            <Container style={{ padding: '40px', maxWidth: '800px' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>О Нас</h1>
                <p style={{ fontSize: '18px' }}>
                    Мы — специализированная компания, создающая эксклюзивные ножи. Наша цель — предоставить клиентам уникальные изделия,
                    сочетающие в себе традиции и современные технологии.
                </p>
                <p style={{ fontSize: '18px' }}>
                    Мы используем только лучшие материалы и работаем с опытными мастерами. Каждый нож — это результат тщательной работы и внимания к деталям.
                </p>
                <h2 style={{ marginTop: '30px' }}>Наши производственные площадки</h2>
                <div className="gallery" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img src={L_height} alt="Производственная площадка 1" style={{ width: '100%', margin: '10px 0' }} />
                    <img src={cvb} alt="Производственная площадка 2" style={{ width: '100%', margin: '10px 0' }} />
                    <img src={sdf} alt="Производственная площадка 3" style={{ width: '100%', margin: '10px 0' }} />
                </div>
                <p style={{ marginTop: '20px', fontSize: '16px' }}>
                    Наша команда всегда готова помочь вам выбрать идеальный нож, который будет служить вам верой и правдой долгие годы.
                </p>
            </Container>
        </div>
    );
};