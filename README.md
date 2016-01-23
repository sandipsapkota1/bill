# bill
Simple Bootstrap 3 form validation without JQuery.

Bill uses the HTMLFormInput API's knowledge of itself to apply styling to valid HTML inputs in a form. It makes no attempt to enforce rules, and will not catch any violation of format that the browser's implementation of HTML input validation would not catch.

The name comes from Bootstrap Bill Turner in Pirates of the Carribean.

##Prerequisites

- Bill assumes that you're using the Bootstrap 3 CSS framework.
- Each input validated must be in its own form-group.
- The input must have a unique id (if invoking watchInputs).
- The form must have a unique id (if invoking watchForm).

##Usage

When the page is ready, call Bill on your form inputs in one of two ways:

- Bill.watchInputs() accepts an array of input ids.
- Bill.watchForm() accepts the id of the parent element of many inputs and activates form feedback on all of them.

**Bill ignores inputs with the following types:**
- **submit**
- **button**
- **hidden**
- **reset**
- **radio**
- **checkbox**

```html
<body>
    <div class="container">
        <div id="test-form" class="form-horizontal">
            <div class="form-group">
                <input class="form-control" name="username" id="usernameInput" type="text" minlength="4" maxlength="11" required>
            </div>
            <div class="form-group">
                <input class="form-control" name="email" id="emailInput" type="email" minlength="4" maxlength="11" required>
            </div>
        </div>
        <div id="test-form2" class="form-horizontal">
            <div class="form-group">
                <input class="form-control" name="password" type="password" minlength="4" maxlength="11" required>
            </div>
            <div class="form-group">
                <input class="form-control" name="confirm" type="password" minlength="4" maxlength="11" required>
            </div>
        </div>
    </div>
    <script src="/path/to/bill.js"></script>
    <script>
        function ready(fn) {
            if (document.readyState != 'loading') {
                fn();
            } else {
                document.addEventListener('DOMContentLoaded', fn);
            }
        }

        ready(function go() {
            //invoke with array of ids, each corresponding to an input
            Bill.watchInputs(['usernameInput', 'emailInput']);
            
            //invoke with id of a form
            Bill.watchForm('test-form2');
        });
    </script>
</body>
```
