import Link from 'next/link';
import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function PlaceCard({ id, title, excerpt, images }) {
    const [currentImage, setCurrentImage] = useState(0);

    const handleDotClick = (index) => {
        setCurrentImage(index);
    };

    useEffect(() => {
        AOS.init(); // Initialize AOS
    }, []);

    return (
        <div className="place-card" data-aos="fade-up">
            <div className="image-container">
                <Link href={`/tempatwisata/${id}`} passHref>
                    <a>
                        <img src={`https://nuniali.my.id${images[currentImage]}`} alt={title} />
                        {console.log(`https://nuniali.my.id${images[currentImage]}`)}
                    </a>
                </Link>
                {images.length > 1 && (
                    <div className="dots-container">
                        {images.map((_, index) => (
                            <span
                                key={index}
                                className={`dot ${currentImage === index ? 'active' : ''}`}
                                onClick={() => handleDotClick(index)}
                            ></span>
                        ))}
                    </div>
                )}
            </div>
            <div className="info">
                <h3>{title}</h3>
                <div dangerouslySetInnerHTML={{ __html: excerpt }}></div>
            </div>
            <style jsx>{`
                .place-card {
                    border-radius: 10px;
                    overflow: hidden;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    transition: transform 0.3s, box-shadow 0.3s;
                    background-color: var(--bg-card-primary);
                    position: relative;
                }
                .place-card:hover {
                    transform: scale(1.03);
                    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
                }
                .image-container {
                    position: relative;
                    overflow: hidden;
                }
                .image-container img {
                    width: 100%;
                    height: auto;
                    display: block;
                    transition: opacity 0.3s;
                }
                .dots-container {
                    position: absolute;
                    bottom: 10px;
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    gap: 10px;
                }
                .dot {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background-color: rgba(0, 0, 0, 0.5);
                    cursor: pointer;
                    transition: background-color 0.3s;
                }
                .dot.active {
                    background-color: var(--bg-color-toggle);
                }
                .info {
                    padding: 15px;
                }
                .info h3 {
                    margin: 0 0 10px;
                    font-size: 1.2em;
                    color: var(--text-color-primary);
                }
                .info p {
                    margin: 0;
                    color: var(--text-color-secondary);
                }
            `}</style>
        </div>
    );
}
