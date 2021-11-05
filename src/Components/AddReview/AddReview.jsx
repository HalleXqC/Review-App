import cls from './AddReview.module.scss'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react';
import { AiFillStar as Star } from 'react-icons/ai'
import { IoMdArrowDropdown as DDIcon } from 'react-icons/io'
import { getUsers, saveReviewIntoUserData, sendReview, getMovies, sendReviewIntoMovie} from '../../API';

const AddReview = ({setUpdateUseEffect, closeModalBtn}) => {

    const {register , handleSubmit} = useForm();
    const [errors , setErrors] = useState(null);
    const [movieId , setMovieId] = useState(null);
    const [movieTitle , setMovieTitle] = useState(null);
    const [movies , setMovies] = useState(null);
    const [movieErr , setMovieErr] = useState(null);
    const [rating , setRating] = useState(1);
    const [hover , setHover] = useState(0);
    const [loading , setLoading] = useState(false);
    const [userNick , setUserNick] = useState('');
    const [select , setSelect] = useState(false);
    const [textAreaLength, setTextAreaLength] = useState(0);
    const [useEffectChange, setUseEffectChange] = useState('')

    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        getUsers(user.localId)
        .then(r => r.json())
        .then(res => {
            setUserNick(res.nick);
        });

        getMovies()
        .then(r => r.json())
        .then(res => {
            const data = Object.entries(res).map(item => {
                const id = item[0]
                return {
                    ...item[1],
                    id
                }
            })
            const sortedData = data.sort((a, b) => a.title > b.title ? 1 : -1)
            setMovies(sortedData)
        });

    }, [user.localId, useEffectChange])

    const onSubmit = (data , e) => {
        setErrors('')
        if(movieId !== null){
            setLoading(true)
            const date = new Date()
            const currentDate = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`
            sendReview({
                review: data.review,
                movieId,
                rating,
                date: currentDate,
                user: user.localId,
                nick: userNick
            }, '')
            .then(r => r.json())
            .then(res => {
                saveReviewIntoUserData({
                    review: data.review,
                    movieId,
                    rating,
                    date: currentDate,
                    user: user.localId
                }, user.localId);
                sendReviewIntoMovie({
                    review: data.review,
                    movieId,
                    rating,
                    date: currentDate,
                    user: user.localId
                }, movieId)
                setUpdateUseEffect(res)
            })
            .then(() => {
                e.target.reset();
                setRating(1)
                setLoading(false)
                setMovieErr(null)
                setMovieTitle(null)
                setMovieId(null)
                setTextAreaLength(0)
                setUseEffectChange(data, e)
            })
            .catch(err => {
                setMovieErr(err)
            })
        }else{
            setMovieErr('You must choose a movie')
            const bleep = new Audio();
            bleep.src = "sound/error.mp3";
            bleep.play();
        }
    }

    const onError = e => {
        const bleep = new Audio();
        bleep.src = "sound/error.mp3";
        bleep.play();
        const data = Object.entries(e).map(item => {
            return {
                ...item[1]
            }
        })
        setErrors(data)
    };

    return (
        <div className={cls.root}>
            {movies && (
                <form onSubmit={handleSubmit(onSubmit, onError)}>
                    <button onClick={() => closeModalBtn()} className={cls.closeButton}>&times;</button>
                    <label className={cls.inputLabel}>
                        <p>Choose a movie:</p>
                        <button 
                        type="button" 
                        className={cls.select} 
                        onClick={() => setSelect(!select)}> 
                            {movieTitle ? movieTitle : "Select a movie"} <DDIcon className={cls.selectIcon}/> 
                        </button>
                        {select && (
                            <div className={cls.options}>
                                {movies.map(item => (
                                    <button 
                                        type="button"
                                        key={item.id}
                                        className={`${cls.option} ${movieTitle === item.title ? cls.chosen : null}`}
                                        onClick={() => {
                                            setMovieTitle(item.title)
                                            setMovieId(item.id)
                                            setSelect(false)
                                        }}
                                    ><span className={cls.innerSelect}><img src={item.banner} alt="movie" />{item.title}</span></button>
                                ))}
                            </div>
                        )}
                    </label>
                    <label className={cls.rangeLabel}>
                        <p>Set rating:</p>
                        <div className={cls.range}>
                            {[...Array(10)].map((star , i) => {
                                const ratingValue = (i + 1)
                                return (
                                    <label className={cls.range} key={i}>
                                        <input
                                            type="radio"
                                            name="rating"
                                            value={ratingValue}
                                            onClick={() => setRating(ratingValue)}
                                        />
                                        <Star
                                            className={cls.star}
                                            color={ratingValue <= rating ? "#ffc04a" : ratingValue <= hover ? "#ffd17dc4" : "#ccc"}
                                            onMouseEnter={() => setHover(ratingValue)}
                                            onMouseLeave={() => setHover(0)}
                                        />
                                    </label>
                                )
                            })}
                        </div>
                        <h6>{rating}/10 </h6>
                    </label>
                    <label className={cls.textLabel}>
                        <p>Write your review: &nbsp; <span>({textAreaLength})</span></p>
                        <textarea 
                            type="text" 
                            placeholder="Review" 
                            className={cls.textarea}
                            onInput={e => {setTextAreaLength(e.target.value.length)}}
                            {
                                ...register("review",
                                {required: {
                                    value: true,
                                    message: "Review is required"
                                }, 
                                minLength: {
                                    value: 20,
                                    message: "Review length must be higher than 20 symbols"
                                }})
                            } 
                        />
                    </label>
                    <span>{errors?.length === 0 ? null : errors ? errors.map((item , index) => (
                        <p key={index}>{item.message}</p>
                    )) : null} <p>{movieErr}</p></span>
                    <div className={cls.buttons}>
                        <input className={cls.submit} disabled={loading} type="submit" value="Submit"/>
                        <input className={cls.reset} type="reset" value="Reset" onClick={() => {
                            setRating(1)
                            setMovieTitle(null)
                            setMovieId(null)
                            setErrors(null)
                            setMovieErr(null)
                            setTextAreaLength(0)
                        }} />
                    </div>
                </form>
            )}
        </div>
    )
}

export default AddReview