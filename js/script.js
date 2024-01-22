import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js"
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js"

const firebaseConfig = {
    databaseURL: "https://messgage-app-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const msgInDB = ref(database, 'messages/')

const msg = {
    form: "",
    text: "",
    to: ""
}
console.log(msgInDB)


console.log(app)

const textareaEl = document.querySelector(".textarea")
const textfieldToEl = document.querySelector("#to-textfield")
const textfieldFromEl =  document.querySelector("#from-textfield")
const btn = document.querySelector(".btn")
const msgContainer = document.querySelector(".messages")

btn.addEventListener("click", renderMsg)

function writeMsg() {
    msg.form = textfieldFromEl.value
    msg.to = textfieldToEl.value
    msg.text = textareaEl.value
    push(msgInDB, msg)
}
function renderMsg() {
    let msgHTML = `
    <div class="msg">
    <p class="to">${textfieldToEl.value}</p>
    <p class="text">${textareaEl.value}</p>
    <p class="from">${textfieldFromEl.value}</p>
    </div>`
    writeMsg()
    clearValues()
    msgContainer.innerHTML += msgHTML 
}

function clearValues() {
    textareaEl.value = ""
    textfieldFromEl.value = ""
    textfieldToEl.value = ""
}
