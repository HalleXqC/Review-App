import { Link } from 'react-router-dom'
import Nav from '../Nav/Nav'
import cls from './Home.module.scss'

const Home = () => {

    return (
        <div className={cls.root}>
            <div className={cls.main}>
                <Nav/>
                <div className={cls.content}>
                    <div className={cls.contentLeft}>
                        <h1>Reviews</h1>
                        <h2>Web Application</h2>
                        <p>Hi there! Now you're on application, where you can share with your thoughts and opinions about newest movies and shows. For the beginning, you can fill out your personal information in your profile.</p>
                        <Link to="/reviews" className={cls.link}>Get Started</Link>
                    </div>
                    <div className={cls.contentRight} style={{background: "url('/img/main_bg2.png') center / cover no-repeat"}}></div>
                </div>
            </div>
        </div>
    )
}

export default Home