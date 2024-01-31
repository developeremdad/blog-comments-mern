import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [isUpdate, setIsUpdated] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);

    fetch("http://localhost:5000/api/v1/blogs/get-blogs")
      .then((res) => res.json())
      .then((data) => setBlogs(data.data));
  }, [isUpdate]);

  const handleDelete = async (id) => {
    setIsUpdated(false);
    const response = await fetch(
      `http://localhost:5000/api/v1/blogs/delete-blog/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response) {
      setIsUpdated(true);
    }
  };

  const handleToggleFavorite = (blogId) => {
    // Check if the blog is already in favorites
    const isFavorite = favorites.includes(blogId);

    // Update favorites list
    const updatedFavorites = isFavorite
      ? favorites.filter((favId) => favId !== blogId)
      : [...favorites, blogId];

    setFavorites(updatedFavorites);

    // Save favorites to local storage
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const isFavorite = (blogId) => favorites.includes(blogId);

  const filteredData = blogs.filter((blog) => favorites.includes(blog.id));


  return (
    <div>
      <div className="container mt-2">
        <h4 className="text-center">All Blogs</h4>
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">User Id</th>
                <th scope="col">Blog Id</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {blogs?.map((blog, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{blog?.title}</td>
                  <td>{blog?.userId}</td>
                  <td>{blog?.id}</td>
                  <td>
                    <Link
                      to={`/details/${blog?.id}`}
                      className="text-decoration-none"
                    >
                      View
                    </Link>
                    <button
                      className="btn btn-sm ms-2 "
                      onClick={() => handleDelete(blog?._id)}
                    >
                      Delete
                    </button>
                    <Link
                      to={`/update/${blog?.id}`}
                      className="text-decoration-none ms-2"
                    >
                      Edit
                    </Link>
                    {!isFavorite(blog?.id) && (
                      <button
                        className={`btn btn-sm ms-2 ${
                          isFavorite(blog?.id)
                            ? "btn-danger"
                            : "btn-outline-danger"
                        }`}
                        onClick={() => handleToggleFavorite(blog?.id)}
                      >
                        Favorite
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* For favorites part */}
        <div className="table-responsive mt-5">
          <h4 className="text-center">Show favorites blogs</h4>
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">User Id</th>
                <th scope="col">Blog Id</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData?.map((blog, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{blog?.title}</td>
                  <td>{blog?.userId}</td>
                  <td>{blog?.id}</td>
                  <td>
                    <Link
                      to={`/details/${blog?.id}`}
                      className="text-decoration-none"
                    >
                      View
                    </Link>
                    <button
                      className="btn btn-sm ms-2 "
                      onClick={() => handleDelete(blog?._id)}
                    >
                      Delete
                    </button>
                    <Link
                      to={`/update/${blog?.id}`}
                      className="text-decoration-none ms-2"
                    >
                      Edit
                    </Link>
                    {isFavorite(blog?.id) && (
                      <button
                        className={`btn btn-sm ms-2 ${
                          isFavorite(blog?.id)
                            ? "btn-danger"
                            : "btn-outline-danger"
                        }`}
                        onClick={() => handleToggleFavorite(blog?.id)}
                      >
                        Un Favorite
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
