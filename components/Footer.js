import Image from "next/image";
import imgLogo from "../public/logo-nuanali.png";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Footer() {
    return (
        <>
            <style jsx>{`
                footer {
                    background-color: #171717;
                    color: #d4d4d4;
                    padding: 20px 0;
                }
                footer a {
                    color: #d4d4d4;
                }
                footer a:hover {
                    color: #0d6efd;
                    transition: color 0.3s ease;
                }
                .text-white-80 {
                    color: #d4d4d4;
                }
                .border-top-dark {
                    border-top: 1px solid #4141417c !important;
                }
                .text-15 {
                    font-size: 16px;
                }
                .img-fluid {
                    max-width: 100%;
                    height: auto;
                }
                .footer-logo {
                    margin-bottom: 15px;
                }
                .footer-title {
                    font-size: 1.25rem;
                    margin-bottom: 15px;
                }
                .footer-list li {
                    margin-bottom: 10px;
                }
                .social-icons i {
                    font-size: 1.5rem;
                    margin: 0 10px;
                }
                @media (max-width: 768px) {
                    .footer-logo {
                        text-align: center;
                    }
                    .social-icons {
                        text-align: center;
                        margin-top: 15px;
                    }
                    .footer-content {
                        text-align: center;
                    }
                    .footer-list {
                        text-align: center;
                        padding: 0;
                    }
                    .footer-list li {
                        margin-bottom: 10px;
                    }
                }
            `}</style>

            <footer>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-lg-4 my-2 my-md-0">
                            <Image src={imgLogo} alt="Logo" height={100} width={100} />
                            <h4 className="footer-title">Tentang Web</h4>
                            <p className="text-white-80 text-15">Website Resmi Desa Negeri Nuniali, Kecamatan Taniwel, Seram Bagian Barat, Maluku. Media komunikasi dan transparansi Pemerintah Desa.</p>
                        </div>
                        <div className="col-md-6 col-lg-3 my-2 my-md-0">
                            <h5 className="mb-3 footer-title">Kontak Desa</h5>
                            <ul className="list-unstyled text-white-80 text-decoration-none text-15 footer-list">
                                <li>
                                    <div className="d-flex align-items-center">
                                        <FaMapMarkerAlt className="me-2" />
                                        Negeri Nuniali, Kecamatan Taniwel, Seram Bagian Barat, Maluku
                                    </div>
                                </li>
                                <li>
                                    <FaPhoneAlt className="me-2" />
                                    081 234 567 89
                                </li>
                                <li>
                                    <FaEnvelope className="me-2" />
                                    admin@web.id
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-6 col-lg-3 my-2 my-md-0">
                            <h5 className="mb-3 footer-title">Kontak Penting</h5>
                            <ul className="list-unstyled text-white-80 text-decoration-none text-15 footer-list">
                                <li>Puskesmas - (0321) 876208</li>
                                <li>Polsek - (0321) 861184</li>
                                <li>Damkar - (0321) 854928</li>
                                <li>PLN - 123</li>
                            </ul>
                        </div>
                        <div className="col-md-6 col-lg-2 my-2 my-md-0">
                            <h5 className="mb-3 footer-title">Aplikasi Desa</h5>
                            <ul className="list-unstyled text-white-80 text-decoration-none text-15 footer-list">
                                <li><a href="#" className="text-decoration-none">Sistem Desa</a></li>
                                <li><a href="#" className="text-decoration-none">Pengaduan Online</a></li>
                                <li><a href="#" className="text-decoration-none">Pengajuan Surat</a></li>
                                <li><a href="#" className="text-decoration-none">Info Kesehatan</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="row pt-3 pb-md-0 mt-4 border-top-dark">
                        <div className="col-md-8 text-center text-md-start text-15 footer-content">
                            <p className="text-white-80">Copyright ©
                                <a href="#" className="text-decoration-none text-white-80"> Desa Nuniali</a>.
                                All rights reserved
                            </p>
                        </div>
                        <div className="col-md-4 mb-3 text-center text-md-end social-icons">
                            <a href="https://web.facebook.com/" className="mx-2 text-white-80" aria-label="Facebook" rel="noreferrer" target="_blank"><FaFacebook /></a>
                            <a href="https://twitter.com/" className="mx-2 text-white-80" aria-label="Twitter" rel="noreferrer" target="_blank"><FaTwitter /></a>
                            <a href="https://www.youtube.com/" className="mx-2 text-white-80" aria-label="Youtube" rel="noreferrer" target="_blank"><FaYoutube /></a>
                            <a href="https://www.instagram.com/" className="mx-2 text-white-80" aria-label="Instagram" rel="noreferrer" target="_blank"><FaInstagram /></a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
