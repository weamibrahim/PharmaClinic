import React from 'react'

function InputMessage({ sendMessage, message, setMessage }) {
    return (
        <form onSubmit={sendMessage} className="send-message flex mt-4">
            <input
                type="text"
                className="message-input border rounded p-2 flex-grow"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
            />
            <button className="send-button ml-2 p-2 bg-blue-500 text-white rounded">Send</button>
        </form>
    )
}

export default InputMessage