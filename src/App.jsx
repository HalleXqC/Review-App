import { Switch , Route , useLocation, Redirect } from "react-router"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import Signboards from "./Components/Signboards/Signboards"
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute"
import cls from './App.module.scss'
import Stars from "./Components/Stars/Stars"
import Home from "./Components/Home/Home"
import Reviews from './Components/Reviews/Reviews'
import Movies from './Components/Movies/Movies'
import Profile from './Components/Profile/Profile'
import SingleReview from "./Components/SingleReview/SingleReview"
import SingleMovie from "./Components/SingleMovie/SingleMovie"
import EditProfilePage from "./Components/EditProfilePage/EditProfilePage"
import OtherProfile from "./Components/OtherProfile/OtherProfile"
import AddReview from "./Components/AddReview/AddReview"

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
                <PrivateRoute exact path="/" component={Home} />
                <PrivateRoute path="/home" component={Home} />
                <PrivateRoute exact path="/reviews" component={Reviews} />
                <PrivateRoute exact path="/reviews/:id" component={SingleReview}/>
                <PrivateRoute exact path="/movies" component={Movies} />
                <PrivateRoute exact path="/movies/:id" component={SingleMovie} />
                <PrivateRoute exact path="/profile" component={Profile} />
                <PrivateRoute exact path="/profile/edit" component={EditProfilePage} />
                <PrivateRoute exact path="/profile/users/:id" component={OtherProfile} />
                <PrivateRoute exact path="/addreview" component={AddReview} />
                {
                    !user && (
                        <>
                            <Route path="/login" component={Login} />
                            <Route path="/register" component={Register} />
                        </>
                    )
                }
                <Redirect to="/home" /> 
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