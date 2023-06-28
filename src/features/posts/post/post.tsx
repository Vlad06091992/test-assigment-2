import {postsThunks, PostType} from "features/posts/postsSlice";
import {useAppDispatch} from "app/hooks";
import React, {useEffect, useState} from "react";
import {postsAPI} from "features/posts/postsAPI";
import {Button} from "@mui/material";
import styles from "./post.module.scss"
import {Comments} from "features/posts/comments/comments";
import {useSelector} from "react-redux";
import {RootState} from "app/store";

export const Post = React.memo((props:PostType) => {
    const limit = useSelector((state: RootState) => state.posts.limit)
    const page = useSelector((state: RootState) => state.posts.page)

    console.log(limit)

    useEffect(()=>{

        if(props.userName == ''){
            dispatch(postsThunks.getUserName({userId:props.userId,id: props.id}))

        }

    },[props.id,limit,page,props.userName])


    let[showComments,setShowComments] = useState(false)

    const dispatch = useAppDispatch()


    return <div className={styles.post} >
        <div>TITLE: {props.title}</div>
        <div>AUTHOR : {props.userName}</div>
        <div>POSTBODY: {props.body}</div>

        <Button onClick={()=>{setShowComments(!showComments)}}>Comments</Button>
        <Button>Edit</Button>
        <Button>Delete</Button>
        <Button>To favorites</Button>

        {showComments && <h2>commnts</h2>}
        <div>
            {showComments && <Comments postId={props.id} />}
        </div>
    </div>
})