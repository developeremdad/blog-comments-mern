import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UpdateBlog = () => {
  const { blogId } = useParams();
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    userId: "",
    title: "",
    body: "",
  });

  useEffect(() => {
    if (blogId) {
      fetch(`http://localhost:5000/api/v1/blogs/get-blog/${blogId}`)
        .then((response) => response.json())
        .then((data) => setFormData(data.data));
    }
  }, [blogId]);

  const handleChange = (e) => {
    setSuccess("");
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      userId: formData.userId,
      title: formData.title,
      body: formData.body,
    };

    fetch(`http://localhost:5000/api/v1/blogs/update-blog/${blogId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        setSuccess(data?.message);
      })
      .catch((error) => console.error("Error updating blog:", error));
  };
  return (
    <div>
      <div className="container mt-4">
        <h2 className="text-center">Update Blog</h2>
        {success && (
          <div className="text-center bg-light p-2 mb-2">{success}</div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="userId">User ID</label>
            <input
              type="number"
              className="form-control"
              id="userId"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={formData.title}
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

          <div className="text-center mt-3">
            <button type="submit" className="btn btn-primary">
              Update Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBlog;
