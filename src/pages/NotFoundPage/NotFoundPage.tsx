import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <div>
      NotFoundPage
      <p>Sorry, the page you are looking for does not exist.</p>
      <p>Please check the URL or return to the home page.</p>
      <Link to='/'>Go to Home Page</Link>
    </div>
  );
};
