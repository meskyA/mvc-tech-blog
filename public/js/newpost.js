// const { response } = require("express");

// const newFormHandler = 
async function newFormHandler(event) {
    event.preventDefault();
  
    const postTitle = document.querySelector('input[name="post-title"]').value;
    // const postContent = document.querySelector('textarea[name="post-body"]').value;
    const postContent = document.querySelector('textarea[name="post-text"]').value;
    postContent,
    console.log(postTitle);
    // console.log(postContent);
  
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        postTitle,
        postContent,
      }),
      headers: { 'Content-Type': 'application/json' 
    }
  });
  if (response.ok) {
    document,location.replace('/dashboard');
  }else {
    alert(response.statusMessage);
  }
}
  document
    // .querySelector('#new-post-form')
    .addEventListener('submit', newFormHandler);