import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const AllTasks = () => {

    const { user } = useContext(AuthContext);
    const email = user?.email;
    const [tasks, setTasks] = useState([]);
    const [sort, setSort] = useState(true);

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
                        // if (data.deletedCount > 0) {

                        //     const remaining = toys.filter(user => user._id !== _id)
                        //     setToys(remaining);
                        // }
                    })
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
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
                            {/* <td className="py-2 px-4 bg-blue-100 border border-gray-500 ">
                                <Link to={`/updatetoy/${toy._id}`}><button className='btn btn-outline btn-info border-0 text-black'>Update</button></Link>
                            </td> */}
                            <td className="py-2 px-4 bg-blue-100 border border-gray-500 "><button className='btn btn-outline btn-warning border-0' onClick={() => handleDelete(tasks?._id)} >Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllTasks;