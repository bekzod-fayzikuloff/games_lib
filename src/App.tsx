import './App.module.css'
import {useEffect, useState} from "react";
import {Routes, Route} from "react-router-dom";
import {MainLayout} from "./layouts/Main";
import {NotFound} from "./components/NotFound";
import {HomePage} from "./pages/HomePage";
import {TicTacToePage} from "./pages/Games/TicTacToePage";
import {Knights} from "./pages/Games/KnightsPage";


function App() {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false)
  const [searchTitle, setSearchTitle] = useState('')

  useEffect(() => {
    console.log("rerender")
  }, [searchTitle])

  return (
    <Routes>

      <Route path="/" element={<MainLayout isBurgerOpen={isBurgerOpen} setIsBurgerOpen={setIsBurgerOpen} setSearchTitle={setSearchTitle} />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/games/xs-os" element={<TicTacToePage />} />
        <Route path="/games/unknown-knights" element={<Knights />} />
        <Route path="*" element={<NotFound />} />
      </Route>

    </Routes>
  )
}

export default App
