const formReg = {
    // Event listeners
    eventKeyup : function(){
        form = document.getElementById('form'),
        form.addEventListener('keyup', function(e) {
            e.preventDefault();
            username = document.getElementById('username'),
            email = document.getElementById('email'),
            password = document.getElementById('password'),
            password2 = document.getElementById('password2'),
        
            //Show input error message 
            showError = function(input, message){
                const formControl = input.parentElement;
                formControl.className = 'form-control error';
                const small = formControl.querySelector('small')
                small.innerText = message;
            },
            showSuccess = function(input) {
                const formControl = input.parentElement;
                formControl.className = 'form-control success';
            },
              
              // Check email is valid
            checkEmail = function(input) {
                const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (re.test(input.value.trim())) {
                  showSuccess(input);
                } else {
                  showError(input, 'Email is not valid');
                }
            },
              
              // Check required fields
            checkRequired = function(inputArr) {
                inputArr.forEach(function(input) {
                  if (input.value.trim() === '') {
                    showError(input, `${getFieldName(input)} is required`);
                  } else {
                    showSuccess(input);
                  }
                });
            },
              
              // Check input length
            checkLength = function(input, min, max) {
                if (input.value.length < min) {
                  showError(
                    input,
                    `${getFieldName(input)} must be at least ${min} characters`
                  );
                } else if (input.value.length > max) {
                  showError(
                    input,
                    `${getFieldName(input)} must be less than ${max} characters`
                  );
                } else {
                  showSuccess(input);
                }
            },
            // Check passwords match
            checkPasswordsMatch = function(input1, input2) {
                if (input1.value !== input2.value) {
                showError(input2, 'Passwords do not match');
                }
            },
            
            // Get fieldname
            getFieldName = function(input) {
                return input.id.charAt(0).toUpperCase() + input.id.slice(1);
            },
        
            checkRequired([username, email, password, password2]);
            checkLength(username, 3, 15);
            checkLength(password, 6, 25);
            checkEmail(email);
            checkPasswordsMatch(password, password2);
        });
    },
}
formReg.eventKeyup();
// formReg.eventSubmit();
console.log(formReg);