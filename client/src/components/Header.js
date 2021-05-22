import React from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container } from 'react-bootstrap'

import { logout } from '../actions/UserAction'

const Header = () => {
    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const vehicleDetails = useSelector((state) => state.vehicleDetails);
    const { vehicle } = vehicleDetails;

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <header>
            <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>Vehicle Authenticate System</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>

                        <Nav className='ml-auto'>

                            {userInfo ? (
                                <>
                                    <LinkContainer to='/v/register'>
                                        <Nav.Link >{Object.keys(vehicle).length == 0 ? 'Register Vehicle' : 'Edit Vehicle'}</Nav.Link>
                                    </LinkContainer>

                                    <Nav.Link onClick={logoutHandler}> Logout</Nav.Link>

                                </>
                            ) : (
                                    <LinkContainer to='/login'>
                                        <Nav.Link><i className='fas fa-user'></i> Sign In</Nav.Link>
                                    </LinkContainer>
                                )}

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header;