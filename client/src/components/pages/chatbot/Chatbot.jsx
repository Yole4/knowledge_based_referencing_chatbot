import React, { useEffect, useRef, useState } from 'react'
import '../../assets/css/Chatbot.css';
import axios from 'axios';

// backend url
import BackendUrl from '../backend url/BackendURL';

function Chatbot() {

    const token = localStorage.getItem('token');
    const backendUrl = BackendUrl();

    const [isChatbot, setIsChatbot] = useState(false);
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');

    const handleChat = async (e) => {
        e.preventDefault();

        setMessages([...messages, { userMessage: userInput, botMessage: "..." }]);
        setUserInput('');

        try {
            const response = await axios.post(`${backendUrl}/api/chat-request`, {userInput}, {  
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200){
                setTimeout(() => {
                setMessages([...messages, { botMessage: response.data.message, userMessage: userInput }]);
            }, 1000);
            }
        } catch (error) {
            console.log(error);
        }
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
