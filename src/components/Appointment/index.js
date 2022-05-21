import React from "react";

import Header from "./Header"
import Empty from "./Empty"
import Show from "./Show"
import useVisualMode from "hooks/useVisualMode";

import "components/Appointment/styles.scss"

const EMPTY = "EMPTY";
const SHOW = "SHOW";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
 
   return (
   <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => console.log("Clicked onAdd")} />}
      {mode === SHOW && (
      <Show 
      student={props.interview.student} 
      interviewer={props.interview.interviewer}
      />)}

      {/* {props.interview ? <Show name={props.interview.student} interviewer={props.interview.interviewer.name} /> : <Empty /> } */}
 

    </article>
  ) 
};