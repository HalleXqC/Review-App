import { useEffect, useState } from 'react'
import { getAllReviews, getMovies, getUsers } from '../../API'
import Nav from '../../Components/Nav/Nav'
import cls from './Reviews.module.scss'
import Loading from '../../Components/Loading/Loading'
import Card from '../../Components/Card/Card'
import { Link } from 'react-router-dom'
import objectEntries from '../../Utils/objectEntries'
import InfiniteScroll from 'react-infinite-scroll-component'

const Reviews = () => {

  const LIMIT = 6

  const [reviews, setReviews] = useState(null)
  const [visibleReviews, setVisReviews] = useState(null)
  const [visibleCount, setVisCount] = useState(LIMIT)
  const [hasMore, setHasMore] = useState(true)

  const [movies, setMovies] = useState(null)
  const [users, setUsers] = useState(null)
  const [updateUseEffect, setUpdateUseEffect] = useState('')

  useEffect(() => {
    getAllReviews('')
      .then(r => r.json())
      .then(res => {
        if (res !== null) {
          const data = objectEntries(res)
          setReviews(data.reverse())
          setVisReviews(data.slice(0, LIMIT))
          localStorage.removeItem('userNick')
        } else {
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

  const fetchData = () => {
    const NEW_LIMIT = visibleCount + LIMIT
    const dataToAdd = reviews?.slice(visibleCount, NEW_LIMIT)

    if (reviews.length > visibleReviews.length) {
      setTimeout(() => {
        setVisReviews([...visibleReviews].concat(dataToAdd))
      }, 500)
      setVisCount(NEW_LIMIT)
    } else {
      setHasMore(false)
    }
    
  }

  if (!reviews) return <Loading />
  if (!movies) return <Loading />
  if (!users) return <Loading />
  return (
    <div className={cls.root}>
      <div className={cls.nav}>
        <Nav />
      </div>
      
      <InfiniteScroll
        dataLength={visibleReviews.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<Loading/>}
        className={cls.main}
      >
        {
          visibleReviews.map((item, index) => {
            return (
              <Card 
                review={item}
                user={users[item.user]}
                movie={movies[item.movieId]}
                key={index}
                setUpdateUseEffect={setUpdateUseEffect}
              />
            )
          })
        }
      </InfiniteScroll>
      <Link className={cls.addReviewBtn} to="/addreview">Add Review</Link>
    </div>
  )
}

export default Reviews