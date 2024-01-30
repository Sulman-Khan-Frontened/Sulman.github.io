const FilesName = document.querySelectorAll("[data-change-name]");
var shortcuts = document.querySelectorAll(".wrapper li");
shortcuts.forEach(active => {
    active.addEventListener("click", e => {
        let target = document.querySelector(e.currentTarget.dataset.sidebar);
        if (document.body.classList.contains("resize")) {
            document.body.classList.remove("resize")
        }
        shortcuts.forEach(remove => remove.classList.remove("active-shortcut"));
        let tabs = document.querySelectorAll(".helper ul");
        tabs.forEach(tab => tab.classList.remove("active_tab"))
        target.classList.add("active_tab");
        e.currentTarget.classList.add("active-shortcut")
    });
});

document.querySelector(".small").addEventListener("mouseenter", () => document.querySelector(".small").setAttribute("title", document.querySelector(".small").textContent))




FilesName.forEach(name => {
    name.removeAttribute("title");
    name.addEventListener("mouseenter", e => {
        e.currentTarget.setAttribute("title", e.currentTarget.querySelector("p").textContent + "- Double Click to Change Name")
    })
});


let Explorer = document.querySelectorAll(".explorer li");
let Uiactive = document.querySelectorAll(".header li");
let Files = document.querySelectorAll(".input");
Uiactive.forEach(ui => {
    ui.addEventListener("click", e => {
        const target = document.querySelector(e.currentTarget.dataset.activateui);
        const targetFile = document.querySelector(e.currentTarget.dataset.file);

        Files.forEach(e => e.classList.remove("active_file"))
        Uiactive.forEach(remove => remove.classList.remove("active_header_li"));
        Explorer.forEach(remove => remove.classList.remove("active_editor_file"));

        targetFile.classList.add("active_file")
        target.classList.add("active_editor_file");
        e.currentTarget.classList.add("active_header_li")
    })
});

Explorer.forEach(e => {

    e.addEventListener("click", main => {

        let getTarget = document.querySelector(main.currentTarget.getAttribute("addTo"));
        let getTargetedFile = document.querySelector(main.currentTarget.getAttribute("update"));

        Uiactive.forEach(e => e.classList.remove("active_header_li"));
        Explorer.forEach(remove => remove.classList.remove("active_editor_file"));
        Files.forEach(e => e.classList.remove("active_file"))

        getTargetedFile.classList.add("active_file")
        main.currentTarget.classList.add("active_editor_file");
        getTarget.classList.add("active_header_li");



    })
}
);

FilesName.forEach(files => {
    files.addEventListener("dblclick", e => {
        var newName = prompt("Enter File Name", "");
        let span = e.currentTarget.querySelector("span").innerText;
        let sendto = document.querySelector(e.currentTarget.getAttribute("sendto"));


        if (newName != "" || newName != false) {
            e.currentTarget.querySelector("p").innerText = newName + "." + span;
            sendto.innerText = newName + "." + span;
        } else {
            alert("Please Enter a Valid Name");
        }


    });
});

var Toggler = document.querySelector(".toggler");
document.body.classList.add("resize");
Toggler.addEventListener("click", () => {
    document.body.classList.toggle("resize");
})





var Links = document.querySelectorAll("[links]");
let a = document.querySelectorAll("[linker]");
var linker;
Links.forEach(Link => {
    if (Link.currentTarget == Link.target) {
        Link.addEventListener("click", e => {
            let Linke = document.querySelectorAll("[linker]").forEach(e => e.classList.remove("active_list"))
            let linker = Link.nextElementSibling;
            linker.classList.add("active_list")


        })
    }
});

a.forEach(e => {
    e.addEventListener("click", () => {
        let Element = e;
        if (Element.classList.contains("active_list")) {
            Element.classList.remove("active_list")
        }
    })
})


var Exit = document.querySelector("[exitEditor]");
Exit.addEventListener("click", () => {
    window.close()

})


var OpenFile = document.querySelector("[getFile]");

OpenFile.addEventListener("click", () => {
    var CreatedElement = document.createElement("input");
    CreatedElement.type = "file";
    CreatedElement.style = "width: 0px; height: 0px;";
    CreatedElement.accept = ".html,.css,.js"; // Allow HTML, CSS, and JavaScript files

    CreatedElement.addEventListener("change", function () {
        let files = CreatedElement.files;
        let file = files[0];

        if (file) {
            if (isValidFileExtension(file)) {
                console.log("Selected file name: " + file.name);
                console.log("Selected file size: " + file.size + " bytes");

                // Read the content of the file
                const reader = new FileReader();
                reader.onload = function (e) {
                    const fileContent = e.target.result;

                    // Get the code element
                    const htmlElement = document.getElementById("htmlCode");
                    const cssElement = document.getElementById("cssCode");
                    const jsElement = document.getElementById("jsCode");

                    // Set the content based on file type
                    if (file.name.toLowerCase().endsWith(".html")) {
                        htmlElement.innerText = fileContent;
                    } else if (file.name.toLowerCase().endsWith(".css")) {
                        cssElement.innerText = fileContent;
                    } else if (file.name.toLowerCase().endsWith(".js")) {
                        jsElement.innerText = fileContent;
                    } else {
                        console.log("Unsupported file type");
                    }

                };

                // Read the file as text
                reader.readAsText(file);
            } else {
                console.log("Invalid file type. Please select an HTML, CSS, or JavaScript file.");
            }
        } else {
            console.log("No file selected");
        }
    });

    CreatedElement.click();
});

function isValidFileExtension(file) {
    // Check if the file has a valid extension
    const allowedExtensions = ['.html', '.css', '.js'];
    return allowedExtensions.some(extension => file.name.toLowerCase().endsWith(extension));
}


var Run = document.querySelector(".run > div");
var Close = document.querySelector(".cross");
var output = document.querySelector(".Output");
var HTMLCode = document.querySelector("#htmlCode");
var cssCode = document.querySelector("#cssCode");
var jsCode = document.querySelector("#jsCode");
var output_container = document.querySelector(".output-container");


HTMLCode.value = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Hello World!</h1>
</body>
</html>`;
cssCode.value = `h1 {
    color: red;
}`;

jsCode.value = `
    // Change Your Ideas into Code.
`;




Run.addEventListener("click", function RunCode() {
    output_container.style.display = "flex";
    output.contentDocument.body.innerHTML = HTMLCode.value + "<style>" + cssCode.value + "</style>";
    output.contentWindow.eval(jsCode.value);
});


Close.addEventListener("click", function Close() {
    output_container.style.display = "none";
    console.log("closed");
});




// const setFile = document.querySelector("[setFile]");
// setFile




// HTMLCode.value ="HEllo"

// function createHTMLFile() {
//     const blob = new Blob([HTMLCode.value], { type: 'text/html' });
//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(blob);
//     link.download = 'output.html';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
// }



// createHTMLFile()


// script.js
// jsCode.value = "var a;"

// function saveJsCode() {

//     const blob = new Blob([jsCode.value], { type: 'application/javascript' });
//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(blob);
//     link.download = 'script.js';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
// }

// saveJsCode()



// script.js
// function saveCssCode() {
//     const blob = new Blob([cssCode.value], { type: 'text/css' });
//     const link = document.createElement('a');

//     // Set the link's attributes
//     link.href = URL.createObjectURL(blob);
//     link.download = 'styles.css';

//     // Append the link to the body
//     document.body.appendChild(link);

//     // Trigger a click on the link to start the download
//     link.click();

//     // Remove the link from the DOM
//     document.body.removeChild(link);
// }





var SelectAll = document.querySelector("[allSelect]");
var UnselectAll = document.querySelector("[allUnselect]");
SelectAll.addEventListener("click", () => {
    let activated = document.querySelector(".active_file");
    activated.querySelector("textarea").select();
});
UnselectAll.addEventListener("click", () => {
    let activated = document.querySelector(".active_file");
    activated.querySelector("textarea").setSelectionRange(0, 0);
});



var IncreaseFont = document.querySelector("[increaseFont]");
var DecreaseFont = document.querySelector("[decreaseFont]");

IncreaseFont.addEventListener("click", () => {
    let activated = document.querySelector(".active_file").querySelector("textarea");
    let property = window.getComputedStyle(activated);
    let val = property.getPropertyValue("font-size");
    val = parseInt(val);
    if(val < 31) {
        val += 1;
        activated.style.fontSize = val + "px";
    }
});

DecreaseFont.addEventListener("click", () => {
    let activated = document.querySelector(".active_file").querySelector("textarea");
    let property = window.getComputedStyle(activated);
    let val = property.getPropertyValue("font-size");
    val = parseInt(val);
    if(val > 22) {
        val -= 1;
        activated.style.fontSize = val + "px";
    }
});



let save = document.querySelector("[save]");
save.addEventListener("click", ()=>{
    let areas = document.querySelectorAll("textarea");
    let arr = [];
    areas.forEach( e => {
        let val = e.value;
        arr.push(val);
        localStorage.setItem('Value', JSON.stringify(arr));
        console.log(localStorage);
    })
});