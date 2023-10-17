import React, { useEffect, useRef, useState } from 'react'
import '../../assets/css/Chatbot.css';
// import '../../assets/js/js.js';

function Chatbot() {

    const [isChatbot, setIsChatbot] = useState(false);
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [chatbotResponse, setChatbotResponse] = useState("Sorry, I can't assist you today because my programmer is still in the process of enhancing my capabilities. If they make further progress, we can continue the conversation on another day. But in the meantime, if you have any concerns or need assistance, don't forget to keep a smile on your face! Good Luck 😊😉 (Eloy)");

    const handleChat = (e) => {
        e.preventDefault();

        // const user = userInput.trim();
        // if (!user) return;

        setMessages([...messages, { userMessage: userInput, botMessage: "..." }]);

        // Simulate a response after a delay
        setTimeout(() => {
            if (userInput.toLowerCase() === "thank you" || userInput.toLowerCase() === "k" || userInput.toLowerCase() === "salamat") {
                // setChatbotResponse('Your welcome!');
                setMessages([...messages, { botMessage: "You'r Welcome!", userMessage: userInput }]);
            }
            else {
                setMessages([...messages, { botMessage: chatbotResponse, userMessage: userInput }]);
            }
        }, 1000);

        setUserInput('');
    };

    const chatRef = useRef(null);

    useEffect(() => {
        // Scroll to the bottom when new data is added
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <>
            <div className="show-chatbot">
                <button className="chatbot-toggler" onClick={() => setIsChatbot(isChatbot ? false : true)}>
                    {isChatbot ? (
                        <span className="material-symbols-outlined">close</span>
                    ) : (
                        <span className="material-symbols-outlined">mode_comment</span>
                    )}
                </button>
                <div className="chatbot" style={{ zIndex: '200', display: isChatbot ? 'block' : 'none', animation: isChatbot ? 'chatbotAnimate 0.5s linear' : '' }}>
                    <header className='bg-navy'>
                        <h2>TCAS Chatbot</h2>
                        <span onClick={() => setIsChatbot(false)} className="material-symbols-outlined">close</span>
                    </header>
                    <ul className="chatbox" ref={chatRef}>
                        <li className="chat incoming">
                            <span className="material-symbols-outlined">smart_toy</span>
                            <p>Hi there 👋<br />How can I help you today?</p>
                        </li>
                        {messages && messages.map(item => (
                            <>
                                <li className='chat outgoing' key={item.id}><p>{item.userMessage}</p></li>
                                <li className='chat incoming' key={item.id}><span className="material-symbols-outlined">smart_toy</span><p>{item.botMessage}</p></li>
                            </>
                        ))}
                    </ul>
                    <div className="chat-input">
                        <form onSubmit={handleChat}>
                            <input placeholder="Enter a message..." value={userInput} onChange={(e) => setUserInput(e.target.value)} required />
                            <span id="send-btn" className="material-symbols-outlined"><button style={{ background: 'transparent', padding: '0', border: '0px solid white' }} type='submit'>Send</button></span>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Chatbot
