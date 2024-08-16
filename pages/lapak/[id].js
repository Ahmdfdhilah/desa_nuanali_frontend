import Head from 'next/head';
import NavBarTop from '../../components/NavBarTop';
import Footer from '../../components/Footer';
import Breadcrumb from '../../components/Breadcrumb';
import ProductCard from '../../components/ProductCard';
import BackToTop from '../../components/BackToTop';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaWhatsapp } from 'react-icons/fa';

const title = "Detail Lapak";
const ITEMS_PER_PAGE = 2;

export async function getServerSideProps(context) {
    const { id } = context.params;

    // Fetch lapak details
    const res = await fetch(`https://nuniali-51afdf69a4d2.herokuapp.com/lapak/${id}`);
    const lapak = await res.json();

    // Fetch all lapak
    const allLapakRes = await fetch('https://nuniali-51afdf69a4d2.herokuapp.com/lapak');
    const allLapakData = await allLapakRes.json();
    
    // Filter out the current lapak from the list of latest lapak
    const latestLapak = allLapakData.data
        .filter(item => item.id !== id) // Exclude the current lapak
        .slice(-ITEMS_PER_PAGE); // Get the latest ITEMS_PER_PAGE lapak

    return {
        props: {
            lapak: lapak || null,
            latestLapak: latestLapak || null,
        },
    };
}

export default function LapakDetail({ lapak, latestLapak }) {

    useEffect(() => {
        AOS.init(); // Initialize AOS
    }, []);

    if (!lapak) {
        return <div>Lapak not found</div>;
    }

    return (
        <>
            <style jsx>{`
                .main-section {
                    display: flex;
                    flex-direction: column;
                    gap: 30px;
                }
                @media(min-width: 768px) {
                    .main-section {
                        flex-direction: row;
                        gap: 40px;
                    }
                }
                .details {
                    flex: 2;
                }
                .sidebar {
                    flex: 1;
                    max-width: 300px;
                }
                .sidebar .latest-lapak {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }
                .sidebar .latest-lapak .product-card {
                    margin-bottom: 20px;
                }
                .sidebar h2 {
                    margin-bottom: 20px;
                }
                .image-gallery {
                    position: relative;
                    width: 100%;
                    min-height: 600px;
                    border-radius: 10px;
                    overflow: hidden; /* Ensure image does not overflow */
                }
                .image-gallery .image {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: opacity 1s ease-in-out;
                    opacity: 0;
                }
                .image-gallery .image.active {
                    opacity: 1;
                }
                .details h1 {
                    font-size: 2.5rem;
                    font-weight: bold;
                    color: var(--text-color-primary);
                    margin: 20px 0;
                }
                .details p {
                    font-size: 1.125rem;
                    color: var(--text-color-secondary);
                    line-height: 1.6;
                }
                .bg-color-primary {
                    background-color: var(--bg-color-primary) !important;
                }
                .btn-whatsapp {
                    background-color: #25D366;
                    border-color: #25D366;
                    color: white;
                    text-decoration: none;
                    padding: 0.5rem 1rem;
                    border-radius: 0.25rem;
                    display: inline-flex;
                    align-items: center;
                    font-size: 0.875rem; /* Adjust font size */
                }
                .btn-whatsapp:hover {
                    background-color: #1EBEA5;
                    border-color: #1EBEA5;
                }
                .btn-whatsapp i {
                    margin-right: 0.5rem;
                }
            `}</style>

            <Head>
                <title>{`${lapak.name} - ${title}`}</title>
                <meta name="description" content={`Detail dari ${lapak.name}`} />
                <link rel="icon" href="/favicon.ico" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={process.env.NEXT_PUBLIC_API_URL} />
                <meta property="og:title" content={lapak.name} />
                <meta property="og:description" content={lapak.description} />
                <meta property="og:image" content={lapak.image} />
            </Head>

            <NavBarTop />

            <main>
                <div className="bg-color-primary">
                    <Breadcrumb pageName={lapak.name} currentPage={lapak.name} />
                </div>

                <div className="container my-5 main-section">
                    <div className="details" data-aos="fade-up">
                        <h1>{lapak.name}</h1>
                        <div className="image-gallery">
                            <Image
                                src={`https://nuniali-51afdf69a4d2.herokuapp.com${lapak.image}`}
                                alt={lapak.name}
                                className="image"
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                        <div className="lead my-4" dangerouslySetInnerHTML={{ __html: lapak.description }} data-aos="fade-up"></div>
                        <p className="fw-bold">
                            Lokasi: {lapak.location} <br />
                            Kontak: {lapak.contactPerson} <br />
                            Penjual: {lapak.seller}
                        </p>
                        <a href={`https://wa.me/${lapak.phone}?text=Saya%20ingin%20memesan%20${lapak.name}`} className="btn-whatsapp" rel="noreferrer" target="_blank">
                            <i><FaWhatsapp /></i>Whatsapp
                        </a>
                    </div>
                    <div className="sidebar" data-aos="fade-right">
                        <h2>Lapak Terbaru</h2>
                        <div className="latest-lapak">
                            {latestLapak.map(latest => (
                                <div className="product-card" key={latest.id} data-aos="fade-up">
                                    <ProductCard
                                        id={latest.id}
                                        slug={latest.slug || latest.id}
                                        name={latest.name}
                                        price={latest.price}
                                        image={latest.image}
                                        phone={latest.phone}
                                        description={latest.description}
                                        location={latest.location}
                                        contactPerson={latest.contactPerson}
                                        seller={latest.seller}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />

            <BackToTop />
        </>
    );
}
