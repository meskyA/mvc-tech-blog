async function commentFormHandler(event) {
    event.preventDefault();

    const comment_content = document.querySelector('input[name="comment-body"]').console.log(comment_content);

    const post_id = document.querySelector('input[name="post-id"]').value;
    if (comment_content) {
        const response = await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({
                post_id,
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

document.querySelector('#new-comment-form')
.addEventListener('submit', commentFormHandler);

