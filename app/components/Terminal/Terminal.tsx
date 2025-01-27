import React, { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { TerminalSquare } from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc, collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
// Add Firebase configuration (replace with your actual config)
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
          // Save to Firestore
          await addDoc(collection(db, 'visitors'), {
            name,
            timestamp: new Date(),
            uniqueId: crypto.randomUUID(),
          });

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
        output = 'Yahallo! how can I help you??';
        break;
      case 'raj':
        output = '';
        window.location.href = 'https://www.youtube.com/shorts/u2O1g-BEZuo';
        break;
      case 'sudo':
        output = 'missing parameters';
        break;
      case 'ls -a':
      case 'ls':
        output = '.open_me';
        break;
      case 'cat .open_me':
        window.location.href = 'https://www.youtube.com/watch?v=hf1DkBQRQj4';
        output = '';
        break;
      case 'pranav':
        output =
          "Hello there! I am Pranav, a Full Stack Developer experienced in the MERN stack, currently pursuing my Bachelor's in Computer Science and Engineering. Type 'about' to know more about me";
        break;
      case 'neofetch':
        window.location.href = 'https://www.youtube.com/watch?v=Rl1ImG2b1k8&t=51s';
        output = '';
        break;
      case 'about':
        output =
          'I am Pranav, currently pursuing B.E in computer science from chandigarh university.';
        break;
      case 'blogs':
        output = 'Navigate to blogs page.';
        break;
      case 'proj':
        output = 'Navigate to projects page.';
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
          </ul>
        );
        break;
      case 'help':
        output = <HelpCommand />;
        break;
      case 'TeamFinder':
        window.location.href = 'https://github.com/Teamfinder';
        output = '';
        break;
      case 'spotify-telegram-bot':
        window.location.href = 'https://github.com/Pranav322/spotify-telegram-bot';
        output = '';
        break;
      case 'QuizApp':
        window.location.href = 'https://github.com/Pranav322/QuizApp';
        output = '';
        break;
      case 'ElecTrade':
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
        const querySnapshot = await getDocs(collection(db, 'visitors'));
        output = `Total unique visitors: ${querySnapshot.size}`;
        break;
      default:
        if (command.startsWith('echo ')) {
          output = command.substring(5);
        } else if (command.startsWith('rm')) {
          window.location.href = 'https://www.youtube.com/watch?v=AlLhMySQTlo';
          output = '';
        } else if (command.includes('apt')) {
          output = 'You are a reliable person';
        } else if (command.includes('pacman')) {
          output = 'certified racist and a virgin (likes to go fast)';
        } else if (command.includes('dnf')) {
          output = 'gets the job done slowly but surely';
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
    <div className="w-full h-full flex justify-center items-center">
      <div className="border-2 border-neutral-800 dark:border-neutral-700 rounded-sm w-[700px] h-[500px] bg-black/90 backdrop-blur-sm p-4 overflow-y-auto font-mono">
        <div className="flex justify-between mb-5 items-center sticky top-0 bg-black/90 z-20 backdrop-blur-lg p-2 rounded-sm">
          <div className="flex gap-2">
            <div
              className="w-3 h-3 duration-200 cursor-pointer bg-red-500 rounded-full hover:bg-red-400"
              onClick={() => (window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ')}
            ></div>
            <div className="w-3 h-3 duration-200 cursor-pointer bg-yellow-500 rounded-full hover:bg-yellow-400"></div>
            <div className="w-3 h-3 cursor-pointer duration-200 bg-green-500 rounded-full hover:bg-green-400"></div>
          </div>
          <h1 className="text-white text-sm">pranav@portfolio: ~</h1>
          <span className="flex gap-1 text-sm border border-white/20 rounded-sm px-2 py-1 text-green-400">
            <TerminalSquare size={14} />
            zsh
          </span>
        </div>
        <div className="p-2 text-green-100">
          <div className="text-xs mb-4 opacity-70">Last login: {currentTime}</div>

          {commands.map(command => (
            <div ref={terminalRef} key={command.id} className="mb-4" suppressHydrationWarning>
              <div className="flex gap-2 text-sm">
                <span className="text-green-500">pranav@portfolio</span>
                <span className="text-pink-400">~</span>
                <span className="text-white">{command.input}</span>
              </div>
              <div className="mt-1 text-sm text-gray-300">{command.output}</div>
            </div>
          ))}

          {isAskingName && !hasName && (
            <div className="mb-4 text-sm text-yellow-400">
              ➜ Please enter your name to continue:
            </div>
          )}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-green-500">➜</span>
            <span className="text-pink-400">~</span>
            <form className="w-full flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                className="bg-transparent w-full outline-none border-none focus:outline-none text-white caret-green-500"
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
