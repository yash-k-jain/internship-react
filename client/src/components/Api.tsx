import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "./Grid";
import Departments from "./Departments";

interface Props {
    setToggle: (value:  React.SetStateAction<boolean>) => void;
}

const Api: React.FC<Props> = ({ setToggle }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("formData")) {
            setToggle(true);
            navigate("/");
        }
    }, [navigate, setToggle]);

    return (
        <>
            <Grid />
            <Departments />
        </>
    );
};

export default Api;
