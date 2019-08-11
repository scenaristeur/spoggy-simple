


function populateDataFromForm(id){
  var currentFormFields = document.getElementById(id).elements
  var currentFormLength = document.getElementById(id).elements.length;
  console.log( "Found " + currentFormFields.length + " elements in the form "+id);

  var params = {};
  for( var i=0; i<currentFormFields.length; i++ )
  {
    var field = currentFormFields[i]

    var field = currentFormFields[i]
    var valid = true;
    if (
      (field.nodeName == "FIELDSET")  ||
      (field.nodeName == "BUTTON")    ||
      ((field.type == "radio") && (field.checked == false))
    )
    {
      valid = false
    }

    console.log(valid)

    if (valid == true){      //  console.log(field, field.nodeName)
      console.log(field, field.nodeName, field.type)
      var fieldData = {}
      var fieldName = field.name;
      fieldData.value = field.value;
      fieldData.type = field.type;
      fieldData.format = field.placeholder || "unknown";
      params[fieldName] = fieldData;

    }
  }
  //  console.log("params ",params)
  if (!(id in data)){
    data[id] = [];
  }
  data[id].push(params)
  console.log("DATA -------- ",data)
}


function populateDataFromFootprintForm(id){
  var currentFormFields = document.getElementById(id).elements
  var currentFormLength = document.getElementById(id).elements.length;
    console.log( "Found " + currentFormFields.length + " elements in the form "+id);

  var params = {};
  for( var i=0; i<currentFormFields.length; i++ )
  {
    var field = currentFormFields[i]
    var valid = true;
    if (
      (field.nodeName == "FIELDSET")  ||
      (field.nodeName == "BUTTON")    ||
      ((field.type == "radio") && (field.checked == false))
    )
    {
      valid = false
    }

    console.log(valid)

    if (valid == true){
      console.log(field, field.nodeName, field.type)
      var fieldData = {}
      var fieldName = field.name;
      fieldData.value = field.value;
      fieldData.type = field.type;
      params[fieldName] = fieldData;
    }


  //var checkedButtons = document.querySelectorAll('input[type="radio"]:checked')
  //  console.log("CHECKEDS",checkedButtons)
  //  var checkedButtons = document.querySelectorAll('input[type="radio"]')
//    console.log("CHECKEDS all",checkedButtons)


  }
  console.log(params)
  //  console.log("params ",params)
  if (!(id in data)){
    data[id] = [];
  }
  data[id] = params;

}



export { populateDataFromForm, populateDataFromFootprintForm };
