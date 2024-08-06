import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import NavBarTop from "../../components/NavBarTop";
import Footer from "../../components/Footer";
import PostList from "../../components/PostList";
import AgendaList from "../../components/AgendaList";
import BackToTop from "../../components/BackToTop";
import { FaUser, FaRegCalendarAlt, FaShareAlt } from "react-icons/fa";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { FacebookIcon, TwitterIcon, WhatsappIcon, TelegramIcon, FacebookShareButton, TelegramShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";

export default function Agendaetail({ agenda, randomPosts, randomAgendas }) {
    const router = useRouter()
    let [namaDesa, setNamaDesa] = useState("Alang Alang");

    useEffect(() => {
        namaDesa = localStorage.getItem("namaDesa");
        setNamaDesa(namaDesa);
    });
    // Get 3 post
    const someRandomPosts = randomPosts.slice(0, 3);
    // Get 3 agenda
    const someRandomAgendas = randomAgendas.slice(0, 2);

    const popover = (
        <Popover id="popover-basic" className="bg-card-primary border-color-primary">
            <Popover.Body>
                <FacebookShareButton
                    url={`${process.env.NEXT_PUBLIC_API_URL}${router.asPath}`}
                    quote={agenda.title}
                    description={"Bagikan ke Facebook"}
                    className="me-2"
                >
                    <FacebookIcon size={32} round />
                </FacebookShareButton>
                <TwitterShareButton
                    url={`${process.env.NEXT_PUBLIC_API_URL}${router.asPath}`}
                    quote={agenda.title}
                    description={"Bagikan ke Twitter"}
                    className="me-2"
                >
                    <TwitterIcon size={32} round />
                </TwitterShareButton>
                <WhatsappShareButton
                    url={`${process.env.NEXT_PUBLIC_API_URL}${router.asPath}`}
                    quote={agenda.title}
                    description={"Bagikan ke Whatsapp"}
                    className="me-2"
                >
                    <WhatsappIcon size={32} round />
                </WhatsappShareButton>
                <TelegramShareButton
                    url={`${process.env.NEXT_PUBLIC_API_URL}${router.asPath}`}
                    quote={agenda.title}
                    description={"Bagikan ke Telegram"}
                >
                    <TelegramIcon size={32} round />
                </TelegramShareButton>
            </Popover.Body>
        </Popover>
    );

    return (
        <>
            <style jsx>
                {`
                main {
                    
                }
                .card-title {
                    font-weight: 500;
                }
                .shadow-blog {
                    box-shadow: 0 4px 16px rgb(0 0 0 / 10%);
                }
                .blog-meta a .icon {
                    font-size: 15px;
                }
                .blog-meta a {
                    font-size: 14px;
                    text-decoration: none;
                }
                .blog-meta a:hover {
                    color: #0d6efd;
                }
                .card-text {
                    font-size: 16px;
                }
            `}
            </style>

            <Head>
                <title>{`${agenda.title} - Desa ${namaDesa}`}</title>
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
                <div className="container py-5">
                    <div className="row g-4 g-lg-5">
                        {/* Start Main Content */}
                        <div className="col-lg-8">
                            <div className="card bg-card-primary shadow-blog border-0">
                                <Image
                                    alt="Image"
                                    src={`http://localhost:3000${agenda.image}`}
                                    width="450"
                                    height="400"
                                    quality={90}
                                    className="card-img-top img-fluid"
                                />
                                <div className="card-body">
                                    <h3 className="card-title text-color-primary">{agenda.title}</h3>
                                    <div className="d-block d-sm-flex blog-meta pt-2 text-color-muted">
                                        <div className="d-flex mb-2">
                                            <FaRegCalendarAlt />
                                            <small className="text-muted ms-2">{agenda.date}</small>
                                        </div>
                                    </div>
                                    <p className="card-text mt-2 text-color-secondary" dangerouslySetInnerHTML={{ __html: agenda.body }}></p>
                                    <div className="d-flex justify-content-end mt-4 mb-2">
                                        <OverlayTrigger trigger="click" placement="left" overlay={popover}>
                                            <button className="btn btn-outline-primary btn-sm"><FaShareAlt className="me-2" />Bagikan</button>
                                        </OverlayTrigger>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* End Main Content */}

                        {/* Start Right Content */}
                        <div className="col-lg-4">
                            <div className="card bg-card-primary shadow-blog border-0 px-3 py-2">
                                <h5 className="mb-3 text-color-primary">Random Posts</h5>
                                {someRandomPosts.map(item =>
                                    <div key={item.id}>
                                        <PostList
                                            id={item.id}
                                            image={`http://localhost:3000${item.image}`}
                                            title={item.title}
                                            slug={item.slug}
                                            date={item.date}
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="card bg-card-primary shadow-blog border-0 px-3 py-2 mt-4">
                                <h5 className="mb-3 text-color-primary">Latest Agenda</h5>
                                {someRandomAgendas.map(item =>
                                    <div key={item.id}>
                                        <AgendaList
                                            id={item.id}
                                            image={`http://localhost:3000${item.image}`}
                                            title={item.title}
                                            slug={item.slug}
                                            date={item.date}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* End Right Content */}
                    </div>
                </div>
            </main>

            <Footer />

            <BackToTop />
        </>
    );
};

export async function getServerSideProps({ params, res }) {
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
    );

    const [responseRandomAgenda, responseRandomPost, responseSingleAgenda] = await Promise.all([
        fetch(`http://localhost:3000/agendas`),
        fetch(`http://localhost:3000/beritas`),
        fetch(`http://localhost:3000/agendas/${params.id}`)
    ]);


    const [datasRandomAgenda, datasRandomPost, dataSingleAgenda] = await Promise.all([
        responseRandomAgenda.json(),
        responseRandomPost.json(),
        responseSingleAgenda.json()
    ]);

    return {
        props: {
            agenda: dataSingleAgenda,
            randomPosts: datasRandomPost.data,
            randomAgendas: datasRandomAgenda.data
        }
    };
}