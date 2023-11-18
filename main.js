const $addNewEventButton = document.querySelector('#add-new-event-button');
const $idModalMain = document.querySelector('#modal-main');
const $cancelButton = document.querySelector('#cancel-button');
const $confirmButton = document.querySelector('#confirm-button');
const $modalForm = document.querySelector('#modal-form');
const $modalTimeOfEvent = document.querySelector(
  '#modal-time-of-event-selector'
);
const $modalDayOfWeek = document.querySelector(
  '#modal-day-of-the-week-selector'
);
const $eventInformation = document.querySelector('#event-information');

let modalOpen = false;

const data = {
  Sunday: [],
  Monday: [],
  Tuesday: [],
  Wednesday: [],
  Thursday: [],
  Friday: [],
  Saturday: [],
};

// const entryTemplate = {
//   day: 'string day of the week',
//   time: 'string time of day',
//   eventInfo: 'string event info'
// }

function applyEntry() {}

function confirmButtonClicked(event) {
  const newEntry = {
    eventInfo: $eventInformation.value,
    dayOfWeek: $modalDayOfWeek.value,
    timeOfEvent: $modalTimeOfEvent.value,
  };
  if (newEntry.dayOfWeek === 'Choose a Day') {
    console.log(';other stuff');
    return;
  }
  if (newEntry.timeOfEvent === 'Choose a Time') {
    console.log('stuff');
    return;
  }


  const currentDay = newEntry.dayOfWeek; // This is a day of the week, "Sunday" or "Monday".
  const currentDayObject = data[currentDay]; // this accesses our storage for any entries made for a day of the week, example: Accesses every entry for "Sunday"
  currentDayObject.push(newEntry);
  console.log('currentDay', currentDay);
  console.log('data[currentDay]', data[currentDay]);
  // data[newEntry.dayOfWeek].push(newEntry); // lines 40-42 in one line
}

function modalFormClicked(event) {
  event.preventDefault();
  console.log(event.target);
  const $target = event.target;
  const className = $target.className;
  if (className === 'button') {
    $idModalMain.classList.add('hidden');
  }
  if ($target === $confirmButton) {
    // confirmed button was clicked, now create data.
    confirmButtonClicked();
  }
}

function addNewEventButtonClicked(event) {
  $idModalMain.classList.remove('hidden');
}

document.addEventListener('DOMContentLoaded', function (event) {
  $addNewEventButton.addEventListener('click', addNewEventButtonClicked);
  $modalForm.addEventListener('click', modalFormClicked);
});
