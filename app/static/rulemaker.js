var conditions, actions, nameField, ageField, occupationField, submit;
(function($) {
  var occupationOptions = [
    {label: "", name: ""},
    {label: "Software Engineer", name: "software-engineer"},
    {label: "Biz Dev", name: "biz-dev"},
    {label: "Marketing", name: "marketing"}
  ];

  function onReady() {
    conditions = $("#conditions");

    nameField = $("#nameField");
    occupationField = $("#occupationField");
    ageField = $("#ageField");
    submit = $("#submit");

    initializeConditions();
    initializeForm();
  }

  function initializeConditions() {
    conditions.conditionsBuilder({
      fields: [
        {label: "First Name", name: "firstnameField", operators: [
          {label: "is present", name: "present", fieldType: "none"},
          {label: "is blank", name: "blank", fieldType: "none"},
          {label: "is equal to", name: "equalTo", fieldType: "text"},
          {label: "is not equal to", name: "notEqualTo", fieldType: "text"},
          {label: "includes", name: "includes", fieldType: "text"},
          {label: "matches regex", name: "matchesRegex", fieldType: "text"}
        ]},
        {label: "Age", name: "ageField", operators: [
          {label: "is present", name: "present", fieldType: "none"},
          {label: "is blank", name: "blank", fieldType: "none"},
          {label: "is equal to", name: "equalTo", fieldType: "text"},
          {label: "is not equal to", name: "notEqualTo", fieldType: "text"},
          {label: "is greater than", name: "greaterThan", fieldType: "text"},
          {label: "is greater than or equal to", name: "greaterThanEqual", fieldType: "text"},
          {label: "is less than", name: "lessThan", fieldType: "text"},
          {label: "is less than or equal to", name: "lessThanEqual", fieldType: "text"},
        ]},
        {label: "Occupation", name: "occupationField", options: occupationOptions, operators: [
          {label: "is present", name: "present", fieldType: "none"},
          {label: "is blank", name: "blank", fieldType: "none"},
          {label: "is equal to", name: "equalTo", fieldType: "select"},
          {label: "is not equal to", name: "notEqualTo", fieldType: "select"},
        ]}
      ],
      data: {"all": [
        {name: "nameField", operator: "equalTo", value: "Godzilla"},
        {name: "ageField", operator: "greaterThanEqual", value: "21"}
      ]}
    });
  }


  function initializeForm() {
    for(var i=0; i < occupationOptions.length; i++) {
      var o = occupationOptions[i];
      occupationField.append($("<option>", {value: o.name, text: o.label}));
    }

    submit.click(function(e) {
      e.preventDefault();
      // SEND RULES HERE
      var data = conditions.conditionsBuilder("data");
      console.log(data);
      jQuery.post("rules/rules_endpoint", {"rules": data}, function(data) {
          $("#feedback").html(data);
      });
    });
  }
  $(onReady);
})(jQuery);
