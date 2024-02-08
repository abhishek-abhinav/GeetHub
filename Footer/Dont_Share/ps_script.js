function updatePrivacySettings() {
    var privacyForm = document.getElementById("privacyForm");
    var shareInfo = privacyForm.elements["shareInfo"].checked;

    // Update privacy settings
    if (shareInfo) {
        // Allow sharing of personal information
        alert("Your privacy settings have been updated. Personal information sharing is enabled.");
    } else {
        // Disable sharing of personal information
        alert("Your privacy settings have been updated. Personal information sharing is disabled.");
    }
}
