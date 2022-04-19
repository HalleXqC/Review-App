import { useEffect, useState } from "react";
import { getMovies } from "../../API";
import Loading from "../../Components/Loading/Loading";
import Nav from "../../Components/Nav/Nav";
import cls from "./Movies.module.scss";
import { RiLayoutGridFill as RegularLayout } from "react-icons/ri";
import { FaThList as AltLayout } from "react-icons/fa";
import { BiDownArrowAlt as ArrowDown } from "react-icons/bi";
import { useHistory } from "react-router";
import CardMovie from "../../Components/CardMovie/CardMovie";

const Movies = () => {
  const [movies, setMovies] = useState(null);
  const [sort, setSort] = useState("Alphabet");
  const [showSort, setShowSort] = useState(false);
  const [layout, setLayout] = useState("regular");
  const history = useHistory();

  useEffect(() => {
    getMovies()
      .then(r => r.json())
      .then(res => {
        const data = Object.entries(res).map((item) => {
          const id = item[0];
          if (item[1].reviews) {
            const allReviews = Object.entries(item[1].reviews);
            const averageRating =
              allReviews.reduce(
                (total, current) => +total + +current[1].rating,
                0
              ) / allReviews.length;
            return {
              ...item[1],
              id,
              averageRating,
            };
          } else {
            return {
              ...item[1],
              id,
              averageRating: 0,
            };
          }
        });
        setMovies(data);
      });
  }, []);

  function pushPage(movieId) {
    history.push(`/movies/${movieId}`);
  }


  if (!movies) return <Loading color="white" />
  if (!sort) return <Loading color="white" />
  if (!layout) return <Loading color="white" />
  if (typeof showSort !== 'boolean') return <Loading />
  return (
    <div className={cls.root}>
      <div className={cls.nav}>
        <Nav color="white" />
      </div>
      <div className={cls.main}>
        <div className={cls.mainSettings}>
          <div className={cls.setsLeft}>
            <span>Sort by</span>
            <button
              onClick={() => {
                setShowSort(!showSort);
              }}
              className={cls.selectSortBtn}
              type="button"
            >
              <span>{sort}</span>
              <ArrowDown className={cls.arrow} />
            </button>
            {showSort === true ? (
              <div className={cls.sortBlock}>
                {[...Array(3)].map((item, i) => {
                  const sortOptions = ["Alphabet", "Genres", "Rating"];
                  return (
                    <button
                      className={cls.sortItem}
                      type="button"
                      onClick={() => {
                        setSort(`${sortOptions[i]}`);
                      }}
                      disabled={sort === sortOptions[i] ? true : false}
                      style={
                        sort === sortOptions[i]
                          ? {
                            background:
                              "linear-gradient(to right, rgba(35,0,212,1), rgb(177, 115, 207))",
                          }
                          : null
                      }
                      key={i}
                    >
                      {sortOptions[i]}
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>
          <div className={cls.setsRight}>
            <button
              className={cls.firstSet}
              onClick={() => setLayout("regular")}
              disabled={layout === "regular" ? true : false}
              style={
                layout === "regular"
                  ? { color: "crimson" }
                  : { color: "#eee" }
              }
            >
              <RegularLayout />
            </button>
            <button
              className={cls.secondSet}
              onClick={() => setLayout("alt")}
              disabled={layout === "alt" ? true : false}
              style={
                layout === "alt" ? { color: "crimson" } : { color: "#eee" }
              }
            >
              <AltLayout />
            </button>
          </div>
        </div>
        <div className={cls.mainCards}>
          {sort === "Alphabet" ? (
            movies
              .sort((a, b) => (a.title.trim() > b.title.trim() ? 1 : -1))
              .map((item, i) => (
                <CardMovie
                  key={i}
                  item={item}
                  layout={layout}
                  push={pushPage}
                />
              ))
          ) : sort === "Genres" ? (
            movies
              .sort((a, b) =>
                a.genres.trim().split(" ")[0] > b.genres.split(" ")[0]
                  ? 1
                  : a.genres.trim().split(" ")[0] < b.genres.split(" ")[0]
                    ? -1
                    : 0
              )
              .map((item, i) => (
                <CardMovie
                  key={i}
                  item={item}
                  layout={layout}
                  push={pushPage}
                />
              ))
          ) : sort === "Rating" ? (
            movies
              .sort((a, b) =>
                a.averageRating > b.averageRating
                  ? 1
                  : a.averageRating < b.averageRating
                    ? -1
                    : 0
              )
              .reverse()
              .map((item, i) => (
                <CardMovie
                  key={i}
                  item={item}
                  layout={layout}
                  push={pushPage}
                />
              ))
          ) : (
            <h1>Problem</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Movies;
