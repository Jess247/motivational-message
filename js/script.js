import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js"

const firebaseConfig = {
    databaseURL: "https://messgage-app-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const msgInDB = ref(database, 'messages/')

const textareaEl = document.querySelector(".textarea")
const textfieldToEl = document.querySelector("#to-textfield")
const textfieldFromEl =  document.querySelector("#from-textfield")
const btn = document.querySelector(".btn")
const msgContainer = document.querySelector(".messages")

btn.addEventListener("click", writeMsg)

onValue(msgInDB, (snapshot) => {
    if(snapshot.exists()) {
        let msgArray = Object.entries(snapshot.val())
        console.log(msgArray[0][1].from)
        for (let i = 0; i < msgArray.length; i++) {
            let currentMsgID = msgArray[i][0]
            renderMsg(msgArray[i][1].to, msgArray[i][1].text, msgArray[i][1].from,currentMsgID)
        }    
    } else {
        msgContainer.innerHTML = "There are no messages..."
    }
})

function renderMsg(to, text, from,msgId) {
    const msgLocation = ref(database, `messages/${msgId}`)
    let msgEl = document.createElement("div")
    msgEl.classList.add("msg")
    msgEl.innerHTML = `
    <p class="to">${to}</p>
    <p class="text">${text}</p>
    <p class="from">${from}</p>`

    msgEl.addEventListener("click", () => {
        remove(msgLocation)
    })
    
    clearValues()
    msgContainer.append(msgEl)
}


function writeMsg() {
    const msg = {
        from: textfieldFromEl.value,
        text: textareaEl.value,
        to:  textfieldToEl.value
    }    
    
    push(msgInDB, msg)
}

function clearValues() {
    textareaEl.value = ""
    textfieldFromEl.value = ""
    textfieldToEl.value = ""
}
