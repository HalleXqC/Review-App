import { Switch , Route , useLocation, Redirect } from "react-router"
import Login from "./pages/Authorization/Login/Login"
import Register from "./pages/Authorization/Register/Register"
import Signboards from "./Components/Signboards/Signboards"
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute"
import cls from './App.module.scss'
import Stars from "./Components/Stars/Stars"
import { routes } from "./Utils/routes"

const App = () => {

    const user = JSON.parse(localStorage.getItem('user'));

    const location = useLocation();

    const overFlow = {overflow: "hidden"};

    return (
        <div 
            className={cls.root} 
            style={ location.pathname === "/login" ? overFlow : location.pathname === "/register" ? overFlow : null }
        >
            <Switch>

                {routes.map((item, index) => (
                    <PrivateRoute exact path={item.path} component={item.comp} key={index}/>
                ))}
                {
                    !user && (
                        <>
                            <Route path="/login" component={Login} />
                            <Route path="/register" component={Register} />
                        </>
                    )
                }
                <Redirect to="/" /> 
            </Switch> 

            { location.pathname === "/login" ? (
                <>
                    <Signboards/>
                    <Stars/>
                </>
            ) : location.pathname === "/register" ? (
                <>
                    <Signboards/>
                    <Stars/>
                </>
            ) : null }

        </div>
    )
}

export default App