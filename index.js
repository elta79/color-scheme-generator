const btnEl = document.getElementById("button")
const hexBox = document.getElementById("hex-box")
const colorBox = document.getElementById("color-box")
const newDiv = document.createElement('div')
const modalEl = document.getElementById("modal-element")

function renderScheme(schemeArray){

    schemeArray.map(color => {
        colorBox.innerHTML += newDiv.innerHTML = `<div class="color-code" id="${color}" style="background-color: ${color};"> &nbsp </div>`
        hexBox.innerHTML += newDiv.innerHTML = `<div class="hex-code">${color}</div>`
    })  
}

function copyToClipboard(color){
    if (navigator && navigator.clipboard && navigator.clipboard.writeText){
        navigator.clipboard.writeText(color)
        .then(function(){
            // console.log("COPIED" + color)
            modalEl.style.display = "block"
            setTimeout(() => {modalEl.style.display = "none"}, "2000")
        })        
    }
}

btnEl.addEventListener('click', () =>{

    hexBox.innerHTML = ""
    colorBox.innerHTML = ""

    const schemeModeEl = document.getElementById("scheme-mode").value
    const colorPicker = document.getElementById("color-picker").value.substr(1,7)
    
    console.log (colorPicker)
    console.log(schemeModeEl)


    fetch(`https://www.thecolorapi.com/scheme?hex=${colorPicker}&mode=${schemeModeEl}&count=6`)
        .then(res => res.json())
        .then(data => {
            let colorArray = data.colors
            let schemeArray =[]

            console.log(colorArray)
            colorArray.forEach(color => {
                schemeArray.push(color.hex.value)
            })

            renderScheme(schemeArray)
            // console.log("in fetch: "+schemeArray)

            // **Click Div for Color
            const colorCodeEls = document.getElementsByClassName('color-code')

            const colorClicked = e => {
                console.log(e.target.id)

                // **Copy to clipboard
                copyToClipboard(e.target.id)
            }
            for (let colorCodeEl of colorCodeEls){
                colorCodeEl.addEventListener("click", colorClicked)
            }

            // **Clear Arrays
            colorArray =[]
            schemeArray =[]
            // console.log("after clear: "+schemeArray + colorArray)
        })
    
})
