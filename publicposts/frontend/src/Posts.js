import React, { Component } from 'react'
import PostService from './PostService';

const postService = new PostService();

export default class Posts extends Component {
constructor(props) {
  super(props)

  this.state = {
    data: [],
    inputValue: '',
  };

  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
};
  

handleChange(event) {
    this.setState({
        inputValue: event.target.value,
    });
}


handleSubmit(event) {
    postService.createPost({text: this.state.inputValue,});
    this.setState({
        inputValue: '', 
    });
}


getData(){
    postService.getPosts().then(res => {
        this.setState({
            data: res.data,
        });
    });
};


componentDidMount(){
    this.getData();
}


componentDidUpdate(prevState) {
    if (prevState.data !== this.state.data) {
        this.getData();
    }
}


setLike(post) {
    postService.setLikePost(post.id);
    post.likes_count += 1;
    this.forceUpdate();
}


deletePost(post) {
    postService.deletePost(post.id);
    this.setState({
        data: this.state.data.filter(data => data !== post),
    });
}


render() {
    return (
        <div id='posts'>
            {this.state.data.map(post =>(
                <div id={'post_' + post.id}>
                    <p> {post.text} </p>
                    <button onClick={() => this.setLike(post)}>{ post.likes_count }</button>
                    <p> Date: {post.date}</p>
                    <button onClick={() => this.deletePost(post)}>Delete post</button>
                </div>
                ))}
                <input type='text' onChange={this.handleChange} value={this.state.inputValue}></input>
                <button onClick={this.handleSubmit}>Send</button>
        </div>
    )
  }
}
