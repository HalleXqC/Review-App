import cls from './CardMovie.module.scss';
import { AiFillStar as Star } from 'react-icons/ai'

const CardMovie = ({item, push, layout}) => {
    return (
        <>
            {
                layout === 'regular' ? (
                    <div className={cls.card} key={item.title} onClick={() => push(item.id)}>
                        <img className={cls.banner} src={`${item.banner}`} alt='movieBanner'/>
                        <div className={cls.cardText}>
                            <p className={cls.cardTitle}>{item.title}</p>
                            <p className={cls.cardGenres}>{item.genres}</p>
                        </div>
                        {item.averageRating !== 0 ? (
                            <div className={cls.ratingText}>
                                <span>Average: {item.averageRating}</span>
                                <img src="/img/star.png" alt="star" />
                            </div>
                        ) : (
                            <div className={cls.ratingText}>
                                <span>No reviews yet :(</span>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className={cls.altCard} key={item.title} onClick={() => push(item.id)}>
                        <img className={cls.altBanner} src={`${item.banner}`} alt='movieBanner'/>
                        <div className={cls.altCardRight}>
                            <div className={cls.altCardRightText}>
                                <div className={cls.altCardText}>
                                    <p className={cls.altCardTitle}>{item.title}</p>
                                    <p className={cls.altCardGenres}>{item.genres}</p>
                                </div>
                                <div className={cls.altCardDesc}>
                                    <p>{item.description}</p>
                                </div>
                            </div>
                            <div className={cls.altRatingBlock}>
                                {item.averageRating !== 0 ? (
                                    <div className={cls.altRatingText}>
                                        <span>Average: {item.averageRating}</span>
                                        <div className={cls.stars}>
                                            {[...Array(10)].map((st, i) => {
                                                let ratingValue = (i + 1)
                                                return (
                                                    <div key={i}>
                                                        <span>{ratingValue}</span>
                                                        <Star 
                                                            className={cls.star}
                                                            color={ratingValue <= item.averageRating ? "#ffc04a" : "#ccc"}
                                                        />
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                ) : (
                                    <div className={cls.altRatingText}>
                                        <span>No reviews yet :(</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default CardMovie