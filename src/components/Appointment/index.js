import React from "react";

import useVisualMode from "hooks/useVisualMode";
import "components/Appointment/styles.scss"

// Appointment Components
import Form from "./Form";
import Header from "./Header"
import Empty from "./Empty"
import Show from "./Show"
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  // shows different components based off of current state
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
    // SAVES booked interview for student
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
      // error handling for EDIT
      .catch(() => transition(ERROR_SAVE, true));
    }

    // DELETES appointment
    function confirmDelete() {
      transition(DELETE, true)

      props.deleteInterview(props.id)
        .then(() => transition(EMPTY))
        // error handling for DELETE
        .catch(() => transition(ERROR_DELETE, true))
    }

    // shows the CONFIRM transition
    function confirm() {
      transition(CONFIRM)
    }

    // EDITS the appointment
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
         {mode === ERROR_SAVE && (
        <Error 
          message='Oh no! Failed to save 🥴'
          onClose={back}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error 
          message='Uh oh! Failed to delete 🥴'
          onClose={back}
        />
       )}
    </article>
  ) 
};