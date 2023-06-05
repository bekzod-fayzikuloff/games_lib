import './App.module.css'
import {useState} from "react";
import style from "./App.module.css"
import {BsSearch} from "react-icons/bs";
import {BiMenuAltLeft, BiMenuAltRight} from "react-icons/bi"
import GLSvg from "./assets/gl.svg"


const CLLogo = () => (
  <>
    <img className={style.logo}
      src={GLSvg}
      alt="logo"
    />
    <span className={style.lg_title}>GamesLib</span>
  </>
)


function App() {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false)
  return (
    <>
      <nav className={`navbar navbar-dark ${style.head__bar}`}>
        <button onClick={()=> setIsBurgerOpen(prevState => !prevState)} className={`navbar-toggler ${style.burger__btn}`} type="button"
                data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false"
                aria-label="Toggle navigation">
          <span>{isBurgerOpen ? <BiMenuAltRight/> : <BiMenuAltLeft />}</span>
        </button>

        <form className={style.search__input}>
          <input type="search" placeholder="Search..." />
            <BsSearch/>
        </form>

        <a className="navbar-brand"><CLLogo/></a>
      </nav>

      <main className={style.root}>
        {isBurgerOpen &&
        <aside className={style.sidebar}>
          <p>Foo</p>
        </aside>
        }
        <div className={style.main__content}>
          <p>Content</p>
        </div>
      </main>
    </>
  )
}

export default App
