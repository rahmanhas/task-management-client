import React, { useContext, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { saveUser } from '../../Hooks/utils';


const Register = () => {
    
    const { signUpNewUser, setUser, setLoading, updateProfileInfo, error, setError } = useContext(AuthContext);
    
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from.pathname || '/'
    useEffect(() => {
        setError("")
    }, [])
    const handleRegister = event => {
        event.preventDefault()
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const photoURL = form.photoURL.value;
        signUpNewUser(email, password)
            .then(result => {
                setUser(result.user);
                const userInfo = {name, email}
                saveUser(userInfo)
                updateProfileInfo(name, photoURL)
                form.reset()
                navigate(from)
                setError("")
            })
            .catch(error => {
                setError(error.message)
            })
    }
    return (
        <div className="hero min-h-screen bg-blue-50 ">
            <div className="hero-content lg:w-1/2 text-center">
                <div className="card flex-shrink-0 max-w-sm shadow-2xl bg-blue-100">
                    <form onSubmit={handleRegister} className="card-body">
                        <div className="text-center">
                            <h1 className="text-2xl font-bold text-center">Register now!</h1>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name="name" placeholder="email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">PhotoURL</span>
                            </label>
                            <input type="text" name="photoURL" placeholder="Photo URL" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <p className='my-2'>Already have an account? Please <Link to='/login' className='text-red-500'>login</Link></p>
                            </label>
                        </div>
                        <div className="form-control">
                            <p className='text-red-500'>{error}</p>
                        </div>
                        <div className="form-control">
                            <input className="btn btn-primary bg-blue-500 hover:bg-blue-800 border-0 text-black" type="submit" value="Register" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;