import { useContext } from "react";
import { AuthContext } from "./Auth";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: RouteComponent, ...rest }) => {
  const { currentUser } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        !!currentUser ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={"/signin"} />
        )
      }
    />
  );
};

export default ProtectedRoute;
