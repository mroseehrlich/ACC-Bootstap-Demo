<?php
/*
Name: Mia Ehrlich
Assignment: 05
Purpose: This is the PHP file that performs server-side
    validation upon form submission
*/

// this simply dumps the posted information back to the browser
// var_dump($_POST);


function redirect($url) {
    // this captures any server output
    ob_start();
    // this sets the http headers to redirect
    header('Location: ' . $url);
    // this sends out all the redirect information all at once
    ob_end_flush();
    // this makes sure no further output is sent
    die();
}

function main() {
    /* This will test to make sure we have a non-empty $_POST array from
     * the form submission. */
    if (!empty($_POST)) {

        /* Each of these will strip anything harmful or extraneous out
         * of the submitted $_POST variables. */
        $name = substr(strip_tags(trim($_POST['name'])), 0, 64);
        $subject = substr(strip_tags(trim($_POST['subject'])), 0, 64);
        $message = substr(strip_tags(trim($_POST['message'])), 0, 1000);
        // //Validate email with bultin php filter
        $from = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);

        /* The cleaning routines above may leave a variable empty. If we
         * find an empty variable, we stop processing because that means
         * someone tried to send us something malicious or incorrect. */
        if (!empty($name) && !empty($subject) && !empty($message) && !empty($from)) {
            // Create headers for email
            $headers = "From: $from\r\n";
            $headers .= "Reply-To: $from\r\n";
            $headers .= "MIME-Version: 1.0\r\n";
            $headers .= "Content-type: text/plain; charset=iso-8859-1\r\n";
            // Send email
            $mail_sent = mail('mia.ehrlich@g.austincc.edu', $subject . ' : ' . $name, $message, $headers);
            /*
             * this sends the data back to the success page in the query string
             * we will learn how to process query strings later
             */
            if($mail_sent) {
                redirect("email-success.html");
            } else {
                redirect("email-error.html");
            }
        } else {
            /*
             * this sends an error code back the error page in the query string
             * we will learn how to process query strings later
             */
            redirect('email-error.html');
        }       
    } else {
            /*
             * this sends an error code back the error page in the query string
             * we will learn how to process query strings later
             */
        redirect('error.html?error=1');
    }
}

// this kicks off the script
main();
