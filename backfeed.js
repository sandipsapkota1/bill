/* backfeed.js */
var Backfeed = (function() {
  "use strict";
  //define classes to add/remove
  const errorStatusClass = 'glyphicon-remove';
  const errorGroupClass = 'has-error';
  const successStatusClass = 'glyphicon-ok';
  const successGroupClass = 'has-success';
  const formGroupClass = 'form-group';
  const formControlFeedbackClass = 'form-control-feedback';

  //attach change listeners to each input
  var watchInputs = function(inputList) {
    for (let formInput in inputList) {
      var currInput = inputList[formInput];
      _registerListener('keyup', currInput['input'], currInput['status']);
    }
  };

  //Traverse upward through the DOM to the nearest form group
  var _getParentFormGroup = function(element) {
    while (! element.parentNode.classList.contains(formGroupClass)) {
      element = element.parentNode;
    }
    return element.parentNode;
  };

  //Traverse input siblings to find sibling form-control-feedback
  var _getSiblingFormControlFeedback = function(element) {
    var siblingsInclusive = element.parentNode.children;
    var sibling;
    for (var i = 0; i < siblingsInclusive.length; i ++) {
      sibling = siblingsInclusive[i];
      if (sibling !== element) {
        if (sibling.classList.contains(formControlFeedbackClass)) {
          return sibling;
        }
      }
    }
    return null;
  };
  
  //Add an event listener to a single form input
  var _registerListener = function(eventName, element, status) {
    element = document.getElementById(element);
    var status = _getSiblingFormControlFeedback(element);
    var group = _getParentFormGroup(element);
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
    watch: watchInputs
  }
})();
