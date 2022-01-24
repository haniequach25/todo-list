import React from 'react';
import { useSelector } from 'react-redux';
import { createTaskApi, deleteTaskApi, getTaskApi, updateTaskApi } from '../../api/taskApi';
import TaskForm from './TaskForm';
import Typography from '@mui/material/Typography';
import { getCategoryApi } from '../../api/taskCateApi';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function Task(props) {

    const [taskList, setTaskList] = React.useState([]);

    const [cateList, setCateList] = React.useState([]);

    const token = useSelector(state => state.user.token);

    const history = useHistory();

    React.useEffect(() => {
        const fetchTaskList = async () => {
            try {
                const param = {

                }
                const response = await getTaskApi(param, token.token);
                if (response && response.status === 200) {
                    setTaskList(response.data.items)
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchTaskList();
    }, []);

    React.useEffect(() => {
        const fetchCateList = async () => {
            try {
                const param = {

                }
                const response = await getCategoryApi(param, token.token);
                if (response && response.status === 200) {
                    setCateList(response.data.items)
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchCateList();
    }, []);

    const handleCreateSubmit = async (data) => {
        const response = await createTaskApi(data, token.token);
        if (response && response.status === 201) {
            const param = {

            }
            const response = await getTaskApi(param, token.token);
            if (response && response.status === 200) {
                setTaskList(response.data.items);
                return true;
            }
        }
        else {
            return response.message;
        }
    }

    const handleDeleteSubmit = async (id) => {
        const response = await deleteTaskApi(id, token.token);
        if (response && response.status === 204) {
            const param = {

            }
            const response = await getTaskApi(param, token.token);
            if (response && response.status === 200) {
                setTaskList(response.data.items)
                return true;
            }
        }
        else {
            return response.message;
        }
    }

    const handleUpdateSubmit = async (id, data) => {
        const response = await updateTaskApi(id, data, token.token);
        if (response && response.status === 200) {
            const param = {

            }
            const response = await getTaskApi(param, token.token);
            if (response && response.status === 200) {
                setTaskList(response.data.items)
                return true;
            }
        }
        else {
            return response.message;
        }
    }

    return (
        <div>
            <div className="container">
                <Typography variant="h4" gutterBottom component="div" style={{ color: "#1976d2" }}>
                    Task
                </Typography>
                <TaskForm
                    taskList={taskList}
                    cateList={cateList}
                    handleCreateSubmit={handleCreateSubmit}
                    handleDeleteSubmit={handleDeleteSubmit}
                    handleUpdateSubmit={handleUpdateSubmit}
                />
            </div>
        </div>
    );
}

export default Task;