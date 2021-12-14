import { useState, useEffect } from "react";
import axios from "axios";

export function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  const bookInterview = (apptId, interview) => {
    return axios
      .put(`http://localhost:8001/api/appointments/${apptId}`, {
        interview,
      })
      .then(() => {
        const appointment = {
          ...state.appointments[apptId],
          interview: { ...interview },
        };
        const appointments = {
          ...state.appointments,
          [apptId]: appointment,
        };
        setState({ ...state, appointments });
      });
  };

  const cancelInterview = (apptId) => {
    return axios
      .delete(`http://localhost:8001/api/appointments/${apptId}`)
      .then(() => {
        const appointment = {
          ...state.appointments[apptId],
          interview: null,
        };
        const appointments = {
          ...state.appointments,
          [apptId]: appointment,
        };
        setState({ ...state, appointments });
      });
  };

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
