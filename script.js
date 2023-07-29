'use strict'

const days = ['sun', 'mon', 'tues', 'wed', 'thurs', 'fri', 'sat'];
let worksDays;
let sumOfWorksHours = 0;
let dailyWorkingHours = 0;

let checkWorksDays = function () {
    let checkedDays = document.getElementsByClassName("days");
    worksDays = Array.from(checkedDays).map(element => element.checked ? 1 : 0);
    let numberOfWorksDays = worksDays.reduce((acc, day) => acc + day, 0);
    return numberOfWorksDays > 0;
}
const isWorkingDay = function (date) {
    const day = date.getDay();
    return worksDays[day];

}
const checkDateValidity = function () {
    const start = document.getElementById("startDate").value;
    const end = document.getElementById("endDate").value;
    const startDate = new Date(start);
    const endDate = new Date(end);
    if (start === '' || end === '') {
        alert("No date selected, Please choose a valid date.");
        return false;
    } else if (startDate.toString() === 'Invalid Date' || endDate.toString() === 'Invalid Date') {
        alert('Invalid date. Please select a valid date.');
        return false;
    } else if (startDate > endDate) {
        alert('Please select a start date that comes before the end date');
        return false;
    } else {
        return true;
    }

}




document.querySelector(".calculate").addEventListener("click", function () {
    sumOfWorksHours = 0;
    if (!checkWorksDays()) {
        alert("Please select at least 1 works day")
        return false;
    }
    if (!checkDateValidity()) {
        return false;
    }
    const currentDate = new Date(document.getElementById("startDate").value);
    const endDate = new Date(document.getElementById("endDate").value);
    dailyWorkingHours = Number(document.getElementById("dailyWorkingHours").value);
    if (dailyWorkingHours <= 0 || dailyWorkingHours > 24) {
        alert("Please select valid working hours. Working hours should be between 1 and 24.");
        return false;
    }
    while (currentDate <= endDate) {

        if (isWorkingDay(currentDate)) {
            sumOfWorksHours = sumOfWorksHours + dailyWorkingHours;
        }
        currentDate.setDate(currentDate.getDate() + 1);
    }
    console.log(sumOfWorksHours);
    let result = document.querySelector(".result").textContent = sumOfWorksHours + " h";
});



