// Creating menu (states)
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

// figure out which states are selected
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

// reload advancedsearch with appropriate filters
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