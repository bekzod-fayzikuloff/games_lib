import style from "./TicTacToePage.module.css"
import {Button, Form} from "react-bootstrap";
import React, {useCallback, useEffect, useState} from "react";
import {io} from "socket.io-client"
import axios from "axios";
import {getRoomId} from "../../../utils";

export const TicTacToePage = () => {
  const DEFAULT_STATE = "unfilled"
  const [errorMsg, setErrorMsg] = useState("")
  const [resultMsg, setResultMsg] = useState("")
  const [roomId, setRoomId] = useState("")
  const [playerName, setPlayerName] = useState("")
  const [gameIsStart, setGameIsStart] = useState(false)
  const [playerSide, setPlayerSide] = useState("X")
  const [gameCells, setGameCells] = useState(
    [
      {
        position: 1,
        value: DEFAULT_STATE
      },
      {
        position: 2,
        value: DEFAULT_STATE
      },
      {
        position: 3,
        value: DEFAULT_STATE
      },
      {
        position: 4,
        value: DEFAULT_STATE
      },
      {
        position: 5,
        value: DEFAULT_STATE
      },
      {
        position: 6,
        value: DEFAULT_STATE
      },
      {
        position: 7,
        value: DEFAULT_STATE
      },
      {
        position: 8,
        value: DEFAULT_STATE
      },
      {
        position: 9,
        value: DEFAULT_STATE
      }
    ]
  )

  const [isYourMove, setIsYourMove] = useState(false)

  const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg("")
    setPlayerName(e.target.value)
  }

  const changeCellValueByIndex = useCallback((cellValue: string, key: string, index: number) => {
    const copyCells = [...gameCells]
    const changedCell = copyCells[index]
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    changedCell[key] = cellValue
    setGameCells(copyCells)
  }, [gameCells])

  const handleCellClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, cellValue: string, cellPos: number) => {
    if (!gameIsStart) {
      setErrorMsg("You have to connect to game and wait until game will start")
      return;
    }
    if (!isYourMove) return

    if (cellValue === DEFAULT_STATE) {
      changeCellValueByIndex(playerSide, "value", cellPos - 1)
      e.currentTarget.classList.add(`${playerSide === "X" ? style.x_player : style.y_player}`)
      axios.post("http://127.0.0.1:5000/tic-tac-toe", {
        roomId, player: playerName, position: cellPos, side: playerSide
      })
      setIsYourMove(false)
    }
  }

  const handleChangeRoomID = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (gameIsStart) {
      setErrorMsg("Game is Already start you should finish it")
      return
    }
    setRoomId(e.target.value)
    setPlayerSide("X")
  }

  const handleJoinGame = () => {
    if (!playerName) {
      setErrorMsg("You have to write your username")
      return
    }
    if (gameIsStart) {
      setErrorMsg("Game is already start you should finish it")
    } else if (roomId.length < 5) {
      setErrorMsg("Invalid room ID, room ID format #1234AB")
    } else if (gameCells.filter(cell => cell.value === DEFAULT_STATE).length !== gameCells.length) {
      setErrorMsg("You should end previous game and restart")
    }
    else {
      setGameIsStart(true)
      setPlayerSide("Y")
    }
  }

  const handleGameCreate = () => {
    if (!playerName) {
      setErrorMsg("You have to write your username")
      return
    }
    if (gameIsStart) {
      setErrorMsg("Game is already start")
    } else if (gameCells.filter(cell => cell.value === DEFAULT_STATE).length !== gameCells.length) {
      setErrorMsg("You should end previous game and restart")
    } else {
      setGameIsStart(true)
      setIsYourMove(true)
      setRoomId(getRoomId())
    }
  }

  const checkIsWinner = () => {
    const combs = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const comb of combs) {
      if (
        gameCells[comb[0]].value == gameCells[comb[1]].value &&
        gameCells[comb[1]].value == gameCells[comb[2]].value &&
        gameCells[comb[0]].value != DEFAULT_STATE
      ) {
        setResultMsg("Game over winner is " + gameCells[comb[0]].value)
        setGameIsStart(false)
      }
    }
    if (gameCells.filter(cell => cell.value === DEFAULT_STATE).length === 0) {
      setResultMsg("Draw!")
      setGameIsStart(false)
    }
  }

  useEffect(() => {
    checkIsWinner()
  }, [gameCells])

  useEffect(() => {
    const socket = io(`http://localhost:5000`)
    setErrorMsg("")
    if (gameIsStart) {
      socket.on(`room_id#${roomId}`, (data) => {
        const {player, position, side} = data

        changeCellValueByIndex(side, "value", position - 1)
        if (player !== playerName) {
          setIsYourMove(true)
        }
      })
    }
  }, [changeCellValueByIndex, gameIsStart, playerName, roomId])

  return (
    <div className={style.root}>
      <div className={style.inner}>

        <div className={style.room_form}>
          <Form className={style.join__form}>

            <Form.Group className={`mb-3 ${style.seed__root}`} controlId="formBasicPassword">
              <Form.Control onChange={handleChangeUsername} value={playerName} type="text"
                            placeholder="Enter your name"/>
              <Form.Control onChange={handleChangeRoomID} value={roomId} type="text" placeholder="Enter room ID"/>
              <Button onClick={handleJoinGame}>Join game</Button>
              <Button onClick={handleGameCreate} variant="success">Create Game</Button>
            </Form.Group>

          </Form>
        </div>

        <div className={style.game__root}>
          <div className={style.game_messages}>
            {gameIsStart && <p className={style.moves_msg}>Your side: {playerSide} {isYourMove ? "Make move": "Wait opponent move"}</p>}
            {errorMsg && <p className={style.error_msg}>{errorMsg}</p>}
            {resultMsg && <p className={style.result_msg}>{resultMsg}</p>}
          </div>
          <div className={style.board}>
            {
              gameCells.map((cell,) => {
                let className = ''
                if (cell.value === "X") {
                  className = style.x_player
                } else if (cell.value === "Y") {
                  className = style.y_player
                }
                return (
                  <div
                    onClick={(e) => handleCellClick(e, cell.value, cell.position)}
                    key={cell.position}
                    className={`${style.cell} ${className}`}></div>
                )
              })
            }
          </div>
        </div>

        <div className={style.game__rules}>
          <div className={style.rules_container}>
            <h1>Rules</h1>
          </div>
        </div>

      </div>
    </div>
  )
}