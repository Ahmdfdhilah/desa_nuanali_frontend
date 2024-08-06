import { useEffect, useState } from "react";
import Head from "next/head";
import NavBarTop from "../components/NavBarTop";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import BackToTop from "../components/BackToTop";
import { formatRupiah } from "../utils/formatRp";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const title = "Dana Desa";
const colors = ["#36b9cc", "#e74a3b", "#fd7e14", "#f6c23e"];
const options = {
    plugins: {
        legend: {
            labels: {
                font: {},
                color: "#888"
            }
        }
    }
};

export default function DanaDesa({ danadesa }) {
    const [namaDesa, setNamaDesa] = useState("Alang Alang");

    useEffect(() => {
        const storedNamaDesa = localStorage.getItem("namaDesa");
        if (storedNamaDesa) {
            setNamaDesa(storedNamaDesa);
        }
    }, []);

    const [totalPendapatanAnggaran, totalPendapatanRealisasi, totalPendapatanSelisih, totalPendapatanPresentase] = getTotalData(danadesa.filter(item => item.tipe === 'Pendapatan'));
    const [totalBelanjaAnggaran, totalBelanjaRealisasi, totalBelanjaSelisih, totalBelanjaPresentase] = getTotalData(danadesa.filter(item => item.tipe === 'Belanja'));
    const [totalPembiayaanAnggaran, totalPembiayaanRealisasi, totalPembiayaanSelisih, totalPembiayaanPresentase] = getTotalData(danadesa.filter(item => item.tipe === 'Pembiayaan'));

    const dataDanaDesa = {
        labels: ["Pendapatan", "Belanja", "Pembiayaan"],
        datasets: [{
            data: [totalPendapatanRealisasi, totalBelanjaRealisasi, totalPembiayaanRealisasi],
            backgroundColor: colors
        }]
    };

    return (
        <>
            <style jsx>
                {`
                .shadow-card {
                    box-shadow: 0 4px 16px rgb(0 0 0 / 10%);
                }
                .fw-600 {
                    font-weight: 600;
                }
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
                <div className="bg-color-primary">
                    <Breadcrumb pageName="Dana Desa" currentPage="Dana Desa" />
                </div>

                <div className="container my-5">
                    <div className="card bg-card-primary rounded shadow-card border-0 my-5">
                        <div className="card-header bg-color-secondary py-3">
                            <h5 className="m-0 font-weight-bold text-color-primary">Dana Desa</h5>
                        </div>
                        <div className="card-body">
                            <h5 className="text-color-primary">Grafik</h5>
                            <div className="col-md-8 col-lg-5 mx-auto">
                                <Doughnut
                                    options={options}
                                    data={dataDanaDesa}
                                    width={400}
                                    height={250}
                                />
                            </div>
                            <h5 className="mt-5 text-color-primary">Tabel Data</h5>
                            <div className="table-responsive mt-3">
                                <table className="table table-bordered table-bordered-primary text-color-secondary">
                                    <thead>
                                        <tr>
                                            <th>Uraian</th>
                                            <th>Anggaran (Rp.)</th>
                                            <th>Realisasi (Rp.)</th>
                                            <th>Lebih/Kurang (Rp.)</th>
                                            <th>Persentase (%)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="fw-bold">PENDAPATAN</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        {danadesa.filter(item => item.tipe === 'Pendapatan').map(item =>
                                            <tr key={item.id}>
                                                <td>{item.nama}</td>
                                                <td>{formatRupiah(item.anggaran)}</td>
                                                <td>{formatRupiah(item.realisasi)}</td>
                                                <td>{formatRupiah(item.anggaran - item.realisasi)}</td>
                                                <td>{((item.realisasi / item.anggaran) * 100).toFixed(2)}%</td>
                                            </tr>
                                        )}
                                        <tr>
                                            <td className="fw-bold">Jumlah</td>
                                            <td className="fw-bold">{formatRupiah(totalPendapatanAnggaran)}</td>
                                            <td className="fw-bold">{formatRupiah(totalPendapatanRealisasi)}</td>
                                            <td className="fw-bold">{formatRupiah(totalPendapatanSelisih)}</td>
                                            <td className="fw-bold">{totalPendapatanPresentase.toFixed(2)}%</td>
                                        </tr>
                                        <tr>
                                            <td colSpan="5"></td>
                                        </tr>

                                        <tr>
                                            <td className="fw-bold">BELANJA</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        {danadesa.filter(item => item.tipe === 'Belanja').map(item =>
                                            <tr key={item.id}>
                                                <td>{item.nama}</td>
                                                <td>{formatRupiah(item.anggaran)}</td>
                                                <td>{formatRupiah(item.realisasi)}</td>
                                                <td>{formatRupiah(item.anggaran - item.realisasi)}</td>
                                                <td>{((item.realisasi / item.anggaran) * 100).toFixed(2)}%</td>
                                            </tr>
                                        )}
                                        <tr>
                                            <td className="fw-bold">Jumlah</td>
                                            <td className="fw-bold">{formatRupiah(totalBelanjaAnggaran)}</td>
                                            <td className="fw-bold">{formatRupiah(totalBelanjaRealisasi)}</td>
                                            <td className="fw-bold">{formatRupiah(totalBelanjaSelisih)}</td>
                                            <td className="fw-bold">{totalBelanjaPresentase.toFixed(2)}%</td>
                                        </tr>
                                        <tr>
                                            <td colSpan="5"></td>
                                        </tr>

                                        <tr>
                                            <td className="fw-bold">PEMBIAYAAN</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        {danadesa.filter(item => item.tipe === 'Pembiayaan').map(item =>
                                            <tr key={item.id}>
                                                <td>{item.nama}</td>
                                                <td>{formatRupiah(item.anggaran)}</td>
                                                <td>{formatRupiah(item.realisasi)}</td>
                                                <td>{formatRupiah(item.anggaran - item.realisasi)}</td>
                                                <td>{((item.realisasi / item.anggaran) * 100).toFixed(2)}%</td>
                                            </tr>
                                        )}
                                        <tr>
                                            <td className="fw-bold">Jumlah</td>
                                            <td className="fw-bold">{formatRupiah(totalPembiayaanAnggaran)}</td>
                                            <td className="fw-bold">{formatRupiah(totalPembiayaanRealisasi)}</td>
                                            <td className="fw-bold">{formatRupiah(totalPembiayaanSelisih)}</td>
                                            <td className="fw-bold">{totalPembiayaanPresentase.toFixed(2)}%</td>
                                        </tr>
                                        <tr>
                                            <td colSpan="5"></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </main>

            <Footer />

            <BackToTop />
        </>
    );
}

// This gets called on every request to this page
export async function getServerSideProps({ res }) {
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
    )
    const getDataDanaDesa = await fetch('http://localhost:3000/dana-desas');
    const json = await getDataDanaDesa.json();
    const danadesa = json.data;

    return {
        props: { danadesa },
    };
}

// Count each row value for total row
function getTotalData(param) {
    const anggaran = [], realisasi = [], selisih = [], presentase = [];
    let totalAnggaran = 0, totalRealisasi = 0, totalSelisih = 0, totalPresentase = 0;
    param.forEach(item => {
        anggaran.push(parseFloat(item.anggaran));
        realisasi.push(parseFloat(item.realisasi));
        selisih.push(parseFloat(item.anggaran) - parseFloat(item.realisasi));
        presentase.push(((parseFloat(item.realisasi) / parseFloat(item.anggaran)) * 100));
    });

    totalAnggaran = anggaran.reduce((acc, cur) => acc + cur, 0);
    totalRealisasi = realisasi.reduce((acc, cur) => acc + cur, 0);
    totalSelisih = selisih.reduce((acc, cur) => acc + cur, 0);
    totalPresentase = presentase.reduce((acc, cur) => acc + cur, 0) / presentase.length;

    return [totalAnggaran, totalRealisasi, totalSelisih, totalPresentase];
}
