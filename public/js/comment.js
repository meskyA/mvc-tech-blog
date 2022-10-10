async function commentFormHandler(event) {
    event.preventDefault();

    const comment_content = document.querySelector('input[name="comment-body"]').value.trim();

    const postId = window.location.toString().split('/')[windwow.location.toString().split('/').length - 1 
];
    querySelector('input[name="post-id"]').value;
    // if (event.target[0].value.trim()) {
        if (comment_content) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                postId,
                comment_content
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.reload();

        } else {
            alert(response.statusText);
        }
    }
}

// 
document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);







