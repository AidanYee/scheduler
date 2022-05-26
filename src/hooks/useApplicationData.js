import { useState, useEffect } from "react";
const axios = require("axios");

export default function ApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  // creates a new interview
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    // PUT REQUEST to save new interview to DB
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      setState({
        ...state,
        appointments,
        // Update the state with the new number of spots
        days: spotsRemaining(appointments, id),
      });
    });
  }

  // DELETES interview
  function deleteInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    // DELETE REQUEST
    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState({
        ...state,
        appointments,
        // Update the state with the new number of spots
        days: spotsRemaining(appointments, id),
      });
    });
  }

  const spotsRemaining = function (appointments, id) {
    const dayIndex = state.days.findIndex((day) => day.name === state.day);

    const appointmentList = [...state.days[dayIndex].appointments];

    // adds a spot if there no apointment ID
    if (id && !appointmentList.includes(id)) {
      appointmentList.push(id);
    }

    let spotsRemaining = appointmentList.length;
    // loops though spotsRemaining
    appointmentList.forEach((id) => {
      // removes a spot if an appointment has an id
      if (appointments[id].interview) spotsRemaining--;
    });

    const day = {
      ...state.days[dayIndex],
      spots: spotsRemaining,
    };

    const days = [...state.days];
    days[dayIndex] = day;

    return days;
  };

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  return { state, setDay, bookInterview, deleteInterview };
}
