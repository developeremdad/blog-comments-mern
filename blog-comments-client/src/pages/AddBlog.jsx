import { useState } from "react";

const AddBlog = () => {
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });

  const handleChange = (e) => {
    setSuccess("");
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      "http://localhost:5000/api/v1/blogs/create-blog",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    if (response?.statusText == "OK") {
      setSuccess("Blog created successfully");
    }
  };
  return (
    <div>
      <div className="container mt-4 ">
        {success && (
          <div className="text-center bg-light p-2 mb-2">{success}</div>
        )}
        <h4 className="text-center">Add New Blog</h4>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
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
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="text-center mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
