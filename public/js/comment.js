async function commentFormHandler(event) {
    event.preventDefault();

    const comment_content = document.querySelector('input[name="comment-body"]').value.trim();

    const postId = window.location.toString().split('/')[windwo.location.toString().split('/').length - 1 
];
    // querySelector('input[name="post-id"]').value;
    if (event.target[0].value.trim()) {
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
document.querySelector('#new-comment-form')
.addEventListener('submit', commentFormHandler);

// o the reason your comment.js isn't working is because your query selector isn't properly selecting the comment input box





// 7:57
// when I changed comment_content to event.target[0].value.trim(); it got the value correctly
// 7:57
// and then it throws an error related to postId
// 7:59
// Okay the reason it threw an error for post_id is because of the way you're getting the post id
// 7:59
// This const postId = window.location.toString().split('/')[window.location.toString().split('/').length - 1
// 8:00
// it tried inserting postId as "1?comment-body=text"
// 8:00
// instead of just 1
// 8:05
// Once that's resolved, it shouldn't throw an error anymore
