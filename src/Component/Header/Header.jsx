import React, { useContext } from 'react';
import logo from "/vite.svg"
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';


const NavMenu = <>
    <li><NavLink to={`/`} className={({ isActive }) => isActive ? "bg-blue-500 text-lg text-black mr-2 p-2" : ""}>Home</NavLink></li>
    
    <li><NavLink to={`/mytasks`} className={({ isActive }) => isActive ? "bg-blue-500 text-lg text-black mr-2 p-2" : ""}>My Tasks</NavLink></li>
    <li><NavLink to={`/addtask`} className={({ isActive }) => isActive ? "bg-blue-500 text-lg text-black mr-2 p-2" : ""}>Add Task</NavLink></li>
    <li><NavLink to={`/dashboard`} className={({ isActive }) => isActive ? "bg-blue-500 text-lg text-black mr-2 p-2" : ""}>Dashboard</NavLink></li>
</>
const Header = () => {
    const { user, logOut, setError } = useContext(AuthContext);
   
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from.pathname || '/'
    const handleLogOut = () => {
        logOut()
            .then(navigate(from))
            .catch(error => setError(error.message))
    }
    return (
        <div className="navbar bg-blue-200">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {NavMenu}
                    </ul>
                </div>
                <img className='h-[60px]' src={logo} alt="" />
                <h1 className='font-bold ml-2 text-xl'>Task <br /> Management</h1>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {NavMenu}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ?
                        <>
                            <div className="avatar">
                                <div className="w-12 rounded-full border-blue-500 border-2 mr-3">
                                    <img src={user.photoURL} title={user.displayName} />
                                </div>
                            </div>
                            <button className='btn btn-primary bg-blue-500 hover:bg-blue-800 border-0 text-black' onClick={handleLogOut}>Log Out</button>
                        </> :
                        <Link className='btn btn-primary bg-blue-500 hover:bg-blue-800 border-0 text-black' to="/login">Log in</Link>
                }
            </div>
        </div>
    );
};

export default Header;