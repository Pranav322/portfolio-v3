import React, { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { TerminalSquare } from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc, collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

import { HelpCommand } from '@/app/components/Terminal/HelpCommand';

const Terminalcomp = () => {
  const [input, setInput] = useState('');
  const [commands, setCommands] = useState([]);
  const terminalRef = useRef(null);
  const [hasName, setHasName] = useState(null);
  const [userName, setUserName] = useState('');
  const [isAskingName, setIsAskingName] = useState(false);
  const [visitedBefore, setVisitedBefore] = useState(false);

  const getFormattedTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const amPm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours}:${minutes}:${seconds}${amPm}`;
  };

  const [currentTime, setCurrentTime] = useState(getFormattedTime());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(getFormattedTime());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const checkVisitor = async () => {
      const hasVisited = localStorage.getItem('hasVisited');
      if (!hasVisited) {
        setIsAskingName(true);
        localStorage.setItem('hasVisited', 'true');
      }
    };
    checkVisitor();
  }, []);

  const handleInputChange = e => setInput(e.target.value);

  const handleKeyPress = e => {
    if (e.key === 'Enter') processCommand(e);
  };

  const processCommand = async e => {
    e.preventDefault();

    if (isAskingName) {
      const name = input.trim();
      if (name) {
        try {
          // Add to Firestore with proper error handling
          const docRef = await addDoc(collection(db, 'visitors'), {
            name,
            timestamp: new Date().toISOString(),
            uniqueId: crypto.randomUUID(),
          });

          console.log('Document written with ID: ', docRef.id);

          setUserName(name);
          setIsAskingName(false);
          setCommands(prev => [
            ...prev,
            {
              id: Date.now(),
              input: name,
              time: getFormattedTime(),
              output: 'Thank you! You can now use the terminal.',
            },
          ]);
        } catch (error) {
          console.error('Error adding document: ', error);
          setCommands(prev => [
            ...prev,
            {
              id: Date.now(),
              input: name,
              time: getFormattedTime(),
              output: 'Error saving name. Please try again.',
            },
          ]);
        }
        setInput('');
        return;
      }
    }

    const command = input.trim().toLowerCase();
    let output;

    switch (command) {
      case 'hello':
        output = 'bro I am a terminal what are you expecting';
        break;

      case 'pranav':
        output =
          "Hello there! I am Pranav, a Full Stack Developer experienced in the MERN stack,and django and also have experience in app development with flutter,  currently pursuing my Bachelor's in Computer Science and Engineering. Type 'about' to know more about me";
        break;

      case 'about':
        output =
          'I am Pranav, currently pursuing B.E in computer science from chandigarh university.';
        break;

      case 'project':
        output = "did you mean 'projects'?";
        break;
      case 'contact':
        output = "did you mean 'contacts'?";
        break;
      case 'skill':
        output = "did you mean 'skills'?";
        break;
      case 'projects':
        output = (
          <ul>
            <li>TeamFinder</li>
            <li>Spotify-telegram-bot</li>
            <li>QuizApp</li>
            <li>ElecTrade</li>
            <li>Personal Portfolio</li>
            <li>Realtime Chat App(flutter)</li>
          </ul>
        );
        break;
      case 'help':
        output = <HelpCommand />;
        break;
      case 'teamfinder':
        window.location.href = 'https://github.com/Teamfinder';
        output = '';
        break;
      case 'spotify-telegram-bot':
        window.location.href = 'https://github.com/Pranav322/spotify-telegram-bot';
        output = '';
        break;
      case 'quizapp':
        window.location.href = 'https://github.com/Pranav322/QuizApp';
        output = '';
        break;
      case 'electrade':
        window.location.href = 'https://github.com/Pranav322/ElecTrade';
        output = '';
        break;
      case 'github':
        window.location.href = 'https://github.com/Pranav322';
        output = '';
        break;
      case 'skills':
        output = (
          <ul>
            <li>React</li>
            <li>Node.js</li>
            <li>Express</li>
            <li>MongoDB</li>
            <li>Python</li>
            <li>Django</li>
          </ul>
        );
        break;
      case 'contacts':
        output = (
          <ul>
            <li>Email:duckieduckk@duck.com(riyal hai)</li>
            <li>Phone: nahi bataunga</li>
            <li>Address: nahi bataunga</li>
          </ul>
        );
        break;
      case 'clear':
        setCommands([]);
        output = 'Terminal cleared.';
        break;
      case 'cat name':
        output = userName || 'No name found. Please set your name first.';
        break;
      case 'nano name':
        output = "Use 'setname' command to edit your name";
        break;
      case 'setname':
        setIsAskingName(true);
        setHasName(false);
        output = 'Please enter your name:';
        break;
      case 'visitors':
        try {
          const querySnapshot = await getDocs(collection(db, 'visitors'));
          output = `Total unique visitors: ${querySnapshot.size}`;
        } catch (error) {
          console.error('Error getting visitors: ', error);
          output = 'Error fetching visitor count.';
        }
        break;
      default:
        if (command.startsWith('echo ')) {
          output = command.substring(5);
        } else if (/^\d+[+\-*/]\d+$/.test(command)) {
          try {
            output = eval(command);
          } catch (error) {
            output = 'Error in evaluating the expression.';
          }
        } else {
          output = `Cannot find command: ${command}. Type 'help' for more info.`;
        }
        break;
    }

    const newCommand = {
      id: Date.now(),
      input,
      time: getFormattedTime(),
      output,
    };

    setCommands(prevCommands => [...prevCommands, newCommand]);
    setInput('');
  };

  useEffect(() => {
    terminalRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [commands]);

  return (
    <div className="w-full h-full flex justify-center items-center px-4">
      {/* Quote positioned relative to viewport - responsive */}
      <div className="fixed top-4 right-4 max-w-xs sm:max-w-md p-2 border border-gray-800 rounded bg-black/50 z-50 hidden sm:block">
        <p className="text-gray-500 italic text-sm">
          &ldquo;Some people never go crazy. What truly horrible lives they must lead.&rdquo;
        </p>
        <p className="text-gray-600 text-right text-xs">— Charles Bukowski</p>
      </div>

      {/* Terminal window - fully responsive */}
      <div className="border-2 border-neutral-800 dark:border-neutral-700 rounded-sm w-full max-w-[700px] h-[500px] max-h-[80vh] bg-black/90 backdrop-blur-sm p-2 sm:p-4 overflow-y-auto font-mono terminal-glow mobile-hide-scrollbar custom-scrollbar">
        <div className="flex justify-between mb-3 sm:mb-5 items-center sticky top-0 bg-black/90 z-20 backdrop-blur-lg p-1 sm:p-2 rounded-sm">
          <div className="flex gap-1 sm:gap-2">
            <div
              className="w-2 h-2 sm:w-3 sm:h-3 duration-200 cursor-pointer bg-red-500 rounded-full hover:bg-red-400"
              onClick={() => (window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ')}
            ></div>
            <div className="w-2 h-2 sm:w-3 sm:h-3 duration-200 cursor-pointer bg-yellow-500 rounded-full hover:bg-yellow-400"></div>
            <div className="w-2 h-2 sm:w-3 sm:h-3 cursor-pointer duration-200 bg-green-500 rounded-full hover:bg-green-400"></div>
          </div>
          <h1 className="text-white text-xs sm:text-sm truncate mx-2">pranav@portfolio: ~</h1>
          <span className="flex gap-1 text-xs sm:text-sm border border-white/20 rounded-sm px-1 sm:px-2 py-0.5 sm:py-1 text-green-400">
            <TerminalSquare size={12} className="sm:w-[14px] sm:h-[14px]" />
            <span className="hidden sm:inline">zsh</span>
          </span>
        </div>
        <div className="p-1 sm:p-2 text-green-100">
          <div className="text-xs mb-2 sm:mb-4 opacity-70">Last login: {currentTime}</div>

          {commands.map(command => (
            <div
              ref={terminalRef}
              key={command.id}
              className="mb-2 sm:mb-4"
              suppressHydrationWarning
            >
              <div className="flex gap-1 sm:gap-2 text-xs sm:text-sm flex-wrap">
                <span className="text-green-500">pranav@portfolio</span>
                <span className="text-pink-400">~</span>
                <span className="text-white break-all">{command.input}</span>
              </div>
              <div className="mt-1 text-xs sm:text-sm text-gray-300 break-words">
                {command.output}
              </div>
            </div>
          ))}

          {isAskingName && !hasName && (
            <div className="mb-2 sm:mb-4 text-xs sm:text-sm text-yellow-400">
              ➜ Please enter your name to continue:
            </div>
          )}
          <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
            <span className="text-green-500">➜</span>
            <span className="text-pink-400">~</span>
            <form className="w-full flex items-center gap-1 sm:gap-2">
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                className="bg-transparent w-full outline-none border-none focus:outline-none text-white caret-green-500 text-xs sm:text-sm"
                spellCheck={false}
                autoFocus
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminalcomp;
