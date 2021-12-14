import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const listOfDays = props.days.map((dayObj) => {
    return (
      <DayListItem
        key={dayObj.id}
        name={dayObj.name}
        selected={dayObj.name === props.value}
        setDay={props.onChange}
        spots={dayObj.spots}
      />
    );
  });

  return <ul>{listOfDays}</ul>;
}
