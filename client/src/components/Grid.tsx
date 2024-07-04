import React from 'react'
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";


interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

const Grid: React.FC = () => {

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 90 },
        { field: "userId", headerName: "User ID", width: 150 },
        { field: "title", headerName: "Title", width: 300 },
        { field: "body", headerName: "Body", width: 900 },
    ];

    const getData = async () => {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }

            const responseBody: Post[] = await response.json();
            setPosts(responseBody);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    React.useEffect(() => {
        getData();
    }, []);

    const [posts, setPosts] = React.useState<Post[]>([]);
    return (
        <Box sx={{ height: 630, width: "100%" }}>
            <DataGrid
                rows={posts}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}
            />
        </Box>
    )
}

export default Grid
