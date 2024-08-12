import { useEffect, useState } from 'react';

export default function SekolahCard({ id, name, description, address, type, headmaster, images }) {
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev < images.length - 1 ? prev + 1 : 0));
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="sekolah-card">
            <div className="image-container">
                <div className="slideshow">
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={name}
                            className={`slide ${index === currentImage ? 'active' : ''}`}
                        />
                    ))}
                </div>
            </div>
            <div className="info">
                <h3>{name}</h3>
                <p><strong>Alamat:</strong> {address}</p>
                <p><strong>Jenis:</strong> {type}</p>
                <p><strong>Kepala Sekolah:</strong> {headmaster}</p>
                <p>{description}</p>
            </div>
            <style jsx>{`
                .sekolah-card {
                    border-radius: 10px;
                    overflow: hidden;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    transition: transform 0.3s, box-shadow 0.3s;
                    background-color: var(--bg-card-primary);
                    position: relative;
                }
                .sekolah-card:hover {
                    transform: scale(1.03);
                    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
                }
                .image-container {
                    position: relative;
                    overflow: hidden;
                    height: 300px; /* Adjust as needed */
                }
                .slideshow {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                }
                .slide {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    opacity: 0;
                    transition: opacity 1s ease-in-out;
                }
                .slide.active {
                    opacity: 1;
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
                    margin: 5px 0;
                    color: var(--text-color-secondary);
                }
                .info p strong {
                    color: var(--text-color-primary);
                }
            `}</style>
        </div>
    );
}
