import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";

export default function ProductCard({ id, slug, name, price, image, phone, description, location, contactPerson, seller }) {
    const productUrl = `/lapak/${slug || id}`;

    return (
        <>
            <style jsx>
                {`
                .card {
                    position: relative;
                    border: 0;
                    border-radius: 0.5rem;
                    overflow: hidden;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                    width: 100%;
                    max-width: 350px; /* Adjust the max-width for a larger card */
                    margin: auto; /* Center the card */
                    display: flex;
                    flex-direction: column;
                }
                .card-img {
                    position: relative;
                    overflow: hidden;
                }
                .card-img img {
                    transition: transform 0.3s ease;
                }
                .card-img:hover img {
                    transform: scale(1.05);
                }
                .card-body {
                    padding: 1rem; /* Adjusted padding */
                    flex-grow: 1; /* Ensure the body grows to fill space */
                }
                .card-title {
                    font-weight: 500;
                    color: var(--text-color-secondary);
                    margin-bottom: 0.25rem; /* Reduced margin-bottom */
                }
                .card-price {
                    font-weight: 600;
                    color: var(--text-color-primary);
                    margin: 0.25rem 0; /* Reduced margin */
                }
                .card-description {
                    font-size: 0.9rem;
                    color: var(--text-color-muted);
                    margin-bottom: 0.5rem; /* Consistent spacing */
                }
                .card-info {
                    font-size: 0.9rem;
                    color: var(--text-color-secondary);
                    margin-bottom: 0.25rem; /* Reduced margin-bottom */
                }
                .card-footer {
                    position: relative; /* Changed from absolute */
                    width: 100%;
                    background: var(--bg-card-primary);
                    border-top: 1px solid var(--border-color-primary);
                    padding: 0.5rem; /* Adjusted padding */
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                .btn-whatsapp {
                    background-color: #25D366;
                    border-color: #25D366;
                    color: white;
                    text-decoration: none;
                    padding: 0.5rem 1rem;
                    border-radius: 0.25rem;
                    display: inline-flex;
                    align-items: center;
                    font-size: 0.875rem; /* Adjust font size */
                }
                .btn-whatsapp:hover {
                    background-color: #1EBEA5;
                    border-color: #1EBEA5;
                }
                .btn-whatsapp i {
                    margin-right: 0.5rem;
                }
                .btn-detail {
                    background-color: #007bff;
                    border-color: #007bff;
                    color: white;
                    text-decoration: none;
                    padding: 0.5rem 1rem;
                    border-radius: 0.25rem;
                    display: inline-flex;
                    align-items: center;
                    font-size: 0.875rem; /* Adjust font size */
                }
                .btn-detail:hover {
                    background-color: #0056b3;
                    border-color: #004085;
                }
                .btn-detail i {
                    margin-right: 0.5rem;
                }
                `}
            </style>

            <div className="card bg-card-primary shadow-custom rounded-3">
                <div className="card-img">
                    <Image alt={name} src={`http://localhost:3000${image}`} width={350} height={200} quality={90} className="img-fluid rounded-top" />
                </div>
                <div className="card-body">
                    <h6 className="card-title">{name}</h6>
                    <h5 className="card-price">Rp. {price}</h5>
                    <p className="card-description">{`${description.slice(0, 150)}`}</p>
                    <p className="card-info">Lokasi: {location}</p>
                    <p className="card-info">Kontak: {contactPerson}</p>
                    <p className="card-info">Penjual: {seller}</p>
                </div>
                <div className="card-footer">
                    <a href={`https://wa.me/${phone}?text=Saya%20ingin%20memesan%20${name}`} className="btn-whatsapp" rel="noreferrer" target="_blank">
                        <i><FaWhatsapp /></i>Whatsapp
                    </a>
                    <Link href={productUrl}>
                        <a className="btn-detail">Lihat Detail</a>
                    </Link>
                </div>
            </div>
        </>
    );
}
