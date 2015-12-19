# backfeed
Simple Bootstrap 3 form validation without JQuery

##Prerequisites

- Backfeed assumes that you're using the Bootstrap 3 CSS framework.
- Each input validated must be in its own form-group.
- Each input validated must have a [glyphicon span for the validation icon](http://getbootstrap.com/css/#forms-control-validation).
- The input, it's form group, and its glyphicon span must have unique ids.

##Usage

When the page is ready, invoke backfeed like so:

```html
<div id="usernameInputGroup" class="form-group has-feedback">
  <label for="username" class="control-label sr-only">
    Username
  </label>
  <div class="input-group">
    <input id="usernameInput" class="form-control" name="username" type="text" maxlength="20" minlength="3" placeholder="johndoe1" required/>
    <span id="usernameInputStatus" class="glyphicon form-control-feedback" aria-hidden="true"></span>
  </div>
</div>
<script>
  var $usernameInput = document.getElementById('usernameInput');
  var $usernameInputStatus = document.getElementById('usernameInputStatus');
  var $usernameInputGroup = document.getElementById('usernameInputGroup');
  Backfeed.watch({
    username: {
      'input': $usernameInput,
      'status': $usernameInputStatus,
      'group': $usernameInputGroup
    }
    //additional inputs of the same form go here
  });
</script>
```
