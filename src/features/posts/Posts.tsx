import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "app/store";
import {useAppDispatch} from "app/hooks";
import {postsThunks} from "features/posts/postsSlice";
import {Post} from "features/posts/post/post";
import {FormControl, InputLabel, MenuItem, Pagination, Select, SelectChangeEvent} from "@mui/material";


export const Posts = React.memo( () => {
    let [page, setPage] = useState(1)
    let [limit, setLimit] = useState(10)
    const dispatch = useAppDispatch()
    const posts = useSelector((state: RootState) => state.posts.posts)
    const NumberOfPostsPerPage = useSelector((state: RootState) => state.posts.commonLength)
    const totalNumberOfPages = Math.ceil(NumberOfPostsPerPage / limit)

    useEffect(() => {
        dispatch(postsThunks.fetchPosts({page, limit}))
    }, [page, limit])

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const _handleChange = (event: SelectChangeEvent) => {
        setLimit(+event.target.value as number);
    };
    return (
        <div>
            <div style={{"display": "flex", "margin": "20px", "justifyContent": "space-between"}}>
                <div style={{"display":"flex", "alignItems":"center"}}>
                    <>Number of posts</>
                    <FormControl sx={{"marginLeft":"10px"}}>
                        <InputLabel id="demo-simple-select-label"></InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={limit.toString()}
                            onChange={_handleChange}
                            size={"small"}
                        >
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={20}>20</MenuItem>
                            <MenuItem value={50}>50</MenuItem>
                            <MenuItem value={100}>100</MenuItem>
                            <MenuItem value={NumberOfPostsPerPage}>all</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                <Pagination count={totalNumberOfPages} page={page} onChange={handleChange}/>
            </div>
            <div>{posts.map(el => <Post {...el}/>)}</div>


        </div>
    )

})