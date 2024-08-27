import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import NavBarTop from '../components/NavBarTop';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import BackToTop from '../components/BackToTop';
import Carousel, { Modal, ModalGateway } from 'react-images';
import axios from 'axios';

const title = "Bagan Pemerintahan";

export default function BaganPemerintahan() {
    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);
    const [diagramImage, setDiagramImage] = useState({
        src: '',
        width: 1200,
        height: 800,
        title: 'Bagan Struktur Pemerintahan',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const openLightbox = useCallback((index) => {
        setCurrentImage(index);
        setViewerIsOpen(true);
    }, []);

    const closeLightbox = () => {
        setCurrentImage(0);
        setViewerIsOpen(false);
    };

    useEffect(() => {
        const fetchDiagramImage = async () => {
            try {
                const response = await axios.get('https://nuniali.my.id/bagan'); // Update the URL as needed
                if (response.data && response.data.img) {
                    setDiagramImage({
                        src: `https://nuniali.my.id${response.data.img}`, // Update this path as needed
                        width: 1200,
                        height: 800,
                        title: 'Bagan Struktur Pemerintahan',
                    });
                }
            } catch (error) {
                console.error('Error fetching diagram image:', error);
                setError('Failed to load image.');
            } finally {
                setLoading(false);
            }
        };

        fetchDiagramImage();
    }, []);

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content="Bagan struktur pemerintahan desa" />
                <link rel="icon" href="/favicon.ico" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={process.env.NEXT_PUBLIC_API_URL} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content="Bagan struktur pemerintahan desa yang menggambarkan struktur organisasi." />
                <meta property="og:image" content={`${process.env.NEXT_PUBLIC_API_URL}/metalogo.jpg`} />
            </Head>

            <NavBarTop />

            <main>
                <div className="bg-color-primary">
                    <Breadcrumb pageName="Bagan Pemerintahan" currentPage={title} />
                </div>

                <div className="container my-5">
                    <section className="intro" data-aos="fade-up">
                        <h1>{title}</h1>
                        <p>Berikut adalah bagan besar yang menggambarkan struktur pemerintahan desa kami. Klik gambar untuk melihat dengan lebih jelas.</p>
                    </section>

                    <div className="diagram-container" data-aos="fade-up" onClick={() => openLightbox(0)}>
                        {loading ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <p>{error}</p>
                        ) : (
                            <Image 
                                src={diagramImage.src}
                                alt={diagramImage.title}
                                width={diagramImage.width}
                                height={diagramImage.height}
                                layout="responsive"
                                style={{ cursor: 'pointer' }}
                            />
                        )}
                    </div>

                    <ModalGateway>
                        {viewerIsOpen ? (
                            <Modal onClose={closeLightbox}>
                                <Carousel
                                    currentIndex={currentImage}
                                    views={[diagramImage]}
                                />
                            </Modal>
                        ) : null}
                    </ModalGateway>
                </div>
            </main>

            <Footer />

            <BackToTop />

            <style jsx>{`
                .diagram-container {
                    text-align: center;
                    margin: 40px 0;
                }
                .diagram-container img {
                    max-width: 100%;
                    height: auto;
                    border: 1px solid var(--border-color); /* Border untuk pemisah visual */
                }
            `}</style>
        </>
    );
}
