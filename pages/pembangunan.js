import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import NavBarTop from "../components/NavBarTop";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import BackToTop from "../components/BackToTop";
import { HiOutlineLocationMarker, HiOutlineCreditCard, HiOutlineCalendar } from "react-icons/hi";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Navigation } from 'swiper';
import "swiper/css";
import "swiper/css/navigation";
import { formatRupiah } from "../utils/formatRp";

SwiperCore.use([Autoplay, Navigation]);

const title = "Pembangunan Desa";

export default function Pembangunan({ pembangunan }) {
    const [pembangunanData, setPembangunanData] = useState([]);

    useEffect(() => {
        setPembangunanData(pembangunan);
    }, [pembangunan]);

    if (!pembangunanData.length) return <p>Loading...</p>;

    const getProgressBarColor = (progress) => {
        if (progress < 30) return "bg-danger";
        if (progress < 70) return "bg-warning";
        return "bg-success";
    };

    return (
        <>
            <style jsx>
                {`
                .shadow-custom {
                    box-shadow: 0 4px 16px rgb(0 0 0 / 10%);
                }
                .image-container {
                    width: 350px;
                    height: 250px;
                    position: relative;
                }
                .image-container .image {
                    width: 100%;
                    height: 100%;
                }
                .progress-bar {
                    transition: width 0.3s ease;
                }
                .progress-bar.bg-danger {
                    background-color: red;
                }
                .progress-bar.bg-warning {
                    background-color: yellow;
                }
                .progress-bar.bg-success {
                    background-color: green;
                }
                i {
                    font-size: 20px;
                }
            `}
            </style>

            <Head>
                <title>{title}</title>
                <meta name="description" content={`Website Desa Nuniali`} />
                <link rel="icon" href="/favicon.ico" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={process.env.NEXT_PUBLIC_API_URL} />
                <meta property="og:title" content={`Situs Resmi Desa Nuniali`} />
                <meta property="og:description" content={`Website Resmi Desa Nuniali. Media komunikasi dan transparansi Pemerintah Desa`} />
                <meta property="og:image" content={`${process.env.NEXT_PUBLIC_API_URL}/metalogo.jpg`}></meta>
            </Head>

            <NavBarTop />

            <main>
                <div className="bg-color-primary">
                    <Breadcrumb pageName="Pembangunan" currentPage="Pembangunan" />
                </div>
                <div className="container my-5">
                    {pembangunanData.map(pembangunanItem => (
                        <div key={pembangunanItem.id} className="card bg-card-primary px-md-3 py-md-3 mb-4">
                            <div className="row">
                                <div className="col-md-5 col-lg-4 m-auto">
                                    <Swiper className="swiper-pembangunan"
                                        spaceBetween={16}
                                        autoplay={{
                                            "delay": 4000,
                                            "disableOnInteraction": false
                                        }}
                                        navigation={true}
                                        loop={true}
                                    >
                                        {pembangunanItem.foto.map((url, index) => (
                                            <SwiperSlide key={index}>
                                                <div className="image-container">
                                                    <Image
                                                        src={`http://localhost:3000${url}`}
                                                        alt={`Foto Pembangunan ${index + 1}`}
                                                        layout="fill"
                                                        className="img-fluid rounded image">
                                                    </Image>
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                                <div className="col-md-7 col-lg-8">
                                    <div className="card-body">
                                        <h5 className="card-title text-color-primary">{pembangunanItem.judul}</h5>
                                        <p className="card-text text-color-tertiary fs-15">{pembangunanItem.deskripsi}</p>
                                        <div className="d-flex text-color-secondary">
                                            <p className="fw-600 me-4">
                                                <i className="me-2"><HiOutlineLocationMarker /></i>
                                                {pembangunanItem.lokasi}
                                            </p>
                                            <p className="fw-600 me-4">
                                                <i className="me-2"><HiOutlineCreditCard /></i>
                                                {formatRupiah(pembangunanItem.anggaran)}
                                            </p>
                                            <p className="fw-600 me-4">
                                                <i className="me-2"><HiOutlineCalendar /></i>
                                                {pembangunanItem.tahun}
                                            </p>
                                        </div>
                                        <div className="progress">
                                            <div
                                                className={`progress-bar ${getProgressBarColor(pembangunanItem.progres)}`}
                                                role="progressbar"
                                                style={{ width: `${pembangunanItem.progres}%` }}
                                                aria-valuenow={pembangunanItem.progres}
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                            >
                                                {pembangunanItem.progres}%
                                            </div>
                                        </div>
                                        <p className="card-text mt-4"><small className="text-color-muted">Update tanggal {new Date(pembangunanItem.updatedAt).toLocaleDateString()}</small></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <Footer />

            <BackToTop />
        </>
    );
}

export async function getServerSideProps() {
    const res = await fetch('http://localhost:3000/pembangunan');
    const data = await res.json();
    const pembangunan = data.data || [];
    console.log(pembangunan);

    return {
        props: { pembangunan },
    };
}
