const appointments = [
  [7, 9],
  [9, 10],
  [12, 16],
  [13, 14],
  [14.5, 15.5],
  [21, 22],
];

const list = document.getElementById("list");

list.innerHTML += `<li>12 am</li>`;

for (let slot of getFullCalendar(getBusySlots(appointments))) {
  list.innerHTML += `<li style="background-color:
  ${slot[2] ? "#9ab3f5" : "#a3d8f4"}
  ;height:${(slot[1] - slot[0]) * 30}px">
  </li>`;

  list.innerHTML += `<li>${slot[1] % 12 === 0 ? 12 : slot[1] % 12} ${
    slot[1] >= 12 && slot[1] < 24 ? "pm" : "am"
  }</li>`;
}

const fullCal = getBusySlots(appointments);
console.log(fullCal);
