import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox"

export default function CreateTask(props) {

    const { open, handleClose, onSubmit, cateList } = props

    const [errorMessage, setErrorMessage] = useState("");

    const [checkedList, setCheckedList] = useState([]);

    const schema = yup.object().shape({
        title: yup.string().required("This field is required"),
    }).required()

    const { register, handleSubmit, formState: { errors }, getValues } = useForm({
        resolver: yupResolver(schema),
        mode: "onBlur"
    });

    const handleOnSubmit = async (event) => {
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        if (onSubmit && checkedList.length !== 0) {
            const response = await onSubmit({
                title: getValues('title'),
                categoryIds: checkedList,
            });
            if (response !== true) {
                setErrorMessage(response);
                return;
            }
            handleClose();
        }
        else {
            setErrorMessage("Pick at least 1 category");
        }
    };

    const handleChecked = (id) => {
        setCheckedList(prev => {
            const isChecked = checkedList.includes(id);
            if (isChecked) {
                return prev.filter(item => item !== id)
            }
            else {
                return [...prev, id];
            }
        })
    }

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <Box component="form" onSubmit={handleSubmit(handleOnSubmit)} noValidate sx={{ mt: 1 }}>
                    <DialogTitle>Create task</DialogTitle>
                    <DialogContent>
                        <TextField
                            error={errors.title ? true : false}
                            margin="normal"
                            required
                            fullWidth
                            id="title"
                            label="Title"
                            name="title"
                            autoComplete="title"
                            {...register("title")}
                            helperText={errors.title?.message}
                        />
                    </DialogContent>
                    <List dense component="div" role="list" sx={{ my: 1.25 }}>
                        {cateList?.map((category) => (
                            <ListItem
                                role="listitem"
                                button
                                key={category.id}
                                onClick={() => { handleChecked(category.id) }}
                            >
                                <ListItemIcon>
                                    <Checkbox
                                        checked={checkedList.includes(category.id)}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{
                                            "aria-labelledby": category.id,
                                        }}
                                        onChange={() => { handleChecked(category.id) }}
                                    />
                                </ListItemIcon>
                                <ListItemText id={category.id} primary={category.name} />
                            </ListItem>
                        ))}
                    </List>
                    <DialogContent>
                        {errorMessage ?
                            (<Typography variant="subtitle1" gutterBottom component="div" style={{ "color": "red" }}>
                                {errorMessage}
                            </Typography>) : ""}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Create</Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </div>
    );
}
