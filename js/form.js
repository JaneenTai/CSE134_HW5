const form = document.querySelector("#contactform");

form.addEventListener("submit", (event) => {
    const errors = [];
    let currInvalid = null;

    // check every form
    form.querySelectorAll("input, textarea, select").forEach(field => {
        // ignore the hidden field
        if (field.type === "hidden"){
            return;
        }
        
        const msg = document.querySelector(`#${field.id}-output`);

        // clear out the previous message
        if (msg) {
            msg.textContent = "";
        }

        if (field.validity.valid){
            return;
        }

        event.preventDefault();

        if (!currInvalid) {
            currInvalid = field;
        }

        let errorType = "";
        let message = "";

        if (field.validity.valueMissing) {
            errorType = "valueMissing";
            message = "This field is required.";
        }
        else if (field.validity.typeMismatch) {
            errorType = "typeMismatch";
            message = "Please enter a valid value.";
        }
        else if (field.validity.tooShort) {
            errorType = "tooShort";
            message = `Must be at least ${field.minLength} characters.`;
        }
        else if (field.validity.patternMismatch) {
            errorType = "patternMismatch";
            message = "Please match the requested format.";
        }
        else {
            errorType = "invalid";
            message = "Please correct this field.";
        }

        // Write message into associated <output>
        if (msg) {
            msg.textContent = message;
        }

        // Store structured error information
        errors.push({
            field: field.name,
            errorType,
            timestamp: new Date().toISOString()
        })

        // Move keyboard focus to first invalid field
        if (currInvalid) {
            currInvalid.focus();
        }

        // Store JSON in hidden input
        hiddenErrors.value = JSON.stringify(errors);
    })
})