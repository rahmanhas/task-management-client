import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Component/Header/Header';
import Footer from '../Component/Footer/Footer';
import { AuthContext } from '../AuthProvider/AuthProvider';

const MainLayout = () => {
    const {loading} = useContext(AuthContext);
    if(loading){
        return <>
            <h1>loading</h1>
        </>
    }
    return (
        <div>
            <Header></Header>
            <div className='min-h-[100vh]'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;