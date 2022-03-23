import { NavLink } from 'react-router-dom'
import cls from './Nav.module.scss'

const Nav = ({color}) => {

    const links = [
        {
            route: '/home',
            value: 'Home'
        },
        {
            route: '/reviews',
            value: 'Reviews'
        },
        {
            route: '/movies',
            value: 'Movies'
        },
        {
            route: '/profile',
            value: 'Profile'
        }
    ]

    return (
        <div className={cls.root}>
            <div className={cls.leftNav}>
                <img src="/magazine.png" alt="logo" />
                <h4 style={color ? {color: `${color}`} : null}>Review App</h4>
            </div>
            <div className={cls.rightNav}>
                <ul>
                    {
                        links.map(item => (
                            <li>
                                <NavLink exact to={item.route} className={cls.link} activeClassName={cls.active} style={color ? {color: `${color}`} : null}>{item.value}</NavLink>
                            </li>
                        ))
                    }
                    <li>
                        <NavLink exact to="/home" className={cls.link} activeClassName={cls.active} style={color ? {color: `${color}`} : null}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink exact to="/reviews" className={cls.link} activeClassName={cls.active} style={color ? {color: `${color}`} : null}>Reviews</NavLink>
                    </li>
                    <li>
                        <NavLink exact to="/movies" className={cls.link} activeClassName={cls.active} style={color ? {color: `${color}`} : null}>Movies</NavLink>
                    </li>
                    <li>
                        <NavLink exact to="/profile" className={cls.link} activeClassName={cls.active} style={color ? {color: `${color}`} : null}>Profile</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Nav