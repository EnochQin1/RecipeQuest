import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


const IngredientDisplay = ({ ingredient, quantity }) => {

    return (
        <div>
            <Row style={{minWidth: 600}}>
            <Col>
                <p style={{ fontFamily: 'Roboto', fontSize: 20 }}>{ingredient}</p>
            </Col>

            <Col>
            <p style={{ fontFamily: 'Roboto', fontSize: 20 }}>{quantity}</p>
            </Col>
            </Row>

        </div>
    );
};
export default IngredientDisplay;