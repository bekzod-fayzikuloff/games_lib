import style from "./TicTacToePage.module.css"
import {Button, Form} from "react-bootstrap";

export const TicTacToePage = () => {
  return (
    <div className={style.root}>
      <div className={style.inner}>

        <div className={style.room_form}>
          <Form className={style.join__form}>

            <Form.Group className={`mb-3 ${style.seed__root}`} controlId="formBasicPassword">
              <Form.Control type="text" placeholder="Enter your name"/>
              <Form.Control type="text" placeholder="Enter room ID"/>
              <Button >Join game</Button>
              <Button variant="success">Create Game</Button>
            </Form.Group>

          </Form>
        </div>

        <div className={style.game__root}>
          <h1>Game</h1>
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