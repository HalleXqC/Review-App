import { useEffect, useState } from 'react'
import { getAllReviews, getMovies, getUsers } from '../../API'
import Nav from '../../Components/Nav/Nav'
import cls from './Reviews.module.scss'
import Loading from '../../Components/Loading/Loading'
import Card from '../../Components/Card/Card'
import { Link } from 'react-router-dom'
import objectEntries from '../../Utils/objectEntries'

const Reviews = () => {

    const [reviews , setReviews] = useState(null)
    const [movies , setMovies] = useState(null)
    const [users, setUsers] = useState(null)
    const [updateUseEffect , setUpdateUseEffect] = useState('')

    useEffect(() => {
        getAllReviews('')
        .then(r => r.json())
        .then(res => {
            if(res !== null){
                const data = objectEntries(res)
                setReviews(data.reverse())
                localStorage.removeItem('userNick')
            }else{
                setReviews([])
            }
        })
        .then(() => {
            getUsers('')
            .then(r => r.json())
            .then(res => {
                setUsers(res)
            })
        })
        .catch(err => {
            console.error(err);
        });

        getMovies()
        .then(r => r.json())
        .then(res => {
            setMovies(res)
        })
    }, [updateUseEffect])

    return (
        <div className={cls.root}>
            <div className={cls.nav}>
                <Nav/>
            </div>
            <div className={cls.main}>
                {reviews && movies && users ? reviews.map((item, index) => {
                        return (
                            <Card
                                review={item}
                                user={users[item.user]} 
                                movie={movies[item.movieId]}
                                key={index}
                                setUpdateUseEffect={setUpdateUseEffect}
                            />
                        )
                    }) : (
                        <div className={cls.loading}><Loading/></div>
                    )
                }
            </div>
            <Link className={cls.addReviewBtn} to="/addreview">Add Review</Link>
        </div>
    )
}

export default Reviews