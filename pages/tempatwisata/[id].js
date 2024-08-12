import { useRouter } from 'next/router';
import Head from 'next/head';
import NavBarTop from '../../components/NavBarTop';
import Footer from '../../components/Footer';
import Breadcrumb from '../../components/Breadcrumb';
import PlaceCard from '../../components/PlaceCard';
import BackToTop from '../../components/BackToTop';
import { useState, useEffect } from 'react';

const title = "Detail Tempat Wisata";

// Static data for demonstration
const staticPlaces = [
    { id: 1, title: "Pantai Kuta", description: "Pantai Kuta adalah salah satu pantai terkenal di Bali dengan pasir putih dan ombak yang cocok untuk berselancar.", excerpt: "Pantai Kuta, Bali", images: ["https://via.placeholder.com/600x400?text=Pantai+Kuta+1", "https://via.placeholder.com/600x400?text=Pantai+Kuta+2", "https://via.placeholder.com/600x400?text=Pantai+Kuta+3"] },
    { id: 2, title: "Gunung Bromo", description: "Gunung Bromo adalah gunung berapi aktif di Jawa Timur yang menawarkan pemandangan matahari terbit yang menakjubkan.", excerpt: "Gunung Bromo, Jawa Timur", images: ["https://via.placeholder.com/600x400?text=Gunung+Bromo+1", "https://via.placeholder.com/600x400?text=Gunung+Bromo+2", "https://via.placeholder.com/600x400?text=Gunung+Bromo+3"] },
    { id: 3, title: "Candi Borobudur", description: "Candi Borobudur adalah candi Buddha terbesar di dunia yang terletak di Jawa Tengah, Indonesia.", excerpt: "Candi Borobudur, Jawa Tengah", images: ["https://via.placeholder.com/600x400?text=Candi+Borobudur+1", "https://via.placeholder.com/600x400?text=Candi+Borobudur+2", "https://via.placeholder.com/600x400?text=Candi+Borobudur+3"] },
    // Add more items here
];

const ITEMS_PER_PAGE = 3;

export async function getServerSideProps(context) {
    const { id } = context.params;

    // Fetch selected place details
    const place = staticPlaces.find(p => p.id === parseInt(id));

    // Fetch latest places
    const latestPlaces = staticPlaces.slice(-ITEMS_PER_PAGE);

    return {
        props: {
            place,
            latestPlaces
        },
    };
}

export default function PlaceDetail({ place, latestPlaces }) {
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % place.images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [place.images.length]);

    if (!place) {
        return <div>Place not found</div>;
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
                        gap: 40px; /* Increased gap for larger screens */
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
                .image-gallery img {
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
                .image-gallery img.active {
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
                <meta property="og:image" content={place.images[0]} />
            </Head>

            <NavBarTop />

            <main>
                <div className="bg-color-primary">
                    <Breadcrumb pageName={place.title} currentPage={place.title} />
                </div>

                <div className="container my-5 main-section">
                    <div className="details">
                        <h1>{place.title}</h1>
                        <div className="image-gallery">
                            {place.images.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={place.title}
                                    className={currentImage === index ? 'active' : ''}
                                />
                            ))}
                        </div>

                        <p>{place.description}</p>
                    </div>
                    <div className="sidebar">
                        <h2>Latest Places</h2>
                        <div className="latest-places">
                            {latestPlaces.map(latest => (
                                <div className="place-card" key={latest.id}>
                                    <PlaceCard
                                        id={latest.id}
                                        title={latest.title}
                                        excerpt={latest.excerpt}
                                        images={latest.images}
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
