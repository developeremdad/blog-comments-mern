import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="text-center">
      <h4>Route not found</h4>
      <Link to="/">Goto Home</Link>
    </div>
  );
};

export default NotFound;
