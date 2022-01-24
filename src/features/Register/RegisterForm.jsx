import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const theme = createTheme();

const schema = yup.object().shape({
    username: yup.string().required("This field is required"),
    password: yup.string()
        .required("This field is required")
        .min(8, "Password must have atleast 8 characters")
        .matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/, {
            message: "Password must contain atleast 1 lowercase, 1 uppercase, 1 number",
            excludeEmptyString: true,
        }),
    passwordConfirmation: yup.string().required("This field is required").oneOf([yup.ref('password')], "Password confirmation doesn't match with password"),
}).required()

export default function RegisterForm(props) {

    const { onSubmit } = props;

    const [errorMessage, setErrorMessage] = React.useState("");

    const { register, handleSubmit, formState: { errors }, getValues } = useForm({
        resolver: yupResolver(schema),
        mode: "onBlur"
    });

    const handleOnSubmit = async (event) => {
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        if (onSubmit) {
            const response = await onSubmit({
                username: getValues('username'),
                password: getValues('password'),
            });
            if (response !== true) {
                setErrorMessage(response);
            }
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit(handleOnSubmit)} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    error={errors.username ? true : false}
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    {...register("username")}
                                    helperText={errors.username?.message}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={errors.password ? true : false}
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    {...register("password")}
                                    helperText={errors.password?.message}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={errors.passwordConfirmation ? true : false}
                                    required
                                    fullWidth
                                    name="passwordConfirmation"
                                    label="Confirm Password"
                                    type="password"
                                    id="passwordConfirmation"
                                    autoComplete="new-password-confirmation"
                                    {...register("passwordConfirmation")}
                                    helperText={errors.passwordConfirmation?.message}
                                />
                            </Grid>
                        </Grid>
                        {errorMessage ?
                            (<Typography variant="subtitle1" gutterBottom component="div" style={{ "color": "red" }}>
                                {errorMessage}
                            </Typography>) : ""}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to="/login">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}