import React from "react";
import PropTypes from "prop-types";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

function InterviewerList(props) {
  const listOfInterviewers = props.interviewers.map((interviewerObj) => {
    return (
      <InterviewerListItem
        key={interviewerObj.id}
        name={interviewerObj.name}
        avatar={interviewerObj.avatar}
        selected={interviewerObj.id === props.value}
        setInterviewer={() => props.onChange(interviewerObj.id)}
      />
    );
  });

  return (
    <div>
      <section className="interviewers">
        <h4 className="interviewers__header text--light">Interviewer</h4>
        <ul className="interviewers__list">{listOfInterviewers}</ul>
      </section>
    </div>
  );
}
InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
};

export default InterviewerList;
