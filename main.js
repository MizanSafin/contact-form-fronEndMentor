let formGroups = document.querySelectorAll(".form-group")
const radioDivs = document.querySelectorAll(".query-type")
const formEl = document.querySelector(".form")
const toast = document.querySelector(".toast")
let fromValid = true;

function changeRadioBG() {
  radioDivs.forEach((radioDiv) => {
    let radio = radioDiv.querySelector("input")
    if (radio.checked) {
      radioDiv.classList.add("radio-selected")
    } else {
      radioDiv.classList.remove("radio-selected")
    }
  })
}

function displayError(formGroup) {
  let spanEl = formGroup.querySelector(".error")
  spanEl.classList.remove("hidden")
}

function hideAllErrorMsg(formGroup) {
  let errSpan = formGroup.querySelector(".error");
 
  errSpan.classList.add("hidden")
}


// If submit success show toast message
function displayToast(){
    setTimeout(()=>{
       toast.classList.remove("hidden")
    },10)
    setTimeout(()=>{
       toast.classList.add("hidden")
    },4000)
}



/*Main form validation function */
function validateForm(formgroup) {
  let inputType = formgroup.querySelector("input , textarea").type
  switch (inputType) {
    case "radio":
      let checked = false
      let radios = formgroup.querySelectorAll("input")
      radios.forEach((radio) => {
        if (radio.checked) {
          checked = true
        }
      })
      if (!checked) {
        displayError(formgroup)
        fromValid = false
      }
     
      break;
    case "text":
      let input = formgroup.querySelector("input")
      if (input.value.trim() === "") {
        displayError(formgroup)
        fromValid = false
      }
      break
    case "textarea":
      let textareaEl = formgroup.querySelector("textarea");
      if (textareaEl.value.trim() === "") {
        displayError(formgroup)
        fromValid = false
      }
      break;
    case "checkbox":
        let checkbox = formgroup.querySelector("input");
        if(!checkbox.checked){
            displayError(formgroup);
            fromValid = false;
        }
        break;
    case "email":
        let email = formgroup.querySelector("input");
        let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(email.value.trim() === ""){
            displayError(formgroup);
            fromValid = false;
        }
        if(!emailPattern.test(email.value)){
            displayError(formgroup);
            fromValid = false;
        }
        break;

    default:
        break;

      }
}
// Show toast message immediately after domContent loaded immediate after successfull form submission
window.addEventListener("DOMContentLoaded",()=>{
    if(localStorage.getItem("showToast")){
        displayToast();
        localStorage.removeItem("showToast");
    }
})

//Form submit 
formEl.addEventListener("submit",(e)=>{
    e.preventDefault();
    fromValid = true;
    formGroups.forEach(formGroup=>{
        validateForm(formGroup)
    })
    if(fromValid){
        localStorage.setItem("showToast",true);
        formEl.submit()
    }
})



//input / textarea element click & blur event
formGroups.forEach((formGroup) => {
  let inputs = formGroup.querySelectorAll("input , textarea")
  inputs.forEach((input) => {
    input.addEventListener("click", () => {
      hideAllErrorMsg(formGroup)
    })
    input.addEventListener("blur", () => {
      validateForm(formGroup)
    })
  })
})


//Radio input element click event to change bg color
radioDivs.forEach((radioDiv) => {
  let radioInput = radioDiv.querySelector("input")
  radioDiv.addEventListener("click", () => {
    radioInput.checked = true
    changeRadioBG()
  })
})
