import { useEffect, useState } from 'react'
import { getMovies, getUser } from '../../API'
import Nav from '../../Components/Nav/Nav'
import cls from './OtherProfile.module.scss'
import { FaMale as Male, FaFemale as Female} from 'react-icons/fa'
import Card from '../../Components/Card/Card'
import Loading from '../../Components/Loading/Loading'
import { useParams } from 'react-router'
import objectEntries from '../../Utils/objectEntries'

const OtherProfile = () => {

    const { id } = useParams()
    const [profile, setProfile] = useState(null)
    const [reviews, setReviews] = useState(null)
    const [movies, setMovies] = useState(null)

    useEffect(() => {
        getUser(id)
        .then(r => r.json())
        .then(re => {
            setProfile(re)
            if(re.reviews){
                const data = objectEntries(re.reviews)
                setReviews(data)
            }else{
                setReviews([])
            }
        })
        .then(() => {
            getMovies()
            .then(res => res.json())
            .then(resp => {
                setMovies(resp)
            })
        })
        .catch(err => {
            console.error(err);
        })
    }, [id])

    if (!reviews) return <Loading/>
    if (!movies) return <Loading/>
    return (
        <>
        {profile && (
            <div className={cls.root}>
                <div className={cls.nav}>
                    <Nav/>
                </div>
                <div className={cls.main}>
                    <div className={cls.mainProfile}>
                        <div className={cls.profPic}>
                            {profile.image ? (
                                <div 
                                    className={cls.img} 
                                    title="Profile Picture"
                                    style={{background: `url("${profile.image}") center / cover`}}
                                ></div>
                            ) : (
                                <div 
                                    className={cls.img} 
                                    title="Profile Picture"
                                    style={{background: `url("/img/user.png") center / cover`}}
                                ></div>
                            )}
                        </div>
                        <div className={cls.names}>
                            <h3 className={cls.nickname}>{profile.nick}</h3>
                            {profile.name ? (
                                <h4 className={cls.name}>{profile.name}</h4>
                            ) : null}
                            <p className={cls.gender}>
                                Gender:&nbsp;
                                {profile.gender === 'male' ? (
                                    <span className={cls.blue}>
                                        {profile.gender}
                                        <Male/>
                                    </span>
                                ) : (
                                    <span className={cls.pink}>
                                        {profile.gender}
                                        <Female/>
                                    </span>
                                )}
                            </p>
                            {profile.bio ? (
                                <p className={cls.bio}>{profile.bio}</p>
                            ) : null}
                        </div>
                    </div>
                    <div className={cls.mainMovies}>
                        {reviews?.length === 0 ? (
                            <h1>This user haven't written any reviews yet</h1>
                        ) : reviews.map((item, i) => {
                            return (
                                <Card
                                    review={item}
                                    user={profile}
                                    movie={movies[item.movieId]}
                                    width="bigger"
                                    key={i}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
        )}
        </>
    )
}

export default OtherProfile