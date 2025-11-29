import React from "react";
import { Carousel } from "react-bootstrap";
import a from "../image/a.jpg";
import b from "../image/b.jpg";
import fi from "../image/fi.jpg";

const SLIDES = [
    { src: a, alt: "Модель 1", title: "Наши модели", caption: "Какая красота — посмотри!" },
    { src: b, alt: "Модель 2", title: "Наши модели", caption: "Какая красота — посмотри!" },
    { src: fi, alt: "Модель 3", title: "Наши модели", caption: "Какая красота — посмотри!" },
];


export function Slider() {
    const imgStyle = {
        width: "100%",
        height: "550px",
        objectFit: "cover",
        display: "block",
    };
    return (
        <Carousel style={{marginTop:'30px',marginBottom: '30px'}}>
            {SLIDES.map((slide, i) => (
                <Carousel.Item key={i}>
                    <img
                        className="d-block"
                        src={slide.src}
                        alt={slide.alt}
                        style={imgStyle}
                        loading="lazy"
                    />
                    <Carousel.Caption>
                        <h3 style={{ color:'rgba(255, 140, 0, 0.9)'}}>{slide.title}</h3>
                        <p>{slide.caption}</p>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}