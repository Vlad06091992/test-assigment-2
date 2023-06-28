import {instance} from "../../../src/common/common-api/common-api";
import {PostDomainType, PostType} from "features/posts/postsSlice";

export const postsAPI = {
    getPosts(page:number,limit:number) {
        return instance.get(`/posts?_page=${page}&_limit=${limit}`);
    },
    getAllPosts() {
        return instance.get(`/posts`);
    },
    getUserName(userId:number){
        return instance.get(`/users/${userId}`);
    },
    getComments(postId:number){
        return instance.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
    },
    updatePost(post:PostDomainType){
        return instance.put(`https://jsonplaceholder.typicode.com/posts/${post.id}`, post);
    },
    deletePost(postId:number){
        return instance.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    }
}