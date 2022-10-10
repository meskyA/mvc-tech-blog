async function editFormHandler(event) {
  event.preventDefault();

  const postTitle = document.querySelector('input[name="post-title"]').value.trim();
  // const postContent = document.querySelector('input[name="content"]').value.trim();
  const postContent = document.querySelector('post-text[name="post-text"]').value.trim();
  postContent,
  console.log(postTitle);
  // console.log(postContent);

  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
    
    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        postId: id,
        postTitle,
        // postContent
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (response.ok) {
      document.location.replace('/dashboard/');
    } else {
      alert(response.statusText);
    }

}

document
.querySelector('#edit-post-form')
.addEventListener('submit', editFormHandler);