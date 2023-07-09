import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { Form, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const AllTasks = () => {
    const { user } = useContext(AuthContext);
    const email = user?.email;

    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [sort, setSort] = useState(true);
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [currentId, setCurrentId] = useState('');
    const [allUsers, setAllUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetch(`${import.meta.env.VITE_SERVER_URL}/allusers`)
            .then((res) => res.json())
            .then((data) => setAllUsers(data));
    }, []);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_SERVER_URL}/alltasks`)
            .then((res) => res.json())
            .then((data) => {
                setTasks(data);
                setFilteredTasks(data);
            });
    }, []);

    useEffect(() => {
        filterTasks();
    }, [tasks, selectedStatus]);

    const filterTasks = () => {
        const filtered = tasks.filter((task) =>
            task.status.toLowerCase().includes(selectedStatus.toLowerCase())
        );
        setFilteredTasks(filtered);
    };

    const handleDelete = (_id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${import.meta.env.VITE_SERVER_URL}/deletetask/${_id}`, {
                    method: 'DELETE',
                })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data);
                        if (data.deletedCount > 0) {
                            const remaining = tasks.filter((task) => task._id !== _id);
                            setTasks(remaining);
                            setFilteredTasks(remaining);
                        }
                    });
                Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
            }
        });
    };

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
        fetch(`${import.meta.env.VITE_SERVER_URL}/updatetask/${id}`, {
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

    const handleSort = () => {
        const sortedTasks = [...filteredTasks];
        sortedTasks.sort((a, b) => {
            if (sort) {
                return a.title.localeCompare(b.title);
            } else {
                return b.title.localeCompare(a.title);
            }
        });
        setFilteredTasks(sortedTasks);
        setSort(!sort);
    };

    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = tasks.filter(
            (task) =>
                task.title.toLowerCase().includes(query) ||
                task.description.toLowerCase().includes(query)
        );
        setFilteredTasks(filtered);
    };

    return (
        <div className="m-10">
            <h1 className="text-center text-5xl font-bold text-blue-950 my-5">
                All Tasks
            </h1>

            <div className="flex justify-end mb-4 gap-5">
                <input
                    type="text"
                    placeholder="Search..."
                    className="px-2 py-1 border border-gray-300 rounded"
                    value={searchQuery}
                    onChange={handleSearch}
                />
                <div className="relative">
                    <select
                        className="select select-bordered w-48"
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                    >
                        <option value="">All</option>
                        <option value="Not-Started">Not Started</option>
                        <option value="In-Progress">In Progress</option>
                        <option value="Finish">Finish</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                            className="fill-current h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10.293 13.95a1 1 0 0 1-1.414 0l-3.585-3.586a1 1 0 0 1 1.414-1.414L10 11.586l3.293-3.293a1 1 0 0 1 1.414 1.414l-3.586 3.586z"
                            />
                        </svg>
                    </div>
                </div>
                <button
                    className="btn btn-primary bg-blue-200 hover:bg-blue-500 border-0 text-black"
                    onClick={handleSort}
                >
                    {sort ? 'Sort A-Z' : 'Sort Z-A'}
                </button>
            </div>

            <div className='overflow-auto'>
            <table className="w-full bg-white border border-gray-300 text-center overflow-x-scroll">
                <thead>
                    <tr>
                        <th>Assigned User</th>
                        <th>Title</th>
                        <th>Status</th>
                        <th>View Details</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTasks.map((task) => (
                        <tr key={task?._id}>
                            <td>{task?.assignedUser}</td>
                            <td>{task?.title}</td>
                            <td>{task?.status}</td>
                            <td>
                                <Link to={`/task/${task?._id}`}>
                                    <button className="btn btn-outline btn-neutral border-0 text-black">
                                        View Details
                                    </button>
                                </Link>
                            </td>
                            <td onClick={() => window.my_modal_3.showModal()}>
                                <button className="btn btn-outline btn-info border-0 text-black">
                                    Update
                                </button>
                            </td>
                            <td>
                                <button
                                    className="btn btn-outline btn-warning border-0"
                                    onClick={() => handleDelete(task?._id)}
                                >
                                    Delete
                                </button>
                            </td>
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
        </div>
    );
};

export default AllTasks;
