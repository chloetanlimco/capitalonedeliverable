var j = 0;
for (i = 0; i < 56; i++) {

    // create HTML components
    var listitem = document.createElement("li");
    listitem.id = "listbox";
    listitem.className = "list-group-item";

    var customdiv = document.createElement("div");
    customdiv.className ="custom-control custom-checkbox";
    
    var checkbox = document.createElement("input");
    checkbox.className = "custom-control-input";
    checkbox.id = stateArray[i];
    checkbox.setAttribute("type", "checkbox");
    // check if state is selected
    if (stateArray[i] == selectedStates[j]) {
        checkbox.checked = true;
    }
    else
    {
        checkbox.checked = false;
        j++;
    }
    
    customdiv.appendChild(checkbox);

    var state_label = document.createElement("label");
    state_label.id = "listtext";
    state_label.className ="custom-control-label";
    state_label.setAttribute("for", stateArray[i]);
    var state_label_text = document.createTextNode(stateArray[i]);
    state_label.appendChild(state_label_text);
    customdiv.appendChild(state_label);

    listitem.appendChild(customdiv);

    var element = document.getElementById("list");
    element.appendChild(listitem);
}

function determineSelected() {
    var curr_states = new Array();
    for (i = 0; i < 56; i++)
    {
        if (document.getElementById(stateArray[i]).checked == true)
        {
            curr_states.push(stateArray[i]);
        }
    }
    return curr_states;
}

function reloadUpdated() {
    var search = $('#searchbar').val();
    $.ajax({
        type: "POST",
        url: "/advancedsearch",
        data: {"list":determineSelected(), "searchterms": search},
        success: function(response) {   
            document.write(response);
        }
    });
}

function redirect_to_park(park_code)
{
    document.location.href='{{ url_for( 'park', park_code=park_code) }}';
    var parkurl = "park/" + park_code;
    return parkurl;
}

for (i = 0; i < numentries; i++) {
    var img = document.createElement("IMG");
    img.setAttribute("src", String(imgArray[i]));
    img.id = "icon";

    var panel = document.createElement("div");
    var park_code = data[i]["parkCode"];
    panel.id = park_code;
    panel.className = "resultblock";
    panel.setAttribute("action", "/about");
    panel.setAttribute("method", "post");
    // creates unique link and redirects users
    panel.setAttribute("onclick", "window.location.href=redirect_to_park(this.id)");

    // title: full name of park
    var text = document.createElement("h5");
    var node = document.createTextNode(data[i]['fullName']);
    text.appendChild(node);
    text.id = "desblock";

    // states + designations
    var info = document.createElement("p");
    var state_title = document.createTextNode("States: ");
    var state = document.createTextNode(data[i]['states']);
    var enter = document.createElement("br");
    var designation_title = document.createTextNode("Designation: ");
    var designation = document.createTextNode(data[i]['designation']);
    info.appendChild(state_title);
    info.appendChild(state);
    info.appendChild(enter);
    info.appendChild(designation_title);
    info.appendChild(designation);
    info.id = "desblock";

    // description
    var descriptionblock = document.createElement("p");
    var des = document.createTextNode(data[i]['description']);
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