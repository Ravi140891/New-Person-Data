let personData = JSON.parse(localStorage.getItem("data")) || [];
let count = JSON.parse(localStorage.getItem("counter")) || 1;
const fullName = document.getElementById("name");
const age = document.getElementById("age");
const pan = document.getElementById("pan");
const education = document.getElementById("edu");
const newUser = document.querySelector(".btn-new-user");
const popUpForm = document.querySelector(".input-form");
const sort = document.getElementById("sort");
const searchBar = document.getElementById("searching");
const submitBtn = document.getElementById("submit-data");
const dataTable = document.querySelector(".data-table");
const formData = document.querySelector(".input-data");
const nameWarning = document.querySelector(".name-para");
const ageWarning = document.querySelector(".age-para");
const panWarning = document.querySelector(".pan-para");
const eduWarning = document.querySelector(".edu-para");
const deleteBtn = document.querySelector(".delete");
const column = document.querySelector(".table-column");
const clear = document.querySelector(".clr-btn");
const sortValue = document.getElementById('sort');

// Table will create when window will reload and if there is data in localstorage.

window.addEventListener("load", () => {
  display();
});

// When user will click on add details button form window will pop up.

newUser.addEventListener("click", () => {
  popUpForm.style.display = "Flex";
});

// Function to reset input fields

function inputReset() {
  fullName.value = "";
  age.value = "";
  pan.value = "";
  education.value = "";
  popUpForm.style.display = "none";
}

// Function to create table items.

function createTable(dataItems) {
  const newRow = document.createElement("tr");
  newRow.setAttribute("id", dataItems.id);
  newRow.innerHTML = `<td>${dataItems.name}</td>
                        <td>${dataItems.age}</td>
                        <td>${dataItems.pan}</td>
                        <td>${dataItems.qualification}</td>
                        <td><button class="delete">Delete</button></td>`;

  dataTable.appendChild(newRow);
}

// Event listener on form imput data to create table and add all details in array and localstorage.

formData.addEventListener("submit", (e) => {
  e.preventDefault();

  // Input fields validation

  if (fullName.value == "") {
    nameWarning.style.display = "block";
    setTimeout(() => {
      nameWarning.style.display = "none";
    }, 1500);
    return;
  }

  if (age.value == "") {
    ageWarning.style.display = "block";
    setTimeout(() => {
      ageWarning.style.display = "none";
    }, 1500);
    return;
  }

  if (pan.value == "") {
    panWarning.style.display = "block";
    setTimeout(() => {
      panWarning.style.display = "none";
    }, 1500);
    return;
  }

  if (education.value == "") {
    eduWarning.style.display = "block";
    setTimeout(() => {
      eduWarning.style.display = "none";
    }, 1500);
    return;
  }

  // Create objects to store in array

  const dataItems = {
    id: count,
    name: fullName.value,
    age: age.value,
    pan: pan.value,
    qualification: education.value,
  };

  // Pushing the above created object in array and updating localstorage.

  personData.push(dataItems);
  localStorage.setItem("data", JSON.stringify(personData));
  createTable(dataItems);
  inputReset();
  count++;
  localStorage.setItem("counter", JSON.stringify(count));
});

// Fuction to perform delete operation.

function deleteRow(e) {
  personData.forEach((ele, idx) => {
    if (ele.id == parseInt(e.path[2].id)) personData.splice(idx, 1);
  });
  e.path[2].remove();
  localStorage.setItem("data", JSON.stringify(personData));
}

// Event listener on table so when user will click on delete button then delete function would be called.

dataTable.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) deleteRow(e);
});

// function to handle search

function handleSearch() {
  const filterArr = personData.filter((item) =>
    item.pan.includes(searchBar.value)
  );
  if (filterArr.length != 0) {
    dataTable.innerHTML = "";
    filterArr.forEach((item) => createTable(item));
  } else {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `<td colspan="5" class="error">No data found!</td>`;
    dataTable.innerHTML = "";
    dataTable.appendChild(newRow);
  }
}

// event listener on search input

searchBar.addEventListener("keyup", (e) => {
  if (e.target.value == "") {
    dataTable.innerHTML = "";
    display();
  } else {
    dataTable.innerHTML = "";
    handleSearch();
  }
});

// function to display array items

function display() {
  personData.forEach((item) => createTable(item));
}

clear.addEventListener("click", () => {
  searchBar.value = "";
  dataTable.innerHTML = "";
  display();
});

// Sorting of data by name

sortValue.addEventListener('change',(e) => {
  if(e.target.value === "ascending"){
    personData.sort((a,b) => a.name.localeCompare(b.name))
  }
  dataTable.innerHTML =""
  display();
})
sortValue.addEventListener('change', (e) => {
  if(e.target.value === "descending"){
    personData.sort((a,b) => b.name.localeCompare(a.name));
  }
  dataTable.innerHTML = ''
  display();
})
