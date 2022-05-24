import React from "react";

import Form from "./Form";
import Header from "./Header"
import Empty from "./Empty"
import Show from "./Show"
import useVisualMode from "hooks/useVisualMode";

import "components/Appointment/styles.scss"
import Status from "./Status";
import Confirm from "./Confirm";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

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
        // console.log("🎲 ~  name",  name);
        // console.log("🎲 ~ interviewer", interviewer);
        // console.log("🎲 ~ id",  props.id)
        // console.log("🎲 ~ interview",  interview)
        // console.log("🎲 ~ props.bookInterview", props.bookInterview);
     
    transition(SAVING)

    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
    }

    // deletes appointment
    function confirmDelete() {
      transition(DELETE, true)

      props.deleteInterview(props.id)
        .then(() => transition(EMPTY))
    }

    // shows the CONFIRM transition
    function confirm() {
      transition(CONFIRM)
    }

    function edit() {
      transition(EDIT)
    }

   return (
   <article className="appointment">
      <Header time={props.time} />
      
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show 
          student={props.interview.student} 
          interviewer={props.interview.interviewer}
          onDelete={confirm}
          onEdit={edit}
        />
      )}
      {mode === CREATE && (
        <Form 
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}  
        />
      )}
       {mode === SAVING && (
        <Status
          message={'Saving'}  
        />
      )}
        {mode === DELETE && (
        <Status
          message={'Deleting'}  
        />
      )}
        {mode === CONFIRM && (
          <Confirm
            message={'r u sure u want to delete me m8'}
            onConfirm={confirmDelete}
            onCancel={back}
          />
        )}
        {mode === EDIT && (
          <Form 
            name={props.interview.student}
            interviewer={props.interview.interviewer.id}
            interviewers={props.interviewers}
            onCancel={back}
            onSave={save}
          />
        )}
 
    </article>
  ) 
};