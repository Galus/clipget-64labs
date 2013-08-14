//THE BELOW CODE SECTION IS ADDED TO MEET HTTPS REQUIREMENTS
//=== Mariusz Janusz Galus Custom Javascript Library === File: MJGlib.js ======
//-----------------------------------------------------------------------------
//--- Author: Mariusz Janusz Galus 
//--- Email:  mg@ieee.org
//--- Site:   http://www.mariuszgalus.com
//-----------------------------------------------------------------------------
//--- Note: Please do not redistribute this library for anything other than
//---       educational purposes.
//-----------------------------------------------------------------------------
//== Quick getElementById using $ (just like in JQuery)
  function $(id) { return document.getElementById(id); }
//-- This creates and returns an attribute
  var newAtt = function(type, string) {
    var att = document.createAttribute(type);
    att.value = string;
    return att;
  }
//-- Creates and returns elements.
  var newElement = function(type, att, string) {
    var tempEl = document.createElement(type);
    var tempAtt = newAtt(att, string); 
    tempEl.setAttributeNode(tempAtt);
    return tempEl;
  }
//-- Creates and returns a button within a div
  var makeButton = function(jscript, imageLocation, id, title) {
    var button = newElement("button", "onclick", jscript);
    var buttonImage = newElement("img", "src", imageLocation);
    var buttonContainer = newElement("div", "id", id);
    var titleText = newAtt("title", title);
    buttonImage.setAttributeNode(titleText);
    button.appendChild(buttonImage);
    buttonContainer.appendChild(button);
    return buttonContainer;
  }
//-- Checks to see which site we are on RETURNS bool
  var checkSite = function(string){
    var URL = document.URL;
    var indx =URL.indexOf(string);
    if (indx != -1) { return true } else return false;
  }
//EOF
//ADDED THE ABOVE CODE FROM MY SITE http://www.cse.usf.edu/~mjgalus/MJGlib.js
//BECAUSE OF HTTPS REQUIREMENT!
//================================================================================
//METAINFO
//clipget-64labs.aws.af.cm

//GLOBALS
var getURL = "http://clipget-64labs.aws.af.cm/get";
var clipURL = "http://clipget-64labs.aws.af.cm/clip?";

//Functions
var setTags = function(tagText) {
 var tagTextArr = tagText.split(",");
  tagTextArr.forEach( function(entry){
   document.getElementById('NewTagsTextBox').value = entry;
   document.getElementById('AddTagsButton').click();
  });
} //USAGE setTags("tag1,tag2,tag3,tagn,etc")

  function httpGet(theUrl)
    {
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
    } //USAGE httpGet("http://example.com/api/route")
    //Will return a response from a GET to example.com/api/route

  var getClip = function(getURL) {
    var string1 = httpGet(getURL);
    var obj1 = JSON.parse(string1 );
    var obj2 = obj1[0].dataStr;
    var data = JSON.parse(obj2);
  return data
  } //Usage var example = getClip(); 
//returns the data within the last clipped object (from my AppFog NodeJS/MongoDB solution)

var scrapeProfile = function() {
  //Scraping-LinkedIn
  //UserProfile
  //AllData
  var allData = document.getElementsByClassName('profile-overview-content')[0].innerText;
  var allData = allData.replace("&","AND");
  //Name
  var FirstLastName = document.getElementById('name').textContent;
  //Split into fname and lname
  var tempStr = FirstLastName.split(" ");
  var fname = tempStr[0]
  var lname = tempStr[1]
  //Occupation
  var pJob = document.getElementById('headline').innerText;
  //Location
  var CityState = document.getElementsByClassName('locality')[0].innerText;
  //Industry
  var Industry = document.getElementsByClassName('industry')[0].innerText;
  //Education Needs to be regex'd from allData
  var currEdu = allData.split("Education")[1]
  //LinkedIn Profile URL
  var pURL = document.getElementsByClassName('public-profile')[0].innerText;

  httpGet(clipURL+"fname="+fname.replace("&", "AND")
    +"&lname="+lname.replace("&", "AND")
    +"&pJob="+pJob.replace("&", "AND")
    +"&CityState="+CityState.replace("&", "AND")
    +"&Industry="+Industry.replace("&", "AND")
    +"&currEdu="+currEdu.replace("&", "AND")
    +"&pURL="+pURL.replace("&", "AND")
    +"&isOrg=false" );
  alert("Scraped User Profile");
  console.log("Scraped User Profile");
    // console.log("Job:",Occupation ,"City:",CityState ,"Biz:",Industry);
    // console.log("Edu:",currEdu);
} //This will rip all the important information from a 
//LinkedIn User's profile and format it into useful variables.
//and store it in the variable clipURL's mongoDB server. 

//CompanyProfile
//AllData
var scrapeCompany = function() {
  var allData = document.getElementsByClassName('basic-info')[0];
  var allData = allData.children[2].innerText;
  var allData = allData.replace("&","AND");
  //Founded Date
  var split0 = allData.split("Founded");
  var cYear = split0[1];
  //Company Size
  var split1 = split0[0].split("Company Size");
  var cSize = split1[1];
  //Type of Company
  var split2 = split1[0].split("Type");
  var cType = split2[1];
  if(cType){
    cType = cType.replace("&", "AND");
  }
  //Industry
  var split3 = split2[0].split("Industry");
  var cIndustry = split3[1];
  if(cIndustry){
    cIndustry = cIndustry.replace("&", "AND");
  }
  //Website
  var split4 = split3[0].split("Website");
  var cSite = split4[1];
  if(cSite) {
    cSite = cSite.replace("&", "AND");
  }  
  //Address 
  var split5 = split4[0].split("Headquarters");
  var cAddr = split5[1];
  if(cAddr) {
    cAddr = cAddr.replace("&", "AND");
  }
  //var cStateCountry = split5[1].split(",")[1]
  var comName = document.getElementsByClassName('name')[0].innerText;
  var cLIURL = document.URL.split("?")[0]
  httpGet(clipURL+"cYear="+cYear
    +"&cSize="+cSize
    +"&comName="+comName.replace("&","AND")
    +"&cType="+cType
    +"&cIndustry="+cIndustry
    +"&cSite="+cSite
    +"&cAddr="+cAddr
    +"&cURL="+document.URL.replace("&", "AND")
    +"&cLIURL="+cLIURL
    +"&isOrg=true" );
  alert("Scraped Company Profile");
  console.log("Scraped Company Profile");
} //This will rip all the important information from a 
//LinkedIn Company's profile and format it into useful variables.
//and store it in the variable clipURL's mongoDB server. 

//var TestData = getClip("http://clipget-64labs.aws.af.cm/get");
//FUNCTIONS FOR PASTING DATA
//Pasting a Contact / User Profile
var pasteContact = function() {
  var dataPaste = getClip(getURL);
  document.getElementById('FIRST_NAME').value = "TEST"+dataPaste.fname;
  document.getElementById('LAST_NAME').value = dataPaste.lname;
  document.getElementById('TITLE').value = dataPaste.pJob;
  document.getElementById('COMPANY').value = dataPaste.pJob;
  document.getElementById('socialInfo1').value = "http://"+dataPaste.pURL;
  document.getElementById('website1').value = dataPaste.pURL;
  document.getElementById('webType1').value = "Personal";
  document.getElementById('address_street1').value = dataPaste.CityState
  document.getElementById('address_country1').value = "United States"
  document.getElementById('notes').value = "INDUSTRY: " + dataPaste.Industry 
    + " EDU: " + dataPaste.currEdu 
    + " JOB: " + dataPaste.pJob
    + " LOCATION: " + dataPaste.CityState;
  
  alert("Pasted Contact");
}//USAGE Make sure you're on 'Add New Contact' portion of Insightly
//And then click the ping cloud button

//Pasting a Org / Company Profile
var pasteOrg = function() {
  var dataPaste = getClip(getURL);
  document.getElementById('ORGANISATION_NAME').value = "TEST"+dataPaste.comName;
  document.getElementById('website1').value = dataPaste.cSite;
  if (dataPaste.cAddr != "undefined") {
  document.getElementById('address_street1').value = dataPaste.cAddr;
  }
  document.getElementById('ORGANISATION_FIELD_4').value = dataPaste.cLIURL;

  document.getElementById('notes').value = "FOUNDED: " + dataPaste.cYear
  + " TYPE: " + dataPaste.cType
  + " INDUSTRY: " + dataPaste.cIndustry
  + " SIZE: " + dataPaste.cSize;
  alert("Pasted Organization");
}//USAGE Make sure you're on 'Add New Organization' portion of Insightly
//And then click the ping cloud button

//SPAWNING BUTTONS n STUFF
//======================================== file: l2i.js =======================
//== LinkedIn2Insightly Ripper
//==  Created by Mariusz Galus, http://www.mariuszgalus.com
//==  Last Updated: July 31st, 2013
//==
//=---------------------------------------------------------------------------- 
//== If you have any questions or concerns,
//==  please email me: mg@ieee.org
//==
//=---------------------------------------------------------------------------
//== USAGE: Create a bookmarklet with the following url code ==================
//==  WORKING 
//==  javascript:(function(){var injectScript = document.createElement('script');var atr = document.createAttribute('src');atr.value = "http://www.cse.usf.edu/~mjgalus/code/l2i.js";injectScript.setAttributeNode(atr);document.body.appendChild(injectScript);})();
//==  SHORTER WORKING 
//==  javascript:(function(){var d=document;var is=d.createElement('script');var atr=d.createAttribute('src');atr.value="http://www.cse.usf.edu/~mjgalus/code/l2i.js";is.setAttributeNode(atr);d.body.appendChild(is);})();
//==
//=============================================================================
//==  Function to load external scripts WARNING: SHOULD NOT USE ON HTTPS SITES
//COMMENTING OUT BECAUSE NOT COMPATABLE WITH INSIGHTLY's SECURED HTTPS SITE.
  // function loadScript(src, f) {
  //   var head = document.getElementsByTagName("head")[0];
  //   var script = document.createElement("script");
  //   script.src = src;
  //   var done = false;
  //   script.onload = script.onreadystatechange = function() { 
  //     // attach to both events for cross browser finish detection:
  //     if ( !done && (!this.readyState ||
  //       this.readyState == "loaded" || this.readyState == "complete") ) {
  //       done = true;
  //       if (typeof f == 'function') f();
  //       // cleans up a little memory:
  //       script.onload = script.onreadystatechange = null;
  //       head.removeChild(script);
  //     }
  //   };
  //   head.appendChild(script);
  // }
//==
//=----------------------------------------------------------------------------
//==  Loads my library and then executes the function code between START and END
  ///////////////////////////////////loadScript('http://www.cse.usf.edu/~mjgalus/MJGlib.js', function() { 


//START_SCRIPT EXECUTION
  //spawn the correct ripButton type Either Profile or Company rip
  if ( checkSite("profile") ) { 
    var ripButton = makeButton("scrapeProfile()", "https://i.imgur.com/mzzbjWR.png", "myRipBtn", "Rip LinkedIn");
    } else if ( checkSite("company") ) {
      var ripButton = makeButton("scrapeCompany()", "https://i.imgur.com/mzzbjWR.png", "myRipBtn", "Rip LinkedIn");
    }
  //Spawn the correct pasteButton type Either Profile=Contact or Company=Org.
  if ( checkSite("Organisations") ) { 
    var pasteButton = makeButton("pasteOrg()", "https://i.imgur.com/XO8CWFT.png", "myPasteBtn", "Paste2Insightly");
  } else if (checkSite("Contacts")) {
    var pasteButton = makeButton("pasteContact()", "https://i.imgur.com/XO8CWFT.png", "myPasteBtn", "Paste2Insightly");
  }
//  Insert into website (edit this yourself)
//  Insert to LinkedIn
    if ( checkSite("linkedin") ) { 
      if ( document.getElementById('top-header') !== null ) {
        var ipLinkedIn = document.getElementById('top-header');
        ipLinkedIn.appendChild(ripButton);
      }
    }  
//Insert to Insightly
    if ( checkSite("insight") ) {
     if ( document.getElementById('headeravatar') !== null ) {
        var ipInsightly = document.getElementById('headeravatar');
        ipInsightly.appendChild(pasteButton);
      }
    } 
//END_SCRIPT
 ///////////////////////////////////////////////////// });
//==
//=----------------------------------------------------------------------------
//EOF
