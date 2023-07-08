import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { Form, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const AllTasks = () => {

    const { user } = useContext(AuthContext);
    const email = user?.email;
    const [tasks, setTasks] = useState([]);
    const [sort, setSort] = useState(true);
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [currentId, setCurrentId] = useState('');
    const [allUsers, setAllUsers] = useState([])

    useEffect(() => {
        fetch("http://localhost:3000/allusers")
            .then(res => res.json())
            .then(data => setAllUsers(data))
    }, [])

    useEffect(() => {

        fetch(`http://localhost:3000/alltasks`)
            .then(res => res.json())
            .then(data => setTasks(data))

    }, [tasks])


    const handleDelete = (_id) => {


        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3000/deletetask/${_id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount > 0) {

                            const remaining = tasks.filter(user => user._id !== _id)
                            setTasks(remaining);

                        }
                    })
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
    }

    const handleUpdateTask = (event) => {
        event.preventDefault()
        const form = event.target;
        const id = form.id.value;
        const title = form.title.value;
        const description = form.description.value;
        const dueDate = form.dueDate.value;
        const status = form.status.value;
        const assignedUser = form.assignedUser.value;
        const price = form.price.value;
        const task = { title, description, dueDate, status, assignedUser, price };
        console.log(task);
        fetch(`http://localhost:3000/updatetask/${id}`, {
            method: 'PUT',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(task)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                if (result.modifiedCount > 0) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: `Your data is updated`,
                        showConfirmButton: true,
                    })
                    form.reset()
                }
            })
            .catch(error => console.log(error.message))
        window.my_modal_3.close();
    }
    return (
        <div className='m-10'>
            <h1 className='text-center text-5xl font-bold text-blue-950 my-5'>All Tasks</h1>

            <table className='w-full bg-white border border-gray-300 text-center overflow-x-scroll'>
                <thead>
                    <tr className=''>
                        <th className="py-2 px-4 bg-blue-300 border border-gray-500">Assigned User</th>
                        <th className="py-2 px-4 bg-blue-300 border border-gray-500">Title</th>
                        <th className="py-2 px-4 bg-blue-300 border border-gray-500">Due Date</th>
                        <th className="py-2 px-4 bg-blue-300 border border-gray-500">Status</th>
                        <th className="py-2 px-4 bg-blue-300 border border-gray-500">Price</th>

                        <th className="py-2 px-4 bg-blue-300 border border-gray-500">View Details</th>
                        <th className="py-2 px-4 bg-blue-300 border border-gray-500">Update</th>
                        <th className="py-2 px-4 bg-blue-300 border border-gray-500">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <tr
                            key={task?._id}>
                            <td className="py-2 px-4 bg-blue-100 border border-gray-500 ">{task?.assignedUser}</td>
                            <td className="py-2 px-4 bg-blue-100 border border-gray-500 ">{task?.title}</td>
                            <td className="py-2 px-4 bg-blue-100 border border-gray-500 ">{task?.dueDate}</td>
                            <td className="py-2 px-4 bg-blue-100 border border-gray-500 ">{task?.status}</td>
                            <td className="py-2 px-4 bg-blue-100 border border-gray-500 ">$ {task?.price}</td>
                            <td className="py-2 px-4 bg-blue-100 border border-gray-500 ">
                                <Link to={`/task/${task?._id}`}><button className='btn btn-primary bg-blue-500 hover:bg-blue-800 border-0 text-black'>View Details</button></Link>
                            </td>
                            <td onClick={() => window.my_modal_3.showModal()} className="py-2 px-4 bg-blue-100 border border-gray-500 ">
                                <button className='btn btn-outline btn-info border-0 text-black'>Update</button>
                            </td>
                            <td className="py-2 px-4 bg-blue-100 border border-gray-500 "><button className='btn btn-outline btn-warning border-0' onClick={() => handleDelete(task?._id)} >Delete</button></td>
                            <dialog id="my_modal_3" className="modal">
                                <form onSubmit={handleUpdateTask} method="dialog" className="modal-box">
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => window.my_modal_3.close()}>✕</button>
                                    <div className='grid lg:grid-cols-2 gap-4 p-5'>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Title</span>
                                            </label>
                                            <input type="text" defaultValue={task?.title} name="title" placeholder="Title" className="input input-bordered" />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Description</span>
                                            </label>
                                            <input type="text" name="description" defaultValue={task?.description} placeholder="Description" className="input input-bordered" />
                                        </div>
                                    </div>
                                    <div className='grid lg:grid-cols-2 gap-4 p-5'>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Due Date</span>
                                            </label>
                                            <input defaultValue={task?.dueDate} type="date" name="dueDate" placeholder="Due Date" className="input input-bordered" />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Status</span>
                                            </label>
                                            <select className="select select-bordered w-full max-w-xs" name='status' defaultValue={task?.status} value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>

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

                                                {allUsers?.map(user => <option key={user._id}>{user?.name}</option>)}

                                            </select>
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Price</span>
                                            </label>
                                            <input type="number" defaultValue={task?.price} name="price" placeholder="Price" className="input input-bordered" />
                                        </div>

                                    </div>
                                    <div className='p-5'>
                                        <input className='btn btn-primary btn-block bg-blue-500 hover:bg-blue-800 border-0 text-black hidden' name="id" type="submit" value={task?._id} />
                                        <input className='btn btn-primary btn-block bg-blue-500 hover:bg-blue-800 border-0 text-black' type="submit" value="submit" />
                                    </div>
                                </form>
                            </dialog>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
};

export default AllTasks;