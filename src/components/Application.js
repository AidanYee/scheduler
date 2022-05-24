import React from "react";
import DayList from "./DayList";

import "components/Application.scss";
import Appointment from "components/Appointment/index";

import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";

import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {
  // useApplicationData Hook returns object below
  const {
    state,
    setDay,
    bookInterview,
    deleteInterview,
  } = useApplicationData();
  
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