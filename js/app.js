'use strict'

//Declarations
let parcedArray = [];

//Constructor
function DonationObject(userName, donationAmount, Age) {
    this.userName = userName;
    this.donationAmount = donationAmount;
    this.Age = Age;
    DonationObject.all.push(this);
    this.CreateRow();
}
DonationObject.all = [];

//prototype method to draw the table
let table = document.getElementById('donationTable');
DonationObject.prototype.CreateRow = function () {
    let tRow = document.createElement('tr');
    table.appendChild(tRow);

    let nameTd = document.createElement('td');
    nameTd.textContent = this.userName;
    tRow.appendChild(nameTd);

    let donationTd = document.createElement('td');
    donationTd.textContent = this.donationAmount;
    tRow.appendChild(donationTd);

    let ageTd = document.createElement('td');
    ageTd.textContent = this.Age;
    tRow.appendChild(ageTd);
}

//get randomAge
function randomAge() {
    let min = Math.ceil(20);
    let max = Math.floor(60);
    let result = Math.floor(Math.random() * (max - min) + min);
    return result;
}

//On submit create object
let form = document.getElementById('mainForm');
form.addEventListener('submit', genarateObjects);
function genarateObjects(event) {
    event.preventDefault();
    let name = event.target.userName.value;
    let donation = event.target.donation.value;
    let rAge = randomAge();
    new DonationObject(name, donation, rAge);
    updateLocalStorage();
}

//update local storage
function updateLocalStorage() {
    let data = JSON.stringify(DonationObject.all);
    localStorage.setItem('Donation', data);
}

//get from local storage and (reinstantiation)
function getLocalStorage() {
    let data = localStorage.getItem('Donation');
    if (data !== null) {
        DonationObject.all = [];
        parcedArray = JSON.parse(data);
        for (let i = 0; i < parcedArray.length; i++) {
            new DonationObject(parcedArray[i].userName, parcedArray[i].donationAmount, parcedArray[i].Age);
            // let newRow = DonationObject.all[i].createRow();
        }
    }
}

let clearBtnElement = document.getElementById('clearData');
clearBtnElement.addEventListener('click', clearItems);

function clearItems(event) {
    parcedArray = [];
    DonationObject.all = [];
    localStorage.clear();
    location.reload();
}

getLocalStorage();