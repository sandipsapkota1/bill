/* backfeed.js */
var Backfeed = (function() {
  "use strict";
  //define classes to add/remove
  const errorStatusClass = 'glyphicon-remove';
  const errorGroupClass = 'has-error';
  const successStatusClass = 'glyphicon-ok';
  const successGroupClass = 'has-success';

  //attach change listeners to each input
  var watchInputs = function(inputList) {
    for (let formInput in inputList) {
      console.log(inputList[formInput]);
      var currInput = inputList[formInput];
      var inputStatus = currInput['status'];
      var inputGroup = currInput['group'];
      _registerListener('keyup', currInput['input'], currInput['status'], currInput['group']);
    }
  };
  
  //Add an event listener to a single form input
  var _registerListener = function(eventName, element, status, group) {
    element.addEventListener(eventName, function invoke(event) {
      _updateStatus(event, status, group);
    }, false);
  };

  //update the classes of the usernameInput field
  var _updateStatus = function(event, statusTag, groupTag) {
    var statusClasses = statusTag.classList;
    var groupClasses = groupTag.classList;
    if (event.target.checkValidity()) {
      //contents are valid
      if (!statusClasses.contains(successStatusClass)) {
        statusClasses.add(successStatusClass);
      }
      if (!groupClasses.contains(successGroupClass)) {
        groupClasses.add(successGroupClass);
      }
      if (statusClasses.contains(errorStatusClass)) {
        statusClasses.remove(errorStatusClass);
      }
      if (groupClasses.contains(errorGroupClass)) {
        groupClasses.remove(errorGroupClass);
      }
    } else {
      //contents are invalid
      if (statusClasses.contains(successStatusClass)) {
        statusClasses.remove(successStatusClass);
      }
      if (groupClasses.contains(successGroupClass)) {
        groupClasses.remove(successGroupClass);
      }
      if (!statusClasses.contains(errorStatusClass)) {
        statusClasses.add(errorStatusClass);
      }
      if (!groupClasses.contains(errorGroupClass)) {
        groupClasses.add(errorGroupClass);
      }
    }
  };
  
  return {
    watch: watchInputs,
  }
})();
