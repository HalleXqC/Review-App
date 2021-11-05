import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { deleteComment, getAllReviews, getComments, getSingleMovie, getUser, getUsers, sendComment } from '../../API'
import { IoMdQuote as Quotes, IoMdReturnLeft as Return } from 'react-icons/io'
import { AiFillStar as Star, AiFillDelete as Delete, AiOutlineComment as CommentsIcon } from 'react-icons/ai'
import { FiSend as Send} from 'react-icons/fi'
import cls from './SingleReview.module.scss'
import Loading from '../Loading/Loading'

const SingleReview = () => {

    const { id } = useParams()
    const [review, setReview] = useState(null);
    const [movie, setMovie] = useState(null);
    const [reviewUser, setUser] = useState(null);
    const [allUsers, setAllUsers] = useState(null)
    const [comment, setComment] = useState('');
    const [allComments, setAllComments] = useState(null)
    const [disable, setDisable] = useState(true);
    const [useEffectChange, setUseEffectChange] = useState('')
    const [localUser, setLocalUser] = useState(null)
    const history = useHistory()

    useEffect(() => {
        window.scrollTo(0, 0)
        const localUser = JSON.parse(localStorage.getItem('user'));
        setLocalUser(localUser.localId)
        getAllReviews(id)
        .then(r => r.json())
        .then(res => {
            setReview(res)
            getSingleMovie(res.movieId)
            .then(re => re.json())
            .then(response => {
                setMovie(response)
                getUser(res.user)
                .then(resp => resp.json())
                .then(respo => {
                    setUser(respo)
                    getComments(id)
                    .then(r => r.json())
                    .then(respon => {
                        if(respon){
                            const data = Object.entries(respon).map(item => {
                                let id = item[0]
                                return {
                                    ...item[1],
                                    id
                                }
                            })
                            setAllComments(data)
                        }else{
                            setAllComments([])
                        }
                    })
                    .then(() => {
                        getUsers('')
                        .then(r => r.json())
                        .then(respons => {
                            setAllUsers(respons)
                        })
                    })
                    .catch(er => {
                        console.error(er);
                    })
                })
                .catch(error => {
                    console.error(error);
                })
            });
        })
        .catch(err => {
            console.error(err);
        })
    }, [id, useEffectChange])

    const submitComment = () => {
        setDisable(true)
        const localUser = JSON.parse(localStorage.getItem('user'))
        const date = new Date()
        const currentDate = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
        sendComment({
            value: comment,
            user: localUser.localId,
            date: currentDate
        }, id)  
        .then(r => r.json())
        .then(res => {
            setComment('')
            setUseEffectChange(res)
        })
    }

    const handleDeleteComment = (reviewId, commentId) => {
        const askDelete = window.confirm('Do you really want to delete this comment?')
        if(askDelete){
            deleteComment(reviewId, commentId)
            .then(r => r.json())
            .then(re => setUseEffectChange({re, reviewId, commentId}))
        }
    }

    return (
        <>
            <div className={cls.root}>
                <div className={cls.review}>
                    <div className={cls.main}>
                        {review && movie && reviewUser ? (
                            <>
                                <div className={cls.mainLeft}>
                                    <div className={cls.mainLeftInner}>
                                        <div style={{background: `url(${movie.banner}) center / cover`}} className={cls.mainLeftImg} />
                                        <Link to={`/movies/${review.movieId}`} className={cls.mainLeftTitle}>{movie.title}</Link>
                                        <span className={cls.mainLeftRating}>
                                            {[...Array(10)].map((item, i) => {
                                                    let ratingValue = (i + 1)
                                                    return (
                                                        <Star
                                                            key={i}
                                                            className={cls.star}
                                                            color={ratingValue <= review.rating ? "#ffc04a" : "#ccc"}
                                                        />
                                                    )
                                            })}
                                        </span>
                                    </div>
                                </div>
                                <div className={cls.mainLeftBefore}></div>
                                <div className={cls.mainRight}>
                                    <div className={cls.mainRightTop}>
                                        <div className={cls.mainRightTopTop}>
                                            <p className={cls.mainRightUser}>
                                                Review by
                                                <span>   {reviewUser.nick}</span>
                                            </p>
                                            <div className={cls.numberOfComments}>
                                                <a className={cls.a} href="#commentSec">
                                                    <CommentsIcon
                                                        className={cls.commentsIcon}
                                                    />
                                                </a>
                                                <span>
                                                    {allComments ? allComments.length : 0}
                                                </span>
                                            </div>
                                        </div>
                                        <p className={cls.mainRightDate}>
                                            Published {review.date}
                                        </p>
                                    </div>
                                    <div className={cls.mainRightBottom}>
                                        <Quotes className={cls.mainRightBottomQuote1}/>
                                        <Quotes className={cls.mainRightBottomQuote2}/>
                                        <p className={cls.mainRightBottomReview}>{review.review}</p>
                                    </div>
                                </div>
                                <div className={cls.closeBtnBlock}>
                                    <button onClick={() => history.goBack()} className={cls.closeBtn}>Return &nbsp; <Return className={cls.returnIcon}/></button>
                                </div>
                            </>
                        ) : <div className={cls.loading}><Loading color="white"/></div>}
                    </div>
                </div>
                <div id="commentSec" className={cls.commentSect}>
                    <div className={cls.addCommentSect}>
                        {localUser && allUsers ? (
                            <>
                                {allUsers[localUser].image ? (
                                    <div className={cls.img} style={{background: `url("${allUsers[localUser].image}") center / cover`, backgroundColor: "white"}}></div>
                                ) : (
                                    <div className={cls.img} style={{background: `url("/img/user.png") center / cover`, backgroundColor: "white"}}></div>
                                )}
                            </>
                        ) : null}
                        <textarea 
                            type="text"
                            placeholder="Add a new comment"
                            className={cls.input}
                            value={comment}
                            onChange={e => {
                                setComment(e.target.value);
                                e.target.value.length > 0 ? setDisable(false) : setDisable(true)
                            }}
                            style={
                                comment.length > 0 ? 
                                {borderBottom: "1px solid rgba(255, 255, 255, 0.7)"} 
                                : 
                                null
                            }
                        ></textarea>
                        <button onClick={submitComment} className={cls.commentSendBtn} disabled={disable}>
                            <span>Submit</span> 
                            <Send className={cls.sendIcon}/> 
                        </button>
                    </div>
                    {
                        allComments?.length === 0 ? <div className={cls.noComments}>There is no comments yet :(</div> :
                        allComments && allUsers && localUser && review ? (
                            <div className={cls.allComments}>
                                {
                                    allComments.map(item => {
                                        return (
                                            <div key={item.id} className={cls.comment}>
                                                <div className={cls.commentTop}>
                                                    {allUsers[item.user].image ? (
                                                        <div className={cls.img} style={{background: `url("${allUsers[item.user].image}") center / cover`}}></div>
                                                    ) : (
                                                        <div className={cls.img} style={{background: `url("/img/user.png") center / cover`}}></div>
                                                    )}
                                                    <span>
                                                        <Link to={`/profile/users/${item.user}`} className={cls.commentUser}>
                                                            {allUsers[item.user].nick}  
                                                        </Link>
                                                        <p className={cls.commentDate}>
                                                            {item.date}
                                                        </p>
                                                    </span>
                                                    
                                                </div>
                                                <p className={cls.commentValue}>
                                                    {item.value}
                                                </p>
                                                {localUser === item.user ? (
                                                    <span className={cls.deleteBlock}>
                                                        <Delete onClick={() => handleDeleteComment(id, item.id)} className={cls.delete}/>
                                                    </span>
                                                ) : null}   
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        ) : <div className={cls.loadingBlock}><Loading color="white"/></div>
                    }
                </div>
            </div>
        </>
    )
}

export default SingleReview