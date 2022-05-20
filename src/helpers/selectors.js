// returns empty array when the days data is empty/ data is not found
export function getAppointmentsForDay(state, day) {
  //console.log("🎲 ~ state", state);
  const filteredDays = state.days.find((elem) => elem.name === day);
  // console.log("🎲 ~ filteredDays", filteredDays);
  if (!filteredDays) {
    return [];
  }

  // variable holds all apps by id - returns array with a length matching the number of appointments for that day
  const appsById = filteredDays.appointments;
  //console.log("🎲 ~ filteredDays.appointments", filteredDays.appointments);

  const appsPerDay = [];
  // loop though appointments in state
  for (const id in state.appointments) {
    if (appsById.includes(state.appointments[id].id)) {
      appsPerDay.push(state.appointments[id]);
    }
  }
   console.log("🎲 ~ appsPerDay", appsPerDay);
  return appsPerDay;
}
 
// need to display interviews from data
export const getInterview = (state, interview) => {
  if (!interview) {
    return null;
  } else {
    // loop though interviewers in state
    for(const id in state.interviewers) {
    // console.log("🎲 ~ state.interviewers", state.interviewers);
      if(interview.interviewer === state.interviewers[id].id) {
        console.log("🎲 ~ state.interviewers[id].id", state.interviewers[id].id);
        return {
          student: interview.student,
          interviewer: {...state.interviewers[id]}
        };
      }
    }
  };

return;
};


