// data is in json format sent from AnkiDroid
var jsonData = ""
var genClozeData = ""
function AnkiJSFunction(data) {

    jsonData = JSON.parse(data);
    console.log(jsonData);

    var configData = JSON.parse(jsonData["configData"]);
    console.log(configData);

    var before = configData["before"];
    var prompt = configData["prompt"];
    var after = configData["after"];
    var no_cues_first = configData["no_cues_first"];
    var no_cues_last = configData["no_cues_last"];
    var gradual_build = configData["gradual_build"];
    var full_cloze = configData["full_cloze"];

    jsSetOpts = before + "," + prompt + "," + after + " | " + no_cues_first + "," + no_cues_last + "," + gradual_build + "," + full_cloze

    var focusedFieldText = jsonData["focusedFieldText"];
    console.log(focusedFieldText);

    var selectedText = jsonData['selectedText'];
    console.log(selectedText);

    var newJsonData = {};
    var fieldsData = {};

    if (jsonData['noteType'] == "Cloze (overlapping)" && jsonData["fieldsCount"] == 26 && focusedFieldText.trim().length != 0) {
        newJsonData["changedText"] = "";  // intentionally empty

        var cloze = new ClozeOverlapper()
        genClozeData = cloze.add(focusedFieldText)
        console.log(genClozeData)

        fieldsData[4] = genClozeData["Settings"]
        fieldsData[25] = genClozeData["Full"]

        var startFieldNum = 5;
        for (i=1; i<=20; i++) {
            var genTxt = genClozeData["Text" + i]
            fieldsData[startFieldNum] = genTxt
            startFieldNum++;
        }

        newJsonData["addToFields"] = fieldsData;

    } else {
        // return empty
        return JSON.stringify({});
    }

    console.log(newJsonData);
    return JSON.stringify(newJsonData);
}

/**
 * [cloze-overlapper]{@link https://github.com/glutanimate/cloze-overlapper}
 * @copyright Copyright (c) glutanimate 2021
 * @license AGPL-3.0 License
 * 
 * 
 * [ocloze]{@link https://github.com/krmanik/ocloze}
 * @copyright Copyright (c) 2021 Mani
 * @license AGPL-3.0 License
 */

var jsSetOpts="1,3,0 | n,n,n,n",maxfields=20,fieldsName=["Original","Title","Remarks","Sources","Settings","Text1","Text2","Text3","Text4","Text5","Text6","Text7","Text8","Text9","Text10","Text11","Text12","Text13","Text14","Text15","Text16","Text17","Text18","Text19","Text20","Full"];const dflt_set=[1,1,0],dflt_opt=[!1,!1,!1,!1],reComment=new RegExp("\x3c!--.*?--\x3e","g"),reStyle=new RegExp("<style.*?>.*?</style>","g"),reScript=new RegExp("<script.*?>.*?<\/script>","g"),reTag=new RegExp("<.*?>","g"),reEnts=new RegExp("&#?w+;","g"),reMedia=new RegExp("<img[^>]+src=[\"']?([^\"'>]+)[\"']?[^>]*>","g");function stripHTML(t){return t=(t=(t=(t=(t=(t=t.replaceAll(reComment,"")).replaceAll(reStyle,"")).replaceAll(reScript,"")).replaceAll(reTag,"")).replaceAll(reEnts,"")).replaceAll(reMedia,"")}function parseNoteSettings(t){var e,r=null,s=null,l=null;if(field=stripHTML(t),lines=field.replace(" ","").split("|"),!lines)return[dflt_set,dflt_opt];if(e=lines[0].split(","),lines.length>1&&(r=lines[1].split(",")),!r&&!e)return[dflt_set,dflt_opt];if(e){for(item of(l=[],e))try{l.push(parseInt(item))}catch(t){l.push(null)}3==l.length&&"number"==typeof l[1]||(l=2==l.length&&"number"==typeof l[0]?[l[1],l[0],l[1]]:1==l.length&&"number"==typeof l[0]?[dflt_set[0],l[0],dflt_set[2]]:dflt_set)}else l=dflt_set;if(r)for(s=[],i=0;i<4;i++)try{"y"==r[i]?s.push(!0):s.push(!1)}catch(t){s.push(dflt_opt[i])}else s=dflt_opt;return[l,s]}function createNoteSettings(t){return set_str=t[0].join(","),opt_str=t[1].map(function(t){return t?"y":"n"}).join(","),set_str+" | "+opt_str}class ClozeOverlapper{constructor(t=!1,e=!1){this.markup=t,this.silent=e,this.creg=/\[\[oc(\d+)::((.*?)(::(.*?))?)?\]\]/g,this.custom=!1,Array.prototype.group=function(t,e=[],r=e){var s=[];return this.map(i=>r!==(r=t?t(i):i)?e.push(s=[i]):s.push(i)),e}}add(t){var e=new RegExp(this.creg),r=t.match(e),[s,i]=[[],[]],l="";if(r){this.custom=!0;var n={};l=t.replace(this.creg,function(t,e){return n[e]=(n[e]||0)+1,"{{"+e+"}}"}),r.sort();var o=r.group();for(n=0;n<o.length;n++){var a=this.retnum(o[n][0].split("::")[0]);i.push(a);var p=o[n][0].split("::")[1];p=p.substring(0,p.length-2),s.push(p)}}else this.custom=!1,l=null,i=null,s=this.getLineItems(t);var h=parseNoteSettings(jsSetOpts),f=new ClozeGenerator(h,maxfields,this.custom),[u,m,g]=f.generate(s,l,i);return this.updateNote(u,m,h,this.custom)}retnum(t){var e=t.replace(/[^0-9]/g,"");return parseInt(e,10)}getClozeItems(t){t.sort();for(var e=t.group(),r=[],s=[],i=0;i<e.length;i++){var l=this.retnum(e[i][0].split("::")[0]);s.push(l);var n=e[i][0].split("::")[1];n=n.substring(0,n.length-2),r.push(n)}return[r,s]}getLineItems(t){var e=(new DOMParser).parseFromString(t,"text/html"),r=e.body.getElementsByTagName("*");for(var s of r){if("OL"==s.tagName){this.markup="ol";break}if("UL"==s.tagName){this.markup="ul";break}this.markup="div";break}return this.markup||(this.markup="div"),e.body.innerText.split("\n").map(function(t){return t.trim()}).filter(t=>t)}updateNote(t,e,r,s){var i={},l=r[1],n=1;for(var o of t){var a="Text"+n;n++,i[a]=[],i[a]=s?o:this.processField(o)}return e=l[3]?"":s?e:this.processField(e),i.Full=e,i.Settings=createNoteSettings(r),i}processField(t){var e=this.markup,r="",s="",i="";if("div"==e)for(var l of t)i+=`<${e}>${l}</${e}>`;else for(var l of(r=`<${e}>`,s=`</${e}>`,t))i+=`<li>${l}</li>`;return 0==i.trim().length?"":r+i+s}}class ClozeGenerator{constructor(t,e,r){this.maxfields=e,this.before=t[0][0],this.prompt1=t[0][1],this.after=t[0][2],this.options=t[1],this.start=null,this.total=null,this.custom=r}slice(t,e,r,s){var i,l,n,o=(t.slice||Array.prototype.slice).call(t,e,r);if(!s)return o;for(i=[],l=o.length,n=s>0?0:l-1;n<l&&n>=0;n+=s)i.push(o[n]);return"string"==typeof t?i.join(""):i}generate(t,e=null,r=null){if(length=t.length,this.prompt1>length)return[0,null,null];if(this.options[2]?(this.total=length+this.prompt1-1,this.start=1):(this.total=length,this.start=this.prompt1),this.total>this.maxfields)return[null,null,this.total];for(var s=[],i=this.start;i<this.total+1;i++){var l=Array.from({length:length},(t,e)=>"..."),n=this.getClozeStart(i),o=this.getBeforeStart(i,n),a=this.getAfterEnd(i),p=[],h=0;if(null!=o){p=[];for(var f=o;f<n;f++)p.push(t[f]);p=this.removeHints(p),h=0;for(f=o;f<n;f++)l[f]=p[h],h++}if(null!=a){p=[];for(f=i;f<a;f++)p.push(t[f]);p=this.removeHints(p),h=0;for(f=i;f<a;f++)l[f]=p[h],h++}p=[];for(f=n;f<i;f++)p.push(t[f]);p=this.formatCloze(p,i-this.start+1),h=0;for(f=n;f<i;f++)l[f]=p[h],h++;field=this.formatSnippets(l,e,r),s.push(field)}var u=s.length;if(this.maxfields>this.total){var m=Array.from({length:this.maxfields-s.length},(t,e)=>"");s=s.concat(m)}var g=this.formatCloze(t,this.maxfields+1);return[s,this.formatSnippets(g,e,r),u]}formatCloze(t,e){var r=[];for(item of t)if("object"!=typeof item){var s=`{{c${e}::${item}}}`;r.push(s)}else{var l=[];for(i of item){s=`{{c${e}::${i}}}`;l.push(s)}r.push(l)}return r}removeHints(t){var e=[];for(item of t)if("object"!=typeof item)e.push(item.split("::")[0]);else{var r=[];for(i of item)r.push(i.split("::")[0]);e.push(r)}return e}zip(t){return t[0].map(function(e,r){return t.map(function(t){return t[r]})})}formatSnippets(t,e,r){var s=e;if(!s)return t;for(var[i,l]of this.zip([r,t]))if("..."==l)s=s.replaceAll("{{"+i+"}}",l);else if("object"!=typeof l)s=s.replaceAll("{{"+i+"}}",l,1);else for(item in l)s=s.replaceAll("{{"+i+"}}",item,1);return s}getClozeStart(t){return t<this.prompt1||t>this.total?0:t-this.prompt1}getBeforeStart(t,e){return 0==this.before||e<1||this.before&&this.options[1]&&t==this.total?null:null==this.before||this.before>e?0:e-this.before}getAfterEnd(t){var e=this.total-t;return 0==this.after||e<1||this.after&&this.options[0]&&t==this.start?null:null==this.after||this.after>e?this.total:t+this.after}}