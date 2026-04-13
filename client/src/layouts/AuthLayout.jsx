import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const AuthLayout = () => {
    return (
        <>
            <Navbar />
            <div className="main-container">
                {<Outlet />}
            </div>
        </>
    )
}

export default AuthLayout