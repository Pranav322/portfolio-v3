import React, { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { TerminalSquare } from 'lucide-react';
import { safeEvaluate } from '@/lib/math';

const Terminalcomp = () => {
  const [input, setInput] = useState('');
  const [commands, setCommands] = useState([]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentDirectory, setCurrentDirectory] = useState('~');
  const [fileSystem, setFileSystem] = useState({
    '~': {
      type: 'directory',
      contents: {
        'about.txt': {
          type: 'file',
          content:
            'I am Pranav, currently pursuing B.E in computer science from chandigarh university.',
        },
        projects: {
          type: 'directory',
          contents: {
            'teamfinder.txt': { type: 'file', content: 'Team collaboration platform' },
            'spotify-bot.txt': { type: 'file', content: 'Telegram bot for Spotify integration' },
            'quizapp.txt': { type: 'file', content: 'Interactive quiz application' },
            'electrade.txt': { type: 'file', content: 'Electronics trading platform' },
          },
        },
        experience: {
          type: 'directory',
          contents: {
            'gradguide-internship.txt': {
              type: 'file',
              content:
                "GradGuide - LLM Developer Intern (Backend) (May 2025 - Aug 2025)\n\nBackend developer specializing in FastAPI and large language model (LLM) integration, with experience building scalable APIs, deploying AI systems, and delivering production-ready applications.\n\nKey Responsibilities:\n• Developed a RAG-based chatbot API using FastAPI, enabling context-aware conversational responses\n• Built a recommendation engine that generated personalized outputs based on user profile details\n• Handled deployment and storage on Google Cloud Platform (GCP) for scalable hosting and data management\n• Designed and implemented backend services for the company's internal CRM system\n• Integrated LLM capabilities into existing backend infrastructure\n\nTechnologies: Python, FastAPI, LLM Integration, RAG Systems, Google Cloud Platform (GCP), PostgreSQL, MongoDB, Docker, Git, Postman\n\nKey Achievements:\n• Successfully deployed RAG-based chatbot API with context-aware responses\n• Built and optimized recommendation engine for personalized user experiences\n• Implemented scalable backend services on GCP with proper data management\n• Contributed to internal CRM system architecture and development",
            },
            'summary.txt': {
              type: 'file',
              content:
                'EXPERIENCE SUMMARY\n\nTotal Experience: 3 months\nCurrent Role: LLM Developer Intern\nCompanies Worked: 1\nProjects Completed: 2+ (RAG Chatbot API, Recommendation Engine)\n\nCore Technologies:\n• Languages: Python, JavaScript\n• Backend: FastAPI, Flask\n• AI/ML: LLM Integration, RAG Systems\n• Cloud: Google Cloud Platform (GCP)\n• Databases: PostgreSQL, MongoDB\n• Tools: Git, Docker, Postman, VS Code\n\nSpecialization: Backend development with focus on AI/ML integration and scalable API development.',
            },
          },
        },
        'skills.txt': {
          type: 'file',
          content: 'React, Node.js, Express, MongoDB, Python, Django, Flutter',
        },
        'contact.txt': {
          type: 'file',
          content: 'Email: duckieduckk@duck.com\nPhone: nahi bataunga\nAddress: nahi bataunga',
        },
      },
    },
  });
  const terminalRef = useRef(null);
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
      const hasVisited = sessionStorage.getItem('hasVisited');
      if (!hasVisited) {
        setIsAskingName(true);
        sessionStorage.setItem('hasVisited', 'true');
      }
    };
    checkVisitor();
  }, []);

  const getCurrentPath = () => {
    const parts = currentDirectory.split('/').filter(Boolean);
    let current = fileSystem['~'];
    for (const part of parts.slice(1)) {
      if (current.contents && current.contents[part]) {
        current = current.contents[part];
      }
    }
    return current;
  };

  const resolvePath = path => {
    if (path.startsWith('~')) {
      return path;
    }
    if (path.startsWith('/')) {
      return path;
    }
    if (currentDirectory === '~') {
      return path === '..' ? '~' : `~/${path}`;
    }
    return `${currentDirectory}/${path}`;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value);

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      processCommand(e);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      autoComplete();
    }
  };

  const autoComplete = () => {
    const parts = input.trim().split(' ');
    const lastPart = parts[parts.length - 1];
    const currentPath = getCurrentPath();

    if (currentPath.contents) {
      const matches = Object.keys(currentPath.contents).filter(name => name.startsWith(lastPart));

      if (matches.length === 1) {
        parts[parts.length - 1] = matches[0];
        setInput(parts.join(' '));
      }
    }
  };

  const processCommand = async (e: KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (isAskingName) {
      const name = input.trim();
      if (name) {
        setUserName(name);
        setIsAskingName(false);
        setCommands(prev => [
          ...prev,
          {
            id: Date.now(),
            input: name,
            time: getFormattedTime(),
            output: `Welcome ${name}! Type 'help' to see available commands.`,
            directory: currentDirectory,
          },
        ]);
        setInput('');
        return;
      }
    }

    const fullCommand = input.trim();
    const parts = fullCommand.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    // Add to command history
    if (fullCommand) {
      setCommandHistory(prev => [...prev, fullCommand]);
      setHistoryIndex(-1);
    }

    let output;

    switch (command) {
      case 'ls':
        const currentPath = getCurrentPath();
        if (currentPath.contents) {
          const items = Object.entries(currentPath.contents).map(([name, item]) => {
            const color = item.type === 'directory' ? 'text-blue-400' : 'text-white';
            return `<span class="${color}">${name}${item.type === 'directory' ? '/' : ''}</span>`;
          });
          output = <div dangerouslySetInnerHTML={{ __html: items.join('  ') }} />;
        } else {
          output = 'ls: cannot access: Not a directory';
        }
        break;

      case 'cd':
        if (args.length === 0) {
          setCurrentDirectory('~');
          output = '';
        } else {
          const targetPath = args[0];
          if (targetPath === '..') {
            if (currentDirectory !== '~') {
              const parts = currentDirectory.split('/');
              parts.pop();
              setCurrentDirectory(parts.join('/') || '~');
            }
            output = '';
          } else {
            const newPath = resolvePath(targetPath);
            const parts = newPath.split('/').filter(Boolean);
            let current = fileSystem['~'];
            let valid = true;

            for (const part of parts.slice(1)) {
              if (
                current.contents &&
                current.contents[part] &&
                current.contents[part].type === 'directory'
              ) {
                current = current.contents[part];
              } else {
                valid = false;
                break;
              }
            }

            if (valid && (newPath === '~' || current.type === 'directory')) {
              setCurrentDirectory(newPath);
              output = '';
            } else {
              output = `cd: ${targetPath}: No such file or directory`;
            }
          }
        }
        break;

      case 'pwd':
        output = currentDirectory;
        break;

      case 'cat':
        if (args.length === 0) {
          output = 'cat: missing file operand';
        } else {
          const fileName = args[0];
          const currentPath = getCurrentPath();
          if (currentPath.contents && currentPath.contents[fileName]) {
            const file = currentPath.contents[fileName];
            if (file.type === 'file') {
              output = file.content;
            } else {
              output = `cat: ${fileName}: Is a directory`;
            }
          } else {
            output = `cat: ${fileName}: No such file or directory`;
          }
        }
        break;

      case 'mkdir':
        if (args.length === 0) {
          output = 'mkdir: missing operand';
        } else {
          const dirName = args[0];
          const currentPath = getCurrentPath();
          if (currentPath.contents) {
            if (!currentPath.contents[dirName]) {
              currentPath.contents[dirName] = { type: 'directory', contents: {} };
              output = '';
            } else {
              output = `mkdir: cannot create directory '${dirName}': File exists`;
            }
          } else {
            output = 'mkdir: cannot create directory: Permission denied';
          }
        }
        break;

      case 'touch':
        if (args.length === 0) {
          output = 'touch: missing file operand';
        } else {
          const fileName = args[0];
          const currentPath = getCurrentPath();
          if (currentPath.contents) {
            if (!currentPath.contents[fileName]) {
              currentPath.contents[fileName] = { type: 'file', content: '' };
              output = '';
            } else {
              output = ''; // File exists, just update timestamp (we'll skip this for simplicity)
            }
          } else {
            output = 'touch: cannot create file: Permission denied';
          }
        }
        break;

      case 'rm':
        if (args.length === 0) {
          output = 'rm: missing operand';
        } else {
          const fileName = args[0];
          const currentPath = getCurrentPath();
          if (currentPath.contents && currentPath.contents[fileName]) {
            if (currentPath.contents[fileName].type === 'directory') {
              output = `rm: cannot remove '${fileName}': Is a directory`;
            } else {
              delete currentPath.contents[fileName];
              output = '';
            }
          } else {
            output = `rm: cannot remove '${fileName}': No such file or directory`;
          }
        }
        break;

      case 'whoami':
        output = userName || 'guest';
        break;

      case 'date':
        output = new Date().toString();
        break;

      case 'uname':
        const flag = args[0];
        switch (flag) {
          case '-a':
            output =
              'Linux portfolio 5.4.0-42-generic #46-Ubuntu SMP Fri Jul 10 00:24:02 UTC 2020 x86_64 x86_64 x86_64 GNU/Linux';
            break;
          case '-s':
            output = 'Linux';
            break;
          case '-r':
            output = '5.4.0-42-generic';
            break;
          default:
            output = 'Linux';
        }
        break;

      case 'history':
        output = commandHistory.map((cmd, index) => `${index + 1}  ${cmd}`).join('\n');
        break;

      case 'clear':
        setCommands([]);
        output = '';
        break;

      case 'echo':
        output = args.join(' ');
        break;

      case 'experience':
        output = (
          <div className="space-y-3">
            <div className="text-yellow-400 font-bold">PROFESSIONAL EXPERIENCE</div>
            <div className="space-y-4">
              <div className="border-l-2 border-green-400 pl-3">
                <div className="text-green-400 font-semibold">
                  GradGuide - LLM Developer Intern (Backend)
                </div>
                <div className="text-blue-400 text-sm">May 2025 - Aug 2025 | Remote</div>
                <div className="text-gray-300 mt-1 text-sm">
                  Backend developer specializing in FastAPI and large language model (LLM)
                  integration.
                </div>
                <div className="text-cyan-400 text-sm mt-1">
                  Tech: Python, FastAPI, LLM Integration, RAG Systems, GCP, PostgreSQL, MongoDB
                </div>
              </div>
            </div>
            <div className="text-gray-400 text-sm mt-3">
              💡 Tip: Navigate to ~/experience/ directory to explore detailed files
            </div>
            <div className="text-gray-400 text-sm mt-2">
              📝 Currently pursuing B.E. in Computer Science at Chandigarh University (2022-2026)
            </div>
          </div>
        );
        break;

      case 'help':
        output = (
          <div className="space-y-1">
            <div className="text-yellow-400">Available commands:</div>
            <div>ls - list directory contents</div>
            <div>cd - change directory</div>
            <div>pwd - print working directory</div>
            <div>cat - display file contents</div>
            <div>mkdir - create directory</div>
            <div>touch - create file</div>
            <div>rm - remove file</div>
            <div>experience - show professional experience</div>
            <div>whoami - display current user</div>
            <div>date - display current date</div>
            <div>uname - system information</div>
            <div>history - command history</div>
            <div>clear - clear terminal</div>
            <div>echo - display text</div>
            <div>github - open GitHub profile</div>
            <div className="text-gray-400 mt-2">Use Tab for auto-completion, ↑/↓ for history</div>
          </div>
        );
        break;

      case 'github':
        window.open('https://github.com/Pranav322', '_blank');
        output = 'Opening GitHub profile...';
        break;

      case '':
        output = '';
        break;

      default:
        // Handle math expressions
        if (/^\d+[+\-*/]\d+$/.test(fullCommand)) {
          try {
            output = safeEvaluate(fullCommand);
          } catch (error) {
            output = 'bash: syntax error in expression';
          }
        } else {
          output = `bash: ${command}: command not found`;
        }
        break;
    }

    if (output !== undefined) {
      const newCommand = {
        id: Date.now(),
        input: fullCommand,
        time: getFormattedTime(),
        output,
        directory: currentDirectory,
      };

      setCommands(prevCommands => [...prevCommands, newCommand]);
    }
    setInput('');
  };

  useEffect(() => {
    terminalRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [commands]);

  const getPrompt = () => {
    const displayDir = currentDirectory === '~' ? '~' : currentDirectory.replace(/^~\//, '');
    return `${userName || 'guest'}@portfolio:${displayDir}$`;
  };

  return (
    <div className="w-full h-full flex justify-center items-center px-4">
      <div className="fixed top-4 right-4 max-w-xs sm:max-w-md p-2 border border-gray-800 rounded bg-black/50 z-50 hidden sm:block">
        <p className="text-gray-500 italic text-sm">
          &ldquo;Some people never go crazy. What truly horrible lives they must lead.&rdquo;
        </p>
        <p className="text-gray-600 text-right text-xs">— Charles Bukowski</p>
      </div>

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
          <h1 className="text-white text-xs sm:text-sm truncate mx-2">{getPrompt()}</h1>
          <span className="flex gap-1 text-xs sm:text-sm border border-white/20 rounded-sm px-1 sm:px-2 py-0.5 sm:py-1 text-green-400">
            <TerminalSquare size={12} className="sm:w-[14px] sm:h-[14px]" />
            <span className="hidden sm:inline">bash</span>
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
                <span className="text-green-500">{userName || 'guest'}@portfolio</span>
                <span className="text-blue-400">:</span>
                <span className="text-blue-400">{command.directory || '~'}</span>
                <span className="text-white">$</span>
                <span className="text-white break-all">{command.input}</span>
              </div>
              <div className="mt-1 text-xs sm:text-sm text-gray-300 break-words whitespace-pre-wrap">
                {command.output}
              </div>
            </div>
          ))}

          {isAskingName && (
            <div className="mb-2 sm:mb-4 text-xs sm:text-sm text-yellow-400">
              Please enter your name to continue:
            </div>
          )}
          <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
            <span className="text-green-500">{userName || 'guest'}@portfolio</span>
            <span className="text-blue-400">:</span>
            <span className="text-blue-400">{currentDirectory}</span>
            <span className="text-white">$</span>
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
