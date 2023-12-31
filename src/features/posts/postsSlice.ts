import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createAppAsyncThunk} from "common/utils/createAppAsyncThunk";
import {postsAPI} from "features/posts/postsAPI";
import {setLoading} from "app/appSlice";

export type CommentsType = {
    "postId": 1,
    "id": 1,
    "name": string,
    "email": string
    "body": string
}

export type PostsState = {
    posts: PostType[],
    status: string
    commonLength: number,
    page: number,
    limit: number

}

export type PostType = {
    userId: number,
    id: number,
    title: string
    body: string,
    userName: string,
    comments: CommentsType[],
    checked: boolean
}

export type PostDomainType = Omit<PostType, "author" | "comments" | "checked" | "userName">


const initialState: PostsState = {
    posts: [],
    status: 'idle',
    commonLength: 0,
    page: 1,
    limit: 10
};

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload.value;
        },
        setLimit: (state, action) => {
            state.limit = action.payload.value;
        },
        changePostAuthor: (state, action) => {
            debugger
            let post = state.posts.find(el => el.id === action.payload.postId)
            if (post) {
                post.userName = action.payload.userName
            }
        },
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.posts = action.payload.posts.map((el: PostType) => ({
                    ...el,
                    userName: '',
                    comments: [],
                    checked: false
                }))
                state.commonLength = action.payload.commonLength;
            })
            .addCase(getUserName.fulfilled, (state, action) => {
                const post = state.posts.find(el => el.id === action.payload.postId)
                if (post) {
                    post.userName = action.payload.name
                }
            })
            .addCase(getComments.fulfilled, (state, action) => {
                const post = state.posts.find(el => el.id === action.payload.postId)
                if (post) {
                    post.comments = action.payload.comments
                }
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                let post = state.posts.find(el => el.id === action.payload.id)
                if (post) {
                    // post =  {...post,title:action.payload.title,body:action.payload.body }
                    post.title = action.payload.title
                    post.body = action.payload.body
                }
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                let index = state.posts.findIndex(el => el.id === action.payload)
                if (index > -1) {
                    state.posts.splice(index, 1)
                }
            })
    },
});

type fetchPostsArgType = {
    page: number,
    limit: number
}

const fetchPosts = createAppAsyncThunk('posts/fetchPosts', async (arg: fetchPostsArgType, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(setLoading(true))
        const allPosts = await postsAPI.getAllPosts()
        const commonLength = allPosts.data.length
        const res = await postsAPI.getPosts(arg.page, arg.limit)
        const posts = res.data
        return {posts, commonLength}
    } catch (e: any) {
        return rejectWithValue(e.message)
    } finally {
        setLoading(false)
    }
})


const updatePost = createAppAsyncThunk('posts/updatePost', async (arg: PostDomainType, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(setLoading(true))
        let res = await postsAPI.updatePost(arg)
        debugger
        return res.data
    } catch (e: any) {
        return rejectWithValue(e.message)
    } finally {
        setLoading(false)
    }
})

const deletePost = createAppAsyncThunk('posts/deletePost', async (arg: number, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(setLoading(true))
        await postsAPI.deletePost(arg)
        debugger
        return arg as number
    } catch (e: any) {
        return rejectWithValue(e.message)
    } finally {
        setLoading(false)
    }
})


type fetchCommentsPropsType = {
    postId: number
}

const getComments = createAppAsyncThunk('posts/fetchComments', async (arg: fetchCommentsPropsType, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        const res = await postsAPI.getComments(arg.postId)
        const comments = res.data
        return {comments, postId: arg.postId}
    } catch (e: any) {
        return rejectWithValue(e.message)
    }
})

type getUserNameArgType = {
    id: number,
    userId: number
}

const getUserName = createAppAsyncThunk('posts/gerUserName', async (arg: getUserNameArgType, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        const res = await postsAPI.getUserName(arg.userId)
        return {name: res.data.name, userId: arg.userId, postId: arg.id}
    } catch (e: any) {
        return rejectWithValue(e.message)
    }
})




export const postsThunks = {fetchPosts, getUserName, getComments, updatePost,deletePost}
export const postsReducer = postsSlice.reducer
export const postsActions = postsSlice.actions