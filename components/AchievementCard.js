import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

export default function AchievementCard({ title, description, images }) {
    useEffect(() => {
        AOS.init({
            duration: 1000, // Duration of animation
            easing: 'ease-in-out', // Easing function
            once: true // Animation will happen only once
        });
    }, []);

    return (
        <div className="achievement-card" data-aos="fade-up">
            <div className="image-container">
                <img
                    src={`https://nuniali.my.id${images[0]}`} // Only displaying one image
                    alt={title}
                />
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
                    min-height: 400px; /* Adjust based on your design */
                }
                .image-container img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    position: absolute;
                    top: 0;
                    left: 0;
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
