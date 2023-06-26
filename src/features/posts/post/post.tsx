import {postsThunks, PostType} from "features/posts/postsSlice";
import {useAppDispatch} from "app/hooks";
import {useEffect} from "react";
import {postsAPI} from "features/posts/postsAPI";

export const Post = (props:PostType) => {

    const dispatch = useAppDispatch()
    const postId = props.id
    const userId = props.userId
    const comments = props.comments


    useEffect(()=>{
        dispatch(postsThunks.getUserName({userId,id: postId}))
        dispatch(postsThunks.getComments({postId}))
    },[postId,userId,comments])




    return <div style={{"margin":"20px"}}>
        <div>TITLE: {props.title}</div>
        <div>POSTBODY: {props.body}</div>
        <h2>commnts</h2>

        <div>
            {comments.map((el) => <div>{el.email}</div>)}
        </div>
    </div>
}