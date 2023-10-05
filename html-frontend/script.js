const userNameInputBox = document.querySelector("[data-username]");
const passwordInputBox = document.querySelector("[data-password]");
const errorElements = document.querySelectorAll(".error");
const loginBtn = document.querySelector("[data-login-button]");
const form = document.querySelector("[data-login-button]");

const formValidate = () => {
  if (!userNameInputBox.value && !passwordInputBox.value) {
    addClass(userNameInputBox,"red-border")
    errorHandle( errorElements[1], "username is required");
    addClass(passwordInputBox,"red-border")
    errorHandle( errorElements[2], "password is required");
    return false;
  } else if (!userNameInputBox.value) {
    addClass(userNameInputBox,"red-border")
    errorHandle( errorElements[1], "username is required");
    return false;
  } else if (!passwordInputBox.value) {
    addClass(passwordInputBox,"red-border")
    errorHandle( errorElements[2], "password is required");
    return false;
  }
 login()
};

const login =async () =>{
  try {
    const response = await fetch("http://localhost:3001/api/auth/login", {
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userName:userNameInputBox.value,
      password:passwordInputBox.value
    }),
  });
  const result = await response.json();
 
  if(!result.profile){
     // showing error in dom
    addClass(passwordInputBox,"red-border")
    addClass(userNameInputBox,"red-border")
    errorHandle(errorElements[0],result.message)
  }else{
    // setting userid and role in localstorage
    setLocalStorage("profile",JSON.stringify(result.profile))
    window.location.href = "/dashboard/dashboard.html"
  }

  } catch (error) {
    console.log(error)
  }
}

loginBtn.addEventListener("click", formValidate);

function setLocalStorage(key,value){
  localStorage.setItem(key,value)
}

function errorHandle( element, message) {
  addClass(element, "show");
  element.innerText = message;
}

function addClass(element, classname) {
  element.classList.add(classname);
}
