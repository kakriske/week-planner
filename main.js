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

const $tbodyElement = document.querySelector('tbody');
const $tableRowTemplateOG = document.querySelector('.table-row');
// 2 classes, occupied, available


const rowsRendered = 10;
let modalOpen = false;

let data = {
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

function createTableRow() {
  return $tableRowTemplateOG.cloneNode(true);
}

for (let i = 1; i < rowsRendered; i++) {
  const $newTableRow = createTableRow();
  $tbodyElement.append($newTableRow);
}

function applyEntry(entry) {
  const $tableRow = document.querySelector('.available');
  if ($tableRow !== null) {
    // found a table row that is available for use
    const thElements$ = $tableRow.querySelectorAll('td');
    $tableRow.classList.remove('available');
    thElements$[0].innerHTML = entry.timeOfEvent;
    thElements$[1].innerHTML = entry.eventInfo;
  } else {
    // if it doesn't exist, create a table row
  }
}

function confirmButtonClicked(event) {
  const newEntry = {
    eventInfo: $eventInformation.value,
    dayOfWeek: $modalDayOfWeek.value,
    timeOfEvent: $modalTimeOfEvent.value,
  };
  if (newEntry.dayOfWeek === 'Choose a Day') {
    return;
  }
  if (newEntry.timeOfEvent === 'Choose a Time') {
    return;
  }

  const currentDay = newEntry.dayOfWeek; // This is a day of the week, "Sunday" or "Monday".
  const currentDayObject = data[currentDay]; // this accesses our storage for any entries made for a day of the week, example: Accesses every entry for "Sunday"
  currentDayObject.push(newEntry);
  // data[newEntry.dayOfWeek].push(newEntry); // lines 40-42 in one line
  applyEntry(newEntry);
}

function modalFormClicked(event) {
  event.preventDefault();

  const $target = event.target;
  const className = $target.className;
  const tagName = $target.tagName;
  if (tagName === 'BUTTON') {
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


// load in data from storage
const oldData = JSON.parse(localStorage.getItem('week-planner-data'))
if (oldData !== null) data = oldData


for (const key in data){
  const entryListForDay = data[key]
  console.log(key, entryListForDay);

  for (let i = 0; i < entryListForDay.length; i++) {
    const entry = entryListForDay[i]
    applyEntry(entry);
  }

}

$addNewEventButton.addEventListener('click', addNewEventButtonClicked);
$modalForm.addEventListener('click', modalFormClicked);

window.addEventListener('beforeunload', function (event) {
  localStorage.setItem('week-planner-data', JSON.stringify(data));
});
