import { useEffect, useState } from 'react';
import BarChart from './BarChart';
import PieChart from './PieChart';
import AllTasks from '../AllTasks/AllTasks';

const MAinDashboard = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/alltasks`);
                const data = await response.json();
                setTasks(data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div className='flex justify-between items-center'>
                <div className='flex justify-center items-center'>
                    {tasks.length > 0 && <BarChart data={createChartData(tasks)} />}
                </div>
                <div className='flex justify-center items-center'>
                    {tasks.length > 0 && <PieChart data={createPieChartData(tasks)} />}
                </div>
            </div>
            <div>
                <AllTasks></AllTasks>
            </div>
        </>
    );
};

// Utility function to create chart data based on tasks
const createChartData = (tasks) => {
    const inProgressCount = tasks.filter(task => task.status === 'In-Progress').length;
    const notCompletedCount = tasks.filter(task => task.status === 'Not-Started').length;
    const finishCount = tasks.filter(task => task.status === 'Finish').length;
    const totalCount = tasks.length;

    return [
        { x: 'InComplete', y: notCompletedCount },
        { x: 'InProgress', y: inProgressCount },
        { x: 'Completed', y: finishCount },
        { x: 'Total', y: totalCount },
    ];
};
const createPieChartData = (tasks) => {
    const inProgressCount = tasks.filter(task => task.status === 'In-Progress').length;
    const notCompletedCount = tasks.filter(task => task.status === 'Not-Started').length;
    const finishCount = tasks.filter(task => task.status === 'Finish').length;
    const totalCount = tasks.length;

    return [
        { label: 'InComplete', value: notCompletedCount },
        { label: 'InProgress', value: inProgressCount },
        { label: 'Completed', value: finishCount },
    ];
};

export default MAinDashboard;
