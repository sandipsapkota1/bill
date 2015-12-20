# backfeed
Simple Bootstrap 3 form validation without JQuery

##Prerequisites

- Backfeed assumes that you're using the Bootstrap 3 CSS framework.
- Each input validated must be in its own form-group.
- The input must have a unique id.

##Usage

When the page is ready, invoke backfeed like so:

```html
<body>
    <div class="container">
        <div class="form-horizontal">
            <div class="form-group">
                <input class="form-control" name="username" id="usernameInput" minlength="4" maxlength="11" required>
            </div>
        </div>
    </div>
    <script src="../backfeed.js"></script>
    <script>
        function ready(fn) {
            if (document.readyState != 'loading') {
                fn();
            } else {
                document.addEventListener('DOMContentLoaded', fn);
            }
        }

        ready(function go() {
            Backfeed.watch({
                username: {
                    'input': 'usernameInput',
                }
                //additional inputs of the same form go here
            });
        });
    </script>
</body>
```
