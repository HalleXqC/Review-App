import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { getSingleMovie, getUsers } from '../../API'
import cls from './SingleMovie.module.scss'
import ReactPlayer from 'react-player/youtube'
import { BiCommentEdit as ReviewIcon } from 'react-icons/bi'
import { IoMdReturnLeft as Return } from 'react-icons/io'
import Card from '../Card/Card'
import Loading from '../Loading/Loading'
import objectEntries from '../../Utils/objectEntries'

const SingleMovie = () => {

    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [reviews, setReviews] = useState(null);
    const [users, setUsers] = useState(null);
    const history = useHistory();

    useEffect(() => {
        getSingleMovie(id)
        .then(r => r.json())
        .then(re => {
            setMovie(re)
            if(re.reviews){
                const data = objectEntries(re.reviews)
                setReviews(data)
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
        })
    }, [id])

    return (
        <div className={cls.root}>
            {
                movie && reviews && users ? (
                    <>
                    <div className={cls.main}>
                        <div className={cls.mainBanners}>
                            <img className={cls.banner} src={movie.banner} alt="banner" />
                            <a className={cls.trailer} href={movie.trailer} rel="noreferrer" target="_blank">Watch the trailer</a>
                        </div>
                        <div className={cls.mainText}>
                            <h1 className={cls.title}>{movie.title} ({movie.rYear})</h1>
                            <p className={cls.genres}>{movie.genres}</p>
                            <p className={cls.description}>{movie.description}</p>
                            <div className={cls.mainProperties}>
                                {[...Array(7)].map((item, i) => {
                                    const baseNames = ['rYear', 'director', 'screenwriter', 'actors', 'composer', 'budget', 'gross']
                                    const layoutNames = ['Release year', 'Director', 'Screenwriter', 'Actors', 'Composer', 'Budget', 'Worldwide Gross']
                                    return (
                                        <p className={cls.property} key={baseNames[i]}>
                                            {layoutNames[i]}:
                                            &nbsp;
                                            <span>
                                                {movie[baseNames[i]]}
                                            </span>
                                        </p>
                                    )
                                })}
                            </div>
                        </div>
                        <div className={cls.mainRating}>
                            <h1 className={cls.mainRatingReviews}>Reviews</h1>
                            <div className={cls.mainRatingMain}>
                                <div className={cls.mainInnerRating}>
                                    {reviews?.length > 0 ? (
                                        <>
                                            <p>Total: {reviews.length}</p>
                                            <ReviewIcon className={cls.reviewIcon}/>
                                        </>
                                    ) : (
                                        <p className={cls.noReviews}>No reviews yet :(</p>
                                    )}
                                </div>
                                {reviews.length > 0 ? (
                                    <div className={cls.mainRatingStars}>
                                        Rating: &nbsp;
                                        {
                                            Math.round((reviews.reduce((total, item) => +total + +item.rating, 0)) / reviews.length)
                                        }
                                        <img className={cls.star} src="/img/star.png" alt="star"/>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                        <div className={cls.mainTrailer}>
                            <ReactPlayer 
                                className={cls.reactPlayer} 
                                url={movie.beautyOf}
                                width="100%" 
                                height="100%"
                                playing
                                loop
                                volume={0}
                                muted
                                controls={false}
                            />
                            <span className={cls.layoutSpan1}></span>
                            <span className={cls.layoutSpan2}></span>
                            <span className={cls.layoutSpan3}></span>
                            <span className={cls.layoutSpan4}></span>
                        </div>
                    </div>
                    <div className={cls.betweenTitle}>
                        <h1>Reviews</h1>
                    </div>
                    <div className={cls.reviews}>
                        {
                            reviews.map((item, index) => {
                                return (
                                    <Card
                                        review={item}
                                        user={users[item.user]}
                                        movie={movie}
                                        key={index}
                                    />
                                )
                            })
                        }
                    </div>
                    </>
                ) : (
                    <div className={cls.loading}><Loading color="white"/></div>
                )
            }
            <button onClick={() => history.goBack()} className={cls.closeBtn}>Return &nbsp; <Return className={cls.returnIcon}/></button>
        </div>
    )
}

export default SingleMovie