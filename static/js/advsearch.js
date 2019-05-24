$( document ).ready(function() {
    console.log("reached!");
    console.log(numentries);
    for (i = 0; i < {{numentries}}; i++) {
        var img = document.createElement("IMG");
        // placeholder since getting other json doesn't work. sigh
        img.setAttribute("src", String({{imgArray|safe}}[i]));
        img.id = "icon";

        var panel = document.createElement("div");
        panel.id = "resultblock";
        panel.setAttribute("action", "/about");
        panel.setAttribute("method", "post");

        // title: full name of park
        var text = document.createElement("h5");
        var node = document.createTextNode({{value|tojson}}[i]['fullName']);
        text.appendChild(node);
        text.id = "desblock";
        // states + designations
        var info = document.createElement("p");
        var state_title = document.createTextNode("States: ");
        var state = document.createTextNode({{value|tojson}}[i]['states']);
        var enter = document.createElement("br");
        var designation_title = document.createTextNode("Designation: ");
        var designation = document.createTextNode({{value|tojson}}[i]['designation']);
        info.appendChild(state_title);
        info.appendChild(state);
        info.appendChild(enter);
        info.appendChild(designation_title);
        info.appendChild(designation);
        info.id = "desblock";

        // description
        var descriptionblock = document.createElement("p");
        var des = document.createTextNode({{value|tojson}}[i]['description']);
        descriptionblock.id = "desblock";
        descriptionblock.append(des);

        // add to panel div
        panel.append(img);
        panel.append(text);
        panel.append(info);
        panel.append(descriptionblock);

        var element = document.getElementById("maincontent");
        element.appendChild(panel);
    }
});