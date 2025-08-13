"use client";

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
                <motion.div
                    key={blog.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.15 }}
                    viewport={{ once: true }}
                    className="px-3"
                >
                    <div
                        className="rounded-xl overflow-hidden shadow-lg border"
                        style={{ borderColor: "var(--border)", background: "var(--surface)" }}
                    >
                        <div className="relative w-full h-48">
                            <Image
                                src={blog.image}
                                alt={blog.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="p-4">
                            <h3
                                className="text-lg font-semibold mb-2 line-clamp-2"
                                style={{ color: "var(--foreground)" }}
                            >
                                {blog.title}
                            </h3>
                            <p
                                className="text-sm mb-3 line-clamp-3"
                                style={{ color: "var(--muted)" }}
                            >
                                {blog.description}
                            </p>
                            <div
                                className="flex items-center justify-between text-xs"
                                style={{ color: "var(--muted)" }}
                            >
                                <span>{blog.date}</span>
                                <span>{blog.views} views</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </Slider>
    );
}
