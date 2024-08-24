import { useState, useEffect } from 'react';
import Head from 'next/head';
import NavBarTop from '../components/NavBarTop';
import Breadcrumb from '../components/Breadcrumb';
import PlaceCard from '../components/PlaceCard';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import AOS from 'aos';
import 'aos/dist/aos.css';

const title = "Tempat Wisata";
const ITEMS_PER_PAGE = 3;

export default function TempatWisata({ places }) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalItems = places.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentPlaces = places.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    useEffect(() => {
        AOS.init(); // Initialize AOS
    }, []);

    return (
        <>
            <style jsx>{`
                .main-section {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    background: var(--bg-color-primary);
                    color: var(--text-color-primary);
                    padding: 40px 0;
                }
                .intro {
                    text-align: center;
                    margin-bottom: 60px;
                    padding: 20px;
                    background: linear-gradient(135deg, rgba(255,255,255,0.9), rgba(0,0,0,0.1));
                    border-radius: 10px;
                }
                .intro h1 {
                    font-size: 2.8em;
                    color: var(--text-color-primary);
                    margin-bottom: 20px;
                    font-weight: bold;
                }
                .intro p {
                    font-size: 1.2em;
                    color: var(--text-color-secondary);
                    max-width: 800px;
                    margin: 0 auto;
                }
                .gallery {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 20px;
                    width: 100%;
                    max-width: 1200px;
                }
                .pagination {
                    display: flex;
                    justify-content: center;
                    margin: 20px 0;
                    gap: 10px;
                }
                .pagination button {
                    padding: 10px 20px;
                    border: none;
                    background-color: var(--bg-color-toggle);
                    color: var(--text-color-light);
                    cursor: pointer;
                    border-radius: 5px;
                    font-size: 16px;
                    transition: background-color 0.3s, transform 0.2s;
                }
                .pagination button:hover {
                    background-color: var(--bg-color-toggle-hover);
                    transform: scale(1.05);
                }
                .pagination button.disabled {
                    background-color: var(--bg-color-muted);
                    color: var(--text-color-muted);
                    cursor: not-allowed;
                }
                .pagination span {
                    display: flex;
                    align-items: center;
                    font-size: 16px;
                    color: var(--text-color-primary);
                }
                .pagination .page-number {
                    font-size: 16px;
                }
                @media (max-width: 768px) {
                    .intro h1 {
                        font-size: 2em;
                    }
                    .intro p {
                        font-size: 1em;
                    }
                }
            `}</style>

            <Head>
                <title>{title}</title>
                <meta name="description" content="Daftar tempat wisata" />
                <link rel="icon" href="/favicon.ico" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={process.env.NEXT_PUBLIC_API_URL} />
                <meta property="og:title" content="Tempat Wisata" />
                <meta property="og:description" content="Daftar tempat wisata menarik" />
                <meta property="og:image" content={`${process.env.NEXT_PUBLIC_API_URL}/metalogo.jpg`} />
            </Head>

            <NavBarTop />

            <main>
                <div className="bg-color-primary">
                    <Breadcrumb pageName="Tempat Wisata" currentPage="Tempat Wisata" />
                </div>

                <div className="container my-5">
                    <div className="main-section">
                        <section className="intro" data-aos="fade-up">
                            <h1>Temukan Tempat Wisata Terbaik Kami</h1>
                            <p>Jelajahi tempat-tempat wisata yang menawarkan keindahan dan keunikan dari berbagai penjuru Indonesia. Setiap lokasi memiliki daya tarik dan karakter tersendiri yang patut untuk dikunjungi.</p>
                        </section>

                        <div className="gallery">
                            {currentPlaces.map(place => (
                                <PlaceCard
                                    key={place.id}
                                    id={place.id}
                                    title={place.title}
                                    excerpt={place.excerpt}
                                    images={place.images}
                                    data-aos="fade-up"
                                />
                            ))}
                        </div>

                        <div className="pagination">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={currentPage === 1 ? 'disabled' : ''}
                                data-aos="fade-up"
                            >
                                Previous
                            </button>
                            <span className="page-number" data-aos="fade-up">Page {currentPage} of {totalPages}</span>
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={currentPage === totalPages ? 'disabled' : ''}
                                data-aos="fade-up"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />

            <BackToTop />
        </>
    );
}

export async function getServerSideProps() {
    const res = await fetch('https://nuniali.my.id/wisata');
    const datas = await res.json();
    const data = datas.data;

    const places = data.map(place => ({
        id: place.id,
        title: place.title,
        description: place.body,
        excerpt: `<a href="/tempatwisata/${place.id}">Baca Selengkapnya</a>`,
        images: place.foto || []
    }));

    return {
        props: {
            places
        }
    };
}
