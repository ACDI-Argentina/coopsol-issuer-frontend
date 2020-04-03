import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../../services/providers/user-context.jsx';
import Header from '../molecules/header/header';
import { LOGIN_URL } from '../../utils/constants';

const PrivateRoute = ({
  component: Component,
  requireAuthentication,
  replaceHeader: ReplaceHeader,
  ...rest
}) => {
  const { user } = useContext(UserContext);

  if (!requireAuthentication) {
    return <Route {...rest} render={properties => <Component {...properties} />} />;
  }
  return user.accessToken ? (
    <div className="Container">
      {ReplaceHeader ? <ReplaceHeader /> : <Header />}
      <div className="Content">
        <Route {...rest} render={properties => <Component {...properties} />} />
      </div>
    </div>
  ) : (
    <Redirect to={LOGIN_URL} />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  exact: PropTypes.bool,
  path: PropTypes.string,
  requireAuthentication: PropTypes.bool.isRequired
};

PrivateRoute.defaultProps = {
  exact: false
};

export default PrivateRoute;
