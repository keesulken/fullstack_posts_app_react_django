import axios from 'axios';
const URL = 'http://127.0.0.1:8000';


export default class PostService{
    constructor(){}

    getPosts(){
        const url = `${URL}/api/v1/posts`;
        return axios.get(url).then(res => res.data);
    }

    setLikePost(id){
        const url = `${URL}/api/v1/like_post/${id}`;
        return axios.get(url).then(res => res.data);
    }

    createPost(text){
        const url = `${URL}/api/v1/posts`;
        return axios.post(url, text);
    }

    deletePost(id){
        const url = `${URL}/api/v1/delete/${id}`;
        return axios.delete(url);
    }
}
