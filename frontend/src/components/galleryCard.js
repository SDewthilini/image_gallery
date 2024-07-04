import React from 'react';
import { Card } from 'react-bootstrap';

const Gcard = ({ title, imagepath }) => {
    return (
        <Card className="card">
            <Card.Img variant="top" src={imagepath} />
            <Card.Body className="card-body">
                <Card.Title className="card-title">{title}</Card.Title>
            </Card.Body>
        </Card>
    );
}

export default Gcard;
