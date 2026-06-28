import { Outlet } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import './css/indexstyle.css'

const App = () => (
  <>
    <Nav />
    <Outlet />
    <Footer />
  </>
)

export default App