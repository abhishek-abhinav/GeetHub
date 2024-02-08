function savePreferences() {
    var cookieForm = document.getElementById("cookieForm");
    var preferences = {};

    // Get selected preferences
    for (var i = 0; i < cookieForm.elements.length; i++) {
        var element = cookieForm.elements[i];
        if (element.type === "checkbox") {
            preferences[element.name] = element.checked;
        }
    }

    // Save preferences to localStorage or server
    // Example: localStorage.setItem("cookiePreferences", JSON.stringify(preferences));
    
    // Show confirmation message
    alert("Cookie preferences saved successfully!");
}
