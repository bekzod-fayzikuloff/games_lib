import style from "./HomePage.module.css"
import Xs_Os from "./../../assets/xs_os.jpg"
import {useNavigate} from "react-router-dom";

const GameSetItem = (
  props: {
    title: string,
    games: {
      title: string,
      image: string,
      link: string
    }[]
  }
  ) => {
  const navigate = useNavigate()
  return (
    <div className={style.game__set}>
      <p className={style.category_title}>{props.title}</p>
      <div className={style.game__set_root}>

        {props.games.map(game => (
          <div key={game.link}
            style={
              {
                backgroundImage: `url(${game.image})`,
              }
            }
            className={style.game__item}
            onClick={() => navigate(`/games/${game.link}`)}
          >
            <p>{game.title}</p>
          </div>
        ))}

      </div>
    </div>
  )
}

export const HomePage = () => {
  const games = [
    {
      title: "XsOs",
      image: Xs_Os,
      link: "xs-os"
    }
  ]
  return (
    <div className={style.root}>
      <div className={style.inner}>
        <GameSetItem title={"New games"} games={games}/>
        <GameSetItem title={"Online games"} games={games} />
      </div>
    </div>
  )
}