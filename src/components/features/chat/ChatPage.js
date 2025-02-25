import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { ROLES } from '../../../constants/roles';
import { FiPaperclip, FiVideo, FiPhone, FiMic, FiSend } from 'react-icons/fi';

export default function ChatPage() {
  const { userRole, currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('local');
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [mentionSearch, setMentionSearch] = useState('');
  const [showMentionList, setShowMentionList] = useState(false);
  const messageEndRef = useRef(null);
  const [messages, setMessages] = useState([]);

  // Initialize chat tabs based on role
  const getChatTabs = () => {
    switch (userRole) {
      case ROLES.COMMITTEE_MEMBER:
        return [
          { id: 'local', label: 'Department' },
          { id: 'event', label: 'Event' }
        ];
      case ROLES.HOD:
        return [
          { id: 'local', label: 'Department' },
          { id: 'core', label: 'Core Team' }
        ];
      case ROLES.VICE_CHAIRPERSON:
        return [
          { id: 'local', label: 'Department' },
          { id: 'chair', label: 'Chairperson' }
        ];
      default:
        return [{ id: 'local', label: 'Department' }];
    }
  };

  const [chatTabs] = useState(getChatTabs());

  // Mock messages data - replace with Firebase data later
  const mockMessages = {
    local: [
      {
        id: 1,
        sender: 'John Doe',
        message: 'Hey team, check out the new design @Jane',
        timestamp: new Date(),
        type: 'text'
      },
      {
        id: 2,
        sender: 'Jane Smith',
        message: '@@Mike Please complete the budget report by tomorrow',
        timestamp: new Date(),
        type: 'task'
      }
    ],
    event: [],
    core: [],
    chair: []
  };

  useEffect(() => {
    // Initialize messages with mock data
    setMessages(mockMessages);
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: currentUser.name,
      message: message,
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => ({
      ...prev,
      [activeTab]: [...(prev[activeTab] || []), newMessage]
    }));
    setMessage('');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Chat Tabs */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-4">
            {chatTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === tab.id
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages[activeTab]?.map((msg) => (
          <div
            key={msg.id}
            className={`mb-4 ${
              msg.sender === currentUser.name ? 'text-right' : 'text-left'
            }`}
          >
            <div
              className={`inline-block rounded-lg px-4 py-2 max-w-xl ${
                msg.sender === currentUser.name
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-900'
              }`}
            >
              <div className="text-sm font-medium">{msg.sender}</div>
              <div>{msg.message}</div>
              <div className="text-xs opacity-75">
                {msg.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>

      {/* Chat Input */}
      <div className="bg-white border-t p-4">
        <div className="max-w-7xl mx-auto flex items-center space-x-4">
          <button className="p-2 text-gray-500 hover:text-gray-700">
            <FiPaperclip className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700">
            <FiVideo className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700">
            <FiPhone className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700">
            <FiMic className="w-5 h-5" />
          </button>
          
          <form onSubmit={handleSendMessage} className="flex-1 flex items-center space-x-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Type a message..."
            />
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              <FiSend className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 