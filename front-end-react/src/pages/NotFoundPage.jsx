import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, the page you asked for does not exist.</p>
      <p>
        <i>404, Not found</i>
      </p>
      <Link to="/home">Back</Link>
    </div>
  );
};

export default NotFoundPage;
