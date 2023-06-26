import {instance} from "../../../src/common/common-api/common-api";

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
    }
}