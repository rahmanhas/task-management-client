import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link, useParams } from 'react-router-dom';

const TaskDetails = () => {
    const { id } = useParams();
    
    const [tasks, setTasks] = useState([])
    useEffect(() => {
        fetch(`http://localhost:3000/tasks/${id}`)
            .then(res => res.json())
            .then(data => setTasks(data))
    }, [])
    console.log(tasks);
    return (
        <>
            {
                <div className="card w-[500px] bg-base-100 mx-auto text-center">
                <div className="card-body">
                    <h2 className="card-title text-5xl py-10">{tasks?.title}</h2>
                    <h2 className="card-title text-2xl py-5">{tasks?.description}</h2>
                    <p className='text-xl py-3'>Assigned User: {tasks?.assignedUser}</p>
                    <p className='text-xl py-3'>Current Status: {tasks?.status}</p>
                    <p className='text-xl py-3'>Due Date: {tasks?.dueDate}</p>
                    <p className='text-xl py-3'>Price: {tasks?.price}</p>
                    <div className="card-actions justify-center">
                        <button className="btn btn-primary">Update Task</button>
                    </div>
                </div>
            </div>
            }
        </>
    );
};

export default TaskDetails;