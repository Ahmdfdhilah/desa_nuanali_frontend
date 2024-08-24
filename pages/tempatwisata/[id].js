import Head from 'next/head';
import NavBarTop from '../../components/NavBarTop';
import Footer from '../../components/Footer';
import Breadcrumb from '../../components/Breadcrumb';
import PlaceCard from '../../components/PlaceCard';
import BackToTop from '../../components/BackToTop';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';

const title = "Detail Tempat Wisata";
const ITEMS_PER_PAGE = 2;

export async function getServerSideProps(context) {
    const { id } = context.params;

    // Fetch place details
    const res = await fetch(`https://nuniali.my.id/wisata/${id}`);
    const place = await res.json();

    // Fetch latest places
    const latestRes = await fetch('https://nuniali.my.id/wisata');
    const latestData = await latestRes.json();
    const latestPlaces = latestData.data.slice(-ITEMS_PER_PAGE);

    return {
        props: {
            place: place || null,
            latestPlaces: latestPlaces || null,
        },
    };
}

export default function PlaceDetail({ place, latestPlaces }) {
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        AOS.init(); // Initialize AOS
        if (place && place.foto.length > 0) {
            const interval = setInterval(() => {
                setCurrentImage((prev) => (prev + 1) % place.foto.length);
            }, 3000);

            return () => clearInterval(interval);
        }
    }, [place]);

    if (!place) {
        return <div>Place not found</div>;
    }

    // Filter out the current place from latestPlaces
    const filteredLatestPlaces = latestPlaces.filter(latest => latest.id !== place.id);

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
                .sidebar .latest-places {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }
                .sidebar .latest-places .place-card {
                    margin-bottom: 20px;
                }
                .sidebar h2 {
                    margin-bottom: 20px;
                }
                .image-gallery {
                    position: relative;
                    overflow: hidden;
                    border-radius: 10px;
                    width: 100%;
                    height: 400px;
                }
                .image-gallery .image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    position: absolute;
                    top: 0;
                    left: 0;
                    opacity: 0;
                    transition: opacity 1s ease-in-out;
                    z-index: 1;
                }
                .image-gallery .image.active {
                    opacity: 1;
                    z-index: 2;
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
            `}</style>

            <Head>
                <title>{`${place.title} - ${title}`}</title>
                <meta name="description" content={`Detail dari ${place.title}`} />
                <link rel="icon" href="/favicon.ico" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={process.env.NEXT_PUBLIC_API_URL} />
                <meta property="og:title" content={place.title} />
                <meta property="og:description" content={place.description} />
                <meta property="og:image" content={place.foto[0]} />
            </Head>

            <NavBarTop />

            <main>
                <div className="bg-color-primary">
                    <Breadcrumb pageName={place.title} currentPage={place.title} />
                </div>

                <div className="container my-5 main-section">
                    <div className="details" data-aos="fade-up">
                        <h1>{place.title}</h1>
                        <div className="image-gallery">
                            {place.foto.map((img, index) => (
                                <Image
                                    key={index}
                                    src={`https://nuniali.my.id${img}`}
                                    alt={place.title}
                                    className={`image ${currentImage === index ? 'active' : ''}`}
                                    layout="fill"
                                    objectFit="cover"
                                />
                            ))}
                        </div>
                        <div className="lead mt-4" dangerouslySetInnerHTML={{ __html: place.body }} data-aos="fade-up"></div>
                    </div>
                    <div className="sidebar" data-aos="fade-right">
                        <h2>Latest Places</h2>
                        <div className="latest-places">
                            {filteredLatestPlaces.map(latest => (
                                <div className="place-card" key={latest.id} data-aos="fade-up">
                                    <PlaceCard
                                        id={latest.id}
                                        title={latest.title}
                                        excerpt={`<a href="/tempatwisata/${latest.id}">....Baca Selengkapnya</a>`}
                                        images={latest.foto}
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
