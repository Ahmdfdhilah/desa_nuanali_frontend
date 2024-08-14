import { useState, useEffect } from "react";
import Head from "next/head";
import NavBarTop from "../components/NavBarTop";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import PostCard from "../components/PostCard";
import BackToTop from "../components/BackToTop";

const title = "Berita";
const ITEMS_PER_PAGE = 6; // Adjust as needed

export default function Berita({ posts }) {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPosts = posts.length;
    const totalPages = Math.ceil(totalPosts / ITEMS_PER_PAGE);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentPosts = posts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    let [namaDesa, setNamaDesa] = useState("Nuniali");

    useEffect(() => {
        const storedNamaDesa = localStorage.getItem("namaDesa");
        if (storedNamaDesa) {
            setNamaDesa(storedNamaDesa);
        }
    }, []);

    return (
        <>
            <style jsx global>{`
                html, body {
                    height: 100%;
                    margin: 0;
                    padding: 0;
                }
                #__next {
                    display: flex;
                    flex-direction: column;
                    min-height: 100vh;
                }
                main {
                    flex: 1;
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
                .no-posts {
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
                    <Breadcrumb pageName="Berita" currentPage="Berita" />
                </div>

                <div className="container my-5">
                    {currentPosts.length > 0 ? (
                        <>
                            <div className="row g-4">
                                {currentPosts.map(post => (
                                    <div className="col-sm-6 col-md-6 col-lg-4" key={post.id}>
                                        <PostCard
                                            id={post.id}
                                            image={`http://localhost:3000${post.image}`}
                                            title={post.title}
                                            slug={post.slug}
                                            author={post.author}
                                            date={post.date}
                                            excerpt={post.excerpt} />
                                    </div>
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
                        <div className="no-posts">
                            Tidak ada berita saat ini
                        </div>
                    )}
                </div>
            </main>

            <Footer />

            <BackToTop />
        </>
    );
}

// Fetch all data from the API endpoint and pass it as props
export async function getServerSideProps() {
    const res = await fetch('http://localhost:3000/beritas');
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await res.json();

    return {
        props: {
            posts: data.data
        }
    };
}
