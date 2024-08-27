import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

export default function CarouselHome() {
    const [banners, setBanners] = useState([]);

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const response = await axios.get("https://nuniali-51afdf69a4d2.herokuapp.com/banners");
                setBanners(response.data);
            } catch (error) {
                console.error("Error fetching banners:", error);
            }
        };

        fetchBanners();
    }, []);

    return (
        <>
            <style jsx>{`
                .carousel {
                    position: relative;
                    width: 100%;
                    height: 80vh;
                    overflow: hidden;
                }
                .carousel-inner {
                    height: 100%;
                }
                .carousel-item {
                    height: 100%;
                    position: relative;
                }
                .carousel-item img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .carousel-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.4);
                    z-index: 1;
                }
                .carousel-caption {
                    position: absolute;
                    bottom: 45%;
                    left: 0;
                    width: 100%;
                    color: white;
                    text-align: center;
                    z-index: 2;
                    padding: 0 20px;
                }
                .carousel-caption h1 {
                    font-size: 2rem;
                    margin: 0;
                }
                .carousel-caption p {
                    font-size: 1.125rem;
                }
                @media (max-width: 575.98px) {
                    .carousel-caption h1 {
                        font-size: 1.5rem;
                    }
                    .carousel-caption p {
                        font-size: 0.875rem;
                    }
                }
                @media (min-width: 576px) and (max-width: 767.98px) {
                    .carousel-caption h1 {
                        font-size: 1.75rem;
                    }
                    .carousel-caption p {
                        font-size: 1rem;
                    }
                }
                @media (min-width: 768px) {
                    .carousel-caption h1 {
                        font-size: 2rem;
                    }
                    .carousel-caption p {
                        font-size: 1.125rem;
                    }
                }
            `}</style>

            <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    {banners.map((banner, index) => (
                        <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={banner.id}>
                            <div className="carousel-image-wrapper">
                                <Image
                                    alt="Carousel"
                                    src={`https://nuniali-51afdf69a4d2.herokuapp.com${banner.img}`}
                                    layout="fill"
                                    objectFit="cover"
                                    className="carousel-zoom"
                                />
                            </div>
                            <div className="carousel-overlay"></div>
                            <div className="carousel-caption">
                                <h1>{banner.text}</h1>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
