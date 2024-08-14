import Head from "next/head";
import NavBarTop from "../components/NavBarTop";
import Footer from "../components/Footer";
import BreadcrumbArea from "../components/BreadcrumbArea";
import Image from "next/image";
import BackToTop from "../components/BackToTop";
import { MdCheckCircle } from "react-icons/md";

const title = "Visi Misi";

export default function VisiMisi() {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content="Website Desa Nuniali" />
                <link rel="icon" href="/favicon.ico" />
                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content={process.env.NEXT_PUBLIC_API_URL} />
                <meta property="og:title" content="Situs Resmi Desa Nuniali" />
                <meta property="og:description" content="Website Resmi Desa Nuniali. Media komunikasi dan transparansi Pemerintah Desa" />
                <meta property="og:image" content={`${process.env.NEXT_PUBLIC_API_URL}/metalogo.jpg`} />
            </Head>

            <NavBarTop />

            <main>
                <BreadcrumbArea pageName="Visi Misi" currentPage="Visi Misi" />

                <div className="container my-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-10 col-md-12">
                            <div className="row">
                                {/* Vision Card */}
                                <div className="col-md-12 mb-4 ">
                                    <div className="border-0 shadow-sm">
                                        <h5 className="card-title text-color-primary mb-3">Visi</h5>
                                        <p className="card-text text-color-muted fw-bold">
                                            “ Terwujudnya Desa Nuniali sebagai Desa yang Mandiri melalui Pengembangan Ekonomi Berbasis Potensi Sumber Daya Alam untuk mencapai masyarakat makmur dan agamis ”
                                        </p>
                                    </div>
                                </div>

                                {/* Mission Cards */}
                                <div className="col-md-12">
                                    <h5 className="text-color-primary mb-4">Misi</h5>
                                    <div className="row">
                                        {[
                                            "Mewujudkan dan mengembangkan kegiatan keagamaan untuk menambah keimanan dan ketaqwaan kepada Tuhan Yang Maha Esa.",
                                            "Mewujudkan dan mendorong terjadinya usaha-usaha kerukunan antar dan intern warga masyarakat yang disebabkan karena adanya perbedaan agama, keyakinan, organisasi, dan lainnya dalam suasana saling menghargai dan menghormati.",
                                            "Membangun dan meningkatkan hasil perkebunan dengan jalan penataan pengairan dan pemupukan.",
                                            "Menata Pemerintahan Desa Nuniali yang kompak dan bertanggung jawab dalam mengemban amanat masyarakat.",
                                            "Meningkatkan pelayanan masyarakat secara terpadu dan serius.",
                                            "Membangun dan mendorong majunya bidang pendidikan baik formal maupun informal yang mudah diakses dan dinikmati seluruh warga masyarakat tanpa terkecuali yang mampu menghasilkan insan intelektual, inovatif dan enterpreneur (wirausahawan).",
                                            "Meningkatkan SDM masyarakat agat lebih mampu dalam mengakses Computer dan Internet.",
                                            "Meningkatkan kesehatan masyarakat."
                                        ].map((mission, index) => (
                                            <div key={index} className="col-md-6 mb-3">
                                                <div className="card border-0 shadow-sm bg-card-primary">
                                                    <div className="card-body d-flex">
                                                        <div className="me-2">
                                                            <MdCheckCircle className="text-color-primary" />
                                                        </div>
                                                        <p className="text-color-muted">
                                                            {mission}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
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
