import React, { useState, useEffect, } from "react";
import DayList from "./DayList";

import "components/Application.scss";
import Appointment from "components/Appointment/index";

import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";

import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {
    // const [state, setState] = useState({
    // day: "Monday",
    // days: [],
    // appointments: {},
    // interviewers: {},
    // });
      const {
    state,
    setDay,
    bookInterview,
    deleteInterview,
  } = useApplicationData();
  
  // const dailyAppointments = getAppointmentsForDay(state, state.day)
  // const dailyInterviewers = getInterviewersForDay(state, state.day); 

//   const setDay = day => setState({...state, day});

//   // const setDays = days => setState(prev => ({ ...prev, days }));
//  useEffect(() => {
//     Promise.all([
//       axios.get("/api/days"),
//       axios.get("/api/appointments"),
//       axios.get("/api/interviewers"),
//     ]).then((all) => {
//       console.log(all)
//       setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
//     })

//   }, [])

//   // creates a new interview
//   function bookInterview(id, interview) {
//     console.log(id, interview);

//     const appointment = {
//       ...state.appointments[id],
//       interview: { ...interview }
//     };

//     const appointments = {
//       ...state.appointments,
//       [id]: appointment
//     };

//     // put request to save new interview to DB
//     return axios.put(`/api/appointments/${id}`, appointment)
//     .then(() => {
//       setState({
//         ...state,
//         appointments
//       });
//     })
//   }

//   // deletes saved interview 
//   function deleteInterview(id) {
//     const appointment = {
//       ...state.appointments[id],
//       interviewer: null
//     };

//     const appointments = {
//       ...state.appointments,
//       [id]: appointment
//     };

//     // 
//    return axios.delete(`/api/appointments/${id}`)
//     .then(() => {
//       setState({ ...state, appointments });
//     })
//   }
  const dailyInterviewers = getInterviewersForDay(state, state.day);
  const dailyAppointments = getAppointmentsForDay(state, state.day).map(
    appointment => {
      return (
        <Appointment
          key={appointment.id}
          {...appointment}
          interview={getInterview(state, appointment.interview)}
          interviewers={dailyInterviewers}
          bookInterview={bookInterview}
          deleteInterview={deleteInterview}
        />
      );
    }
  );

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList 
            days={state.days} 
            day={state.day} 
            setDay={setDay} 
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        <section className="schedule">
          {dailyAppointments}
          <Appointment key="last" time="5pm" />
        </section>
      </section>
    </main>
  );
}