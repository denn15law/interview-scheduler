export function getAppointmentsForDay(state, day) {
  const days = state.days;
  const appointments = state.appointments;
  //returns empty days data is empty
  if (days.length === 0) {
    return [];
  }
  //return empty if day is not found
  let selectedDay = days.filter((dayObj) => dayObj.name === day)[0];
  if (!selectedDay) {
    return [];
  }
  //push appt obj that matches id to appointmentsforday array
  let appointmentsForDay = [];
  for (let apptId of selectedDay.appointments) {
    appointmentsForDay.push(appointments[apptId]);
  }
  return appointmentsForDay;
}
