const natural = require('natural');
const CurrentDate = require('../current date/CurrentData');

const currentDate = CurrentDate();

function createChatbot() {
    const classifier = new natural.BayesClassifier();

    // Training data as an array of objects
    const trainingData = [
        { input: 'What time is it?', output: 'time' },
        { input: 'Tell me a joke', output: 'joke' },
        { input: 'Can you help me?', output: 'help' },
        { input: 'Goodbye', output: 'farewell' },
        { input: 'Thanks', output: 'gratitude' },
        { input: 'How does this work?', output: 'explanation' },
        { input: "What's the weather like today?", output: 'weather' },
        { input: 'Recommend a book to read', output: 'book-recommendation' },
        { input: 'Translate "hello" to French', output: 'translation' },
        { input: 'How far is the moon from Earth?', output: 'space' },
        { input: 'Can you set a reminder for 5 PM?', output: 'task' },
        { input: "How's the weather today?", output: 'weather' },
        { input: 'Tell me another joke', output: 'joke' },
        { input: 'Please assist me', output: 'help' },
        { input: 'What is your name?', output: 'self-introduction' },
        { input: 'How can I contact you?', output: 'contact-chatbot' },
        // { input: 'Who are you?', output: 'self-introduction' },
        { input: 'Hi', output: 'greeting' },
        { input: 'Hello', output: 'greeting' },
        { input: 'How are you?', output: 'greeting' },
        { input: 'Greetings', output: 'greeting' },
        { input: 'Hi there', output: 'greeting' },

        { input: 'What is the meaning of TCAS chatbot?', output: 'tcas-info' },
        { input: 'What is Archiving System?', output: 'tcas-archive' },
        { input: 'What is Expert System?', output: 'tcas-expert' },
        { input: 'What is Knowledge-Base System?', output: 'tcas-knowledge' },
        { input: 'What is Chatbot?', output: 'tcas-chatbot' },
        { input: 'What is Natural Language Processing?', output: 'tcas-nlp' },
        { input: 'What is NLP?', output: 'tcas-nlp' },
        { input: 'What is Double Hashing?', output: 'tcas-double' },
        { input: 'What is Inference Engine?', output: 'tcas-inference' },
        { input: 'What is Text Classifier?', output: 'tcas-text' },
        { input: 'What is Hash Table?', output: 'tcas-hash-table' },
        { input: 'What is User Interface?', output: 'tcas-user-interface' },
        { input: 'What is Thesis?', output: 'tcas-thesis' },
        { input: 'What is Capstone?', output: 'tcas-capstone' },
        { input: 'What is Repository?', output: 'tcas-repository' },
        { input: 'What is Metadata?', output: 'tcas-metadata' },
        { input: 'What is your knowledge?', output: 'tcas-knowledge' },
    ];

    // Add training data from the array
    trainingData.forEach(dataPoint => {
        classifier.addDocument(dataPoint.input, dataPoint.output);
    });

    // Train the classifier
    classifier.train();

    // Chatbot logic
    function respondToUserInput(input) {
        const intent = classifier.classify(input);
        switch (intent) {
            case 'contact-chatbot':
                return 'Follow this steps: Open this link https://tcas-with-integrated-knowledge-based.onrender.com. After opened the link go to about-us Find contact info like email or number Good Luck!';
            case 'greeting':
                return 'Hello! How can I assist you today?';
            case 'time':
                return `The current date time is ${currentDate}.`;
            case 'joke':
                return "How do you know you're in love with a programmer? When they make your heart race, even without semicolons.!";
            case 'help':
                return "Of course, I'd be happy to help.What do you need assistance with?";
            case 'farewell':
                return 'Goodbye! Have a great day!';
            case 'gratitude':
                return "You're welcome! If you have more questions, feel free to ask.";
            case 'explanation':
                return "I'm here to assist you with your questions and tasks.";
            case 'self-introduction':
                return "I'm a chatbot designed to help you with information and tasks.";
            case 'weather':
                return 'I can provide you with the current weather information if you tell me your location.';
            case 'book-recommendation':
                return 'Sure, I can recommend a book. What genre are you interested in?';
            case 'translation':
                return 'I can help you with translations. What word or phrase would you like to translate?';
            case 'space':
                return 'I can answer questions about space. What would you like to know?';
            case 'tcas-inference':
                return "Inference engine is a component of knowledge-based systems responsible for applying rules and drawing conclusions based on the information stored in the knowledge base. It plays a central role in decision-making processes.";
            case 'task':
                return 'Certainly, I can help you set a reminder. Please specify the time and details.';
            case 'tcas-knowledge':
                return "My current knowledge as of now are limited to understanding research-related terms, specifically in the context of my project titled 'Thesis and Capstone Archiving System with an Integrated Knowledge-Based Referencing Chatbot,' and providing simple greetings. I'm still a work in progress, but in the future, I aim to offer a broader range of knowledge and assistance based on the documents uploaded to my system.";
            case 'tcas-double':
                return 'The double hashing technique is a method for addressing collisions and improving the efficiency of searching in data structures, particularly hash tables. It involves using two hash functions to determine the location for storing and retrieving data.';
            case 'tcas-info':
                return "TCAS means Thesis and capstone archiving system with integrated knowledge-based referencing chatbot";
            case 'tcas-thesis':
                return "Thesis is a research paper written by students in college or university. It's like a deep dive into a specific topic, where the author does research and shares their own insights.";
            case 'tcas-metadata':
                return "Metadata refers to the information that provides details about the theses and capstone projects. It contains information such as the title, author, publication date, and keywords. Metadata helps users find and understand the content within the archiving system more easily.";
            case 'tcas-repository':
                return "Repository is like a digital library where you store and manage the thesis and capstone projects. It's a central place for archiving and organizing these academic works, making them accessible to users for research and reference purposes.";
            case 'tcas-capstone':
                return "Capstone represents a significant final project or assignment that students complete at the end of their degree program. It's a practical application of their learning and often involves solving real-world challenges";
            case 'tcas-user-interface':
                return "User Interface it is an interactive design and layout that users interact with when accessing the archiving system. It's like the user-friendly front door to the system, where users can search for documents, browse categories, and access the archived thesis and capstone projects with easily.";
            case 'tcas-hash-table':
                return "Hash table is a smart way to organize and quickly find information about the archived theses and capstone projects. It's like a well-organized index that makes searching and accessing documents faster and more efficient in your system.";
            case 'tcas-text':
                return "Text Classifier is an algorithm that helps categorizing and organizing the content of the archived theses and capstone projects automatically. It gives hand to the users to easily locate and access relevant documents based on their research interests, improving their experience in archiving system.";
            case 'tcas-nlp':
                return "Natural Language Processing(NLP) is a field of artificial intelligence that focuses on enabling computers to understand, interpret, and generate human language in a valuable way. In the context of this study, NLP capabilities are utilized to enhance user interactions with the archiving system through the chatbot";
            case 'tcas-chatbot':
                return "Chatbot is a Conversational agents, also known as chatbots or chatterbots, are machine conversation systems designed to interact with human users using natural language. They can be employed for various applications, including customer service in e-commerce";
            case 'tcas-expert':
                return "Expert system is a computer program developed using artificial intelligence concepts and technologies. It mimics the decision-making capabilities of human experts within a limited domain, such as providing financial forecasts or assisting with specific tasks.";
            case 'tcas-knowledge':
                return "Knowledge-Base System is a repository of information, explanations, references, and related concepts that enrich and contextualize the archived thesis and capstone projects. This system serves as a valuable resource to enhance the user experience by providing background knowledge, definitions, citation guidelines, cross-references, and explanations, enabling users to better understand, reference, and navigate the archived academic works. It plays a vital role in augmenting research accessibility and supporting informed exploration within the archiving system.";
            case 'tcas-archive':
                return "Archiving System is a platform designed to systematically collect, organize, store, and provide access to a compiled collection of thesis and capstone projects. The system incorporates features for document submission, metadata management, user-friendly search and retrieval, quality assurance, and integration with a knowledge-base and chatbot. Its objective is to enhance research accessibility and user experience by offering a centralized repository of academic works while being efficient document discovery and referencing.";
            default:
                return "Sorry, I can't assist you today because my programmer is still in the process of enhancing my capabilities. If they make further progress, we can continue the conversation on another day. But in the meantime, if you have any concerns or need assistance, don't forget to keep a smile on your face! Good Luck 😊😉 (Eloy)";
        }
    }

    return respondToUserInput;
}

// Create the chatbot
// const chatbot = createChatbot();

module.exports = { createChatbot };


// const storyText = `
// Once upon a time, in a small village nestled between rolling hills and a meandering river, there lived a curious young girl named Lily. She had a head full of untamed curls and an insatiable thirst for knowledge. Every day, as the sun painted the sky in shades of gold, she would set off on adventures to explore the secrets of the world.

// One sunny morning, while wandering through the dense, enchanted forest at the edge of the village, Lily stumbled upon a hidden path. It was a path less traveled, overgrown with wildflowers and dappled with rays of sunlight. It beckoned to her with whispers of mystery and wonder.

// Lily, her eyes shining with excitement, followed the path deeper into the woods. As she ventured further, the forest seemed to come alive. Birds sang sweet melodies, and the leaves whispered ancient tales. She discovered a crystal-clear stream, its waters glistening like liquid diamonds. Beside it, a family of playful otters splashed and played.

// As the day turned to evening, Lily encountered a wise old oak tree, its gnarled branches reaching out like ancient storytellers. With a gentle smile, the oak tree began to share its wisdom with her. It spoke of the interconnectedness of all living things, the importance of kindness, and the magic of the natural world.
// `;

// function respondToUserInput(input) {
//     const intent = classifier.classify(input);
//     switch (intent) {
//         case 'story':
//             return storyText; // Provide the entire story.
//         case 'story-continuation':
//             // You can handle user queries for specific story details here.
//             if (input.toLowerCase().includes('young girl')) {
//                 return 'The young girl is named Lily.';
//             } else if (input.toLowerCase().includes('meandering river')) {
//                 return 'The village is nestled between rolling hills and a meandering river.';
//             }
//             // Add more specific queries and responses as needed.
//             return "I'm sorry, I don't have information about that specific detail in the story.";
//         // ... (previous intent cases)
//         default:
//             return "Sorry, I can't assist you today because my programmer is still in the process of enhancing my capabilities...";
//     }
// }