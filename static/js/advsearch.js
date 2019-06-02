// figure out which states are selected
function determineSelectedStates() {
    var curr_states = new Array();
    for (i = 0; i < stateArray.length; i++)
    {
        if (document.getElementById(stateArray[i]).checked == true)
        {
            curr_states.push(stateArray[i]);
        }
    }
    return curr_states;
}

// figure out which designations are selected
function determineSelectedDesignations() {
    var curr_designations = new Array();
    for (i = 0; i < designationArray.length; i++)
    {
        if (document.getElementById(designationArray[i]).checked == true)
        {
            curr_designations.push(designationArray[i]);
        }
    }
    return curr_designations;
}

// reload advancedsearch with appropriate filters
function reloadUpdated() {
    document.getElementById("maincontent").style.display = "none";
    document.getElementById("loading-section").style.visibility = "visible";
    var search = $('#searchbar').val();
    var limit = 50;
    if (document.getElementById("showall").checked == true)
    {
        limit = 500;
    }

    $.ajax({
        url: '/advancedsearch',
        type: 'POST',
        data: {"states":determineSelectedStates(), "designations":determineSelectedDesignations(), "searchterms": search, "limit": limit},
        success: function (res) {
            document.getElementById("loading-section").style.visibility = "hidden";
            document.open();
            document.write(res); // res is the response from the server 
            document.close();
            console.log("success");
        },
        error: function (error) { console.log(error) }
    })
}

// build the search results content
function build()
{
    if (numentries == 0)
    {
        var panel = document.createElement("div");
        var text = document.createTextNode("No results :(.");
        panel.appendChild(text);
        var element = document.getElementById("maincontent");
        element.appendChild(panel);
    }

    // Creating menu (states)
    var j = 0;
    for (i = 0; i < stateArray.length; i++) {

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
        if (stateArray[i] === selectedStates[j]) {
            checkbox.checked = true;
            j++;
        }
        else
        {
            checkbox.checked = false;
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

        var element = document.getElementById("stateslist");
        element.appendChild(listitem);
    }

    // Creating menu (Designations)
    var k = 0;
    for (i = 0; i < designationArray.length; i++)
    {
        // create HTML components
        var listitem = document.createElement("li");
        listitem.id = "listbox";
        listitem.className = "list-group-item";

        var customdiv = document.createElement("div");
        customdiv.className ="custom-control custom-checkbox";

        var checkbox = document.createElement("input");
        checkbox.className = "custom-control-input";
        checkbox.id = designationArray[i];
        checkbox.setAttribute("type", "checkbox");
        // check if designation is selected
        if (designationArray[i] == selectedDesignations[k]) {
            checkbox.checked = true;
            k++;
        }
        else
        {
            checkbox.checked = false;
        }

        customdiv.appendChild(checkbox);

        var designation_label = document.createElement("label");
        designation_label.id = "listtext";
        designation_label.className ="custom-control-label";
        designation_label.setAttribute("for", designationArray[i]);
        var designation_label_text = document.createTextNode(designationArray[i]);
        designation_label.appendChild(designation_label_text);
        customdiv.appendChild(designation_label);

        listitem.appendChild(customdiv);

        var element = document.getElementById("designationslist");
        element.appendChild(listitem);
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
        var titlediv = document.createElement("div");
        var text = document.createElement("h5");
        var node = document.createTextNode(data[i]['fullName']);
        text.appendChild(node);
        text.className = "desblock";
        titlediv.appendChild(text);
        titlediv.id ="parktitle";

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
        info.className = "desblock";

        // description
        var descriptionblock = document.createElement("p");
        var des = document.createTextNode(data[i]['description']);
        descriptionblock.className = "desblock";
        descriptionblock.append(des);

        // add to panel div
        panel.append(img);
        panel.append(titlediv);
        panel.append(info);
        panel.append(descriptionblock);

        var element = document.getElementById("maincontent");
        element.appendChild(panel);
    }
}

