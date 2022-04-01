var jsAddonsStyleSheet = `
@font-face {
    font-family: 'Material Icons';
    font-style: normal;
    font-weight: 400;
    src: local('Material Icons'), local('MaterialIcons-Regular'), url(../addons/ankidroid-js-addon-material-reviewer/package/Material-Icons.woff2);
  }
  .material-icons {
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 28px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -webkit-font-feature-settings: 'liga';
    -webkit-font-smoothing: antialiased;
  }
  
  #deck-name {
    font-size: 20px;
    color: #555;
  }

  #review-eta {
  color: gray;
  display: inline-block;
  font-size: 12px;
  }
  
  .card-count-1-eta {
    position: fixed;
    left: 0;
    right: 0;
    top: 0; 
    background-color: white;
    padding: 10px;
  }
  
  .card-count-1 {
  display: inline-block;
  border: solid thin #c8c8c8;
  padding: 4px;
  border-radius: 25px;
  font-size: 13px;
  }
  
  #card-new {
  display: inline-block;
  color: #2196f3;
  }
  
  #card-lrn {
  display: inline-block;
  color: #f44336;
  }
  
  #card-rev {
  display: inline-block;
  color: #4caf50;
  }
  
  .bottom-nav-bar {
    position: fixed;
    height: 40px;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 999;
    box-shadow: 0 0 6px rgb(0 0 0 / 20%);
    color: gray;
    background-color: white;
  }
  
  .left-nav-button {
    position: fixed;
    bottom: 8px;
    left: 10px;
  }
  
  .right-nav-button {
    position: fixed;
    bottom: 8px;
    right: 10px;
    color: gray;
  }
  
  .show-answer {
    position: fixed;
    bottom: 20px;
    right: 60px;
    left: 60px;
    padding: 10px;
    border-radius: 40px;
    background: white;
    box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
    z-index: 9999;
    color: gray;
  }
  
  .show-answer:active {
    background: #f2f2f2;
  }
  
  #answer-buttons {
    position: fixed;
    bottom: 0;
    right: 0px;
    left: 0px;
    width: 100%;
    height: 55px;
    box-shadow: 0 0 10px rgb(0 0 0 / 20%);
    background-color: white;
    display: flex;
    overflow-x: auto;
    z-index: 999;
    justify-content: space-around;
    font-size: 16px;
    font-family: system-ui;
  }
  
  #again-button {
   display: inline-block;
   margin: 8px;
   color: #f44336;
  }
  #again-button:active {
    background: #f2f2f2; 
  }

  #hard-button {
   display: inline-block;
   margin: 8px;
   color: #607d8b;
  }
  
  #hard-button:active {
    background: #f2f2f2; 
  }

  #good-button {
   display: inline-block;
   margin: 8px;
   color: #4caf50;
  }
  
  
  #good-button:active {
    background: #f2f2f2; 
  }

  #easy-button {
   display: inline-block;
   margin: 8px;
   color: #2196f3
  }
  
  #easy-button:active {
    background: #f2f2f2; 
  }

  #again-t{
  font-size: 10px;
  }
  #hard-t{
  font-size: 10px;
  }
  #good-t{
  font-size: 10px;
  }
  #easy-t{
  font-size: 10px;
  }
  .cloze {
    font-weight: bold;
    color: #26a69a;
  }
  #content {
    margin: 0.5em;
    margin-bottom: 4em;
    margin-top: 4em;
  }
`;

var styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = jsAddonsStyleSheet;
document.head.appendChild(styleSheet);

var jsCardCountEta = document.createElement("div");
jsCardCountEta.className = "card-count-1-eta";

jsCardCountEta.innerHTML = `
<div id="deck-name"></div>
<div id="review-eta"></div>
<div class="card-count-1">
<div id="card-new"></div>
<div id="card-lrn"></div>
<div id="card-rev"></div>
</div>
`;

var jsShowAnswerButton = document.createElement("div");
jsShowAnswerButton.id = "bottom-show-answer";
jsShowAnswerButton.innerHTML = `
<div class="show-answer" onclick="showAnswer();">Show Answer</div>
<div class="bottom-nav-bar">
<i class="material-icons left-nav-button" onclick="ankiShowNavDrawer();">menu</i>
<i class="material-icons right-nav-button" onclick="ankiShowOptionsMenu();">more_vert</i>
</div>
`;

var jsAllAnswerButton = document.createElement("div");
jsAllAnswerButton.id = "answer-buttons";
jsAllAnswerButton.innerHTML = `
<div id="again-button"><div id="again-t"></div><div class="again-text">Again</div></div>
<div id="hard-button"><div id="hard-t"></div><div class="hard-text">Hard</div></div>
<div id="good-button"><div id="good-t"></div><div class="good-text">Good</div></div>
<div id="easy-button"><div id="easy-t"></div><div class="easy-text">Easy</div></div>
    `;

var frontSide = true;

if (document.documentElement.classList.contains("android")) {
    document.body.insertBefore(jsCardCountEta, document.body.firstChild);
    document.body.insertBefore(jsShowAnswerButton, document.body.lastChild);
    document.body.insertBefore(jsAllAnswerButton, document.body.lastChild);

    document.getElementById("review-eta").innerText = AnkiDroidJS.ankiGetETA() + " mins.";
    document.getElementById("deck-name").innerText = AnkiDroidJS.ankiGetDeckName();

    if (AnkiDroidJS.ankiGetCardType() == 0) {
        document.getElementById("card-new").innerHTML = "<u>" + AnkiDroidJS.ankiGetNewCardCount(); + "</u>"
        document.getElementById("card-rev").innerHTML = AnkiDroidJS.ankiGetRevCardCount();
        document.getElementById("card-lrn").innerHTML = AnkiDroidJS.ankiGetLrnCardCount();
    } else if (AnkiDroidJS.ankiGetCardType() == 1) {
        document.getElementById("card-new").innerHTML = AnkiDroidJS.ankiGetNewCardCount();
        document.getElementById("card-rev").innerHTML = AnkiDroidJS.ankiGetRevCardCount();
        document.getElementById("card-lrn").innerHTML = "<u>" + AnkiDroidJS.ankiGetLrnCardCount(); + "</u>";
    } else {
        document.getElementById("card-new").innerHTML = AnkiDroidJS.ankiGetNewCardCount();
        document.getElementById("card-rev").innerHTML = "<u>" + AnkiDroidJS.ankiGetRevCardCount(); + "</u>";
        document.getElementById("card-lrn").innerHTML = AnkiDroidJS.ankiGetLrnCardCount();
    }


    // show / hide answer buttons
    if (AnkiDroidJS.ankiIsDisplayingAnswer()) {
        document.getElementById("bottom-show-answer").style.display = "none";
        document.getElementById("answer-buttons").style.display = "flex";
    } else {
        document.getElementById("bottom-show-answer").style.display = "unset";
        document.getElementById("answer-buttons").style.display = "none";
    }

    var nextTime1 = AnkiDroidJS.ankiGetNextTime1();
    var nextTime2 = AnkiDroidJS.ankiGetNextTime2();
    var nextTime3 = AnkiDroidJS.ankiGetNextTime3();
    var nextTime4 = AnkiDroidJS.ankiGetNextTime4();

    // need improvements
    if (nextTime1 && !nextTime2 && nextTime3 && nextTime4) {
      document.getElementById("again-t").innerHTML = nextTime1;
      document.getElementById("hard-button").style.display = "none";
      document.getElementById("good-t").innerHTML = nextTime2;
      document.getElementById("easy-t").innerHTML = nextTime3;

      document.getElementById('again-button').onclick = function () {
          buttonAnswerEase1();
      }

      document.getElementById('good-button').onclick = function () {
          buttonAnswerEase2();
      }

      document.getElementById('easy-button').onclick = function () {
          buttonAnswerEase3();
      }
    } else if (nextTime1 && nextTime2 && nextTime3 && !nextTime4) {
        document.getElementById("again-t").innerHTML = nextTime1;
        document.getElementById("hard-button").style.display = "none";
        document.getElementById("good-t").innerHTML = nextTime2;
        document.getElementById("easy-t").innerHTML = nextTime3;

        document.getElementById('again-button').onclick = function () {
            buttonAnswerEase1();
        }

        document.getElementById('good-button').onclick = function () {
            buttonAnswerEase2();
        }

        document.getElementById('easy-button').onclick = function () {
            buttonAnswerEase3();
        }
    } else if (nextTime1 && nextTime2 && !nextTime3 && !nextTime4) {
        document.getElementById("again-t").innerHTML = nextTime1;
        document.getElementById("hard-button").style.display = "none";
        document.getElementById("good-t").innerHTML = nextTime2;
        document.getElementById("easy-button").style.display = "none";

        document.getElementById('again-button').onclick = function () {
            buttonAnswerEase1();
        }

        document.getElementById('good-button').onclick = function () {
            buttonAnswerEase2();
        }
    } else {
        document.getElementById("again-t").innerHTML = nextTime1;
        document.getElementById("hard-t").innerHTML = nextTime2;
        document.getElementById("good-t").innerHTML = nextTime3;
        document.getElementById("easy-t").innerHTML = nextTime4;

        document.getElementById('again-button').onclick = function () {
            buttonAnswerEase1();
        }

        document.getElementById('hard-button').onclick = function () {
            buttonAnswerEase2();
        }

        document.getElementById('good-button').onclick = function () {
            buttonAnswerEase3();
        }

        document.getElementById('easy-button').onclick = function () {
            buttonAnswerEase4();
        }
    }
}