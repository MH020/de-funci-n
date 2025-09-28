export function navbar(){
    const navbarContainer = document.getElementById("navbar");
    const navbar = document.createElement("nav")
    navbar.classList.add("navbar")

    const links =  [
        {text: "home", href: "/"},
        {text: "lesson1", href: "/"},
        {text: "lesson2", href: "/"},

    ];

    links.forEach(link => {
        const anchorTag = document.createElement("a")
        anchorTag.textContent = link.text; 
        anchorTag.href = link.href; 
        navbar.appendChild(anchorTag);
    })

    navbarContainer.appendChild(navbar);
}
navbar();


