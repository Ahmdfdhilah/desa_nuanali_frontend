import { useState } from 'react';
import Head from 'next/head';
import NavBarTop from '../components/NavBarTop';
import Breadcrumb from '../components/Breadcrumb';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import AchievementCard from '../components/AchievementCard';

const title = "Prestasi";

const staticAchievements = [
    { id: 1, title: "Penghargaan Inovasi", description: "Penghargaan ini diberikan untuk inovasi luar biasa di bidang teknologi.", images: ["https://via.placeholder.com/600x400?text=Penghargaan+Inovasi+1", "https://via.placeholder.com/600x400?text=Penghargaan+Inovasi+2"] },
    { id: 2, title: "Kemenangan Kompetisi", description: "Kemenangan dalam kompetisi nasional di bidang sains.", images: ["https://via.placeholder.com/600x400?text=Kemenangan+Kompetisi+1", "https://via.placeholder.com/600x400?text=Kemenangan+Kompetisi+2"] },
    { id: 3, title: "Sertifikat Keberhasilan", description: "Sertifikat yang diakui untuk keberhasilan akademis.", images: ["https://via.placeholder.com/600x400?text=Sertifikat+Keberhasilan+1", "https://via.placeholder.com/600x400?text=Sertifikat+Keberhasilan+2"] },
];

const ITEMS_PER_PAGE = 5;

export default function Prestasi() {
    const [currentPage, setCurrentPage] = useState(1);

    const totalItems = staticAchievements.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentAchievements = staticAchievements.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <>
            <style jsx>{`
                .main-section {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
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
            `}</style>

            <Head>
                <title>{title}</title>
                <meta name="description" content="Galeri prestasi" />
                <link rel="icon" href="/favicon.ico" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={process.env.NEXT_PUBLIC_API_URL} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content="Galeri prestasi menarik" />
                <meta property="og:image" content={`${process.env.NEXT_PUBLIC_API_URL}/metalogo.jpg`} />
            </Head>

            <NavBarTop />

            <main>
                <div className="bg-color-primary">
                    <Breadcrumb pageName="Prestasi" currentPage="Prestasi" />
                </div>

                <div className="container my-5">
                    <div className="main-section">
                        <section className="intro">
                            <h1>Prestasi Kami</h1>
                            <p>Berikut adalah beberapa prestasi yang telah diraih yang mencerminkan dedikasi dan usaha luar biasa dari komunitas kami. Jelajahi pencapaian-pencapaian ini untuk lebih memahami kontribusi kami di berbagai bidang.</p>
                        </section>

                        <div className="gallery">
                            {currentAchievements.map(achievement => (
                                <AchievementCard
                                    key={achievement.id}
                                    id={achievement.id}
                                    title={achievement.title}
                                    excerpt={achievement.description}
                                    images={achievement.images}
                                />
                            ))}
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
                    </div>
                </div>
            </main>

            <Footer />

            <BackToTop />
        </>
    );
}
