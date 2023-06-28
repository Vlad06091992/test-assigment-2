import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "app/store";
import {useAppDispatch} from "app/hooks";
import {postsActions, postsThunks} from "features/posts/postsSlice";
import {Post} from "features/posts/post/post";
import {FormControl, InputLabel, MenuItem, Pagination, Select, SelectChangeEvent} from "@mui/material";
import {Preloader} from "common/preloader/Preloader";


export const Posts = React.memo(() => {

    const dispatch = useAppDispatch()
    const posts = useSelector((state: RootState) => state.posts.posts)
    const isLoading = useSelector((state: RootState) => state.app.isLoading)
    const page = useSelector((state: RootState) => state.posts.page) || 1
    const limit = useSelector((state: RootState) => state.posts.limit) || 10
    const NumberOfPostsPerPage = useSelector((state: RootState) => state.posts.commonLength)
    const totalNumberOfPages = Math.ceil(NumberOfPostsPerPage / limit)

    console.log(page)

    useEffect(() => {
        dispatch(postsThunks.fetchPosts({page, limit}))
    }, [page, limit])

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        dispatch(postsActions.setPage({value}))
    };

    const _handleChange = (event: SelectChangeEvent) => {
        dispatch(postsActions.setLimit({value: +event.target.value as number}))
        dispatch(postsActions.setPage({value: 1}))
    };

    if (isLoading) return <Preloader/>


    return (
        <div>
            <div style={{"display": "flex", "margin": "20px", "justifyContent": "space-between"}}>
                <div style={{"display": "flex", "alignItems": "center"}}>
                    <>Number of posts</>
                    <FormControl sx={{"marginLeft": "10px"}}>
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
            <div>{posts.map(el => <Post key={el.id} {...el}/>)}</div>

        </div>
    )

})