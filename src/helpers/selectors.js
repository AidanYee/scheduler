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
 




