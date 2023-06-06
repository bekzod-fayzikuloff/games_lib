import './App.module.css'
import {useEffect, useState} from "react";
import style from "./App.module.css"
import {Header} from "./components/Header";
import {Sidebar} from "./components/Sidebar";


function App() {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false)
  const [searchTitle, setSearchTitle] = useState('')

  useEffect(() => {
    console.log("rerender")
  }, [searchTitle])

  return (
    <>
      <Header setSearchTitle={setSearchTitle} isBurgerOpen={isBurgerOpen} setIsBurgerOpen={setIsBurgerOpen}/>
      <main className={style.root}>
        {isBurgerOpen &&
        <aside className={style.sidebar}>
          <Sidebar />
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
