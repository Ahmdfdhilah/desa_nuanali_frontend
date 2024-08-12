import Head from 'next/head';
import NavBarTop from '../components/NavBarTop';
import Breadcrumb from '../components/Breadcrumb';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const title = "Lembaga di Desa";
const staticInstitutions = [
    { id: 1, name: "Kantor Desa", description: "Kantor pusat administrasi desa yang melayani berbagai kebutuhan administrasi dan masyarakat.", image: "https://via.placeholder.com/600x400?text=Kantor+Desa", contact: "0821-1234-5678", layout: "left" },
    { id: 2, name: "Puskesmas", description: "Fasilitas kesehatan pertama yang memberikan layanan medis dasar kepada masyarakat.", image: "https://via.placeholder.com/600x400?text=Puskesmas", contact: "0821-2345-6789", layout: "right" },
    { id: 3, name: "Sekolah Dasar", description: "Sekolah untuk pendidikan dasar anak-anak di desa.", image: "https://via.placeholder.com/600x400?text=Sekolah+Dasar", contact: "0821-3456-7890", layout: "left" },
    { id: 4, name: "Posyandu", description: "Pos Pelayanan Terpadu untuk kesehatan ibu dan anak.", image: "https://via.placeholder.com/600x400?text=Posyandu", contact: "0821-4567-8901", layout: "right" },
    { id: 5, name: "Balai Desa", description: "Tempat kegiatan komunitas dan acara desa, termasuk rapat dan kegiatan sosial.", image: "https://via.placeholder.com/600x400?text=Balai+Desa", contact: "0821-5678-9012", layout: "left" },
];

export default function Lembaga() {
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
                .item-details p {
                    margin: 5px 0;
                    color: var(--text-color-secondary);
                }
                .item-details .contact {
                    font-size: 0.9em;
                    color: var(--text-color-secondary);
                    margin-top: 10px;
                }
                .item-container.left .item-details {
                    order: 1;
                }
                .item-container.left img {
                    order: 0;
                }
                .item-container.right .item-details {
                    order: 1;
                }
                .item-container.right img {
                    order: 0;
                }
                @media (max-width: 768px) {
                 .item-container.left .item-details {
                    order: 1;
                }
                .item-container.left img {
                    order: 0;
                }
                .item-container.right .item-details {
                    order: 1;
                }
                .item-container.right img {
                    order: 0;
                }
                }
                .side-content {
                    background-color: var(--bg-secondary);
                    padding: 20px;
                    border-radius: 10px;
                    margin-top: 20px;
                }
                .side-content h2 {
                    font-size: 1.8em;
                    color: var(--text-color-primary);
                }
                .side-content p {
                    font-size: 1em;
                    color: var(--text-color-secondary);
                }
                .side-content img {
                    width: 100%;
                    height: auto;
                    border-radius: 10px;
                    margin-top: 10px;
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
                        <section className="side-content" data-aos="fade-up">
                            <h2>Apa Itu Lembaga di Desa?</h2>
                            <p>Lembaga-lembaga di desa memainkan peran kunci dalam kehidupan sehari-hari masyarakat. Mereka menyediakan layanan penting, seperti administrasi, kesehatan, pendidikan, dan kegiatan komunitas. Berikut adalah penjelasan lebih rinci mengenai beberapa lembaga utama di desa:</p>
                            <img src="https://via.placeholder.com/600x400?text=Lembaga+Desa" alt="Lembaga Desa" />
                        </section>
                        <section className="intro" data-aos="fade-up">
                            <h1>Kenali Lembaga-lembaga di Desa</h1>
                            <p>Temukan berbagai lembaga penting yang ada di desa kami, termasuk fasilitas pelayanan publik, pendidikan, dan kegiatan komunitas.</p>
                        </section>

                        {staticInstitutions.map(institution => (
                            <div key={institution.id} className={`item-container ${institution.layout}`} data-aos="fade-up">
                                <img src={institution.image} alt={institution.name} />
                                <div className="item-details">
                                    <h3>{institution.name}</h3>
                                    <p>{institution.description}</p>
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
