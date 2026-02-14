import React, { useState } from 'react';
import {
  IconX,
  IconMinus,
  IconSquare,
  IconBriefcase,
  IconMapPin,
  IconCalendar,
  IconTrophy,
  IconCode,
  IconBuilding,
} from '@tabler/icons-react';
import { motion, useDragControls } from 'framer-motion';
import { WindowWrapper } from '../ui/WindowWrapper';
import { experiences, experienceSummary } from '../helpers/Experience';

interface ExperienceWindowProps {
  onClose: () => void;
}

export default function ExperienceWindow({ onClose }: ExperienceWindowProps) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(experiences[0]);
  const dragControls = useDragControls();

  const handleMinimize = () => {
    setIsMinimized(true);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Full-time':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Internship':
        return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
      case 'Freelance':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Part-time':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getExperienceColor = (index: number) => {
    const colors = ['#10b981', '#3b82f6', '#06b6d4', '#f59e0b', '#ef4444'];
    return colors[index % colors.length];
  };

  return (
    <WindowWrapper
      isMaximized={isMaximized}
      onClose={onClose}
      onMinimize={handleMinimize}
      initialWidth={900}
      initialHeight={650}
    >
      <div className="h-full flex flex-col">
        {/* Window Header */}
        <motion.div
          className="h-12 bg-gradient-to-r from-gray-800/50 to-gray-900/50 flex items-center justify-between px-4 cursor-move border-b border-white/10"
          onPointerDown={e => !isMaximized && dragControls.start(e)}
        >
          <div className="flex items-center gap-3">
            <div className="bg-green-500/20 p-1.5 rounded-full">
              <IconBriefcase size={16} className="text-green-400" />
            </div>
            <span className="text-white/90 text-sm font-medium">Professional Experience</span>
          </div>
          {/* Window Controls */}
          <div className="flex items-center gap-1">
            <motion.button
              whileHover={{ backgroundColor: 'rgba(107, 114, 128, 0.2)' }}
              onClick={handleMinimize}
              className="p-2 rounded-full"
              aria-label="Minimize"
              title="Minimize"
            >
              <IconMinus size={14} className="text-white/80" />
            </motion.button>
            <motion.button
              whileHover={{ backgroundColor: 'rgba(107, 114, 128, 0.2)' }}
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-2 rounded-full"
              aria-label={isMaximized ? 'Restore' : 'Maximize'}
              title={isMaximized ? 'Restore' : 'Maximize'}
            >
              <IconSquare size={14} className="text-white/80" />
            </motion.button>
            <motion.button
              whileHover={{ backgroundColor: 'rgba(239, 68, 68, 0.2)' }}
              onClick={onClose}
              className="p-2 rounded-full"
              aria-label="Close"
              title="Close"
            >
              <IconX size={14} className="text-white/80" />
            </motion.button>
          </div>
        </motion.div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full flex">
            {/* Left Sidebar - Experience List */}
            <div className="w-1/3 border-r border-white/10 bg-black/20">
              {/* Summary Stats */}
              <div className="p-4 border-b border-white/10">
                <h3 className="text-lg font-semibold text-white/90 mb-3">Career Overview</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-2 bg-white/5 rounded-lg">
                    <div className="text-lg font-bold text-green-400">
                      {experienceSummary.totalYears}
                    </div>
                    <div className="text-xs text-white/60">Experience</div>
                  </div>
                  <div className="text-center p-2 bg-white/5 rounded-lg">
                    <div className="text-lg font-bold text-blue-400">
                      {experienceSummary.companiesWorked}
                    </div>
                    <div className="text-xs text-white/60">Companies</div>
                  </div>
                  <div className="text-center p-2 bg-white/5 rounded-lg">
                    <div className="text-lg font-bold text-cyan-400">
                      {experienceSummary.projectsCompleted}
                    </div>
                    <div className="text-xs text-white/60">Projects</div>
                  </div>
                  <div className="text-center p-2 bg-white/5 rounded-lg">
                    <div className="text-lg font-bold text-cyan-400">
                      {experienceSummary.languages.length}+
                    </div>
                    <div className="text-xs text-white/60">Languages</div>
                  </div>
                </div>
              </div>

              {/* Experience List */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
                <h4 className="text-sm font-medium text-white/80 mb-3">Experience Timeline</h4>
                <div className="space-y-3">
                  {experiences.map((exp, index) => (
                    <motion.div
                      key={exp.id}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedExperience(exp)}
                      className={`p-3 rounded-lg cursor-pointer border transition-all duration-300 ${
                        selectedExperience.id === exp.id
                          ? 'bg-white/10 border-white/20'
                          : 'bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/15'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className="w-3 h-3 rounded-full mt-1 flex-shrink-0"
                          style={{ backgroundColor: getExperienceColor(index) }}
                        />
                        <div className="flex-1 min-w-0">
                          <h5 className="text-sm font-medium text-white/90 truncate">{exp.role}</h5>
                          <p className="text-xs text-blue-400 truncate">{exp.company}</p>
                          <p className="text-xs text-white/60">{exp.duration}</p>
                          <span
                            className={`inline-block text-xs px-2 py-0.5 rounded-full border mt-1 ${getTypeColor(exp.type)}`}
                          >
                            {exp.type}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Content - Selected Experience Details */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <motion.div
                key={selectedExperience.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="p-6"
              >
                {/* Header */}
                <div className="mb-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-white/90 mb-2">
                        {selectedExperience.role}
                      </h2>
                      <div className="flex items-center gap-2 text-blue-400 mb-2">
                        <IconBuilding size={16} />
                        <span className="font-medium">{selectedExperience.company}</span>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm border ${getTypeColor(selectedExperience.type)}`}
                    >
                      {selectedExperience.type}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-white/70 mb-4">
                    <div className="flex items-center gap-2">
                      <IconCalendar size={16} />
                      <span>{selectedExperience.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <IconMapPin size={16} />
                      <span>{selectedExperience.location}</span>
                    </div>
                  </div>

                  <p className="text-white/80 leading-relaxed">{selectedExperience.description}</p>
                </div>

                {/* Key Responsibilities */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white/90 mb-3 flex items-center gap-2">
                    <IconCode size={18} />
                    Key Responsibilities
                  </h3>
                  <ul className="space-y-2">
                    {selectedExperience.responsibilities.map((responsibility, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 text-white/70"
                      >
                        <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                        <span>{responsibility}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Key Achievements */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white/90 mb-3 flex items-center gap-2">
                    <IconTrophy size={18} />
                    Key Achievements
                  </h3>
                  <div className="space-y-3">
                    {selectedExperience.achievements.map((achievement, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0" />
                          <span className="text-white/80">{achievement}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white/90 mb-3">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedExperience.technologies.map((tech, index) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="px-3 py-1 bg-white/10 rounded-full text-sm text-cyan-400 hover:bg-white/15 transition-colors"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </WindowWrapper>
  );
}
