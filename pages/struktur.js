import { useEffect, useState } from "react";
import Head from "next/head";
import NavBarTop from "../components/NavBarTop";
import Footer from "../components/Footer";
import BreadcrumbArea from "../components/BreadcrumbArea";
import Image from "next/image";
import BackToTop from "../components/BackToTop";
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

const title = "Struktur";

export default function Struktur({ struktur }) {
    const [namaDesa, setNamaDesa] = useState("Nuniali");

    useEffect(() => {
        AOS.init({
            duration: 1000, // Duration of animation
            easing: 'ease-in-out', // Easing function
            once: true // Animation will happen only once
        });
    }, []);

    const sortedStruktur = struktur.sort((a, b) => {
        // Define priority order for job titles
        const priorityOrder = {
            "Kepala Desa": 1,
            "Ketua BPD": 2,
            "Sekretaris Desa": 3,
            "Sekretaris BPD": 4,
            "Anggota BPD": 5,
            "Kepala Seksi": 6,
            "Kaur": 7
        };

        // Function to determine priority
        const getPriority = (jabatan) => {
            if (priorityOrder[jabatan]) {
                return priorityOrder[jabatan];
            }
            if (jabatan.includes('Kepala Seksi')) {
                return priorityOrder['Kepala Seksi'];
            }
            if (jabatan.includes('Kaur')) {
                return priorityOrder['Kaur'];
            }
            return Infinity; // Default priority for other roles
        };

        const priorityA = getPriority(a.jabatan);
        const priorityB = getPriority(b.jabatan);
        return priorityA - priorityB;
    });

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={`Website Desa ${namaDesa}`} />
                <link rel="icon" href="/favicon.ico" />
                {/* <!-- Open Graph / Facebook --> */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content={process.env.NEXT_PUBLIC_API_URL} />
                <meta property="og:title" content={`Situs Resmi Desa ${namaDesa}`} />
                <meta property="og:description" content={`Website Resmi Desa ${namaDesa}. Media komunikasi dan transparansi Pemerintah Desa`} />
                <meta property="og:image" content={`${process.env.NEXT_PUBLIC_API_URL}/metalogo.jpg`}></meta>
            </Head>
            <NavBarTop />
            <main>
                <BreadcrumbArea pageName="Struktur Organisasi" currentPage="Struktur" />

                <div className="container my-5">
                    {sortedStruktur.map((item, index) => (
                        <div className="row g-4 my-2" key={index} data-aos="fade-up">
                            <div className="col-sm-3">
                                <div className="card bg-card-primary shadow-sm rounded border-0 px-3 py-3">
                                    <Image
                                        alt={`Foto ${item.jabatan}`}
                                        src={`https://nuniali.my.id${item.foto}`}
                                        width={300}
                                        height={300}
                                        quality={90}
                                        className="img-fluid mx-auto rounded object-fit-cover"
                                    />
                                </div>
                            </div>
                            <div className="col-sm-9">
                                <div className="card bg-card-primary shadow-sm rounded border-0 px-3 py-3">
                                    <h4 className="text-color-primary">{item.name}</h4>
                                    <div className="table-responsive mt-3">
                                        <table className="table text-color-secondary">
                                            <tbody>
                                                <tr>
                                                    <td>Jabatan : </td>
                                                    <td>{item.jabatan}</td>
                                                </tr>
                                                <tr>
                                                    <td>Alamat : </td>
                                                    <td>{item.alamat || "Desa"}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
            <BackToTop />
        </>
    );
};

export async function getServerSideProps({ res }) {
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
    );
    const response = await fetch(`https://nuniali.my.id/strukturs`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const datas = await response.json();
    
    const data = datas.data;
    return {
        props: { struktur: data },
    };
};
