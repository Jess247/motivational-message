const textareaEl = document.querySelector(".textarea")
const textfieldToEl = document.querySelector("#to-textfield")
const textfieldFromEl =  document.querySelector("#from-textfield")
const btn = document.querySelector(".btn")
const msgContainer = document.querySelector(".messages")

btn.addEventListener("click", renderMsg)

function renderMsg() {
    let msg = `
    <div class="msg">
    <p class="to">${textfieldToEl.value}</p>
    <p class="text">${textareaEl.value}</p>
    <p class="from">${textfieldFromEl.value}</p>
    </div>`

    msgContainer.innerHTML = msg
    
    
}
