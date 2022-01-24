import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useDispatch } from 'react-redux';
import { logoutUserAction } from '../../actions/user';
import { removeToken } from '../../features/Login/loginSlice';
import { Link, useHistory } from 'react-router-dom';

export default function Header() {

    const dispatch = useDispatch();
    const history = useHistory();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        const action = logoutUserAction();
        dispatch(action);
        removeToken();
        handleClose();
        history.push("/");
    }

    const handleHistory = (url) => {
        history.push(`/${url}`)
    }

    return (
        <div className='header'>
            <div className="container">
                <div className="header-left">
                    <Button variant="contained" style={{ "marginRight": "10px" }} onClick={() => handleHistory("tasks")}>
                        Tasks
                    </Button>
                    <Button variant="contained" onClick={() => handleHistory("categories")}>
                        Categories
                    </Button>
                </div>
                <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    Dashboard
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
            </div>
        </div>
    );
}
