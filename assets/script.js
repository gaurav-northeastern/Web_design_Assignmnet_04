const submitButton = document.querySelector('#submit-btn');

const regExName = /^[a-zA-Z]+$/; // Only letters
const regExEmail = /([\w\.]+)@([\w\.]+)\.(\w+)/; // Email format
const regExPhone = /^\d{3}-?\d{3}-?\d{4}$/; // Format xxx-xxx-xxxx
const regExZip = /^\d{5}(-\d{4})?$/; // 5 or 9 digits
const northeasternpattern = /([\w\.]+)@northeastern\.edu/; // NEU email pattern

function validateField(variable_name, value) {
    let isValid = true;

    if (variable_name === 'first_name' || variable_name === 'last_name') {
        if (!regExName.test(value) || value.trim() === '') {
            document.querySelector(`#${variable_name}_error`).style.display = 'block';
            isValid = false;
        } else {
            document.querySelector(`#${variable_name}_error`).style.display = 'none';
        }
    } else if (variable_name === 'email_address') {
        if (!northeasternpattern.test(value) || value.trim() === '') {
            document.querySelector(`#${variable_name}_error`).style.display = 'block';
            isValid = false;
        } else {
            document.querySelector(`#${variable_name}_error`).style.display = 'none';
        }
    } else if (variable_name === 'phone_number') {
        if (!regExPhone.test(value)) {
            document.querySelector(`#${variable_name}_error`).style.display = 'block';
            isValid = false;
        } else {
            document.querySelector(`#${variable_name}_error`).style.display = 'none';
        }
    } else if (variable_name === 'zip_code') {
        if (!regExZip.test(value)) {
            document.querySelector(`#${variable_name}_error`).style.display = 'block';
            isValid = false;
        } else {
            document.querySelector(`#${variable_name}_error`).style.display = 'none';
        }
    } else if (variable_name === 'address') {
        if (value.trim() === '') {
            document.querySelector(`#${variable_name}_error`).style.display = 'block';
            isValid = false;
        } else {
            document.querySelector(`#${variable_name}_error`).style.display = 'none';
        }
    }

    return isValid;
}

function handleChange(value, variable_name) {
    const titleSelected = document.querySelector('input[name="title"]:checked') !== null;

    let isSubmit = validateField(variable_name, value);

    // Check if all required fields are valid
    if (titleSelected) {
        document.querySelector('#title_error').style.display = 'none'; // Hide title error if selected
    } else {
        isSubmit = false; // Title is not selected
        document.querySelector('#title_error').style.display = 'block'; // Show title error
    }

    // Enable the submit button only if all required fields are valid
    submitButton.disabled = !(isSubmit && titleSelected);
}

const dyvalues = ['Masala Tea', 'Cold Coffee', 'Sweet Milk', 'Black cold drink'];
function isdynamic(e) {
    let dynamictext = dyvalues[e - 1];
    if (dynamictext) {
        document.querySelector('.isdynamic_val').textContent = dynamictext;
        document.querySelector('.d-none').style.display = 'block';
    } else {
        document.querySelector('.isdynamic_val').textContent = '';
        document.querySelector('.d-none').style.display = 'none';
    }
}

function isCompulsary() {
    const checkbox = document.getElementById('selects-checkbox');
    const textField = document.getElementById('isdynamic_text_field');

    if (checkbox.checked) {
        textField.setAttribute('required', true);
        textField.style.display = 'block';
    } else {
        textField.style.display = 'none';
    }
}

function handleSubmit(event) {
    event.preventDefault();  // Prevent form from submitting

    // Get form data
    const form = event.target; // The form element that triggered the event
    const title = form.title.value; // Get the value of the selected radio button
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const emailId = form.emailId.value;
    const phoneNumber = form.phoneNumber.value;
    const zipcode = form.zipcode.value;
    const address = form.address.value;
    const address2 = form.address2.value || 'N/A'; // Default to 'N/A' if Address 2 is not provided
    const comments = form.comments.value; // Retrieve comments
    const drink = form.selects.options[form.selects.selectedIndex].text; // Retrieve selected drink text

    // Insert data into the table
    const tableBody = document.querySelector("#dataTable tbody");
    const newRow = document.createElement("tr");

    newRow.innerHTML = `
        <td>${title}</td>
        <td>${firstName}</td>
        <td>${lastName}</td>
        <td>${emailId}</td>
        <td>${phoneNumber}</td>
        <td>${zipcode}</td>
        <td>${address}</td>
        <td>${address2}</td>
        <td>${comments}</td>  <!-- Add comments to the table -->
        <td>${drink}</td>     <!-- Add drink to the table -->
    `;

    tableBody.appendChild(newRow);  // Append the new row to the table body

    // Optionally clear the form fields after submission
    form.reset();
    submitButton.disabled = true;  // Disable the submit button after form submission
}
