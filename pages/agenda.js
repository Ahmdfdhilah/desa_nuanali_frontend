import { useState, useEffect } from 'react';
import Head from 'next/head';
import NavBarTop from '../components/NavBarTop';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import AgendaCard from '../components/AgendaCard';
import BackToTop from '../components/BackToTop';

const title = "Agenda";
const ITEMS_PER_PAGE = 6; // Adjust as needed

export default function Agenda({ agendas }) {
    const [currentPage, setCurrentPage] = useState(1);
    const totalAgendas = agendas.length;
    const totalPages = Math.ceil(totalAgendas / ITEMS_PER_PAGE);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentAgendas = agendas.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    let [namaDesa, setNamaDesa] = useState("Nuniali");

    useEffect(() => {
        const storedNamaDesa = localStorage.getItem("namaDesa");
        setNamaDesa(storedNamaDesa || "Nuniali");
    }, []);

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
                .no-agendas {
                    text-align: center;
                    margin: 50px 0;
                    font-size: 1.5em;
                    color: var(--text-color-secondary);
                }
            `}</style>

            <Head>
                <title>{title}</title>
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
                    <Breadcrumb pageName="Agenda" currentPage="Agenda" />
                </div>

                <div className="container my-5">
                    <div className="main-section">
                        {currentAgendas.length > 0 ? (
                            <>
                                <div className="gallery">
                                    {currentAgendas.map(agenda => (
                                        <AgendaCard
                                            key={agenda.id}
                                            id={agenda.id}
                                            slug={agenda.slug}
                                            image={`https://nuniali-51afdf69a4d2.herokuapp.com${agenda.image}`}
                                            title={agenda.title}
                                            location={agenda.location}
                                            date={agenda.date}
                                            time={agenda.time}
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
                            </>
                        ) : (
                            <div className="no-agendas">
                                Tidak ada agenda saat ini
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
            <BackToTop />
        </>
    );
}

// Fetch all data from the API endpoint and pass it as props
export async function getServerSideProps() {
    const res = await fetch('https://nuniali-51afdf69a4d2.herokuapp.com/agendas');
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await res.json();

    return {
        props: {
            agendas: data.data,
        }
    };
}
