import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../context/user/userContext';

type PrivateRouteProps = {
  path: string;
  component: React.FC;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  path,
  component: Component
}) => {
  const { user } = useContext(UserContext);
  
  return (
    <Route
      path={path}
      render={(props) =>
        !!user ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/' }} />
        )
      }
    />
  );
};

export default PrivateRoute;
