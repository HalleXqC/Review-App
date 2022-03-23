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
                </ul>
            </div>
        </div>
    )
}

export default Nav