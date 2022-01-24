import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CreateTask from './CreateTask';
import DeleteTask from './DeleteTask';
import UpdateTask from './UpdateTask';

export default function TaskForm(props) {

    const {
        taskList,
        cateList,
        handleCreateSubmit,
        handleDeleteSubmit,
        handleUpdateSubmit
    } = props

    const [currentTask, setCurrentTask] = React.useState({});

    //Create task here
    const [openCreateForm, setOpenCreateForm] = React.useState(false);

    const handleCreateOpen = () => {
        setOpenCreateForm(true);
    };

    const handleCreateClose = () => {
        setOpenCreateForm(false);
    };


    //Delete task here
    const [openDeleteForm, setOpenDeleteForm] = React.useState(false);

    const handleDeleteOpen = (task) => {
        setOpenDeleteForm(true);
        setCurrentTask(task)
    };

    const handleDeleteClose = () => {
        setOpenDeleteForm(false);
        setCurrentTask({});
    };

    //Update task here
    const [openUpdateForm, setOpenUpdateForm] = React.useState(false);

    const handleUpdateOpen = (task) => {
        setOpenUpdateForm(true);
        setCurrentTask(task);
    };

    const handleUpdateClose = () => {
        setOpenUpdateForm(false);
        setCurrentTask({});
    };

    return (
        <div>
            <Button
                variant="outlined"
                size="small"
                style={{ marginBottom: "20px" }}
                onClick={handleCreateOpen}
            >
                Create task
            </Button>
            {openCreateForm && <CreateTask
                open={openCreateForm}
                handleClose={handleCreateClose}
                cateList={cateList}
                onSubmit={handleCreateSubmit}
            />}
            {openDeleteForm && <DeleteTask
                open={openDeleteForm}
                handleClose={handleDeleteClose}
                _task={currentTask}
                onSubmit={handleDeleteSubmit}
            />}

            {openUpdateForm && <UpdateTask
                open={openUpdateForm}
                handleClose={handleUpdateClose}
                _task={currentTask}
                onSubmit={handleUpdateSubmit}
                cateList={cateList}
            />}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Index</TableCell>
                            <TableCell align="right">ID</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Category</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {taskList?.map((row, index) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell align="right">{row.id}</TableCell>
                                <TableCell align="right">{row.title}</TableCell>
                                <TableCell align="right">{row.categories?.map((category) => {
                                    return category.name + " | ";
                                })}</TableCell>
                                <TableCell align="right">
                                    <Stack spacing={2} direction="row" justifyContent="flex-end">
                                        <Button variant="outlined" onClick={() => handleUpdateOpen(row)} > Update</Button>
                                        <Button variant="contained" color="error" onClick={() => handleDeleteOpen(row)}>Delete</Button>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div >
    );
}
