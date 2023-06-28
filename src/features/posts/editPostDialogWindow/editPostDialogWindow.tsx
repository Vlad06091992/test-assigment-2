import {Button} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import React, {useState} from "react";
import {useAppDispatch} from "app/hooks";
import {postsActions, postsThunks} from "features/posts/postsSlice";

type EditPostDialogWindowPropsType = {title:string,name:string,body:string,userId:number,id:number,}

export const EditPostDialogWindow = (props:EditPostDialogWindowPropsType) => {
    const dispatch = useAppDispatch()
    let [open, setOpen] = useState(false);
let [title,setTitle] = useState(props.title)
let [name,setName] = useState(props.name)
let [body,setBody] = useState(props.body)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        dispatch(postsThunks.updatePost({userId:props.userId,id:props.id,title,body}))
        dispatch(postsActions.changePostAuthor({userName:name,postId:props.id}))
        setOpen(false);
    };

    return(
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Edit post
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter the post text, sender's name, and title
                    </DialogContentText>
                    <TextField
                        onChange={(e)=>{setBody(e.currentTarget.value)}}
                        value={body}
                        autoFocus
                        margin="dense"
                        id="postText"
                        label="Post text"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        onChange={(e)=>{setName(e.currentTarget.value)}}
                        value={name}
                        autoFocus
                        margin="dense"
                        id="userName"
                        label="User Name"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        onChange={(e)=>{setTitle(e.currentTarget.value)}}
                        value={title}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Title"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>setOpen(false)}>Cancel</Button>
                    <Button onClick={handleClose}>Subscribe</Button>
                </DialogActions>
            </Dialog>
        </div>

    )
}