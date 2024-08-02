//Comment.js
import CommentForm from "./CommentForm";
import React from 'react';
import usericon from "../Comment/user-icon.png";

const Comment = ({
  comment,
  replies,
  setActiveComment,
  activeComment,
  updateComment,
  deleteComment,
  addComment,
  parentId = null,
  currentUserId,
}) => {
  const isEditing =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "editing"; 
  const isReplying =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "replying"; 
  // const fiveMinutes = 300000;
  // const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes;
  // const canDelete =
  // currentUserId === comment.userId && replies.length === 0 && !timePassed;
  // const canReply = Boolean(currentUserId);
  // const canEdit = currentUserId === comment.userId && !timePassed;
  const replyId = parentId || comment.id;
  

  const createdAt = new Date(comment.createdAt).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });

  const handleActionClick = (actionType) => {
    setActiveComment({ id: comment.id, type: actionType });
  };

  return (
    <div key={comment.id} className="comment">
      <div className="comment-image-container">
        <img src={usericon} alt="User Icon" />
      </div>
      <div className="comment-right-part">
        <div className="comment-content">
          <div className="comment-author">{comment.username}</div>
          <div>{createdAt}</div>
        </div>
       <div className="comment-text">{comment.body}</div>
        {isEditing && (
          <CommentForm
            submitLabel="Update"
            hasCancelButton
            initialText={comment.body}
            handleSubmit={(text) => updateComment(text, comment.id)}
            handleCancel={() => setActiveComment(null)}
          />
        )}
      <div className="comment-actions">
  
    <div
      className="comment-action"
      onClick={() => {
        console.log('Reply clicked');
        handleActionClick("replying");
      }}
    >
      Reply
    </div>
  
  
    <div
      className="comment-action"
      onClick={() => {
        console.log('Edit clicked');
        handleActionClick("editing");
      }}
    >
      Edit
    </div>
  

    <div
      className="comment-action"
      onClick={() => {
        console.log('Delete clicked');
        deleteComment(comment.id);
      }}
    >
      Delete
    </div>
  
</div>

        {isReplying && (
          <CommentForm
            submitLabel="Reply"
            handleSubmit={(text) => addComment(text, replyId)}
          />
        )}
        {replies.length > 0 && (
          <div className="replies">
            {replies.map((reply) => (
              <Comment
                comment={reply}
                key={reply.id}
                replies={[]}
                setActiveComment={setActiveComment}
                activeComment={activeComment}
                updateComment={updateComment}
                deleteComment={deleteComment}
                addComment={addComment}
                parentId={comment.id}
               
                currentUserId={currentUserId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
