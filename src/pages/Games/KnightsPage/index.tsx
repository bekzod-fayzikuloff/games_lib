import style from "./KnightsPage.module.css"
import {Stage, Sprite, AnimatedSprite} from '@pixi/react';
import {useEffect, useRef, useState} from "react";
import BG from "./../../../assets/bg.png"
import IDLE from "../../../assets/elder/Idle.gif"
import Run1 from "../../../assets/elder/Run-Sheet-1.png"
import Run2 from "../../../assets/elder/Run-Sheet-2.png"
import Run3 from "../../../assets/elder/Run-Sheet-3.png"
import Run4 from "../../../assets/elder/Run-Sheet-4.png"
import Run5 from "../../../assets/elder/Run-Sheet-5.png"
import Run6 from "../../../assets/elder/Run-Sheet-6.png"
import Run7 from "../../../assets/elder/Run-Sheet-7.png"
import Run8 from "../../../assets/elder/Run-Sheet-8.png"


function useEventListener(eventName: string, handler: void | any, element = window){
  const savedHandler = useRef();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(
    () => {
      const isSupported = element && element.addEventListener;
      if (!isSupported) return;

      // @ts-ignore
      const eventListener = (event) => savedHandler.current(event);

      element.addEventListener(eventName, eventListener);

      return () => {
        element.removeEventListener(eventName, eventListener);
      };
    },
    [eventName, element]
  );
}

const Player = (
  props: {
    x: number,
    y: number
  }) => {

  const STEP = 5
  const [playerX, setPlayerX] = useState(props.x)
  const [playerY, setPlayerY] = useState(props.y)
  const [isRunning, setIsRunning] = useState(false)

  const runningAnimation = () => {
    setTimeout(() => {
      setIsRunning(false)
    }, 1200)
  }

  useEventListener("keydown", (e) => {
    const keyHandle = {
      d: () => {
        setIsRunning(true)
        setPlayerX(playerX + STEP)
        runningAnimation()
      },
      a: () => {
        setIsRunning(true)
        setPlayerX(playerX - STEP)
        runningAnimation()
      },
      w: () => setPlayerY(playerY - STEP),
      s: () => setPlayerY(playerY + STEP),
      z: () => spriteElement.current.transform.scale.x *= -1
    }
    // @ts-ignore
    keyHandle[e.key] && keyHandle[e.key]()
  })

  const spriteElement = useRef();
  return (
    <AnimatedSprite
      x={playerX}
      y={playerY}
      ref={spriteElement}
      images={[IDLE, Run1, Run2, Run3, Run4, Run5, Run6, Run7, Run8]}
      animationSpeed={0.17}
      isPlaying={isRunning}
    />
  )
}

export const Knights = () => {
  const scene = useRef()
  return (<>

      <div className={style.root}>
        <Stage ref={scene} className={style.screen}>
          <Sprite
            width={1000}
            height={600}
            image={BG}
          />

          <Player x={0} y={window.innerHeight - 420} />

        </Stage>
      </div>
    </>
  )
}