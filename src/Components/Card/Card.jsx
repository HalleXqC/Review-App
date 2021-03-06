import React, { useEffect, useState } from 'react'
import cls from './Card.module.scss'
import { AiFillStar as Star } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router'
import { deleteReview, getAllReviews, getMovies, getUsers } from '../../API'
import { AiFillDelete as Delete } from 'react-icons/ai'
import objectEntries from '../../Utils/objectEntries'

const Card = ({review, user, movie, width, setUpdateUseEffect}) => {

    const [targetReview, setTargetReview] = useState(null)
    const [useEffectChange, setUseEffectChange] = useState('')
    const [loading, setLoading] = useState(false)
    const location = useLocation()
    const localUser = JSON.parse(localStorage.getItem('user'))

    // for delete
    const [allMovies, setAllMovies] = useState(null)
    const [allUsers, setAllUsers] = useState(null)

    useEffect(() => {
        getAllReviews('')
        .then(r => r.json())
        .then(res => {
            return objectEntries(res)
        })
        .then(data => {
            const filteredReview = data.filter(item => item.review === review.review)
            setTargetReview(filteredReview)
        })
        .then(() => {
            getMovies()
            .then(r => r.json())
            .then(res => {
                setAllMovies(res)
            });
        })
        .then(() => {
            getUsers('')
            .then(r => r.json())
            .then(res => {
                setAllUsers(res)
            })
        })
        .catch(err => {
            console.error(err);
        })
    }, [review.review, useEffectChange])

    function handleDelete(item){
        setLoading(true)
        const askDelete = window.confirm('Do you really want to delete this review?');
        if(askDelete){
            if(item){
                deleteReview(`reviews`, item.id)
    
                const tempFilteredUserReview = objectEntries(allUsers[item.user].reviews)

                const filteredUserReview = tempFilteredUserReview.filter(rev => item.review === rev.review);
                deleteReview(`users/${item.user}/reviews`, `${filteredUserReview[0].id}`)
    
                const tempFilteredMovieReview = objectEntries(allMovies[item.movieId].reviews)

                const filteredMovieReview = tempFilteredMovieReview.filter(rev => item.review === rev.review)

                deleteReview(`movies/${item.movieId}/reviews`, `${filteredMovieReview[0].id}`)
                .then(d => d.json())
                .then(del => {
                    setUseEffectChange(del)
                    setUpdateUseEffect(del)
                    setLoading(false)
                });
            }
        }else{
            setLoading(false)
        }
    }

    return (
        <div className={width === 'bigger' ? cls.biggerCard : cls.card} >
            {
                targetReview && allMovies && allUsers ? targetReview.map((item, key) => {
                    return (
                        <React.Fragment key={key}>
                            <div className={cls.cardHeader}>
                                <div 
                                    title={movie.title} 
                                    style={{background: `url(${movie.wideBanner}) center / cover`}} 
                                    className={cls.cardBanner}
                                ></div>
                                {user.image ? (
                                    <div 
                                        className={cls.cardUser} 
                                        style={{ 
                                            backgroundImage: `url("${user.image}")`,
                                            backgroundColor: "white",
                                            backgroundPosition: "center",
                                            backgroundSize: "cover",
                                            backgroundRepeat: "no-repeat"
                                        }}
                                    ></div>
                                ) : (
                                    <div 
                                        className={cls.cardUser} 
                                        style={{
                                            backgroundImage: `url("/img/user.png")`,
                                            backgroundColor: "white",
                                            backgroundPosition: "center",
                                            backgroundSize: "cover",
                                            backgroundRepeat: "no-repeat"
                                        }}
                                    ></div>
                                )}
                                <div className={cls.restHeader}>
                                    <Link to={`/profile/users/${review.user}`} className={cls.link}>{user.nick}</Link>
                                    <div className={cls.rating}>
                                        {[...Array(10)].map((star, i) => {
                                            let ratingValue = (i + 1)
                                            return (
                                                <Star
                                                    key={i}
                                                    className={cls.star}
                                                    color={ratingValue <= review.rating ? "#ffc04a" : "#ccc"}
                                                />
                                            )
                                        })}
                                    </div>
                                    <span className={cls.cardDate}>Published {review.date}</span>
                                </div>
                            </div>
                            <div className={cls.cardMovie}>
                                <Link to={`/movies/${review.movieId}`} className={cls.h3}>
                                    {movie.title}
                                    <span>({movie.rYear})</span>
                                </Link>
                            </div>
                            <hr/>
                            <div className={cls.cardMain}>
                                {  
                                    review.review.split(' ').length > 25 ? (
                                        <p className={cls.shortedReview}>
                                            {review.review.split(' ').slice(0, 20).join(' ')}
                                            &nbsp;
                                            <span className={cls.shortedGradient}>{review.review.split(' ').slice(20, 25).join(' ')}.....</span>
                                        </p>
                                    ) : <p className={cls.regularReview}>{review.review}</p>
                                }
                            </div>
                            <Link to={`/reviews/${item.id}`} className={cls.cardButton}>Learn more...</Link>
                            {location.pathname === "/reviews" && item.user === localUser.localId ? (
                                <button 
                                    type="button" 
                                    className={cls.deleteBtn} 
                                    onClick={() => handleDelete(item)}
                                    disabled={loading}
                                ><Delete className={cls.deleteIcon}/></button>
                            ) : ''}
                        </React.Fragment>
                    )
                }) : null
            }
        </div>
    )
}

export default Card