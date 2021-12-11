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

export function getInterview(state, interview) {
  //return null when no interview is passed in
  if (!interview) {
    return null;
  }

  //find id of interviewer
  const interviewerId = interview.interviewer;
  const interviewer = state.interviewers[interviewerId];

  //return object with student, interviewer obj with name and avatar
  return {
    student: interview.student,
    interviewer: interviewer,
  };
}

export function getInterviewersForDay(state, day) {}
