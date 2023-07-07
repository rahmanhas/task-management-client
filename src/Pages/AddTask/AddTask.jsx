import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';

import Swal from 'sweetalert2';

const AddTask = () => {
    
    const { user } = useContext(AuthContext);
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');


    const [allUsers, setAllUsers] = useState([])

    useEffect(()=>{
        fetch("http://localhost:3000/allusers")
        .then(res=>res.json())
        .then(data=>setAllUsers(data))
    },[])
    const handleNewlyAddedTask = event => {
        event.preventDefault()
        const form = event.target;
        const title = form.title.value;
        const description = form.description.value;
        const dueDate = form.dueDate.value;
        const status = form.status.value;
        const assignedUser = form.assignedUser.value;
        const price = form.price.value;
        const task = {title, description, dueDate, status, assignedUser, price};
        console.log(task);
        fetch("http://localhost:3000/tasks", {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(task)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    Swal.fire(
                        'Congratulations!!!',
                        'Your toy is added to our store!',
                        'success'
                    )
                    form.reset()
                }
            })
            .catch(error => console.log(error));
    }
    return (
        <div className='mx-10'>
            <h1 className='text-center text-2xl font-bold text-black my-5 text-blue-950'>Add a New Task</h1>
            <form onSubmit={handleNewlyAddedTask}>
                <div className='grid lg:grid-cols-2 gap-4 p-5'>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Title</span>
                        </label>
                        <input type="text" name="title" placeholder="Title" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <input type="text" name="description" placeholder="Description" className="input input-bordered" />
                    </div>
                </div>
                <div className='grid lg:grid-cols-2 gap-4 p-5'>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Due Date</span>
                        </label>
                        <input type="date" name="dueDate" placeholder="Due Date" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Status</span>
                        </label>
                        <select className="select select-bordered w-full max-w-xs" name='status' value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                            
                            <option>Not-Started</option>
                            <option>In-Progress</option>
                            <option>Finish</option>
                            
                        </select>
                    </div>
                </div>
                <div className='grid lg:grid-cols-2 gap-4 p-5'>
                    <div className="form-control">

                        <label className="label">
                            <span className="label-text">Assigned User</span>
                        </label>
                        <select className="select select-bordered w-full max-w-xs" name='assignedUser' value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
                            
                            {allUsers?.map(user=><option key={user._id}>{user?.name}</option>)}
                            
                        </select>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Price</span>
                        </label>
                        <input type="number" name="price" placeholder="Price" className="input input-bordered" />
                    </div>

                </div>
                
                
                <div className='p-5'>
                    <input className='btn btn-primary btn-block bg-blue-500 hover:bg-blue-800 border-0 text-black' type="submit" value="submit" />
                </div>
            </form>
        </div>
    );
};

export default AddTask;
