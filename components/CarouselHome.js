import React from "react";
import Image from "next/image";

export default function CarouselHome() {
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
                    object-fit: cover; /* Maintain zoom effect */
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
                    padding: 0 20px; /* Ensure padding for better readability */
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
                    <div className="carousel-item active">
                        <div className="carousel-image-wrapper">
                            <Image
                                alt="Carousel"
                                src="/hero.webp"
                                layout="fill"
                                objectFit="cover"
                                className="carousel-zoom"
                            />
                        </div>
                        <div className="carousel-overlay"></div>
                        <div className="carousel-caption">
                            <h1>Selamat Datang di Web Desa Nuniali</h1>
                            <p>Pusat Layanan Informasi Resmi Desa</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="carousel-image-wrapper">
                            <Image
                                alt="Carousel"
                                src="/hero1.jpg"
                                layout="fill"
                                objectFit="cover"
                                className="carousel-zoom"
                            />
                        </div>
                        <div className="carousel-overlay"></div>
                        <div className="carousel-caption">
                            <h1>Desa Rukun & Gotong Royong</h1>
                            <p>Website Desa Kreatif dan Inovatifff</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="carousel-image-wrapper">
                            <Image
                                alt="Carousel"
                                src="/hero2.jpg"
                                layout="fill"
                                objectFit="cover"
                                className="carousel-zoom"
                            />
                        </div>
                        <div className="carousel-overlay"></div>
                        <div className="carousel-caption">
                            <h1>Desa Asri & Bahagia</h1>
                            <p>Desa Asri, Damai dan Bahagia</p>
                        </div>
                    </div>
                </div>
               
            </div>
        </>
    );
}
