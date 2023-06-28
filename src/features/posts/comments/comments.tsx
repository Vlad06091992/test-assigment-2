import styles from "./comments.module.scss"
import {postsThunks} from "features/posts/postsSlice";
import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "app/hooks";

type CommentsPropsType = {
    postId: number

}
export const Comments = (props: CommentsPropsType) => {
    const dispatch = useAppDispatch()
    let post = useAppSelector(state => state.posts.posts.find(el => el.id === props.postId))
    let comments = post?.comments

    console.log(comments)

    useEffect(() => {
        dispatch(postsThunks.getComments({postId: props.postId}))
    }, [props.postId])


    return (
        <div className={styles.comments}>
            <div>
                {comments?.map((el) => <CommentItem body={el.body} email={el.email} id={el.id} name={el.name} postId={el.postId}/>)}
            </div>
        </div>
    )
}

type CommentItemProps = {


    body: string
    email: string
    id: number
    name: string
    postId: number
}

const CommentItem = React.memo((props: CommentItemProps) => {
    return (<div style={{"margin":"10px"}}>
        <div>EMAIL :{props.email}</div>
        <div>NAME :{props.name}</div>
        <div>BODY :{props.body}</div>

    </div>)
})