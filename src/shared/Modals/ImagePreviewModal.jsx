import React, { useState, useEffect } from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';

const ImagePreviewModal = ({ show, handleClose, imageItem }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (show) {
      setLoaded(false);
    }
  }, [show, imageItem]);

  if (!imageItem) return null;

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>📸 Photo by {imageItem.user}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center p-0 position-relative" style={{ backgroundColor: '#f8f9fa', minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {!loaded && (
          <div className="position-absolute d-flex flex-column align-items-center justify-content-center" style={{ inset: 0, backgroundColor: '#f1f5f9', zIndex: 1 }}>
            <Spinner animation="border" variant="primary" />
            <span className="mt-2 text-secondary small" style={{ fontWeight: '500' }}>Loading high-resolution image...</span>
          </div>
        )}
        <img
          src={imageItem.largeImageURL}
          alt={imageItem.tags}
          onLoad={() => setLoaded(true)}
          style={{
            maxWidth: '100%',
            maxHeight: '70vh',
            objectFit: 'contain',
            display: 'block',
            margin: '0 auto',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out'
          }}
        />
      </Modal.Body>
      <Modal.Footer className="justify-content-between">
        <div className="text-muted small">
          <strong>Tags:</strong> {imageItem.tags}
        </div>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ImagePreviewModal;