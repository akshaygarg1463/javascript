document.addEventListener("DOMContentLoaded", function () {
    var state = document.getElementById("state");
    if (state) {
        state.addEventListener("change", displaynewfeilds);
    }

    var form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();
           
        });
    }
});

const webField = labelmaker("Website Domain Name", "web", "Domain Name", "web");
const projectField = labelmaker("Project Description", "project", "Project Description", "project");
const zipField = labelmaker("Zip Code", "zip", "Zip Code", "zip");


const hostingField = (function () {
    var wrapper = document.createElement("div");
    wrapper.className = "field-wrapper";
    wrapper.style.display = "flex";
    wrapper.style.flexDirection = "row";
   wrapper.style.marginLeft ="2px"

    var label = document.createElement("label");
    label.className = "required";
    label.innerText = "Do you have hosting?";

    var yes = document.createElement("input");
    yes.type = "radio";
    yes.value = "Yes";
    yes.name = "hosting";

    var no = document.createElement("input");
    no.type = "radio";
    no.value = "No";
    no.name = "hosting";

    var yestext = document.createTextNode(" Yes ");
    var notext = document.createTextNode(" No ");

    var temp1 = document.createElement("div");
    temp1.appendChild(yes);
    temp1.appendChild(yestext);

    var temp2 = document.createElement("div");
    temp2.appendChild(no);
    temp2.appendChild(notext);

    var temp3 = document.createElement("div");
    temp3.appendChild(temp1);
    temp3.appendChild(temp2);
    temp3.style.display = "flex";
    temp3.style.flexDirection = "column";
    temp3.style.gap = "20px";
    temp3.style.marginTop = "5px";

    var error = document.createElement("div");
    error.className = "hostingerror error-message";
    error.style.color = "red";
    error.style.fontSize = "14px";
    error.style.marginTop = "2px";
    error.style.display = "none";
    
    wrapper.appendChild(label);
    wrapper.appendChild(temp3);
    wrapper.appendChild(error);
    wrapper.classList.add("dynamic-field");
    return wrapper;
})();
function displaynewfeilds() {
    var state = document.getElementById("state");
    var selectedstate = state.value;

  
    var previousFields = document.querySelectorAll(".dynamic-field");
    previousFields.forEach(function(field) {
        field.remove();
    });

    var stateDiv = document.getElementById("statediv");

    if (selectedstate === "Rajasthan") {
        stateDiv.after(webField);
        stateDiv.after(projectField);

    } else if (selectedstate === "Haryana") {
        stateDiv.after(zipField);
        stateDiv.after(hostingField);

    } else if (selectedstate === "Maharastra") {
        stateDiv.after(zipField);
        stateDiv.after(projectField);
    }
}

function labelmaker(title, name, place, className) {
    var wrapper = document.createElement("div");
    wrapper.className = "field-wrapper";
    wrapper.style.display = "flex";
    wrapper.style.flexDirection = "row";
    wrapper.style.marginBottom = "10px";

    var label = document.createElement("label");
    label.className = "required";
    label.innerText = title;

    var inputContainer = document.createElement("div");
    inputContainer.style.display = "flex";
    inputContainer.style.alignItems = "flex-start";
    
    var im = checksvg(title);

    var inputWrapper = document.createElement("div");
    inputWrapper.style.display = "flex";
    inputWrapper.style.flexDirection = "column";

    var input = document.createElement("input");
    input.type = "text";
    input.id = name;
    input.placeholder = place;
    input.className = className;
    input.style.height = "20px";

    var errorDiv = document.createElement("div");
    errorDiv.className = className + "error";
    errorDiv.style.color = "red";
    errorDiv.style.display = "none";
    errorDiv.style.fontSize = "14px";
    errorDiv.style.marginTop = "2px";

    inputWrapper.appendChild(input);
    inputWrapper.appendChild(errorDiv);

    inputContainer.appendChild(im);
    inputContainer.appendChild(inputWrapper);

    wrapper.appendChild(label);
    wrapper.appendChild(inputContainer);
    wrapper.classList.add("dynamic-field");
    return wrapper;
}



function setError(input, message, errorblock) {
    input.style.border = "2px solid red";
    errorblock.style.display = "block";
    errorblock.style.color = "red";
    errorblock.innerText = message;
}

function clearError(input, errorblock) {
    input.style.border = "1px solid #ccc";
    if (errorblock) {
        errorblock.style.display = "none";
    }
}

function validate() {
    var error = [];

    var firstInput = document.getElementById("first");
    var lastInput = document.getElementById("last");
    var phoneInput = document.getElementById("phone");
    var emailInput = document.getElementById("email");
    var stateInput = document.getElementById("state");
    var addressInput = document.getElementById("address");
    var cityInput = document.getElementById("city");

    var zipInput = document.querySelector(".zip");
    var projectInput = document.querySelector(".project");
    var webInput = document.querySelector(".web");
    var hostingInput = document.querySelector('input[name="hosting"]:checked');

    if (!validInput(firstInput.value)) {
        setError(firstInput, "First name is required", document.getElementById("firsterror"));
        error.push("First name is empty");
    } else {
        clearError(firstInput, document.getElementById("firsterror"));
    }

    if (!validInput(lastInput.value)) {
        setError(lastInput, "Last name is required", document.getElementById("lasterror"));
        error.push("Last name is empty");
    } else {
        clearError(lastInput, document.getElementById("lasterror"));
    }

    if (!regexchecker(phoneInput.value, /^\d{10}$/)) {
        setError(phoneInput, "Phone number must be 10 digits", document.getElementById("phoneerror"));
        error.push("Phone number must be 10 digits");
    } else {
        clearError(phoneInput, document.getElementById("phoneerror"));
    }

    if (!regexchecker(emailInput.value, /^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]+$/)) {
        setError(emailInput, "Email must be valid (e.g. abc@xyz.com)", document.getElementById("emailerror"));
        error.push("Invalid email");
    } else {
        clearError(emailInput, document.getElementById("emailerror"));
    }

    if (!validInput(addressInput.value)) {
        setError(addressInput, "Address is required", document.getElementById("addresserror"));
        error.push("Address is empty");
    } else {
        clearError(addressInput, document.getElementById("addresserror"));
    }

    if (!validInput(cityInput.value)) {
        setError(cityInput, "City is required", document.getElementById("cityerror"));
        error.push("City is empty");
    } else {
        clearError(cityInput, document.getElementById("cityerror"));
    }

    if (stateInput.value === "") {
        setError(stateInput, "Please select a state", document.getElementById("stateerror"));
        error.push("State is empty");
    } else {
        clearError(stateInput, document.getElementById("stateerror"));
    }

    if (zipInput) {
        var zipError = document.querySelector(".ziperror");
        if (!regexchecker(zipInput.value, /^\d{6}$/)) {
            setError(zipInput, "Zip code must be 6 digits", zipError);
            error.push("Invalid zip code");
        } else {
            clearError(zipInput, zipError);
        }
    }

    if (projectInput) {
        var projectError = document.querySelector(".projecterror");
        if (!validInput(projectInput.value)) {
            setError(projectInput, "Project Description is required", projectError);
            error.push("Project description is empty");
        } else {
            clearError(projectInput, projectError);
        }
    }

    if (webInput) {
        var webError = document.querySelector(".weberror");
        if (!validInput(webInput.value)) {
            setError(webInput, "Website Domain Name is required", webError);
            error.push("Website Domain is empty");
        } else {
            clearError(webInput, webError);
        }
    }

    if (stateInput.value === "Haryana") {
        var hostingError = document.querySelector(".hostingerror");
        if (!hostingInput) {
            hostingError.style.display = "block";
            hostingError.innerText = "Please select hosting option";
            error.push("Hosting not selected");
        } else {
            hostingError.style.display = "none";
        }
    }

    if (error.length > 0) {
        alert("Errors:\n" + error.join("\n"));
    } else {
        var detail = {
            firstName: firstInput.value,
            lastName: lastInput.value,
            phone: phoneInput.value,
            email: emailInput.value,
            address: addressInput.value,
            city: cityInput.value,
            zip: zipInput ? zipInput.value : "",
            project: projectInput ? projectInput.value : "",
            web: webInput ? webInput.value : "",
            hosting: hostingInput ? hostingInput.value : "",
            state: stateInput.value
        };

        localStorage.setItem("userData", JSON.stringify(detail));
        window.location.href = "result.html";
    }
}

function validInput(input) {
    return input.trim() !== "";
}

function regexchecker(input, regex) {
    return regex.test(input);
}

function checksvg(title) {
    var div = document.createElement("div");
    div.style.display = "inline";
    div.style.border = "0.5px solid grey";
    div.style.padding = "2px";
    div.style.height = "17px";
    div.style.paddingTop = "5px";
    

    if (title === "Website Domain Name") {
        div.innerHTML = '<svg width="18px" height="18px" fill="#1C274C" version="1.1" id="Layer_1" xmlns:x="&amp;ns_extend;" xmlns:i="&amp;ns_ai;" xmlns:graph="&amp;ns_graphs;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="64px" height="64px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" stroke="#1C274C" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <metadata> <sfw xmlns="&amp;ns_sfw;"> <slices> </slices> <slicesourcebounds width="505" height="984" bottomleftorigin="true" x="0" y="-552"> </slicesourcebounds> </sfw> </metadata> <g> <g> <g> <path d="M12,24C5.4,24,0,18.6,0,12S5.4,0,12,0s12,5.4,12,12S18.6,24,12,24z M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10 S17.5,2,12,2z"></path> </g> </g> <g> <g> <path d="M6.5,22.5c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l0.4-0.4l0.8-2.4l-0.7-1.4l-2.8-1.9C3.2,14.6,3,14.3,3,14v-3 c0-0.4,0.3-0.8,0.7-0.9l2.8-0.9l1.2-1.2l-3-4.2C4.4,3.3,4.5,2.6,4.9,2.3C5.4,2,6,2.1,6.3,2.5l3.5,4.9c0.3,0.4,0.2,0.9-0.1,1.3 l-2,2c-0.1,0.1-0.2,0.2-0.4,0.2L5,11.7v1.7l2.6,1.7c0.1,0.1,0.3,0.2,0.3,0.4l1,2C9,17.8,9,18.1,8.9,18.3l-1,3 c0,0.1-0.1,0.3-0.2,0.4l-0.5,0.5C7,22.4,6.7,22.5,6.5,22.5z"></path> </g> </g> <g> <g> <path d="M16,19c-0.2,0-0.3,0-0.4-0.1l-2-1c-0.2-0.1-0.4-0.3-0.4-0.4l-1-2c-0.1-0.3-0.1-0.6,0-0.9l0.9-1.8V11c0-0.6,0.4-1,1-1h1.5 l2.7-3.6c0,0,0.1-0.1,0.1-0.1L20,4.6c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-1.7,1.7l-3,3.9C16.6,11.9,16.3,12,16,12h-1v1 c0,0.2,0,0.3-0.1,0.4L14.1,15l0.6,1.3l1.1,0.5l1.4-1.4l0.9-1.9c0.2-0.3,0.5-0.5,0.8-0.6c0.4,0,0.7,0.1,0.9,0.4l1.9,2.8l0.4,0.2 c0.5,0.2,0.7,0.9,0.4,1.3c-0.2,0.5-0.9,0.7-1.3,0.4l-0.6-0.3c-0.2-0.1-0.3-0.2-0.4-0.3l-1-1.6l-0.2,0.5c0,0.1-0.1,0.2-0.2,0.3 l-2,2C16.5,18.9,16.3,19,16,19z"></path> </g> </g> </g> </g></svg>';
    } else if (title === "Project Description") {
        div.innerHTML = `<svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.5 5.5L18.3 8.3M3 21L3.05 20.67C3.21 19.49 3.3 18.9 3.49 18.35C3.66 17.87 3.89 17.41 4.18 16.98C4.5 16.5 4.92 16.08 5.76 15.24L17.41 3.59C18.19 2.81 19.46 2.81 20.24 3.59C21.02 4.37 21.02 5.64 20.24 6.42L8.38 18.28C7.62 19.04 7.23 19.42 6.8 19.72C6.42 19.99 6 20.22 5.56 20.39C5.07 20.58 4.54 20.69 3.49 20.9L3 21Z" stroke="#1C274C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    } else if (title === "Zip Code") {
        div.innerHTML = `<svg width="18px" height="18px" viewBox="0 0 16 16" fill="#1C274C" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 0L0 6V8H1V15H4V10H7V15H15V8H16V6L14 4.5V1H11V2.25L8 0ZM9 10H12V13H9V10Z"/></svg>`;
    }

    return div;
}
