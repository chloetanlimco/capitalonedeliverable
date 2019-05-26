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
