import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useForm } from "react-hook-form";

export default function DeleteTask(props) {

    const { open, handleClose, _task, onSubmit } = props;

    const [errorMessage, setErrorMessage] = React.useState("");

    const handleOnSubmit = async (event) => {
        if (onSubmit && _task) {
            const response = await onSubmit(_task.id);
            if (response !== true) {
                setErrorMessage(response);
                return;
            }
            handleClose();
        }
    };

    const { handleSubmit } = useForm();

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <Box component="form" onSubmit={handleSubmit(handleOnSubmit)} noValidate sx={{ mt: 1 }}>
                    <DialogTitle>Delete task</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to delete this task?
                        </DialogContentText>
                        <DialogContentText>
                            ID: {_task?.id}
                        </DialogContentText>
                        <DialogContentText>
                            Title: {_task?.title}
                        </DialogContentText>
                    </DialogContent>
                    <DialogContent>
                        {errorMessage ?
                            (<Typography variant="subtitle1" gutterBottom component="div" style={{ "color": "red" }}>
                                {errorMessage}
                            </Typography>) : ""}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type='submit'>Delete</Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </div>
    );
}
