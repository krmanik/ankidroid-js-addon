// Async example of AnkiDroid JS Adon

var newJsonData = {};
var fieldsData = {};

function AnkiJSFunction(data) {
  var jsonData = JSON.parse(data);
  var focusedFieldText = jsonData['focusedFieldText'];

  var configData = JSON.parse(jsonData["configData"]);

  var simField = parseInt(configData["simplified"]);
  var tradField = parseInt(configData["traditional"]);
  var pinField = parseInt(configData["pinyin"]);
  var meanField = parseInt(configData["definitions"]);

  var addSim = configData["add_simplified"];
  var addTrad = configData["add_traditional"];
  var addPin = configData["add_pinyin"];
  var addMean = configData["add_definitions"];

  if (simField < 0 || simField > NoteEditorJS.getEditFieldsSize()) {
    NoteEditorJS.toast("Failed to add data, check config.");
    // return empty
    return JSON.stringify({});
  }

  if (tradField < 0 || tradField > NoteEditorJS.getEditFieldsSize()) {
    NoteEditorJS.toast("Failed to add data, check config.");
    // return empty
    return JSON.stringify({});
  }

  if (pinField < 0 || pinField > NoteEditorJS.getEditFieldsSize()) {
    NoteEditorJS.toast("Failed to add data, check config.");
    // return empty
    return JSON.stringify({});
  }

  if (meanField < 0 || meanField > NoteEditorJS.getEditFieldsSize()) {
    NoteEditorJS.toast("Failed to add data, check config.");
    // return empty
    return JSON.stringify({});
  }



  newJsonData["changeType"] = "";

  fetch("https://cdn.jsdelivr.net/gh/krmanik/cedict-json/v2/" + focusedFieldText.trim() + ".json")
    .then((response) => response.json())
    .then(fetchData => {

      fieldsData[simField] = ""
      fieldsData[tradField] = ""
      fieldsData[pinField] = ""
      fieldsData[meanField] = ""

      if (addSim == "y") {
        fieldsData[simField] += fetchData["simplified"];
      }

      if (addTrad == "y") {
        fieldsData[tradField] += fetchData["traditional"];
      }

      if (addPin == "y") {
        fieldsData[pinField] += fetchData["pinyin"].join(", ");
      }

      if (addMean == "y") {

        var meanings = ""
        for (var i in fetchData["definitions"]) {
          meanings += i + "\n" + fetchData["definitions"][i] + "\n\n"
        }
    
        fieldsData[meanField] += meanings
      }
      
      newJsonData["addToFields"] = fieldsData;
      console.log(newJsonData);

      // call AnkiDroid JS interface to add data to fields
      NoteEditorJS.addDataToFields(JSON.stringify(newJsonData));
    })
    .catch(error => {
      NoteEditorJS.toast("Not found");
    });

    // return empty
    return JSON.stringify({});
};