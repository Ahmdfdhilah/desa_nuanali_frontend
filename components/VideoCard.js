export default function VideoCard({ src, isVertical }) {
    return (
        <>
            <style jsx>{`
                .video-container {
                    position: relative;
                    width: 100%;
                    padding-top: 56.25%; /* Default to 16:9 aspect ratio */
                }

                .video-container.vertical {
                    padding-top: 177.77%; /* 9:16 aspect ratio */
                }

                .video-container iframe {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    border: 0;
                }
            `}</style>

            <div className={`video-container ${isVertical ? 'vertical' : ''}`}>
                <iframe
                    src={src}
                    className="rounded"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
        </>
    );
}
