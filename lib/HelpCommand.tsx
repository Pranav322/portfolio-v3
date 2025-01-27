import React, { useState, useRef, useEffect } from "react";

export const HelpCommand = () => (
  <div className="mt-2 text-sm">
    <div className="text-green-500">COMMANDS</div>
    <div className="grid grid-cols-[150px_1fr] gap-2 mt-2">
      <span className="text-yellow-400">visitors</span>
      <span className="text-gray-400">Show total unique visitors</span>
      <span className="text-yellow-400">cat name</span>
      <span className="text-gray-400">View stored name</span>
      <span className="text-yellow-400">nano name</span>
      <span className="text-gray-400">Edit your name</span>
      <span className="text-yellow-400">setname</span>
      <span className="text-gray-400">Change your name</span>
      <span className="text-yellow-400">echo [text]</span>
      <span className="text-gray-400">Print text to terminal</span>
      <span className="text-yellow-400">projects</span>
      <span className="text-gray-400">List all projects</span>
      <span className="text-yellow-400">about</span>
      <span className="text-gray-400">About me</span>
      <span className="text-yellow-400">skills</span>
      <span className="text-gray-400">Technical skills</span>
      <span className="text-yellow-400">contacts</span>
      <span className="text-gray-400">Contact information</span>
      <span className="text-yellow-400">clear</span>
      <span className="text-gray-400">Clear terminal</span>
      <span className="text-yellow-400">help</span>
      <span className="text-gray-400">Show this help</span>
    </div>
  </div>
);