const addUserBtn = document.querySelector("[data-add-user-button]");
const profileDropBtn = document.querySelector("[data-profile-drop-btn]");
const profileDropDown = document.querySelector("[data-profile-dropdown]");
const employeeBoxTemplate = document.querySelector(
  "[data-employee-box-template]"
);
const templateParent = document.querySelector("[data-template-parent]");
const actionTitle = document.querySelector("[data-action-title]");
const profileName = document.querySelector("[data-profile-name]");
let userProfile;

window.addEventListener("load", () => {
  userProfile = getLocalStorage("profile");
  profileName.innerText = userProfile.role;
  if (userProfile) {
    fetchEmployees();
  }
});

addUserBtn.addEventListener("click", () => {
  window.location.href = "/add-user/add-user.html";
});

profileDropBtn.addEventListener("click", () => {
  toggleElement(profileDropDown);
});

profileDropDown.addEventListener("click", logout);

function logout() {
  clearLocalStorage();
  window.location.href = "/";
}

const fetchEmployees = async () => {
  templateParent.innerHTML = "";
  const response = await fetch(
    "http://localhost:3001/api/user/fetchemployees",
    {
      method: "get",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const result = await response.json();

  //   check if the data exist in result and then depend on that
  //   generating dom elements
  if (result.employees) {
    result.employees.forEach((employee) => {
      generateEmployeeBoxes(employee);
    });
  }
};

const deleteEmployee = async (id) => {
  fetch(`http://localhost:3001/api/user/deleteemployee?id=${id}`, {
    method: "DELETE",
  })
    .then(async (response) => {
      const result = await response.json();
      fetchEmployees();
    })
    .catch((err) => {
      console.log(err);
    });
};

function generateEmployeeBoxes(employeeData) {
  const { firstName, lastName, email, company, createdDate, role, _id } =
    employeeData;
  const name = `${firstName} ${lastName}`;

  let template = employeeBoxTemplate.content.cloneNode(true);
  template.querySelector("[data-employee-name]").innerText = name;
  template.querySelector("[data-employee-email]").innerText = email;
  template.querySelector("[data-employee-company]").innerText = company;
  template.querySelector("[data-employee-created-date]").innerText =
    createdDate;
  template.querySelector("[data-employee-role]").innerText = role;
  const actionButton = template.querySelector("[data-action-button]");
  const actionBox = template.querySelector("[data-action-box]");
  const actionContainer = template.querySelector("[data-action]");
  const roleBox = template.querySelector("[data-role-box]");
  const editBtn = template.querySelector("[data-edit-btn]");
  const deleteBtn = template.querySelector("[data-delete-btn]");

  //removing action and adduser action depends on the role
  if (userProfile.role === "Employee") {
    addClass(actionTitle, "hide");
    addClass(actionContainer, "hide");
    addClass(addUserBtn, "hide");
  }

  //styling role box depends on the employeee role
  if (role === "Admin") {
    addClass(roleBox, "admin");
  }

  deleteBtn.addEventListener("click", () => {
    deleteEmployee(_id);
  });

  editBtn.addEventListener("click", () => {
    setLocalStorage("editID", _id);
    window.location.href = "/add-user/add-user.html";
  });

  //adding click action to action button
  actionButton.addEventListener("click", () => {
    toggleElement(actionBox);
    actionButton.classList.toggle("color-blue");
  });

  templateParent.appendChild(template);
}

function addClass(element, className) {
  element.classList.add(className);
}

const toggleElement = (element) => {
  element.classList.toggle("show");
};

function clearLocalStorage() {
  localStorage.clear();
}

function setLocalStorage(key, value) {
  localStorage.setItem(key, value);
}

function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
