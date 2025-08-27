"use client";

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BlogCard from "./BlogCard";

// Custom Arrow Component
function Arrow({ onClick, direction }) {

    return (
        <button
            onClick={onClick}
            className="absolute top-1/2 z-10 -translate-y-1/2 p-2 rounded-full shadow-md shadow-border"
            style={{
                background: "var(--surface)",
                color: "var(--primary)",
                [direction === "left" ? "left" : "right"]: "-14px",
            }}
        >
            {direction === "left" ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
    );
}

export default function BlogCarousel({ blogs }) {

    const [slidesToShow, setSlidesToShow] = useState(3);

    useEffect(() => {
        const updateSlides = () => {
            if (window.innerWidth < 640) {
                setSlidesToShow(1);
            } else if (window.innerWidth < 1024) {
                setSlidesToShow(2);
            } else {
                setSlidesToShow(3);
            }
        };

        updateSlides();
        window.addEventListener("resize", updateSlides);
        return () => window.removeEventListener("resize", updateSlides);
    }, []);


    const settings = {
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnHover: true,
        nextArrow: <Arrow direction="right" />,
        prevArrow: <Arrow direction="left" />,
        appendDots: dots => (
            <div style={{ bottom: "-25px" }}>
                <ul className="!m-0 flex justify-center gap-1">{dots}</ul>
            </div>
        ),
        customPaging: i => (
            <div
                style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "var(--primary)",
                    opacity: 0.4,
                }}
            />
        ),
        responsive: [
            {
                breakpoint: 1024,
                settings: { slidesToShow: 2 }
            },
            {
                breakpoint: 640,
                settings: { slidesToShow: 1 }
            }
        ],
    };


    return (
        <Slider {...settings}>
            {blogs.map((blog, idx) => (
                <BlogCard blog={blog} idx={idx} />
            ))}
        </Slider>
    );
}
