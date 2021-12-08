import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  const listOfInterviewers = props.interviewers.map((interviewerObj) => {
    return (
      <InterviewerListItem
        key={interviewerObj.id}
        name={interviewerObj.name}
        avatar={interviewerObj.avatar}
        selected={interviewerObj.id === props.interviewer}
        setInterviewer={() => props.setInterviewer(interviewerObj.id)}
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
