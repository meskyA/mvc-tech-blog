async function editFormHandler(event) {
  event.preventDefault();

  const postTitle = document
    .querySelector('input[name="post-title"]')
    .value.trim();
  const postContent = document
    .querySelector('input[name="comment-body"]')
    .value.trim();
    console.log(postTitle);
    console.log(postContent);
  const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];

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
  document.location.replace("/dashboard");
}

document
.querySelector('.edit-post-form')
.addEventListener('submit', editFormHandler);