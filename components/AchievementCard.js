import { useState, useEffect } from 'react';

export default function AchievementCard({ title, description, images }) {
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev < images.length - 1 ? prev + 1 : 0));
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [images.length]);

    return (
        <div className="achievement-card">
            <div className="image-container">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={title}
                        className={index === currentImage ? 'active' : ''}
                    />
                ))}
            </div>
            <div className="info">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
            <style jsx>{`
                .achievement-card {
                    border-radius: 10px;
                    overflow: hidden;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    transition: transform 0.3s, box-shadow 0.3s;
                    background-color: var(--bg-card-primary);
                    position: relative;
                }
                .achievement-card:hover {
                    transform: scale(1.03);
                    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
                }
                .image-container {
                    position: relative;
                    overflow: hidden;
                    height: 300px; /* Adjust based on your design */
                }
                .image-container img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    position: absolute;
                    top: 0;
                    left: 0;
                    opacity: 0;
                    transition: opacity 1s ease-in-out;
                }
                .image-container img.active {
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
                    margin: 0;
                    color: var(--text-color-secondary);
                }
            `}</style>
        </div>
    );
}
