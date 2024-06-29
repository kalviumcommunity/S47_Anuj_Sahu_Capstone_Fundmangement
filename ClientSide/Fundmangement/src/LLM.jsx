import React, { useState } from 'react';
import styles from './LLM.module.css';

const AiForm = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      // Assuming your AI response contains a "response" key
      setResponse(data.response);
    } catch (error) {
      console.error('Error:', error);
      // Handle error in UI
    }
  };

  // Function to copy text to clipboard
  const copyToClipboard = () => {
    // Create a temporary textarea element
    const textarea = document.createElement('textarea');
    textarea.value = response;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('Copied to clipboard!');
  };

  // Function to format AI response
  const formatResponse = (response) => {
    // Replace *bold* with <b>bold</b>
    response = response.replace(/\\(.?)\\*/g, '<b>$1</b>');

    // Replace  code blocks with <code> code blocks
    response = response.replace(/(.*?)```/gs, '<code>$1</code>');

    // Split response into paragraphs
    const paragraphs = response.split('\n').map((paragraph, index) => {
      // Check if paragraph is a code block
      if (paragraph.startsWith('<code>') && paragraph.endsWith('</code>')) {
        return (
          <pre key={index} className={styles.codeBlock}>
            {paragraph}
          </pre>
        );
      } else {
        return (
          <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
        );
      }
    });

    return paragraphs;
  };

  return (
    <div className={styles.container}>
      <div className={styles.chatWindow}>
        <div className={styles.chat}>
          {/* AI Response */}
          {response && (
            <div className={`${styles.chatBubble} ${styles.aiResponse}`}>
              {formatResponse(response)}
              <button className={styles.copyButton} onClick={copyToClipboard}>
                Copy
              </button>
            </div>
          )}

          {/* User Input */}
          <div className={`${styles.chatBubble} ${styles.userInput}`}>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Type your prompt here..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                required
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiForm;