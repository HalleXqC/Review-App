import cls from "./Stars.module.scss"

const Stars = () => {
    return (
        <>
            <div className={cls.floatingStar1}><img src="/img/star.png" alt="star" /></div>
            <div className={cls.floatingStar2}><img src="/img/star.png" alt="star" /></div>
            <div className={cls.floatingStar3}><img src="/img/star.png" alt="star" /></div>
            <div className={cls.floatingStar4}><img src="/img/star.png" alt="star" /></div>
        </>
    )
}

export default Stars 