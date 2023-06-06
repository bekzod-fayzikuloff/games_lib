import {AiFillHome} from "react-icons/ai";
import {BsFillStopwatchFill} from "react-icons/bs";
import style from "./Sidebar.module.css"
import {useNavigate} from "react-router-dom";

export const Sidebar = () => {
  const navigate = useNavigate()
  const items = [
    {
      title: "Home",
      link: "/",
      icon: <AiFillHome />
    },
    {
      title: "Soon add new",
      link: "/",
      icon: <BsFillStopwatchFill />
    }
  ]
  return (
    <>{items.map((sideBarItem, id) => (
      <article onClick={() => navigate(sideBarItem.link)} className={style.item} key={id}>
        <p>{sideBarItem.icon} {sideBarItem.title}</p>
      </article>
    ))}</>
  )
}