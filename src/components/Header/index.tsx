import style from "./Header.module.css";
import {BiMenuAltLeft, BiMenuAltRight} from "react-icons/bi";
import {BsSearch} from "react-icons/bs";
import React from "react";
import GLSvg from "../../assets/gl.svg";
import {useNavigate} from "react-router-dom";


const CLLogo = () => {
  const navigate = useNavigate()
  return (
    <>
      <img onClick={() => navigate("/")} className={style.logo}
           src={GLSvg}
           alt="logo"
      />
      <span onClick={() => navigate("/")} className={style.lg_title}>GamesLib</span>
    </>
  )
}

function Header(props: {
  isBurgerOpen: boolean,
  setIsBurgerOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setSearchTitle: React.Dispatch<React.SetStateAction<string>>
}) {
  const {isBurgerOpen, setIsBurgerOpen, setSearchTitle} = props

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTitle(e.target.value)
  }

  return (
    <nav className={`navbar navbar-dark ${style.head__bar}`}>
      <button onClick={() => setIsBurgerOpen(prevState => !prevState)} className={`navbar-toggler ${style.burger__btn}`}
              type="button"
              data-bs-toggle="collapse" data-bs-target="#navbarNav"
              aria-controls="navbarNav" aria-expanded="false"
              aria-label="Toggle navigation">
        <span>{isBurgerOpen ? <BiMenuAltRight/> : <BiMenuAltLeft/>}</span>
      </button>

      <form className={style.search__input}>
        <input onChange={handleSearch} type="search" placeholder="Search..."/>
        <BsSearch/>
      </form>

      <a className="navbar-brand"><CLLogo/></a>
    </nav>
  )
}

export {Header}