import { useEffect, useState } from 'react';
import Head from 'next/head';
import NavBarTop from '../components/NavBarTop';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import VideoCard from '../components/VideoCard';
import BackToTop from '../components/BackToTop';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ITEMS_PER_PAGE = 6;

export default function Video({ videos }) {
    const [currentPage, setCurrentPage] = useState(1);
    const totalVideos = videos.length;
    const totalPages = Math.ceil(totalVideos / ITEMS_PER_PAGE);

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // Sort videos to prioritize horizontal ones
    const sortedVideos = [...videos].sort((a, b) => a.isVertical - b.isVertical);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentVideos = sortedVideos.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const [namaDesa, setNamaDesa] = useState("Nuniali");

    useEffect(() => {
        const storedNamaDesa = localStorage.getItem("namaDesa");
        setNamaDesa(storedNamaDesa || "Nuniali");
    }, []);

    return (
        <>
            <style jsx>{`
                .intro {
                    text-align: center;
                    margin-bottom: 40px;
                }
                .intro h1 {
                    font-size: 2.5em;
                    color: var(--text-color-primary);
                }
                .intro p {
                    font-size: 1.1em;
                    color: var(--text-color-secondary);
                    max-width: 800px;
                    margin: 0 auto;
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
                    color: var(--text-color-primary);
                    cursor: pointer;
                    border-radius: 5px;
                    font-size: 16px;
                    transition: background-color 0.3s;
                }
                .pagination button:hover {
                    background-color: var(--bg-color-tertiary);
                }
                .pagination button.disabled {
                    background-color: #ddd;
                    color: #aaa;
                    cursor: not-allowed;
                }
                .pagination span {
                    display: flex;
                    align-items: center;
                    font-size: 16px;
                }
                .pagination .page-number {
                    font-size: 16px;
                }
                .no-videos {
                    text-align: center;
                    margin: 50px 0;
                    font-size: 1.5em;
                    color: var(--text-color-secondary);
                }
            `}</style>

            <Head>
                <title>Video</title>
                <meta name="description" content={`Website Desa ${namaDesa}`} />
                <link rel="icon" href="/favicon.ico" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={process.env.NEXT_PUBLIC_API_URL} />
                <meta property="og:title" content={`Situs Resmi Desa ${namaDesa}`} />
                <meta property="og:description" content={`Website Resmi Desa ${namaDesa}. Media komunikasi dan transparansi Pemerintah Desa`} />
                <meta property="og:image" content={`${process.env.NEXT_PUBLIC_API_URL}/metalogo.jpg`} />
            </Head>

            <NavBarTop />

            <main>
                <div className="bg-color-primary">
                    <Breadcrumb pageName="Galeri" currentPage="Video" />
                </div>

                {videos ? (
                    <>
                        <div className="container my-5">
                            <div className="row g-4">
                                {currentVideos.map(video => (
                                    <div
                                        className={`col-md-${video.isVertical ? '6' : '6'}`}
                                        key={video.id}
                                    >
                                        <VideoCard src={video.link} isVertical={video.isVertical} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="pagination">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={currentPage === 1 ? 'disabled' : ''}
                            >
                                Previous
                            </button>
                            <span className="page-number">Page {currentPage} of {totalPages}</span>
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={currentPage === totalPages ? 'disabled' : ''}
                            >
                                Next
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="no-videos">
                        Tidak ada video saat ini
                    </div>
                )}
            </main >

            <Footer />
            <BackToTop />
        </>
    );
}

export async function getServerSideProps() {
    const res = await fetch('http://localhost:3000/videos');
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await res.json();

    return {
        props: {
            videos: data,
        }
    };
}
