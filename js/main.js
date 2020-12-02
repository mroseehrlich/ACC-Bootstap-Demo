/*
Name: Mia Ehrlich
Assignment: 06
Purpose: This is the main JS file using Jquery that performs client-side validation on a form
*/


"use strict";
$(document).ready(function() {
	//jQuery code goes here
        function validEmail(email) {
    /* do not modify this fucntion, use it as is */
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
    }

    function clearForm() {
        $('#nameBox').val("");
        $('#emailBox').val("");
        $('#emailBox2').val("");
        $('#subjectBox').val("");
        $('#messageBox').val("");
        $('#msg_content').html("Got a question? Fill out your information and I'll be in touch shortly.");
    }

    function validate() {

    
        var errorMessage = "";
        // Test function to turn off client side validation
        // return errorMessage;
        // Trim input values and save to variables

        var name = $('#nameBox').val().trim();
        var email = $('#emailBox').val().trim();
        var confirmEmail = $('#emailBox2').val().trim();
        var subject = $('#subjectBox').val().trim();
        var message = $('#messageBox').val().trim();

        // Tests form inputs for invalid or missing values and saves error messages
        if (name === "") {
            errorMessage += "Name cannot be empty.<br>";
        }

        if (subject === "") {
            errorMessage += "Subject cannot be empty.<br>";
        }

        if (message === "") {
            errorMessage += "Message cannot be empty.<br>";
        }

        if (!validEmail(email)) {
            errorMessage += "First email is not valid.<br>";
        }

        if (email !== confirmEmail) {
            errorMessage += "Emails must match.<br>";
        }

        if (!validEmail(confirmEmail)) {
            errorMessage += "Second email is not valid.<br>";
        }

        // Returns errors or empty string if form input is valid
        return errorMessage;
    }

    /* Event Handler for submit button */
    $('#submitBtn').click(function () {
        var msg = validate();

        if (msg === "") {
            // $('#msg_content').html("Sent!");
            $('#contactForm').submit();
        } else {
            $('#msg_content').html(msg);
        }
    });

    /* Event Handler for reset button */
    $('#resetBtn').click(function () {
        clearForm();
    });


    /* Remove focus from buttons after click event */

    $('.btn').mouseup(function() { 
        this.blur(); 
    });
});