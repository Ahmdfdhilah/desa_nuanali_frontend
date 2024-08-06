import { useEffect, useState } from "react";
import Head from "next/head";
import NavBarTop from "../components/NavBarTop";
import Footer from "../components/Footer";
import BreadcrumbArea from "../components/BreadcrumbArea";
import Image from "next/image";
import BackToTop from "../components/BackToTop";

const title = "Struktur";

export default function Struktur({ struktur }) {
    const [namaDesa, setNamaDesa] = useState("Nuniali");

    const sortedStruktur = struktur.sort((a, b) => {
        const order = {
            "Kepala Desa": 1,
            "Sekretaris Desa": 2,
            "BPD": 3,
            "Wakil Kepala Desa": 4,
        };
        return (order[a.jabatan] || 5) - (order[b.jabatan] || 5);
    });

    return (
        <>
            <style jsx>
                {`
            `}
            </style>

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
                        <div className="row g-4 my-2" key={index}>
                            <div className="col-sm-3">
                                <div className="card bg-card-primary shadow-sm rounded border-0 px-3 py-3">
                                    <Image alt={`Foto ${item.jabatan}`} src={`http://localhost:3000${item.foto}`} width={200} height={200} quality={90} className="img-fluid mx-auto rounded" />
                                </div>
                            </div>
                            <div className="col-sm-9">
                                <div className="card bg-card-primary shadow-sm rounded border-0 px-3 py-3">
                                    <h4 className="text-color-primary">{item.name}</h4>
                                    <div className="table-responsive mt-3">
                                        <table className="table text-color-secondary table-bordered table-bordered-primary">
                                            <tbody>
                                                <tr>
                                                    <td>Jabatan</td>
                                                    <td>{item.jabatan}</td>
                                                </tr>
                                                <tr>
                                                    <td>Alamat</td>
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
    const response = await fetch(`http://localhost:3000/strukturs`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const datas = await response.json();
    
    const data = datas.data;
    return {
        props: { struktur: data },
    };
};
