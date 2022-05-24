import { useState, useEffect } from "react";
const axios = require("axios").default;

export default function ApplicationData(props) {
  const [state, setState] = useState({
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: {},
  });

 const setDay = day => setState({...state, day});

 useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      console.log(all)
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    })

  }, [])

  // creates a new interview
  function bookInterview(id, interview) {
    console.log(id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // put request to save new interview to DB
    return axios.put(`/api/appointments/${id}`, appointment)
    .then(() => {
      setState({
        ...state,
        appointments
      });
    })
  }

  // deletes saved interview 
  function deleteInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interviewer: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // 
   return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      setState({ ...state, appointments });
    })
  }
  return { state, setDay, bookInterview, deleteInterview }
}