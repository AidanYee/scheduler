import React from "react";

import Form from "./Form";
import Header from "./Header"
import Empty from "./Empty"
import Show from "./Show"
import useVisualMode from "hooks/useVisualMode";

import "components/Appointment/styles.scss"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";

export default function Appointment(props) {
  // shows different components based off of current state
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
    // saves booked interview for student
    function save(name, interviewer) {
      const interview = {
        student:name,
        interviewer
      };
        console.log("🎲 ~  name",  name);
        console.log("🎲 ~ interviewer", interviewer);
        console.log("🎲 ~ id",  props.id)
        console.log("🎲 ~ interview",  interview)
        console.log("🎲 ~ props.bookInterview", props.bookInterview);
     
    transition(SAVING)

    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
    }

   return (
   <article className="appointment">
      <Header time={props.time} />
      
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show 
          student={props.interview.student} 
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form 
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}  
        />
      )}

      {/* {props.interview ? <Show name={props.interview.student} interviewer={props.interview.interviewer.name} /> : <Empty /> } */}
 

    </article>
  ) 
};