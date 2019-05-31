// visibility of divs
function changeVisibility(elementid) {
    document.getElementById("des").style.display = "none";
    document.getElementById("camp").style.display = "none";
    document.getElementById("articles").style.display = "none";
    document.getElementById("events").style.display = "none";
    document.getElementById("news").style.display = "none";
    document.getElementById("reading").style.display = "none";
    document.getElementById(elementid).style.display = "block";
}

// defaults to false
function translateintoBool(str) {
    if (str == "1") return true;
    if (str == "0") return false;
    if (str == "No") return false;
    if (str == "Yes - year round") return true;
    return false;
}

// ALERTS
var alertblock = document.createElement("div");
if ( alert_data["total"] == 0)
{
    var alerttext = document.createTextNode("No alerts at this time");
    alertblock.appendChild(alerttext);
}
else {
    for (i = 0; i < alert_data["total"]; i++)
    {
        // image
        var alerticon = document.createElement("IMG");
        alerticon.src = "/static/images/alerticon.png";
        alerticon.className = "alerticonstyle";

        var titlenode = document.createElement("div");
        var alerttitle = document.createTextNode(alert_data["data"][i]["title"]);
        titlenode.className = "boldtxt";
        titlenode.appendChild(alerticon);
        titlenode.appendChild(alerttitle);
        
        var textnode = document.createElement("div");
        var alerttext = document.createTextNode(alert_data["data"][i]["description"]);
        textnode.className = "txtblock";
        textnode.appendChild(alerttext);
        alertblock.appendChild(titlenode);
        alertblock.appendChild(textnode);
        var enter = document.createElement("br");
        alertblock.appendChild(enter);
    }
}
var element = document.getElementById("alert");
element.appendChild(alertblock);


// VISITOR CENTERS
var vcblock = document.createElement("div");
if ( vc_data["total"] == 0)
{
    var vctext = document.createTextNode("No visitor centers available at this park.");
    vcblock.appendChild(vctext);
}
else {
    for (i = 0; i < vc_data["total"]; i++)
    {
        // make title a link if there is extra data
        if (vc_data["data"][i]["directionsUrl"])
        {
            var titlenode = document.createElement("a");
            var vctitle = document.createTextNode(vc_data["data"][i]["name"]);
            titlenode.appendChild(vctitle);
            titlenode.className = "boldtxtlink";
            titlenode.setAttribute("href", vc_data["data"][i]["directionsUrl"]);
        }
        else{
            var titlenode = document.createElement("div");
            var vctitle = document.createTextNode(vc_data["data"][i]["name"]);
            titlenode.appendChild(vctitle);
            titlenode.className = "boldtxt";
        }
        
        var textnode = document.createElement("div");
        var vctext = document.createTextNode(vc_data["data"][i]["description"]);
        var textnode2 = document.createElement("div");
        var vctext2 = document.createTextNode(vc_data["data"][i]["directionsInfo"]);
        textnode.className = "txtblock";
        textnode.appendChild(vctext);
        textnode2.appendChild(vctext2);

        vcblock.appendChild(titlenode);
        vcblock.appendChild(textnode);
        vcblock.appendChild(textnode2);
        var enter = document.createElement("br");
        vcblock.appendChild(enter);
    }
}
var element = document.getElementById("vc");
element.appendChild(vcblock);


// CAMPGROUNDS

var campblock = document.createElement("div");
if ( camp_data["total"] == 0)
{
    var camptext = document.createTextNode("No campgrounds available at this park.");
    campblock.appendChild(camptext);
}
else {
    var weathernode = document.createElement("div");
    var weathertxt = document.createTextNode(camp_data["data"][0]["weatheroverview"]);
    weathernode.appendChild(weathertxt);
    weathernode.className = "txtblock";
    campblock.appendChild(weathernode);

    if (camp_data["data"][0]["regulationsurl"])
    {
        var regulationsnode = document.createElement("div");
        var regulationstxt = document.createTextNode("Check out campsite regulations here: ");
        var regulationshref = document.createElement("a");
        var regulationsurl = document.createTextNode(camp_data["data"][0]["regulationsurl"]);
        regulationshref.href = camp_data["data"][0]["regulationsurl"];
        regulationshref.appendChild(regulationsurl);
        regulationsnode.appendChild(regulationstxt);
        regulationsnode.appendChild(regulationshref);
        regulationsnode.className = "txtblock";
        campblock.appendChild(regulationsnode);
        var division = document.createElement("br");
        campblock.appendChild(division);
    }

    for (i = 0; i < camp_data["total"]; i++)
    {
        // make title a link if there is extra data
        if (camp_data["data"][i]["reservationsUrl"])
        {
            var titlenode = document.createElement("a");
            var camptitle = document.createTextNode(camp_data["data"][i]["name"]);
            titlenode.appendChild(camptitle);
            titlenode.className = "boldtxtlink";
            titlenode.setAttribute("href", camp_data["data"][i]["reservationsUrl"]);
        }
        else{
            var titlenode = document.createElement("div");
            var camptitle = document.createTextNode(camp_data["data"][i]["name"]);
            titlenode.appendChild(camptitle);
            titlenode.className = "boldtxt";
        }

        // icon variables
        var services = [
            {
                icon: "../static/images/rvicon.png",
                boolean: translateintoBool(camp_data["data"][i]["accessibility"]["rvallowed"])
            },
            {
                icon: "../static/images/dumpicon.png",
                boolean: translateintoBool(camp_data["data"][i]["amenities"]["dumpstation"])
            },
            {
                icon: "../static/images/wifiicon.png",
                boolean: translateintoBool(camp_data["data"][i]["amenities"]["internetConnectivity"])
            },
            {
                icon: "../static/images/laundryicon.png",
                boolean: translateintoBool(camp_data["data"][i]["amenities"]["laundry"])
            },
            {
                icon: "../static/images/storeicon.png",
                boolean: translateintoBool(camp_data["data"][i]["amenities"]["campstore"])
            },
            {
                icon: "../static/images/amphitheatericon.png",
                boolean: translateintoBool(camp_data["data"][i]["amenities"]["ampitheater"])
            }
        ]

        // add image icons
        for (j = 0; j < services.length; j++)
        {
            if (services[j].boolean)
            {
                var icon = document.createElement("IMG");
                icon.src = services[j].icon;
                icon.className = "iconstyle";
                titlenode.appendChild(icon);
            }
        }

        var textnode = document.createElement("div");
        var camptext = document.createTextNode(camp_data["data"][i]["description"]);
        textnode.className = "txtblock";
        textnode.appendChild(camptext);

        campblock.appendChild(titlenode);
        campblock.appendChild(textnode);
        var enter = document.createElement("br");
        campblock.appendChild(enter);
    }
}
var element = document.getElementById("campbody");
element.appendChild(campblock);


// ARTICLES
var articleblock = document.createElement("div");
if ( article_data["total"] == 0)
{
    var articletext = document.createTextNode("No articles available for this park.");
    articleblock.appendChild(articletext);
}
else {

    for (i = 0; i < article_data["data"].length; i++)
    {
        // make title a link if there is extra data
        if (article_data["data"][i]["url"])
        {
            var titlenode = document.createElement("a");
            var articletitle = document.createTextNode(article_data["data"][i]["title"]);
            titlenode.appendChild(articletitle);
            titlenode.className = "boldtxtlink";
            titlenode.setAttribute("href", article_data["data"][i]["url"]);
        }
        else{
            var titlenode = document.createElement("div");
            var articletitle = document.createTextNode(article_data["data"][i]["title"]);
            titlenode.appendChild(articletitle);
            titlenode.className = "boldtxt";
        }
        
        var textnode = document.createElement("div");
        var articletext = document.createTextNode(article_data["data"][i]["listingdescription"]);
        textnode.className = "txtblock";
        textnode.appendChild(articletext);

        articleblock.appendChild(titlenode);
        articleblock.appendChild(textnode);
        var enter = document.createElement("br");
        articleblock.appendChild(enter);
    }
}
var element = document.getElementById("articlesbody");
element.appendChild(articleblock);


// EVENTS
var eventblock = document.createElement("div");
if ( event_data["total"] == 0)
{
    var eventtext = document.createTextNode("No events available for this park.");
    eventblock.appendChild(eventtext);
}
else {
    for (i = 0; i < event_data["data"].length; i++)
    {
        // make title a link if there is extra data
        if (event_data["data"][i]["infourl"])
        {
            var titlenode = document.createElement("a");
            titlenode.className = "boldtxtlink";
            titlenode.setAttribute("href", event_data["data"][i]["infourl"]);
        }
        else{
            var titlenode = document.createElement("div");
            titlenode.className = "boldtxt";
        }
        var eventtitle = document.createTextNode(event_data["data"][i]["title"]);
        titlenode.appendChild(eventtitle);
        
        
        // given HTML tags
        var textnode = document.createElement("div");
        textnode.insertAdjacentHTML('beforeend', event_data["data"][i]["description"]);
        textnode.className = "txtblock";

        eventblock.appendChild(titlenode);
        eventblock.appendChild(textnode);
        var enter = document.createElement("br");
        eventblock.appendChild(enter);
    }
}
var element = document.getElementById("eventsbody");
element.appendChild(eventblock);

// NEWS RELEASES
var newsblock = document.createElement("div");
if (news_data["total"] == 0)
{
    var newstext = document.createTextNode("No news releases available for this park.");
    newsblock.appendChild(newstext);
}
else {
    for (i = 0; i < news_data["data"].length; i++)
    {
        // make title a link if there is extra data
        if (news_data["data"][i]["url"])
        {
            var titlenode = document.createElement("a");
            titlenode.className = "boldtxtlink";
            titlenode.setAttribute("href", news_data["data"][i]["url"]);
        }
        else{
            var titlenode = document.createElement("div");
            titlenode.className = "boldtxt";
        }
        // news title
        var newstitle = document.createTextNode(news_data["data"][i]["title"]);
        titlenode.appendChild(newstitle);
        
        // release date
        var textnode = document.createElement("div");
        var newsdate = document.createTextNode(news_data["data"][i]["releasedate"]);
        var format = document.createTextNode(":  ");
        textnode.appendChild(newsdate);
        textnode.appendChild(format);

        // abstract
        var newstext = document.createTextNode(news_data["data"][i]["abstract"]);
        textnode.className = "txtblock";
        textnode.appendChild(newstext);

        newsblock.appendChild(titlenode);
        newsblock.appendChild(textnode);
        var enter = document.createElement("br");
        newsblock.appendChild(enter);
    }
}
var element = document.getElementById("newsbody");
element.appendChild(newsblock);


// EDUCATIONAL RESOURCES
var edublock = document.createElement("div");
if (edu_data["total"] == 0)
{
    var edutext = document.createTextNode("No lesson plans available for this park.");
    edublock.appendChild(edutext);
}
else {
    for (i = 0; i < edu_data["data"].length; i++)
    {
        // make title a link if there is extra data
        if (edu_data["data"][i]["url"])
        {
            var titlenode = document.createElement("a");
            titlenode.className = "boldtxtlink";
            titlenode.setAttribute("href", edu_data["data"][i]["url"]);
        }
        else{
            var titlenode = document.createElement("div");
            titlenode.className = "boldtxt";
        }
        // edu title
        var edutitle = document.createTextNode(edu_data["data"][i]["title"]);
        titlenode.appendChild(edutitle);
        
        var textnode = document.createElement("div");
        
        // grade level
        var gradenode = document.createElement("div");
        var level = document.createTextNode("Grade Level(s): ");
        var edulevel = document.createTextNode(edu_data["data"][i]["gradelevel"]);
        gradenode.appendChild(level);
        gradenode.appendChild(edulevel);
        textnode.appendChild(gradenode);

        // duration
        var durationnode = document.createElement("div");
        var duration = document.createTextNode("Duration: ");
        var eduduration = document.createTextNode(edu_data["data"][i]["duration"]);
        durationnode.appendChild(duration);
        durationnode.appendChild(eduduration);
        textnode.appendChild(durationnode);

        // question objective
        var edutext = document.createTextNode(edu_data["data"][i]["questionobjective"]);
        textnode.className = "txtblock";
        textnode.appendChild(edutext);

        edublock.appendChild(titlenode);
        edublock.appendChild(textnode);
        var enter = document.createElement("br");
        edublock.appendChild(enter);
    }
}
var element = document.getElementById("edubody");
element.appendChild(edublock);

// PEOPLE
var peopleblock = document.createElement("div");
if (people_data["total"] == 0)
{
    var peopletext = document.createTextNode("No people available for this park.");
    peopleblock.appendChild(peopletext);
    var enter = document.createElement("br");
    peopleblock.appendChild(enter);
}
else {
    for (i = 0; i < people_data["data"].length; i++)
    {
        // make title a link if there is extra data
        if (people_data["data"][i]["url"])
        {
            var titlenode = document.createElement("a");
            titlenode.className = "boldtxtlink";
            titlenode.setAttribute("href", people_data["data"][i]["url"]);
        }
        else{
            var titlenode = document.createElement("div");
            titlenode.className = "boldtxt";
        }
        // people title
        var peopletitle = document.createTextNode(people_data["data"][i]["title"]);
        titlenode.appendChild(peopletitle);
        
        var textnode = document.createElement("div");
        
        // listing
        var peopletext = document.createTextNode(people_data["data"][i]["listingdescription"]);
        textnode.className = "txtblock";
        textnode.appendChild(peopletext);

        peopleblock.appendChild(titlenode);
        peopleblock.appendChild(textnode);
        var enter = document.createElement("br");
        peopleblock.appendChild(enter);
    }
}
var element = document.getElementById("peoplebody");
element.appendChild(peopleblock);

// PLACES
var placesblock = document.createElement("div");
if (places_data["total"] == 0)
{
    var placestext = document.createTextNode("No places available for this park.");
    placesblock.appendChild(placestext);
    var enter = document.createElement("br");
    placesblock.appendChild(enter);
}
else {
    for (i = 0; i < places_data["data"].length; i++)
    {
        // make title a link if there is extra data
        if (places_data["data"][i]["url"])
        {
            var titlenode = document.createElement("a");
            titlenode.className = "boldtxtlink";
            titlenode.setAttribute("href", places_data["data"][i]["url"]);
        }
        else{
            var titlenode = document.createElement("div");
            titlenode.className = "boldtxt";
        }
        // places title
        var placestitle = document.createTextNode(places_data["data"][i]["title"]);
        titlenode.appendChild(placestitle);
        
        var textnode = document.createElement("div");
        
        // listing
        var placestext = document.createTextNode(places_data["data"][i]["listingdescription"]);
        textnode.className = "txtblock";
        textnode.appendChild(placestext);

        placesblock.appendChild(titlenode);
        placesblock.appendChild(textnode);
        var enter = document.createElement("br");
        placesblock.appendChild(enter);
    }
}
var element = document.getElementById("placesbody");
element.appendChild(placesblock);


