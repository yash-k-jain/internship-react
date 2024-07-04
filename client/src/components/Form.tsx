import React from 'react'
import { Box, Button, FormControl, InputLabel, Input, FormHelperText, Typography } from '@mui/material'
import { MuiTelInput } from 'mui-tel-input';
import { useNavigate } from 'react-router-dom';

interface Data {
    name: string
    email: string
    phone_number: string
}

interface Props {
    toggle: boolean;
}

const formBoxStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "60vh",
    flexDirection: "column",
    border: "2px solid black",
    width: "25%",
    margin: "2rem auto",
    borderRadius: "10px"
}

const innerBoxStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
}


const formControlStyles = { marginBottom: "1rem" }

const Form: React.FC<Props> = ({ toggle }) => {

    const warningBoxStyles: React.CSSProperties = {
        position: "absolute",
        border: "2px solid black",
        width: "23%",
        margin: "auto",
        padding: "20px",
        borderRadius: "10px",
        transform: `${toggle ? "translateY(40%) translateX(10%)" : "translateY(-1000%)"}`,
        transition: "all 0.5s ease-in-out"
    };

    const navigate = useNavigate();
    const [formData, setFormData] = React.useState<Data>({
        name: '',
        email: '',
        phone_number: '',
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault()

        localStorage.setItem('formData', JSON.stringify(formData))
        setFormData({
            name: '',
            email: '',
            phone_number: '',
        })
        navigate('/second');
    }

    return (
        <>
            <Box sx={warningBoxStyles}>
                <p>Must enter your details before accessing the page.</p>
            </Box>
            <Box sx={formBoxStyles}>
                <Typography variant="h3">Details Form</Typography>
                <form onSubmit={handleSubmit}>
                    <Box sx={innerBoxStyles}>
                        <FormControl required sx={formControlStyles}>
                            <InputLabel htmlFor="email">Email address</InputLabel>
                            <Input type='email' name='email' value={formData.email} onChange={handleChange} id="email" aria-describedby="my-helper-text" />
                            <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
                        </FormControl>

                        <FormControl required sx={formControlStyles}>
                            <InputLabel htmlFor="name">Your Name</InputLabel>
                            <Input type='text' name='name' value={formData.name} onChange={handleChange} id="name" aria-describedby="my-helper-text" />
                        </FormControl>

                        <FormControl required sx={formControlStyles}>
                            <MuiTelInput
                                name='phone_number'
                                onlyCountries={['IN']}
                                value={formData.phone_number}
                                onChange={(value: string) => setFormData({ ...formData, phone_number: value })}
                                variant="outlined"
                                fullWidth
                                required
                            />
                        </FormControl>
                        <Button type="submit" variant="contained">Submit</Button>
                    </Box>
                </form>
            </Box>
        </>
    )
}

export default Form
