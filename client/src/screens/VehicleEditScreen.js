import api from '../utils/api';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listVehicleDetails, updateVehicle } from '../actions/VehicleAction'
import { VEHICLE_UPDATE_RESET } from '../constants/VehicleConstant'

const VehicleEditScreen = ({ match, history }) => {
    const vehicleId = match.params.id

    const [plateNumber, setPlateNumber] = useState('')
    const [mode, setMode] = useState('')
    const [color, setColor] = useState('')
    const [images, setImages] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [broadClass, setBroadClass] = useState('')
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const vehicleDetails = useSelector((state) => state.vehicleDetails)
    const { loading, error, vehicle } = vehicleDetails

    const vehicleUpdate = useSelector((state) => state.vehicleUpdate)

    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = vehicleUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: VEHICLE_UPDATE_RESET })
            history.push('/verify')
        } else {
            if (!vehicle.brand || vehicle._id !== vehicleId) {
                dispatch(listVehicleDetails(vehicleId))
            } else {
                setPlateNumber(vehicle.plate_number)
                setMode(vehicle.mode)
                setName(vehicle.owner_information.name)
                setColor(vehicle.color)
                setImages(vehicle.images)
                setBrand(vehicle.brand)
                setCategory(vehicle.category)
                setBroadClass(vehicle.broad_class)
                setAddress(vehicle.owner_information.address)
            }
        }
    }, [dispatch, history, vehicleId, vehicle, successUpdate])

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('images', file)
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }

            const { data } = await api.post('/upload', formData, config)

            setImages(data)
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(
            updateVehicle({
                _id: vehicleId,
                name,
                address,
                plateNumber,
                broadClass,
                images,
                brand,
                category,
                color,
                mode,
            })
        )
    }

    return (
        <>

            <FormContainer>
                <h1>Edit Vehicle</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : (
                            <Form onSubmit={submitHandler}>
                                <Form.Group controlId='name'>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type='name'
                                        placeholder='Enter plate number'
                                        value={plateNumber}
                                        onChange={(e) => setPlateNumber(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>


                                <Form.Group controlId='name'>
                                    <Form.Label>Model</Form.Label>
                                    <Form.Control
                                        type='name'
                                        placeholder='Enter mode'
                                        value={mode}
                                        onChange={(e) => setMode(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='price'>
                                    <Form.Label>Color</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter color'
                                        value={color}
                                        onChange={(e) => setColor(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='broadClass'>
                                    <Form.Label>Broad Class</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter broad class'
                                        value={broadClass}
                                        onChange={(e) => setBroadClass(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='images'>
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control
                                        type='images'
                                        placeholder='Enter image url'
                                        value={images}
                                        onChange={(e) => setImages(e.target.value)}
                                    ></Form.Control>
                                    <Form.File
                                        type="file"
                                        name="images"
                                        id='image-file'
                                        label='Choose File'
                                        custom
                                        onChange={uploadFileHandler}
                                    ></Form.File>
                                    {uploading && <Loader />}
                                </Form.Group>

                                <Form.Group controlId='brand'>
                                    <Form.Label>Brand</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter brand'
                                        value={brand}
                                        onChange={(e) => setBrand(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>



                                <Form.Group controlId='category'>
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter category'
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>
                                <h2>Owner Information</h2>
                                <Form.Group controlId='name'>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter name of owner'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>


                                <Form.Group controlId='address'>
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter address of owner'
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <Button type='submit' variant='primary'>
                                    Update
            </Button>
                            </Form>
                        )}
            </FormContainer>
        </>
    )
}

export default VehicleEditScreen;