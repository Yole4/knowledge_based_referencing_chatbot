import React, { useEffect, useRef, useState } from 'react'
import '../../assets/css/Chatbot.css';
// import '../../assets/js/js.js';

function Chatbot() {

    const [isChatbot, setIsChatbot] = useState(false);
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');

    const handleChat = (e) => {
        e.preventDefault();

        // const user = userInput.trim();
        // if (!user) return;

        setMessages([...messages, { userMessage: userInput, botMessage: "Sorry, I can't answer your question at the moment because my programmer is currently busy. If they become available, we can continue the conversation on another day. But anyway, if you have a lot of problems or feel stressed, don't ever forget to smile! 😊😉" }]);

        // Simulate a response after a delay
        setTimeout(() => {
            setMessages([...messages, { botMessage: "Sorry, I can't answer your question at the moment because my programmer is currently busy. If they become available, we can continue the conversation on another day. But anyway, if you have a lot of problems or feel stressed, don't ever forget to smile! 😊😉", userMessage: userInput }]);
        }, 500);

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
                    <header>
                        <h2>TCAS Chatbot</h2>
                        <span onClick={() => setIsChatbot(false)} className="material-symbols-outlined">close</span>
                    </header>
                    <ul className="chatbox" ref={chatRef}>
                        <li className="chat incoming">
                            <span className="material-symbols-outlined">smart_toy</span>
                            <p>Hi there 👋<br />How can I help you today?</p>
                        </li>
                        <li className="chat outgoing">
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
                            <textarea placeholder="Enter a message..." required cols={30} rows={2} value={userInput} onChange={(e) => setUserInput(e.target.value)} />
                            <span id="send-btn" className="material-symbols-outlined"><button style={{ background: 'transparent', padding: '0', border: '0px solid white' }} type='submit'>Send</button></span>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Chatbot
