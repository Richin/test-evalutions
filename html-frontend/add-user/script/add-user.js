const companySelectionBtn = document.querySelector(
  "[data-company-selection-btn]"
);
const companyList = document.querySelector("[data-company-list]");
const companyNameElement = document.querySelector("[data-company-name]");
const companys = document.querySelectorAll(".comapny-list-box");
const roleSelectionBtn = document.querySelector("[data-role-selection-btn]");
const roleList = document.querySelector("[data-role-list]");
const roleNameElement = document.querySelector("[data-role-name]");
const roles = document.querySelectorAll(".role-list-box");
const form = document.querySelector("[data-form]");
const errorElemnt = document.querySelector("[data-error-field]");
const closeButton = document.querySelector("[data-close]");
const profileDropBtn = document.querySelector("[data-profile-drop-btn]");
const profileDropDown = document.querySelector("[data-profile-dropdown]");
const submitButton = document.querySelector("[data-submit-button]");

const firstName = document.querySelector("[data-firstname]");
const lastName = document.querySelector("[data-lastname]");
const email = document.querySelector("[data-email]");
const userName = document.querySelector("[data-username]");
const phoneNumber = document.querySelector("[data-phone-number]");
const password = document.querySelector("[data-password]");
const confirmPassword = document.querySelector("[data-confirm-password]");
const joinignDate = document.querySelector("[data-date]");
const employeeID = document.querySelector("[data-employee-id]");
let companyname, rolename;
const editID = getLocalStorage("editID");

window.addEventListener("load", () => {
  if (editID) {
    fetchUser(editID);
    submitButton.innerText = "update user";
  }
});

profileDropDown.addEventListener("click", logout);

function logout() {
  console.log("first");
  clearLocalStorage();
  window.location.href = "/";
}

form.addEventListener("submit", formValidate);

closeButton.addEventListener("click", () => {
  removeLocalStorage("editID");
  window.location.href = "/dashboard/dashboard.html";
});

profileDropBtn.addEventListener("click", () => {
  toggleElement(profileDropDown);
});

companySelectionBtn.addEventListener("click", () => {
  toggleElement(companyList);
});

companys.forEach((company) => {
  company.addEventListener("click", (e) => {
    appendTextInElement(companyNameElement, e.target.innerText);
    companyname = e.target.innerText;
    hide(companyList);
  });
});

roles.forEach((role) => {
  role.addEventListener("click", (e) => {
    appendTextInElement(roleNameElement, e.target.innerText);
    rolename = e.target.innerText;
    hide(roleList);
  });
});

roleSelectionBtn.addEventListener("click", () => {
  toggleElement(roleList);
});

const fetchUser = (id) => {
  fetch(`http://localhost:3001/api/user/fetchemployee?id=${id}`)
    .then(async (response) => {
      const result = await response.json();
      updateInputBoxValue(result.employeeData);
    })
    .catch((err) => {
      console.log(err);
    });
};

function updateInputBoxValue(employeeDetails) {
  updateInputValue(firstName, employeeDetails.firstName);
  updateInputValue(lastName, employeeDetails.lastName);
  updateInputValue(password, employeeDetails.password);
  updateInputValue(confirmPassword, employeeDetails.password);
  updateInputValue(employeeID, employeeDetails.employeeID);
  updateInputValue(joinignDate, employeeDetails.joiningDate);
  updateInputValue(phoneNumber, employeeDetails.phoneNumber);
  updateInputValue(email, employeeDetails.email);
  updateInputValue(userName, employeeDetails.userName);
  appendTextInElement(companyNameElement, employeeDetails.company);
  appendTextInElement(roleNameElement, employeeDetails.role);
}

function updateInputValue(inputBox, value) {
  inputBox.value = value;
}

const requiredInputBoxArray = [
  firstName,
  lastName,
  email,
  userName,
  password,
  confirmPassword,
  employeeID,
  joinignDate,
];

const date = new Date();

const options = {
  year: "numeric",
  month: "short",
  day: "numeric",
};

const createdDate = date.toLocaleString("en-IN", options);

const signup = async () => {
  const userDetails = getInputValues();

  const response = await fetch("http://localhost:3001/api/auth/signup", {
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userDetails),
  });
  const result = await response.json();
};

const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const phoneNumberFormat = /^\d{10}$/;

function formValidate() {
  if (checkValueExistOrNot().length !== 0) {
    const inputBoxesWithoutValue = checkValueExistOrNot();
    inputBoxesWithoutValue.forEach((value) => addClass(value, "border-red"));
    errorHandle("please fill the required fields");
    return false;
  } else if (password.value !== confirmPassword.value) {
    errorHandle("password missmatch");
    return false;
  } else if (!email.value.match(mailFormat)) {
    errorHandle("please enter a valid mail");
    return false;
  } else if (!phoneNumber.value.match(phoneNumberFormat)) {
    errorHandle("please enter a valid phone number");
    return false;
  }
  if (editID) {
    update(editID);
    alert("user successfully updated");
  } else {
    signup();
    alert("user successfully created");
  }
}

async function update(id) {
  const updatedDetails = getInputValues();
  const response = await fetch(
    "http://localhost:3001/api/user/updateemployee",
    {
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, employeeData: updatedDetails }),
    }
  );
  const result = await response.json();
  return result.status;
}

function getInputValues() {
  if (!companyname) {
    companyname = companyNameElement.innerText;
  }
  if (!rolename) {
    rolename = roleNameElement.innerText;
  }

  return {
    firstName: firstName.value,
    lastName: lastName.value,
    userName: userName.value,
    email: email.value,
    password: password.value,
    phoneNumber: phoneNumber.value,
    role: rolename,
    company: companyname,
    joiningDate: joinignDate.value,
    employeeID: employeeID.value,
    createdDate,
  };
}

// to append error message in error element
function errorHandle(message) {
  addClass(errorElemnt, "show");
  errorElemnt.innerText = message;
}

// to check if there are any fields that are not filled
function checkValueExistOrNot() {
  return (element = requiredInputBoxArray.filter((data) => {
    if (!data.value) {
      return data;
    }
  }));
}

// to add class to element
function addClass(element, className) {
  element.classList.add(className);
}

function appendTextInElement(element, text) {
  element.innerText = text;
}

// to show element
function toggleElement(element) {
  element.classList.toggle("show");
}

// to hide element
function hide(element) {
  element.classList.remove("show");
}

function clearLocalStorage() {
  localStorage.clear();
}

function removeLocalStorage(key) {
  localStorage.removeItem(key);
}

function getLocalStorage(key) {
  return localStorage.getItem(key);
}
