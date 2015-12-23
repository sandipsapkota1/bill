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
  const baseStatusClass = 'glyphicon';
  const baseFeedbackClass = 'has-feedback';

  //attach change listeners to each input in array
  var watchInputs = function(inputList) {
    for (var i = 0; i < inputList.length; i++) {
      var currInput = document.getElementById(inputList[i]);
      _registerListener('keyup', currInput);
    }
  };

  //Watch all of the inputs within a form
  var watchForm = function(formId) {
    var form = document.getElementById(formId);
    var inputs = form.querySelectorAll('input');
    for (var i = 0; i < inputs.length; i++) {
      //_registerListener('keyup', inputs[i]);
      _registerListener('input', inputs[i]);
    }
  };

  //Traverse upward through the DOM to the nearest form group
  var _getParentFormGroup = function(element) {
    while (! element.parentNode.classList.contains(formGroupClass)) {
      element = element.parentNode;
    }
    var group = element.parentNode;
    if (! group.classList.contains(formGroupClass)) {
      return null; //there is no parent form-group
    }
    //ensure that the form-group has the has-feedback class
    if (! group.classList.contains(baseFeedbackClass)) {
      group.classList.add(baseFeedbackClass);
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
        //if there is a proper sibling, return it
        if (sibling.classList.contains(formControlFeedbackClass)) {
          return sibling;
        }
      }
    }
    //if no sibling was found, create one and return it.
    var status = document.createElement('span');
    status.classList.add(baseStatusClass);
    status.classList.add(formControlFeedbackClass)
    element.parentNode.appendChild(status);
    return status;
  };
  
  //Add an event listener to a single form input
  var _registerListener = function(eventName, element) {
    var type = element.getAttribute('type');
    switch(type) {//don't add listeners to these types
      case 'submit':
      case 'button':
      case 'hidden':
      case 'reset':
      case 'radio':
      case 'checkbox':
            return;
    }
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
    watchInputs: watchInputs,
    watchForm: watchForm
  }
})();
