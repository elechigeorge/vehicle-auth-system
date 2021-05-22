import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { createVehicle } from '../actions/VehicleAction';

const VehicleRegisterScreen = ({ location, history }) => {
    const [plateNumber, setPlateNumber] = useState('')


    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin)
    const { loading, error, userInfo } = userLogin;

    const vehicleDetails = useSelector((state) => state.vehicleDetails)
    const { vehicle } = vehicleDetails;

    const submitHandler = (e) => {

        e.preventDefault();

        dispatch(createVehicle(plateNumber))

    }

    if (Object.keys(vehicle).length !== 0) {
        return <Redirect to={`/vehicle/edit/${vehicle._id}`} />
    }

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '90vh'
        }} >
            {userInfo && (
                <FormContainer>
                    <h1>Vehicle Registration</h1>
                    {error && <Message variant='danger'>{error}</Message>}
                    {loading && <Loader />}
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='email'>
                            <Form.Label>Enter Plate / Identification Number</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Enter Number'
                                value={plateNumber}
                                onChange={(e) => setPlateNumber(e.target.value)}
                            ></Form.Control>
                        </Form.Group>



                        <Button type='submit' variant='primary' className="btn-block">
                            Register
        </Button>
                    </Form>


                </FormContainer>
            )}


        </div>
    )
}

export default VehicleRegisterScreen;
