var createButtonCardInfo = document.createElement("div");
createButtonCardInfo.innerHTML = "<div onclick='showCardInfo()'>?</div>";
createButtonCardInfo.className = "card-info-icon";

var cardInfoDiv = document.createElement("div");
cardInfoDiv.id = "js-card-info";
cardInfoDiv.innerHTML = `
<div id="popup-card-info" class="pop-up" style="display: none; text-align: left; padding: 14px;">
    <div id="close-settings-btn" style="float: right;" onclick="closeCardsInfoPopup()">x</div>
    <div>
      <h2>Card Info</h2>
    </div>
    
    <table border="0">
    <tr><td>Due</td><td id="jsDue"></td></tr>
    <tr><td>Lapses</td><td id="jsLapses"></td></tr>
    <tr><td>Queue</td><td id="jsQueue"></td></tr>
    <tr><td>Note Id</td><td id="jsNid"></td></tr>
    <tr><td>Card Id</td><td id="jsCid"></td></tr>
    <tr><td>Deck Id</td><td id="jsDid"></td></tr>
    <tr><td>Reviews</td><td id="jsReview"></td></tr>
    <tr><td>Card Type</td><td id="jsCtype"></td></tr>
    <tr><td>Original Due</td><td id="jsOdue"></td></tr>
    <tr><td>Ease Factor</td><td id="jsEase"></td></tr>
    <tr><td>Latest Review</td><td id="jslReview"></td></tr>
    </table>
  </div>
`;


if (document.documentElement.classList.contains("android")) {
    // Hidden on AnkiDesktop / AnkiMobile
    document.body.insertBefore(cardInfoDiv, document.body.firstChild);
    document.body.insertBefore(createButtonCardInfo, document.body.firstChild);
    
    setTimeout(function() {
        jsAddonGetCardInfo();
    }, 100);
} else {
    // Available to AnkiDesktop / AnkiMobile

}

function jsAddonGetCardInfo() {
    var latestReview = AnkiDroidJS.ankiGetCardMod();
    var due = AnkiDroidJS.ankiGetCardDue();
    var origDue = AnkiDroidJS.ankiGetCardODue();
    var reviews = AnkiDroidJS.ankiGetCardReps();
    var lapses = AnkiDroidJS.ankiGetCardLapses();
    var queue = AnkiDroidJS.ankiGetCardQueue();
    var ease = AnkiDroidJS.ankiGetCardFactor();
    var cardType = AnkiDroidJS.ankiGetCardType();
    var cardId = AnkiDroidJS.ankiGetCardId();
    var noteId = AnkiDroidJS.ankiGetCardNid();
    var deckId = AnkiDroidJS.ankiGetCardDid();

    document.getElementById("jsDue").innerHTML = due;
    document.getElementById("jsLapses").innerHTML = lapses;
    document.getElementById("jsQueue").innerHTML = queue;
    document.getElementById("jsNid").innerHTML = noteId;
    document.getElementById("jsCid").innerHTML = cardId;
    document.getElementById("jsDid").innerHTML = deckId;
    document.getElementById("jsReview").innerHTML = reviews;
    document.getElementById("jsCtype").innerHTML = cardType;
    document.getElementById("jsOdue").innerHTML = origDue;
    document.getElementById("jsEase").innerHTML = ease;
    document.getElementById("jslReview").innerHTML = latestReview;
}

function convertTime(unix_timestamp) {
    var date = new Date(unix_timestamp).toLocaleDateString("en-US");
    return date;
}

function closeCardsInfoPopup() {
    document.getElementById("popup-card-info").style.display = "none";   
}

function showCardInfo() {
    document.getElementById("popup-card-info").style.display = "table";
}

var cardInfoPopupCss = `
.pop-up {
    display: none;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 75%;
    height: 0;
    margin: auto;
    background-color: #f3f3f3;
    text-align: center;
    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.2);
    z-index: 9999;
  }
  .card-info-icon {
    position: absolute;
    bottom: 0;
    right: 0;
    background: #2196f3;
    color: white;
    padding: 10px;
    margin: 10px;
    border-radius: 40px;
    width: 20px;
    height: 20px;
}`;

var styleSheet1 = document.createElement("style");
styleSheet1.type = "text/css";
styleSheet1.innerText = cardInfoPopupCss;
document.head.appendChild(styleSheet1);