import React, { useState } from 'react';
import { Course, ProjectCollaboration, Profile, ProjectTask } from '../types';
import { Sparkles, Play, Award, Layers, Users, CheckSquare, FileText, Send, Trash, Bookmark, CheckCircle, GraduationCap, Calendar, Clock, RefreshCw } from 'lucide-react';

interface WorkspaceAndAcademyProps {
  courses: Course[];
  projects: ProjectCollaboration[];
  currentProfile: Profile;
  onUpdateCourses: (updated: Course[]) => void;
  onUpdateProjects: (updated: ProjectCollaboration[]) => void;
}

export default function WorkspaceAndAcademy({
  courses,
  projects,
  currentProfile,
  onUpdateCourses,
  onUpdateProjects
}: WorkspaceAndAcademyProps) {
  // Navigation
  const [activeSegment, setActiveSegment] = useState<'academy' | 'workspace'>('academy');

  // ACADEMY STATES
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>('c1');
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizResults, setQuizResults] = useState<Record<string, 'correct' | 'wrong' | null>>({});

  // WORKSPACE STATES
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>('proj1');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskAssignee, setNewTaskAssignee] = useState('p2');
  const [newTaskPriority, setNewTaskPriority] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [chatMessageText, setChatMessageText] = useState('');

  // 1. ACADEMY LOGIC
  const handleToggleEnroll = (courseId: string) => {
    const updated = courses.map(c => {
      if (c.id === courseId) {
        const isEnrolled = !c.isEnrolled;
        return {
          ...c,
          isEnrolled,
          progressPercentage: isEnrolled ? 10 : 0,
          lessonsCompleted: isEnrolled ? [] : []
        };
      }
      return c;
    });
    onUpdateCourses(updated);
  };

  const handleCompleteLesson = (courseId: string, lessonId: string) => {
    const updated = courses.map(c => {
      if (c.id === courseId) {
        const alreadyCompleted = c.lessonsCompleted.includes(lessonId);
        const nextLessons = alreadyCompleted
          ? c.lessonsCompleted.filter(id => id !== lessonId)
          : [...c.lessonsCompleted, lessonId];

        const progress = Math.min(100, Math.floor((nextLessons.length / c.lessons.length) * 100));
        return {
          ...c,
          lessonsCompleted: nextLessons,
          progressPercentage: progress,
          certificateEarned: progress === 100
        };
      }
      return c;
    });
    onUpdateCourses(updated);
  };

  const handleSelectQuizAnswer = (questionId: string, optionIdx: number) => {
    setQuizAnswers({ ...quizAnswers, [questionId]: optionIdx });
  };

  const handleVerifyQuiz = (courseId: string, questionId: string, correctIdx: number) => {
    const selected = quizAnswers[questionId];
    if (selected === undefined) {
      alert("Please select one option before verifying!");
      return;
    }
    const result = selected === correctIdx ? 'correct' : 'wrong';
    setQuizResults({ ...quizResults, [questionId]: result });

    // If correct, boost course progress small
    if (result === 'correct') {
      const course = courses.find(c => c.id === courseId);
      if (course && course.isEnrolled) {
        const updated = courses.map(c => {
          if (c.id === courseId) {
            const currentProgress = c.progressPercentage || 0;
            const boostProgress = Math.min(100, currentProgress + 15);
            return {
              ...c,
              progressPercentage: boostProgress,
              certificateEarned: boostProgress === 100
            };
          }
          return c;
        });
        onUpdateCourses(updated);
      }
    }
  };

  // 2. COLLABORATION WORKSPACE LOGIC
  const handleCreateTask = (e: React.FormEvent, projId: string) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const assigneeProfile = projects.find(p => p.id === projId)?.team?.find(t => t.profileId === newTaskAssignee);
    const newTask: ProjectTask = {
      id: `task_${Date.now()}`,
      title: newTaskTitle,
      description: 'Assigned via interactive workspace.',
      assignedTo: newTaskAssignee,
      status: 'To Do',
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      priority: newTaskPriority
    };

    const updated = projects.map(p => {
      if (p.id === projId) {
        return { ...p, tasks: [...p.tasks, newTask] };
      }
      return p;
    });

    onUpdateProjects(updated);
    setNewTaskTitle('');
    alert('Task successfully assigned to the crew collaborator!');
  };

  const handleCycleTaskStatus = (projId: string, taskId: string, currentStatus: any) => {
    const statuses: ('To Do' | 'In Progress' | 'Review' | 'Done')[] = ['To Do', 'In Progress', 'Review', 'Done'];
    const currentIdx = statuses.indexOf(currentStatus);
    const nextStatus = statuses[(currentIdx + 1) % statuses.length];

    const updated = projects.map(p => {
      if (p.id === projId) {
        return {
          ...p,
          tasks: p.tasks.map(t => {
            if (t.id === taskId) {
              return { ...t, status: nextStatus };
            }
            return t;
          })
        };
      }
      return p;
    });
    onUpdateProjects(updated);
  };

  const handlePostWorkspaceMessage = (projId: string) => {
    if (!chatMessageText.trim()) return;

    const updated = projects.map(p => {
      if (p.id === projId) {
        return {
          ...p,
          messages: [
            ...p.messages,
            {
              senderId: currentProfile.id,
              senderName: currentProfile.name,
              senderAvatar: currentProfile.avatar,
              content: chatMessageText,
              timestamp: 'Just now'
            }
          ]
        };
      }
      return p;
    });

    onUpdateProjects(updated);
    setChatMessageText('');
  };

  return (
    <div className="space-y-6">
      {/* Segment Selector Header */}
      <div className="flex border-b border-[#232430] bg-[#12131a] p-1 rounded-lg">
        <button
          onClick={() => setActiveSegment('academy')}
          className={`flex-1 text-center py-2 text-xs font-semibold rounded-md transition-all flex items-center justify-center gap-2 cursor-pointer ${activeSegment === 'academy' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-gray-400 hover:text-gray-200'}`}
        >
          <GraduationCap className="w-4 h-4" />
          CinemaHub Learning Academy (With Quizzes & Certificates)
        </button>
        <button
          onClick={() => setActiveSegment('workspace')}
          className={`flex-1 text-center py-2 text-xs font-semibold rounded-md transition-all flex items-center justify-center gap-2 cursor-pointer ${activeSegment === 'workspace' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-gray-400 hover:text-gray-200'}`}
        >
          <Layers className="w-4 h-4" />
          Collaboration Workspaces (Track Tasks & Coordinate Crews)
        </button>
      </div>

      {activeSegment === 'academy' ? (
        /* ==================== LEARNING ACADEMY WORKSPACE ==================== */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Courses List - Left */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Online Professional Masterclasses
            </h3>

            <div className="space-y-4">
              {courses.map(course => {
                const isSelected = selectedCourseId === course.id;
                return (
                  <div
                    key={course.id}
                    onClick={() => setSelectedCourseId(course.id)}
                    className={`bg-[#12131a] border rounded-xl overflow-hidden cursor-pointer hover:border-amber-500/40 transition-all ${isSelected ? 'border-amber-500 bg-[#161724]' : 'border-[#232430]'}`}
                  >
                    <div className="h-32 relative bg-[#0c0d12] overflow-hidden">
                      <img src={course.coverImage} alt={course.title} className="w-full h-full object-cover opacity-60" />
                      <div className="absolute top-2 left-2 bg-slate-950/80 px-2 py-0.5 rounded text-[10px] font-bold text-amber-500 border border-amber-500/15">
                        {course.category}
                      </div>
                      <div className="absolute bottom-2 right-2 bg-amber-500 text-[#0c0d12] px-2 py-0.5 rounded text-[9px] font-bold">
                        {course.level}
                      </div>
                    </div>

                    <div className="p-4 space-y-3">
                      <div>
                        <h4 className="text-gray-100 font-bold text-sm leading-snug line-clamp-2">{course.title}</h4>
                        <p className="text-[11px] text-gray-400 mt-1">Instructor: <span className="text-gray-200 font-semibold">{course.instructor}</span></p>
                      </div>

                      {/* Info lines Row */}
                      <div className="flex justify-between items-center text-[10px] text-gray-500">
                        <span>⌛ {course.duration}</span>
                        <span>⭐ {course.rating} ({course.studentsCount} students)</span>
                      </div>

                      {/* Progress widget */}
                      {course.isEnrolled ? (
                        <div className="space-y-1.5 pt-2 border-t border-[#1e1f2b]">
                          <div className="flex justify-between text-[11px] text-gray-400">
                            <span className="text-amber-500 font-semibold flex items-center gap-1">
                              <CheckCircle className="w-3 h-3 text-amber-500" />
                              Active Student
                            </span>
                            <span>{course.progressPercentage}% Completed</span>
                          </div>
                          <div className="w-full bg-[#0a0a0f] h-1.5 rounded-full overflow-hidden">
                            <div className="bg-amber-500 h-full" style={{ width: `${course.progressPercentage}%` }}></div>
                          </div>
                        </div>
                      ) : (
                        <div className="pt-2 border-t border-[#1e1f2b] flex justify-end">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleEnroll(course.id);
                            }}
                            className="bg-amber-500 hover:bg-amber-600 @active:scale-95 text-slate-950 text-[10px] font-bold px-3 py-1.5 rounded cursor-pointer"
                          >
                            Enroll in Class
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Expanded Lesson View + Certified Generator - Right */}
          <div className="lg:col-span-7">
            {selectedCourseId ? (() => {
              const course = courses.find(c => c.id === selectedCourseId);
              if (!course) return null;

              return (
                <div className="bg-[#12131a] border border-[#232430] rounded-xl p-5 space-y-6">
                  {/* Top description card */}
                  <div className="space-y-2 pb-4 border-b border-[#232430]">
                    <span className="text-[10px] uppercase font-bold text-amber-500 tracking-widest">{course.category} Syllabus Masterclass</span>
                    <h3 className="text-gray-100 font-extrabold text-base leading-tight">{course.title}</h3>
                    <p className="text-[11px] text-gray-400">Instructor credentials: <strong>{course.instructor}</strong> ({course.instructorTitle})</p>
                    <p className="text-xs text-gray-300 leading-relaxed pt-1">{course.description}</p>
                  </div>

                  {/* Enrollment Guardian */}
                  {!course.isEnrolled ? (
                    <div className="bg-[#0c0d15] border border-[#2c2d3c] rounded-xl p-8 text-center space-y-3">
                      <GraduationCap className="w-12 h-12 text-amber-500 mx-auto" />
                      <div>
                        <h4 className="text-gray-200 font-bold text-sm">Study materials are locked.</h4>
                        <p className="text-xs text-text-gray-500 max-w-sm mx-auto mt-1">Enroll in this CinemaHub class to unlock full access to lessons, quizzes, and certificates.</p>
                      </div>
                      <button
                        onClick={() => handleToggleEnroll(course.id)}
                        className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-6 py-2 rounded-lg cursor-pointer"
                      >
                        Enroll Now & Begin Rehearsals
                      </button>
                    </div>
                  ) : (
                    <>
                      {/* Active Syllabus Lessons listing */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="text-gray-200 text-xs font-bold uppercase tracking-wider">Video Lessons Curriculum</h4>
                          <span className="text-[10px] text-amber-500">TICK LESSONS AND STREAM CONTENT</span>
                        </div>

                        <div className="space-y-2">
                          {course.lessons.map((lesson, idx) => {
                            const isCompleted = course.lessonsCompleted.includes(lesson.id);
                            return (
                              <div
                                key={lesson.id}
                                className={`p-3 rounded-lg border text-xs cursor-pointer transition ${isCompleted ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-[#0b0c10] border-[#232430] hover:border-[#383a4d]'}`}
                                onClick={() => handleCompleteLesson(course.id, lesson.id)}
                              >
                                <div className="flex justify-between items-center">
                                  <div className="flex gap-2 items-center">
                                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${isCompleted ? 'bg-emerald-500 text-[#0c0d12]' : 'bg-[#1e1f2b] text-gray-400'}`}>
                                      {idx + 1}
                                    </span>
                                    <span className={`font-semibold ${isCompleted ? 'text-gray-400 line-through' : 'text-gray-200'}`}>{lesson.title}</span>
                                  </div>
                                  <span className="text-[10px] text-gray-500">{lesson.duration}</span>
                                </div>
                                {!isCompleted && (
                                  <p className="text-gray-400 text-[11px] pl-7 mt-1.5 leading-relaxed">
                                    {lesson.content}
                                  </p>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Interactive Academy Quiz section */}
                      {course.quizzes && course.quizzes.length > 0 && (
                        <div className="border-t border-[#232430] pt-4 space-y-4">
                          <h4 className="text-gray-200 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                            <GraduationCap className="w-4 h-4 text-amber-500" />
                            Instructor Examination Quiz
                          </h4>

                          <div className="space-y-4">
                            {course.quizzes.map((quiz, qId) => {
                              const selectedAnsIdx = quizAnswers[quiz.id];
                              const verification = quizResults[quiz.id];

                              return (
                                <div key={quiz.id} className="bg-[#0b0c10] border border-[#232430] p-4 rounded-lg space-y-3 text-xs">
                                  <p className="font-bold text-gray-200">Question {qId + 1}: {quiz.question}</p>

                                  <div className="space-y-2 pl-2">
                                    {quiz.options.map((option, oIdx) => (
                                      <label key={oIdx} className="flex gap-2 items-start cursor-pointer text-gray-300 hover:text-gray-100">
                                        <input
                                          type="radio"
                                          name={`quiz_${quiz.id}`}
                                          checked={selectedAnsIdx === oIdx}
                                          onChange={() => handleSelectQuizAnswer(quiz.id, oIdx)}
                                          disabled={verification !== undefined}
                                          className="mt-0.5 accent-amber-500"
                                        />
                                        <span>{option}</span>
                                      </label>
                                    ))}
                                  </div>

                                  <div className="flex justify-between items-center pt-2 border-t border-[#1e1f2b]">
                                    <div className="text-[11px]">
                                      {verification === 'correct' && (
                                        <span className="text-emerald-400 font-bold">✓ Correct! +15% Course progression</span>
                                      )}
                                      {verification === 'wrong' && (
                                        <span className="text-rose-400 font-bold">✗ Incorrect answer. Try again!</span>
                                      )}
                                    </div>

                                    {verification === undefined ? (
                                      <button
                                        type="button"
                                        onClick={() => handleVerifyQuiz(course.id, quiz.id, quiz.correctAnswerIndex)}
                                        className="bg-amber-500/20 text-amber-500 hover:bg-amber-500 hover:text-slate-950 font-bold text-[10px] px-3 py-1 rounded border border-amber-500/30 cursor-pointer"
                                      >
                                        Verify Selection
                                      </button>
                                    ) : (
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const nextResults = { ...quizResults };
                                          delete nextResults[quiz.id];
                                          setQuizResults(nextResults);
                                          // clear selected
                                          const nextAns = { ...quizAnswers };
                                          delete nextAns[quiz.id];
                                          setQuizAnswers(nextAns);
                                        }}
                                        className="text-gray-500 hover:text-gray-300 font-semibold text-[10px]"
                                      >
                                        Reset Question
                                      </button>
                                    )}
                                  </div>

                                  {verification && (
                                    <p className="text-[11px] text-gray-400 italic bg-[#12131a] p-2 rounded">
                                      {quiz.explanation}
                                    </p>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Dynamic Certificate of Completion Widget */}
                      {course.certificateEarned && (
                        <div className="border-t border-amber-500/30 pt-6 space-y-3 animate-fadeIn">
                          <div className="bg-gradient-to-r from-amber-500/20 to-yellow-500/10 border border-amber-500/40 p-4 rounded-xl text-center space-y-4">
                            <Award className="w-10 h-10 text-amber-500 mx-auto animate-bounce" />
                            <div>
                              <h4 className="text-amber-400 font-extrabold text-base uppercase">Premium Certificate Achieved!</h4>
                              <p className="text-xs text-gray-300 mt-1">Outstanding curriculum mastery! Your credentials have been permanently verified under the CinemaHub Blockchain database.</p>
                            </div>

                            {/* visual Certificate rendering box */}
                            <div className="bg-[#0b0c10] border-4 border-[#bf9951] p-6 max-w-md mx-auto text-center rounded-lg relative overflow-hidden font-serif">
                              {/* Background overlay details */}
                              <div className="absolute top-2 left-2 text-[8px] tracking-wide text-gray-700 uppercase font-mono">Verified ID: {course.id}_CERT_2026</div>

                              <span className="text-[10px] text-amber-500 font-bold uppercase tracking-widest block mb-1">CinemaHub Professional Academy</span>
                              <h5 className="text-xl font-bold text-gray-100">Certificate of Completion</h5>
                              <p className="text-[10px] text-gray-500 italic my-2">this academy credential is proudly awarded to:</p>
                              <strong className="text-base text-[#bf9951] tracking-wide font-sans block">{currentProfile.name}</strong>
                              <p className="text-[9px] text-gray-400 max-w-xs mx-auto leading-normal mt-2">
                                for successfully finalizing all lessons, evaluations, and mock assessments in
                              </p>
                              <p className="text-xs text-gray-100 font-sans font-bold my-1">"{course.title}"</p>

                              <div className="flex justify-between items-center pt-4 mt-4 border-t border-[#bf9951]/40 text-[9px] text-[#bf9951] leading-none font-sans">
                                <div>
                                  <p className="italic">Youssef Chahine Bey</p>
                                  <span className="text-[8px] text-gray-600">Executive Dean</span>
                                </div>
                                <div className="text-center font-mono text-gray-600 text-[8px]">
                                  <p>blockchain certified</p>
                                  <p className="text-emerald-500">✓ online</p>
                                </div>
                                <div>
                                  <p className="italic">Nermin Al-Saeed</p>
                                  <span className="text-[8px] text-gray-600">Advisory Director</span>
                                </div>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => alert(`Certificate hash printed to logs! Token reference: CN-${course.id}-${currentProfile.id}`)}
                              className="bg-amber-500 text-slate-950 font-bold text-xs py-2 px-5 rounded hover:bg-amber-600 cursor-pointer"
                            >
                              Download Ledger Certification pdf
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })() : (
              <div className="bg-[#12131a] border border-[#232430] p-12 text-center text-gray-500">
                <Bookmark className="w-12 h-12 text-[#232430] mx-auto mb-3" />
                <p className="text-xs">Select any academy class to manage lessons progression and earn blockchain credentials.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* ==================== COLLABORATIVE WORKSPACE VIEW ==================== */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Projects lists - Left Sidebar */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Your Professional Boards ({projects.length})
            </h3>

            <div className="space-y-3">
              {projects.map(proj => {
                const isSelected = selectedProjectId === proj.id;
                return (
                  <div
                    key={proj.id}
                    onClick={() => setSelectedProjectId(proj.id)}
                    className={`bg-[#12131a] border rounded-lg p-4 cursor-pointer hover:border-amber-500/30 transition-all ${isSelected ? 'border-amber-500 bg-[#161724]' : 'border-[#232430]'}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="bg-[#1e1f2b] text-[10px] font-mono font-bold text-gray-400 px-2 py-0.5 border border-[#232430] rounded">
                        {proj.status}
                      </span>
                    </div>
                    <h4 className="text-gray-100 font-bold text-xs">{proj.name}</h4>
                    <p className="text-[10px] text-gray-500 mt-1 line-clamp-2">{proj.description}</p>

                    <div className="flex justify-between items-center pt-3 mt-3 border-t border-[#1e1f2b] text-[10px] text-gray-500">
                      <span>Tasks: <strong>{proj.tasks.length} live</strong></span>
                      <span>Team: <strong>{proj.team.length} collaborators</strong></span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Expanded Project Board Details - Right */}
          <div className="lg:col-span-8">
            {selectedProjectId ? (() => {
              const proj = projects.find(p => p.id === selectedProjectId);
              if (!proj) return null;

              return (
                <div className="bg-[#12131a] border border-[#232430] rounded-xl p-5 space-y-6">
                  {/* Title and team bar */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[#232430] pb-4 gap-4">
                    <div>
                      <span className="text-[10px] text-amber-500 font-extrabold uppercase bg-amber-500/10 px-2 py-0.5 rounded">
                        {proj.type} Board Workspace
                      </span>
                      <h3 className="text-gray-100 font-bold text-base mt-1">{proj.name}</h3>
                    </div>

                    <div className="flex -space-x-2 overflow-hidden items-center">
                      <span className="text-[10px] text-gray-500 mr-3">Active Crews:</span>
                      {proj.team.map((mem, i) => (
                        <img
                          key={i}
                          src={mem.avatar}
                          alt={mem.name}
                          title={`${mem.name} (${mem.role})`}
                          className="w-8 h-8 rounded-full border-2 border-[#12131a] object-cover hover:translate-y-[-2px] transition-transform"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Production stage timeline track (Pre - Pro - Post) */}
                  <div className="space-y-2">
                    <h4 className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Production Phase Workflow progress</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {proj.workflows.map(wf => (
                        <div key={wf.id} className={`p-2.5 rounded border text-xs relative overflow-hidden ${wf.status === 'Active' ? 'bg-amber-500/5 border-amber-500/30' : wf.status === 'Completed' ? 'bg-emerald-500/5 border-emerald-500/30' : 'bg-[#0b0c10] border-[#22232d]'}`}>
                          <div className="flex justify-between items-center">
                            <strong className={wf.status === 'Completed' ? 'text-emerald-400 font-bold' : wf.status === 'Active' ? 'text-amber-500 font-bold' : 'text-gray-400'}>{wf.phase}</strong>
                            <span className="text-[9px] font-mono text-gray-600">{wf.status}</span>
                          </div>
                          <span className="text-[9px] text-gray-500 block mt-1">{wf.startDate} → {wf.endDate}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Kanban Task Manager */}
                  <div className="space-y-4 pt-2">
                    <div className="flex justify-between items-center">
                      <h4 className="text-gray-200 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                        <CheckSquare className="w-4 h-4 text-amber-500" />
                        Tasks Assignment Ledger
                      </h4>
                      <span className="text-[10px] text-gray-500">CLICK CARD TO ADVANCE STATUS STATUS</span>
                    </div>

                    {/* Task board grid of cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {proj.tasks.map(task => {
                        const assignee = proj.team.find(t => t.profileId === task.assignedTo);
                        return (
                          <div
                            key={task.id}
                            id={`task-board-card-${task.id}`}
                            onClick={() => handleCycleTaskStatus(proj.id, task.id, task.status)}
                            className="bg-[#0b0c10] border border-[#232430] p-3 rounded-lg hover:border-amber-500/30 transition cursor-pointer relative"
                          >
                            <span className={`absolute top-2 right-2 text-[9px] font-bold uppercase px-1.5 py-0.2 rounded ${task.priority === 'High' ? 'bg-rose-500/15 text-rose-400' : 'bg-gray-800 text-gray-400'}`}>
                              {task.priority} Priority
                            </span>

                            <span className={`text-[10px] font-semibold tracking-wider uppercase ${task.status === 'Done' ? 'text-emerald-400' : task.status === 'In Progress' ? 'text-amber-500 animate-pulse' : 'text-gray-500'}`}>
                              {task.status}
                            </span>

                            <h5 className="text-xs font-bold text-gray-200 mt-1">{task.title}</h5>
                            <p className="text-[11px] text-gray-400 mt-1 leading-normal line-clamp-2">{task.description}</p>

                            <div className="flex justify-between items-center pt-2 mt-2 border-t border-[#1a1b24] text-[10px] text-gray-500">
                              <span className="flex items-center gap-1">
                                {assignee && <img src={assignee.avatar} className="w-4 h-4 rounded-full object-cover" />}
                                <strong>{assignee ? assignee.name : 'Crew member'}</strong>
                              </span>
                              <span>Due: <strong>{task.dueDate}</strong></span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Quick Add Task mini form inside board */}
                    <form onSubmit={(e) => handleCreateTask(e, proj.id)} className="bg-[#0b0c10] border border-[#232430] p-3.5 rounded-lg text-xs space-y-3">
                      <p className="text-amber-500 font-bold text-xs uppercase tracking-widest block">Assign New Crew Action:</p>
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                        <div className="md:col-span-5">
                          <input
                            type="text"
                            required
                            placeholder="e.g. Schedule Al-Ula hotel transport logs"
                            value={newTaskTitle}
                            onChange={(e) => setNewTaskTitle(e.target.value)}
                            className="w-full bg-[#12131a] border border-[#232430] text-xs text-gray-200 rounded px-2.5 py-2 focus:outline-none"
                          />
                        </div>

                        <div className="md:col-span-3">
                          <select
                            value={newTaskAssignee}
                            onChange={(e) => setNewTaskAssignee(e.target.value)}
                            className="w-full bg-[#12131a] border border-[#232430] text-[11px] text-gray-300 rounded px-2 py-2 outline-none"
                          >
                            {proj.team.map(t => (
                              <option key={t.profileId} value={t.profileId}>{t.name} ({t.role})</option>
                            ))}
                          </select>
                        </div>

                        <div className="md:col-span-2">
                          <select
                            value={newTaskPriority}
                            onChange={(e) => setNewTaskPriority(e.target.value as any)}
                            className="w-full bg-[#12131a] border border-[#232430] text-[11px] text-gray-300 rounded px-2 py-2 outline-none"
                          >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                          </select>
                        </div>

                        <div className="md:col-span-2">
                          <button
                            type="submit"
                            className="w-full bg-amber-500 text-slate-950 font-bold py-2 rounded text-[11px] hover:bg-amber-600 transition cursor-pointer"
                          >
                            Assign Task
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>

                  {/* Team Group Chat messaging board */}
                  <div className="border-t border-[#232430] pt-4 space-y-3">
                    <h4 className="text-gray-200 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                      <Users className="w-4 h-4 text-amber-500" />
                      Studio Team Messenger log
                    </h4>

                    {/* Chats loop */}
                    <div className="bg-[#0b0c10] border border-[#232430] p-4 rounded-lg space-y-3 max-h-56 overflow-y-auto">
                      {proj.messages.map((msg, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex items-center gap-2">
                            <img src={msg.senderAvatar} alt={msg.senderName} className="w-5 h-5 rounded-full object-cover" />
                            <strong className="text-amber-400 text-[11px]">{msg.senderName}</strong>
                            <span className="text-[9px] text-gray-600 font-mono">{msg.timestamp}</span>
                          </div>
                          <p className="text-gray-300 text-xs pl-7 leading-relaxed">{msg.content}</p>
                        </div>
                      ))}
                    </div>

                    {/* Post chat inputs */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Write dynamic message to board members..."
                        value={chatMessageText}
                        onChange={(e) => setChatMessageText(e.target.value)}
                        className="flex-1 bg-[#0a0a0f] border border-[#232430] text-gray-200 text-xs rounded-lg px-3 py-2.5 focus:outline-none focus:border-amber-500"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handlePostWorkspaceMessage(proj.id);
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => handlePostWorkspaceMessage(proj.id)}
                        className="bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold px-4 rounded-lg transition flex items-center gap-1 cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              );
            })() : (
              <div className="bg-[#12131a] text-center p-12 text-gray-500 rounded-xl">
                <p>Select a project board from the left panel to coordinate steps.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
