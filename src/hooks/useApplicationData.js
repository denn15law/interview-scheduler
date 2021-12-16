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

  const updateSpotsForDay = (state) => {
    let spots = 0;
    for (let day of state.days) {
      if (day.name === state.day) {
        for (let id of day.appointments) {
          if (state.appointments[id].interview === null) {
            spots++;
          }
        }
      }
    }
    const days = state.days.map((day) => {
      if (day.name === state.day) {
        return {
          ...day,
          spots,
        };
      } else {
        return day;
      }
    });
    setState({ ...state, days });
  };

  const bookInterview = (apptId, interview) => {
    const appointment = {
      ...state.appointments[apptId],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [apptId]: appointment,
    };
    return axios
      .put(`http://localhost:8001/api/appointments/${apptId}`, {
        interview,
      })
      .then(() => {
        setState({ ...state, appointments });
        updateSpotsForDay({ ...state, appointments });
      });
  };

  const cancelInterview = (apptId) => {
    const appointment = {
      ...state.appointments[apptId],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [apptId]: appointment,
    };
    return axios
      .delete(`http://localhost:8001/api/appointments/${apptId}`)
      .then(() => {
        setState({ ...state, appointments });
        updateSpotsForDay({ ...state, appointments });
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
