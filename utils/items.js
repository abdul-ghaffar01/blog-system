const items = [
    {
        type: "heading",
        level: 1,
        text: "Building a Personal AI Chatbot from Scratch",
        styles: ["text-4xl", "font-bold", "mt-6", "mb-4"],
    },
    {
        type: "paragraph",
        text: "In this guide, I’ll walk you through the process of creating a personal AI chatbot that you can integrate into your website or portfolio. This project combines frontend, backend, and deployment skills to create a fully functional assistant that responds intelligently to user queries. <strong>Whether you're a beginner or a seasoned developer, this tutorial will give you valuable insights.</strong>",
        styles: ["text-base", "mb-4"],
    },
    {
        type: "image",
        src: "https://picsum.photos/id/1005/800/400",
        alt: "AI chatbot concept illustration",
        styles: ["rounded-lg", "shadow-lg", "my-6"],
    },
    {
        type: "heading",
        level: 2,
        text: "Step 1: Setting Up the Project",
        styles: ["text-2xl", "font-semibold", "mt-8", "mb-2"],
    },
    {
        type: "paragraph",
        text: "We'll start by creating the project structure. For the frontend, we use Next.js for SSR and modern React features. The backend will handle WebSocket connections for real-time messaging.",
        styles: ["mb-4"],
    },
    {
        type: "code",
        language: "bash",
        code: `mkdir ai-chatbot
cd ai-chatbot
npx create-next-app frontend
mkdir backend && cd backend && npm init -y`,
        styles: ["bg-gray-900", "text-white", "p-4", "rounded", "my-4"],
    },
    {
        type: "heading",
        level: 2,
        text: "Step 2: Creating the WebSocket Server",
        styles: ["text-2xl", "font-semibold", "mt-8", "mb-2"],
    },
    {
        type: "paragraph",
        text: "WebSockets allow instant communication between the server and users. This enables the chatbot to respond without refreshing the page.",
        styles: ["mb-4"],
    },
    {
        type: "code",
        language: "javascript",
        code: `const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
    ws.on("message", (message) => {
        console.log("Received:", message);
        ws.send("You said: " + message);
    });
});`,
        styles: ["bg-gray-900", "text-white", "p-4", "rounded", "my-4"],
    },
    {
        type: "quote",
        text: "Learning by doing is the fastest way to master new skills.",
        author: "Abdul Ghaffar",
        styles: ["italic", "border-l-4", "pl-4", "my-6", "border-primary"],
    },
    {
        type: "heading",
        level: 2,
        text: "Step 3: Designing the Chatbot UI",
        styles: ["text-2xl", "font-semibold", "mt-8", "mb-2"],
    },
    {
        type: "paragraph",
        text: "On the frontend, we design a sleek, modern interface using React and Framer Motion. This includes typing indicators, scrollable chat areas, and responsive message bubbles.",
        styles: ["mb-4"],
    },
    {
        type: "list",
        list_type: "unordered",
        items: [
            "Responsive message bubbles",
            "Scrollable chat container",
            "Typing indicator animation",
            "Input box with send button"
        ],
        styles: ["list-disc", "pl-6", "mb-4"],
    },
    {
        type: "image",
        src: "https://picsum.photos/id/1011/800/400",
        alt: "Minimal chatbot UI example",
        styles: ["rounded-lg", "shadow-lg", "my-6"],
    },
    {
        type: "heading",
        level: 2,
        text: "Step 4: Integrating AI Responses",
        styles: ["text-2xl", "font-semibold", "mt-8", "mb-2"],
    },
    {
        type: "paragraph",
        text: "Integrating AI models allows the bot to provide intelligent, context-aware responses. You can connect to OpenAI APIs or other ML models to handle natural language processing.",
        styles: ["mb-4"],
    },
    {
        type: "code",
        language: "javascript",
        code: `async function getAIResponse(message) {
    const response = await fetch("/api/ai", {
        method: "POST",
        body: JSON.stringify({ message }),
    });
    const data = await response.json();
    return data.reply;
}`,
        styles: ["bg-gray-900", "text-white", "p-4", "rounded", "my-4"],
    },
    {
        type: "heading",
        level: 2,
        text: "Step 5: Deployment",
        styles: ["text-2xl", "font-semibold", "mt-8", "mb-2"],
    },
    {
        type: "paragraph",
        text: "Containerize your frontend and backend using Docker, then deploy to a VPS. Nginx serves as a reverse proxy and ensures secure HTTPS connections. This allows your chatbot to be publicly accessible and scalable.",
        styles: ["mb-4"],
    },
    {
        type: "image",
        src: "https://picsum.photos/id/1025/800/400",
        alt: "Deployment example",
        styles: ["rounded-lg", "shadow-lg", "my-6"],
    },
    {
        type: "box",
        styles: ["border", "rounded-lg", "p-4", "my-6", "bg-surface"],
        items: [
            {
                type: "heading",
                level: 3,
                text: "Pro Tip",
                styles: ["text-lg", "font-semibold", "mb-2"],
            },
            {
                type: "paragraph",
                text: "Always containerize your applications to ensure portability and simplify deployment.",
                styles: ["text-base"],
            }
        ]
    },
    {
        type: "table",
        styles: ["w-full", "table-auto", "border-collapse", "my-4"],
        headers: ["Feature", "Description", "Status"],
        rows: [
            ["WebSocket Server", "Handles real-time messaging", "Completed"],
            ["Frontend UI", "Responsive chat interface in React", "In Progress"],
            ["Admin Panel", "Manage intents and responses", "Planned"],
        ],
    },
    {
        type: "heading",
        level: 2,
        text: "Conclusion",
        styles: ["text-2xl", "font-semibold", "mt-8", "mb-2"],
    },
    {
        type: "paragraph",
        text: "This project helped me sharpen my full-stack development skills, including React, Node.js, WebSockets, Docker, and deployment strategies. The chatbot is still ongoing, and I plan to integrate more advanced AI features, analytics, and multi-user support in the future.",
        styles: ["mb-4"],
    },
    {
        type: "link",
        href: "https://iabdulghaffar.com",
        text: "Check out the live project here",
        styles: ["text-primary", "underline", "hover:text-primary-dark", "block", "mt-4"],
    }
];

export default items;





















// const items = [
//     {
//         type: "heading",
//         level: 1,
//         text: "Some text",
//         styles: ["bg-background", "mt-2"],
//     }, {
//         type: "paragraph",
//         text: "This is a paragraph",
//         styles: []
//     }, {
//         type: "image",
//         src: "path/to/img",
//         alt: "Alternative",
//         styles: []
//     }, {
//         type: "code",
//         language: "javascript",
//         code: "console.log('Hello from javascript');",
//         styles: null,
//     }, {
//         type: "quote",
//         text: "Some quote",
//         author: "Abdul Ghaffar",
//         styles: [],
//     }, {
//         type: "list",
//         list_type: "unordered",
//         items: ["again any item from these items"],
//         styles: []
//     }, {
//         type: "link",
//         href: "link of somewhere",
//         text: "Text of link",
//         styles: [],
//     }, {
//         type: "box",
//         styles: [],
//         items: []
//     }{
//         type: "table",
//         styles: [],
//         items: [],
//         headers: [],
//         rows: [
//             [],
//         ]
//      }
// ]

// export default items