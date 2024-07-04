import React, { useState } from 'react';
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import ColorSchemesExample from '../components/nav';
import './Gallery.css';
import Gcard from '../components/galleryCard';
import { imagedata } from '../helpers/data';
import CryptoJS from 'crypto-js';

const fileToByteArray = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = () => {
            resolve(new Uint8Array(reader.result));
        };
        reader.onerror = reject;
    });
};

const byteArrayToBlobUrl = (byteArray) => {
    const blob = new Blob([byteArray], { type: 'application/octet-stream' });
    return URL.createObjectURL(blob);
};

const generateKey = async () => {
    return window.crypto.subtle.generateKey(
        {
            name: "AES-GCM",
            length: 256
        },
        true,
        ["encrypt", "decrypt"]
    );
};

const encryptData = async (key, data) => {
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encrypted = await window.crypto.subtle.encrypt(
        {
            name: "AES-GCM",
            iv: iv
        },
        key,
        data
    );
    return { iv, encrypted: new Uint8Array(encrypted) };
};

export default function Gallery() {
    const images = imagedata;
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [showOptionsModal, setShowOptionsModal] = useState(false);
    const [password, setPassword] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [showPopUpCard, setShowPopUpCard] = useState(false);
    const [encryptedImage, setEncryptedImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [originalImage, setOriginalImage] = useState(null);
    const [gallery, setGallery] = useState([]);
    const [encryptionKey, setEncryptionKey] = useState(null);
    const [iv, setIv] = useState(null);
    const [encryptedData, setEncryptedData] = useState(null);
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [saveName, setSaveName] = useState('');
    const [savePassword, setSavePassword] = useState(''); // State for save password
    const [imageFile, setImageFile] = useState(null);
    const [downloadLink, setDownloadLink] = useState('');
    const [encryptedImageFile, setEncryptedImageFile] = useState(null);
    const [decryptPassword, setDecryptPassword] = useState('');
    const [decryptedImage, setDecryptedImage] = useState(null);

    const handleEncrypt = async () => {
        if (!originalImage) return;

        const byteArray = await fileToByteArray(originalImage);
        const key = await generateKey();
        setEncryptionKey(key);

        const { iv, encrypted } = await encryptData(key, byteArray);
        setIv(iv);
        setEncryptedData(encrypted);

        const encryptedBlobUrl = byteArrayToBlobUrl(encrypted);
        setEncryptedImage(encryptedBlobUrl);
    };

    const handleDragOverOriginal = (e) => {
        e.preventDefault();
    };

// Function to handle file drop
    const handleDropOriginal = (e,setOriginalImag) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        setOriginalImage(file);
    };

    

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = encryptedImage;
        link.download = 'encrypted_image.jpg';
        link.click();
    };

    const handleButtonClick = () => {
        setShowPopUpCard(true);
    };

    const handleClosePopUpCard = () => {
        setShowPopUpCard(false);
    };

    const handleImageClick = (image) => {
        setSelectedImage(image);
        setShowPasswordModal(true);
    };

    const handleClosePasswordModal = () => {
        setShowPasswordModal(false);
        setSelectedImage(null);
        setPassword('');
    };

    const handleEnterPassword = () => {
        const correctPassword = 'your_password'; // Change this to your actual password
        if (password === correctPassword) {
            setShowPasswordModal(false);
            setShowOptionsModal(true);
        } else {
            alert('Incorrect password. Please try again.');
        }
    };

    const handleCloseOptionsModal = () => {
        setShowOptionsModal(false);
        setSelectedImage(null);
    };

    const handleDelete = () => {
        alert('Delete functionality not implemented yet');
        handleCloseOptionsModal();
    };

    const handleRename = () => {
        alert('Rename functionality not implemented yet');
        handleCloseOptionsModal();
    };

    const handleOpenSaveModal = () => {
        setShowSaveModal(true);
    };

    const handleCloseSaveModal = () => {
        setShowSaveModal(false);
    };

    const handleSaveNameChange = (e) => {
        setSaveName(e.target.value);
    };

    const handleSavePasswordChange = (e) => {
        setSavePassword(e.target.value);
    };

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

     // Function to save encrypted image to gallery
     const handleSaveToGallery = () => {
        if (downloadLink) {
            setGallery([...gallery, downloadLink]);
        }
        setShowSaveModal(false);
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


    return (
        <div>
            <ColorSchemesExample />
            <Button className="add-image-button" onClick={handleButtonClick}>+</Button>
            <Container className="gallery-container">
                <Row>
                    {images.map((image, index) => (
                        <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-3">
                            <div onClick={() => handleImageClick(image)}>
                                <Gcard title={image.title} imagepath={image.path} />
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>

            <Modal show={showPasswordModal} onHide={handleClosePasswordModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleEnterPassword}>Enter</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showOptionsModal} onHide={handleCloseOptionsModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Image Options</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedImage && (
                        <div>
                            <img src={selectedImage.path} alt={selectedImage.title} style={{ width: '100%', marginBottom: '1rem' }} />
                            <Button variant="danger" onClick={handleDelete} className="mb-2">Delete</Button>
                            <Button variant="primary" onClick={handleDownload} className="mb-2 ml-2">Download</Button>
                            <Button variant="secondary" onClick={handleRename} className="mb-2 ml-2">Rename</Button>
                        </div>
                    )}
                </Modal.Body>
            </Modal>

            <Modal
                show={showPopUpCard}
                onHide={handleClosePopUpCard}
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Pop-Up Card</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
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
                            </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClosePopUpCard}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showSaveModal} onHide={handleCloseSaveModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Save Image</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control type="text" placeholder="Enter save name" value={saveName} onChange={handleSaveNameChange} className="mb-3" />

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSaveToGallery}>Save</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
