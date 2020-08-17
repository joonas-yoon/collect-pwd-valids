
'use strict';

(function() {
  // Validate lowercase letters
  function hasLower(str) {
    var lowerCaseLetters = /[a-z]/g;
    return (str || '').match(lowerCaseLetters);
  }

  // Validate capital letters
  function hasUpper(str) {
    var upperCaseLetters = /[A-Z]/g;
    return (str || '').match(upperCaseLetters);
  }

  // Validate numbers
  function hasNumber(str) {
    var numbers = /[0-9]/g;
    return (str || '').match(numbers);
  }

  // Validate ascii characters
  function isOnlyASCII(str) {
      return !hasLower(str) && !hasUpper(str) && !hasNumber(str) && /^[\x00-\x7F]*$/.test(str);
  }

  // Validate specific characters
  function hasCustomChars(str, characters) {
    return [...str].filter(x => !hasLower(x) && !hasUpper(x) && !hasNumber(x) && characters.indexOf(x) === -1) !== 0;
  }

  // Update element visually
  function validate(element, isValidated) {
    if (isValidated) {
      element.classList.add('is-valid');
      element.classList.remove('is-invalid');
    } else {
      element.classList.remove('is-valid');
      element.classList.add('is-invalid');
    }
  }

  function _$(id) {
    return document.getElementById(id);
  }

  var validations = [
    {
      target: _$('pwd-amazon'),
      minLength: 6,
      rules: [isOnlyASCII]
    },
    {
      target: _$('pwd-google'),
      minLength: 8,
      rules: [hasLower, hasNumber, hasUpper, isOnlyASCII],
      rulesMinCount: 2
    },
    {
      target: _$('pwd-reddit'),
      minLength: 6,
      rules: [isOnlyASCII]
    },
    {
      target: _$('pwd-twitter'),
      minLength: 10,
      rules: [hasLower, hasNumber, hasUpper, isOnlyASCII],
      rulesMinCount: 2
    },
  ];

  validations.forEach((rule, idx) => {
    rule.target.addEventListener('keyup', function(event) {
        event.preventDefault();
        event.stopPropagation();
        var result = true;
        var str = rule.target.value;
        result &= (rule.minLength || 0) <= str.length;
        result &= (rule.maxLength || Infinity) >= str.length;
        var valids = rule.rules.filter((f, i) => f(str));
        var rulesMinCount = rule.rulesMinCount || valids.length;
        result &= rulesMinCount <= valids.length;
        validate(rule.target, result);
    });
  });
})();