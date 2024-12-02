import React, { useState } from "react";
import { Send, Sun, Moon, Loader2, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const ChatForm = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      setResponse(data.response.candidates[0].content.parts[0].text);
    } catch (error) {
      console.error("Error sending message:", error);
      setResponse("");
      setError("Error connecting to the bot. Please try again.");
    } finally {
      setLoading(false);
    }

    setMessage("");
  };

  const renderResponse = (text: string) => {
    const codeBlockRegex = /```[\s\S]*?```/g;
    const parts = text.split(codeBlockRegex);
    const codeBlocks = text.match(codeBlockRegex) || [];

    return parts.map((part, index) => (
      <React.Fragment key={index}>
        {part}
        {codeBlocks[index] && (
          <div
            className={`my-2 p-4 rounded-lg ${
              darkMode ? "bg-gray-700" : "bg-gray-200"
            }`}
          >
            <pre className="whitespace-pre-wrap break-words">
              <code>{codeBlocks[index].replace(/```/g, "").trim()}</code>
            </pre>
          </div>
        )}
      </React.Fragment>
    ));
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-8 transition-colors duration-200 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="w-full max-w-2xl">
 
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Chat with our bot</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            {darkMode ? (
              <Sun className="w-6 h-6" />
            ) : (
              <Moon className="w-6 h-6" />
            )}
          </button>
        </div>

   
        <div
          className={`mb-6 p-4 rounded-lg shadow-lg ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          {response ? (
            <div className="text-lg">{renderResponse(response)}</div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              Bot responses will appear here
            </p>
          )}
        </div>

 
        {error && (
          <div className="mb-4 p-4 text-red-700 bg-red-100 border border-red-400 rounded-lg flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5" />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message"
            className={`flex-grow p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
            }`}
            disabled={loading}
          />
          <button
            type="submit"
            className={`p-3 rounded-lg ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white transition-colors duration-200`}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <Send className="w-6 h-6" />
            )}
          </button>
        </form>
      </div>
      <div className="p-12">
        <Link to="/">
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
            Go back
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ChatForm;
