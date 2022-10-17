// async function editFormHandler(event) {
//   event.preventDefault();

//   const postTitle = document.querySelector('input[name="post-title"]').value.trim();

//   const postContent = document.querySelector('textarea[name="post-text"]').value.trim();
//   postContent,
//   console.log(postTitle);
//   // console.log(postContent);
//   const id = document.querySelector('input[name="post-id"]').value;
//   // const id = window.location.toString().split('/')[
//     window.location.toString().split('/').length - 1
 
//     const response = await fetch(`/api/posts/${id}`, {
//       method: 'PUT',
//       body: JSON.stringify({
//         postContent,
//         postTitle,
//         // postContent
//       }),
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });
    
//     if (response.ok) {
//       document.location.replace('/dashboard/');
//     } else {
//       alert(response.statusText);
//     }

// }
async function editFormHandler(event) {
  event.preventDefault();

  const postTitle = document
    .querySelector('input[name="post-title"]')
    .value.trim();
  const postContent = document
    .querySelector('textarea[name="post-text"]')
    .value.trim();
  const id = document.querySelector('input[name="post-id"]').value;

  const response = await fetch(`/api/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      postTitle,
      postContent,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  document.location.replace("/dashboard/");
}

document
.querySelector('#edit-post-form')
.addEventListener('submit', editFormHandler);