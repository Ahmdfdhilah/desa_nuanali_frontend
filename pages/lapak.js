import { useEffect, useState } from "react";
import Head from "next/head";
import NavBarTop from "../components/NavBarTop";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import ProductCard from "../components/ProductCard";
import BackToTop from "../components/BackToTop";

const title = "Lapak Desa";

const staticProducts = [
    { id: 1, slug: "produk-a", name: "Produk A", category: "Kategori 1", price: "Rp100.000", image: "https://images.unsplash.com/photo-1518843875459-f738682238a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dmVnZXRhYmxlc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60", phone: "081234567890", seller: "Penjual A", description: "Deskripsi produk A.", location: "Desa A", contactPerson: "Kontak A" },
    { id: 2, slug: "produk-b", name: "Produk B", category: "Kategori 2", price: "Rp200.000", image: "https://images.unsplash.com/photo-1518843875459-f738682238a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dmVnZXRhYmxlc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60", phone: "081234567891", seller: "Penjual B", description: "Deskripsi produk B.", location: "Desa B", contactPerson: "Kontak B" },
    { id: 3, slug: "produk-c", name: "Produk C", category: "Kategori 3", price: "Rp300.000", image: "https://images.unsplash.com/photo-1518843875459-f738682238a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dmVnZXRhYmxlc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60", phone: "081234567892", seller: "Penjual C", description: "Deskripsi produk C.", location: "Desa C", contactPerson: "Kontak C" },
];

export default function Lapak() {
    const [namaDesa, setNamaDesa] = useState("Nuniali");

    useEffect(() => {
        const storedNamaDesa = localStorage.getItem("namaDesa");
        if (storedNamaDesa) {
            setNamaDesa(storedNamaDesa);
        }
    }, []);

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
                <meta property="og:image" content={`${process.env.NEXT_PUBLIC_API_URL}/metalogo.jpg`} />
            </Head>

            <NavBarTop />

            <main>
                <div className="bg-color-primary">
                    <Breadcrumb pageName="Lapak" currentPage="Lapak" />
                </div>

                <div className="container my-5">
                    <div className="row g-4">
                        {staticProducts.map(product => (
                            <div className="col-sm-6 col-md-4 col-lg-3" key={product.id}>
                                <ProductCard 
                                    id={product.id} 
                                    slug={product.slug} 
                                    name={product.name} 
                                    category={product.category}
                                    price={product.price} 
                                    image={product.image} 
                                    phone={product.phone}
                                    seller={product.seller} 
                                    description={product.description} 
                                    location={product.location}
                                    contactPerson={product.contactPerson}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />

            <BackToTop />
        </>
    );
};
