document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.getElementById("contactForm");
    const responseMessage = document.getElementById("responseMessage");
  
    contactForm.addEventListener("submit", function(event) {
      event.preventDefault();
      const formData = new FormData(contactForm);
      const xhr = new XMLHttpRequest();
  
      xhr.open("POST", "send_mail.php", true);
      xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            responseMessage.textContent = "Message sent successfully!";
            responseMessage.classList.remove("hidden");
            contactForm.reset();
          } else {
            responseMessage.textContent = "Error! Message could not be sent.";
            responseMessage.classList.remove("hidden");
          }
        }
      };
      xhr.send(formData);
    });
  });
  