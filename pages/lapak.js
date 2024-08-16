import { useEffect, useState } from "react";
import Head from "next/head";
import NavBarTop from "../components/NavBarTop";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import ProductCard from "../components/ProductCard";
import BackToTop from "../components/BackToTop";
import axios from "axios";

const title = "Lapak Desa";

export async function getServerSideProps() {
    try {
        const response = await axios.get('https://nuniali-51afdf69a4d2.herokuapp.com/lapak');
        const products = response.data.data;
    
        return {
            props: {
                products,
            },
        };
    } catch (error) {
        console.error("Failed to fetch products:", error);
        return {
            props: {
                products: [],
            },
        };
    }
}

export default function Lapak({ products }) {
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
                        {products.map(product => (
                            <div className="col-sm-6 col-md-4 col-lg-3" key={product.id}>
                                <ProductCard 
                                    id={product.id} 
                                    slug={product.slug || product.id} 
                                    name={product.name} 
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
}
