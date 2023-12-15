
import { Route, Routes } from 'react-router-dom'
import './App.css'
import IndexPage from './Pages/IndexPage'
import Loginpage from './Pages/Loginpage'
import Layout from './Template/Layout'
import RegisterPage from './Pages/RegisterPage'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
import ProfilePage from './Pages/Account/ProfilePage'
import PlacesPage from './Pages/Account/PlacesPage'
import PlacesForm from './Pages/Account/Form/PlacesForm'
import PlaceView from './Pages/PlaceView'
import BookingsPage from './Pages/Account/BookingsPage'
import Bookingview from './Pages/Account/Bookingview'

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;


function App() {

  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path='/login' element={<Loginpage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/account' element={<ProfilePage />} />
          <Route path='/account/places' element={<PlacesPage />} />
          <Route path='/account/places/new' element={<PlacesForm />} />
          <Route path='/account/places/:id' element={<PlacesForm />} />
          <Route path='/place/:id' element={<PlaceView />} />
          <Route path='/account/bookings' element={<BookingsPage />} />
          <Route path='/account/bookings/:id' element={<Bookingview />} />




        </Route>
      </Routes>
    </UserContextProvider>

  )
}

export default App
