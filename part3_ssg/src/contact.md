---
layout: base.njk
title: Contact
description: Contact me!
---

<main>
        <h2>Get in Touch!</h2>
        <p><strong>My availability is flexible!</strong> I would <em>love</em> to work with you!</p>

        <fieldset>
            <legend>Send me your information!</legend>

            <form id="contactform" method="post" action="#">
                <label for="name">Name: </label>
                <input type="text" name="name" id="name" required minlength="2" maxlength="50" pattern="[A-Za-z\s'-]+" title="textbox to enter your name"><br>
                <output id="name-output" for="name" aria-live="polite"></output>

                <div class="error"></div>

                <label for="email">Email: </label>
                <input type="email" name="email" id="email" required minlength="10" maxlength="100" pattern="[A-Za-z\s'-]+" title="textbox to enter your email"><br>
                <output id="email-output" for="email" aria-live="polite"></output>
            

                <label for="message">Anything else you want me to know!</label><br>
                <textarea id="message" name="message" rows="5" cols="33"></textarea>

                <!-- hidden field for the errors encountered -->
                <input type="hidden" name="form-errors" id="form-errors">

                <button type="submit" id="button1">Submit</button>
            </form>
        </fieldset>
    </main>