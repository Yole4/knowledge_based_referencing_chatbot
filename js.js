const userInput = document.querySelector('.chat-input textarea');
const send = document.querySelector('.chat-input span');
const chatbox = document.querySelector(".chatbox");

// const API_KEY = "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";

// const generateResponse = () => {
//     const API_URL = "https://api.openai.com/v1/chat/completions"

//     const requestOptions = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${API_KEY}`
//         },
//         body: JSON.stringify({
//             model: "gpt-3.5-turbo",
//             "messages": [
//                 {
//                     "role": "user",
//                     "content": "Hello!"
//                 }
//             ]
//         })
//     };

//     fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
//         console.log(data);
//     }).catch((error) => {
//         console.log(error);
//     })
// }

let userMessage;

const createChatLi = (message, className) => {
    const chatLi = document.createElement('li');
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ? `<p>${message}<br></p>` : `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;
    chatLi.innerHTML = chatContent;
    return chatLi;
}

const handleChat = () => {
    userMessage = userInput.value.trim();
    if (!userMessage) return;

    chatbox.appendChild(createChatLi(userMessage, "outgoing"));

    setTimeout(() => {
        chatbox.appendChild(createChatLi("...", "incoming"));
        // generateResponse();
    }, 500);
}

send.addEventListener("click", handleChat);