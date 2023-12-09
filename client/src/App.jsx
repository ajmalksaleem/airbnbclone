
import { Route, Routes } from 'react-router-dom'
import './App.css'
import IndexPage from './Pages/IndexPage'
import Loginpage from './Pages/Loginpage'
import Layout from './Template/Layout'
import RegisterPage from './Pages/RegisterPage'
import axios from 'axios'
import { UserContextProvider } from './UserContext'


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
        </Route>
      </Routes>
    </UserContextProvider>

  )
}

export default App
