import React, { useEffect, useState } from 'react'
import './index.css'
import Pagination from '../Pagination'
import ImagePreviewModal from '../../../shared/Modals/ImagePreviewModal'

const GalleryImage = ({ src, alt }) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className={`card-img-wrapper ${loaded ? 'loaded' : ''}`}>
            {!loaded && <div className="image-placeholder-skeleton" />}
            <img
                src={src}
                alt={alt}
                loading="lazy"
                onLoad={() => setLoaded(true)}
                className={`card-img ${loaded ? 'visible' : 'hidden'}`}
            />
        </div>
    );
};

const index = ({ query }) => {

    const [data, setData] = useState([]);
    const [totalHits, setTotalHits] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    // New states for dealing with the Modal
    const [selectedImage, setSelectedImage] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const perPage = 12;

    useEffect(() => {
        fetch(`https://pixabay.com/api/?key=56246764-5284f106cff7603276444c9a6&q=${query}&image_type=photo&page=${currentPage}&per_page=${perPage}`)
            .then(res => res.json())
            .then((d) => {
                setData(d.hits);
                setTotalHits(d.totalHits);
            });
    }, [query, currentPage]);

    const totalPages = Math.ceil(
        totalHits / perPage
    );

    const handlePrev = () => {
        setCurrentPage((prev) => prev - 1);
    };

    const handleNext = () => {
        setCurrentPage((prev) => prev + 1); // Fixed: Changed from 'prev - 1' to 'prev + 1'
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [query]);

    const handleDownload = async (imageUrl, imageId) => {
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = `pixabay-${imageId}.jpg`;
            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error("Failed to download image:", error);
            window.open(imageUrl, '_blank');
        }
    };

    // Open Modal Function
    const handleOpenModal = (item) => {
        setSelectedImage(item);
        setShowModal(true);
    };

    // Close Modal Function
    const handleCloseModal = () => {
        setSelectedImage(null);
        setShowModal(false);
    };

    return (
        <div>
            <div className="gallery">
                {data?.map((item) => (
                    <div className="card" key={item.id}>
                        {/* Clicking this wrapper triggers the preview modal */}
                        <div className="card-image-container" onClick={() => handleOpenModal(item)} style={{ cursor: 'pointer' }}>
                            <GalleryImage
                                src={item.webformatURL}
                                alt={item.tags}
                            />
                        </div>

                        <div className="card-content">
                            <div className="card-info">
                                <h4>👤 {item.user}</h4>
                                <div className="card-stats">
                                    <span>❤️ {item.likes}</span>
                                    <span>📥 {item.downloads}</span>
                                </div>
                            </div>
                            {/* Download button featuring only the requested Font Awesome icon */}
                            <button
                                className="download-icon-btn"
                                onClick={() => handleDownload(item.largeImageURL, item.id)}
                                title="Download Image"
                            >
                                <i className="fa-solid fa-download"></i>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPrev={handlePrev}
                onNext={handleNext}
            />

            {/* Reusable React-Bootstrap Image Preview Modal */}
            <ImagePreviewModal 
                show={showModal} 
                handleClose={handleCloseModal} 
                imageItem={selectedImage} 
            />
        </div>
    )
}

export default index