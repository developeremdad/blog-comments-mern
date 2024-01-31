import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Details from "./pages/Details";
import AddBlog from "./pages/AddBlog";
import UpdateBlog from "./pages/UpdateBlog";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/details/:blogId" element={<Details />} />
          <Route path="/add-blog" element={<AddBlog />} />
          <Route path="/update/:blogId" element={<UpdateBlog />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
