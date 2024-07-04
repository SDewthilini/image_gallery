import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import { Button, Modal, Form, Card, Container, Row, Col } from 'react-bootstrap';
import './Features.css';
import ColorSchemesExample from '../components/nav';

function Features() {
    const [imageFile, setImageFile] = useState(null);
    const [password, setPassword] = useState('');
    const [encryptedImageFile, setEncryptedImageFile] = useState(null);
    const [decryptPassword, setDecryptPassword] = useState('');
    const [decryptedImage, setDecryptedImage] = useState(null);
    const [downloadLink, setDownloadLink] = useState('');
    const [gallery, setGallery] = useState([]);
    const [showSaveModal, setShowSaveModal] = useState(false);

    // Function to handle file drop
    const handleDrop = (e, setImageSetter) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        setImageSetter(file);
    };

    // Function to handle image encryption
    const handleEncryptImage = () => {
        if (!imageFile || !password) {
            alert('Please select an image and enter a password.');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const imageData = e.target.result;
            const encrypted = CryptoJS.AES.encrypt(imageData, password).toString();
            const encryptedBlob = new Blob([encrypted], { type: 'text/plain' });
            const encryptedUrl = URL.createObjectURL(encryptedBlob);
            setDownloadLink(encryptedUrl);
        };
        reader.readAsDataURL(imageFile);
    };

    // Function to handle image decryption
    const handleDecryptImage = () => {
        if (!encryptedImageFile || !decryptPassword) {
            alert('Please select an encrypted image file and enter a password.');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const encryptedImageData = e.target.result;
            const decrypted = CryptoJS.AES.decrypt(encryptedImageData, decryptPassword);
            const decryptedData = decrypted.toString(CryptoJS.enc.Utf8);

            if (decryptedData) {
                setDecryptedImage(decryptedData);
            } else {
                alert('Invalid password or corrupted image data.');
            }
        };
        reader.readAsText(encryptedImageFile);
    };

    // Function to save encrypted image to gallery
    const handleSaveToGallery = () => {
        if (downloadLink) {
            setGallery([...gallery, downloadLink]);
        }
        setShowSaveModal(false);
    };

    return (
        <div>
            <ColorSchemesExample />
            <Container className="mt-5">
                <h1 className="text-center mb-5">Image Encrypt and Decrypt</h1>
                <Row>
                    <Col md={6}>
                        <Card className="p-3">
                            <h2 className="text-center">Encrypt Image</h2>
                            <Form.Group>
                                <Form.Label>Upload Image</Form.Label>
                                <div
                                    className="drop-area"
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={(e) => handleDrop(e, setImageFile)}
                                >
                                    <p className="text-center">Drag & Drop your image here</p>
                                    {imageFile && <img src={URL.createObjectURL(imageFile)} alt="Original" className="img-fluid" />}
                                </div>
                                <Form.Control type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
                            </Form.Group>
                            <Form.Group controlId="encryptionPassword">
                                <Form.Label>Enter Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>
                            <Button variant="primary" onClick={handleEncryptImage} className="m-2">
                                Encrypt Image
                            </Button>
                            {downloadLink && (
                                <>
                                    <Button variant="success" href={downloadLink} download="encrypted_image.txt" className="m-2">
                                        Download
                                    </Button>
                                    <Button variant="info" onClick={() => setShowSaveModal(true)} className="m-2">
                                        Save to Gallery
                                    </Button>
                                </>
                            )}
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card className="p-3">
                            <h2 className="text-center">Decrypt Image</h2>
                            <Form.Group>
                                <Form.Label>Upload Encrypted Image</Form.Label>
                                <div
                                    className="drop-area"
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={(e) => handleDrop(e, setEncryptedImageFile)}
                                >
                                    <p className="text-center">Drag & Drop your encrypted image here</p>
                                    {encryptedImageFile && <img src={URL.createObjectURL(encryptedImageFile)} alt="Encrypted" className="img-fluid" />}
                                </div>
                                <Form.Control type="file" onChange={(e) => setEncryptedImageFile(e.target.files[0])} />
                            </Form.Group>
                            <Form.Group controlId="decryptionPassword">
                                <Form.Label>Enter Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter password to decrypt"
                                    value={decryptPassword}
                                    onChange={(e) => setDecryptPassword(e.target.value)}
                                />
                            </Form.Group>
                            <Button variant="primary" onClick={handleDecryptImage} className="m-2">
                                Decrypt Image
                            </Button>
                            {decryptedImage && <img src={decryptedImage} alt="Decrypted" className="img-fluid" />}
                        </Card>
                    </Col>
                </Row>
                {gallery.length > 0 && (
                    <Row className="mt-5">
                        <Col>
                            <h2 className="text-center">Gallery</h2>
                            <div className="gallery-images">
                                {gallery.map((url, index) => (
                                    <img key={index} src={url} alt={`Encrypted ${index}`} className="img-fluid m-3" />
                                ))}
                            </div>
                        </Col>
                    </Row>
                )}
            </Container>

            <Modal show={showSaveModal} onHide={() => setShowSaveModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Save to Gallery</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to save this image to the gallery?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowSaveModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveToGallery}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Features;
