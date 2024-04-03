import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, the page you asked for doesn't exist.</p>
      <p>
        <i>404, Not found</i>
      </p>
      <Link to="/home">
        You can go back to the home page by clicking here, though!
      </Link>
    </div>
  );
};

export default ErrorPage;
