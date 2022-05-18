import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {
 const days = props.days.map(day => {
//  console.log("🎲 ~ day", day);
 return(
    <ul key={day.id}>
      <DayListItem
          name={day.name} 
          spots={day.spots} 
          selected={day.name === props.day}
          setDay={props.setDay}  
          />      
    </ul>
  )
 });
//  console.log("🎲 ~ props.days", props.days);
 return days;
}

