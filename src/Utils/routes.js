import Home from "../pages/Home/Home"
import Reviews from '../pages/Reviews/Reviews'
import Movies from '../pages/Movies/Movies'
import Profile from '../pages/Profile/Profile'
import SingleReview from "../Components/SingleReview/SingleReview"
import SingleMovie from "../Components/SingleMovie/SingleMovie"
import EditProfilePage from "../pages/EditProfilePage/EditProfilePage"
import OtherProfile from "../pages/OtherProfile/OtherProfile"
import AddReview from "../pages/AddReview/AddReview"


export const routes = [
    {
        comp: Home,
        path: '/'
    },
    {
        comp: Reviews,
        path: '/reviews'
    },
    {
        comp: SingleReview,
        path: '/reviews/:id'
    },
    {
        comp: Movies,
        path: '/movies'
    },
    {
        comp: SingleMovie,
        path: '/movies/:id'
    },
    {
        comp: Profile,
        path: '/profile'
    },
    {
        comp: EditProfilePage,
        path: '/profile/edit'
    },
    {
        comp: OtherProfile,
        path: '/profile/users/:id'
    },
    {
        comp: AddReview,
        path: '/addreview'
    }
]