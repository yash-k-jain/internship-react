import React, { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Box, Collapse } from "@mui/material";
import data, { Department } from "../data";

interface Check {
    [key: string]: boolean;
}

const Api: React.FC = () => {
    const [toggleDepartments, setToggleDepartments] = useState<boolean>(true);
    const [selectedDepartment, setSelectedDepartment] = useState<string>("customer_service");
    const [checkParent, setCheckParent] = useState<Check>({});
    const [checkChild, setCheckChild] = useState<Check>({});

    const handleToggle = (department: string) => {
        if(toggleDepartments && selectedDepartment === department) {
            setToggleDepartments(false);
            setSelectedDepartment("customer_services")
        } else {
            setSelectedDepartment(department);
            setToggleDepartments(true);
        }
    };

    const handleParentCheck = (event: React.ChangeEvent<HTMLInputElement>, department: string, obj: Department) => {
        const isChecked = event.target.checked;

        setCheckParent((prevCheckParent) => ({
            ...prevCheckParent,
            [department]: isChecked,
        }));

        const updatedCheckChild: Check = {};
        obj.sub_departments.forEach((s) => {
            updatedCheckChild[s] = isChecked;
        });

        setCheckChild((prevCheckChild) => ({
            ...prevCheckChild,
            ...updatedCheckChild,
        }));
    };

    const handleChildCheck = (event: React.ChangeEvent<HTMLInputElement>, subDepartment: string) => {
        const isChecked = event.target.checked;

        setCheckChild((prevCheckChild) => ({
            ...prevCheckChild,
            [subDepartment]: isChecked,
        }));
    };

    useEffect(() => {
        data.forEach((department) => {
            const allSubChecked = department.sub_departments.every((s) => checkChild[s]);
            setCheckParent((prevCheckParent) => ({
                ...prevCheckParent,
                [department.department]: allSubChecked,
            }));
        });
    }, [checkChild]);

    return (
        <>
            <Box sx={{ margin: "1rem" }}>
                <h1>Select Department</h1>
                {data.map((d) => (
                    <Box key={d.department}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "start",
                                alignItems: "center",
                            }}
                        >
                            {toggleDepartments &&
                                selectedDepartment === d.department ? (
                                <ArrowDropDownIcon
                                    onClick={() => handleToggle(d.department)}
                                />
                            ) : (
                                <ArrowRightIcon
                                    onClick={() => handleToggle(d.department)}
                                />
                            )}

                            <Checkbox
                                checked={checkParent[d.department] || false}
                                onChange={(event) => handleParentCheck(event, d.department, d)}
                            />
                            {d.department}
                        </Box>
                        <Collapse
                            in={
                                toggleDepartments &&
                                selectedDepartment === d.department
                            }
                        >
                            <Box sx={{ margin: "0 3rem" }}>
                                {d.sub_departments.map((s) => (
                                    <Box key={s}>
                                        <Checkbox
                                            onChange={(event) => handleChildCheck(event, s)}
                                            checked={checkChild[s] || false}
                                        />{" "}
                                        {s}
                                    </Box>
                                ))}
                            </Box>
                        </Collapse>
                    </Box>
                ))}
            </Box>
        </>
    );
};

export default Api;
