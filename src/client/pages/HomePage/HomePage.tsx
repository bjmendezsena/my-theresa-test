import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <div>
      Home
      <p>Welcome to the home page!</p>
      <p>Explore our latest collections and offers.</p>
      <Link to='/category'>Go to Category Page</Link>
    </div>
  );
};
