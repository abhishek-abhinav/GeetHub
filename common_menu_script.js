addEventListener("keypress", async (e) => {
    if (e.key == "/") {
        $("#search").css("display", "unset");
    }

})
$(".searchbar,.search").click(async () => {
    await $("#search").css("display", "unset");
    await $("#search").focus();

})

$(".about-us").click(() => {
    console.log("hi")
    open("about.html", "_self")
})
$(".home").click(() => {
    open("index.html", "_self")
})
$(".contact-us").click(() => {
    open("Footer/contact/contact.html", "_self")
})

let followUs = document.querySelector(".follow-us")
let social = document.querySelector(".social")

followUs.addEventListener("click", (e) => {
    // console.log("e")
    social.classList.toggle("d-none")
    followUs.style.color = ""
    document.querySelector(".follow-us i").classList.replace("fa-angle-up", "fa-angle-down")
    if (!social.classList.contains("d-none")) {
        followUs.style.color = "yellow"
        document.querySelector(".follow-us i").classList.replace("fa-angle-down", "fa-angle-up")
    }
})

for (let index = 0; index < $(".tabs").length - 1; index++) {
    $(".tabs")[index].addEventListener("click", () => {
        $(".menu").css("transform", "translateX(-20rem)")
    })
}


//Hamburger Function
$(".hamburger").click(() => {
    $(".menu").css("transform", "translateX(0)")
})
$(".close").click(() => {
    $(".menu").css("transform", "translateX(-20rem)")
    social.classList.add("d-none")
    followUs.style.color = ""
    document.querySelector(".follow-us i").classList.replace("fa-angle-up", "fa-angle-down")
})



let navButtons= document.querySelectorAll("nav button");
    navButtons.forEach(btn=>{
        btn.addEventListener("click",()=>{
            // console.log(btn.id);
            alert(`'${btn.id}' prohibited. Feature coming soon!!!`)
        })
    })