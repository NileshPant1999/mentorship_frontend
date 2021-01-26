import React from "react";

const Post = (props) => {
  const { posts } = props;
  if (!posts || posts.length === 0) return <p>Can not find any posts, sorry</p>;
  return (
    <div className="post_ind">
      {posts.map((post) => {
        return (
          <div className="post__comp">
            <a href={post.link} target="_blank">
              <div className="post__component">
                <div style={{ marginLeft: "20px", marginTop: "20px" }}>
                  <h1 style={{ fontWeight: "600", marginTop: "3px" }}>
                    {post.title}
                  </h1>
                  <p style={{ fontSize: "14px", marginTop: "8px" }}>
                    {post.author}
                  </p>
                  <p style={{ fontSize: "18px", marginTop: "8px" }}>
                    {post.text}
                  </p>
                </div>
                <div>
                  <img src={post.image_link} className="post__image" />
                </div>
              </div>
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default Post;
