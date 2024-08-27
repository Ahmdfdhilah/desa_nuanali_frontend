import Head from 'next/head';
import NavBarTop from '../components/NavBarTop';
import Breadcrumb from '../components/Breadcrumb';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';

const title = "Lembaga di Desa";

export default function Lembaga({ lembaga }) {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <>
            <style jsx>{`
                .main-section {
                    padding: 20px;
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
                .item-container {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    margin-bottom: 40px;
                    background-color: var(--bg-card-primary);
                    border-radius: 10px;
                    overflow: hidden;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    border: 1px solid var(--border-color); /* Border untuk pemisah visual */
                }
                .item-container img {
                    width: 50%;
                    height: auto;
                    object-fit: cover;
                }
                .item-details {
                    padding: 20px;
                    width: 50%;
                }
                .item-details h3 {
                    margin: 0 0 10px;
                    font-size: 1.8em;
                    color: var(--text-color-primary);
                }
                .item-details .description-text{
                    margin: 5px 0;
                    color: var(--text-color-primary);
                }
                .item-details .contact {
                    font-size: 0.9em;
                    color: var(--text-color-secondary);
                    margin-top: 10px;
                }
                .item-container img {
                    order: 0;
                    background-color: var(--text-color-secondary);
                    object-fit: fill;
                }
                .item-container .item-details {
                    order: 1;
                }
                @media (max-width: 768px) {
                    .item-container {
                        flex-direction: column;
                    }
                    .item-container img, .item-details {
                        width: 100%;
                    }
                }
            `}</style>

            <Head>
                <title>{title}</title>
                <meta name="description" content="Daftar lembaga yang ada di desa" />
                <link rel="icon" href="/favicon.ico" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={process.env.NEXT_PUBLIC_API_URL} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content="Informasi tentang lembaga-lembaga penting di desa" />
                <meta property="og:image" content={`${process.env.NEXT_PUBLIC_API_URL}/metalogo.jpg`} />
            </Head>

            <NavBarTop />

            <main>
                <div className="bg-color-primary">
                    <Breadcrumb pageName="Lembaga" currentPage="Lembaga di Desa" />
                </div>

                <div className="container my-5">
                    <div className="main-section">
                        <section className="intro" data-aos="fade-up">
                            <h1>Kenali Lembaga-lembaga di Desa</h1>
                            <p>Temukan berbagai lembaga penting yang ada di desa kami, termasuk fasilitas pelayanan publik, pendidikan, dan kegiatan komunitas.</p>
                        </section>

                        {lembaga.map(institution => (
                            <div key={institution.id} className="item-container" data-aos="fade-up">
                                <img src={`https://nuniali-51afdf69a4d2.herokuapp.com${institution.image}`} alt={institution.name} />
                                <div className="item-details">
                                    <h3>{institution.name}</h3>
                                    <div className="text" dangerouslySetInnerHTML={{ __html: institution.description }}></div>
                                    <p className="contact">Kontak: {institution.contact}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />

            <BackToTop />
        </>
    );
}

export async function getServerSideProps({ res }) {
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
    );
    const response = await fetch(`https://nuniali-51afdf69a4d2.herokuapp.com/lembagas`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();

    return {
        props: { lembaga: data.data },
    };
}
