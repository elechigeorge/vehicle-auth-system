import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'


import VerifyScreen from './screens/VerifyScreen'

import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'


import VehicleEditScreen from './screens/VehicleEditScreen'
import VehicleRegisterScreen from './screens/VehicleRegisterScreen'


const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>


          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />

          <Route path='/v/register' component={VehicleRegisterScreen} />

          <Route path='/verify' component={VerifyScreen} />

          <Route path='/vehicle/edit/:id' component={VehicleEditScreen} />

          <Route path='/' component={LoginScreen} exact />
        </Container>
      </main>

    </Router>
  )
}

export default App