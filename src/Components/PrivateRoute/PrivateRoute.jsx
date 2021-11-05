import { Redirect , Route } from "react-router";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <Route
            {...rest}
            render={props => (
                user ? <Component {...props} /> : <Redirect to="/login" />
            )}
        />
    )
}

export default PrivateRoute;