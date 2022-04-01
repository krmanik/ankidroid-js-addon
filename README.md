# AnkiDroid JS Addons
Reviewer and note editor addons

This page will be updated regularly. This repository created for testing pre alpha release of js addon support in AnkiDroid. 

This is for [pre alpha version](https://github.com/krmanik/Anki-Android/releases) of AnkiDroid so report issues, bugs, suggestions and feedback [here](https://github.com/krmanik/ankidroid-js-addon/issues).

## Table of Contents
- [Addons Type](#addons-type)
- [Background](#background)
- [How to install addons?](#how-to-install-addons)
- [How it works?](#how-it-works)
    - [Reviewer](#1-reviewer-addons-1)
    - [Note Editor](#2-note-editor-addons-1)
- [How to create addons?](#how-to-create-addons)
    - [Reviewer](#reviewer-addons)
    - [Note Editor](#note-editor-addons)
    - [Create config for Addon](#create-config-for-addon)
- [Issues and bugs](#issues-and-bugs)

## Background
Anki has many amazing addons that make learning, creating and managing notes and decks easier. But in AnkiDroid due to platform restrictions those addons are not available. Anki written in python and rust and easier to write addons also. But in AnkiDroid addons can be developed but those need to install as separate app.

Note: AnkiDroid only download js addons from npmjs and inject or perform action defined in ```index.js``` of addons. But hosting and managing of these addons is depend on addon developer and npmjs. AnkiDroid reads ```index.js``` from addons dir and perform action.

## Addons Type
This is implementation of using JavaScript as addons support. There are two implementation in progress.

### 1. Reviewer addons
It adds content to reviewer webview. It can be used to redesign the reviewer UI. These addons have full access to [AnkiDroid JS API](https://github.com/ankidroid/Anki-Android/wiki/AnkiDroid-Javascript-API).

#### Examples 
- [Progress bar](Reviewer%20addons/ankidroid-js-addon-progress-bar/package)
- [Buttons and card counts](Reviewer%20addons/ankidroid-js-addon-button-card-count/package)
- [Material Design Reviewer](Reviewer%20addons/ankidroid-js-addon-material-reviewer/package)
- [Dark mode using darkreader](Reviewer%20addons/ankidroid-js-addon-dark-mode/package)
- [Dev tools](Reviewer%20addons/ankidroid-js-addon-dev-tools/package)

### 2. Note editor addons
It adds buttons to note editor toolbar. It can be used to create notes easily.

#### Examples 
- [Subscript](Note%20editor%20addons/ankidroid-js-addon-subscript/package)
- [Mini Cloze Overlapper](Note%20editor%20addons/ankidroid-js-addon-cloze/package)
- [Hanzi to Pinyin](Note%20editor%20addons/ankidroid-js-addon-hanzi-to-pinyin/package)
- [Asciimath](Note%20editor%20addons/ankidroid-js-addon-asciimath/package)
- [CC-CEDICT Addon](Note%20editor%20addons/ankidroid-js-addon-cedict/package)

## How to install addons?
To make it remain for longer time in AnkiDroid there are some specific standard set up. It may change with new ideas and suggestions.

First download latest AnkiDroid version from [releases page](https://github.com/krmanik/Anki-Android/releases)

### 1. Turn on JS Addons
Open AnkiDroid advanced settings and select checkbox
```
AnkiDroid -> Settings -> Advanced -> JavaScript Addons Support
```

### 2. Download addons from npmjs.com
Open Addons Browser in AnkiDroid and select `Get Addons` from options menu then download addons.
```
AnkiDroid -> Addons -> Get Addons
```

### 3. Reopen Addons Browser
Turn on downloaded addons so it will be visible in reviewer or note editor.

### View supported addons [npmjs.com](https://www.npmjs.com/search?q=keywords:ankidroid-js-addon)

**View demo for [progress bar](images/progress_bar_addon.gif)**

**View demo for [mini cloze overlapper](images/mini_cloze_addon.gif)**

## How it works?
### 1. Reviewer Addons
The addons get downloaded from npmjs.com and installed in AnkiDroid. For enabled addons the content added to reviewer in Card Template.

View PR [#8440](https://github.com/ankidroid/Anki-Android/pull/8440) for more

<details>

<summary>Click to Read more</summary>

1. Users will navigate to Addons Browser Activity

2. There are <strike>four</strike> one button in options menu<strike>     
     - Reviewer Addons
     - Note editor Addons  (Separate PR)
     - Import Addons</strike>
     - Get Addons

3. When user click `Install Addon`
It will download the addons to `AnkiDroid/addons` folder.

4. There are implementation for checking valid npm package
```
{
    "name": "ankidroid-js-addon-progress-bar",
    "addonTitle": "Progress Bar",
    "version": "1.0.0",
    "author": "https://github.com/krmanik",
    "homepage": "https://github.com/krmanik/Anki-Custom-Card-Layout",
    "ankidroidJsApi": "0.0.1",
    "addonType": "reviewer",
    "keywords": ["ankidroid-js-addon"]
}
```

View this file [AddonModel.kt #L32-#L46](https://github.com/ankidroid/Anki-Android/blob/0257b7b7a5373fffe3d36121d5929caa323b884e/AnkiDroid/src/main/java/com/ichi2/anki/jsaddons/AddonModel.kt#L32-#L46)

If above found in package.json on npmjs registry then then it will download the package.json and get tarball url.

6. Here package with `.tgz` extension will be downloaded to `cache` folder and extracted then copied to `AnkiDroid/addons`  folder

7. The addons will be listed on the Addons Browser screen

8. Users have option to enable, update and delete addons.

9. When users enable the addons, the `index.js` file of that addons will be added to card during review. The addons have full access to AnkiDroid JS API.

**Demo of progress bar**

<img src="https://user-images.githubusercontent.com/12841290/113458708-c1340c00-9445-11eb-85bb-985aba56cb2a.gif" height=500></img>

</details>


### 2. Note editor addons
In Note editor buttons added for each and every enabled addons. When user click the buttons the function in Note editor read ```index.js``` in AnkiDroid/addons directory and call function ```AnkiJSFunction``` with data flow from AnkiDroid to JS Addons and JS addons to AnkiDroid. Here [js-evaluator-for-android](https://github.com/evgenyneu/js-evaluator-for-android) used to call js function inside Note editor.


Data flow from AnkiDroid to JS Addon

```
send deck name, model name, fields count, fields name and selected text in json format to js addon
```

Data flow from JS Addon to AnkiDroid

```
receive json format data with changed text and data that needs to be inserted to fields with index
```

View PR [#8011](https://github.com/ankidroid/Anki-Android/pull/8011) for more

## How to create addons?
### Reviewer addons
1. Install npmjs and create an account or manually paste the index.js and package.json in following directory structure

```
AnkiDroid
  - addons
      - ankidroid-js-addons...
           - package
                - index.js
                - package.json
 - collection.media
```

2. Create package.json file. Note: This is important to have following in package.json to distinguish from other npm package and to use inside AnkiDroid

View [AddonBrowser.kt : listAddonsFromDir()](https://github.com/krmanik/Anki-Android/blob/jsaddons-3-new/AnkiDroid/src/main/java/com/ichi2/anki/AddonBrowser.kt#L87-#L116)

```
  "ankidroidJsApi": "0.0.1",
  "addonType": "note-editor",
    "keywords": [
    "ankidroid-js-addon"
  ],
  "author": "Your Name",
  "homepage": "Your project website"
```

Example of progress bar

<details>

<summary>Click to view package.json of progress bar</summary>

```json
{
  "name": "ankidroid-js-addon-progress-bar",
  "addonTitle": "Progress Bar",
  "version": "1.0.9",
  "description": "Show progress bar in AnkiDroid, this package may not be used in node_modules. For using this addon view. https://github.com/ankidroid/Anki-Android/pull/9232",
  "main": "index.js",
  "ankidroidJsApi": "0.0.1",
  "addonType": "reviewer",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/krmanik/Anki-Custom-Card-Layout.git"
  },
  "keywords": [
    "ankidroid-js-addon"
  ],
  "author": {"name":"krmanik", "email": "infinyte01@gmail.com", "url":"https://krmanik.github.io"},
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/krmanik/Anki-Custom-Card-Layout/issues"
  },
  "homepage": "https://github.com/krmanik/Anki-Custom-Card-Layout#readme"
}
```

</details>

<br>

3. Create ```index.js``` with content that you want to inject to reviewer

View [NpmUtils.kt : getEnabledAddonsContent()](https://github.com/krmanik/Anki-Android/blob/jsaddons-3-new/AnkiDroid/src/main/java/com/ichi2/anki/jsaddons/NpmUtils.kt#L76-#L118)

<details>

<summary>Click to view index.js of progress bar</summary>

```js
var progressDiv = document.createElement("div");
progressDiv.id = "h-progress";
progressDiv.className = "progress-1";
progressDiv.innerHTML = '<div class="progress-bar-1" id="h-bar"></div>';

// v0.5.2 - https://github.com/SimonLammer/anki-persistence/blob/62463a7f63e79ce12f7a622a8ca0beb4c1c5d556/script.js
if (void 0 === window.Persistence) { var _persistenceKey = "github.com/SimonLammer/anki-persistence/", _defaultKey = "_default"; if (window.Persistence_sessionStorage = function () { var e = !1; try { "object" == typeof window.sessionStorage && (e = !0, this.clear = function () { for (var e = 0; e < sessionStorage.length; e++) { var t = sessionStorage.key(e); 0 == t.indexOf(_persistenceKey) && (sessionStorage.removeItem(t), e--) } }, this.setItem = function (e, t) { void 0 == t && (t = e, e = _defaultKey), sessionStorage.setItem(_persistenceKey + e, JSON.stringify(t)) }, this.getItem = function (e) { return void 0 == e && (e = _defaultKey), JSON.parse(sessionStorage.getItem(_persistenceKey + e)) }, this.removeItem = function (e) { void 0 == e && (e = _defaultKey), sessionStorage.removeItem(_persistenceKey + e) }) } catch (e) { } this.isAvailable = function () { return e } }, window.Persistence_windowKey = function (e) { var t = window[e], i = !1; "object" == typeof t && (i = !0, this.clear = function () { t[_persistenceKey] = {} }, this.setItem = function (e, i) { void 0 == i && (i = e, e = _defaultKey), t[_persistenceKey][e] = i }, this.getItem = function (e) { return void 0 == e && (e = _defaultKey), t[_persistenceKey][e] || null }, this.removeItem = function (e) { void 0 == e && (e = _defaultKey), delete t[_persistenceKey][e] }, void 0 == t[_persistenceKey] && this.clear()), this.isAvailable = function () { return i } }, window.Persistence = new Persistence_sessionStorage, Persistence.isAvailable() || (window.Persistence = new Persistence_windowKey("py")), !Persistence.isAvailable()) { var titleStartIndex = window.location.toString().indexOf("title"), titleContentIndex = window.location.toString().indexOf("main", titleStartIndex); titleStartIndex > 0 && titleContentIndex > 0 && titleContentIndex - titleStartIndex < 10 && (window.Persistence = new Persistence_windowKey("qt")) } }

var UA = navigator.userAgent;

var isMobile = /Android/i.test(UA);
var isAndroidWebview = /wv/i.test(UA);

if (isMobile && isAndroidWebview) {
    progressBarInit();
} else {
    progressBarHide();
}

function progressBarHide() {
    document.getElementById("h-progress").style.display = "none";
    document.getElementById("h-bar").style.display = "none";
}

function progressBarInit() {
    document.body.insertBefore(progressDiv, document.body.firstChild);
    var cardCount = parseInt(AnkiDroidJS.ankiGetNewCardCount()) + parseInt(AnkiDroidJS.ankiGetLrnCardCount()) + parseInt(AnkiDroidJS.ankiGetRevCardCount());

    var totalCardCount = 1;
    if (Persistence.isAvailable()) {
        totalCardCount = Persistence.getItem("total");
        if (totalCardCount == null) {
            totalCardCount = cardCount;    // count set to total card count at first card, it will not change for current session
            Persistence.setItem("total", totalCardCount);
        }
    }

    // progress bar percentage
    var per = Math.trunc(100 - cardCount * 100 / totalCardCount) + "%";
    document.getElementById("h-bar").style.width = per;
}

var progressBarCSS = `
.progress-1 {
width: 100%;
border-radius: 2px;
background-color: #e6e6e6;
}

.progress-bar-1 {
height: 12px;
border-radius: 2px;
background-color: limegreen;
}
`;

var styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = progressBarCSS;
document.head.appendChild(styleSheet);
```

</details>

## Note editor addons
1. Install npmjs and create an account or manually paste the index.js and package.json in following directory structure

```
AnkiDroid
  - addons
      - ankidroid-js-addons...
           - package
                - index.js
                - package.json
 - collection.media
```

2. Create package.json file. Note: This is import to have following in package.json to distinguish from other npm package and use inside AnkiDroid

      View [AddonModel.kt : isValidAnkiDroidAddon()](https://github.com/krmanik/Anki-Android/blob/jsaddons-3-new/AnkiDroid/src/main/java/com/ichi2/anki/jsaddons/AddonModel.kt#L77-#L104)

      Change addon type to ```note-editor```

      Add ```icon``` with single char as icon for button in note editor

```
  "ankidroidJsApi": "0.0.1",
  "addonType": "note-editor",
  "icon": "["
  "keywords": ["ankidroid-js-addon"]
  "author": {"name":"Dev Name", "email": "dev@mail.com", "url":"https://example.com"},
  "homepage": "Your project website"
```

<details>

<summary>Click to view package.json of Mini Cloze Overlapper</summary>

```json
{
  "name": "ankidroid-js-addon-cloze",
  "addonTitle": "Cloze",
  "icon": "[",
  "version": "1.0.3",
  "ankidroidJsApi": "0.0.1",
  "addonType":"note-editor",
  "description": "Create cloze from list",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/krmanik/Anki-Custom-Card-Layout.git"
  },
  "keywords": [
    "ankidroid-js-addon"
  ],
  "author": {"name":"krmanik", "email": "infinyte01@gmail.com", "url":"https://krmanik.github.io"},
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/krmanik/Anki-Custom-Card-Layout/issues"
  },
  "homepage": "https://github.com/krmanik/Anki-Custom-Card-Layout#readme"
}
```

</details>

3. Create ```index.js``` and write function with the name ```AnkiJSFunction``` and single parameter. Note: don't change function name as this is the function that AnkiDroid call.

View [NoteEditorAddon.kt : runJsCode()](https://github.com/krmanik/Anki-Android/blob/jsaddons-3-new/AnkiDroid/src/main/java/com/ichi2/anki/jsaddons/NoteEditorAddon.kt#L88-#L135)

The parameter contains json format data of selected text, fields name, fields count, deck name and note type. Use this json data to change or insert data to Edit fields in Note editor.

```
AnkiDroid  -->  JS Addon
when AnkiJSFunction called then deck name, model name, fields count, fields name and selected text in json format passed to js addon


 { 
   "noteType": "Basic",
   "deckName": "Default",
   "fieldsName": ["Front", "Back"],
   "fieldsCount": 2,
   "selectedText": "Some selected text..." 
}
```

```
AnkiDroid  <--  JS Addon
Note editor receive json format data with changed text and data that needs to be inserted to fields with index


 { 
  "changedText": "some changed text...",
  "addToFields": { 
                 "0": "some text to field one",
                 "2": "some text to field two"
                 "3": "some text to field three" 
                 },
  "changeOption": "replace"
}
```

Selected text change option
```
replace
append
clear
default
```

View [NoteEditorAddon.kt : jsAddonParseResult()](https://github.com/krmanik/Anki-Android/blob/jsaddons-3-new/AnkiDroid/src/main/java/com/ichi2/anki/jsaddons/NoteEditorAddon.kt#L137-#L169)

Usage of above implementation in new **[AnkiDroid Cloze Overlapper Mini JS Addon](https://www.npmjs.com/package/ankidroid-js-addon-cloze)**

a) To test this addon first import this deck as it contains note type matching in index.js
- [Ocloze sample deck](https://github.com/krmanik/ankidroid-js-addon/raw/main/Sample%20deck/ocloze%20sample%20deck.apkg)

b) Select ocloze-infi type then use this addon

<details>
<summary>Click to View index.js</summary>

```js
function AnkiJSFunction(data) {

    var jsonData = JSON.parse(data);

    var selectedText = jsonData['selectedText'];

    var newJsonData = {};
    var fieldsData = {};

    if (jsonData['noteType'] == "ocloze-infi" && jsonData["fieldsCount"] == 26) {
        newJsonData["changedText"] = "";  // intentionally empty

        var list = selectedText.split("\n");

        var fullText = "";
        var len = list.length;
        var startField = 5;
        for (i = 0; i < len; i++) {
            var text = "";
            fullText += "<div>{{c21::" + list[i] + "}}</div>";
            for (j = 0; j < len; j++) {
                if (i == j) {
                    if (j > 0) {
                        text += "<div>" + list[j - 1] + "</div>";
                    }
                    text += "<div>{{c" + (j + 1) + "::" + list[j] + "}}</div>";
                } else {
                    text += "<div>...</div>";
                }
            }
            fieldsData[startField] = text;
            startField++;
        }
        fieldsData[25] = fullText;

        newJsonData["addToFields"] = fieldsData;
    }

    return JSON.stringify(newJsonData);
}
```

</details>

# Create config for Addon
### ConfigEditor in webview
The config is displayed in webview using `config.html` and `config.json`. `ConfigEditor` JS interface added in `NoteEditorAdddon.kt` with `read`, `save` and `toast` function. <br>
The `read` function read `config.json` from addons package directory return to webview in string format. Then `JSON.parse` can be used to parse the `config.json`. <br>
The `save` function write `config.json`. The function called from webview. <br>

In Note Editor, on long press addon icon open webview in popup with `config.html` as url.<br>
View [NoteEditorAddon.kt#L85](https://github.com/krmanik/Anki-Android/blob/jsaddons-3-new/AnkiDroid/src/main/java/com/ichi2/anki/jsaddons/NoteEditorAddon.kt#L85) <br>
View [AddonConfigEditor.kt](https://github.com/krmanik/Anki-Android/blob/jsaddons-3-new/AnkiDroid/src/main/java/com/ichi2/anki/jsaddons/AddonConfigEditor.kt)

The `config.json` in string format sent to `AnkiJSFunction` function from AnkiDroid to Addon.<br>
View [NoteEditorAddon.kt #L117](https://github.com/krmanik/Anki-Android/blob/jsaddons-3-new/AnkiDroid/src/main/java/com/ichi2/anki/jsaddons/NoteEditorAddon.kt#L117)

### Create config for addon using config.html and config.json
1. Create `config.json` and enter configuration in json format
2. Create `config.html` and use following JS interface function to save, read and show message
```js
ConfigEditor.read()
```
It return `config.json` in string format.

```js
ConfigEditor.save()
```
It save `config.json` and return boolean.

```js
ConfigEditor.toast()
```
It show toast given message as parameter.

```js
ConfigEditor.close()
```
It close popup webview.

## Example Config
View [Cloze Addon Config](https://github.com/krmanik/ankidroid-js-addon/tree/main/Note%20editor%20addons/ankidroid-js-addon-cloze/package)<br>
View [CC-CEDICT Addon Config](https://github.com/krmanik/ankidroid-js-addon/tree/main/Note%20editor%20addons/ankidroid-js-addon-cedict/package)


# Pull Requests for this feature
View
- PR [#9232](https://github.com/ankidroid/Anki-Android/pull/9232) (Open)
- PR [#8440](https://github.com/ankidroid/Anki-Android/pull/8440) (Not merged & closed)
- PR [#7958](https://github.com/ankidroid/Anki-Android/pull/7958) (Not merged & closed)
- PR [#8011](https://github.com/ankidroid/Anki-Android/pull/8011) (Not merged & closed)


# Issues and bugs
This is for [pre alpha version](https://github.com/krmanik/Anki-Android/releases) of AnkiDroid so report issues, bugs, suggestions and feedback [here](https://github.com/krmanik/ankidroid-js-addon/issues).