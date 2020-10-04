function getBusySlots(appointments) {
  if (appointments.length === 0) return appointments;

  const mergedApps = [];

  let curr = appointments[0];

  for (let i = 1; i < appointments.length; i++) {
    if (doesIntersect(curr, appointments[i])) {
      curr[1] = Math.max(curr[1], appointments[i][1]);
    } else {
      mergedApps.push(curr);
      curr = appointments[i];
    }
  }

  mergedApps.push(curr);

  return mergedApps;
}

function doesIntersect(ap1, ap2) {
  return ap1[1] >= ap2[0];
}

function getFullCalendar(busySlots) {
  if (busySlots.length === 0) return [0, 24, 0];

  const cal = [];
  if (busySlots[0][0] > 0) cal.push([0, busySlots[0][0], 0]);

  for (let i = 0; i < busySlots.length - 1; i++) {
    const slot = busySlots[i];
    cal.push([...slot, 1]);
    cal.push([slot[1], busySlots[i + 1][0], 0]);
  }

  cal.push([...busySlots[busySlots.length - 1], 1]);

  if (busySlots[busySlots.length - 1][1] < 24)
    cal.push([busySlots[busySlots.length - 1][1], 24, 0]);

  return cal;
}
