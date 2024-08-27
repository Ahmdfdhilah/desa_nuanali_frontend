import { useState, useCallback } from 'react';
import Head from 'next/head';
import NavBarTop from '../components/NavBarTop';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import Gallery from 'react-photo-gallery';
import Carousel, { Modal, ModalGateway } from 'react-images';
import BackToTop from '../components/BackToTop';

const title = "Foto";
const ITEMS_PER_PAGE = 6; // Define how many items you want per page

export async function getServerSideProps() {
    const res = await fetch("https://nuniali.my.id/photos");
    const data = await res.json();

    const photos = data.data.map(photo => ({
        src: `https://nuniali.my.id${photo.src}`,
        width: 4, // Adjust width as needed
        height: 3, // Adjust height as needed
    }));

    return {
        props: {
            photos: photos,
            total: data.total // Ensure that your API returns total count
        },
    };
}

export default function Foto({ photos, total }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);

    const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentPhotos = photos.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const openLightbox = useCallback((event, { photo, index }) => {
        setCurrentImage(index);
        setViewerIsOpen(true);
    }, []);

    const closeLightbox = () => {
        setCurrentImage(0);
        setViewerIsOpen(false);
    };

    const lightboxStyles = {
        header: (base) => ({ ...base, opacity: 1, transform: "translateY(10px)", top: "-10" }),
        navigation: (base) => ({ ...base, opacity: 1, background: "rgba(0, 0, 0, 0.8)" }),
        navigationPrev: (base) => ({ ...base, background: "rgba(0, 0, 0, 0.5) !important" }),
        navigationNext: (base) => ({ ...base, background: "rgba(0, 0, 0, 0.5) !important" }),
        footer: (base) => ({ ...base, opacity: 1, transform: "translateY(-10px)", bottom: "-10" })
    };

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={`Website Desa Nuniali`} />
                <link rel="icon" href="/favicon.ico" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={process.env.NEXT_PUBLIC_API_URL} />
                <meta property="og:title" content={`Situs Resmi Desa Nunial`} />
                <meta property="og:description" content={`Website Resmi Desa Nunial. Media komunikasi dan transparansi Pemerintah Desa`} />
                <meta property="og:image" content={`${process.env.NEXT_PUBLIC_API_URL}/metalogo.jpg`} />
            </Head>

            <NavBarTop />

            <main>
                <div className="bg-color-primary">
                    <Breadcrumb pageName="Galeri" currentPage="Foto" />
                </div>

                <div className="container my-5">
                    <Gallery photos={currentPhotos} onClick={openLightbox} />
                    <ModalGateway>
                        {viewerIsOpen ? (
                            <Modal onClose={closeLightbox}>
                                <Carousel 
                                    styles={lightboxStyles}
                                    showNavigationOnTouchDevice={true}
                                    currentIndex={currentImage}
                                    views={currentPhotos.map(x => ({
                                        ...x,
                                        srcset: x.srcSet,
                                        caption: x.title
                                    }))}
                                />
                            </Modal>
                        ) : null}
                    </ModalGateway>

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
            </main>

            <Footer />

            <BackToTop />

            <style jsx>{`
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
        </>
    );
}
