import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Details = () => {
  const { blogId } = useParams();
  const [blogDetails, setBlogDetails] = useState({});
  const [isUpdate, setIsUpdated] = useState(false);
  const [comments, setComments] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    body: "",
  });

  useEffect(() => {
    getDetails(blogId);
  }, [blogId, isUpdate]);

  const getDetails = async (id) => {
    const response = await fetch(
      `http://localhost:5000/api/v1/blogs/get-blog/${id}`
    );

    const data = await response.json();
    const localStorageBlogId = localStorage.getItem("blogId");

    if (localStorageBlogId !== id || isUpdate) {
      const comments = await getComments(id);
      localStorage.setItem("blogId", data.data.id);

      localStorage.setItem("comments", JSON.stringify(comments));
      setComments(comments);
    } else {
      const comments = localStorage.getItem("comments");
      const result = JSON.parse(comments);
      setComments(result);
    }
    setBlogDetails(data?.data);
  };

  const getComments = async (id) => {
    const response = await fetch(
      `http://localhost:5000/api/v1/comments/get-comments/${id}`
    );
    const data = await response.json();
    return data?.data;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    setIsUpdated(false);
    e.preventDefault();
    formData.blogId = blogId;

    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/comments/create-comment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setIsUpdated(true);
        setFormData({
          name: "",
          email: "",
          body: "",
        });
      } else {
        console.error("Failed to send comment");
      }
    } catch (error) {
      console.error("Something went wrong", error);
    }
  };

  return (
    <div>
      <div className="container mt-4">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-sm-6">
                <h3>Title: {blogDetails?.title}</h3>
                <p>ID: {blogDetails?.id}</p>
                <p>User ID: {blogDetails?.userId}</p>
              </div>
              <div className="col-sm-6">
                <p>Body: {blogDetails?.body}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card mt-4">
          <div className="card-body">
            <h5 className="card-title">Comments</h5>
            <ul className="list-group p-4">
              {comments?.length ? (
                comments?.map((comment, index) => (
                  <li key={index}>
                    <div>
                      <p>Name: {comment.name}</p>
                      <p>Email: {comment.email}</p>
                      <p>Body: {comment.body}</p>
                    </div>
                  </li>
                ))
              ) : (
                <div className="text-warning">No comments found</div>
              )}
            </ul>
          </div>
        </div>

        <div className="container mt-4">
          <h2>Submit Comment</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="body">Body</label>
              <textarea
                className="form-control"
                id="body"
                name="body"
                rows="3"
                value={formData.body}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="text-center my-3">
              <button type="submit" className="btn btn-primary">
                Send Comment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Details;
