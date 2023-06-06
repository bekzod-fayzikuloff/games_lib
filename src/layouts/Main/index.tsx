import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../../components/Sidebar';
import {Header} from "../../components/Header";
import style from "../../App.module.css";

export function MainLayout(props: {
  isBurgerOpen: boolean,
  setIsBurgerOpen:  React.Dispatch<React.SetStateAction<boolean>>,
  setSearchTitle: React.Dispatch<React.SetStateAction<string>>
}) {
  const {isBurgerOpen, setIsBurgerOpen, setSearchTitle} = props
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
          <Outlet />
        </div>
      </main>
    </>
  );
}