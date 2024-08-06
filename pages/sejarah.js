import { useEffect, useState } from "react";
import Head from "next/head";
import NavBarTop from "../components/NavBarTop";
import Footer from "../components/Footer";
import BreadcrumbArea from "../components/BreadcrumbArea";
// import imgDesa from "/hero.webp";
import Image from "next/image";
import BackToTop from "../components/BackToTop";

const title = "Sejarah";

export default function Sejarah({ posts }) {
    let [namaDesa, setNamaDesa] = useState("Alang Alang");
    let [namaKecamatan, setNamaKecamatan] = useState("Tragah");

    useEffect(() => {
        namaDesa = localStorage.getItem("namaDesa");
        setNamaDesa(namaDesa);
        namaKecamatan = localStorage.getItem("namaKecamatan");
        setNamaKecamatan(namaKecamatan);
    });

    return (
        <>
            <style jsx>
                {`
                .maps {
                    height: 450px;
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

                <BreadcrumbArea pageName="Sejarah Singkat" currentPage="Sejarah" />

                <div className="container my-5">
                    <div className="col-lg-10 mx-auto">
                        <div className="card bg-card-primary border-0 shadow-sm px-3 py-3 mb-4">
                            <h3 className="text-color-primary">Sejarah Negeri Nuniali</h3>
                            <Image
                                src="/hero.webp"
                                alt="Foto Desa"
                                className="img-fluid rounded my-3"
                                width="1920"
                                height="960" />
                            <h5 className="mt-4 text-color-primary">Uraian Singkat Profil Desa</h5>
                            <p className="text-color-secondary">
                                Negeri Nuniali, sebuah desa di Kecamatan Taniwel, Kabupaten Seram Bagian Barat, memiliki sejarah panjang sebagai pusat peradaban di Maluku.
                                Berasal dari konflik Patasiwa-Patalima, leluhur Nuniali mendirikan negeri ini di lokasi strategis yang disebut Pone Hatu.
                                Melalui musyawarah, nama Nuniali disepakati yang berarti "mengikat menjadi satu". Negeri ini memiliki empat marga besar,
                                hubungan dengan negeri-negeri pela, dan petuanan yang luas. Sebagai pusat adat, Nuniali memiliki Herin Tapuara (rumah pertemuan adat),
                                benda-benda sakral, dan sistem pemerintahan adat yang kuat. Masyarakat Nuniali menganut agama kakehan dan memiliki bahasa Alune Putile.
                                Dengan sejarah dan budaya yang kaya, Negeri Nuniali mengajukan diri sebagai salah satu negeri adat di Seram Bagian Barat.
                            </p>
                            <h5 className="mt-4 text-color-primary">Detail Sejarah Desa</h5>
                            <p className="text-color-secondary">
                                Hal penting yang tidak dapat dipungkiri oleh masyarakat adat Maluku bahwa Pulau Seram
                                adalah Pulau Ibu yang kemudian memancarkan cahaya keibuan yang kepada semua Masyarakat Maluku yang sudah terkenal sampai ke kanca Internasional NUNUSAKU adalah salah satu Pusat peradaban di bumi Maluku yang juga diakui sejak zaman purbakala baik oleh peradaban Dinasti Han (Cina) antara Tahun 332 Sesuda Masehi maupun dinasti di Timur Tengah masa kerajaan Romawi, Sesuda Masehi
                                Dari Pusat Peradaban Nunusaku inilah terurai Sejarah Asal Usul Negeri Nuniali.
                                Konflik perang Patasiwa-Pata Lima menjadi bukti Sejarah bahwa Moyang Leluhur dari Negeri Nuniali menjadi bagian dari peristiwa tersebut sehingga memutuskan untuk keluar dari pertikaian atau perang dimaksud dan berusaha untuk mencari tempat perlindungan masing-masing. Konflik Patasiwa-Patalima adalah menjadi tonggak sejarah musyawarah patasiwa yang lebih dikenal dengan Masyarakat Tiga Batang Air: ETI, TALA DAN SAPALEWA untuk membentuk "HENA" Negeri
                                Dari Masyarakat Tiga Batang Air itulah kemudian para Leluhur Nuniali menyusuri lembah hutan seram dan kemudian tibalah pada satu tempat yang dianggab sangat strategis dari sisi pertahanan perang yaitu PONE HATU. (Tuturuga diatas Batu) yang difilosofinya adalah hidup pada Dua Alam. alam pengertian lainya juga membangun Negeri diatas Bangkai Manusia.
                            </p>
                            <p className="text-color-secondary">
                                Dari Ponchatu ini pula terbentuk Saniri Negeri Ponehatu untuk membentukan Nama Hena atau Negeri yang akan ditempati oleh Empat Soa Besar sebagai penyaga Negeri atau Hena.
                                Ternyata bahwa Saniri Ponehatu belum juga kata sepakat untuk membentukan Nama Negeri yang akan didudukinya pada saat itu.
                                Kemudian terbentuk pula Saniri KUSUWEI artinya tempat mandi para Leluhur untuk menentukan Nama Hena atau Negeri dengan kata mufakat Hena Nuniani yang artinya menghimpun dan atau mengikat menjadi satu Negeri yaitu Negeri Nuniali hingga saat ini.
                                Hak penting lainya yang perlu disampaikan bahwa dari penuturan sumber-sumber lainya bahwa Negeri Nuniali - Nuniali suda terbentuk diperkirakan Tahun 13 Masehi.
                                Negeri Nuniali memiliki empat Marga / Soa yang lebih dikenal dengan sebutan Nuru Ata atau Empat mata Rumah antara lain:
                            </p>
                            <ul className="text-color-secondary">
                                <li>Marga/Mata Rumah : ENEN Wei (Marga Sekerone)</li>
                                <li>Marga/Mata Rumah : HATUAN (Marga Nauwe)</li>
                                <li>Marga/Mata Rumah : NATAN (Marga Lessy)</li>
                                <li>Marga/Mata Rumah : UHUI (Marga Kuhurima)</li>
                            </ul>
                            <p className="text-color-secondary">
                                Selanjutnya Negeri Nuniali juga memiliki hubungan Tiga PELA adapun Negeri-Negeri PELA tersebut antara lain:</p>
                            <ul className="text-color-secondary">
                                <li>Negeri Sepa</li>
                                <li>Negeri Hatilen</li>
                                <li>Negeri Besi</li>
                                <li>Negeri Masihulang</li>
                                <li>Negeri Hurale</li>
                            </ul>
                            <p className="text-color-secondary">
                                Yang kesemuanya itu mempunyai hubungan PELA Sumpah Darah yang terdapat di Kabupaten Maluku Tengah</p>
                            <p className="text-color-secondary">
                                Negeri Nuniali memiliki hubungan gandong namun hanya sebatas marga atau mata rumah diantaranya Soa Sekerone dengan marga Salarone, Palarone di Negeri Buano dan Marga Manuhutu di Negeri Haria serta Marga Malawat di Negeri Mamala Morela.
                                Dari latar belakang terbentuk atau berdiringan Negeri Nuniali, maka sangat jelas Negeri Nuniali memiliki petuanan yang sangat luas yang kemudian akan diusaikan pada sisi lainya.</p>

                            <p className="text-color-secondary">  Adapun Petuanan/Wilayah Nuniali yang tersebar antara lain : <br />
                                Disebelah Barat Kecamatan Taniwel adalah Petuanan : <br />
                                Lamasi, Nama Nuti, Lawawau, Seluruh Pesisir dan pengunungan kalawai dan semuanya itu berbatasan dengan Negeri Kawa.
                                Pada Pesisir Barat Kecamatan Taniwel terletak dari sebelah barat kali Sapalewa sampai kali Hanua sebagian, di pesisir kalipana dan kali Wee, Disebelah selatan pengunungan berbatasan dengan Negeri Wakolo.
                                Dan dari penuturan-penuturan tersebut itu berarti Nuniali memiliki kontribusi baik di Darat, Laut dan Sungai.
                                Saniri tiga batang Air</p>
                            <p className="text-color-secondary"> dari penuturan diatas maka Nuniali termasuk dalam Tiga Batang Air yaitu Eti, Tala, dan Sapalewa sebagai INA AMA ELAKE HAHU INAI yang masih diakui hingga saaat ini.
                                Adapun Bahasa yang dimiliki oleh Negeri Nuniali adalah bahasa Alune Putile yang tergabung dalam Rumpun Patasiwa.
                                Jika Nuniali ditanya apakah Memiliki Hukum Adat maka dengan tegas kami menyatakan ya (ADA) antara lain:</p>

                            <ul className="text-color-secondary">
                                <li>Sasi Adat (Dusun dan Lainya) </li>
                                <li>Perkawinan Adat (Sumpah Adat / Sakramen Pernikahan)</li>
                                <li>Dan Hukum Adat Lainya yang masi berlaku di Negeri Nuniali</li>
                            </ul>

                            <p className="text-color-secondary"> Sebagai kategori Negeri Tua, yang dinobatkan oleh Saniri Negeri Tiga Batang Air sebagai INA "AMA ELAKE HAHUNAI", maka Negeri Nuniali mendapat tempat yang strategis sebagai tempat pertemuan Masyarakat Adat Sapalewa Batai yang diberi nama "HERIN TAPUARA" (Rumah Pertemuan Adat) yang berlokasi di tengah Negeri Nuniali hingga saat ini yang telah mengalami Renovasi akibat konflik sosial tahun 1999. Sebagai Hena Ina Ama, Negeri Para Raja jelas bahwa Nuniali memiliki Rumah RAJA sejak awal dengan sebutan nama : Numa Upui Elake yang juga musna pada konflik Tahun 1999 yang lokasinya ada hingga kini dan belum sempat dibangun karena masih memiliki sistim Pemerintahan kepada Desa dan Saniri Negeri (BPD).
                                Adapun Rumah Soa dan itu hanya dimiliki oleh masing-masing mata rumah pada Soa Masing- masing.</p>

                            <p className="text-color-secondary"> Sebagai Negeri Adat Nuniali memiliki benda sakral berupa Batu Pamali dengan nama : HATU KASA ARI TUNA PUTA "Batu Gosok Parang dan Tombak"
                                Negeri Nuniali menganut Agama KAKEHAN, sehinga seluruh keagamaan berada pada satu tempat yang diberi nama MANUTIN yang diyakini sangat sakral / keramat sehingga saat ini yang berlokasi di sebela Barat Negeri Nuniali (Air Salobar)
                                Benda-benda Adat sebagai peninggalan Para Leluhur sebagai benda bersejarah antara lain:</p>
                            <ul className="text-color-secondary">
                                <li>Gong</li>
                                <li>Tifa</li>
                                <li>Tempat Sirih</li>
                                <li>Bangku pertemuan di Harin Tapuara</li>
                                <li>Tikar sebagai Tempat Alas Pertemuan Adat</li>
                                <li>Lainya</li>
                            </ul>
                            <p className="text-color-secondary">Sebagaimana yang telah dijelaskan diatas bahwa Negeri Nuniali memiliki Empat Soa besar yang berasal dari masing-masing tempat serta memiliki tanggung jawab untuk menghimpun marga / mata rumah lainya yang telah menetap turun temurun di Negeri Nuniali yang mendapat persetujuan dari Saniri Negeri antara lain :</p>

                            <ol className="text-color-secondary">
                                <li>Soa ENEN WEI; yang memberikan pelayanan yang melingkupi mata rumah
                                    <ul className="text-color-secondary list-dash">
                                        <li>Sekerone</li>
                                        <li>Elly</li>
                                        <li>Naene</li>
                                    </ul>
                                </li>
                                <li>Soa HATUAN: Hatu Mete, Batu di Darat yang meliputi mata rumah
                                    <ul className="text-color-secondary">
                                        <li>Nauwe</li>
                                        <li>Aliputty Oneputty</li>
                                        <li>Laturake</li>
                                    </ul>
                                </li>
                                <li>Soa NATAN: Lessy yang artinya lebih mata rumah Lessy yang hanya terdiri dari satu mata rumah karena pada saat pembagian Soa tersebut memiliki jumlah KK yang banyak.</li>
                                <li>Soa "UHUI": Diujung/diatas yang meliputi mata rumah
                                    <ul className="text-color-secondary">
                                        <li>Kuhurima</li>
                                        <li>Kouwe</li>
                                        <li>Mahuwe</li>
                                        <li>Wakai</li>
                                    </ul>
                                </li>
                            </ol>

                            <p className="text-color-secondary">Adapun sistim Pemerintahan yang dianut adalah Negeri yang dipandu dengan Pemerintahan Desa secara administrasi dan birograsi.</p>

                        </div>
                        <div className="card bg-card-primary border-0 shadow-sm px-3 py-3 mb-4">
                            <h3 className="text-color-primary">Peta Desa</h3>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63755.53096842969!2d128.3667160921057!3d-2.8966210421381344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d6ea133d8dfae85%3A0xb17b2cf23347c793!2sNuniali%2C%20Kec.%20Taniwel%2C%20Kabupaten%20Seram%20Bagian%20Barat%2C%20Maluku!5e0!3m2!1sid!2sid!4v1722667617818!5m2!1sid!2sid"
                                className="rounded mt-3 maps" allowFullScreen="" title="Peta Desa"
                                loading="lazy"></iframe>
                        </div>
                        <div className="card bg-card-primary border-0 shadow-sm px-3 py-3 mb-4">
                            <h3 className="text-color-primary">Peta Geospatial</h3>
                            <iframe src="https://www.google.com/maps/d/embed?mid=1KkMscHXMuNLF8i8ft7Jz4D5oSyaBWkU&ehbc=2E312F"
                                className="rounded mt-3 maps" allowFullScreen="" title="Peta Geospatial"
                                loading="lazy"></iframe>
                        </div>
                    </div>
                </div>

            </main>

            <Footer />

            <BackToTop />
        </>
    );
};