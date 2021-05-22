import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { Jumbotron, Container, Form, Button, ListGroup, Row, Col, Image } from "react-bootstrap";
import { verify } from '../actions/VehicleAction';


function VerifyScreen() {

    const [plateNumber, setPlateNumber] = useState('')

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin;

    const vehicleDetails = useSelector((state) => state.vehicleDetails)
    const { vehicle } = vehicleDetails;

    const vehicleVerify = useSelector((state) => state.vehicleVerify)
    const { error, loading } = vehicleVerify;



    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(verify(plateNumber))

    }



    return (
        <Container>
            {userInfo && (
                <div>
                    <Jumbotron>
                        <h1>Vehicle Verfication</h1>
                        <p>
                            Enter the vehicle Plate Number / Identification Number</p>
                        <Form onSubmit={submitHandler}>

                            <Form.Group controlId='plate-number'>
                                <Form.Label></Form.Label>
                                <Form.Control
                                    type='name'
                                    placeholder='Enter Plate / Identification Number'
                                    value={plateNumber}
                                    onChange={(e) => setPlateNumber(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Button type='submit' variant='primary' className="btn-block btn-lg">VERIFY</Button>

                        </Form>
                    </Jumbotron>
                    <hr />
                    <div>
                        {error && <Message variant='danger'>{error}</Message>}
                        {loading && <Loader />}

                        {Object.keys(vehicle).length !== 0 && (
                            <div>
                                <h2>Owner Information</h2>
                                <ListGroup>
                                    <ListGroup.Item>Name: {vehicle.owner_information.name}</ListGroup.Item>
                                    <ListGroup.Item>Address: {vehicle.owner_information.address}</ListGroup.Item>
                                </ListGroup>

                                <h2>Vehicle Information</h2>
                                <ListGroup>
                                    <ListGroup.Item>Brand: {vehicle.brand}</ListGroup.Item>
                                    <ListGroup.Item>Model: {vehicle.mode}</ListGroup.Item>
                                    <ListGroup.Item>Broad Class: {vehicle.broad_class}</ListGroup.Item>
                                    <ListGroup.Item>Plate Number: {vehicle.plate_number}</ListGroup.Item>
                                    <ListGroup.Item>Category: {vehicle.category}</ListGroup.Item>
                                    <ListGroup.Item>Color: {vehicle.color}</ListGroup.Item>
                                </ListGroup>
                                <Row>
                                    <Col md={6} sm={6} lg={6}>
                                        <Image src={`http://localhost:8000${vehicle.images}`} alt={vehicle.images} fluid />

                                    </Col>
                                </Row>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </Container>
    )
}

export default VerifyScreen;
