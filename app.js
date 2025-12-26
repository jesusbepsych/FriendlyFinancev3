// build-app.jsx
import React, { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import {
  Plus,
  X,
  TrendingUp,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Download,
  Upload,
  DollarSign,
  PieChart,
  Receipt,
  Calendar,
  Search,
  Check,
  Star,
  Sparkles,
  Trophy,
  Clock,
  Target,
  Archive,
  ArrowUp,
  Wallet,
  Briefcase,
  ListTodo,
  BarChart3,
  Settings,
  Zap,
  Moon,
  Sun,
  Edit3,
  Printer,
  Camera
} from "lucide-react";
import {
  PieChart as RechartsPie,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  LineChart,
  Line,
  AreaChart,
  Area
} from "recharts";
var styles = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&family=Fredoka:wght@400;500;600;700&display=swap');

  * {
    font-family: 'Nunito', sans-serif;
  }

  :root {
    --candy-pink: #FF6B9D;
    --candy-purple: #C490E4;
    --candy-blue: #6BB9F0;
    --candy-mint: #5FCFB5;
    --candy-yellow: #FFD93D;
    --candy-orange: #FFB347;
    --candy-coral: #FF8C7F;
    --soft-white: #FEFCFF;
    --soft-gray: #F7F5FA;
    --medium-gray: #E8E4EE;
    --text-dark: #2D2A3E;
    --text-light: #6B6789;
    
    /* Light mode defaults */
    --bg-primary: linear-gradient(135deg, #FFF5F8 0%, #F0F4FF 50%, #F5FFF8 100%);
    --bg-card: #FFFFFF;
    --bg-input: rgba(255, 255, 255, 0.8);
    --bg-hover: rgba(0, 0, 0, 0.02);
    --bg-tab: #F3F4F6;
    --border-light: #E5E7EB;
    --border-card: #F3F4F6;
    --text-primary: #2D2A3E;
    --text-secondary: #6B6789;
    --text-muted: #9CA3AF;
    --shadow-color: rgba(45, 42, 62, 0.1);
  }

  .dark-mode {
    --candy-pink: #FF85B3;
    --candy-purple: #D4A8F0;
    --candy-blue: #7EC8F8;
    --candy-mint: #6DDFC5;
    --candy-yellow: #FFE066;
    --candy-orange: #FFC266;
    --candy-coral: #FFA299;
    
    --bg-primary: linear-gradient(135deg, #1A1625 0%, #1E1B2E 50%, #1A2025 100%);
    --bg-card: #252233;
    --bg-input: rgba(45, 40, 60, 0.8);
    --bg-hover: rgba(255, 255, 255, 0.05);
    --bg-tab: #2D2A3E;
    --border-light: #3D3A4E;
    --border-card: #3D3A4E;
    --text-primary: #F0EDF5;
    --text-secondary: #A8A3B8;
    --text-muted: #6B6789;
    --shadow-color: rgba(0, 0, 0, 0.3);
  }

  body {
    background: var(--bg-primary);
    min-height: 100vh;
    /* Prevent overscroll bounce that causes the stopping issue */
    overscroll-behavior: none;
    -webkit-overflow-scrolling: touch;
  }

  /* iOS Safari touch fixes - prevent button/tap issues */
  button, [role="button"], .press-feedback, .btn-press {
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    user-select: none;
    touch-action: manipulation;
    cursor: pointer;
  }

  /* Prevent text selection on interactive elements */
  .candy-input, input, select, textarea {
    -webkit-tap-highlight-color: transparent;
  }

  /* Ensure clickable areas respond immediately on iOS */
  * {
    -webkit-tap-highlight-color: transparent;
  }

  html {
    /* Smooth scrolling */
    scroll-behavior: smooth;
    overscroll-behavior: none;
  }

  /* Fix for iOS Safari scroll stopping issue */
  html, body {
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
  }

  .app-container {
    background: var(--bg-primary);
    min-height: 100vh;
    position: relative;
    transition: background 0.3s ease;
  }

  .dark-mode .app-container {
    background: linear-gradient(180deg, 
      rgba(26, 22, 37, 0.98) 0%, 
      rgba(30, 27, 46, 0.98) 50%, 
      rgba(26, 32, 37, 0.98) 100%);
  }

  /* Simplified background - removed heavy animated pseudo-elements */

  /* Bouncy button effect */
  .btn-bounce {
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .btn-bounce:hover {
    transform: translateY(-3px) scale(1.02);
  }
  .btn-bounce:active {
    transform: translateY(1px) scale(0.98);
    transition: all 0.1s ease;
  }

  /* Jelly wobble on click */
  @keyframes jelly {
    0% { transform: scale(1); }
    25% { transform: scale(0.95, 1.05); }
    50% { transform: scale(1.05, 0.95); }
    75% { transform: scale(0.98, 1.02); }
    100% { transform: scale(1); }
  }
  .jelly-click {
    animation: jelly 0.4s ease;
  }

  /* Smooth fade in - only animate once */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .fade-in-up {
    animation: fadeInUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }

  /* Stagger children - animate only on initial mount, not re-renders */
  .stagger-children > * {
    animation: fadeInUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }
  .stagger-children > *:nth-child(1) { animation-delay: 0.05s; }
  .stagger-children > *:nth-child(2) { animation-delay: 0.1s; }
  .stagger-children > *:nth-child(3) { animation-delay: 0.15s; }
  .stagger-children > *:nth-child(4) { animation-delay: 0.2s; }
  .stagger-children > *:nth-child(5) { animation-delay: 0.25s; }
  .stagger-children > *:nth-child(6) { animation-delay: 0.3s; }

  /* Satisfying checkbox with enhanced animation */
  @keyframes checkPop {
    0% { transform: scale(0) rotate(-45deg); opacity: 0; }
    50% { transform: scale(1.4) rotate(10deg); opacity: 1; }
    70% { transform: scale(0.9) rotate(-5deg); }
    100% { transform: scale(1) rotate(0deg); opacity: 1; }
  }
  .check-pop {
    animation: checkPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  /* Checkbox container burst effect */
  @keyframes checkboxBurst {
    0% { box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.7); }
    50% { box-shadow: 0 0 0 12px rgba(52, 211, 153, 0); }
    100% { box-shadow: 0 0 0 0 rgba(52, 211, 153, 0); }
  }
  .checkbox-burst {
    animation: checkboxBurst 0.5s ease-out;
  }

  /* Sparkle particles around checkbox */
  @keyframes sparkle1 {
    0% { transform: translate(0, 0) scale(0); opacity: 1; }
    100% { transform: translate(-15px, -15px) scale(1); opacity: 0; }
  }
  @keyframes sparkle2 {
    0% { transform: translate(0, 0) scale(0); opacity: 1; }
    100% { transform: translate(15px, -12px) scale(1); opacity: 0; }
  }
  @keyframes sparkle3 {
    0% { transform: translate(0, 0) scale(0); opacity: 1; }
    100% { transform: translate(12px, 15px) scale(1); opacity: 0; }
  }
  @keyframes sparkle4 {
    0% { transform: translate(0, 0) scale(0); opacity: 1; }
    100% { transform: translate(-12px, 12px) scale(1); opacity: 0; }
  }
  .checkbox-sparkles {
    position: relative;
  }
  .checkbox-sparkles::before,
  .checkbox-sparkles::after {
    content: '\u2728';
    position: absolute;
    font-size: 10px;
    pointer-events: none;
  }
  .checkbox-sparkles.sparkle-active::before {
    animation: sparkle1 0.5s ease-out forwards;
  }
  .checkbox-sparkles.sparkle-active::after {
    animation: sparkle2 0.5s ease-out 0.05s forwards;
  }

  /* iOS Safari touch scroll support */
  .ios-scroll {
    -webkit-overflow-scrolling: touch;
    overflow-y: auto;
    overscroll-behavior: contain;
  }
  
  /* Modal scroll container */
  .modal-scroll-container {
    -webkit-overflow-scrolling: touch;
    overflow-y: scroll;
    overscroll-behavior-y: contain;
    touch-action: pan-y;
  }

  /* Number pop */
  @keyframes numberPop {
    0% { transform: scale(1); }
    50% { transform: scale(1.15); }
    100% { transform: scale(1); }
  }
  .number-pop {
    animation: numberPop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  /* Shake animation */
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-8px); }
    40% { transform: translateX(8px); }
    60% { transform: translateX(-4px); }
    80% { transform: translateX(4px); }
  }
  .shake {
    animation: shake 0.4s ease;
  }

  /* Glow pulse */
  @keyframes glowPulse {
    0%, 100% { box-shadow: 0 0 20px rgba(255, 107, 157, 0.3); }
    50% { box-shadow: 0 0 40px rgba(255, 107, 157, 0.5); }
  }
  .glow-pulse {
    animation: glowPulse 2s ease-in-out infinite;
  }

  /* Card hover lift - simplified for better scroll performance */
  .card-lift {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  @media (hover: hover) {
    .card-lift:hover {
      transform: translateY(-4px);
      box-shadow: 0 15px 30px rgba(45, 42, 62, 0.12);
    }
  }

  /* Responsive expense form grid */
  .expense-grid {
    display: grid;
    gap: 1.5rem;
    align-items: start;
  }
  @media (min-width: 700px) {
    .expense-grid {
      grid-template-columns: 160px 1fr 180px;
    }
  }
  @media (max-width: 699px) {
    .expense-grid {
      grid-template-columns: 1fr;
    }
  }

  /* Save pulse animation for download button */
  @keyframes savePulse {
    0% {
      box-shadow: 0 0 0 0 rgba(95, 207, 181, 0.6);
    }
    50% {
      box-shadow: 0 0 0 8px rgba(95, 207, 181, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(95, 207, 181, 0);
    }
  }
  .save-pulse {
    animation: savePulse 1.5s ease-in-out;
    border-color: #5FCFB5 !important;
  }

  /* Delete animation - shrink and fade */
  @keyframes deleteSlide {
    0% {
      opacity: 1;
      transform: scale(1) translateX(0);
      max-height: 200px;
    }
    50% {
      opacity: 0.5;
      transform: scale(0.95) translateX(10px);
    }
    100% {
      opacity: 0;
      transform: scale(0.9) translateX(30px);
      max-height: 0;
      padding: 0;
      margin: 0;
      border-width: 0;
    }
  }
  .delete-animation {
    animation: deleteSlide 0.4s ease-out forwards;
    overflow: hidden;
  }

  /* Smooth expand/collapse for accordions */
  .accordion-content {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.3s ease-out, opacity 0.3s ease-out;
    opacity: 0;
  }
  .accordion-content.expanded {
    grid-template-rows: 1fr;
    opacity: 1;
  }
  .accordion-content > div {
    overflow: hidden;
  }

  /* Success flash on buttons */
  @keyframes successFlash {
    0% {
      background: linear-gradient(to bottom right, #34D399, #10B981);
      box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.7);
    }
    50% {
      box-shadow: 0 0 0 12px rgba(52, 211, 153, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(52, 211, 153, 0);
    }
  }
  .success-flash {
    animation: successFlash 0.6s ease-out;
  }
  .success-flash::after {
    content: '\u2713';
    position: absolute;
    animation: checkPop 0.3s ease-out;
  }

  /* Pull to refresh indicator */
  @keyframes pullSpin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  /* Pull to refresh wallet animation */
  @keyframes walletBounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
  }
  @keyframes walletShake {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(-10deg); }
    75% { transform: rotate(10deg); }
  }
  @keyframes coinFall {
    0% { transform: translateY(-10px) rotate(0deg); opacity: 0; }
    20% { opacity: 1; }
    100% { transform: translateY(15px) rotate(180deg); opacity: 0; }
  }

  /* Larger touch targets for mobile */
  .touch-target {
    min-width: 44px;
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .touch-target-sm {
    min-width: 36px;
    min-height: 36px;
  }

  /* Haptic feedback press states */
  .press-feedback {
    transition: transform 0.1s ease, opacity 0.1s ease;
  }
  .press-feedback:active {
    transform: scale(0.95);
    opacity: 0.8;
  }

  /* Swipe tab transitions */
  .tab-content {
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
  }
  .tab-content.slide-left-enter {
    transform: translateX(100%);
    opacity: 0;
  }
  .tab-content.slide-right-enter {
    transform: translateX(-100%);
    opacity: 0;
  }
  .tab-content.slide-left-exit {
    transform: translateX(-100%);
    opacity: 0;
  }
  .tab-content.slide-right-exit {
    transform: translateX(100%);
    opacity: 0;
  }
  .tab-content.active {
    transform: translateX(0);
    opacity: 1;
  }

  /* Undo toast animation */
  @keyframes slideInUp {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  @keyframes slideOutDown {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(100%);
      opacity: 0;
    }
  }
  .undo-toast {
    animation: slideInUp 0.3s ease forwards;
  }
  .undo-toast.hiding {
    animation: slideOutDown 0.3s ease forwards;
  }

  /* Context menu animation */
  @keyframes scaleIn {
    from {
      transform: scale(0.8);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
  .context-menu {
    animation: scaleIn 0.15s ease forwards;
  }

  /* Button press effect with ripple */
  .btn-press {
    position: relative;
    overflow: hidden;
  }
  .btn-press::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: translate(-50%, -50%);
    transition: width 0.3s ease, height 0.3s ease;
  }
  .btn-press:active::after {
    width: 200%;
    height: 200%;
  }

  /* Input styling classes */
  .candy-input {
    width: 100%;
    padding: 0.75rem 1rem;
    border-radius: 1rem;
    outline: none;
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.06);
    transition: background-color 0.3s, color 0.3s;
  }
  .candy-input-light {
    background: rgba(255,255,255,0.8);
    color: #374151;
  }
  .candy-input-light::placeholder {
    color: #9CA3AF;
  }
  .candy-input-dark {
    background: #1E1B2E;
    color: #F3F4F6;
  }
  .candy-input-dark::placeholder {
    color: #6B7280;
  }
  .candy-date-wrapper-light {
    background: rgba(255,255,255,0.8);
    border: 2px solid #F3F4F6;
  }
  .candy-date-wrapper-dark {
    background: linear-gradient(to right, rgba(139,92,246,0.2), rgba(236,72,153,0.2));
    border: 2px solid rgba(139,92,246,0.3);
  }

  /* Tab slide indicator */
  .tab-indicator {
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  /* Smooth input focus - simplified */
  .input-candy {
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
    border: 3px solid transparent;
  }
  .input-candy:focus {
    border-color: var(--candy-pink);
    box-shadow: 0 0 0 4px rgba(255, 107, 157, 0.15);
  }

  /* Floating labels */
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
  }

  /* Progress bar fill */
  @keyframes progressFill {
    from { width: 0; }
  }
  .progress-fill {
    animation: progressFill 1s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  /* Confetti explosion */
  @keyframes confettiDrop {
    0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
    100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
  }

  /* Character bounce */
  @keyframes characterBounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-15px); }
  }
  .character-bounce {
    animation: characterBounce 2s ease-in-out infinite;
  }

  /* Sparkle */
  @keyframes sparkle {
    0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
    50% { opacity: 1; transform: scale(1) rotate(180deg); }
  }

  /* Slide in from right */
  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(30px); }
    to { opacity: 1; transform: translateX(0); }
  }
  .slide-in-right {
    animation: slideInRight 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  /* Achievement unlock */
  @keyframes achievementUnlock {
    0% { transform: scale(0) rotate(-180deg); opacity: 0; }
    50% { transform: scale(1.2) rotate(10deg); }
    100% { transform: scale(1) rotate(0deg); opacity: 1; }
  }
  .achievement-unlock {
    animation: achievementUnlock 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  /* Ripple effect */
  @keyframes ripple {
    to { transform: scale(4); opacity: 0; }
  }

  /* Blob shapes */
  .blob-bg {
    background: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23FF6B9D20' d='M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,89.1,-0.5C88.2,15.3,83.8,30.5,75.6,43.3C67.4,56.1,55.4,66.4,41.8,74.1C28.2,81.8,14.1,86.9,-1,88.6C-16.1,90.3,-32.2,88.6,-45.6,81.2C-59,73.8,-69.7,60.7,-77.4,46.2C-85.1,31.7,-89.8,15.8,-89.8,0C-89.8,-15.9,-85.1,-31.7,-76.8,-44.9C-68.4,-58,-56.4,-68.4,-42.8,-75.9C-29.2,-83.4,-14.6,-88,0.5,-88.8C15.6,-89.7,30.7,-83.6,44.7,-76.4Z' transform='translate(100 100)' /%3E%3C/svg%3E");
    background-size: cover;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  ::-webkit-scrollbar-track {
    background: var(--bg-tab);
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, var(--candy-pink), var(--candy-purple));
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, #E5598A, #A87FCA);
  }

  /* Dark mode toggle button */
  .dark-mode-toggle {
    transition: all 0.3s ease;
  }
  .dark-mode-toggle:hover {
    transform: rotate(15deg);
  }

  /* Tooltip */
  .tooltip-candy {
    position: relative;
  }
  .tooltip-candy::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(-5px);
    background: var(--text-dark);
    color: white;
    padding: 8px 12px;
    border-radius: 10px;
    font-size: 12px;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s ease;
  }
  .tooltip-candy:hover::after {
    opacity: 1;
    transform: translateX(-50%) translateY(-10px);
  }
`;
var CandyDateInput = ({ value, onChange, className = "", darkMode }) => /* @__PURE__ */ React.createElement(
  "div",
  {
    className: `relative rounded-2xl overflow-hidden transition-colors duration-300 ${className}`,
    style: darkMode ? {
      background: "linear-gradient(to right, rgba(139,92,246,0.2), rgba(236,72,153,0.2))",
      border: "2px solid rgba(139,92,246,0.3)"
    } : {
      background: "linear-gradient(to right, rgba(167,139,250,0.15), rgba(244,114,182,0.15))",
      border: "2px solid rgba(167,139,250,0.3)"
    }
  },
  /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "date",
      value,
      onChange,
      className: `w-full px-4 py-3 text-center font-medium bg-transparent outline-none cursor-pointer ${darkMode ? "text-gray-100" : "text-gray-700"}`
    }
  )
);
var CandyTimeInput = ({ value, onChange, className = "", darkMode, placeholder = "" }) => /* @__PURE__ */ React.createElement(
  "div",
  {
    className: `relative rounded-2xl overflow-hidden transition-colors duration-300 ${className}`,
    style: darkMode ? {
      background: "linear-gradient(to right, rgba(139,92,246,0.2), rgba(236,72,153,0.2))",
      border: "2px solid rgba(139,92,246,0.3)"
    } : {
      background: "linear-gradient(to right, rgba(167,139,250,0.15), rgba(244,114,182,0.15))",
      border: "2px solid rgba(167,139,250,0.3)"
    }
  },
  /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "time",
      value,
      onChange,
      placeholder,
      className: `w-full px-4 py-3 text-center font-medium bg-transparent outline-none cursor-pointer ${darkMode ? "text-gray-100" : "text-gray-700"}`
    }
  )
);
var CandyButton = ({ children, onClick, variant = "primary", size = "md", className = "", disabled = false }) => {
  const baseClass = "btn-bounce font-bold rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg";
  const variants = {
    primary: "bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-white hover:from-emerald-500 hover:via-teal-500 hover:to-cyan-500 shadow-emerald-300/50 border-2 border-emerald-300/30",
    secondary: "bg-gradient-to-br from-violet-400 to-purple-500 text-white hover:from-violet-500 hover:to-purple-600 shadow-purple-300/50",
    success: "bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-white hover:from-emerald-500 hover:via-teal-500 hover:to-cyan-500 shadow-emerald-300/50 border-2 border-emerald-300/30",
    warning: "bg-gradient-to-br from-amber-400 to-orange-500 text-white hover:from-amber-500 hover:to-orange-600 shadow-amber-300/50",
    ghost: "bg-white/80 dark:bg-[#2D2A3E] text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-[#3D3A4E] shadow-gray-200/50 dark:shadow-black/20 border-2 border-gray-100 dark:border-[#3D3A4E]"
  };
  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-5 py-3 text-base",
    lg: "px-7 py-4 text-lg"
  };
  const handleTouchEnd = (e) => {
    if (!disabled && onClick) {
      e.preventDefault();
      onClick(e);
    }
  };
  return /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick,
      onTouchEnd: handleTouchEnd,
      disabled,
      className: `${baseClass} ${variants[variant]} ${sizes[size]} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`
    },
    children
  );
};
var CandyCard = ({ children, className = "", highlight = false, darkMode }) => /* @__PURE__ */ React.createElement("div", { className: `card-lift rounded-3xl p-6 shadow-xl border-2 transition-colors duration-300 ${darkMode ? `bg-[#252233] border-[#3D3A4E] ${highlight ? "border-pink-400/50" : ""}` : `bg-white border-gray-100 ${highlight ? "border-pink-200 glow-pulse" : ""}`} ${className}` }, children);
var CandySelect = ({ value, onChange, children, className = "", variant = "default", darkMode }) => {
  const isPurple = variant === "purple";
  const baseStyle = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='${darkMode ? "%23A8A3B8" : "%236B6789"}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 12px center"
  };
  const purpleDarkStyle = {
    ...baseStyle,
    background: "linear-gradient(to right, rgba(139,92,246,0.2), rgba(236,72,153,0.2))",
    border: "2px solid rgba(139,92,246,0.3)",
    backgroundImage: baseStyle.backgroundImage,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 12px center"
  };
  const purpleLightStyle = {
    ...baseStyle,
    background: "linear-gradient(to right, rgba(167,139,250,0.15), rgba(244,114,182,0.15))",
    border: "2px solid rgba(167,139,250,0.3)",
    backgroundImage: baseStyle.backgroundImage,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 12px center"
  };
  const getStyle = () => {
    if (isPurple) {
      return darkMode ? purpleDarkStyle : purpleLightStyle;
    }
    return baseStyle;
  };
  return /* @__PURE__ */ React.createElement(
    "select",
    {
      value,
      onChange,
      className: `input-candy px-4 py-3 rounded-2xl outline-none shadow-inner cursor-pointer appearance-none pr-8 transition-colors duration-300 ${isPurple ? darkMode ? "text-gray-100" : "text-gray-700" : darkMode ? "bg-[#1E1B2E] text-gray-100" : "bg-white/80 text-gray-700"} ${className}`,
      style: getStyle()
    },
    children
  );
};
var StatBubble = ({ icon, label, value, color = "pink", pop = false, darkMode }) => {
  const colors = {
    pink: { gradient: "from-pink-400 to-rose-400", text: "text-pink-500", bgLight: "bg-pink-50", bgDark: "bg-pink-900/20" },
    blue: { gradient: "from-blue-400 to-cyan-400", text: "text-blue-500", bgLight: "bg-blue-50", bgDark: "bg-blue-900/20" },
    green: { gradient: "from-emerald-400 to-teal-400", text: "text-emerald-500", bgLight: "bg-emerald-50", bgDark: "bg-emerald-900/20" },
    purple: { gradient: "from-purple-400 to-violet-400", text: "text-purple-500", bgLight: "bg-purple-50", bgDark: "bg-purple-900/20" },
    orange: { gradient: "from-orange-400 to-amber-400", text: "text-orange-500", bgLight: "bg-orange-50", bgDark: "bg-orange-900/20" }
  };
  const c = colors[color];
  return /* @__PURE__ */ React.createElement("div", { className: `flex items-center gap-3 p-4 rounded-2xl transition-colors duration-300 ${darkMode ? c.bgDark : c.bgLight}` }, /* @__PURE__ */ React.createElement("div", { className: `w-12 h-12 rounded-xl bg-gradient-to-br ${c.gradient} flex items-center justify-center text-white shadow-lg` }, icon), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: `text-xs font-medium uppercase tracking-wide ${darkMode ? "text-gray-400" : "text-gray-500"}` }, label), /* @__PURE__ */ React.createElement("p", { className: `text-xl font-bold ${c.text} ${pop ? "number-pop" : ""}` }, value)));
};
var MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var MonthYearSelector = ({ month, year, setMonth, setYear, className = "", variant = "default", darkMode }) => /* @__PURE__ */ React.createElement("div", { className: `flex gap-2 ${className}` }, /* @__PURE__ */ React.createElement(CandySelect, { value: month, onChange: (e) => setMonth(parseInt(e.target.value)), className: "min-w-[80px]", variant, darkMode }, MONTH_NAMES.map((m, i) => /* @__PURE__ */ React.createElement("option", { key: i, value: i }, m))), /* @__PURE__ */ React.createElement(CandySelect, { value: year, onChange: (e) => setYear(parseInt(e.target.value)), className: "min-w-[90px]", variant, darkMode }, Array.from({ length: 10 }, (_, i) => (/* @__PURE__ */ new Date()).getFullYear() - 5 + i).map((y) => /* @__PURE__ */ React.createElement("option", { key: y, value: y }, y))));
var TabButton = ({ active, onClick, icon, label, darkMode }) => /* @__PURE__ */ React.createElement(
  "button",
  {
    onClick,
    className: `btn-bounce relative px-4 py-3 rounded-2xl font-semibold flex items-center gap-2 transition-all ${active ? darkMode ? "bg-[#2D2A3E] text-pink-400 shadow-lg scale-105" : "bg-white text-pink-600 shadow-lg scale-105" : darkMode ? "text-gray-400 hover:text-gray-200 hover:bg-white/5" : "text-gray-500 hover:text-gray-700 hover:bg-white/50"}`
  },
  icon,
  /* @__PURE__ */ React.createElement("span", { className: "hidden sm:inline" }, label),
  active && /* @__PURE__ */ React.createElement("span", { className: "absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-2 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 rounded-full shadow-lg" })
);
var EmptyState = ({ icon, title, subtitle, darkMode }) => /* @__PURE__ */ React.createElement("div", { className: "text-center py-12 fade-in-up" }, /* @__PURE__ */ React.createElement("div", { className: "text-6xl mb-4 character-bounce inline-block" }, icon), /* @__PURE__ */ React.createElement("h3", { className: `text-xl font-bold mb-2 ${darkMode ? "text-gray-300" : "text-gray-600"}` }, title), /* @__PURE__ */ React.createElement("p", { className: darkMode ? "text-gray-500" : "text-gray-400" }, subtitle));
function FinanceTracker() {
  const [viewMode, setViewMode] = useState("income");
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoadedSuccessfully, setHasLoadedSuccessfully] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("financial-darkmode");
      if (saved !== null) return JSON.parse(saved);
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });
  const [oneTimeIncomes, setOneTimeIncomes] = useState([]);
  const [oneTimeName, setOneTimeName] = useState("");
  const [oneTimeAmount, setOneTimeAmount] = useState("");
  const [oneTimeNotes, setOneTimeNotes] = useState("");
  const [oneTimeDate, setOneTimeDate] = useState(() => {
    const now = /* @__PURE__ */ new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  });
  const [selectedIncomeMonth, setSelectedIncomeMonth] = useState((/* @__PURE__ */ new Date()).getMonth());
  const [selectedIncomeYear, setSelectedIncomeYear] = useState((/* @__PURE__ */ new Date()).getFullYear());
  const [expandedOneTime, setExpandedOneTime] = useState({});
  const [annualIncomeCategories, setAnnualIncomeCategories] = useState([]);
  const [incomeInputMode, setIncomeInputMode] = useState("manual");
  const [quickSources, setQuickSources] = useState(["Salary", "Freelance", "Gift"]);
  const [editingQuickSource, setEditingQuickSource] = useState(null);
  const [creditCards, setCreditCards] = useState([]);
  const [debitCards, setDebitCards] = useState([]);
  const [expandedCards, setExpandedCards] = useState({});
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [addCardType, setAddCardType] = useState("credit");
  const [newCardName, setNewCardName] = useState("");
  const [newCardBalance, setNewCardBalance] = useState("");
  const [newCardLimit, setNewCardLimit] = useState("");
  const [newCardAPR, setNewCardAPR] = useState("");
  const [newCardMinPayment, setNewCardMinPayment] = useState("");
  const [newCardDueDay, setNewCardDueDay] = useState("15");
  const [showPaymentModal, setShowPaymentModal] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [showDepositModal, setShowDepositModal] = useState(null);
  const [depositAmount, setDepositAmount] = useState("");
  const [investments, setInvestments] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState("");
  const [investAmount, setInvestAmount] = useState("");
  const [investQuantity, setInvestQuantity] = useState("");
  const [investType, setInvestType] = useState("buy");
  const [investMonth, setInvestMonth] = useState((/* @__PURE__ */ new Date()).getMonth());
  const [investYear, setInvestYear] = useState((/* @__PURE__ */ new Date()).getFullYear());
  const [expandedAssets, setExpandedAssets] = useState({});
  const [currentValues, setCurrentValues] = useState({});
  const [investCalendarYear, setInvestCalendarYear] = useState((/* @__PURE__ */ new Date()).getFullYear());
  const [assetInputMode, setAssetInputMode] = useState("manual");
  const [quickAssets, setQuickAssets] = useState(["Morpho", "Mamo", "Btc"]);
  const [editingQuickAsset, setEditingQuickAsset] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("Food");
  const [expenseDate, setExpenseDate] = useState((/* @__PURE__ */ new Date()).toISOString().split("T")[0]);
  const [expenseNotes, setExpenseNotes] = useState("");
  const [selectedBudgetMonth, setSelectedBudgetMonth] = useState((/* @__PURE__ */ new Date()).getMonth());
  const [selectedBudgetYear, setSelectedBudgetYear] = useState((/* @__PURE__ */ new Date()).getFullYear());
  const [categoryNotes, setCategoryNotes] = useState({ Subscriptions: "", Misc: "" });
  const [recurringExpenses, setRecurringExpenses] = useState([]);
  const [showRecurringModal, setShowRecurringModal] = useState(false);
  const [newRecurringName, setNewRecurringName] = useState("");
  const [newRecurringAmount, setNewRecurringAmount] = useState("");
  const [newRecurringCategory, setNewRecurringCategory] = useState("Subscriptions");
  const [newRecurringDay, setNewRecurringDay] = useState("1");
  const [workLogs, setWorkLogs] = useState([]);
  const [workHours, setWorkHours] = useState("");
  const [workJob, setWorkJob] = useState("");
  const [workDescription, setWorkDescription] = useState("");
  const [workDate, setWorkDate] = useState((/* @__PURE__ */ new Date()).toISOString().split("T")[0]);
  const [workHourlyRate, setWorkHourlyRate] = useState("");
  const [jobRates, setJobRates] = useState({});
  const [expandedJobs, setExpandedJobs] = useState({});
  const [selectedWorkMonth, setSelectedWorkMonth] = useState((/* @__PURE__ */ new Date()).getMonth());
  const [selectedWorkYear, setSelectedWorkYear] = useState((/* @__PURE__ */ new Date()).getFullYear());
  const [workMode, setWorkMode] = useState("hours");
  const [clockInTime, setClockInTime] = useState("");
  const [clockOutTime, setClockOutTime] = useState("");
  const [jobInputMode, setJobInputMode] = useState("manual");
  const [quickJobs, setQuickJobs] = useState(["Main Job", "Side Gig", "Freelance"]);
  const [editingQuickJob, setEditingQuickJob] = useState(null);
  const [assetTransactionPages, setAssetTransactionPages] = useState({});
  const [expensePage, setExpensePage] = useState(0);
  const [workLogPages, setWorkLogPages] = useState({});
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");
  const [todoDate, setTodoDate] = useState((/* @__PURE__ */ new Date()).toISOString().split("T")[0]);
  const [todoTime, setTodoTime] = useState("");
  const [todoPriority, setTodoPriority] = useState("medium");
  const [todoLinkedExpense, setTodoLinkedExpense] = useState(null);
  const [addingSubtaskFor, setAddingSubtaskFor] = useState(null);
  const [subtaskText, setSubtaskText] = useState("");
  const [archivedTodos, setArchivedTodos] = useState([]);
  const [showArchives, setShowArchives] = useState(false);
  const [expandedArchiveDates, setExpandedArchiveDates] = useState({});
  const [archiveDate, setArchiveDate] = useState((/* @__PURE__ */ new Date()).toISOString().split("T")[0]);
  const [archiveMode, setArchiveMode] = useState(false);
  const [trendsStartMonth, setTrendsStartMonth] = useState(() => {
    const now = /* @__PURE__ */ new Date();
    return { month: Math.max(0, now.getMonth() - 5), year: now.getFullYear() };
  });
  const [trendsEndMonth, setTrendsEndMonth] = useState(() => {
    const now = /* @__PURE__ */ new Date();
    return { month: now.getMonth(), year: now.getFullYear() };
  });
  const [reviewYear, setReviewYear] = useState((/* @__PURE__ */ new Date()).getFullYear());
  const [showBackupModal, setShowBackupModal] = useState(false);
  const [backupData, setBackupData] = useState("");
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [restoreText, setRestoreText] = useState("");
  const [showSaveIndicator, setShowSaveIndicator] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showAnalyticsExport, setShowAnalyticsExport] = useState(false);
  const [analyticsExportData, setAnalyticsExportData] = useState("");
  const [showScreenshotModal, setShowScreenshotModal] = useState(false);
  const [screenshotImage, setScreenshotImage] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const analyticsRef = useRef(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [newAchievement, setNewAchievement] = useState(null);
  const [unlockedAchievements, setUnlockedAchievements] = useState([]);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [newItemId, setNewItemId] = useState(null);
  const [shakeField, setShakeField] = useState(null);
  const [popTotal, setPopTotal] = useState(null);
  const [lastSaved, setLastSaved] = useState(null);
  const [collapsedSections, setCollapsedSections] = useState({});
  const [deletingItems, setDeletingItems] = useState(/* @__PURE__ */ new Set());
  const [successButton, setSuccessButton] = useState(null);
  const [pendingDeletion, setPendingDeletion] = useState(null);
  const [showUndoToast, setShowUndoToast] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const touchStartRef = useRef({ x: 0, y: 0 });
  const touchEndRef = useRef({ x: 0, y: 0 });
  const mainContentRef = useRef(null);
  const [contextMenu, setContextMenu] = useState(null);
  const longPressTimerRef = useRef(null);
  const incomeNameRef = useRef(null);
  const investAssetRef = useRef(null);
  const expenseAmountRef = useRef(null);
  const workHoursRef = useRef(null);
  const todoTextRef = useRef(null);
  const [showCharacter, setShowCharacter] = useState(false);
  const [characterQuote, setCharacterQuote] = useState("");
  const idleTimerRef = useRef(null);
  const EXPENSE_CATEGORIES = ["Food", "Gas", "Parking", "Car", "Subscriptions", "Misc"];
  const CATEGORY_STYLES = {
    "Food": { color: "#5FCFB5", bg: "#E8FBF6", icon: "\u{1F355}", gradient: "from-emerald-400 to-teal-400" },
    "Gas": { color: "#FFB347", bg: "#FFF4E6", icon: "\u26FD", gradient: "from-orange-400 to-amber-400" },
    "Parking": { color: "#6BB9F0", bg: "#E6F4FF", icon: "\u{1F17F}\uFE0F", gradient: "from-blue-400 to-cyan-400" },
    "Car": { color: "#C490E4", bg: "#F5E6FF", icon: "\u{1F697}", gradient: "from-purple-400 to-violet-400" },
    "Subscriptions": { color: "#FF6B9D", bg: "#FFE6EE", icon: "\u{1F4F1}", gradient: "from-pink-400 to-rose-400" },
    "Misc": { color: "#FFD93D", bg: "#FFFBE6", icon: "\u{1F4E6}", gradient: "from-yellow-400 to-amber-300" }
  };
  const CHART_COLORS = ["#FF6B9D", "#6BB9F0", "#5FCFB5", "#FFD93D", "#C490E4", "#FFB347", "#FF8C7F"];
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const fullMonthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const motivationalQuotes = [
    "You're doing amazing! \u{1F31F}",
    "Every penny counts! \u{1F4B0}",
    "Keep crushing those goals! \u{1F3AF}",
    "Financial freedom ahead! \u{1F680}",
    "You're a budgeting superstar! \u2B50",
    "Smart money moves! \u{1F4AA}",
    "Building wealth one day at a time! \u{1F3C6}",
    "Your future self thanks you! \u{1F64C}"
  ];
  const achievements = [
    { id: "first_expense", name: "First Step", description: "Log your first expense", icon: "\u{1F463}", check: () => expenses.length >= 1 },
    { id: "expense_10", name: "Tracker", description: "Log 10 expenses", icon: "\u{1F4DD}", check: () => expenses.length >= 10 },
    { id: "expense_50", name: "Dedicated", description: "Log 50 expenses", icon: "\u{1F4CA}", check: () => expenses.length >= 50 },
    { id: "expense_100", name: "Centurion", description: "Log 100 expenses", icon: "\u{1F4AF}", check: () => expenses.length >= 100 },
    { id: "first_income", name: "Money Maker", description: "Log your first income", icon: "\u{1F4B5}", check: () => oneTimeIncomes.length >= 1 },
    { id: "income_1000", name: "Thousandaire", description: "Earn $1,000 total", icon: "\u{1F4B0}", check: () => oneTimeIncomes.reduce((sum, i) => sum + i.amount, 0) >= 1e3 },
    { id: "income_5000", name: "High Roller", description: "Earn $5,000 total", icon: "\u{1F911}", check: () => oneTimeIncomes.reduce((sum, i) => sum + i.amount, 0) >= 5e3 },
    { id: "income_10000", name: "Big League", description: "Earn $10,000 total", icon: "\u{1F3C6}", check: () => oneTimeIncomes.reduce((sum, i) => sum + i.amount, 0) >= 1e4 },
    { id: "first_investment", name: "Investor", description: "Make your first investment", icon: "\u{1F4C8}", check: () => investments.length >= 1 },
    { id: "invest_5000", name: "Portfolio Builder", description: "Invest $5,000 total", icon: "\u{1F48E}", check: () => investments.reduce((sum, i) => sum + i.amount, 0) >= 5e3 },
    { id: "first_todo", name: "Planner", description: "Create your first task", icon: "\u2705", check: () => todos.length >= 1 || archivedTodos.length >= 1 },
    { id: "todo_25", name: "Task Master", description: "Complete 25 tasks", icon: "\u{1F3AF}", check: () => archivedTodos.filter((t) => t.completed).length >= 25 },
    { id: "first_work", name: "Clock Puncher", description: "Log your first work hours", icon: "\u23F0", check: () => workLogs.length >= 1 },
    { id: "work_100", name: "Hard Worker", description: "Log 100 work hours", icon: "\u{1F4AA}", check: () => workLogs.reduce((sum, w) => sum + w.hours, 0) >= 100 },
    { id: "diversified", name: "Diversified", description: "Invest in 3+ assets", icon: "\u{1F308}", check: () => [...new Set(investments.map((i) => i.asset))].length >= 3 },
    { id: "budget_categories", name: "Organizer", description: "Use all categories", icon: "\u{1F5C2}\uFE0F", check: () => [...new Set(expenses.map((e) => e.category))].length >= 6 }
  ];
  useEffect(() => {
    loadData();
  }, []);
  useEffect(() => {
    localStorage.setItem("financial-darkmode", JSON.stringify(darkMode));
  }, [darkMode]);
  useEffect(() => {
    if (!isLoading && hasLoadedSuccessfully) {
      saveData();
    }
  }, [oneTimeIncomes, investments, expenses, workLogs, todos, archivedTodos, categoryNotes, recurringExpenses, jobRates, currentValues, unlockedAchievements, annualIncomeCategories, creditCards, debitCards, quickAssets, quickSources, quickJobs, viewMode, isLoading, hasLoadedSuccessfully]);
  useEffect(() => {
    if (isLoading) return;
    achievements.forEach((achievement) => {
      if (!unlockedAchievements.includes(achievement.id) && achievement.check()) {
        setUnlockedAchievements((prev) => [...prev, achievement.id]);
        setNewAchievement(achievement);
        setShowConfetti(true);
        setTimeout(() => {
          setShowConfetti(false);
          setNewAchievement(null);
        }, 5e3);
      }
    });
  }, [expenses, oneTimeIncomes, investments, todos, archivedTodos, workLogs, isLoading]);
  useEffect(() => {
    let scrollTimeout = null;
    let lastScrollTop = 0;
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const shouldShow = currentScroll > 400;
      const wasShowing = lastScrollTop > 400;
      if (shouldShow !== wasShowing) {
        if (scrollTimeout) clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          setShowScrollTop(shouldShow);
        }, 100);
      }
      lastScrollTop = currentScroll;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, []);
  useEffect(() => {
    if (showAchievements) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
      }
    }
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
    };
  }, [showAchievements]);
  const showCharacterRef = useRef(false);
  useEffect(() => {
    const resetIdle = () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (showCharacterRef.current) {
        showCharacterRef.current = false;
        setShowCharacter(false);
      }
      idleTimerRef.current = setTimeout(() => {
        setCharacterQuote(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);
        showCharacterRef.current = true;
        setShowCharacter(true);
      }, 9e4);
    };
    const events = ["keydown"];
    events.forEach((e) => document.addEventListener(e, resetIdle, { passive: true }));
    resetIdle();
    return () => {
      events.forEach((e) => document.removeEventListener(e, resetIdle));
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, []);
  const loadData = () => {
    try {
      const savedInvestments = localStorage.getItem("financial-investments");
      const savedSettings = localStorage.getItem("financial-settings");
      const savedExpenses = localStorage.getItem("financial-expenses");
      const savedWorkLogs = localStorage.getItem("financial-worklogs");
      const savedTodos = localStorage.getItem("financial-todos");
      const savedOneTime = localStorage.getItem("financial-onetime");
      const savedAnnual = localStorage.getItem("financial-annual");
      const savedArchived = localStorage.getItem("financial-archived-todos");
      const savedNotes = localStorage.getItem("financial-category-notes");
      const savedRecurring = localStorage.getItem("financial-recurring");
      const savedJobRates = localStorage.getItem("financial-jobrates");
      const savedCurrentValues = localStorage.getItem("financial-currentvalues");
      const savedAchievements = localStorage.getItem("financial-achievements");
      const savedCreditCards = localStorage.getItem("financial-creditcards");
      const savedDebitCards = localStorage.getItem("financial-debitcards");
      const savedQuickAssets = localStorage.getItem("financial-quickassets");
      const savedQuickSources = localStorage.getItem("financial-quicksources");
      const savedQuickJobs = localStorage.getItem("financial-quickjobs");
      if (savedInvestments) {
        const loaded = JSON.parse(savedInvestments);
        loaded.forEach((inv) => inv.date = new Date(inv.date));
        setInvestments(loaded);
      }
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        setViewMode(settings.viewMode || "income");
      }
      if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
      if (savedWorkLogs) setWorkLogs(JSON.parse(savedWorkLogs));
      if (savedTodos) setTodos(JSON.parse(savedTodos));
      if (savedOneTime) setOneTimeIncomes(JSON.parse(savedOneTime));
      if (savedAnnual) setAnnualIncomeCategories(JSON.parse(savedAnnual));
      if (savedArchived) setArchivedTodos(JSON.parse(savedArchived));
      if (savedNotes) setCategoryNotes(JSON.parse(savedNotes));
      if (savedRecurring) setRecurringExpenses(JSON.parse(savedRecurring));
      if (savedJobRates) setJobRates(JSON.parse(savedJobRates));
      if (savedCurrentValues) setCurrentValues(JSON.parse(savedCurrentValues));
      if (savedAchievements) setUnlockedAchievements(JSON.parse(savedAchievements));
      if (savedCreditCards) setCreditCards(JSON.parse(savedCreditCards));
      if (savedDebitCards) setDebitCards(JSON.parse(savedDebitCards));
      if (savedQuickAssets) setQuickAssets(JSON.parse(savedQuickAssets));
      if (savedQuickSources) setQuickSources(JSON.parse(savedQuickSources));
      if (savedQuickJobs) setQuickJobs(JSON.parse(savedQuickJobs));
      setHasLoadedSuccessfully(true);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const saveData = () => {
    try {
      localStorage.setItem("financial-investments", JSON.stringify(investments));
      localStorage.setItem("financial-settings", JSON.stringify({ viewMode }));
      localStorage.setItem("financial-expenses", JSON.stringify(expenses));
      localStorage.setItem("financial-worklogs", JSON.stringify(workLogs));
      localStorage.setItem("financial-todos", JSON.stringify(todos));
      localStorage.setItem("financial-onetime", JSON.stringify(oneTimeIncomes));
      localStorage.setItem("financial-annual", JSON.stringify(annualIncomeCategories));
      localStorage.setItem("financial-archived-todos", JSON.stringify(archivedTodos));
      localStorage.setItem("financial-category-notes", JSON.stringify(categoryNotes));
      localStorage.setItem("financial-recurring", JSON.stringify(recurringExpenses));
      localStorage.setItem("financial-jobrates", JSON.stringify(jobRates));
      localStorage.setItem("financial-currentvalues", JSON.stringify(currentValues));
      localStorage.setItem("financial-achievements", JSON.stringify(unlockedAchievements));
      localStorage.setItem("financial-creditcards", JSON.stringify(creditCards));
      localStorage.setItem("financial-debitcards", JSON.stringify(debitCards));
      localStorage.setItem("financial-quickassets", JSON.stringify(quickAssets));
      localStorage.setItem("financial-quicksources", JSON.stringify(quickSources));
      localStorage.setItem("financial-quickjobs", JSON.stringify(quickJobs));
      setLastSaved(/* @__PURE__ */ new Date());
      setShowSaveIndicator(true);
      setTimeout(() => setShowSaveIndicator(false), 1500);
    } catch (error) {
      console.error("Failed to save:", error);
    }
  };
  const exportData = () => {
    const allData = {
      investments,
      expenses,
      workLogs,
      todos,
      oneTimeIncomes,
      annualIncomeCategories,
      archivedTodos,
      categoryNotes,
      recurringExpenses,
      jobRates,
      currentValues,
      unlockedAchievements,
      creditCards,
      debitCards,
      quickAssets,
      quickSources,
      quickJobs,
      settings: { viewMode },
      exportDate: (/* @__PURE__ */ new Date()).toISOString()
    };
    setBackupData(JSON.stringify(allData));
    setShowBackupModal(true);
  };
  const restoreFromText = () => {
    if (!restoreText.trim()) return;
    try {
      const data = JSON.parse(restoreText);
      if (data.investments) {
        data.investments.forEach((inv) => inv.date = new Date(inv.date));
        setInvestments(data.investments);
      }
      if (data.expenses) setExpenses(data.expenses);
      if (data.workLogs) setWorkLogs(data.workLogs);
      if (data.todos) setTodos(data.todos);
      if (data.oneTimeIncomes) setOneTimeIncomes(data.oneTimeIncomes);
      if (data.annualIncomeCategories) setAnnualIncomeCategories(data.annualIncomeCategories);
      if (data.archivedTodos) setArchivedTodos(data.archivedTodos);
      if (data.categoryNotes) setCategoryNotes(data.categoryNotes);
      if (data.recurringExpenses) setRecurringExpenses(data.recurringExpenses);
      if (data.jobRates) setJobRates(data.jobRates);
      if (data.currentValues) setCurrentValues(data.currentValues);
      if (data.unlockedAchievements) setUnlockedAchievements(data.unlockedAchievements);
      if (data.quickAssets) setQuickAssets(data.quickAssets);
      if (data.quickSources) setQuickSources(data.quickSources);
      if (data.quickJobs) setQuickJobs(data.quickJobs);
      setRestoreText("");
      setShowRestoreModal(false);
    } catch (error) {
      alert("Error: Invalid backup data");
    }
  };
  const clearAllData = () => {
    const keys = [
      "financial-investments",
      "financial-settings",
      "financial-expenses",
      "financial-worklogs",
      "financial-todos",
      "financial-onetime",
      "financial-annual",
      "financial-archived-todos",
      "financial-category-notes",
      "financial-recurring",
      "financial-jobrates",
      "financial-currentvalues",
      "financial-achievements",
      "financial-creditcards",
      "financial-debitcards",
      "financial-quickassets",
      "financial-quicksources",
      "financial-quickjobs"
    ];
    keys.forEach((k) => localStorage.removeItem(k));
    setInvestments([]);
    setExpenses([]);
    setWorkLogs([]);
    setTodos([]);
    setOneTimeIncomes([]);
    setAnnualIncomeCategories([]);
    setArchivedTodos([]);
    setCategoryNotes({ Subscriptions: "", Misc: "" });
    setRecurringExpenses([]);
    setJobRates({});
    setCurrentValues({});
    setUnlockedAchievements([]);
    setCreditCards([]);
    setDebitCards([]);
    setQuickAssets(["Morpho", "Mamo", "Btc"]);
    setQuickSources(["Salary", "Freelance", "Gift"]);
    setQuickJobs(["Main Job", "Side Gig", "Freelance"]);
    setViewMode("income");
    setShowClearConfirm(false);
  };
  const triggerShake = (fieldId) => {
    setShakeField(fieldId);
    setTimeout(() => setShakeField(null), 400);
  };
  const triggerPop = (totalId) => {
    setPopTotal(totalId);
    setTimeout(() => setPopTotal(null), 300);
  };
  const triggerSuccess = (buttonId) => {
    setSuccessButton(buttonId);
    setTimeout(() => setSuccessButton(null), 600);
  };
  const formatNumberInput = (value) => {
    const cleaned = value.replace(/[^0-9.]/g, "");
    const parts = cleaned.split(".");
    if (parts.length > 2) {
      return parts[0] + "." + parts.slice(1).join("");
    }
    if (parts[0]) {
      parts[0] = parseInt(parts[0], 10).toLocaleString();
    }
    return parts.join(".");
  };
  const parseFormattedNumber = (formatted) => {
    if (!formatted) return "";
    return formatted.replace(/,/g, "");
  };
  const tabOrder = ["income", "investments", "budget", "clockin", "todos", "trends"];
  const handleTouchStart = (e) => {
    if (contextMenu) {
      setContextMenu(null);
      return;
    }
    const target = e.target;
    const isInteractive = target.closest('button, input, textarea, select, a, [role="button"], .press-feedback, .touch-target');
    if (isInteractive) {
      touchStartRef.current = { x: 0, y: 0, cancelled: true };
      return;
    }
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      cancelled: false
    };
  };
  const handleTouchMove = (e) => {
    if (touchStartRef.current.cancelled) return;
    touchEndRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    };
  };
  const handleTouchEnd = () => {
    if (touchStartRef.current.cancelled || isTransitioning) {
      touchStartRef.current = { x: 0, y: 0, cancelled: false };
      touchEndRef.current = { x: 0, y: 0 };
      return;
    }
    const deltaX = touchEndRef.current.x - touchStartRef.current.x;
    const deltaY = touchEndRef.current.y - touchStartRef.current.y;
    if (Math.abs(deltaX) > 80 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
      const currentIndex = tabOrder.indexOf(viewMode);
      if (deltaX < 0 && currentIndex < tabOrder.length - 1) {
        setSwipeDirection("left");
        setIsTransitioning(true);
        setTimeout(() => {
          setViewMode(tabOrder[currentIndex + 1]);
          setSwipeDirection(null);
          setIsTransitioning(false);
        }, 300);
      } else if (deltaX > 0 && currentIndex > 0) {
        setSwipeDirection("right");
        setIsTransitioning(true);
        setTimeout(() => {
          setViewMode(tabOrder[currentIndex - 1]);
          setSwipeDirection(null);
          setIsTransitioning(false);
        }, 300);
      }
    }
    touchStartRef.current = { x: 0, y: 0, cancelled: false };
    touchEndRef.current = { x: 0, y: 0 };
  };
  const scheduleDelete = (type, item, restoreCallback) => {
    if (pendingDeletion?.timeoutId) {
      clearTimeout(pendingDeletion.timeoutId);
    }
    setShowUndoToast(true);
    const timeoutId = setTimeout(() => {
      setPendingDeletion(null);
      setShowUndoToast(false);
    }, 3500);
    setPendingDeletion({ type, item, timeoutId, restoreCallback });
  };
  const undoDelete = () => {
    if (pendingDeletion) {
      pendingDeletion.restoreCallback?.();
      if (pendingDeletion.timeoutId) {
        clearTimeout(pendingDeletion.timeoutId);
      }
    }
    setPendingDeletion(null);
    setShowUndoToast(false);
  };
  const longPressTriggeredRef = useRef(false);
  const handleLongPressStart = (e, type, item) => {
    const touch = e.touches ? e.touches[0] : e;
    const x = touch.clientX;
    const y = touch.clientY;
    longPressTriggeredRef.current = false;
    longPressTimerRef.current = setTimeout(() => {
      longPressTriggeredRef.current = true;
      setContextMenu({ type, item, x, y });
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
    }, 500);
  };
  const handleLongPressEnd = (e) => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
    if (longPressTriggeredRef.current) {
      e.preventDefault();
      e.stopPropagation();
      setTimeout(() => {
        longPressTriggeredRef.current = false;
      }, 100);
    }
  };
  const handleLongPressMove = (e) => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  };
  const handleContextMenuAction = (action) => {
    if (!contextMenu) return;
    const { type, item } = contextMenu;
    switch (action) {
      case "delete":
        if (type === "income") removeOneTimeIncome(item.id);
        else if (type === "investment") removeInvestment(item.id);
        else if (type === "expense") removeExpense(item.id);
        else if (type === "worklog") removeWorkLog(item.id);
        else if (type === "todo") deleteTodo(item.id);
        break;
      case "duplicate":
        if (type === "income") {
          const newItem = { ...item, id: Date.now(), date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0] };
          setOneTimeIncomes([newItem, ...oneTimeIncomes]);
        } else if (type === "expense") {
          const newItem = { ...item, id: Date.now(), date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0] };
          setExpenses([newItem, ...expenses]);
        } else if (type === "investment") {
          const newItem = { ...item, id: Date.now(), date: /* @__PURE__ */ new Date(), month: (/* @__PURE__ */ new Date()).getMonth(), year: (/* @__PURE__ */ new Date()).getFullYear() };
          setInvestments([newItem, ...investments]);
        } else if (type === "worklog") {
          const newItem = { ...item, id: Date.now(), date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0] };
          setWorkLogs([newItem, ...workLogs]);
        }
        break;
      case "edit":
        if (type === "income") {
          setOneTimeName(item.name);
          setOneTimeAmount(item.amount.toString());
          setOneTimeNotes(item.notes || "");
          setOneTimeDate(item.date);
          setOneTimeIncomes(oneTimeIncomes.filter((i) => i.id !== item.id));
        } else if (type === "expense") {
          setExpenseAmount(item.amount.toString());
          setExpenseCategory(item.category);
          setExpenseNotes(item.notes || "");
          setExpenseDate(item.date);
          setExpenses(expenses.filter((e) => e.id !== item.id));
        } else if (type === "investment") {
          setSelectedAsset(item.asset);
          setInvestAmount(item.amount.toString());
          setInvestQuantity(item.quantity?.toString() || "");
          setInvestType(item.type || "buy");
          setInvestMonth(item.month);
          setInvestYear(item.year);
          setInvestments(investments.filter((i) => i.id !== item.id));
        } else if (type === "worklog") {
          setWorkJob(item.job);
          setWorkHours(item.hours.toString());
          setWorkDescription(item.description || "");
          setWorkHourlyRate(item.hourlyRate?.toString() || "");
          setWorkDate(item.date);
          setWorkLogs(workLogs.filter((w) => w.id !== item.id));
        }
        break;
    }
    setContextMenu(null);
  };
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (longPressTriggeredRef.current) {
        return;
      }
      if (contextMenu) {
        const menuElement = document.querySelector(".context-menu");
        if (menuElement && menuElement.contains(e.target)) {
          return;
        }
        setContextMenu(null);
      }
    };
    const timer = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }, 50);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [contextMenu]);
  const captureAnalyticsScreenshot = async () => {
    if (!analyticsRef.current || isCapturing) return;
    setIsCapturing(true);
    try {
      if (!window.html2canvas) {
        await new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
      }
      await new Promise((r) => setTimeout(r, 100));
      const canvas = await window.html2canvas(analyticsRef.current, {
        backgroundColor: darkMode ? "#1A1625" : "#FFF5F8",
        scale: 2,
        // Higher quality
        useCORS: true,
        logging: false,
        windowWidth: analyticsRef.current.scrollWidth,
        windowHeight: analyticsRef.current.scrollHeight
      });
      const fullWidth = canvas.width;
      const fullHeight = canvas.height;
      const halfHeight = Math.floor(fullHeight / 2);
      const topCanvas = document.createElement("canvas");
      topCanvas.width = fullWidth;
      topCanvas.height = halfHeight;
      const topCtx = topCanvas.getContext("2d");
      topCtx.drawImage(canvas, 0, 0, fullWidth, halfHeight, 0, 0, fullWidth, halfHeight);
      const bottomCanvas = document.createElement("canvas");
      bottomCanvas.width = fullWidth;
      bottomCanvas.height = fullHeight - halfHeight;
      const bottomCtx = bottomCanvas.getContext("2d");
      bottomCtx.drawImage(canvas, 0, halfHeight, fullWidth, fullHeight - halfHeight, 0, 0, fullWidth, fullHeight - halfHeight);
      const topImage = topCanvas.toDataURL("image/png");
      const bottomImage = bottomCanvas.toDataURL("image/png");
      setScreenshotImage({ top: topImage, bottom: bottomImage });
      setShowScreenshotModal(true);
    } catch (error) {
      console.error("Screenshot failed:", error);
      alert("Screenshot failed. Please try again.");
    } finally {
      setIsCapturing(false);
    }
  };
  const animatedDelete = (id, deleteCallback) => {
    setDeletingItems((prev) => /* @__PURE__ */ new Set([...prev, id]));
    setTimeout(() => {
      deleteCallback();
      setDeletingItems((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 400);
  };
  const clearIncomeForm = () => {
    setOneTimeName("");
    setOneTimeAmount("");
    setOneTimeNotes("");
    const now = /* @__PURE__ */ new Date();
    setOneTimeDate(`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`);
    incomeNameRef.current?.focus();
  };
  const clearInvestmentForm = () => {
    setSelectedAsset("");
    setInvestAmount("");
    setInvestQuantity("");
    setInvestType("buy");
    investAssetRef.current?.focus();
  };
  const clearExpenseForm = () => {
    setExpenseAmount("");
    setExpenseCategory("Food");
    setExpenseDate((/* @__PURE__ */ new Date()).toISOString().split("T")[0]);
    setExpenseNotes("");
    expenseAmountRef.current?.focus();
  };
  const clearWorkForm = () => {
    setWorkHours("");
    setWorkDescription("");
    setWorkDate((/* @__PURE__ */ new Date()).toISOString().split("T")[0]);
    setClockInTime("");
    setClockOutTime("");
    workHoursRef.current?.focus();
  };
  const clearTodoForm = () => {
    setTodoText("");
    setTodoTime("");
    setTodoDate((/* @__PURE__ */ new Date()).toISOString().split("T")[0]);
    setTodoPriority("medium");
    setTodoLinkedExpense(null);
    todoTextRef.current?.focus();
  };
  const formatDateDisplay = (dateStr) => {
    const parts = dateStr.split("-");
    return `${monthNames[parseInt(parts[1]) - 1]} ${parseInt(parts[2])}, ${parts[0]}`;
  };
  const formatMoney = (amount) => {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
  };
  const addOneTimeIncome = () => {
    if (!oneTimeName.trim()) {
      triggerShake("income-name");
      return;
    }
    if (!oneTimeAmount) {
      triggerShake("income-amount");
      return;
    }
    const newId = Date.now();
    setOneTimeIncomes([...oneTimeIncomes, {
      id: newId,
      name: oneTimeName,
      amount: parseFloat(oneTimeAmount),
      date: oneTimeDate,
      notes: oneTimeNotes.trim() || null
    }]);
    setOneTimeName("");
    setOneTimeAmount("");
    setOneTimeNotes("");
    setNewItemId(newId);
    setTimeout(() => setNewItemId(null), 500);
    triggerPop("income-total");
    triggerSuccess("add-income");
    setTimeout(() => incomeNameRef.current?.focus(), 100);
  };
  const removeOneTimeIncome = (id) => {
    const item = oneTimeIncomes.find((i) => i.id === id);
    if (!item) return;
    setDeletingItems((prev) => /* @__PURE__ */ new Set([...prev, id]));
    setTimeout(() => {
      setOneTimeIncomes((prev) => prev.filter((i) => i.id !== id));
      setDeletingItems((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      scheduleDelete("income", item, () => {
        setOneTimeIncomes((prev) => [item, ...prev]);
      });
    }, 400);
  };
  const getUniqueOneTimeNames = () => [...new Set(oneTimeIncomes.map((i) => i.name))];
  const getOneTimeIncomesByNameForMonth = (name) => {
    return oneTimeIncomes.filter((income) => {
      const parts = income.date.split("-");
      return income.name === name && parseInt(parts[1]) - 1 === selectedIncomeMonth && parseInt(parts[0]) === selectedIncomeYear;
    }).sort((a, b) => b.date.localeCompare(a.date));
  };
  const getOneTimeTotalByNameForMonth = (name) => {
    return oneTimeIncomes.filter((income) => {
      const parts = income.date.split("-");
      return income.name === name && parseInt(parts[1]) - 1 === selectedIncomeMonth && parseInt(parts[0]) === selectedIncomeYear;
    }).reduce((sum, income) => sum + income.amount, 0);
  };
  const getTotalIncomeForMonth = () => {
    return oneTimeIncomes.filter((income) => {
      const parts = income.date.split("-");
      return parseInt(parts[1]) - 1 === selectedIncomeMonth && parseInt(parts[0]) === selectedIncomeYear;
    }).reduce((sum, i) => sum + i.amount, 0);
  };
  const calculateAnnualIncome = () => {
    const totals = {};
    getUniqueOneTimeNames().filter((name) => annualIncomeCategories.includes(name)).forEach((name) => {
      totals[name] = oneTimeIncomes.filter((i) => i.name === name).reduce((sum, i) => sum + i.amount, 0);
    });
    return Object.values(totals).reduce((sum, val) => sum + val, 0);
  };
  const CARD_COLORS = [
    { emoji: "\u{1F4B3}", bg: "from-violet-500 to-purple-600", light: "bg-violet-100", dark: "bg-violet-900/30" },
    { emoji: "\u{1F4B3}", bg: "from-blue-500 to-cyan-600", light: "bg-blue-100", dark: "bg-blue-900/30" },
    { emoji: "\u{1F4B3}", bg: "from-emerald-500 to-teal-600", light: "bg-emerald-100", dark: "bg-emerald-900/30" },
    { emoji: "\u{1F4B3}", bg: "from-rose-500 to-pink-600", light: "bg-rose-100", dark: "bg-rose-900/30" },
    { emoji: "\u{1F4B3}", bg: "from-amber-500 to-orange-600", light: "bg-amber-100", dark: "bg-amber-900/30" },
    { emoji: "\u{1F4B3}", bg: "from-indigo-500 to-blue-600", light: "bg-indigo-100", dark: "bg-indigo-900/30" }
  ];
  const addCreditCard = () => {
    if (!newCardName.trim()) return;
    if (!newCardBalance) return;
    const newCard = {
      id: Date.now(),
      name: newCardName,
      balance: parseFloat(newCardBalance) || 0,
      creditLimit: parseFloat(newCardLimit) || 0,
      apr: parseFloat(newCardAPR) || 0,
      minPayment: parseFloat(newCardMinPayment) || 0,
      dueDay: parseInt(newCardDueDay) || 15,
      colorIndex: creditCards.length % CARD_COLORS.length,
      payments: [],
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    setCreditCards([...creditCards, newCard]);
    setNewCardName("");
    setNewCardBalance("");
    setNewCardLimit("");
    setNewCardAPR("");
    setNewCardMinPayment("");
    setNewCardDueDay("15");
    setShowAddCardModal(false);
  };
  const removeCreditCard = (id) => {
    animatedDelete(id, () => setCreditCards(creditCards.filter((c) => c.id !== id)));
  };
  const makeCardPayment = (cardId) => {
    if (!paymentAmount || parseFloat(paymentAmount) <= 0) return;
    setCreditCards(creditCards.map((card) => {
      if (card.id === cardId) {
        const payment = {
          id: Date.now(),
          amount: parseFloat(paymentAmount),
          date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
        };
        return {
          ...card,
          balance: Math.max(0, card.balance - parseFloat(paymentAmount)),
          payments: [...card.payments || [], payment]
        };
      }
      return card;
    }));
    setPaymentAmount("");
    setShowPaymentModal(null);
  };
  const updateCardBalance = (cardId, newBalance) => {
    setCreditCards(creditCards.map(
      (card) => card.id === cardId ? { ...card, balance: parseFloat(newBalance) || 0 } : card
    ));
  };
  const getCardDueDate = (card) => {
    const now = /* @__PURE__ */ new Date();
    let dueDate = new Date(now.getFullYear(), now.getMonth(), card.dueDay);
    if (dueDate < now) {
      dueDate = new Date(now.getFullYear(), now.getMonth() + 1, card.dueDay);
    }
    const daysUntil = Math.ceil((dueDate - now) / (1e3 * 60 * 60 * 24));
    return { dueDate, daysUntil };
  };
  const calculatePayoffDate = (card) => {
    if (card.balance <= 0) return null;
    if (card.minPayment <= 0) return null;
    const monthlyRate = card.apr / 100 / 12;
    let balance = card.balance;
    let months = 0;
    const maxMonths = 360;
    while (balance > 0 && months < maxMonths) {
      const interest = balance * monthlyRate;
      balance = balance + interest - card.minPayment;
      months++;
      if (balance < 0) balance = 0;
    }
    if (months >= maxMonths) return { months: -1, message: "Will take 30+ years" };
    const payoffDate = /* @__PURE__ */ new Date();
    payoffDate.setMonth(payoffDate.getMonth() + months);
    return {
      months,
      date: payoffDate,
      message: months === 1 ? "1 month" : `${months} months`
    };
  };
  const getTotalDebt = () => creditCards.reduce((sum, card) => sum + card.balance, 0);
  const getTotalCreditLimit = () => creditCards.reduce((sum, card) => sum + (card.creditLimit || 0), 0);
  const getOverallUtilization = () => {
    const totalLimit = getTotalCreditLimit();
    if (totalLimit <= 0) return 0;
    return getTotalDebt() / totalLimit * 100;
  };
  const DEBIT_COLORS = [
    { bg: "from-green-500 to-emerald-600", light: "bg-green-100", dark: "bg-green-900/30" },
    { bg: "from-teal-500 to-cyan-600", light: "bg-teal-100", dark: "bg-teal-900/30" },
    { bg: "from-lime-500 to-green-600", light: "bg-lime-100", dark: "bg-lime-900/30" },
    { bg: "from-cyan-500 to-blue-600", light: "bg-cyan-100", dark: "bg-cyan-900/30" }
  ];
  const addDebitCard = () => {
    if (!newCardName.trim()) return;
    const newCard = {
      id: Date.now(),
      name: newCardName,
      balance: parseFloat(newCardBalance) || 0,
      colorIndex: debitCards.length % DEBIT_COLORS.length,
      transactions: [],
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    setDebitCards([...debitCards, newCard]);
    setNewCardName("");
    setNewCardBalance("");
    setShowAddCardModal(false);
    setAddCardType("credit");
  };
  const removeDebitCard = (id) => {
    animatedDelete(id, () => setDebitCards(debitCards.filter((c) => c.id !== id)));
  };
  const makeDebitDeposit = (cardId) => {
    if (!depositAmount || parseFloat(depositAmount) <= 0) return;
    setDebitCards(debitCards.map((card) => {
      if (card.id === cardId) {
        const transaction = {
          id: Date.now(),
          type: "deposit",
          amount: parseFloat(depositAmount),
          date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
        };
        return {
          ...card,
          balance: card.balance + parseFloat(depositAmount),
          transactions: [...card.transactions || [], transaction]
        };
      }
      return card;
    }));
    setDepositAmount("");
    setShowDepositModal(null);
  };
  const makeDebitWithdrawal = (cardId, amount) => {
    if (!amount || parseFloat(amount) <= 0) return;
    setDebitCards(debitCards.map((card) => {
      if (card.id === cardId) {
        const transaction = {
          id: Date.now(),
          type: "withdrawal",
          amount: parseFloat(amount),
          date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
        };
        return {
          ...card,
          balance: Math.max(0, card.balance - parseFloat(amount)),
          transactions: [...card.transactions || [], transaction]
        };
      }
      return card;
    }));
  };
  const getTotalCheckingBalance = () => debitCards.reduce((sum, card) => sum + card.balance, 0);
  const addInvestment = () => {
    if (!selectedAsset) {
      triggerShake("invest-asset");
      return;
    }
    if (!investAmount) {
      triggerShake("invest-amount");
      return;
    }
    if (investType === "sell" && investQuantity) {
      const holdings = getAssetHoldings(selectedAsset);
      if (parseFloat(investQuantity) > holdings.totalQuantity) {
        triggerShake("invest-quantity");
        return;
      }
    }
    setInvestments([...investments, {
      id: Date.now(),
      asset: selectedAsset,
      amount: parseFloat(investAmount),
      quantity: investQuantity ? parseFloat(investQuantity) : null,
      type: investType,
      // 'buy' or 'sell'
      month: investMonth,
      year: investYear,
      date: /* @__PURE__ */ new Date()
    }]);
    setInvestAmount("");
    setInvestQuantity("");
    triggerPop("invest-total");
    triggerSuccess("add-investment");
    setTimeout(() => investAssetRef.current?.focus(), 100);
  };
  const removeInvestment = (id) => {
    const item = investments.find((i) => i.id === id);
    if (!item) return;
    setDeletingItems((prev) => /* @__PURE__ */ new Set([...prev, id]));
    setTimeout(() => {
      setInvestments((prev) => prev.filter((i) => i.id !== id));
      setDeletingItems((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      scheduleDelete("investment", item, () => {
        setInvestments((prev) => [item, ...prev]);
      });
    }, 400);
  };
  const uniqueAssets = [...new Set(investments.map((i) => i.asset))];
  const getTotalInvested = () => investments.reduce((sum, i) => {
    if (i.type === "sell") return sum - i.amount;
    return sum + i.amount;
  }, 0);
  const getTotalBuys = () => investments.filter((i) => i.type !== "sell").reduce((sum, i) => sum + i.amount, 0);
  const getTotalSells = () => investments.filter((i) => i.type === "sell").reduce((sum, i) => sum + i.amount, 0);
  const getAssetHoldings = (asset) => {
    const assetInvestments = investments.filter((i) => i.asset === asset);
    let trackedQuantity = 0;
    let trackedCost = 0;
    let untrackedCost = 0;
    let realizedPnL = 0;
    let hasTracked = false;
    let hasUntracked = false;
    assetInvestments.forEach((inv) => {
      if (inv.type === "sell") {
        if (inv.quantity && trackedQuantity > 0) {
          const avgCostPerUnit = trackedCost / trackedQuantity;
          const costBasis = avgCostPerUnit * inv.quantity;
          realizedPnL += inv.amount - costBasis;
          trackedQuantity -= inv.quantity;
          trackedCost -= costBasis;
          hasTracked = true;
        } else if (inv.quantity) {
          untrackedCost -= inv.amount;
        } else {
          if (untrackedCost > 0) {
            untrackedCost -= Math.min(untrackedCost, inv.amount);
          } else {
            trackedCost -= inv.amount;
          }
        }
      } else {
        if (inv.quantity && inv.quantity > 0) {
          trackedQuantity += inv.quantity;
          trackedCost += inv.amount;
          hasTracked = true;
        } else {
          untrackedCost += inv.amount;
          hasUntracked = true;
        }
      }
    });
    const avgPrice = trackedQuantity > 0 ? trackedCost / trackedQuantity : 0;
    const currentPrice = currentValues[asset] || 0;
    const currentValue = trackedQuantity > 0 ? trackedQuantity * currentPrice : 0;
    const unrealizedPnL = currentPrice > 0 && trackedQuantity > 0 ? currentValue - trackedCost : 0;
    const totalCost = Math.max(0, trackedCost) + Math.max(0, untrackedCost);
    return {
      totalQuantity: Math.max(0, trackedQuantity),
      totalCost,
      trackedCost: Math.max(0, trackedCost),
      untrackedCost: Math.max(0, untrackedCost),
      avgPrice,
      currentPrice,
      currentValue,
      unrealizedPnL,
      realizedPnL,
      hasMixedEntries: hasTracked && hasUntracked,
      // Flag for UI warning
      hasTrackedHoldings: hasTracked && trackedQuantity > 0
    };
  };
  const getTotalPnL = () => {
    let totalRealized = 0;
    let totalUnrealized = 0;
    let anyMixedEntries = false;
    let anyTrackedHoldings = false;
    uniqueAssets.forEach((asset) => {
      const holdings = getAssetHoldings(asset);
      totalRealized += holdings.realizedPnL;
      totalUnrealized += holdings.unrealizedPnL;
      if (holdings.hasMixedEntries) anyMixedEntries = true;
      if (holdings.hasTrackedHoldings) anyTrackedHoldings = true;
    });
    return {
      realized: totalRealized,
      unrealized: totalUnrealized,
      total: totalRealized + totalUnrealized,
      hasMixedEntries: anyMixedEntries,
      hasTrackedHoldings: anyTrackedHoldings
    };
  };
  const getInvestmentHistory = (asset) => {
    return investments.filter((inv) => inv.asset === asset).sort((a, b) => b.date - a.date);
  };
  const getPieChartData = () => {
    return uniqueAssets.map((asset) => {
      const holdings = getAssetHoldings(asset);
      return {
        name: asset,
        value: Math.max(0, holdings.totalCost)
        // Only show positive holdings
      };
    }).filter((item) => item.value > 0);
  };
  const getMonthlyInvestments = (year) => {
    const monthlyData = {};
    for (let m = 0; m < 12; m++) {
      monthlyData[m] = { buys: 0, sells: 0 };
    }
    investments.forEach((inv) => {
      const invDate = new Date(inv.date);
      if (invDate.getFullYear() === year) {
        const month = invDate.getMonth();
        if (inv.type === "sell") {
          monthlyData[month].sells += inv.amount;
        } else {
          monthlyData[month].buys += inv.amount;
        }
      }
    });
    return monthlyData;
  };
  const addExpense = () => {
    if (!expenseAmount) {
      triggerShake("expense-amount");
      return;
    }
    const newId = Date.now();
    setExpenses([...expenses, {
      id: newId,
      amount: parseFloat(expenseAmount),
      category: expenseCategory,
      date: expenseDate,
      notes: expenseNotes.trim() || null
    }]);
    setExpenseAmount("");
    setExpenseNotes("");
    setNewItemId(newId);
    setTimeout(() => setNewItemId(null), 500);
    triggerPop("expense-total");
    triggerSuccess("add-expense");
    setTimeout(() => expenseAmountRef.current?.focus(), 100);
  };
  const removeExpense = (id) => {
    const item = expenses.find((e) => e.id === id);
    if (!item) return;
    setDeletingItems((prev) => /* @__PURE__ */ new Set([...prev, id]));
    setTimeout(() => {
      setExpenses((prev) => prev.filter((e) => e.id !== id));
      setDeletingItems((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      scheduleDelete("expense", item, () => {
        setExpenses((prev) => [item, ...prev]);
      });
    }, 400);
  };
  const getCategoryTotal = (category) => {
    return expenses.filter((exp) => {
      if (exp.category !== category) return false;
      const parts = exp.date.split("-");
      return parseInt(parts[1]) - 1 === selectedBudgetMonth && parseInt(parts[0]) === selectedBudgetYear;
    }).reduce((sum, exp) => sum + exp.amount, 0);
  };
  const getTotalExpensesForMonth = () => {
    return expenses.filter((exp) => {
      const parts = exp.date.split("-");
      return parseInt(parts[1]) - 1 === selectedBudgetMonth && parseInt(parts[0]) === selectedBudgetYear;
    }).reduce((sum, exp) => sum + exp.amount, 0);
  };
  const getRecentExpenses = () => {
    return [...expenses].filter((exp) => {
      const parts = exp.date.split("-");
      return parseInt(parts[1]) - 1 === selectedBudgetMonth && parseInt(parts[0]) === selectedBudgetYear;
    }).sort((a, b) => b.date.localeCompare(a.date)).slice(0, 15);
  };
  const getBudgetPieData = () => {
    return EXPENSE_CATEGORIES.map((cat) => ({
      name: cat,
      value: getCategoryTotal(cat)
    })).filter((item) => item.value > 0);
  };
  const addRecurringExpense = () => {
    if (!newRecurringName.trim() || !newRecurringAmount) return;
    setRecurringExpenses([...recurringExpenses, {
      id: Date.now(),
      name: newRecurringName,
      amount: parseFloat(newRecurringAmount),
      category: newRecurringCategory,
      dayOfMonth: parseInt(newRecurringDay)
    }]);
    setNewRecurringName("");
    setNewRecurringAmount("");
    setShowRecurringModal(false);
  };
  const removeRecurringExpense = (id) => setRecurringExpenses(recurringExpenses.filter((r) => r.id !== id));
  const getUpcomingBills = () => {
    const today = /* @__PURE__ */ new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    return recurringExpenses.map((recurring) => {
      let dueDate = new Date(currentYear, currentMonth, recurring.dayOfMonth);
      if (recurring.dayOfMonth < currentDay) {
        dueDate = new Date(currentYear, currentMonth + 1, recurring.dayOfMonth);
      }
      const daysUntilDue = Math.ceil((dueDate - today) / (1e3 * 60 * 60 * 24));
      const isOverdue = daysUntilDue < 0;
      const isDueSoon = daysUntilDue >= 0 && daysUntilDue <= 7;
      return {
        ...recurring,
        dueDate,
        daysUntilDue,
        isOverdue,
        isDueSoon
      };
    }).filter((bill) => bill.isOverdue || bill.isDueSoon).sort((a, b) => a.daysUntilDue - b.daysUntilDue);
  };
  const applyRecurringExpenses = () => {
    const now = /* @__PURE__ */ new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const newExpenses = recurringExpenses.map((recurring) => ({
      id: Date.now() + Math.random(),
      amount: recurring.amount,
      category: recurring.category,
      date: `${year}-${month}-${String(recurring.dayOfMonth).padStart(2, "0")}`,
      recurringName: recurring.name
    }));
    setExpenses([...expenses, ...newExpenses]);
  };
  const calculateHoursFromTimes = (clockIn, clockOut) => {
    if (!clockIn || !clockOut) return 0;
    const [inH, inM] = clockIn.split(":").map(Number);
    const [outH, outM] = clockOut.split(":").map(Number);
    let inMinutes = inH * 60 + inM;
    let outMinutes = outH * 60 + outM;
    if (outMinutes < inMinutes) outMinutes += 24 * 60;
    return Math.round((outMinutes - inMinutes) / 60 * 100) / 100;
  };
  const getYesterdayWorkLog = () => {
    const yesterday = /* @__PURE__ */ new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];
    return workLogs.find((log) => log.date === yesterdayStr);
  };
  const fillFromYesterday = () => {
    const yesterdayLog = getYesterdayWorkLog();
    if (yesterdayLog) {
      setWorkJob(yesterdayLog.job);
      setWorkDescription(yesterdayLog.description);
      setWorkHours(String(yesterdayLog.hours));
      if (yesterdayLog.hourlyRate) setWorkHourlyRate(String(yesterdayLog.hourlyRate));
    }
  };
  const addWorkLog = () => {
    let hours = 0;
    if (workMode === "clock") {
      if (!clockInTime) {
        triggerShake("clock-in");
        return;
      }
      if (!clockOutTime) {
        triggerShake("clock-out");
        return;
      }
      hours = calculateHoursFromTimes(clockInTime, clockOutTime);
      if (hours <= 0) {
        triggerShake("clock-out");
        return;
      }
    } else {
      if (!workHours) {
        triggerShake("work-hours");
        return;
      }
      hours = parseFloat(workHours);
    }
    if (!workJob) {
      triggerShake("work-job");
      return;
    }
    if (!workDescription) {
      triggerShake("work-desc");
      return;
    }
    const rate = workHourlyRate ? parseFloat(workHourlyRate) : jobRates[workJob] || 0;
    setWorkLogs([...workLogs, {
      id: Date.now(),
      hours,
      job: workJob,
      description: workDescription,
      date: workDate,
      hourlyRate: rate,
      clockIn: workMode === "clock" ? clockInTime : null,
      clockOut: workMode === "clock" ? clockOutTime : null
    }]);
    if (workHourlyRate && parseFloat(workHourlyRate) > 0) {
      setJobRates({ ...jobRates, [workJob]: parseFloat(workHourlyRate) });
    }
    setWorkHours("");
    setWorkJob("");
    setWorkDescription("");
    setWorkHourlyRate("");
    setClockInTime("");
    setClockOutTime("");
    triggerPop("work-total");
    triggerSuccess("add-work");
    setTimeout(() => workHoursRef.current?.focus(), 100);
  };
  const removeWorkLog = (id) => {
    const item = workLogs.find((l) => l.id === id);
    if (!item) return;
    setDeletingItems((prev) => /* @__PURE__ */ new Set([...prev, id]));
    setTimeout(() => {
      setWorkLogs((prev) => prev.filter((l) => l.id !== id));
      setDeletingItems((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      scheduleDelete("worklog", item, () => {
        setWorkLogs((prev) => [item, ...prev]);
      });
    }, 400);
  };
  const getUniqueJobs = () => [...new Set(workLogs.map((l) => l.job))];
  const getJobHoursThisMonth = (job) => {
    return workLogs.filter((log) => {
      const parts = log.date.split("-");
      return log.job === job && parseInt(parts[1]) - 1 === selectedWorkMonth && parseInt(parts[0]) === selectedWorkYear;
    }).reduce((sum, log) => sum + log.hours, 0);
  };
  const getTotalHoursThisMonth = () => {
    return workLogs.filter((log) => {
      const parts = log.date.split("-");
      return parseInt(parts[1]) - 1 === selectedWorkMonth && parseInt(parts[0]) === selectedWorkYear;
    }).reduce((sum, log) => sum + log.hours, 0);
  };
  const getTotalEarningsThisMonth = () => {
    return workLogs.filter((log) => {
      const parts = log.date.split("-");
      return parseInt(parts[1]) - 1 === selectedWorkMonth && parseInt(parts[0]) === selectedWorkYear;
    }).reduce((sum, log) => sum + log.hours * (log.hourlyRate || 0), 0);
  };
  const getJobLogs = (job) => {
    return workLogs.filter((log) => {
      const parts = log.date.split("-");
      return log.job === job && parseInt(parts[1]) - 1 === selectedWorkMonth && parseInt(parts[0]) === selectedWorkYear;
    }).sort((a, b) => b.date.localeCompare(a.date));
  };
  const addTodo = () => {
    if (!todoText.trim()) {
      triggerShake("todo-text");
      return;
    }
    const newId = Date.now();
    setTodos([...todos, {
      id: newId,
      text: todoText,
      date: todoDate,
      time: todoTime,
      completed: false,
      priority: todoPriority,
      linkedExpense: todoLinkedExpense,
      subtasks: []
    }]);
    setTodoText("");
    setTodoTime("");
    setTodoPriority("medium");
    setTodoLinkedExpense(null);
    setNewItemId(newId);
    setTimeout(() => setNewItemId(null), 500);
    triggerSuccess("add-todo");
    setTimeout(() => todoTextRef.current?.focus(), 100);
  };
  const toggleTodo = (todoId) => {
    const todo = todos.find((t) => t.id === todoId);
    if (todo && !todo.completed && todo.linkedExpense) {
      const newExpenseId = Date.now();
      setExpenses([...expenses, {
        id: newExpenseId,
        amount: todo.linkedExpense.amount,
        category: todo.linkedExpense.category,
        date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
        notes: `From task: ${todo.text}`
      }]);
      triggerPop("expense-total");
    }
    setTodos(todos.map(
      (t) => t.id === todoId ? { ...t, completed: !t.completed } : t
    ));
  };
  const removeTodo = (id) => {
    animatedDelete(id, () => setTodos(todos.filter((t) => t.id !== id)));
  };
  const addSubtask = (todoId) => {
    if (!subtaskText.trim()) return;
    setTodos(todos.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, subtasks: [...todo.subtasks, { id: Date.now(), text: subtaskText, completed: false }] };
      }
      return todo;
    }));
    setSubtaskText("");
    setAddingSubtaskFor(null);
  };
  const toggleSubtask = (todoId, subtaskId) => {
    setTodos(todos.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          subtasks: todo.subtasks.map(
            (sub) => sub.id === subtaskId ? { ...sub, completed: !sub.completed } : sub
          )
        };
      }
      return todo;
    }));
  };
  const removeSubtask = (todoId, subtaskId) => {
    setTodos(todos.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, subtasks: todo.subtasks.filter((sub) => sub.id !== subtaskId) };
      }
      return todo;
    }));
  };
  const archiveSingleTask = (taskId) => {
    const task = todos.find((t) => t.id === taskId);
    if (!task) return;
    const existingIndex = archivedTodos.findIndex((a) => a.date === task.date);
    if (existingIndex >= 0) {
      const updated = [...archivedTodos];
      updated[existingIndex].todos.push(task);
      setArchivedTodos(updated);
    } else {
      setArchivedTodos([...archivedTodos, { date: task.date, archivedOn: (/* @__PURE__ */ new Date()).toISOString(), todos: [task] }]);
    }
    setTodos(todos.filter((t) => t.id !== taskId));
  };
  const archiveAllCompleted = () => {
    const completed = todos.filter((t) => t.completed);
    if (completed.length === 0) return;
    const byDate = {};
    completed.forEach((task) => {
      if (!byDate[task.date]) byDate[task.date] = [];
      byDate[task.date].push(task);
    });
    const newArchives = [...archivedTodos];
    Object.keys(byDate).forEach((date) => {
      const existingIndex = newArchives.findIndex((a) => a.date === date);
      if (existingIndex >= 0) {
        newArchives[existingIndex].todos.push(...byDate[date]);
      } else {
        newArchives.push({ date, archivedOn: (/* @__PURE__ */ new Date()).toISOString(), todos: byDate[date] });
      }
    });
    setArchivedTodos(newArchives);
    setTodos(todos.filter((t) => !t.completed));
  };
  const getTodosByDate = () => [...todos].sort((a, b) => a.date.localeCompare(b.date));
  const getTodoStats = () => {
    const todayStr = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    const completed = todos.filter((t) => t.completed).length;
    const pending = todos.filter((t) => !t.completed && t.date >= todayStr).length;
    const overdue = todos.filter((t) => !t.completed && t.date < todayStr).length;
    return { completed, pending, overdue, total: todos.length };
  };
  const getMonthsInRange = () => {
    const months = [];
    let current = { ...trendsStartMonth };
    const end = trendsEndMonth;
    while (current.year < end.year || current.year === end.year && current.month <= end.month) {
      months.push({ ...current, label: `${monthNames[current.month]} ${current.year}` });
      current.month++;
      if (current.month > 11) {
        current.month = 0;
        current.year++;
      }
    }
    return months;
  };
  const getMonthlyExpenseTotals = () => {
    return getMonthsInRange().map((m) => {
      const total = expenses.filter((exp) => {
        const parts = exp.date.split("-");
        return parseInt(parts[1]) - 1 === m.month && parseInt(parts[0]) === m.year;
      }).reduce((sum, exp) => sum + exp.amount, 0);
      return { ...m, total };
    });
  };
  const getMonthlyIncomeTotals = () => {
    return getMonthsInRange().map((m) => {
      const total = oneTimeIncomes.filter((inc) => {
        const parts = inc.date.split("-");
        return parseInt(parts[1]) - 1 === m.month && parseInt(parts[0]) === m.year;
      }).reduce((sum, inc) => sum + inc.amount, 0);
      return { ...m, total };
    });
  };
  const getMonthlyInvestmentTotals = () => {
    return getMonthsInRange().map((m) => {
      const monthInvestments = investments.filter((inv) => inv.month === m.month && inv.year === m.year);
      const buys = monthInvestments.filter((i) => i.type !== "sell").reduce((sum, i) => sum + i.amount, 0);
      const sells = monthInvestments.filter((i) => i.type === "sell").reduce((sum, i) => sum + i.amount, 0);
      const net = buys - sells;
      return { ...m, buys, sells, net };
    });
  };
  const getMonthlyHoursWorked = () => {
    return getMonthsInRange().map((m) => {
      const hours = workLogs.filter((log) => {
        const parts = log.date.split("-");
        return parseInt(parts[1]) - 1 === m.month && parseInt(parts[0]) === m.year;
      }).reduce((sum, log) => sum + log.hours, 0);
      const earnings = workLogs.filter((log) => {
        const parts = log.date.split("-");
        return parseInt(parts[1]) - 1 === m.month && parseInt(parts[0]) === m.year;
      }).reduce((sum, log) => sum + log.hours * (log.hourlyRate || 0), 0);
      return { ...m, hours, earnings };
    });
  };
  const getTrendsData = () => {
    const months = getMonthsInRange();
    return months.map((m) => {
      const income = oneTimeIncomes.filter((inc) => {
        const parts = inc.date.split("-");
        return parseInt(parts[1]) - 1 === m.month && parseInt(parts[0]) === m.year;
      }).reduce((sum, inc) => sum + inc.amount, 0);
      const expenses_total = expenses.filter((exp) => {
        const parts = exp.date.split("-");
        return parseInt(parts[1]) - 1 === m.month && parseInt(parts[0]) === m.year;
      }).reduce((sum, exp) => sum + exp.amount, 0);
      return {
        name: m.label,
        income,
        expenses: expenses_total,
        net: income - expenses_total
      };
    });
  };
  const getHoursWorkedData = () => {
    return getMonthlyHoursWorked();
  };
  const getCategoryBreakdownByMonth = () => {
    return getMonthsInRange().map((m) => {
      const data = { ...m };
      EXPENSE_CATEGORIES.forEach((cat) => {
        data[cat] = expenses.filter((exp) => {
          const parts = exp.date.split("-");
          return exp.category === cat && parseInt(parts[1]) - 1 === m.month && parseInt(parts[0]) === m.year;
        }).reduce((sum, exp) => sum + exp.amount, 0);
      });
      return data;
    });
  };
  const getCurrentNetWorth = () => {
    const checkingBalance = getTotalCheckingBalance();
    const investmentValue = uniqueAssets.reduce((sum, asset) => {
      const holdings = getAssetHoldings(asset);
      const currentPrice = currentValues[asset] || (holdings.totalQuantity > 0 ? holdings.totalCost / holdings.totalQuantity : 0);
      return sum + holdings.totalQuantity * currentPrice;
    }, 0);
    const totalDebt = getTotalDebt();
    return {
      checking: checkingBalance,
      investments: investmentValue,
      totalAssets: checkingBalance + investmentValue,
      debt: totalDebt,
      netWorth: checkingBalance + investmentValue - totalDebt
    };
  };
  const getMonthlyNetWorth = () => {
    return getMonthsInRange().map((m) => {
      const investmentsUpToMonth = investments.filter(
        (inv) => inv.year < m.year || inv.year === m.year && inv.month <= m.month
      );
      const assetHoldings = {};
      investmentsUpToMonth.forEach((inv) => {
        if (!assetHoldings[inv.asset]) {
          assetHoldings[inv.asset] = { quantity: 0, amount: 0 };
        }
        if (inv.type === "sell") {
          assetHoldings[inv.asset].quantity -= inv.quantity || 0;
          assetHoldings[inv.asset].amount -= inv.amount;
        } else {
          assetHoldings[inv.asset].quantity += inv.quantity || 0;
          assetHoldings[inv.asset].amount += inv.amount;
        }
      });
      const investmentValue = Object.values(assetHoldings).reduce((sum, h) => sum + Math.max(0, h.amount), 0);
      const checkingBalance = getTotalCheckingBalance();
      const debtBalance = getTotalDebt();
      const netWorth = checkingBalance + investmentValue - debtBalance;
      return {
        ...m,
        checking: checkingBalance,
        investments: investmentValue,
        debt: debtBalance,
        netWorth
      };
    });
  };
  const getSmartInsights = () => {
    const insights = [];
    const now = /* @__PURE__ */ new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const currentDay = now.getDate();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysElapsed = currentDay;
    const daysRemaining = daysInMonth - currentDay;
    const thisMonthExpenses = expenses.filter((exp) => {
      const parts = exp.date.split("-");
      return parseInt(parts[1]) - 1 === currentMonth && parseInt(parts[0]) === currentYear;
    });
    const thisMonthIncome = oneTimeIncomes.filter((inc) => {
      const parts = inc.date.split("-");
      return parseInt(parts[1]) - 1 === currentMonth && parseInt(parts[0]) === currentYear;
    });
    const totalExpensesThisMonth = thisMonthExpenses.reduce((sum, e) => sum + e.amount, 0);
    const totalIncomeThisMonth = thisMonthIncome.reduce((sum, i) => sum + i.amount, 0);
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    const lastMonthExpenses = expenses.filter((exp) => {
      const parts = exp.date.split("-");
      return parseInt(parts[1]) - 1 === lastMonth && parseInt(parts[0]) === lastMonthYear;
    });
    const lastMonthIncome = oneTimeIncomes.filter((inc) => {
      const parts = inc.date.split("-");
      return parseInt(parts[1]) - 1 === lastMonth && parseInt(parts[0]) === lastMonthYear;
    });
    const totalExpensesLastMonth = lastMonthExpenses.reduce((sum, e) => sum + e.amount, 0);
    const totalIncomeLastMonth = lastMonthIncome.reduce((sum, i) => sum + i.amount, 0);
    const netIncome = totalIncomeThisMonth - totalExpensesThisMonth;
    const savingsRate = totalIncomeThisMonth > 0 ? netIncome / totalIncomeThisMonth * 100 : 0;
    if (totalIncomeThisMonth > 0 || totalExpensesThisMonth > 0) {
      if (netIncome >= 0) {
        insights.push({
          type: "positive",
          icon: "\u{1F4B0}",
          title: "Net Income",
          message: `You're ${savingsRate >= 20 ? "saving strong" : "in the green"} this month!`,
          detail: `+${formatMoney(netIncome)} net (${savingsRate.toFixed(0)}% savings rate)`,
          priority: savingsRate >= 20 ? 1 : 2
        });
      } else {
        insights.push({
          type: "warning",
          icon: "\u26A0\uFE0F",
          title: "Overspending",
          message: `You're spending more than you're earning this month.`,
          detail: `${formatMoney(netIncome)} net - consider reducing expenses`,
          priority: 1
        });
      }
    }
    if (daysElapsed >= 5 && totalExpensesThisMonth > 0) {
      const dailyAvgExpense = totalExpensesThisMonth / daysElapsed;
      const projectedExpenses = dailyAvgExpense * daysInMonth;
      const projectedRemaining = dailyAvgExpense * daysRemaining;
      const projectedIncome = totalIncomeThisMonth;
      const projectedNet = projectedIncome - projectedExpenses;
      insights.push({
        type: projectedNet >= 0 ? "info" : "warning",
        icon: "\u{1F4C5}",
        title: "Month-End Projection",
        message: `At current pace, you'll spend ~${formatMoney(projectedExpenses)} this month.`,
        detail: `~${formatMoney(projectedRemaining)} more in remaining ${daysRemaining} days`,
        priority: 2
      });
    }
    EXPENSE_CATEGORIES.forEach((category) => {
      const thisMonthCat = thisMonthExpenses.filter((e) => e.category === category).reduce((sum, e) => sum + e.amount, 0);
      const lastMonthCat = lastMonthExpenses.filter((e) => e.category === category).reduce((sum, e) => sum + e.amount, 0);
      if (lastMonthCat > 0 && thisMonthCat > 0) {
        const percentChange = (thisMonthCat - lastMonthCat) / lastMonthCat * 100;
        if (percentChange >= 30) {
          insights.push({
            type: "warning",
            icon: CATEGORY_STYLES[category]?.icon || "\u{1F4E6}",
            title: `${category} Up`,
            message: `${category} spending is up ${percentChange.toFixed(0)}% from last month.`,
            detail: `${formatMoney(lastMonthCat)} \u2192 ${formatMoney(thisMonthCat)}`,
            priority: 3
          });
        } else if (percentChange <= -30) {
          insights.push({
            type: "positive",
            icon: CATEGORY_STYLES[category]?.icon || "\u{1F4E6}",
            title: `${category} Down`,
            message: `Great job! ${category} spending is down ${Math.abs(percentChange).toFixed(0)}%.`,
            detail: `${formatMoney(lastMonthCat)} \u2192 ${formatMoney(thisMonthCat)}`,
            priority: 3
          });
        }
      }
    });
    if (daysElapsed >= 3 && totalExpensesThisMonth > 0) {
      const dailyAvg = totalExpensesThisMonth / daysElapsed;
      const lastMonthDailyAvg = totalExpensesLastMonth / daysInMonth;
      if (lastMonthDailyAvg > 0) {
        const velocityChange = (dailyAvg - lastMonthDailyAvg) / lastMonthDailyAvg * 100;
        if (velocityChange >= 20) {
          insights.push({
            type: "warning",
            icon: "\u{1F525}",
            title: "Spending Faster",
            message: `Daily spending is ${velocityChange.toFixed(0)}% higher than last month's average.`,
            detail: `${formatMoney(lastMonthDailyAvg)}/day \u2192 ${formatMoney(dailyAvg)}/day`,
            priority: 2
          });
        } else if (velocityChange <= -20) {
          insights.push({
            type: "positive",
            icon: "\u{1F3AF}",
            title: "Spending Slower",
            message: `Daily spending is ${Math.abs(velocityChange).toFixed(0)}% lower than last month.`,
            detail: `${formatMoney(lastMonthDailyAvg)}/day \u2192 ${formatMoney(dailyAvg)}/day`,
            priority: 2
          });
        }
      }
    }
    const avgExpense = totalExpensesThisMonth / Math.max(thisMonthExpenses.length, 1);
    const largeExpenses = thisMonthExpenses.filter((e) => e.amount > avgExpense * 3 && e.amount > 50);
    if (largeExpenses.length > 0) {
      const largest = largeExpenses.sort((a, b) => b.amount - a.amount)[0];
      insights.push({
        type: "info",
        icon: "\u{1F440}",
        title: "Large Expense",
        message: `Notable expense: ${formatMoney(largest.amount)} on ${largest.category}.`,
        detail: largest.notes || `This is ${(largest.amount / avgExpense).toFixed(1)}x your average expense`,
        priority: 4
      });
    }
    if (totalIncomeLastMonth > 0 && totalIncomeThisMonth > 0) {
      const incomeChange = (totalIncomeThisMonth - totalIncomeLastMonth) / totalIncomeLastMonth * 100;
      if (Math.abs(incomeChange) >= 15) {
        insights.push({
          type: incomeChange > 0 ? "positive" : "info",
          icon: incomeChange > 0 ? "\u{1F4C8}" : "\u{1F4C9}",
          title: incomeChange > 0 ? "Income Up" : "Income Down",
          message: `Income is ${incomeChange > 0 ? "up" : "down"} ${Math.abs(incomeChange).toFixed(0)}% from last month.`,
          detail: `${formatMoney(totalIncomeLastMonth)} \u2192 ${formatMoney(totalIncomeThisMonth)}`,
          priority: 2
        });
      }
    }
    const thisMonthWork = workLogs.filter((log) => {
      const parts = log.date.split("-");
      return parseInt(parts[1]) - 1 === currentMonth && parseInt(parts[0]) === currentYear;
    });
    const thisMonthHours = thisMonthWork.reduce((sum, l) => sum + l.hours, 0);
    const thisMonthEarnings = thisMonthWork.reduce((sum, l) => sum + l.hours * (l.hourlyRate || 0), 0);
    if (thisMonthHours > 0 && thisMonthEarnings > 0) {
      const effectiveRate = thisMonthEarnings / thisMonthHours;
      insights.push({
        type: "info",
        icon: "\u23F0",
        title: "Work Summary",
        message: `You've logged ${thisMonthHours.toFixed(1)} hours this month.`,
        detail: `Earning ${formatMoney(effectiveRate)}/hr avg \u2192 ${formatMoney(thisMonthEarnings)} total`,
        priority: 4
      });
    }
    return insights.sort((a, b) => a.priority - b.priority).slice(0, 6);
  };
  const getSearchResults = () => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    const results = [];
    expenses.forEach((exp) => {
      const notesMatch = exp.notes && exp.notes.toLowerCase().includes(query);
      if (exp.category.toLowerCase().includes(query) || String(exp.amount).includes(query) || notesMatch) {
        results.push({
          type: "expense",
          display: `${CATEGORY_STYLES[exp.category]?.icon || "\u{1F4E6}"} ${formatMoney(exp.amount)} - ${exp.category}${exp.notes ? ` (${exp.notes})` : ""}`,
          date: exp.date
        });
      }
    });
    oneTimeIncomes.forEach((inc) => {
      const notesMatch = inc.notes && inc.notes.toLowerCase().includes(query);
      if (inc.name.toLowerCase().includes(query) || String(inc.amount).includes(query) || notesMatch) {
        results.push({ type: "income", display: `\u{1F4B0} ${formatMoney(inc.amount)} - ${inc.name}${inc.notes ? ` (${inc.notes})` : ""}`, date: inc.date });
      }
    });
    workLogs.forEach((log) => {
      if (log.job.toLowerCase().includes(query) || log.description.toLowerCase().includes(query)) {
        results.push({ type: "work", display: `\u23F0 ${log.hours}h - ${log.job}`, date: log.date });
      }
    });
    todos.forEach((todo) => {
      if (todo.text.toLowerCase().includes(query)) {
        results.push({ type: "todo", display: `${todo.completed ? "\u2705" : "\u2B1C"} ${todo.text}`, date: todo.date });
      }
    });
    return results.slice(0, 10);
  };
  const Confetti = () => /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 pointer-events-none z-50 overflow-hidden" }, Array.from({ length: 50 }).map((_, i) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: i,
      className: "absolute w-3 h-3 rounded-full",
      style: {
        left: `${Math.random() * 100}%`,
        top: "-10px",
        backgroundColor: CHART_COLORS[Math.floor(Math.random() * CHART_COLORS.length)],
        animation: `confettiDrop ${2 + Math.random() * 2}s linear forwards`,
        animationDelay: `${Math.random() * 0.5}s`
      }
    }
  )));
  const AchievementPopup = ({ achievement }) => /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 z-50 flex items-center justify-center pointer-events-none" }, /* @__PURE__ */ React.createElement("div", { className: "achievement-unlock bg-white rounded-3xl p-8 shadow-2xl border-4 border-yellow-400 text-center" }, /* @__PURE__ */ React.createElement("div", { className: "text-6xl mb-4" }, achievement.icon), /* @__PURE__ */ React.createElement("p", { className: "text-sm font-bold text-yellow-600 mb-1" }, "\u{1F389} Achievement Unlocked!"), /* @__PURE__ */ React.createElement("h3", { className: "text-2xl font-black text-gray-800" }, achievement.name), /* @__PURE__ */ React.createElement("p", { className: "text-gray-500 mt-2" }, achievement.description)));
  const CharacterPopup = () => /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "fixed bottom-4 left-4 z-40 cursor-pointer",
      onClick: () => setShowCharacter(false)
    },
    /* @__PURE__ */ React.createElement("div", { className: "fade-in-up flex items-end gap-3" }, /* @__PURE__ */ React.createElement("div", { className: "character-bounce" }, /* @__PURE__ */ React.createElement("svg", { width: "80", height: "100", viewBox: "0 0 80 100" }, /* @__PURE__ */ React.createElement("ellipse", { cx: "40", cy: "70", rx: "25", ry: "20", fill: "#FF6B9D" }), /* @__PURE__ */ React.createElement("circle", { cx: "40", cy: "35", r: "25", fill: "#FFD93D" }), /* @__PURE__ */ React.createElement("ellipse", { cx: "32", cy: "32", rx: "5", ry: "6", fill: "white" }), /* @__PURE__ */ React.createElement("ellipse", { cx: "48", cy: "32", rx: "5", ry: "6", fill: "white" }), /* @__PURE__ */ React.createElement("circle", { cx: "34", cy: "33", r: "2.5", fill: "#2D2A3E" }), /* @__PURE__ */ React.createElement("circle", { cx: "50", cy: "33", r: "2.5", fill: "#2D2A3E" }), /* @__PURE__ */ React.createElement("path", { d: "M32 45 Q40 55 48 45", stroke: "#2D2A3E", strokeWidth: "2.5", fill: "none", strokeLinecap: "round" }), /* @__PURE__ */ React.createElement("circle", { cx: "22", cy: "40", r: "4", fill: "#FFB6C1", opacity: "0.6" }), /* @__PURE__ */ React.createElement("circle", { cx: "58", cy: "40", r: "4", fill: "#FFB6C1", opacity: "0.6" }), /* @__PURE__ */ React.createElement("ellipse", { cx: "28", cy: "88", rx: "10", ry: "7", fill: "#E5598A" }), /* @__PURE__ */ React.createElement("ellipse", { cx: "52", cy: "88", rx: "10", ry: "7", fill: "#E5598A" }))), /* @__PURE__ */ React.createElement("div", { className: `rounded-2xl p-4 shadow-xl border-2 max-w-xs slide-in-right ${darkMode ? "bg-[#252233] border-pink-400/30" : "bg-white border-pink-200"}` }, /* @__PURE__ */ React.createElement("p", { className: `font-bold ${darkMode ? "text-gray-100" : "text-gray-700"}` }, characterQuote), /* @__PURE__ */ React.createElement("p", { className: `text-xs mt-2 ${darkMode ? "text-gray-500" : "text-gray-400"}` }, "Tap to dismiss")))
  );
  if (isLoading) {
    return /* @__PURE__ */ React.createElement("div", { className: `min-h-screen flex items-center justify-center ${darkMode ? "bg-gradient-to-br from-[#1A1625] via-[#1E1B2E] to-[#1A2025]" : "bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100"}` }, /* @__PURE__ */ React.createElement("div", { className: "text-center" }, /* @__PURE__ */ React.createElement("div", { className: "text-6xl character-bounce mb-4" }, "\u{1F4B0}"), /* @__PURE__ */ React.createElement("p", { className: `text-xl font-bold ${darkMode ? "text-gray-300" : "text-gray-600"}` }, "Loading your finances...")));
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("style", null, styles), /* @__PURE__ */ React.createElement("div", { className: `${darkMode ? "dark-mode" : ""}` }, /* @__PURE__ */ React.createElement("div", { className: "app-container min-h-screen p-4 sm:p-6 relative pb-24" }, /* @__PURE__ */ React.createElement("header", { className: "max-w-6xl mx-auto mb-8" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap items-center justify-between gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement("div", { className: "w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center shadow-lg shadow-pink-300/50" }, /* @__PURE__ */ React.createElement(Wallet, { className: "w-7 h-7 text-white" })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", { className: "text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500" }, "Money Buddy"), /* @__PURE__ */ React.createElement("p", { className: `text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-400"}` }, "Your cheerful finance tracker"))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setDarkMode(!darkMode),
      className: `dark-mode-toggle w-10 h-10 rounded-xl flex items-center justify-center transition-all ${darkMode ? "bg-yellow-400/20 text-yellow-400 hover:bg-yellow-400/30" : "bg-indigo-100 text-indigo-500 hover:bg-indigo-200"}`,
      title: darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
    },
    darkMode ? /* @__PURE__ */ React.createElement(Sun, { className: "w-5 h-5" }) : /* @__PURE__ */ React.createElement(Moon, { className: "w-5 h-5" })
  ), /* @__PURE__ */ React.createElement(CandyButton, { variant: "ghost", size: "sm", onClick: () => setShowAchievements(true) }, /* @__PURE__ */ React.createElement(Trophy, { className: "w-4 h-4" }), /* @__PURE__ */ React.createElement("span", { className: "hidden sm:inline" }, unlockedAchievements.length, "/", achievements.length)), /* @__PURE__ */ React.createElement(CandyButton, { variant: "ghost", size: "sm", onClick: exportData, className: showSaveIndicator ? "save-pulse" : "" }, /* @__PURE__ */ React.createElement(Download, { className: "w-4 h-4" })), /* @__PURE__ */ React.createElement(CandyButton, { variant: "ghost", size: "sm", onClick: () => setShowRestoreModal(true) }, /* @__PURE__ */ React.createElement(Upload, { className: "w-4 h-4" })))), /* @__PURE__ */ React.createElement("div", { className: "mt-4 max-w-md relative" }, /* @__PURE__ */ React.createElement("div", { className: `flex items-center rounded-2xl shadow-lg border-2 overflow-hidden transition-colors duration-300 ${darkMode ? "bg-[#1E1B2E] border-[#3D3A4E]" : "bg-white/80 border-white/50"}` }, /* @__PURE__ */ React.createElement(Search, { className: `w-5 h-5 ml-4 ${darkMode ? "text-gray-500" : "text-gray-400"}` }), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      placeholder: "Search your finances...",
      value: searchQuery,
      onChange: (e) => {
        setSearchQuery(e.target.value);
        setShowSearchResults(e.target.value.length > 0);
      },
      onFocus: () => searchQuery && setShowSearchResults(true),
      onBlur: () => setTimeout(() => setShowSearchResults(false), 200),
      className: `flex-1 px-3 py-3 bg-transparent outline-none ${darkMode ? "text-gray-100 placeholder-gray-500" : "text-gray-700 placeholder-gray-400"}`
    }
  ), searchQuery && /* @__PURE__ */ React.createElement("button", { onClick: () => {
    setSearchQuery("");
    setShowSearchResults(false);
  }, className: `pr-4 ${darkMode ? "text-gray-500 hover:text-gray-300" : "text-gray-400 hover:text-gray-600"}` }, /* @__PURE__ */ React.createElement(X, { className: "w-5 h-5" }))), showSearchResults && searchQuery && /* @__PURE__ */ React.createElement("div", { className: `absolute top-full left-0 right-0 mt-2 rounded-2xl shadow-2xl border-2 overflow-hidden z-30 fade-in-up ${darkMode ? "bg-[#252233] border-[#3D3A4E]" : "bg-white border-gray-100"}` }, getSearchResults().length > 0 ? /* @__PURE__ */ React.createElement("div", { className: "max-h-80 overflow-y-auto" }, /* @__PURE__ */ React.createElement("div", { className: `px-4 py-2 text-xs font-bold uppercase tracking-wide ${darkMode ? "bg-[#1E1B2E] text-gray-400" : "bg-gray-50 text-gray-500"}` }, getSearchResults().length, " results"), getSearchResults().map((result, idx) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: idx,
      className: `px-4 py-3 cursor-pointer border-b last:border-0 transition-colors ${darkMode ? "hover:bg-pink-900/20 border-[#3D3A4E]" : "hover:bg-pink-50 border-gray-50"}`,
      onMouseDown: () => {
        if (result.type === "expense") setViewMode("budget");
        else if (result.type === "income") setViewMode("income");
        else if (result.type === "work") setViewMode("clockin");
        else if (result.type === "todo") setViewMode("todos");
        setShowSearchResults(false);
        setSearchQuery("");
      }
    },
    /* @__PURE__ */ React.createElement("p", { className: `font-medium ${darkMode ? "text-gray-200" : "text-gray-700"}` }, result.display),
    /* @__PURE__ */ React.createElement("p", { className: `text-xs mt-1 ${darkMode ? "text-gray-500" : "text-gray-400"}` }, formatDateDisplay(result.date))
  ))) : /* @__PURE__ */ React.createElement("div", { className: "px-4 py-8 text-center" }, /* @__PURE__ */ React.createElement("p", { className: darkMode ? "text-gray-500" : "text-gray-400" }, "No results found"))))), /* @__PURE__ */ React.createElement("nav", { className: "max-w-6xl mx-auto mb-8" }, /* @__PURE__ */ React.createElement("div", { className: `flex gap-1 sm:gap-2 p-2 rounded-3xl overflow-x-auto shadow-lg border-2 transition-colors duration-300 ${darkMode ? "bg-[#1E1B2E] border-[#3D3A4E]" : "bg-gray-100 border-gray-200"}` }, /* @__PURE__ */ React.createElement(TabButton, { darkMode, active: viewMode === "income", onClick: () => setViewMode("income"), icon: /* @__PURE__ */ React.createElement(DollarSign, { className: "w-5 h-5" }), label: "Income" }), /* @__PURE__ */ React.createElement(TabButton, { darkMode, active: viewMode === "investments", onClick: () => setViewMode("investments"), icon: /* @__PURE__ */ React.createElement(PieChart, { className: "w-5 h-5" }), label: "Invest" }), /* @__PURE__ */ React.createElement(TabButton, { darkMode, active: viewMode === "budget", onClick: () => setViewMode("budget"), icon: /* @__PURE__ */ React.createElement(Receipt, { className: "w-5 h-5" }), label: "Budget" }), /* @__PURE__ */ React.createElement(TabButton, { darkMode, active: viewMode === "clockin", onClick: () => setViewMode("clockin"), icon: /* @__PURE__ */ React.createElement(Briefcase, { className: "w-5 h-5" }), label: "Work" }), /* @__PURE__ */ React.createElement(TabButton, { darkMode, active: viewMode === "todos", onClick: () => setViewMode("todos"), icon: /* @__PURE__ */ React.createElement(ListTodo, { className: "w-5 h-5" }), label: "Tasks" }), /* @__PURE__ */ React.createElement(TabButton, { darkMode, active: viewMode === "trends", onClick: () => setViewMode("trends"), icon: /* @__PURE__ */ React.createElement(BarChart3, { className: "w-5 h-5" }), label: "Trends" }))), /* @__PURE__ */ React.createElement(
    "main",
    {
      className: "max-w-6xl mx-auto",
      ref: mainContentRef,
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd
    },
    viewMode === "income" && /* @__PURE__ */ React.createElement("div", { className: `space-y-6 tab-content ${swipeDirection === "left" ? "slide-left-exit" : swipeDirection === "right" ? "slide-right-exit" : "active"}` }, /* @__PURE__ */ React.createElement(CandyCard, { darkMode }, /* @__PURE__ */ React.createElement("h2", { className: `text-xl font-black mb-4 flex items-center gap-2 ${darkMode ? "text-gray-100" : "text-gray-700"}` }, /* @__PURE__ */ React.createElement("span", { className: "text-2xl" }, "\u{1F4B8}"), " Add Income"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-2" }, /* @__PURE__ */ React.createElement("div", { className: `flex rounded-xl overflow-hidden border-2 ${darkMode ? "border-[#3D3A4E]" : "border-gray-200"}` }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setIncomeInputMode("manual"),
        className: `px-3 py-1 text-xs font-bold transition-all ${incomeInputMode === "manual" ? "bg-gradient-to-r from-purple-400 to-pink-400 text-white" : darkMode ? "text-gray-400 hover:bg-white/5" : "text-gray-500 hover:bg-gray-50"}`
      },
      "Source Name"
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setIncomeInputMode("quick"),
        className: `px-3 py-1 text-xs font-bold transition-all ${incomeInputMode === "quick" ? "bg-gradient-to-r from-purple-400 to-pink-400 text-white" : darkMode ? "text-gray-400 hover:bg-white/5" : "text-gray-500 hover:bg-gray-50"}`
      },
      "Quick Sources"
    ))), incomeInputMode === "manual" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
      "input",
      {
        ref: incomeNameRef,
        id: "income-name",
        placeholder: "e.g., Freelance gig",
        value: oneTimeName,
        onChange: (e) => setOneTimeName(e.target.value),
        onKeyDown: (e) => (e.key === "Enter" || e.keyCode === 13) && addOneTimeIncome(),
        list: "income-names",
        className: `candy-input ${darkMode ? "candy-input-dark" : "candy-input-light"} ${shakeField === "income-name" ? "shake border-red-400" : ""}`
      }
    ), /* @__PURE__ */ React.createElement("datalist", { id: "income-names" }, getUniqueOneTimeNames().map((name) => /* @__PURE__ */ React.createElement("option", { key: name, value: name })))), incomeInputMode === "quick" && /* @__PURE__ */ React.createElement("div", { className: "flex gap-2" }, quickSources.map((source, idx) => /* @__PURE__ */ React.createElement("div", { key: idx, className: "flex-1 relative group" }, editingQuickSource === idx ? /* @__PURE__ */ React.createElement(
      "input",
      {
        autoFocus: true,
        type: "text",
        value: source,
        onChange: (e) => {
          const newSources = [...quickSources];
          newSources[idx] = e.target.value;
          setQuickSources(newSources);
        },
        onBlur: () => setEditingQuickSource(null),
        onKeyDown: (e) => {
          if (e.key === "Enter") setEditingQuickSource(null);
        },
        className: `w-full px-2 py-2.5 text-xs font-bold rounded-xl outline-none text-center ${darkMode ? "bg-[#252233] text-gray-100 border-2 border-purple-500" : "bg-white text-gray-700 border-2 border-purple-400"}`
      }
    ) : /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setOneTimeName(source),
        onTouchEnd: (e) => {
          e.preventDefault();
          setOneTimeName(source);
        },
        onDoubleClick: () => setEditingQuickSource(idx),
        className: `w-full px-2 py-2.5 text-xs font-bold rounded-xl transition-all press-feedback ${oneTimeName === source ? "bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-lg scale-105" : darkMode ? "bg-[#252233] text-gray-300 hover:bg-[#2D2A3E] border-2 border-[#3D3A4E]" : "bg-gray-100 text-gray-600 hover:bg-gray-200 border-2 border-gray-200"}`
      },
      source
    ), editingQuickSource !== idx && /* @__PURE__ */ React.createElement(
      "div",
      {
        onClick: () => setEditingQuickSource(idx),
        className: `absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity ${darkMode ? "bg-purple-600 text-white" : "bg-purple-400 text-white"}`
      },
      /* @__PURE__ */ React.createElement(Edit3, { className: "w-2.5 h-2.5" })
    )))), incomeInputMode === "quick" && oneTimeName && /* @__PURE__ */ React.createElement("div", { className: `mt-2 text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}` }, "Selected: ", /* @__PURE__ */ React.createElement("span", { className: `font-bold ${darkMode ? "text-purple-400" : "text-purple-500"}` }, oneTimeName))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: `block text-sm font-bold mb-2 ${darkMode ? "text-gray-400" : "text-gray-500"}` }, "Notes ", /* @__PURE__ */ React.createElement("span", { className: `font-normal ${darkMode ? "text-gray-600" : "text-gray-400"}` }, "(optional)")), /* @__PURE__ */ React.createElement(
      "input",
      {
        placeholder: "What was this for?",
        value: oneTimeNotes,
        onChange: (e) => setOneTimeNotes(e.target.value),
        onKeyDown: (e) => (e.key === "Enter" || e.keyCode === 13) && addOneTimeIncome(),
        className: `candy-input ${darkMode ? "candy-input-dark" : "candy-input-light"}`
      }
    )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: `block text-sm font-bold mb-2 ${darkMode ? "text-gray-400" : "text-gray-500"}` }, "Amount ($)"), /* @__PURE__ */ React.createElement(
      "input",
      {
        id: "income-amount",
        type: "text",
        inputMode: "decimal",
        placeholder: "100",
        value: oneTimeAmount ? formatNumberInput(oneTimeAmount) : "",
        onChange: (e) => setOneTimeAmount(parseFormattedNumber(e.target.value)),
        onKeyDown: (e) => (e.key === "Enter" || e.keyCode === 13) && addOneTimeIncome(),
        className: `candy-input ${darkMode ? "candy-input-dark" : "candy-input-light"} ${shakeField === "income-amount" ? "shake border-red-400" : ""}`
      }
    )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: `block text-sm font-bold mb-2 ${darkMode ? "text-gray-400" : "text-gray-500"}` }, "Date"), /* @__PURE__ */ React.createElement(
      CandyDateInput,
      {
        darkMode,
        value: oneTimeDate,
        onChange: (e) => setOneTimeDate(e.target.value)
      }
    ))), /* @__PURE__ */ React.createElement("div", { className: "mt-4 flex justify-end gap-2" }, (oneTimeName || oneTimeAmount || oneTimeNotes) && /* @__PURE__ */ React.createElement(CandyButton, { variant: "ghost", size: "sm", onClick: clearIncomeForm, className: "press-feedback" }, /* @__PURE__ */ React.createElement(X, { className: "w-4 h-4" }), " Clear"), /* @__PURE__ */ React.createElement(
      CandyButton,
      {
        onClick: addOneTimeIncome,
        className: `btn-press ${successButton === "add-income" ? "success-flash" : ""}`
      },
      successButton === "add-income" ? /* @__PURE__ */ React.createElement(Check, { className: "w-5 h-5" }) : /* @__PURE__ */ React.createElement(Plus, { className: "w-5 h-5" }),
      successButton === "add-income" ? "Added!" : "Add Income"
    ))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4" }, /* @__PURE__ */ React.createElement(
      StatBubble,
      {
        darkMode,
        icon: /* @__PURE__ */ React.createElement(DollarSign, { className: "w-6 h-6" }),
        label: "This Month",
        value: formatMoney(getTotalIncomeForMonth()),
        color: "green",
        pop: popTotal === "income-total"
      }
    ), /* @__PURE__ */ React.createElement(
      StatBubble,
      {
        darkMode,
        icon: /* @__PURE__ */ React.createElement(Star, { className: "w-6 h-6" }),
        label: "Annual (selected)",
        value: formatMoney(calculateAnnualIncome()),
        color: "purple"
      }
    ), /* @__PURE__ */ React.createElement(
      StatBubble,
      {
        darkMode,
        icon: /* @__PURE__ */ React.createElement(TrendingUp, { className: "w-6 h-6" }),
        label: "All Time",
        value: formatMoney(oneTimeIncomes.reduce((s, i) => s + i.amount, 0)),
        color: "blue"
      }
    )), /* @__PURE__ */ React.createElement(CandyCard, { darkMode }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap items-center justify-between gap-4 mb-4" }, /* @__PURE__ */ React.createElement("h2", { className: `text-xl font-black flex items-center gap-2 ${darkMode ? "text-gray-100" : "text-gray-700"}` }, /* @__PURE__ */ React.createElement("span", { className: "text-2xl" }, "\u{1F4CA}"), " Income by Source"), /* @__PURE__ */ React.createElement(
      MonthYearSelector,
      {
        month: selectedIncomeMonth,
        year: selectedIncomeYear,
        setMonth: setSelectedIncomeMonth,
        setYear: setSelectedIncomeYear,
        darkMode,
        variant: "purple"
      }
    )), getUniqueOneTimeNames().length === 0 ? /* @__PURE__ */ React.createElement(EmptyState, { darkMode, icon: "\u{1F4B0}", title: "No income yet", subtitle: "Add your first income to get started!" }) : /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, getUniqueOneTimeNames().map((name) => {
      const monthTotal = getOneTimeTotalByNameForMonth(name);
      const monthIncomes = getOneTimeIncomesByNameForMonth(name);
      const isExpanded = expandedOneTime[name];
      const isAnnual = annualIncomeCategories.includes(name);
      return /* @__PURE__ */ React.createElement(
        "div",
        {
          key: name,
          className: `rounded-2xl border-2 overflow-hidden transition-all ${isAnnual ? darkMode ? "border-purple-700 bg-purple-900/20" : "border-purple-200 bg-purple-50/50" : darkMode ? "border-[#3D3A4E] bg-[#252233]" : "border-gray-100 bg-white"}`
        },
        /* @__PURE__ */ React.createElement(
          "div",
          {
            className: `flex items-center justify-between p-4 cursor-pointer transition-colors press-feedback ${darkMode ? "hover:bg-white/5" : "hover:bg-gray-50/50"}`,
            onClick: () => setExpandedOneTime({ ...expandedOneTime, [name]: !isExpanded })
          },
          /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement("div", { className: `w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 ${isExpanded ? "rotate-90" : ""} ${isExpanded ? darkMode ? "bg-pink-900/30" : "bg-pink-100" : darkMode ? "bg-[#2D2A3E]" : "bg-gray-100"}` }, /* @__PURE__ */ React.createElement(ChevronRight, { className: `w-5 h-5 ${isExpanded ? "text-pink-500" : darkMode ? "text-gray-500" : "text-gray-400"}` })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: `font-bold ${darkMode ? "text-gray-100" : "text-gray-700"}` }, name), /* @__PURE__ */ React.createElement("p", { className: `text-sm ${darkMode ? "text-gray-500" : "text-gray-400"}` }, monthIncomes.length, " entries"))),
          /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement(
            "button",
            {
              onClick: (e) => {
                e.stopPropagation();
                setAnnualIncomeCategories(
                  isAnnual ? annualIncomeCategories.filter((c) => c !== name) : [...annualIncomeCategories, name]
                );
              },
              className: `px-3 py-1 rounded-full text-xs font-bold transition-all ${isAnnual ? darkMode ? "bg-purple-900/50 text-purple-300" : "bg-purple-200 text-purple-700" : darkMode ? "bg-[#2D2A3E] text-gray-400 hover:bg-purple-900/30" : "bg-gray-100 text-gray-500 hover:bg-purple-100"}`
            },
            isAnnual ? "\u2713 Annual" : "Add to Annual"
          ), /* @__PURE__ */ React.createElement("span", { className: "text-xl font-black text-emerald-500" }, formatMoney(monthTotal)))
        ),
        /* @__PURE__ */ React.createElement("div", { className: `accordion-content ${isExpanded ? "expanded" : ""}` }, /* @__PURE__ */ React.createElement("div", null, monthIncomes.length > 0 && /* @__PURE__ */ React.createElement("div", { className: `border-t ${darkMode ? "border-[#3D3A4E] bg-[#1E1B2E]/50" : "border-gray-100 bg-gray-50/50"}` }, monthIncomes.map((income) => /* @__PURE__ */ React.createElement(
          "div",
          {
            key: income.id,
            className: `flex items-center justify-between px-4 py-3 border-b last:border-0 ${deletingItems.has(income.id) ? "delete-animation" : ""} ${darkMode ? "border-[#3D3A4E]" : "border-gray-100"} ${newItemId === income.id ? "fade-in-up" : ""} ${newItemId === income.id ? darkMode ? "bg-emerald-900/20" : "bg-emerald-50" : ""}`,
            onTouchStart: (e) => handleLongPressStart(e, "income", income),
            onTouchEnd: handleLongPressEnd,
            onTouchMove: handleLongPressMove,
            onMouseDown: (e) => handleLongPressStart(e, "income", income),
            onMouseUp: handleLongPressEnd,
            onMouseLeave: handleLongPressEnd
          },
          /* @__PURE__ */ React.createElement("div", { className: "flex-1" }, /* @__PURE__ */ React.createElement("span", { className: `text-sm ${darkMode ? "text-gray-500" : "text-gray-500"}` }, formatDateDisplay(income.date)), income.notes && /* @__PURE__ */ React.createElement("p", { className: `text-xs mt-1 italic ${darkMode ? "text-gray-500" : "text-gray-400"}` }, '"', income.notes, '"')),
          /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement("span", { className: `font-bold ${darkMode ? "text-gray-100" : "text-gray-700"}` }, formatMoney(income.amount)), /* @__PURE__ */ React.createElement(
            "button",
            {
              onClick: () => removeOneTimeIncome(income.id),
              className: `w-10 h-10 rounded-full flex items-center justify-center transition-colors touch-target press-feedback ${darkMode ? "bg-red-900/30 text-red-400 hover:bg-red-900/50" : "bg-red-100 text-red-500 hover:bg-red-200"}`
            },
            /* @__PURE__ */ React.createElement(X, { className: "w-5 h-5" })
          ))
        )))))
      );
    }))), /* @__PURE__ */ React.createElement(CandyCard, { darkMode }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-4" }, /* @__PURE__ */ React.createElement("h2", { className: `text-xl font-black flex items-center gap-2 ${darkMode ? "text-gray-100" : "text-gray-700"}` }, /* @__PURE__ */ React.createElement("span", { className: "text-2xl" }, "\u{1F3E6}"), " Accounts & Debt"), /* @__PURE__ */ React.createElement(CandyButton, { variant: "ghost", size: "sm", onClick: () => setShowAddCardModal(true) }, /* @__PURE__ */ React.createElement(Plus, { className: "w-4 h-4" }), " Add Account")), (creditCards.length > 0 || debitCards.length > 0) && /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 sm:grid-cols-5 gap-3 mb-4" }, /* @__PURE__ */ React.createElement("div", { className: `p-3 rounded-xl text-center ${darkMode ? "bg-emerald-900/20" : "bg-emerald-50"}` }, /* @__PURE__ */ React.createElement("p", { className: `text-xs font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}` }, "Checking"), /* @__PURE__ */ React.createElement("p", { className: "text-lg font-bold text-emerald-500" }, formatMoney(getTotalCheckingBalance()))), /* @__PURE__ */ React.createElement("div", { className: `p-3 rounded-xl text-center ${darkMode ? "bg-rose-900/20" : "bg-rose-50"}` }, /* @__PURE__ */ React.createElement("p", { className: `text-xs font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}` }, "Total Debt"), /* @__PURE__ */ React.createElement("p", { className: "text-lg font-bold text-rose-500" }, formatMoney(getTotalDebt()))), /* @__PURE__ */ React.createElement("div", { className: `p-3 rounded-xl text-center ${darkMode ? "bg-blue-900/20" : "bg-blue-50"}` }, /* @__PURE__ */ React.createElement("p", { className: `text-xs font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}` }, "Credit Limit"), /* @__PURE__ */ React.createElement("p", { className: "text-lg font-bold text-blue-500" }, formatMoney(getTotalCreditLimit()))), /* @__PURE__ */ React.createElement("div", { className: `p-3 rounded-xl text-center ${darkMode ? "bg-purple-900/20" : "bg-purple-50"}` }, /* @__PURE__ */ React.createElement("p", { className: `text-xs font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}` }, "Available Credit"), /* @__PURE__ */ React.createElement("p", { className: "text-lg font-bold text-purple-500" }, formatMoney(getTotalCreditLimit() - getTotalDebt()))), /* @__PURE__ */ React.createElement("div", { className: `p-3 rounded-xl text-center ${getOverallUtilization() > 30 ? darkMode ? "bg-amber-900/20" : "bg-amber-50" : darkMode ? "bg-emerald-900/20" : "bg-emerald-50"}` }, /* @__PURE__ */ React.createElement("p", { className: `text-xs font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}` }, "Utilization"), /* @__PURE__ */ React.createElement("p", { className: `text-lg font-bold ${getOverallUtilization() > 30 ? "text-amber-500" : "text-emerald-500"}` }, getTotalCreditLimit() > 0 ? getOverallUtilization().toFixed(0) : 0, "%"))), debitCards.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "mb-4" }, /* @__PURE__ */ React.createElement("h3", { className: `text-sm font-bold mb-3 flex items-center gap-2 ${darkMode ? "text-gray-400" : "text-gray-500"}` }, "\u{1F4B5} Checking Accounts"), /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, debitCards.map((card, idx) => {
      const cardColor = DEBIT_COLORS[card.colorIndex || idx % DEBIT_COLORS.length];
      const isExpanded = expandedCards[`debit-${card.id}`];
      return /* @__PURE__ */ React.createElement(
        "div",
        {
          key: card.id,
          className: `rounded-2xl border-2 overflow-hidden transition-all ${deletingItems.has(card.id) ? "delete-animation" : ""} ${darkMode ? "border-[#3D3A4E]" : "border-gray-100"}`
        },
        /* @__PURE__ */ React.createElement(
          "div",
          {
            onClick: () => setExpandedCards({ ...expandedCards, [`debit-${card.id}`]: !isExpanded }),
            className: `p-4 cursor-pointer transition-colors press-feedback ${darkMode ? "hover:bg-white/5" : "hover:bg-gray-50"}`
          },
          /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-4" }, /* @__PURE__ */ React.createElement("div", { className: `w-12 h-8 rounded-lg bg-gradient-to-br ${cardColor.bg} flex items-center justify-center shadow-lg relative overflow-hidden` }, /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 bg-white/10 rounded-lg" }), /* @__PURE__ */ React.createElement("span", { className: "text-sm" }, "\u{1F4B5}\u{1F4B8}")), /* @__PURE__ */ React.createElement("div", { className: "flex-1 min-w-0" }, /* @__PURE__ */ React.createElement("h4", { className: `font-bold truncate ${darkMode ? "text-gray-100" : "text-gray-700"}` }, card.name), /* @__PURE__ */ React.createElement("p", { className: `text-sm ${darkMode ? "text-gray-500" : "text-gray-400"}` }, "Checking Account")), /* @__PURE__ */ React.createElement("div", { className: "text-right" }, /* @__PURE__ */ React.createElement("p", { className: "text-lg font-bold text-emerald-500" }, formatMoney(card.balance))), /* @__PURE__ */ React.createElement(ChevronRight, { className: `w-5 h-5 transition-transform ${isExpanded ? "rotate-90" : ""} ${darkMode ? "text-gray-500" : "text-gray-400"}` }))
        ),
        /* @__PURE__ */ React.createElement("div", { className: `accordion-content ${isExpanded ? "expanded" : ""}` }, /* @__PURE__ */ React.createElement("div", { className: `p-4 pt-0 border-t-2 ${darkMode ? "border-[#3D3A4E]" : "border-gray-100"}` }, card.transactions && card.transactions.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "mt-4" }, /* @__PURE__ */ React.createElement("p", { className: `text-xs font-bold mb-2 ${darkMode ? "text-gray-400" : "text-gray-500"}` }, "Recent Transactions"), /* @__PURE__ */ React.createElement("div", { className: "space-y-1" }, card.transactions.slice(-5).reverse().map((tx) => /* @__PURE__ */ React.createElement("div", { key: tx.id, className: `flex justify-between text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}` }, /* @__PURE__ */ React.createElement("span", null, formatDateDisplay(tx.date)), /* @__PURE__ */ React.createElement("span", { className: tx.type === "deposit" ? "text-emerald-500 font-medium" : "text-rose-500 font-medium" }, tx.type === "deposit" ? "+" : "-", formatMoney(tx.amount)))))), /* @__PURE__ */ React.createElement("div", { className: "flex gap-2 mt-4" }, /* @__PURE__ */ React.createElement(
          "button",
          {
            onClick: (e) => {
              e.stopPropagation();
              setShowDepositModal(card.id);
            },
            className: `flex-1 py-2 px-3 rounded-xl text-sm font-bold transition-all ${darkMode ? "bg-emerald-900/30 text-emerald-400 hover:bg-emerald-900/50" : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"}`
          },
          "\u{1F4B0} Deposit"
        ), /* @__PURE__ */ React.createElement(
          "button",
          {
            onClick: (e) => {
              e.stopPropagation();
              removeDebitCard(card.id);
            },
            className: `py-2 px-3 rounded-xl text-sm font-bold transition-all ${darkMode ? "bg-rose-900/30 text-rose-400 hover:bg-rose-900/50" : "bg-rose-50 text-rose-600 hover:bg-rose-100"}`
          },
          /* @__PURE__ */ React.createElement(X, { className: "w-4 h-4" })
        ))))
      );
    }))), creditCards.length > 0 && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: `text-sm font-bold mb-3 flex items-center gap-2 ${darkMode ? "text-gray-400" : "text-gray-500"}` }, "\u{1F4B3} Credit Cards"), /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, creditCards.map((card, idx) => {
      const cardColor = CARD_COLORS[card.colorIndex || idx % CARD_COLORS.length];
      const isExpanded = expandedCards[card.id];
      const { dueDate, daysUntil } = getCardDueDate(card);
      const payoffInfo = calculatePayoffDate(card);
      const utilization = card.creditLimit > 0 ? card.balance / card.creditLimit * 100 : 0;
      return /* @__PURE__ */ React.createElement(
        "div",
        {
          key: card.id,
          className: `rounded-2xl border-2 overflow-hidden transition-all ${deletingItems.has(card.id) ? "delete-animation" : ""} ${darkMode ? "border-[#3D3A4E]" : "border-gray-100"}`
        },
        /* @__PURE__ */ React.createElement(
          "div",
          {
            onClick: () => setExpandedCards({ ...expandedCards, [card.id]: !isExpanded }),
            className: `p-4 cursor-pointer transition-colors press-feedback ${darkMode ? "hover:bg-white/5" : "hover:bg-gray-50"}`
          },
          /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-4" }, /* @__PURE__ */ React.createElement("div", { className: `w-12 h-8 rounded-lg bg-gradient-to-br ${cardColor.bg} flex items-center justify-center shadow-lg relative overflow-hidden` }, /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 bg-white/10 rounded-lg" }), /* @__PURE__ */ React.createElement("span", { className: "text-white text-xs font-bold" }, "\u{1F4B3}")), /* @__PURE__ */ React.createElement("div", { className: "flex-1 min-w-0" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("h4", { className: `font-bold truncate ${darkMode ? "text-gray-100" : "text-gray-700"}` }, card.name), daysUntil <= 7 && /* @__PURE__ */ React.createElement("span", { className: `text-xs px-2 py-0.5 rounded-full font-medium ${daysUntil <= 3 ? "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400" : "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"}` }, daysUntil === 0 ? "Due today!" : daysUntil === 1 ? "Due tomorrow" : `Due in ${daysUntil}d`)), /* @__PURE__ */ React.createElement("p", { className: `text-sm ${darkMode ? "text-gray-500" : "text-gray-400"}` }, formatMoney(card.balance), " / ", formatMoney(card.creditLimit))), /* @__PURE__ */ React.createElement("div", { className: "text-right" }, /* @__PURE__ */ React.createElement("p", { className: "text-lg font-bold text-rose-500" }, formatMoney(card.balance)), /* @__PURE__ */ React.createElement("p", { className: `text-xs ${utilization > 30 ? "text-amber-500" : "text-emerald-500"}` }, utilization.toFixed(0), "% used")), /* @__PURE__ */ React.createElement(ChevronRight, { className: `w-5 h-5 transition-transform ${isExpanded ? "rotate-90" : ""} ${darkMode ? "text-gray-500" : "text-gray-400"}` })),
          /* @__PURE__ */ React.createElement("div", { className: `mt-3 h-2 rounded-full overflow-hidden ${darkMode ? "bg-[#1E1B2E]" : "bg-gray-100"}` }, /* @__PURE__ */ React.createElement(
            "div",
            {
              className: `h-full rounded-full transition-all ${utilization > 50 ? "bg-rose-500" : utilization > 30 ? "bg-amber-500" : "bg-emerald-500"}`,
              style: { width: `${Math.min(100, utilization)}%` }
            }
          ))
        ),
        /* @__PURE__ */ React.createElement("div", { className: `accordion-content ${isExpanded ? "expanded" : ""}` }, /* @__PURE__ */ React.createElement("div", { className: `p-4 pt-0 border-t-2 ${darkMode ? "border-[#3D3A4E]" : "border-gray-100"}` }, /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4" }, /* @__PURE__ */ React.createElement("div", { className: `p-2 rounded-xl text-center ${darkMode ? "bg-[#1E1B2E]" : "bg-gray-50"}` }, /* @__PURE__ */ React.createElement("p", { className: `text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}` }, "APR"), /* @__PURE__ */ React.createElement("p", { className: `font-bold ${darkMode ? "text-gray-200" : "text-gray-700"}` }, card.apr, "%")), /* @__PURE__ */ React.createElement("div", { className: `p-2 rounded-xl text-center ${darkMode ? "bg-[#1E1B2E]" : "bg-gray-50"}` }, /* @__PURE__ */ React.createElement("p", { className: `text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}` }, "Min Payment"), /* @__PURE__ */ React.createElement("p", { className: `font-bold ${darkMode ? "text-gray-200" : "text-gray-700"}` }, formatMoney(card.minPayment))), /* @__PURE__ */ React.createElement("div", { className: `p-2 rounded-xl text-center ${darkMode ? "bg-[#1E1B2E]" : "bg-gray-50"}` }, /* @__PURE__ */ React.createElement("p", { className: `text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}` }, "Due Date"), /* @__PURE__ */ React.createElement("p", { className: `font-bold ${darkMode ? "text-gray-200" : "text-gray-700"}` }, "Day ", card.dueDay)), /* @__PURE__ */ React.createElement("div", { className: `p-2 rounded-xl text-center ${darkMode ? "bg-[#1E1B2E]" : "bg-gray-50"}` }, /* @__PURE__ */ React.createElement("p", { className: `text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}` }, "Payoff Time"), /* @__PURE__ */ React.createElement("p", { className: `font-bold ${payoffInfo && payoffInfo.months === -1 ? "text-rose-500" : darkMode ? "text-gray-200" : "text-gray-700"}` }, card.balance <= 0 ? "Paid off! \u{1F389}" : payoffInfo ? payoffInfo.message : "N/A"))), card.payments && card.payments.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "mt-4" }, /* @__PURE__ */ React.createElement("p", { className: `text-xs font-bold mb-2 ${darkMode ? "text-gray-400" : "text-gray-500"}` }, "Recent Payments"), /* @__PURE__ */ React.createElement("div", { className: "space-y-1" }, card.payments.slice(-3).reverse().map((payment) => /* @__PURE__ */ React.createElement("div", { key: payment.id, className: `flex justify-between text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}` }, /* @__PURE__ */ React.createElement("span", null, formatDateDisplay(payment.date)), /* @__PURE__ */ React.createElement("span", { className: "text-emerald-500 font-medium" }, "-", formatMoney(payment.amount)))))), /* @__PURE__ */ React.createElement("div", { className: "flex gap-2 mt-4" }, /* @__PURE__ */ React.createElement(
          "button",
          {
            onClick: (e) => {
              e.stopPropagation();
              setShowPaymentModal(card.id);
            },
            className: `flex-1 py-2 px-3 rounded-xl text-sm font-bold transition-all ${darkMode ? "bg-emerald-900/30 text-emerald-400 hover:bg-emerald-900/50" : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"}`
          },
          "\u{1F4B5} Make Payment"
        ), /* @__PURE__ */ React.createElement(
          "button",
          {
            onClick: (e) => {
              e.stopPropagation();
              removeCreditCard(card.id);
            },
            className: `py-2 px-3 rounded-xl text-sm font-bold transition-all ${darkMode ? "bg-rose-900/30 text-rose-400 hover:bg-rose-900/50" : "bg-rose-50 text-rose-600 hover:bg-rose-100"}`
          },
          /* @__PURE__ */ React.createElement(X, { className: "w-4 h-4" })
        ))))
      );
    }))), creditCards.length === 0 && debitCards.length === 0 && /* @__PURE__ */ React.createElement("div", { className: `text-center py-8 rounded-2xl ${darkMode ? "bg-[#1E1B2E]" : "bg-gray-50"}` }, /* @__PURE__ */ React.createElement("span", { className: "text-4xl mb-3 block" }, "\u{1F3E6}"), /* @__PURE__ */ React.createElement("p", { className: `font-bold ${darkMode ? "text-gray-300" : "text-gray-600"}` }, "No accounts tracked"), /* @__PURE__ */ React.createElement("p", { className: `text-sm mt-1 ${darkMode ? "text-gray-500" : "text-gray-400"}` }, "Add checking accounts or credit cards to track your finances")))),
    viewMode === "investments" && /* @__PURE__ */ React.createElement("div", { className: `space-y-6 tab-content ${swipeDirection === "left" ? "slide-left-exit" : swipeDirection === "right" ? "slide-right-exit" : "active"}` }, /* @__PURE__ */ React.createElement(CandyCard, { darkMode }, /* @__PURE__ */ React.createElement("h2", { className: `text-xl font-black mb-4 flex items-center gap-2 ${darkMode ? "text-gray-100" : "text-gray-700"}` }, /* @__PURE__ */ React.createElement("span", { className: "text-2xl" }, investType === "buy" ? "\u{1F4C8}" : "\u{1F4C9}"), " ", investType === "buy" ? "Buy" : "Sell", " Investment"), /* @__PURE__ */ React.createElement("div", { className: "flex gap-2 mb-4" }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setInvestType("buy"),
        className: `flex-1 py-3 px-4 rounded-2xl font-bold transition-all ${investType === "buy" ? "bg-gradient-to-r from-emerald-400 to-teal-500 text-white shadow-lg" : darkMode ? "bg-[#1E1B2E] text-gray-400 hover:text-gray-200" : "bg-gray-100 text-gray-500 hover:text-gray-700"}`
      },
      /* @__PURE__ */ React.createElement(TrendingUp, { className: "w-4 h-4 inline mr-2" }),
      "Buy"
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setInvestType("sell"),
        className: `flex-1 py-3 px-4 rounded-2xl font-bold transition-all ${investType === "sell" ? "bg-gradient-to-r from-rose-400 to-pink-500 text-white shadow-lg" : darkMode ? "bg-[#1E1B2E] text-gray-400 hover:text-gray-200" : "bg-gray-100 text-gray-500 hover:text-gray-700"}`
      },
      /* @__PURE__ */ React.createElement(TrendingUp, { className: "w-4 h-4 inline mr-2 rotate-180" }),
      "Sell"
    )), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "lg:col-span-2" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-2" }, /* @__PURE__ */ React.createElement("div", { className: `flex rounded-xl overflow-hidden border-2 ${darkMode ? "border-[#3D3A4E]" : "border-gray-200"}` }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setAssetInputMode("manual"),
        className: `px-3 py-1 text-xs font-bold transition-all ${assetInputMode === "manual" ? "bg-gradient-to-r from-purple-400 to-pink-400 text-white" : darkMode ? "text-gray-400 hover:bg-white/5" : "text-gray-500 hover:bg-gray-50"}`
      },
      "Asset Name"
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setAssetInputMode("quick"),
        className: `px-3 py-1 text-xs font-bold transition-all ${assetInputMode === "quick" ? "bg-gradient-to-r from-purple-400 to-pink-400 text-white" : darkMode ? "text-gray-400 hover:bg-white/5" : "text-gray-500 hover:bg-gray-50"}`
      },
      "Quick Assets"
    ))), assetInputMode === "manual" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
      "input",
      {
        ref: investAssetRef,
        id: "invest-asset",
        placeholder: "e.g., AAPL, Bitcoin, ETF",
        value: selectedAsset,
        onChange: (e) => setSelectedAsset(e.target.value),
        onKeyDown: (e) => (e.key === "Enter" || e.keyCode === 13) && addInvestment(),
        list: "asset-names",
        className: `candy-input ${darkMode ? "candy-input-dark" : "candy-input-light"} ${shakeField === "invest-asset" ? "shake border-red-400" : ""}`
      }
    ), /* @__PURE__ */ React.createElement("datalist", { id: "asset-names" }, uniqueAssets.map((a) => /* @__PURE__ */ React.createElement("option", { key: a, value: a })))), assetInputMode === "quick" && /* @__PURE__ */ React.createElement("div", { className: "flex gap-2" }, quickAssets.map((asset, idx) => /* @__PURE__ */ React.createElement("div", { key: idx, className: "flex-1 relative group" }, editingQuickAsset === idx ? /* @__PURE__ */ React.createElement(
      "input",
      {
        autoFocus: true,
        type: "text",
        value: asset,
        onChange: (e) => {
          const newAssets = [...quickAssets];
          newAssets[idx] = e.target.value;
          setQuickAssets(newAssets);
        },
        onBlur: () => setEditingQuickAsset(null),
        onKeyDown: (e) => {
          if (e.key === "Enter") setEditingQuickAsset(null);
        },
        className: `w-full px-3 py-2.5 text-sm font-bold rounded-xl outline-none text-center ${darkMode ? "bg-[#252233] text-gray-100 border-2 border-purple-500" : "bg-white text-gray-700 border-2 border-purple-400"}`
      }
    ) : /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setSelectedAsset(asset),
        onTouchEnd: (e) => {
          e.preventDefault();
          setSelectedAsset(asset);
        },
        onDoubleClick: () => setEditingQuickAsset(idx),
        className: `w-full px-3 py-2.5 text-sm font-bold rounded-xl transition-all press-feedback ${selectedAsset === asset ? "bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-lg scale-105" : darkMode ? "bg-[#252233] text-gray-300 hover:bg-[#2D2A3E] border-2 border-[#3D3A4E]" : "bg-gray-100 text-gray-600 hover:bg-gray-200 border-2 border-gray-200"}`
      },
      asset
    ), editingQuickAsset !== idx && /* @__PURE__ */ React.createElement(
      "div",
      {
        onClick: () => setEditingQuickAsset(idx),
        className: `absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity ${darkMode ? "bg-purple-600 text-white" : "bg-purple-400 text-white"}`,
        title: "Click to edit"
      },
      /* @__PURE__ */ React.createElement(Edit3, { className: "w-2.5 h-2.5" })
    )))), assetInputMode === "quick" && selectedAsset && /* @__PURE__ */ React.createElement("div", { className: `mt-2 text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}` }, "Selected: ", /* @__PURE__ */ React.createElement("span", { className: `font-bold ${darkMode ? "text-purple-400" : "text-purple-500"}` }, selectedAsset), /* @__PURE__ */ React.createElement("span", { className: `ml-2 opacity-60` }, "(double-tap to edit buttons)"))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: `block text-sm font-bold mb-2 ${darkMode ? "text-gray-400" : "text-gray-500"}` }, investType === "buy" ? "Cost ($)" : "Proceeds ($)"), /* @__PURE__ */ React.createElement(
      "input",
      {
        id: "invest-amount",
        type: "text",
        inputMode: "decimal",
        placeholder: "500",
        value: investAmount ? formatNumberInput(investAmount) : "",
        onChange: (e) => setInvestAmount(parseFormattedNumber(e.target.value)),
        onKeyDown: (e) => (e.key === "Enter" || e.keyCode === 13) && addInvestment(),
        className: `candy-input ${darkMode ? "candy-input-dark" : "candy-input-light"} ${shakeField === "invest-amount" ? "shake border-red-400" : ""}`
      }
    )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: `block text-sm font-bold mb-2 ${darkMode ? "text-gray-400" : "text-gray-500"}` }, "Quantity ", /* @__PURE__ */ React.createElement("span", { className: `font-normal text-xs ${darkMode ? "text-gray-600" : "text-gray-400"}` }, "(optional)")), /* @__PURE__ */ React.createElement(
      "input",
      {
        id: "invest-quantity",
        type: "text",
        inputMode: "decimal",
        placeholder: "e.g., 2.5",
        value: investQuantity ? formatNumberInput(investQuantity) : "",
        onChange: (e) => setInvestQuantity(parseFormattedNumber(e.target.value)),
        onKeyDown: (e) => (e.key === "Enter" || e.keyCode === 13) && addInvestment(),
        className: `candy-input ${darkMode ? "candy-input-dark" : "candy-input-light"} ${shakeField === "invest-quantity" ? "shake border-red-400" : ""}`
      }
    )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: `block text-sm font-bold mb-2 ${darkMode ? "text-gray-400" : "text-gray-500"}` }, "Month/Year"), /* @__PURE__ */ React.createElement(
      MonthYearSelector,
      {
        month: investMonth,
        year: investYear,
        setMonth: setInvestMonth,
        setYear: setInvestYear,
        darkMode,
        variant: "purple"
      }
    ))), /* @__PURE__ */ React.createElement("div", { className: "mt-4 flex justify-end gap-2" }, (selectedAsset || investAmount || investQuantity) && /* @__PURE__ */ React.createElement(CandyButton, { variant: "ghost", size: "sm", onClick: clearInvestmentForm, className: "press-feedback" }, /* @__PURE__ */ React.createElement(X, { className: "w-4 h-4" }), " Clear"), /* @__PURE__ */ React.createElement(
      CandyButton,
      {
        variant: investType === "buy" ? "success" : "primary",
        onClick: addInvestment,
        className: `btn-press ${successButton === "add-investment" ? "success-flash" : ""}`
      },
      successButton === "add-investment" ? /* @__PURE__ */ React.createElement(Check, { className: "w-5 h-5" }) : /* @__PURE__ */ React.createElement(Plus, { className: "w-5 h-5" }),
      successButton === "add-investment" ? "Added!" : investType === "buy" ? "Add Buy" : "Add Sell"
    ))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4" }, /* @__PURE__ */ React.createElement(
      StatBubble,
      {
        darkMode,
        icon: /* @__PURE__ */ React.createElement(TrendingUp, { className: "w-6 h-6" }),
        label: "Total Bought",
        value: formatMoney(getTotalBuys()),
        color: "purple",
        pop: popTotal === "invest-total"
      }
    ), /* @__PURE__ */ React.createElement(
      StatBubble,
      {
        darkMode,
        icon: /* @__PURE__ */ React.createElement(TrendingUp, { className: "w-6 h-6 rotate-180" }),
        label: "Total Sold",
        value: formatMoney(getTotalSells()),
        color: "pink"
      }
    ), /* @__PURE__ */ React.createElement(
      StatBubble,
      {
        darkMode,
        icon: /* @__PURE__ */ React.createElement(DollarSign, { className: "w-6 h-6" }),
        label: "Net Invested",
        value: formatMoney(getTotalInvested()),
        color: "blue"
      }
    ), /* @__PURE__ */ React.createElement(
      StatBubble,
      {
        darkMode,
        icon: /* @__PURE__ */ React.createElement(Sparkles, { className: "w-6 h-6" }),
        label: /* @__PURE__ */ React.createElement("span", { className: "flex items-center gap-1" }, getTotalPnL().total >= 0 ? "Total P&L" : "Total Loss", getTotalPnL().hasMixedEntries && /* @__PURE__ */ React.createElement("span", { className: `text-[10px] ${darkMode ? "text-amber-400" : "text-amber-500"}`, title: "Some entries missing quantities" }, "*")),
        value: (getTotalPnL().total >= 0 ? "+" : "") + formatMoney(getTotalPnL().total),
        color: getTotalPnL().total >= 0 ? "green" : "orange"
      }
    )), getTotalPnL().hasMixedEntries && /* @__PURE__ */ React.createElement("div", { className: `text-xs text-center ${darkMode ? "text-amber-400/70" : "text-amber-600/70"}` }, "* P&L calculated only from entries with quantities. Expand holdings for details."), uniqueAssets.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6" }, /* @__PURE__ */ React.createElement(CandyCard, { darkMode }, /* @__PURE__ */ React.createElement("h3", { className: `text-lg font-bold mb-4 ${darkMode ? "text-gray-100" : "text-gray-700"}` }, "Portfolio Breakdown"), /* @__PURE__ */ React.createElement("div", { className: "flex flex-col md:flex-row gap-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex-1" }, /* @__PURE__ */ React.createElement(ResponsiveContainer, { width: "100%", height: 200 }, /* @__PURE__ */ React.createElement(RechartsPie, null, /* @__PURE__ */ React.createElement(
      Pie,
      {
        data: getPieChartData(),
        dataKey: "value",
        nameKey: "name",
        cx: "50%",
        cy: "50%",
        outerRadius: 70,
        innerRadius: 45,
        paddingAngle: 5
      },
      getPieChartData().map((entry, index) => /* @__PURE__ */ React.createElement(Cell, { key: `cell-${index}`, fill: CHART_COLORS[index % CHART_COLORS.length] }))
    ), /* @__PURE__ */ React.createElement(Tooltip, { formatter: (value) => formatMoney(value) }), /* @__PURE__ */ React.createElement(Legend, null)))), /* @__PURE__ */ React.createElement("div", { className: "flex-1" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-3" }, /* @__PURE__ */ React.createElement("span", { className: `text-sm font-bold ${darkMode ? "text-gray-400" : "text-gray-500"}` }, "Monthly Activity"), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setInvestCalendarYear((y) => y - 1),
        className: `w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${darkMode ? "hover:bg-white/10 text-gray-400" : "hover:bg-gray-100 text-gray-500"}`
      },
      /* @__PURE__ */ React.createElement(ChevronLeft, { className: "w-4 h-4" })
    ), /* @__PURE__ */ React.createElement("span", { className: `text-sm font-bold min-w-[50px] text-center ${darkMode ? "text-gray-200" : "text-gray-700"}` }, investCalendarYear), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setInvestCalendarYear((y) => y + 1),
        className: `w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${darkMode ? "hover:bg-white/10 text-gray-400" : "hover:bg-gray-100 text-gray-500"}`
      },
      /* @__PURE__ */ React.createElement(ChevronRight, { className: "w-4 h-4" })
    ))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-4 gap-2" }, ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((month, idx) => {
      const monthData = getMonthlyInvestments(investCalendarYear)[idx];
      const hasBuys = monthData.buys > 0;
      const hasSells = monthData.sells > 0;
      const hasActivity = hasBuys || hasSells;
      const netAmount = monthData.buys - monthData.sells;
      const isCurrentMonth = idx === (/* @__PURE__ */ new Date()).getMonth() && investCalendarYear === (/* @__PURE__ */ new Date()).getFullYear();
      const isMostlyBuys = monthData.buys >= monthData.sells;
      return /* @__PURE__ */ React.createElement(
        "div",
        {
          key: month,
          className: `group relative p-2 rounded-xl text-center transition-all cursor-default ${hasActivity ? darkMode ? "bg-purple-900/30 border-2 border-purple-500/30 hover:border-purple-400/50" : "bg-purple-50 border-2 border-purple-200 hover:border-purple-300" : darkMode ? "bg-[#1E1B2E] border-2 border-transparent" : "bg-gray-50 border-2 border-transparent"} ${isCurrentMonth ? "ring-2 ring-pink-400" : ""}`
        },
        /* @__PURE__ */ React.createElement("div", { className: `text-xs font-bold mb-1 ${darkMode ? "text-gray-400" : "text-gray-500"}` }, month),
        hasActivity ? /* @__PURE__ */ React.createElement("div", { className: `text-xs font-bold ${netAmount >= 0 ? "text-emerald-500" : "text-rose-500"}` }, netAmount >= 0 ? "+" : "", formatMoney(netAmount).replace("$", "")) : /* @__PURE__ */ React.createElement("div", { className: `text-xs ${darkMode ? "text-gray-600" : "text-gray-300"}` }, "\u2014"),
        hasActivity && /* @__PURE__ */ React.createElement("div", { className: "absolute top-1 right-1" }, /* @__PURE__ */ React.createElement("span", { className: `w-2 h-2 rounded-full block ${isMostlyBuys ? "bg-emerald-400" : "bg-rose-400"}` })),
        hasActivity && /* @__PURE__ */ React.createElement("div", { className: `absolute z-20 bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none ${darkMode ? "bg-[#1E1B2E] border border-purple-500/30 shadow-xl" : "bg-white border border-purple-200 shadow-lg"}` }, /* @__PURE__ */ React.createElement("div", { className: `font-bold mb-1 ${darkMode ? "text-gray-200" : "text-gray-700"}` }, month, " ", investCalendarYear), hasBuys && /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("span", { className: "w-2 h-2 rounded-full bg-emerald-400" }), /* @__PURE__ */ React.createElement("span", { className: darkMode ? "text-gray-400" : "text-gray-500" }, "Bought:"), /* @__PURE__ */ React.createElement("span", { className: "text-emerald-500 font-bold" }, formatMoney(monthData.buys))), hasSells && /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("span", { className: "w-2 h-2 rounded-full bg-rose-400" }), /* @__PURE__ */ React.createElement("span", { className: darkMode ? "text-gray-400" : "text-gray-500" }, "Sold:"), /* @__PURE__ */ React.createElement("span", { className: "text-rose-500 font-bold" }, formatMoney(monthData.sells))), /* @__PURE__ */ React.createElement("div", { className: `absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent ${darkMode ? "border-t-[#1E1B2E]" : "border-t-white"}` }))
      );
    })), /* @__PURE__ */ React.createElement("div", { className: "flex justify-center gap-4 mt-3" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5" }, /* @__PURE__ */ React.createElement("span", { className: "w-2 h-2 rounded-full bg-emerald-400" }), /* @__PURE__ */ React.createElement("span", { className: `text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}` }, "Mostly Buys")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5" }, /* @__PURE__ */ React.createElement("span", { className: "w-2 h-2 rounded-full bg-rose-400" }), /* @__PURE__ */ React.createElement("span", { className: `text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}` }, "Mostly Sells")))))), /* @__PURE__ */ React.createElement(CandyCard, { darkMode }, /* @__PURE__ */ React.createElement("h3", { className: `text-lg font-bold mb-4 ${darkMode ? "text-gray-100" : "text-gray-700"}` }, "Holdings"), /* @__PURE__ */ React.createElement("div", { className: "space-y-3 max-h-[400px] overflow-y-auto" }, uniqueAssets.map((asset, idx) => {
      const holdings = getAssetHoldings(asset);
      const isExpanded = expandedAssets[asset];
      const pnlColor = holdings.unrealizedPnL >= 0 ? "text-emerald-500" : "text-rose-500";
      return /* @__PURE__ */ React.createElement("div", { key: asset, className: `border-2 rounded-xl overflow-hidden transition-colors ${darkMode ? "border-[#3D3A4E]" : "border-gray-100"}` }, /* @__PURE__ */ React.createElement(
        "div",
        {
          className: `flex items-center justify-between p-3 cursor-pointer transition-colors press-feedback ${darkMode ? "hover:bg-white/5" : "hover:bg-gray-50"}`,
          onClick: () => setExpandedAssets({ ...expandedAssets, [asset]: !isExpanded })
        },
        /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement(
          "div",
          {
            className: `w-6 h-6 rounded-lg flex items-center justify-center transition-transform duration-300 ${isExpanded ? "rotate-90" : ""} ${darkMode ? "bg-purple-900/30" : "bg-purple-100"}`
          },
          /* @__PURE__ */ React.createElement(ChevronRight, { className: `w-4 h-4 ${darkMode ? "text-purple-400" : "text-purple-500"}` })
        ), /* @__PURE__ */ React.createElement(
          "div",
          {
            className: "w-4 h-4 rounded-full",
            style: { backgroundColor: CHART_COLORS[idx % CHART_COLORS.length] }
          }
        ), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: `font-bold ${darkMode ? "text-gray-100" : "text-gray-700"}` }, asset), holdings.totalQuantity > 0 && /* @__PURE__ */ React.createElement("span", { className: `ml-2 text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}` }, holdings.totalQuantity.toLocaleString(void 0, { maximumFractionDigits: 6 }), " units"))),
        /* @__PURE__ */ React.createElement("div", { className: "text-right" }, /* @__PURE__ */ React.createElement("div", { className: "font-bold text-purple-500" }, formatMoney(holdings.totalCost)), holdings.hasTrackedHoldings && holdings.currentPrice > 0 && /* @__PURE__ */ React.createElement("div", { className: `text-xs font-medium ${pnlColor}` }, holdings.unrealizedPnL >= 0 ? "+" : "", formatMoney(holdings.unrealizedPnL), holdings.hasMixedEntries && /* @__PURE__ */ React.createElement("span", { className: "opacity-60" }, "*")))
      ), /* @__PURE__ */ React.createElement("div", { className: `accordion-content ${isExpanded ? "expanded" : ""}` }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: `border-t p-3 space-y-3 ${darkMode ? "border-[#3D3A4E] bg-[#1E1B2E]/50" : "border-gray-100 bg-gray-50/50"}` }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 flex-wrap" }, /* @__PURE__ */ React.createElement("label", { className: `text-xs font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}` }, "Current Price/Unit:"), /* @__PURE__ */ React.createElement("div", { className: "relative flex-1 max-w-[120px]" }, /* @__PURE__ */ React.createElement("span", { className: `absolute left-3 top-1/2 -translate-y-1/2 text-sm ${darkMode ? "text-gray-500" : "text-gray-400"}` }, "$"), /* @__PURE__ */ React.createElement(
        "input",
        {
          type: "number",
          step: "any",
          placeholder: "0.00",
          value: currentValues[asset] || "",
          onChange: (e) => setCurrentValues({ ...currentValues, [asset]: parseFloat(e.target.value) || 0 }),
          className: `w-full pl-7 pr-2 py-1.5 text-sm rounded-lg outline-none ${darkMode ? "bg-[#252233] text-gray-100 placeholder-gray-600" : "bg-white text-gray-700 placeholder-gray-400 border border-gray-200"}`
        }
      ))), holdings.totalQuantity > 0 && /* @__PURE__ */ React.createElement("div", { className: `grid grid-cols-2 gap-2 text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}` }, /* @__PURE__ */ React.createElement("div", null, "Avg Cost: ", /* @__PURE__ */ React.createElement("span", { className: darkMode ? "text-gray-200" : "text-gray-700" }, formatMoney(holdings.avgPrice), "/unit")), holdings.currentPrice > 0 && /* @__PURE__ */ React.createElement("div", null, "Current Value: ", /* @__PURE__ */ React.createElement("span", { className: darkMode ? "text-gray-200" : "text-gray-700" }, formatMoney(holdings.currentValue))), holdings.realizedPnL !== 0 && /* @__PURE__ */ React.createElement("div", null, "Realized P&L: ", /* @__PURE__ */ React.createElement("span", { className: holdings.realizedPnL >= 0 ? "text-emerald-500" : "text-rose-500" }, holdings.realizedPnL >= 0 ? "+" : "", formatMoney(holdings.realizedPnL)))), holdings.hasMixedEntries && /* @__PURE__ */ React.createElement("div", { className: `p-2 rounded-lg text-xs ${darkMode ? "bg-amber-900/20 text-amber-400" : "bg-amber-50 text-amber-600"}` }, /* @__PURE__ */ React.createElement("div", { className: "flex items-start gap-2" }, /* @__PURE__ */ React.createElement("span", null, "\u26A0\uFE0F"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "font-medium" }, "Mixed entries detected"), /* @__PURE__ */ React.createElement("div", { className: "mt-0.5 opacity-80" }, "P&L is calculated only from entries with quantities.", holdings.untrackedCost > 0 && /* @__PURE__ */ React.createElement("span", { className: "block mt-1" }, "Tracked: ", formatMoney(holdings.trackedCost), " (", holdings.totalQuantity.toLocaleString(void 0, { maximumFractionDigits: 4 }), " units)", /* @__PURE__ */ React.createElement("br", null), "Untracked: ", formatMoney(holdings.untrackedCost), " (no qty)"))))), !holdings.hasTrackedHoldings && holdings.untrackedCost > 0 && /* @__PURE__ */ React.createElement("div", { className: `p-2 rounded-lg text-xs ${darkMode ? "bg-blue-900/20 text-blue-400" : "bg-blue-50 text-blue-600"}` }, /* @__PURE__ */ React.createElement("div", { className: "flex items-start gap-2" }, /* @__PURE__ */ React.createElement("span", null, "\u2139\uFE0F"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "font-medium" }, "No quantity data"), /* @__PURE__ */ React.createElement("div", { className: "mt-0.5 opacity-80" }, "Add quantities to your buys to enable P&L tracking.")))), (() => {
        const history = getInvestmentHistory(asset);
        const itemsPerPage = 8;
        const currentPage = assetTransactionPages[asset] || 0;
        const totalPages = Math.ceil(history.length / itemsPerPage);
        const startIdx = currentPage * itemsPerPage;
        const paginatedHistory = history.slice(startIdx, startIdx + itemsPerPage);
        return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-1" }, /* @__PURE__ */ React.createElement("span", { className: `text-xs font-medium ${darkMode ? "text-gray-500" : "text-gray-400"}` }, "Recent Transactions"), totalPages > 1 && /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1" }, /* @__PURE__ */ React.createElement(
          "button",
          {
            onClick: (e) => {
              e.stopPropagation();
              setAssetTransactionPages({ ...assetTransactionPages, [asset]: Math.max(0, currentPage - 1) });
            },
            disabled: currentPage === 0,
            className: `px-2 py-0.5 text-xs font-bold rounded-lg transition-all ${currentPage === 0 ? "opacity-30 cursor-not-allowed" : "hover:scale-105 active:scale-95"} ${darkMode ? "text-purple-400" : "text-purple-500"}`
          },
          "\u2039 Prev"
        ), /* @__PURE__ */ React.createElement("span", { className: `text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}` }, currentPage + 1, "/", totalPages), /* @__PURE__ */ React.createElement(
          "button",
          {
            onClick: (e) => {
              e.stopPropagation();
              setAssetTransactionPages({ ...assetTransactionPages, [asset]: Math.min(totalPages - 1, currentPage + 1) });
            },
            disabled: currentPage >= totalPages - 1,
            className: `px-2 py-0.5 text-xs font-bold rounded-lg transition-all ${currentPage >= totalPages - 1 ? "opacity-30 cursor-not-allowed" : "hover:scale-105 active:scale-95"} ${darkMode ? "text-purple-400" : "text-purple-500"}`
          },
          "Next \u203A"
        ))), paginatedHistory.map((inv) => /* @__PURE__ */ React.createElement(
          "div",
          {
            key: inv.id,
            className: `flex items-center justify-between py-2 text-sm border-t ${deletingItems.has(inv.id) ? "delete-animation" : ""} ${darkMode ? "border-[#3D3A4E]/50" : "border-gray-100"}`,
            onTouchStart: (e) => handleLongPressStart(e, "investment", inv),
            onTouchEnd: handleLongPressEnd,
            onTouchMove: handleLongPressMove,
            onMouseDown: (e) => handleLongPressStart(e, "investment", inv),
            onMouseUp: handleLongPressEnd,
            onMouseLeave: handleLongPressEnd
          },
          /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("span", { className: `px-2 py-0.5 rounded-full text-xs font-bold ${inv.type === "sell" ? "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400" : "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"}` }, inv.type === "sell" ? "SELL" : "BUY"), /* @__PURE__ */ React.createElement("span", { className: darkMode ? "text-gray-400" : "text-gray-500" }, monthNames[inv.month], " ", inv.year)),
          /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement("div", { className: "text-right" }, /* @__PURE__ */ React.createElement("span", { className: `font-medium ${darkMode ? "text-gray-200" : "text-gray-700"}` }, formatMoney(inv.amount)), inv.quantity && /* @__PURE__ */ React.createElement("span", { className: `ml-1 text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}` }, "(", inv.quantity, " units)")), /* @__PURE__ */ React.createElement(
            "button",
            {
              onClick: (e) => {
                e.stopPropagation();
                removeInvestment(inv.id);
              },
              className: `p-1 rounded-lg transition-colors ${darkMode ? "text-gray-500 hover:text-red-400 hover:bg-red-900/20" : "text-gray-400 hover:text-red-500 hover:bg-red-50"}`
            },
            /* @__PURE__ */ React.createElement(X, { className: "w-4 h-4" })
          ))
        )));
      })()))));
    })))), uniqueAssets.length === 0 && /* @__PURE__ */ React.createElement(CandyCard, { darkMode }, /* @__PURE__ */ React.createElement(EmptyState, { darkMode, icon: "\u{1F4C8}", title: "No investments yet", subtitle: "Start building your portfolio!" }))),
    viewMode === "budget" && /* @__PURE__ */ React.createElement("div", { className: `space-y-6 tab-content ${swipeDirection === "left" ? "slide-left-exit" : swipeDirection === "right" ? "slide-right-exit" : "active"}` }, /* @__PURE__ */ React.createElement(CandyCard, { darkMode }, /* @__PURE__ */ React.createElement("h2", { className: `text-sm font-bold uppercase tracking-wider mb-6 ${darkMode ? "text-gray-400" : "text-gray-500"}` }, "Log Expense"), /* @__PURE__ */ React.createElement("div", { className: "expense-grid" }, /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: `block text-xs font-bold uppercase tracking-wider mb-3 ${darkMode ? "text-gray-500" : "text-gray-400"}` }, "Amount"), /* @__PURE__ */ React.createElement("div", { className: `relative rounded-2xl overflow-hidden ${darkMode ? "bg-[#1E1B2E]" : "bg-gray-50"}` }, /* @__PURE__ */ React.createElement("span", { className: `absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold ${darkMode ? "text-gray-500" : "text-gray-400"}` }, "$"), /* @__PURE__ */ React.createElement(
      "input",
      {
        ref: expenseAmountRef,
        id: "expense-amount",
        type: "text",
        inputMode: "decimal",
        placeholder: "0.00",
        value: expenseAmount ? formatNumberInput(expenseAmount) : "",
        onChange: (e) => setExpenseAmount(parseFormattedNumber(e.target.value)),
        onKeyDown: (e) => (e.key === "Enter" || e.keyCode === 13) && addExpense(),
        className: `w-full pl-10 pr-4 py-4 text-lg font-bold bg-transparent outline-none ${darkMode ? "text-gray-100 placeholder-gray-600" : "text-gray-700 placeholder-gray-300"} ${shakeField === "expense-amount" ? "shake" : ""}`
      }
    ))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: `block text-xs font-bold uppercase tracking-wider mb-2 ${darkMode ? "text-gray-500" : "text-gray-400"}` }, "Notes ", /* @__PURE__ */ React.createElement("span", { className: "font-normal opacity-60" }, "(optional)")), /* @__PURE__ */ React.createElement(
      "input",
      {
        placeholder: "e.g., Lunch at cafe",
        value: expenseNotes,
        onChange: (e) => setExpenseNotes(e.target.value),
        onKeyDown: (e) => (e.key === "Enter" || e.keyCode === 13) && addExpense(),
        className: `w-full px-4 py-3 rounded-2xl text-sm font-medium bg-transparent outline-none transition-colors ${darkMode ? "bg-[#1E1B2E] text-gray-100 placeholder-gray-600" : "bg-gray-50 text-gray-700 placeholder-gray-400"}`
      }
    ))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: `block text-xs font-bold uppercase tracking-wider mb-3 ${darkMode ? "text-gray-500" : "text-gray-400"}` }, "Category"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-3 gap-2" }, EXPENSE_CATEGORIES.map((cat) => {
      const isSelected = expenseCategory === cat;
      const style = CATEGORY_STYLES[cat];
      return /* @__PURE__ */ React.createElement(
        "button",
        {
          key: cat,
          onClick: () => setExpenseCategory(cat),
          className: `px-3 py-3 rounded-xl font-bold text-sm transition-all press-feedback ${isSelected ? "text-white shadow-lg scale-105" : darkMode ? "bg-[#1E1B2E] text-gray-400 hover:text-gray-200 hover:bg-[#2D2A3E]" : "bg-gray-100 text-gray-500 hover:text-gray-700 hover:bg-gray-200"}`,
          style: isSelected ? {
            background: `linear-gradient(135deg, ${style.color}, ${style.color}dd)`,
            boxShadow: `0 4px 15px ${style.color}50`
          } : {}
        },
        /* @__PURE__ */ React.createElement("span", { className: "flex items-center justify-center gap-2" }, /* @__PURE__ */ React.createElement("span", { className: "text-lg" }, style.icon), /* @__PURE__ */ React.createElement("span", { className: "uppercase tracking-wide" }, cat))
      );
    }))), /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: `block text-xs font-bold uppercase tracking-wider mb-3 ${darkMode ? "text-gray-500" : "text-gray-400"}` }, "Date"), /* @__PURE__ */ React.createElement("div", { className: `relative rounded-2xl overflow-hidden ${darkMode ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-500/30" : "bg-gradient-to-r from-violet-400/15 to-pink-400/15 border-2 border-violet-400/30"}` }, /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "date",
        value: expenseDate,
        onChange: (e) => setExpenseDate(e.target.value),
        className: `w-full px-4 py-4 text-center font-bold bg-transparent outline-none cursor-pointer ${darkMode ? "text-gray-100" : "text-gray-700"}`
      }
    ))), /* @__PURE__ */ React.createElement("div", { className: "flex gap-2" }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: addExpense,
        className: `flex-1 group flex items-center justify-center gap-2 px-4 py-4 rounded-2xl font-bold text-white transition-all hover:scale-105 active:scale-95 btn-press border-2 border-emerald-300/30 ${successButton === "add-expense" ? "success-flash" : ""}`,
        style: {
          background: successButton === "add-expense" ? "linear-gradient(135deg, #34D399, #10B981)" : "linear-gradient(to right, #34D399, #2DD4BF, #22D3EE)",
          boxShadow: successButton === "add-expense" ? "0 4px 20px rgba(52, 211, 153, 0.4)" : "0 4px 20px rgba(52, 211, 153, 0.3)"
        }
      },
      successButton === "add-expense" ? /* @__PURE__ */ React.createElement(Check, { className: "w-5 h-5" }) : /* @__PURE__ */ React.createElement(Plus, { className: "w-5 h-5" }),
      /* @__PURE__ */ React.createElement("span", { className: "uppercase tracking-wider text-sm" }, successButton === "add-expense" ? "Logged!" : "Log")
    ), (expenseAmount || expenseNotes) && /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: clearExpenseForm,
        className: `px-4 py-4 rounded-2xl font-bold text-sm transition-all press-feedback ${darkMode ? "bg-[#1E1B2E] text-gray-400 hover:text-gray-200" : "bg-gray-100 text-gray-500 hover:text-gray-700"}`
      },
      /* @__PURE__ */ React.createElement(X, { className: "w-5 h-5" })
    ))))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4" }, /* @__PURE__ */ React.createElement(
      StatBubble,
      {
        darkMode,
        icon: /* @__PURE__ */ React.createElement(Receipt, { className: "w-6 h-6" }),
        label: "This Month",
        value: formatMoney(getTotalExpensesForMonth()),
        color: "orange",
        pop: popTotal === "expense-total"
      }
    ), /* @__PURE__ */ React.createElement(
      StatBubble,
      {
        darkMode,
        icon: /* @__PURE__ */ React.createElement(Calendar, { className: "w-6 h-6" }),
        label: "Daily Average",
        value: formatMoney(getTotalExpensesForMonth() / new Date(selectedBudgetYear, selectedBudgetMonth + 1, 0).getDate()),
        color: "blue"
      }
    )), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-4" }, EXPENSE_CATEGORIES.map((cat) => {
      const style = CATEGORY_STYLES[cat];
      const total = getCategoryTotal(cat);
      return /* @__PURE__ */ React.createElement(
        "div",
        {
          key: cat,
          className: `card-lift p-4 rounded-2xl border-2 transition-all ${darkMode ? "border-opacity-30" : ""}`,
          style: {
            backgroundColor: darkMode ? `${style.color}15` : style.bg,
            borderColor: `${style.color}${darkMode ? "40" : "40"}`
          }
        },
        /* @__PURE__ */ React.createElement("div", { className: "text-3xl mb-2" }, style.icon),
        /* @__PURE__ */ React.createElement("p", { className: `font-bold text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}` }, cat),
        /* @__PURE__ */ React.createElement("p", { className: "text-xl font-black", style: { color: style.color } }, formatMoney(total))
      );
    })), /* @__PURE__ */ React.createElement(CandyCard, { darkMode }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap items-center justify-between gap-4 mb-4" }, /* @__PURE__ */ React.createElement("h3", { className: `text-lg font-bold ${darkMode ? "text-gray-100" : "text-gray-700"}` }, "Spending Breakdown"), /* @__PURE__ */ React.createElement(
      MonthYearSelector,
      {
        month: selectedBudgetMonth,
        year: selectedBudgetYear,
        setMonth: setSelectedBudgetMonth,
        setYear: setSelectedBudgetYear,
        darkMode,
        variant: "purple"
      }
    )), getBudgetPieData().length > 0 ? /* @__PURE__ */ React.createElement(ResponsiveContainer, { width: "100%", height: 250 }, /* @__PURE__ */ React.createElement(RechartsPie, null, /* @__PURE__ */ React.createElement(
      Pie,
      {
        data: getBudgetPieData(),
        dataKey: "value",
        nameKey: "name",
        cx: "50%",
        cy: "50%",
        outerRadius: 80,
        innerRadius: 50,
        paddingAngle: 5
      },
      getBudgetPieData().map((entry) => /* @__PURE__ */ React.createElement(Cell, { key: entry.name, fill: CATEGORY_STYLES[entry.name]?.color || "#999" }))
    ), /* @__PURE__ */ React.createElement(Tooltip, { formatter: (value) => formatMoney(value) }), /* @__PURE__ */ React.createElement(Legend, null))) : /* @__PURE__ */ React.createElement(EmptyState, { darkMode, icon: "\u{1F4CA}", title: "No expenses this month", subtitle: "Start tracking to see your breakdown!" })), /* @__PURE__ */ React.createElement(CandyCard, { darkMode }, (() => {
      const recentExpenses = getRecentExpenses();
      const itemsPerPage = 20;
      const totalPages = Math.ceil(recentExpenses.length / itemsPerPage);
      const startIdx = expensePage * itemsPerPage;
      const paginatedExpenses = recentExpenses.slice(startIdx, startIdx + itemsPerPage);
      return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-4" }, /* @__PURE__ */ React.createElement("h3", { className: `text-lg font-bold ${darkMode ? "text-gray-100" : "text-gray-700"}` }, "Recent Expenses"), totalPages > 1 && /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: () => setExpensePage(Math.max(0, expensePage - 1)),
          disabled: expensePage === 0,
          className: `px-3 py-1 text-sm font-bold rounded-xl transition-all ${expensePage === 0 ? "opacity-30 cursor-not-allowed" : "hover:scale-105 active:scale-95"} ${darkMode ? "text-purple-400" : "text-purple-500"}`
        },
        "\u2039 Prev"
      ), /* @__PURE__ */ React.createElement("span", { className: `text-sm ${darkMode ? "text-gray-500" : "text-gray-400"}` }, expensePage + 1, "/", totalPages), /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: () => setExpensePage(Math.min(totalPages - 1, expensePage + 1)),
          disabled: expensePage >= totalPages - 1,
          className: `px-3 py-1 text-sm font-bold rounded-xl transition-all ${expensePage >= totalPages - 1 ? "opacity-30 cursor-not-allowed" : "hover:scale-105 active:scale-95"} ${darkMode ? "text-purple-400" : "text-purple-500"}`
        },
        "Next \u203A"
      ))), paginatedExpenses.length > 0 ? /* @__PURE__ */ React.createElement("div", { className: "space-y-2 max-h-[500px] overflow-y-auto" }, paginatedExpenses.map((exp) => {
        const style = CATEGORY_STYLES[exp.category];
        return /* @__PURE__ */ React.createElement(
          "div",
          {
            key: exp.id,
            className: `flex items-center justify-between p-3 rounded-xl border-2 transition-all hover:shadow-md ${deletingItems.has(exp.id) ? "delete-animation" : ""} ${newItemId === exp.id ? "fade-in-up" : ""}`,
            style: {
              backgroundColor: darkMode ? `${style.color}15` : style.bg,
              borderColor: `${style.color}30`
            },
            onTouchStart: (e) => handleLongPressStart(e, "expense", exp),
            onTouchEnd: handleLongPressEnd,
            onTouchMove: handleLongPressMove,
            onMouseDown: (e) => handleLongPressStart(e, "expense", exp),
            onMouseUp: handleLongPressEnd,
            onMouseLeave: handleLongPressEnd
          },
          /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement("span", { className: "text-2xl" }, style.icon), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: `font-bold ${darkMode ? "text-gray-100" : "text-gray-700"}` }, exp.category), /* @__PURE__ */ React.createElement("p", { className: `text-sm ${darkMode ? "text-gray-500" : "text-gray-400"}` }, formatDateDisplay(exp.date)), exp.notes && /* @__PURE__ */ React.createElement("p", { className: `text-xs mt-1 italic ${darkMode ? "text-gray-500" : "text-gray-400"}` }, '"', exp.notes, '"'))),
          /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement("span", { className: "font-black text-lg", style: { color: style.color } }, formatMoney(exp.amount)), /* @__PURE__ */ React.createElement(
            "button",
            {
              onClick: () => removeExpense(exp.id),
              className: `w-10 h-10 rounded-full flex items-center justify-center transition-all touch-target press-feedback ${darkMode ? "bg-red-900/30 text-red-400 hover:bg-red-900/50 hover:text-red-300" : "bg-white/80 text-red-400 hover:bg-red-100 hover:text-red-600"}`
            },
            /* @__PURE__ */ React.createElement(X, { className: "w-5 h-5" })
          ))
        );
      })) : /* @__PURE__ */ React.createElement(EmptyState, { darkMode, icon: "\u{1F4B8}", title: "No expenses yet", subtitle: "Add your first expense!" }));
    })()), /* @__PURE__ */ React.createElement(CandyCard, { darkMode }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-4" }, /* @__PURE__ */ React.createElement("h3", { className: `text-lg font-bold ${darkMode ? "text-gray-100" : "text-gray-700"}` }, "Recurring Expenses"), /* @__PURE__ */ React.createElement("div", { className: "flex gap-2" }, /* @__PURE__ */ React.createElement(CandyButton, { variant: "ghost", size: "sm", onClick: () => setShowRecurringModal(true) }, /* @__PURE__ */ React.createElement(Plus, { className: "w-4 h-4" }), " Add"), recurringExpenses.length > 0 && /* @__PURE__ */ React.createElement(CandyButton, { variant: "success", size: "sm", onClick: applyRecurringExpenses }, /* @__PURE__ */ React.createElement(Zap, { className: "w-4 h-4" }), " Apply All"))), getUpcomingBills().length > 0 && /* @__PURE__ */ React.createElement("div", { className: `mb-4 p-4 rounded-2xl border-2 ${darkMode ? "bg-amber-900/20 border-amber-500/30" : "bg-amber-50 border-amber-200"}` }, /* @__PURE__ */ React.createElement("h4", { className: `text-sm font-bold mb-3 flex items-center gap-2 ${darkMode ? "text-amber-400" : "text-amber-600"}` }, /* @__PURE__ */ React.createElement(Calendar, { className: "w-4 h-4" }), " Due Soon"), /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, getUpcomingBills().map((bill) => /* @__PURE__ */ React.createElement("div", { key: bill.id, className: `flex items-center justify-between p-2 rounded-xl ${darkMode ? "bg-[#1E1B2E]" : "bg-white"}` }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("span", { className: "text-lg" }, CATEGORY_STYLES[bill.category]?.icon), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: `font-bold text-sm ${darkMode ? "text-gray-100" : "text-gray-700"}` }, bill.name), /* @__PURE__ */ React.createElement("p", { className: `text-xs ${bill.isOverdue ? "text-rose-500 font-bold" : bill.daysUntilDue <= 3 ? "text-amber-500" : darkMode ? "text-gray-500" : "text-gray-400"}` }, bill.isOverdue ? `\u26A0\uFE0F Overdue by ${Math.abs(bill.daysUntilDue)} days` : bill.daysUntilDue === 0 ? "\u{1F4C5} Due today!" : bill.daysUntilDue === 1 ? "\u{1F4C5} Due tomorrow" : `\u{1F4C5} Due in ${bill.daysUntilDue} days`))), /* @__PURE__ */ React.createElement("span", { className: `font-bold ${darkMode ? "text-gray-100" : "text-gray-700"}` }, formatMoney(bill.amount)))))), recurringExpenses.length > 0 ? /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, recurringExpenses.map((rec) => {
      const today = (/* @__PURE__ */ new Date()).getDate();
      const daysUntil = rec.dayOfMonth >= today ? rec.dayOfMonth - today : new Date((/* @__PURE__ */ new Date()).getFullYear(), (/* @__PURE__ */ new Date()).getMonth() + 1, 0).getDate() - today + rec.dayOfMonth;
      return /* @__PURE__ */ React.createElement("div", { key: rec.id, className: `flex items-center justify-between p-3 rounded-xl ${darkMode ? "bg-[#1E1B2E]" : "bg-gray-50"}` }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement("span", { className: "text-xl" }, CATEGORY_STYLES[rec.category]?.icon), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: `font-bold ${darkMode ? "text-gray-100" : "text-gray-700"}` }, rec.name), /* @__PURE__ */ React.createElement("p", { className: `text-sm ${darkMode ? "text-gray-500" : "text-gray-400"}` }, "Day ", rec.dayOfMonth, " \u2022 ", rec.category))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement("span", { className: `font-bold ${darkMode ? "text-gray-100" : "text-gray-700"}` }, formatMoney(rec.amount)), /* @__PURE__ */ React.createElement("button", { onClick: () => removeRecurringExpense(rec.id), className: "text-red-400 hover:text-red-600 press-feedback" }, /* @__PURE__ */ React.createElement(X, { className: "w-5 h-5" }))));
    })) : /* @__PURE__ */ React.createElement("p", { className: `text-center py-4 ${darkMode ? "text-gray-500" : "text-gray-400"}` }, "No recurring expenses set up"))),
    viewMode === "clockin" && /* @__PURE__ */ React.createElement("div", { className: `space-y-6 tab-content ${swipeDirection === "left" ? "slide-left-exit" : swipeDirection === "right" ? "slide-right-exit" : "active"}` }, /* @__PURE__ */ React.createElement(CandyCard, { darkMode }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap items-center justify-between gap-4 mb-4" }, /* @__PURE__ */ React.createElement("h2", { className: `text-xl font-black flex items-center gap-2 ${darkMode ? "text-gray-100" : "text-gray-700"}` }, /* @__PURE__ */ React.createElement("span", { className: "text-2xl" }, "\u23F0"), " Log Work Hours"), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, getYesterdayWorkLog() && /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: fillFromYesterday,
        className: `px-3 py-2 rounded-xl text-xs font-bold transition-all press-feedback ${darkMode ? "bg-purple-900/30 text-purple-400 hover:bg-purple-900/50" : "bg-purple-50 text-purple-600 hover:bg-purple-100"}`
      },
      "\u{1F4CB} Same as Yesterday"
    ), /* @__PURE__ */ React.createElement("div", { className: `flex rounded-xl overflow-hidden border-2 ${darkMode ? "border-[#3D3A4E]" : "border-gray-200"}` }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setWorkMode("hours"),
        className: `px-3 py-2 text-xs font-bold transition-all ${workMode === "hours" ? "bg-gradient-to-r from-emerald-400 to-teal-400 text-white" : darkMode ? "text-gray-400 hover:bg-white/5" : "text-gray-500 hover:bg-gray-50"}`
      },
      "Hours"
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setWorkMode("clock"),
        className: `px-3 py-2 text-xs font-bold transition-all ${workMode === "clock" ? "bg-gradient-to-r from-emerald-400 to-teal-400 text-white" : darkMode ? "text-gray-400 hover:bg-white/5" : "text-gray-500 hover:bg-gray-50"}`
      },
      "Clock In/Out"
    )))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4" }, workMode === "hours" ? /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: `block text-sm font-bold mb-2 ${darkMode ? "text-gray-400" : "text-gray-500"}` }, "Hours"), /* @__PURE__ */ React.createElement(
      "input",
      {
        ref: workHoursRef,
        id: "work-hours",
        type: "number",
        placeholder: "8",
        value: workHours,
        onChange: (e) => setWorkHours(e.target.value),
        onKeyDown: (e) => (e.key === "Enter" || e.keyCode === 13) && addWorkLog(),
        className: `candy-input ${darkMode ? "candy-input-dark" : "candy-input-light"} ${shakeField === "work-hours" ? "shake border-red-400" : ""}`
      }
    )) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: `block text-sm font-bold mb-2 ${darkMode ? "text-gray-400" : "text-gray-500"}` }, "Clock In"), /* @__PURE__ */ React.createElement(
      CandyTimeInput,
      {
        darkMode,
        value: clockInTime,
        onChange: (e) => setClockInTime(e.target.value),
        className: shakeField === "clock-in" ? "shake" : ""
      }
    )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: `block text-sm font-bold mb-2 ${darkMode ? "text-gray-400" : "text-gray-500"}` }, "Clock Out"), /* @__PURE__ */ React.createElement(
      CandyTimeInput,
      {
        darkMode,
        value: clockOutTime,
        onChange: (e) => setClockOutTime(e.target.value),
        className: shakeField === "clock-out" ? "shake" : ""
      }
    ), clockInTime && clockOutTime && /* @__PURE__ */ React.createElement("p", { className: `text-xs mt-1 font-medium ${darkMode ? "text-emerald-400" : "text-emerald-600"}` }, "= ", calculateHoursFromTimes(clockInTime, clockOutTime), "h"))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-2" }, /* @__PURE__ */ React.createElement("div", { className: `flex rounded-xl overflow-hidden border-2 ${darkMode ? "border-[#3D3A4E]" : "border-gray-200"}` }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setJobInputMode("manual"),
        className: `px-3 py-1 text-xs font-bold transition-all ${jobInputMode === "manual" ? "bg-gradient-to-r from-purple-400 to-pink-400 text-white" : darkMode ? "text-gray-400 hover:bg-white/5" : "text-gray-500 hover:bg-gray-50"}`
      },
      "Job/Client"
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setJobInputMode("quick"),
        className: `px-3 py-1 text-xs font-bold transition-all ${jobInputMode === "quick" ? "bg-gradient-to-r from-purple-400 to-pink-400 text-white" : darkMode ? "text-gray-400 hover:bg-white/5" : "text-gray-500 hover:bg-gray-50"}`
      },
      "Quick Jobs"
    ))), jobInputMode === "manual" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
      "input",
      {
        id: "work-job",
        placeholder: "e.g., Freelance",
        value: workJob,
        onChange: (e) => setWorkJob(e.target.value),
        list: "job-names",
        className: `candy-input ${darkMode ? "candy-input-dark" : "candy-input-light"} ${shakeField === "work-job" ? "shake border-red-400" : ""}`
      }
    ), /* @__PURE__ */ React.createElement("datalist", { id: "job-names" }, getUniqueJobs().map((j) => /* @__PURE__ */ React.createElement("option", { key: j, value: j })))), jobInputMode === "quick" && /* @__PURE__ */ React.createElement("div", { className: "flex gap-2" }, quickJobs.map((job, idx) => /* @__PURE__ */ React.createElement("div", { key: idx, className: "flex-1 relative group" }, editingQuickJob === idx ? /* @__PURE__ */ React.createElement(
      "input",
      {
        autoFocus: true,
        type: "text",
        value: job,
        onChange: (e) => {
          const newJobs = [...quickJobs];
          newJobs[idx] = e.target.value;
          setQuickJobs(newJobs);
        },
        onBlur: () => setEditingQuickJob(null),
        onKeyDown: (e) => {
          if (e.key === "Enter") setEditingQuickJob(null);
        },
        className: `w-full px-2 py-2.5 text-xs font-bold rounded-xl outline-none text-center ${darkMode ? "bg-[#252233] text-gray-100 border-2 border-purple-500" : "bg-white text-gray-700 border-2 border-purple-400"}`
      }
    ) : /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setWorkJob(job),
        onTouchEnd: (e) => {
          e.preventDefault();
          setWorkJob(job);
        },
        onDoubleClick: () => setEditingQuickJob(idx),
        className: `w-full px-2 py-2.5 text-xs font-bold rounded-xl transition-all press-feedback ${workJob === job ? "bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-lg scale-105" : darkMode ? "bg-[#252233] text-gray-300 hover:bg-[#2D2A3E] border-2 border-[#3D3A4E]" : "bg-gray-100 text-gray-600 hover:bg-gray-200 border-2 border-gray-200"}`
      },
      job
    ), editingQuickJob !== idx && /* @__PURE__ */ React.createElement(
      "div",
      {
        onClick: () => setEditingQuickJob(idx),
        className: `absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity ${darkMode ? "bg-purple-600 text-white" : "bg-purple-400 text-white"}`
      },
      /* @__PURE__ */ React.createElement(Edit3, { className: "w-2.5 h-2.5" })
    )))), jobInputMode === "quick" && workJob && /* @__PURE__ */ React.createElement("div", { className: `mt-2 text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}` }, "Selected: ", /* @__PURE__ */ React.createElement("span", { className: `font-bold ${darkMode ? "text-purple-400" : "text-purple-500"}` }, workJob))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: `block text-sm font-bold mb-2 ${darkMode ? "text-gray-400" : "text-gray-500"}` }, "Description"), /* @__PURE__ */ React.createElement(
      "input",
      {
        id: "work-desc",
        placeholder: "What did you do?",
        value: workDescription,
        onChange: (e) => setWorkDescription(e.target.value),
        className: `candy-input ${darkMode ? "candy-input-dark" : "candy-input-light"} ${shakeField === "work-desc" ? "shake border-red-400" : ""}`
      }
    )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: `block text-sm font-bold mb-2 ${darkMode ? "text-gray-400" : "text-gray-500"}` }, "Hourly Rate ($)"), /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "number",
        placeholder: jobRates[workJob] || "20",
        value: workHourlyRate,
        onChange: (e) => setWorkHourlyRate(e.target.value),
        className: `candy-input ${darkMode ? "candy-input-dark" : "candy-input-light"}`
      }
    )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: `block text-sm font-bold mb-2 ${darkMode ? "text-gray-400" : "text-gray-500"}` }, "Date"), /* @__PURE__ */ React.createElement(
      CandyDateInput,
      {
        darkMode,
        value: workDate,
        onChange: (e) => setWorkDate(e.target.value)
      }
    ))), /* @__PURE__ */ React.createElement("div", { className: "mt-4 flex justify-end gap-2" }, (workHours || workJob || workDescription || clockInTime || clockOutTime) && /* @__PURE__ */ React.createElement(CandyButton, { variant: "ghost", size: "sm", onClick: clearWorkForm, className: "press-feedback" }, /* @__PURE__ */ React.createElement(X, { className: "w-4 h-4" }), " Clear"), /* @__PURE__ */ React.createElement(
      CandyButton,
      {
        variant: "success",
        onClick: addWorkLog,
        className: `btn-press ${successButton === "add-work" ? "success-flash" : ""}`
      },
      successButton === "add-work" ? /* @__PURE__ */ React.createElement(Check, { className: "w-5 h-5" }) : /* @__PURE__ */ React.createElement(Plus, { className: "w-5 h-5" }),
      successButton === "add-work" ? "Logged!" : "Log Hours"
    ))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4" }, /* @__PURE__ */ React.createElement(
      StatBubble,
      {
        darkMode,
        icon: /* @__PURE__ */ React.createElement(Clock, { className: "w-6 h-6" }),
        label: "Hours This Month",
        value: `${getTotalHoursThisMonth()}h`,
        color: "blue",
        pop: popTotal === "work-total"
      }
    ), /* @__PURE__ */ React.createElement(
      StatBubble,
      {
        darkMode,
        icon: /* @__PURE__ */ React.createElement(DollarSign, { className: "w-6 h-6" }),
        label: "Earnings",
        value: formatMoney(getTotalEarningsThisMonth()),
        color: "green"
      }
    ), /* @__PURE__ */ React.createElement(
      StatBubble,
      {
        darkMode,
        icon: /* @__PURE__ */ React.createElement(Briefcase, { className: "w-6 h-6" }),
        label: "Jobs",
        value: getUniqueJobs().length,
        color: "purple"
      }
    )), /* @__PURE__ */ React.createElement(CandyCard, { darkMode }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap items-center justify-between gap-4 mb-4" }, /* @__PURE__ */ React.createElement("h3", { className: `text-lg font-bold ${darkMode ? "text-gray-100" : "text-gray-700"}` }, "Work History"), /* @__PURE__ */ React.createElement(
      MonthYearSelector,
      {
        month: selectedWorkMonth,
        year: selectedWorkYear,
        setMonth: setSelectedWorkMonth,
        setYear: setSelectedWorkYear,
        darkMode,
        variant: "purple"
      }
    )), getUniqueJobs().length === 0 ? /* @__PURE__ */ React.createElement(EmptyState, { darkMode, icon: "\u23F0", title: "No work logged yet", subtitle: "Start tracking your hours!" }) : /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, getUniqueJobs().map((job) => {
      const hours = getJobHoursThisMonth(job);
      const logs = getJobLogs(job);
      const isExpanded = expandedJobs[job];
      const earnings = logs.reduce((s, l) => s + l.hours * (l.hourlyRate || 0), 0);
      if (logs.length === 0) return null;
      return /* @__PURE__ */ React.createElement("div", { key: job, className: `border-2 rounded-2xl overflow-hidden ${darkMode ? "border-[#3D3A4E] bg-[#252233]" : "border-gray-100 bg-white"}` }, /* @__PURE__ */ React.createElement(
        "div",
        {
          className: `flex items-center justify-between p-4 cursor-pointer transition-colors press-feedback ${darkMode ? "hover:bg-white/5" : "hover:bg-gray-50"}`,
          onClick: () => setExpandedJobs({ ...expandedJobs, [job]: !isExpanded })
        },
        /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement("div", { className: `w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 ${isExpanded ? "rotate-90" : ""} ${isExpanded ? darkMode ? "bg-blue-900/30" : "bg-blue-100" : darkMode ? "bg-[#2D2A3E]" : "bg-gray-100"}` }, /* @__PURE__ */ React.createElement(ChevronRight, { className: `w-5 h-5 ${isExpanded ? "text-blue-500" : darkMode ? "text-gray-500" : "text-gray-400"}` })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: `font-bold ${darkMode ? "text-gray-100" : "text-gray-700"}` }, job), /* @__PURE__ */ React.createElement("p", { className: `text-sm ${darkMode ? "text-gray-500" : "text-gray-400"}` }, logs.length, " logs \u2022 ", hours, "h total"))),
        /* @__PURE__ */ React.createElement("span", { className: "text-xl font-black text-emerald-500" }, formatMoney(earnings))
      ), /* @__PURE__ */ React.createElement("div", { className: `accordion-content ${isExpanded ? "expanded" : ""}` }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: `border-t ${darkMode ? "border-[#3D3A4E] bg-[#1E1B2E]/50" : "border-gray-100 bg-gray-50/50"}` }, (() => {
        const itemsPerPage = 8;
        const currentPage = workLogPages[job] || 0;
        const totalPages = Math.ceil(logs.length / itemsPerPage);
        const startIdx = currentPage * itemsPerPage;
        const paginatedLogs = logs.slice(startIdx, startIdx + itemsPerPage);
        return /* @__PURE__ */ React.createElement(React.Fragment, null, totalPages > 1 && /* @__PURE__ */ React.createElement("div", { className: `flex items-center justify-between px-4 py-2 ${darkMode ? "bg-[#252233]" : "bg-gray-100"}` }, /* @__PURE__ */ React.createElement("span", { className: `text-xs font-medium ${darkMode ? "text-gray-500" : "text-gray-400"}` }, "Showing ", startIdx + 1, "-", Math.min(startIdx + itemsPerPage, logs.length), " of ", logs.length), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(
          "button",
          {
            onClick: (e) => {
              e.stopPropagation();
              setWorkLogPages({ ...workLogPages, [job]: Math.max(0, currentPage - 1) });
            },
            disabled: currentPage === 0,
            className: `px-2 py-1 text-xs font-bold rounded-lg transition-all ${currentPage === 0 ? "opacity-30 cursor-not-allowed" : "hover:scale-105 active:scale-95"} ${darkMode ? "text-purple-400" : "text-purple-500"}`
          },
          "\u2039 Prev"
        ), /* @__PURE__ */ React.createElement("span", { className: `text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}` }, currentPage + 1, "/", totalPages), /* @__PURE__ */ React.createElement(
          "button",
          {
            onClick: (e) => {
              e.stopPropagation();
              setWorkLogPages({ ...workLogPages, [job]: Math.min(totalPages - 1, currentPage + 1) });
            },
            disabled: currentPage >= totalPages - 1,
            className: `px-2 py-1 text-xs font-bold rounded-lg transition-all ${currentPage >= totalPages - 1 ? "opacity-30 cursor-not-allowed" : "hover:scale-105 active:scale-95"} ${darkMode ? "text-purple-400" : "text-purple-500"}`
          },
          "Next \u203A"
        ))), paginatedLogs.map((log) => /* @__PURE__ */ React.createElement(
          "div",
          {
            key: log.id,
            className: `flex items-center justify-between px-4 py-3 border-b last:border-0 ${deletingItems.has(log.id) ? "delete-animation" : ""} ${darkMode ? "border-[#3D3A4E]" : "border-gray-100"}`,
            onTouchStart: (e) => handleLongPressStart(e, "worklog", log),
            onTouchEnd: handleLongPressEnd,
            onTouchMove: handleLongPressMove,
            onMouseDown: (e) => handleLongPressStart(e, "worklog", log),
            onMouseUp: handleLongPressEnd,
            onMouseLeave: handleLongPressEnd
          },
          /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: `text-sm font-medium ${darkMode ? "text-gray-200" : "text-gray-700"}` }, log.description), /* @__PURE__ */ React.createElement("p", { className: `text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}` }, formatDateDisplay(log.date), " \u2022 ", log.hours, "h @ $", log.hourlyRate, "/hr")),
          /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement("span", { className: `font-bold ${darkMode ? "text-gray-100" : "text-gray-700"}` }, formatMoney(log.hours * (log.hourlyRate || 0))), /* @__PURE__ */ React.createElement(
            "button",
            {
              onClick: () => removeWorkLog(log.id),
              className: `w-10 h-10 rounded-full flex items-center justify-center transition-colors touch-target press-feedback ${darkMode ? "bg-red-900/30 text-red-400 hover:bg-red-900/50" : "bg-red-100 text-red-500 hover:bg-red-200"}`
            },
            /* @__PURE__ */ React.createElement(X, { className: "w-5 h-5" })
          ))
        )));
      })()))));
    })))),
    viewMode === "todos" && /* @__PURE__ */ React.createElement("div", { className: `space-y-6 tab-content ${swipeDirection === "left" ? "slide-left-exit" : swipeDirection === "right" ? "slide-right-exit" : "active"}` }, /* @__PURE__ */ React.createElement(CandyCard, { darkMode }, /* @__PURE__ */ React.createElement("h2", { className: `text-xl font-black mb-4 flex items-center gap-2 ${darkMode ? "text-gray-100" : "text-gray-700"}` }, /* @__PURE__ */ React.createElement("span", { className: "text-2xl" }, "\u2728"), " Add Task"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-4 gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "sm:col-span-2" }, /* @__PURE__ */ React.createElement("label", { className: `block text-sm font-bold mb-2 ${darkMode ? "text-gray-400" : "text-gray-500"}` }, "What needs doing?"), /* @__PURE__ */ React.createElement(
      "input",
      {
        ref: todoTextRef,
        id: "todo-text",
        placeholder: "e.g., Finish project proposal",
        value: todoText,
        onChange: (e) => setTodoText(e.target.value),
        onKeyDown: (e) => (e.key === "Enter" || e.keyCode === 13) && addTodo(),
        className: `candy-input ${darkMode ? "candy-input-dark" : "candy-input-light"} ${shakeField === "todo-text" ? "shake border-red-400" : ""}`
      }
    )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: `block text-sm font-bold mb-2 ${darkMode ? "text-gray-400" : "text-gray-500"}` }, "Date"), /* @__PURE__ */ React.createElement(
      CandyDateInput,
      {
        darkMode,
        value: todoDate,
        onChange: (e) => setTodoDate(e.target.value)
      }
    )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: `block text-sm font-bold mb-2 ${darkMode ? "text-gray-400" : "text-gray-500"}` }, "Time (optional)"), /* @__PURE__ */ React.createElement(
      CandyTimeInput,
      {
        darkMode,
        value: todoTime,
        onChange: (e) => setTodoTime(e.target.value)
      }
    ))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: `block text-sm font-bold mb-2 ${darkMode ? "text-gray-400" : "text-gray-500"}` }, "Priority"), /* @__PURE__ */ React.createElement("div", { className: `flex rounded-xl overflow-hidden border-2 ${darkMode ? "border-[#3D3A4E]" : "border-gray-200"}` }, ["low", "medium", "high"].map((p) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: p,
        onClick: () => setTodoPriority(p),
        className: `flex-1 px-3 py-2 text-xs font-bold transition-all capitalize ${todoPriority === p ? p === "high" ? "bg-rose-500/20 text-rose-500" : p === "medium" ? "bg-amber-500/20 text-amber-500" : "bg-emerald-500/20 text-emerald-500" : darkMode ? "text-gray-500 hover:bg-white/5" : "text-gray-400 hover:bg-gray-50"}`
      },
      p
    )))), /* @__PURE__ */ React.createElement("div", { className: "sm:col-span-2" }, /* @__PURE__ */ React.createElement("label", { className: `block text-sm font-bold mb-2 ${darkMode ? "text-gray-400" : "text-gray-500"}` }, "Link Expense (auto-log when completed)"), /* @__PURE__ */ React.createElement("div", { className: "flex gap-2" }, /* @__PURE__ */ React.createElement(
      "select",
      {
        value: todoLinkedExpense?.category || "",
        onChange: (e) => setTodoLinkedExpense(e.target.value ? { ...todoLinkedExpense, category: e.target.value, amount: todoLinkedExpense?.amount || 0 } : null),
        className: `flex-1 px-3 py-2 rounded-xl outline-none text-sm ${darkMode ? "bg-[#1E1B2E] text-gray-100 border-2 border-[#3D3A4E]" : "bg-gray-50 text-gray-700 border-2 border-gray-200"}`
      },
      /* @__PURE__ */ React.createElement("option", { value: "" }, "No linked expense"),
      Object.keys(CATEGORY_STYLES).map((cat) => /* @__PURE__ */ React.createElement("option", { key: cat, value: cat }, CATEGORY_STYLES[cat].icon, " ", cat))
    ), todoLinkedExpense && /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "number",
        placeholder: "$0",
        value: todoLinkedExpense?.amount || "",
        onChange: (e) => setTodoLinkedExpense({ ...todoLinkedExpense, amount: parseFloat(e.target.value) || 0 }),
        className: `w-24 px-3 py-2 rounded-xl outline-none text-sm ${darkMode ? "bg-[#1E1B2E] text-gray-100 border-2 border-[#3D3A4E]" : "bg-gray-50 text-gray-700 border-2 border-gray-200"}`
      }
    )))), /* @__PURE__ */ React.createElement("div", { className: "mt-4 flex justify-end gap-2" }, (todoText || todoTime || todoPriority !== "medium" || todoLinkedExpense) && /* @__PURE__ */ React.createElement(CandyButton, { variant: "ghost", size: "sm", onClick: clearTodoForm, className: "press-feedback" }, /* @__PURE__ */ React.createElement(X, { className: "w-4 h-4" }), " Clear"), /* @__PURE__ */ React.createElement(
      CandyButton,
      {
        onClick: addTodo,
        className: `btn-press ${successButton === "add-todo" ? "success-flash" : ""}`
      },
      successButton === "add-todo" ? /* @__PURE__ */ React.createElement(Check, { className: "w-5 h-5" }) : /* @__PURE__ */ React.createElement(Plus, { className: "w-5 h-5" }),
      successButton === "add-todo" ? "Added!" : "Add Task"
    ))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4" }, /* @__PURE__ */ React.createElement(StatBubble, { darkMode, icon: /* @__PURE__ */ React.createElement(ListTodo, { className: "w-6 h-6" }), label: "Total", value: getTodoStats().total, color: "blue" }), /* @__PURE__ */ React.createElement(StatBubble, { darkMode, icon: /* @__PURE__ */ React.createElement(Check, { className: "w-6 h-6" }), label: "Done", value: getTodoStats().completed, color: "green" }), /* @__PURE__ */ React.createElement(StatBubble, { darkMode, icon: /* @__PURE__ */ React.createElement(Clock, { className: "w-6 h-6" }), label: "Pending", value: getTodoStats().pending, color: "orange" }), /* @__PURE__ */ React.createElement(StatBubble, { darkMode, icon: /* @__PURE__ */ React.createElement(Target, { className: "w-6 h-6" }), label: "Overdue", value: getTodoStats().overdue, color: "pink" })), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-2" }, /* @__PURE__ */ React.createElement(CandyButton, { variant: "ghost", size: "sm", onClick: () => setArchiveMode(!archiveMode) }, /* @__PURE__ */ React.createElement(Archive, { className: "w-4 h-4" }), archiveMode ? "Exit Archive Mode" : "Archive Mode"), archiveMode && /* @__PURE__ */ React.createElement(CandyButton, { variant: "success", size: "sm", onClick: archiveAllCompleted }, /* @__PURE__ */ React.createElement(Check, { className: "w-4 h-4" }), " Archive Completed"), /* @__PURE__ */ React.createElement(CandyButton, { variant: "ghost", size: "sm", onClick: () => setShowArchives(!showArchives) }, /* @__PURE__ */ React.createElement(Calendar, { className: "w-4 h-4" }), showArchives ? "Hide" : "View", " Archives")), /* @__PURE__ */ React.createElement(CandyCard, { darkMode }, /* @__PURE__ */ React.createElement("h3", { className: `text-lg font-bold mb-4 ${darkMode ? "text-gray-100" : "text-gray-700"}` }, "Your Tasks"), todos.length === 0 ? /* @__PURE__ */ React.createElement(EmptyState, { darkMode, icon: "\u2705", title: "All clear!", subtitle: "Add a task to get started" }) : /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, getTodosByDate().map((todo) => {
      const isOverdue = !todo.completed && todo.date < (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
      return /* @__PURE__ */ React.createElement(
        "div",
        {
          key: todo.id,
          className: `p-4 rounded-2xl border-2 transition-all ${deletingItems.has(todo.id) ? "delete-animation" : ""} ${todo.completed ? darkMode ? "bg-emerald-900/20 border-emerald-700" : "bg-emerald-50 border-emerald-200" : isOverdue ? darkMode ? "bg-red-900/20 border-red-700" : "bg-red-50 border-red-200" : darkMode ? "bg-[#252233] border-[#3D3A4E]" : "bg-white border-gray-100"} ${newItemId === todo.id ? "fade-in-up" : ""}`
        },
        /* @__PURE__ */ React.createElement("div", { className: "flex items-start gap-3" }, /* @__PURE__ */ React.createElement("div", { className: "checkbox-sparkles relative" }, /* @__PURE__ */ React.createElement(
          "button",
          {
            onClick: (e) => {
              const container2 = e.currentTarget.parentElement;
              if (!todo.completed) {
                container2.classList.add("sparkle-active");
                setTimeout(() => container2.classList.remove("sparkle-active"), 500);
              }
              toggleTodo(todo.id);
            },
            className: `w-8 h-8 rounded-xl flex items-center justify-center transition-all flex-shrink-0 touch-target-sm press-feedback ${todo.completed ? "bg-emerald-500 text-white checkbox-burst" : darkMode ? "border-2 border-gray-600 hover:border-emerald-400 hover:bg-emerald-900/20" : "border-2 border-gray-300 hover:border-emerald-400 hover:bg-emerald-50"}`
          },
          todo.completed && /* @__PURE__ */ React.createElement(Check, { className: "w-5 h-5 check-pop" })
        )), /* @__PURE__ */ React.createElement("div", { className: "flex-1" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, todo.priority && todo.priority !== "medium" && /* @__PURE__ */ React.createElement("span", { className: `w-2 h-2 rounded-full flex-shrink-0 ${todo.priority === "high" ? "bg-rose-400" : "bg-emerald-400"}`, title: `${todo.priority} priority` }), /* @__PURE__ */ React.createElement("p", { className: `font-bold transition-all duration-300 ${todo.completed ? darkMode ? "text-gray-500 line-through" : "text-gray-400 line-through" : darkMode ? "text-gray-100" : "text-gray-700"}` }, todo.text)), /* @__PURE__ */ React.createElement("div", { className: `text-sm mt-1 flex flex-wrap items-center gap-x-2 ${darkMode ? "text-gray-500" : "text-gray-400"}` }, /* @__PURE__ */ React.createElement("span", null, formatDateDisplay(todo.date)), todo.time && /* @__PURE__ */ React.createElement("span", null, "at ", todo.time), isOverdue && /* @__PURE__ */ React.createElement("span", { className: "text-red-500 font-bold" }, "\u2022 Overdue!"), todo.linkedExpense && !todo.completed && /* @__PURE__ */ React.createElement("span", { className: `inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${darkMode ? "bg-purple-900/30 text-purple-400" : "bg-purple-100 text-purple-600"}` }, CATEGORY_STYLES[todo.linkedExpense.category]?.icon, " ", formatMoney(todo.linkedExpense.amount)), todo.linkedExpense && todo.completed && /* @__PURE__ */ React.createElement("span", { className: `inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${darkMode ? "bg-emerald-900/30 text-emerald-400" : "bg-emerald-100 text-emerald-600"}` }, "\u2713 Logged ", formatMoney(todo.linkedExpense.amount))), todo.subtasks.length > 0 && /* @__PURE__ */ React.createElement("div", { className: `mt-3 pl-4 border-l-2 space-y-2 ${darkMode ? "border-gray-600" : "border-gray-200"}` }, todo.subtasks.map((sub) => /* @__PURE__ */ React.createElement("div", { key: sub.id, className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("div", { className: "checkbox-sparkles relative" }, /* @__PURE__ */ React.createElement(
          "button",
          {
            onClick: (e) => {
              const container2 = e.currentTarget.parentElement;
              if (!sub.completed) {
                container2.classList.add("sparkle-active");
                setTimeout(() => container2.classList.remove("sparkle-active"), 500);
              }
              toggleSubtask(todo.id, sub.id);
            },
            className: `w-6 h-6 rounded-lg flex items-center justify-center transition-all press-feedback ${sub.completed ? "bg-emerald-400 text-white checkbox-burst" : darkMode ? "border-2 border-gray-600 hover:border-emerald-400" : "border-2 border-gray-300 hover:border-emerald-400"}`
          },
          sub.completed && /* @__PURE__ */ React.createElement(Check, { className: "w-3 h-3 check-pop" })
        )), /* @__PURE__ */ React.createElement("span", { className: `text-sm transition-all duration-300 ${sub.completed ? darkMode ? "text-gray-500 line-through" : "text-gray-400 line-through" : darkMode ? "text-gray-300" : "text-gray-600"}` }, sub.text), /* @__PURE__ */ React.createElement(
          "button",
          {
            onClick: () => removeSubtask(todo.id, sub.id),
            className: `ml-auto p-1 rounded transition-colors ${darkMode ? "text-gray-600 hover:text-red-400" : "text-gray-300 hover:text-red-400"}`
          },
          /* @__PURE__ */ React.createElement(X, { className: "w-4 h-4" })
        )))), addingSubtaskFor === todo.id ? /* @__PURE__ */ React.createElement("div", { className: "mt-3 flex gap-2" }, /* @__PURE__ */ React.createElement(
          "input",
          {
            placeholder: "Subtask...",
            value: subtaskText,
            onChange: (e) => setSubtaskText(e.target.value),
            onKeyDown: (e) => (e.key === "Enter" || e.keyCode === 13) && addSubtask(todo.id),
            className: `flex-1 text-sm py-2 px-3 rounded-xl outline-none ${darkMode ? "bg-[#1E1B2E] text-gray-100 placeholder-gray-500" : "bg-gray-100 text-gray-700 placeholder-gray-400"}`
          }
        ), /* @__PURE__ */ React.createElement(CandyButton, { size: "sm", onClick: () => addSubtask(todo.id) }, "Add"), /* @__PURE__ */ React.createElement(CandyButton, { variant: "ghost", size: "sm", onClick: () => setAddingSubtaskFor(null) }, "Cancel")) : /* @__PURE__ */ React.createElement(
          "button",
          {
            onClick: () => setAddingSubtaskFor(todo.id),
            className: "mt-2 text-sm text-gray-400 hover:text-pink-500 transition-colors"
          },
          "+ Add subtask"
        )), /* @__PURE__ */ React.createElement("div", { className: "flex gap-2" }, archiveMode && /* @__PURE__ */ React.createElement(
          "button",
          {
            onClick: () => archiveSingleTask(todo.id),
            className: `w-10 h-10 rounded-full flex items-center justify-center transition-colors touch-target press-feedback ${darkMode ? "bg-purple-900/30 text-purple-400 hover:bg-purple-900/50" : "bg-purple-100 text-purple-500 hover:bg-purple-200"}`
          },
          /* @__PURE__ */ React.createElement(Archive, { className: "w-5 h-5" })
        ), /* @__PURE__ */ React.createElement(
          "button",
          {
            onClick: () => removeTodo(todo.id),
            className: `w-10 h-10 rounded-full flex items-center justify-center transition-colors touch-target press-feedback ${darkMode ? "bg-red-900/30 text-red-400 hover:bg-red-900/50" : "bg-red-100 text-red-500 hover:bg-red-200"}`
          },
          /* @__PURE__ */ React.createElement(X, { className: "w-5 h-5" })
        )))
      );
    }))), showArchives && archivedTodos.length > 0 && /* @__PURE__ */ React.createElement(CandyCard, { darkMode }, /* @__PURE__ */ React.createElement("h3", { className: `text-lg font-bold mb-4 ${darkMode ? "text-gray-100" : "text-gray-700"}` }, "\u{1F4C1} Archived Tasks"), /* @__PURE__ */ React.createElement("div", { className: "space-y-3 max-h-96 overflow-y-auto" }, archivedTodos.sort((a, b) => b.date.localeCompare(a.date)).map((archive) => /* @__PURE__ */ React.createElement("div", { key: archive.date, className: "border-2 border-gray-100 rounded-xl overflow-hidden" }, /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "flex items-center justify-between p-3 bg-gray-50 cursor-pointer",
        onClick: () => setExpandedArchiveDates({ ...expandedArchiveDates, [archive.date]: !expandedArchiveDates[archive.date] })
      },
      /* @__PURE__ */ React.createElement("span", { className: "font-bold text-gray-600" }, formatDateDisplay(archive.date)),
      /* @__PURE__ */ React.createElement("span", { className: "text-sm text-gray-400" }, archive.todos.length, " tasks")
    ), expandedArchiveDates[archive.date] && /* @__PURE__ */ React.createElement("div", { className: "p-3 space-y-2" }, archive.todos.map((todo) => /* @__PURE__ */ React.createElement("div", { key: todo.id, className: "flex items-center gap-2 text-sm" }, /* @__PURE__ */ React.createElement("span", { className: todo.completed ? "text-emerald-500" : "text-gray-400" }, todo.completed ? "\u2705" : "\u2B1C"), /* @__PURE__ */ React.createElement("span", { className: todo.completed ? "text-gray-600" : "text-gray-400" }, todo.text))))))))),
    viewMode === "trends" && /* @__PURE__ */ React.createElement("div", { className: `space-y-6 tab-content ${swipeDirection === "left" ? "slide-left-exit" : swipeDirection === "right" ? "slide-right-exit" : "active"}`, ref: analyticsRef }, /* @__PURE__ */ React.createElement(CandyCard, { darkMode }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-4" }, /* @__PURE__ */ React.createElement("h2", { className: `text-xl font-black flex items-center gap-2 ${darkMode ? "text-gray-100" : "text-gray-700"}` }, /* @__PURE__ */ React.createElement("span", { className: "text-2xl" }, "\u{1F4CA}"), " Analytics Period"), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: captureAnalyticsScreenshot,
        disabled: isCapturing,
        className: `p-3 rounded-xl transition-all hover:scale-105 active:scale-95 ${isCapturing ? "opacity-50 cursor-not-allowed" : ""} ${darkMode ? "bg-blue-900/30 text-blue-400 hover:bg-blue-900/50" : "bg-blue-100 text-blue-600 hover:bg-blue-200"}`,
        title: "Screenshot Analytics"
      },
      isCapturing ? /* @__PURE__ */ React.createElement("div", { className: "w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" }) : /* @__PURE__ */ React.createElement(Camera, { className: "w-5 h-5" })
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => {
          const data = getTrendsData();
          const hoursData = getHoursWorkedData();
          let csv = "Month,Income,Expenses,Net,Hours Worked\n";
          data.forEach((row, idx) => {
            const hours = hoursData[idx]?.hours || 0;
            csv += `${row.name},${row.income},${row.expenses},${row.net},${hours}
`;
          });
          csv += `
Total Income,${data.reduce((s, r) => s + r.income, 0)}
`;
          csv += `Total Expenses,${data.reduce((s, r) => s + r.expenses, 0)}
`;
          csv += `Net Total,${data.reduce((s, r) => s + r.net, 0)}
`;
          csv += `Total Hours,${hoursData.reduce((s, r) => s + r.hours, 0)}
`;
          setAnalyticsExportData(csv);
          setShowAnalyticsExport(true);
        },
        className: `p-3 rounded-xl transition-all hover:scale-105 active:scale-95 ${darkMode ? "bg-purple-900/30 text-purple-400 hover:bg-purple-900/50" : "bg-purple-100 text-purple-600 hover:bg-purple-200"}`,
        title: "Export Analytics to CSV"
      },
      /* @__PURE__ */ React.createElement(Printer, { className: "w-5 h-5" })
    ))), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap items-center gap-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: `block text-sm font-bold mb-2 ${darkMode ? "text-gray-400" : "text-gray-500"}` }, "From"), /* @__PURE__ */ React.createElement(
      MonthYearSelector,
      {
        month: trendsStartMonth.month,
        year: trendsStartMonth.year,
        setMonth: (m) => setTrendsStartMonth({ ...trendsStartMonth, month: m }),
        setYear: (y) => setTrendsStartMonth({ ...trendsStartMonth, year: y }),
        variant: "purple",
        darkMode
      }
    )), /* @__PURE__ */ React.createElement("span", { className: "text-gray-400 font-bold mt-6" }, "\u2192"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: `block text-sm font-bold mb-2 ${darkMode ? "text-gray-400" : "text-gray-500"}` }, "To"), /* @__PURE__ */ React.createElement(
      MonthYearSelector,
      {
        month: trendsEndMonth.month,
        year: trendsEndMonth.year,
        setMonth: (m) => setTrendsEndMonth({ ...trendsEndMonth, month: m }),
        setYear: (y) => setTrendsEndMonth({ ...trendsEndMonth, year: y }),
        variant: "purple",
        darkMode
      }
    )))), /* @__PURE__ */ React.createElement(CandyCard, { darkMode }, /* @__PURE__ */ React.createElement("h2", { className: `text-xl font-black mb-4 flex items-center gap-2 ${darkMode ? "text-gray-100" : "text-gray-700"}` }, /* @__PURE__ */ React.createElement("span", { className: "text-2xl" }, "\u{1F48E}"), " Net Worth"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 md:grid-cols-5 gap-3 mb-6" }, /* @__PURE__ */ React.createElement("div", { className: `p-4 rounded-2xl text-center ${darkMode ? "bg-emerald-900/20 border-2 border-emerald-500/30" : "bg-emerald-50 border-2 border-emerald-200"}` }, /* @__PURE__ */ React.createElement("p", { className: `text-xs font-medium mb-1 ${darkMode ? "text-gray-400" : "text-gray-500"}` }, "Checking"), /* @__PURE__ */ React.createElement("p", { className: "text-xl font-bold text-emerald-500" }, formatMoney(getCurrentNetWorth().checking))), /* @__PURE__ */ React.createElement("div", { className: `p-4 rounded-2xl text-center ${darkMode ? "bg-blue-900/20 border-2 border-blue-500/30" : "bg-blue-50 border-2 border-blue-200"}` }, /* @__PURE__ */ React.createElement("p", { className: `text-xs font-medium mb-1 ${darkMode ? "text-gray-400" : "text-gray-500"}` }, "Investments"), /* @__PURE__ */ React.createElement("p", { className: "text-xl font-bold text-blue-500" }, formatMoney(getCurrentNetWorth().investments))), /* @__PURE__ */ React.createElement("div", { className: `p-4 rounded-2xl text-center ${darkMode ? "bg-purple-900/20 border-2 border-purple-500/30" : "bg-purple-50 border-2 border-purple-200"}` }, /* @__PURE__ */ React.createElement("p", { className: `text-xs font-medium mb-1 ${darkMode ? "text-gray-400" : "text-gray-500"}` }, "Total Assets"), /* @__PURE__ */ React.createElement("p", { className: "text-xl font-bold text-purple-500" }, formatMoney(getCurrentNetWorth().totalAssets))), /* @__PURE__ */ React.createElement("div", { className: `p-4 rounded-2xl text-center ${darkMode ? "bg-rose-900/20 border-2 border-rose-500/30" : "bg-rose-50 border-2 border-rose-200"}` }, /* @__PURE__ */ React.createElement("p", { className: `text-xs font-medium mb-1 ${darkMode ? "text-gray-400" : "text-gray-500"}` }, "Debt"), /* @__PURE__ */ React.createElement("p", { className: "text-xl font-bold text-rose-500" }, "-", formatMoney(getCurrentNetWorth().debt))), /* @__PURE__ */ React.createElement("div", { className: `p-4 rounded-2xl text-center col-span-2 md:col-span-1 ${getCurrentNetWorth().netWorth >= 0 ? darkMode ? "bg-gradient-to-br from-emerald-900/30 to-teal-900/30 border-2 border-emerald-500/50" : "bg-gradient-to-br from-emerald-100 to-teal-100 border-2 border-emerald-300" : darkMode ? "bg-gradient-to-br from-rose-900/30 to-pink-900/30 border-2 border-rose-500/50" : "bg-gradient-to-br from-rose-100 to-pink-100 border-2 border-rose-300"}` }, /* @__PURE__ */ React.createElement("p", { className: `text-xs font-medium mb-1 ${darkMode ? "text-gray-400" : "text-gray-500"}` }, "Net Worth"), /* @__PURE__ */ React.createElement("p", { className: `text-2xl font-black ${getCurrentNetWorth().netWorth >= 0 ? "text-emerald-500" : "text-rose-500"}` }, getCurrentNetWorth().netWorth >= 0 ? "" : "-", formatMoney(Math.abs(getCurrentNetWorth().netWorth))))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: `text-sm font-bold mb-3 ${darkMode ? "text-gray-400" : "text-gray-500"}` }, "Monthly Net Worth Trend"), getMonthlyNetWorth().length > 0 ? /* @__PURE__ */ React.createElement(ResponsiveContainer, { width: "100%", height: 250 }, /* @__PURE__ */ React.createElement(AreaChart, { data: getMonthlyNetWorth() }, /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("linearGradient", { id: "netWorthGradient", x1: "0", y1: "0", x2: "0", y2: "1" }, /* @__PURE__ */ React.createElement("stop", { offset: "5%", stopColor: "#10B981", stopOpacity: 0.4 }), /* @__PURE__ */ React.createElement("stop", { offset: "95%", stopColor: "#10B981", stopOpacity: 0 })), /* @__PURE__ */ React.createElement("linearGradient", { id: "assetsGradient", x1: "0", y1: "0", x2: "0", y2: "1" }, /* @__PURE__ */ React.createElement("stop", { offset: "5%", stopColor: "#8B5CF6", stopOpacity: 0.3 }), /* @__PURE__ */ React.createElement("stop", { offset: "95%", stopColor: "#8B5CF6", stopOpacity: 0 }))), /* @__PURE__ */ React.createElement(CartesianGrid, { strokeDasharray: "3 3", stroke: darkMode ? "#3D3A4E" : "#E8E4EE" }), /* @__PURE__ */ React.createElement(XAxis, { dataKey: "label", tick: { fill: darkMode ? "#9CA3AF" : "#6B6789", fontSize: 11 } }), /* @__PURE__ */ React.createElement(YAxis, { tick: { fill: darkMode ? "#9CA3AF" : "#6B6789", fontSize: 11 }, tickFormatter: (v) => `$${(v / 1e3).toFixed(0)}k` }), /* @__PURE__ */ React.createElement(
      Tooltip,
      {
        formatter: (value, name) => [formatMoney(value), name === "netWorth" ? "Net Worth" : name === "investments" ? "Investments" : name === "checking" ? "Checking" : "Debt"],
        contentStyle: {
          backgroundColor: darkMode ? "#252233" : "#fff",
          border: `2px solid ${darkMode ? "#3D3A4E" : "#E8E4EE"}`,
          borderRadius: "12px"
        }
      }
    ), /* @__PURE__ */ React.createElement(Area, { type: "monotone", dataKey: "netWorth", stroke: "#10B981", fill: "url(#netWorthGradient)", strokeWidth: 3, name: "netWorth" }))) : /* @__PURE__ */ React.createElement("div", { className: `text-center py-8 rounded-2xl ${darkMode ? "bg-[#1E1B2E]" : "bg-gray-50"}` }, /* @__PURE__ */ React.createElement("span", { className: "text-3xl mb-2 block" }, "\u{1F4CA}"), /* @__PURE__ */ React.createElement("p", { className: `text-sm ${darkMode ? "text-gray-500" : "text-gray-400"}` }, "Add investments or accounts to see your net worth trend"))), getCurrentNetWorth().totalAssets > 0 && /* @__PURE__ */ React.createElement("div", { className: "mt-4" }, /* @__PURE__ */ React.createElement("h3", { className: `text-sm font-bold mb-2 ${darkMode ? "text-gray-400" : "text-gray-500"}` }, "Asset Breakdown"), /* @__PURE__ */ React.createElement("div", { className: "h-4 rounded-full overflow-hidden flex" }, getCurrentNetWorth().checking > 0 && /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "bg-emerald-500 h-full",
        style: { width: `${getCurrentNetWorth().checking / getCurrentNetWorth().totalAssets * 100}%` },
        title: `Checking: ${formatMoney(getCurrentNetWorth().checking)}`
      }
    ), getCurrentNetWorth().investments > 0 && /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "bg-blue-500 h-full",
        style: { width: `${getCurrentNetWorth().investments / getCurrentNetWorth().totalAssets * 100}%` },
        title: `Investments: ${formatMoney(getCurrentNetWorth().investments)}`
      }
    )), /* @__PURE__ */ React.createElement("div", { className: "flex gap-4 mt-2 text-xs" }, /* @__PURE__ */ React.createElement("span", { className: "flex items-center gap-1" }, /* @__PURE__ */ React.createElement("span", { className: "w-3 h-3 rounded bg-emerald-500" }), /* @__PURE__ */ React.createElement("span", { className: darkMode ? "text-gray-400" : "text-gray-500" }, "Checking (", (getCurrentNetWorth().checking / getCurrentNetWorth().totalAssets * 100).toFixed(0), "%)")), /* @__PURE__ */ React.createElement("span", { className: "flex items-center gap-1" }, /* @__PURE__ */ React.createElement("span", { className: "w-3 h-3 rounded bg-blue-500" }), /* @__PURE__ */ React.createElement("span", { className: darkMode ? "text-gray-400" : "text-gray-500" }, "Investments (", (getCurrentNetWorth().investments / getCurrentNetWorth().totalAssets * 100).toFixed(0), "%)"))))), /* @__PURE__ */ React.createElement(CandyCard, { darkMode, className: "overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-4" }, /* @__PURE__ */ React.createElement("h2", { className: `text-xl font-black flex items-center gap-2 ${darkMode ? "text-gray-100" : "text-gray-700"}` }, /* @__PURE__ */ React.createElement("span", { className: "text-2xl" }, "\u{1F9E0}"), " Smart Insights"), /* @__PURE__ */ React.createElement("span", { className: `text-xs font-medium px-3 py-1 rounded-full ${darkMode ? "bg-purple-900/30 text-purple-400" : "bg-purple-100 text-purple-600"}` }, "AI-Powered")), getSmartInsights().length > 0 ? /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3" }, getSmartInsights().map((insight, idx) => /* @__PURE__ */ React.createElement(
      "div",
      {
        key: idx,
        className: `p-4 rounded-2xl border-2 transition-all hover:scale-[1.02] ${insight.type === "positive" ? darkMode ? "bg-emerald-900/20 border-emerald-500/30" : "bg-emerald-50 border-emerald-200" : insight.type === "warning" ? darkMode ? "bg-amber-900/20 border-amber-500/30" : "bg-amber-50 border-amber-200" : darkMode ? "bg-[#1E1B2E] border-[#3D3A4E]" : "bg-gray-50 border-gray-200"}`
      },
      /* @__PURE__ */ React.createElement("div", { className: "flex items-start gap-3" }, /* @__PURE__ */ React.createElement("span", { className: "text-2xl" }, insight.icon), /* @__PURE__ */ React.createElement("div", { className: "flex-1 min-w-0" }, /* @__PURE__ */ React.createElement("h4", { className: `font-bold text-sm ${insight.type === "positive" ? "text-emerald-600 dark:text-emerald-400" : insight.type === "warning" ? "text-amber-600 dark:text-amber-400" : darkMode ? "text-gray-200" : "text-gray-700"}` }, insight.title), /* @__PURE__ */ React.createElement("p", { className: `text-sm mt-1 ${darkMode ? "text-gray-300" : "text-gray-600"}` }, insight.message), /* @__PURE__ */ React.createElement("p", { className: `text-xs mt-2 font-medium ${insight.type === "positive" ? "text-emerald-500" : insight.type === "warning" ? "text-amber-500" : darkMode ? "text-gray-500" : "text-gray-400"}` }, insight.detail)))
    ))) : /* @__PURE__ */ React.createElement("div", { className: `text-center py-8 rounded-2xl ${darkMode ? "bg-[#1E1B2E]" : "bg-gray-50"}` }, /* @__PURE__ */ React.createElement("span", { className: "text-4xl mb-3 block" }, "\u{1F4CA}"), /* @__PURE__ */ React.createElement("p", { className: `font-bold ${darkMode ? "text-gray-300" : "text-gray-600"}` }, "Not enough data yet"), /* @__PURE__ */ React.createElement("p", { className: `text-sm mt-1 ${darkMode ? "text-gray-500" : "text-gray-400"}` }, "Keep tracking your income and expenses to unlock insights!")), (expenses.length > 0 || oneTimeIncomes.length > 0) && /* @__PURE__ */ React.createElement("div", { className: `mt-4 pt-4 border-t-2 ${darkMode ? "border-[#3D3A4E]" : "border-gray-100"}` }, /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4" }, (() => {
      const now = /* @__PURE__ */ new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();
      const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
      const daysElapsed = now.getDate();
      const thisMonthExpenses = expenses.filter((exp) => {
        const parts = exp.date.split("-");
        return parseInt(parts[1]) - 1 === currentMonth && parseInt(parts[0]) === currentYear;
      }).reduce((sum, e) => sum + e.amount, 0);
      const thisMonthIncome = oneTimeIncomes.filter((inc) => {
        const parts = inc.date.split("-");
        return parseInt(parts[1]) - 1 === currentMonth && parseInt(parts[0]) === currentYear;
      }).reduce((sum, i) => sum + i.amount, 0);
      const netIncome = thisMonthIncome - thisMonthExpenses;
      const savingsRate = thisMonthIncome > 0 ? netIncome / thisMonthIncome * 100 : 0;
      const dailyAvg = thisMonthExpenses / Math.max(daysElapsed, 1);
      const projected = dailyAvg * daysInMonth;
      return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: `p-3 rounded-xl text-center ${darkMode ? "bg-emerald-900/20" : "bg-emerald-50"}` }, /* @__PURE__ */ React.createElement("p", { className: `text-xs font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}` }, "Income"), /* @__PURE__ */ React.createElement("p", { className: "text-lg font-bold text-emerald-500" }, formatMoney(thisMonthIncome))), /* @__PURE__ */ React.createElement("div", { className: `p-3 rounded-xl text-center ${darkMode ? "bg-rose-900/20" : "bg-rose-50"}` }, /* @__PURE__ */ React.createElement("p", { className: `text-xs font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}` }, "Expenses"), /* @__PURE__ */ React.createElement("p", { className: "text-lg font-bold text-rose-500" }, formatMoney(thisMonthExpenses))), /* @__PURE__ */ React.createElement("div", { className: `p-3 rounded-xl text-center ${netIncome >= 0 ? darkMode ? "bg-purple-900/20" : "bg-purple-50" : darkMode ? "bg-amber-900/20" : "bg-amber-50"}` }, /* @__PURE__ */ React.createElement("p", { className: `text-xs font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}` }, "Net"), /* @__PURE__ */ React.createElement("p", { className: `text-lg font-bold ${netIncome >= 0 ? "text-purple-500" : "text-amber-500"}` }, netIncome >= 0 ? "+" : "", formatMoney(netIncome))), /* @__PURE__ */ React.createElement("div", { className: `p-3 rounded-xl text-center ${darkMode ? "bg-blue-900/20" : "bg-blue-50"}` }, /* @__PURE__ */ React.createElement("p", { className: `text-xs font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}` }, "Projected"), /* @__PURE__ */ React.createElement("p", { className: "text-lg font-bold text-blue-500" }, formatMoney(projected))));
    })()))), /* @__PURE__ */ React.createElement(CandyCard, { darkMode }, /* @__PURE__ */ React.createElement("h3", { className: `text-lg font-bold mb-4 ${darkMode ? "text-gray-100" : "text-gray-700"}` }, "\u{1F4C9} Expense Trend"), getMonthlyExpenseTotals().some((m) => m.total > 0) ? /* @__PURE__ */ React.createElement(ResponsiveContainer, { width: "100%", height: 300 }, /* @__PURE__ */ React.createElement(AreaChart, { data: getMonthlyExpenseTotals() }, /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("linearGradient", { id: "expenseGradient", x1: "0", y1: "0", x2: "0", y2: "1" }, /* @__PURE__ */ React.createElement("stop", { offset: "5%", stopColor: "#FF6B9D", stopOpacity: 0.4 }), /* @__PURE__ */ React.createElement("stop", { offset: "95%", stopColor: "#FF6B9D", stopOpacity: 0 }))), /* @__PURE__ */ React.createElement(CartesianGrid, { strokeDasharray: "3 3", stroke: "#E8E4EE" }), /* @__PURE__ */ React.createElement(XAxis, { dataKey: "label", tick: { fill: "#6B6789", fontSize: 12 } }), /* @__PURE__ */ React.createElement(YAxis, { tick: { fill: "#6B6789", fontSize: 12 } }), /* @__PURE__ */ React.createElement(Tooltip, { formatter: (value) => formatMoney(value) }), /* @__PURE__ */ React.createElement(Area, { type: "monotone", dataKey: "total", stroke: "#FF6B9D", fill: "url(#expenseGradient)", strokeWidth: 3 }))) : /* @__PURE__ */ React.createElement(EmptyState, { darkMode, icon: "\u{1F4CA}", title: "No data yet", subtitle: "Start tracking expenses to see trends!" })), /* @__PURE__ */ React.createElement(CandyCard, { darkMode }, /* @__PURE__ */ React.createElement("h3", { className: `text-lg font-bold mb-4 ${darkMode ? "text-gray-100" : "text-gray-700"}` }, "\u{1F4C8} Income Trend"), getMonthlyIncomeTotals().some((m) => m.total > 0) ? /* @__PURE__ */ React.createElement(ResponsiveContainer, { width: "100%", height: 300 }, /* @__PURE__ */ React.createElement(AreaChart, { data: getMonthlyIncomeTotals() }, /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("linearGradient", { id: "incomeGradient", x1: "0", y1: "0", x2: "0", y2: "1" }, /* @__PURE__ */ React.createElement("stop", { offset: "5%", stopColor: "#5FCFB5", stopOpacity: 0.4 }), /* @__PURE__ */ React.createElement("stop", { offset: "95%", stopColor: "#5FCFB5", stopOpacity: 0 }))), /* @__PURE__ */ React.createElement(CartesianGrid, { strokeDasharray: "3 3", stroke: "#E8E4EE" }), /* @__PURE__ */ React.createElement(XAxis, { dataKey: "label", tick: { fill: "#6B6789", fontSize: 12 } }), /* @__PURE__ */ React.createElement(YAxis, { tick: { fill: "#6B6789", fontSize: 12 } }), /* @__PURE__ */ React.createElement(Tooltip, { formatter: (value) => formatMoney(value) }), /* @__PURE__ */ React.createElement(Area, { type: "monotone", dataKey: "total", stroke: "#5FCFB5", fill: "url(#incomeGradient)", strokeWidth: 3 }))) : /* @__PURE__ */ React.createElement(EmptyState, { darkMode, icon: "\u{1F4B0}", title: "No income data", subtitle: "Start tracking to see trends!" })), /* @__PURE__ */ React.createElement(CandyCard, { darkMode }, /* @__PURE__ */ React.createElement("h3", { className: `text-lg font-bold mb-4 ${darkMode ? "text-gray-100" : "text-gray-700"}` }, "\u{1F48E} Investment Activity"), getMonthlyInvestmentTotals().some((m) => m.buys > 0 || m.sells > 0) ? /* @__PURE__ */ React.createElement(ResponsiveContainer, { width: "100%", height: 300 }, /* @__PURE__ */ React.createElement(BarChart, { data: getMonthlyInvestmentTotals() }, /* @__PURE__ */ React.createElement(CartesianGrid, { strokeDasharray: "3 3", stroke: "#E8E4EE" }), /* @__PURE__ */ React.createElement(XAxis, { dataKey: "label", tick: { fill: "#6B6789", fontSize: 12 } }), /* @__PURE__ */ React.createElement(YAxis, { tick: { fill: "#6B6789", fontSize: 12 } }), /* @__PURE__ */ React.createElement(
      Tooltip,
      {
        formatter: (value, name) => [formatMoney(value), name === "buys" ? "Bought" : "Sold"]
      }
    ), /* @__PURE__ */ React.createElement(Legend, { formatter: (value) => value === "buys" ? "Bought" : "Sold" }), /* @__PURE__ */ React.createElement(Bar, { dataKey: "buys", fill: "#8B5CF6", name: "buys", radius: [4, 4, 0, 0] }), /* @__PURE__ */ React.createElement(Bar, { dataKey: "sells", fill: "#EC4899", name: "sells", radius: [4, 4, 0, 0] }))) : /* @__PURE__ */ React.createElement(EmptyState, { darkMode, icon: "\u{1F48E}", title: "No investment data", subtitle: "Start tracking investments to see activity!" })), /* @__PURE__ */ React.createElement(CandyCard, { darkMode }, /* @__PURE__ */ React.createElement("h3", { className: `text-lg font-bold mb-4 ${darkMode ? "text-gray-100" : "text-gray-700"}` }, "\u23F0 Hours Worked"), getMonthlyHoursWorked().some((m) => m.hours > 0) ? /* @__PURE__ */ React.createElement(ResponsiveContainer, { width: "100%", height: 300 }, /* @__PURE__ */ React.createElement(BarChart, { data: getMonthlyHoursWorked() }, /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("linearGradient", { id: "hoursGradient", x1: "0", y1: "0", x2: "0", y2: "1" }, /* @__PURE__ */ React.createElement("stop", { offset: "5%", stopColor: "#3B82F6", stopOpacity: 0.8 }), /* @__PURE__ */ React.createElement("stop", { offset: "95%", stopColor: "#3B82F6", stopOpacity: 0.4 }))), /* @__PURE__ */ React.createElement(CartesianGrid, { strokeDasharray: "3 3", stroke: darkMode ? "#3D3A4E" : "#E8E4EE" }), /* @__PURE__ */ React.createElement(XAxis, { dataKey: "label", tick: { fill: "#6B6789", fontSize: 12 } }), /* @__PURE__ */ React.createElement(YAxis, { yAxisId: "hours", tick: { fill: "#6B6789", fontSize: 12 } }), /* @__PURE__ */ React.createElement(YAxis, { yAxisId: "earnings", orientation: "right", tick: { fill: "#6B6789", fontSize: 12 } }), /* @__PURE__ */ React.createElement(
      Tooltip,
      {
        formatter: (value, name) => [
          name === "hours" ? `${value} hrs` : formatMoney(value),
          name === "hours" ? "Hours" : "Earnings"
        ],
        contentStyle: {
          backgroundColor: darkMode ? "#252233" : "#fff",
          border: `2px solid ${darkMode ? "#3D3A4E" : "#E8E4EE"}`,
          borderRadius: "12px"
        }
      }
    ), /* @__PURE__ */ React.createElement(Legend, { formatter: (value) => value === "hours" ? "Hours Worked" : "Earnings" }), /* @__PURE__ */ React.createElement(Bar, { yAxisId: "hours", dataKey: "hours", fill: "url(#hoursGradient)", name: "hours", radius: [4, 4, 0, 0] }), /* @__PURE__ */ React.createElement(Bar, { yAxisId: "earnings", dataKey: "earnings", fill: "#10B981", name: "earnings", radius: [4, 4, 0, 0] }))) : /* @__PURE__ */ React.createElement(EmptyState, { darkMode, icon: "\u23F0", title: "No work data", subtitle: "Start tracking work hours to see trends!" })), /* @__PURE__ */ React.createElement(CandyCard, { darkMode }, /* @__PURE__ */ React.createElement("h3", { className: `text-lg font-bold mb-4 ${darkMode ? "text-gray-100" : "text-gray-700"}` }, "\u{1F4CA} Category Breakdown"), getCategoryBreakdownByMonth().some((m) => EXPENSE_CATEGORIES.some((c) => m[c] > 0)) ? /* @__PURE__ */ React.createElement(ResponsiveContainer, { width: "100%", height: 300 }, /* @__PURE__ */ React.createElement(BarChart, { data: getCategoryBreakdownByMonth() }, /* @__PURE__ */ React.createElement(CartesianGrid, { strokeDasharray: "3 3", stroke: "#E8E4EE" }), /* @__PURE__ */ React.createElement(XAxis, { dataKey: "label", tick: { fill: "#6B6789", fontSize: 12 } }), /* @__PURE__ */ React.createElement(YAxis, { tick: { fill: "#6B6789", fontSize: 12 } }), /* @__PURE__ */ React.createElement(Tooltip, { formatter: (value) => formatMoney(value) }), /* @__PURE__ */ React.createElement(Legend, null), EXPENSE_CATEGORIES.map((cat) => /* @__PURE__ */ React.createElement(Bar, { key: cat, dataKey: cat, fill: CATEGORY_STYLES[cat].color, stackId: "a" })))) : /* @__PURE__ */ React.createElement(EmptyState, { darkMode, icon: "\u{1F4C8}", title: "No category data", subtitle: "Track expenses to see breakdowns!" })))
  ), showRestoreModal && /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" }, /* @__PURE__ */ React.createElement(CandyCard, { darkMode, className: "max-w-lg w-full" }, /* @__PURE__ */ React.createElement("h3", { className: `text-xl font-black mb-4 ${darkMode ? "text-gray-100" : "text-gray-700"}` }, "\u{1F4E5} Restore Data"), /* @__PURE__ */ React.createElement(
    "textarea",
    {
      value: restoreText,
      onChange: (e) => setRestoreText(e.target.value),
      placeholder: "Paste your backup data here...",
      className: `w-full h-40 p-4 rounded-xl border-2 outline-none focus:border-pink-400 resize-none transition-colors ${darkMode ? "bg-[#1E1B2E] border-[#3D3A4E] text-gray-100 placeholder-gray-500" : "bg-gray-50 border-gray-200 text-gray-700"}`
    }
  ), /* @__PURE__ */ React.createElement("div", { className: "flex gap-3 mt-4" }, /* @__PURE__ */ React.createElement(CandyButton, { onClick: restoreFromText }, "Restore"), /* @__PURE__ */ React.createElement(CandyButton, { variant: "ghost", onClick: () => setShowRestoreModal(false) }, "Cancel")))), showUndoToast && pendingDeletion && /* @__PURE__ */ React.createElement("div", { className: "fixed bottom-24 left-1/2 transform -translate-x-1/2 z-50 undo-toast" }, /* @__PURE__ */ React.createElement("div", { className: `flex items-center gap-4 px-5 py-3 rounded-2xl shadow-2xl border-2 ${darkMode ? "bg-[#252233] border-[#3D3A4E] text-gray-100" : "bg-white border-gray-200 text-gray-700"}` }, /* @__PURE__ */ React.createElement("span", { className: "text-sm font-medium" }, pendingDeletion.type === "income" && "\u{1F4B8}", pendingDeletion.type === "expense" && "\u{1F9FE}", pendingDeletion.type === "investment" && "\u{1F4C8}", pendingDeletion.type === "worklog" && "\u23F0", " ", "Deleted"), /* @__PURE__ */ React.createElement(
    "button",
    {
      onTouchEnd: (e) => {
        e.preventDefault();
        e.stopPropagation();
        undoDelete();
      },
      onClick: (e) => {
        e.stopPropagation();
        undoDelete();
      },
      className: "px-4 py-1.5 rounded-xl font-bold text-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-400 hover:to-pink-400 transition-all active:scale-95"
    },
    "Undo"
  ))), contextMenu && /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "fixed z-[100] context-menu",
      style: {
        left: Math.min(contextMenu.x, window.innerWidth - 160),
        top: Math.min(contextMenu.y, window.innerHeight - 180)
      },
      onClick: (e) => e.stopPropagation(),
      onTouchStart: (e) => e.stopPropagation(),
      onTouchEnd: (e) => e.stopPropagation(),
      onMouseDown: (e) => e.stopPropagation()
    },
    /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "rounded-2xl overflow-hidden min-w-[150px] border-2",
        style: {
          backgroundColor: darkMode ? "#1a1625" : "#ffffff",
          borderColor: darkMode ? "#3D3A4E" : "#e5e7eb",
          boxShadow: darkMode ? "0 10px 40px rgba(0,0,0,0.8), 0 0 0 1px rgba(0,0,0,0.3)" : "0 10px 40px rgba(0,0,0,0.15)"
        }
      },
      /* @__PURE__ */ React.createElement(
        "button",
        {
          onTouchEnd: (e) => {
            e.preventDefault();
            e.stopPropagation();
            handleContextMenuAction("edit");
          },
          onClick: (e) => {
            e.stopPropagation();
            handleContextMenuAction("edit");
          },
          className: "w-full px-4 py-3 text-left text-sm font-medium flex items-center gap-3 transition-colors",
          style: {
            color: darkMode ? "#e5e7eb" : "#374151",
            backgroundColor: "transparent"
          },
          onMouseEnter: (e) => e.currentTarget.style.backgroundColor = darkMode ? "rgba(255,255,255,0.1)" : "#f9fafb",
          onMouseLeave: (e) => e.currentTarget.style.backgroundColor = "transparent"
        },
        /* @__PURE__ */ React.createElement(Edit3, { className: "w-4 h-4" }),
        "Edit"
      ),
      /* @__PURE__ */ React.createElement(
        "button",
        {
          onTouchEnd: (e) => {
            e.preventDefault();
            e.stopPropagation();
            handleContextMenuAction("duplicate");
          },
          onClick: (e) => {
            e.stopPropagation();
            handleContextMenuAction("duplicate");
          },
          className: "w-full px-4 py-3 text-left text-sm font-medium flex items-center gap-3 transition-colors",
          style: {
            color: darkMode ? "#e5e7eb" : "#374151",
            backgroundColor: "transparent",
            borderTop: `1px solid ${darkMode ? "#3D3A4E" : "#f3f4f6"}`
          },
          onMouseEnter: (e) => e.currentTarget.style.backgroundColor = darkMode ? "rgba(255,255,255,0.1)" : "#f9fafb",
          onMouseLeave: (e) => e.currentTarget.style.backgroundColor = "transparent"
        },
        /* @__PURE__ */ React.createElement(Plus, { className: "w-4 h-4" }),
        "Duplicate"
      ),
      /* @__PURE__ */ React.createElement(
        "button",
        {
          onTouchEnd: (e) => {
            e.preventDefault();
            e.stopPropagation();
            handleContextMenuAction("delete");
          },
          onClick: (e) => {
            e.stopPropagation();
            handleContextMenuAction("delete");
          },
          className: "w-full px-4 py-3 text-left text-sm font-medium flex items-center gap-3 transition-colors",
          style: {
            color: darkMode ? "#f87171" : "#ef4444",
            backgroundColor: "transparent",
            borderTop: `1px solid ${darkMode ? "#3D3A4E" : "#f3f4f6"}`
          },
          onMouseEnter: (e) => e.currentTarget.style.backgroundColor = darkMode ? "rgba(239,68,68,0.15)" : "#fef2f2",
          onMouseLeave: (e) => e.currentTarget.style.backgroundColor = "transparent"
        },
        /* @__PURE__ */ React.createElement(X, { className: "w-4 h-4" }),
        "Delete"
      )
    )
  ), showBackupModal && /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" }, /* @__PURE__ */ React.createElement(CandyCard, { darkMode, className: "max-w-lg w-full" }, /* @__PURE__ */ React.createElement("h3", { className: `text-xl font-black mb-4 ${darkMode ? "text-gray-100" : "text-gray-700"}` }, "\u{1F4E4} Backup Data"), /* @__PURE__ */ React.createElement(
    "textarea",
    {
      value: backupData,
      readOnly: true,
      className: `w-full h-40 p-4 rounded-xl border-2 outline-none text-xs font-mono ${darkMode ? "bg-[#1E1B2E] border-[#3D3A4E] text-gray-300" : "bg-gray-50 border-gray-200 text-gray-700"}`
    }
  ), /* @__PURE__ */ React.createElement("div", { className: "flex gap-3 mt-4" }, /* @__PURE__ */ React.createElement(CandyButton, { onClick: () => {
    navigator.clipboard.writeText(backupData);
    alert("Copied!");
  } }, "Copy to Clipboard"), /* @__PURE__ */ React.createElement(CandyButton, { variant: "ghost", onClick: () => setShowBackupModal(false) }, "Close")))), showAnalyticsExport && /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" }, /* @__PURE__ */ React.createElement(CandyCard, { darkMode, className: "max-w-lg w-full" }, /* @__PURE__ */ React.createElement("h3", { className: `text-xl font-black mb-4 ${darkMode ? "text-gray-100" : "text-gray-700"}` }, "\u{1F4CA} Analytics Export (CSV)"), /* @__PURE__ */ React.createElement("p", { className: `text-sm mb-3 ${darkMode ? "text-gray-400" : "text-gray-500"}` }, "Copy this data and paste into a spreadsheet app, or save as a .csv file"), /* @__PURE__ */ React.createElement(
    "textarea",
    {
      value: analyticsExportData,
      readOnly: true,
      className: `w-full h-48 p-4 rounded-xl border-2 outline-none text-xs font-mono ${darkMode ? "bg-[#1E1B2E] border-[#3D3A4E] text-gray-300" : "bg-gray-50 border-gray-200 text-gray-700"}`
    }
  ), /* @__PURE__ */ React.createElement("div", { className: "flex gap-3 mt-4" }, /* @__PURE__ */ React.createElement(CandyButton, { onClick: () => {
    navigator.clipboard.writeText(analyticsExportData);
    alert("Copied to clipboard! Paste into Numbers, Excel, or Google Sheets.");
  } }, "\u{1F4CB} Copy to Clipboard"), /* @__PURE__ */ React.createElement(CandyButton, { variant: "ghost", onClick: () => setShowAnalyticsExport(false) }, "Close")))), showScreenshotModal && screenshotImage && /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "fixed inset-0 z-50 flex flex-col bg-black/80 backdrop-blur-sm",
      onClick: () => {
        setShowScreenshotModal(false);
        setScreenshotImage(null);
      }
    },
    /* @__PURE__ */ React.createElement(
      "div",
      {
        className: `flex-shrink-0 p-4 ${darkMode ? "bg-[#252233]" : "bg-white"}`,
        onClick: (e) => e.stopPropagation()
      },
      /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between max-w-4xl mx-auto" }, /* @__PURE__ */ React.createElement("h3", { className: `text-xl font-black flex items-center gap-2 ${darkMode ? "text-gray-100" : "text-gray-700"}` }, "\u{1F4F8} Analytics Screenshots"), /* @__PURE__ */ React.createElement(
        "button",
        {
          onTouchEnd: (e) => {
            e.preventDefault();
            setShowScreenshotModal(false);
            setScreenshotImage(null);
          },
          onClick: () => {
            setShowScreenshotModal(false);
            setScreenshotImage(null);
          },
          className: `p-3 rounded-xl transition-colors press-feedback ${darkMode ? "hover:bg-white/10 text-gray-400 active:bg-white/20" : "hover:bg-gray-100 text-gray-500 active:bg-gray-200"}`
        },
        /* @__PURE__ */ React.createElement(X, { className: "w-6 h-6" })
      )),
      /* @__PURE__ */ React.createElement("p", { className: `text-sm mt-2 max-w-4xl mx-auto ${darkMode ? "text-gray-400" : "text-gray-500"}` }, "\u{1F4F1} ", /* @__PURE__ */ React.createElement("strong", null, "Long-press"), " each image to save to Photos")
    ),
    /* @__PURE__ */ React.createElement(
      "div",
      {
        className: `flex-1 overflow-auto p-4 ${darkMode ? "bg-[#1E1B2E]" : "bg-gray-50"}`,
        onClick: (e) => e.stopPropagation()
      },
      /* @__PURE__ */ React.createElement("div", { className: "max-w-4xl mx-auto space-y-6" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: `text-sm font-bold mb-2 ${darkMode ? "text-gray-400" : "text-gray-500"}` }, "Part 1 of 2"), /* @__PURE__ */ React.createElement(
        "img",
        {
          src: screenshotImage.top,
          alt: "Analytics Screenshot Part 1",
          className: "w-full rounded-xl shadow-2xl"
        }
      )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: `text-sm font-bold mb-2 ${darkMode ? "text-gray-400" : "text-gray-500"}` }, "Part 2 of 2"), /* @__PURE__ */ React.createElement(
        "img",
        {
          src: screenshotImage.bottom,
          alt: "Analytics Screenshot Part 2",
          className: "w-full rounded-xl shadow-2xl"
        }
      )))
    ),
    /* @__PURE__ */ React.createElement(
      "div",
      {
        className: `flex-shrink-0 p-4 ${darkMode ? "bg-[#252233]" : "bg-white"}`,
        onClick: (e) => e.stopPropagation()
      },
      /* @__PURE__ */ React.createElement("div", { className: "max-w-4xl mx-auto flex justify-center" }, /* @__PURE__ */ React.createElement(
        "button",
        {
          onTouchEnd: (e) => {
            e.preventDefault();
            setShowScreenshotModal(false);
            setScreenshotImage(null);
          },
          onClick: () => {
            setShowScreenshotModal(false);
            setScreenshotImage(null);
          },
          className: `px-8 py-4 rounded-2xl font-bold text-lg transition-all press-feedback active:scale-95 ${darkMode ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500" : "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-400 hover:to-pink-400"}`
        },
        "\u2715 Close"
      ))
    )
  ), showRecurringModal && /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" }, /* @__PURE__ */ React.createElement(CandyCard, { darkMode, className: "max-w-md w-full" }, /* @__PURE__ */ React.createElement("h3", { className: `text-xl font-black mb-4 ${darkMode ? "text-gray-100" : "text-gray-700"}` }, "\u{1F504} Add Recurring Expense"), /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement(
    "input",
    {
      placeholder: "Name",
      value: newRecurringName,
      onChange: (e) => setNewRecurringName(e.target.value),
      className: `candy-input ${darkMode ? "candy-input-dark" : "candy-input-light"}`
    }
  ), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "number",
      placeholder: "Amount",
      value: newRecurringAmount,
      onChange: (e) => setNewRecurringAmount(e.target.value),
      className: `candy-input ${darkMode ? "candy-input-dark" : "candy-input-light"}`
    }
  ), /* @__PURE__ */ React.createElement(CandySelect, { darkMode, value: newRecurringCategory, onChange: (e) => setNewRecurringCategory(e.target.value) }, EXPENSE_CATEGORIES.map((cat) => /* @__PURE__ */ React.createElement("option", { key: cat, value: cat }, cat))), /* @__PURE__ */ React.createElement(CandySelect, { darkMode, value: newRecurringDay, onChange: (e) => setNewRecurringDay(e.target.value) }, Array.from({ length: 28 }, (_, i) => /* @__PURE__ */ React.createElement("option", { key: i + 1, value: i + 1 }, "Day ", i + 1)))), /* @__PURE__ */ React.createElement("div", { className: "flex gap-3 mt-4" }, /* @__PURE__ */ React.createElement(CandyButton, { onClick: addRecurringExpense }, "Add"), /* @__PURE__ */ React.createElement(CandyButton, { variant: "ghost", onClick: () => setShowRecurringModal(false) }, "Cancel")))), showAddCardModal && /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" }, /* @__PURE__ */ React.createElement(CandyCard, { darkMode, className: "max-w-md w-full" }, /* @__PURE__ */ React.createElement("h3", { className: `text-xl font-black mb-4 flex items-center gap-2 ${darkMode ? "text-gray-100" : "text-gray-700"}` }, addCardType === "credit" ? "\u{1F4B3}" : "\u{1F4B5}", " Add ", addCardType === "credit" ? "Credit Card" : "Checking Account"), /* @__PURE__ */ React.createElement("div", { className: `flex rounded-xl overflow-hidden border-2 mb-4 ${darkMode ? "border-[#3D3A4E]" : "border-gray-200"}` }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setAddCardType("debit"),
      className: `flex-1 py-2 px-3 text-sm font-bold transition-all flex items-center justify-center gap-2 ${addCardType === "debit" ? "bg-gradient-to-r from-emerald-400 to-teal-400 text-white" : darkMode ? "text-gray-400 hover:bg-white/5" : "text-gray-500 hover:bg-gray-50"}`
    },
    "\u{1F4B5} Checking"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setAddCardType("credit"),
      className: `flex-1 py-2 px-3 text-sm font-bold transition-all flex items-center justify-center gap-2 ${addCardType === "credit" ? "bg-gradient-to-r from-violet-400 to-purple-400 text-white" : darkMode ? "text-gray-400 hover:bg-white/5" : "text-gray-500 hover:bg-gray-50"}`
    },
    "\u{1F4B3} Credit Card"
  )), /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: `block text-sm font-bold mb-1 ${darkMode ? "text-gray-400" : "text-gray-500"}` }, addCardType === "credit" ? "Card Name" : "Account Name"), /* @__PURE__ */ React.createElement(
    "input",
    {
      placeholder: addCardType === "credit" ? "e.g., Chase Sapphire" : "e.g., Main Checking",
      value: newCardName,
      onChange: (e) => setNewCardName(e.target.value),
      className: `candy-input ${darkMode ? "candy-input-dark" : "candy-input-light"}`
    }
  )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: `block text-sm font-bold mb-1 ${darkMode ? "text-gray-400" : "text-gray-500"}` }, addCardType === "credit" ? "Current Balance (Owed)" : "Current Balance"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "number",
      placeholder: "0.00",
      value: newCardBalance,
      onChange: (e) => setNewCardBalance(e.target.value),
      className: `candy-input ${darkMode ? "candy-input-dark" : "candy-input-light"}`
    }
  )), addCardType === "credit" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: `block text-sm font-bold mb-1 ${darkMode ? "text-gray-400" : "text-gray-500"}` }, "Credit Limit"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "number",
      placeholder: "5000",
      value: newCardLimit,
      onChange: (e) => setNewCardLimit(e.target.value),
      className: `candy-input ${darkMode ? "candy-input-dark" : "candy-input-light"}`
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-3" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: `block text-sm font-bold mb-1 ${darkMode ? "text-gray-400" : "text-gray-500"}` }, "APR %"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "number",
      placeholder: "24.99",
      value: newCardAPR,
      onChange: (e) => setNewCardAPR(e.target.value),
      className: `candy-input ${darkMode ? "candy-input-dark" : "candy-input-light"}`
    }
  )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: `block text-sm font-bold mb-1 ${darkMode ? "text-gray-400" : "text-gray-500"}` }, "Min Payment"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "number",
      placeholder: "25",
      value: newCardMinPayment,
      onChange: (e) => setNewCardMinPayment(e.target.value),
      className: `candy-input ${darkMode ? "candy-input-dark" : "candy-input-light"}`
    }
  ))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: `block text-sm font-bold mb-1 ${darkMode ? "text-gray-400" : "text-gray-500"}` }, "Payment Due Day"), /* @__PURE__ */ React.createElement(CandySelect, { darkMode, value: newCardDueDay, onChange: (e) => setNewCardDueDay(e.target.value) }, Array.from({ length: 28 }, (_, i) => /* @__PURE__ */ React.createElement("option", { key: i + 1, value: i + 1 }, "Day ", i + 1)))))), /* @__PURE__ */ React.createElement("div", { className: "flex gap-3 mt-4" }, /* @__PURE__ */ React.createElement(CandyButton, { onClick: addCardType === "credit" ? addCreditCard : addDebitCard }, "Add ", addCardType === "credit" ? "Card" : "Account"), /* @__PURE__ */ React.createElement(CandyButton, { variant: "ghost", onClick: () => {
    setShowAddCardModal(false);
    setAddCardType("credit");
  } }, "Cancel")))), showPaymentModal && /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" }, /* @__PURE__ */ React.createElement(CandyCard, { darkMode, className: "max-w-sm w-full" }, /* @__PURE__ */ React.createElement("h3", { className: `text-xl font-black mb-4 flex items-center gap-2 ${darkMode ? "text-gray-100" : "text-gray-700"}` }, "\u{1F4B5} Make Payment"), (() => {
    const card = creditCards.find((c) => c.id === showPaymentModal);
    if (!card) return null;
    return /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: `p-3 rounded-xl text-center ${darkMode ? "bg-[#1E1B2E]" : "bg-gray-50"}` }, /* @__PURE__ */ React.createElement("p", { className: `text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}` }, card.name), /* @__PURE__ */ React.createElement("p", { className: "text-2xl font-bold text-rose-500" }, formatMoney(card.balance)), /* @__PURE__ */ React.createElement("p", { className: `text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}` }, "Current Balance")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: `block text-sm font-bold mb-1 ${darkMode ? "text-gray-400" : "text-gray-500"}` }, "Payment Amount"), /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "number",
        placeholder: card.minPayment.toString(),
        value: paymentAmount,
        onChange: (e) => setPaymentAmount(e.target.value),
        className: `candy-input ${darkMode ? "candy-input-dark" : "candy-input-light"}`,
        autoFocus: true
      }
    ), /* @__PURE__ */ React.createElement("div", { className: "flex gap-2 mt-2" }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setPaymentAmount(String(card.minPayment)),
        className: `text-xs px-2 py-1 rounded-lg ${darkMode ? "bg-purple-900/30 text-purple-400" : "bg-purple-100 text-purple-600"}`
      },
      "Min (",
      formatMoney(card.minPayment),
      ")"
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setPaymentAmount(String(card.balance)),
        className: `text-xs px-2 py-1 rounded-lg ${darkMode ? "bg-emerald-900/30 text-emerald-400" : "bg-emerald-100 text-emerald-600"}`
      },
      "Pay Full"
    ))));
  })(), /* @__PURE__ */ React.createElement("div", { className: "flex gap-3 mt-4" }, /* @__PURE__ */ React.createElement(CandyButton, { onClick: () => makeCardPayment(showPaymentModal) }, "Pay"), /* @__PURE__ */ React.createElement(CandyButton, { variant: "ghost", onClick: () => {
    setShowPaymentModal(null);
    setPaymentAmount("");
  } }, "Cancel")))), showDepositModal && /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" }, /* @__PURE__ */ React.createElement(CandyCard, { darkMode, className: "max-w-sm w-full" }, /* @__PURE__ */ React.createElement("h3", { className: `text-xl font-black mb-4 flex items-center gap-2 ${darkMode ? "text-gray-100" : "text-gray-700"}` }, "\u{1F4B0} Make Deposit"), (() => {
    const card = debitCards.find((c) => c.id === showDepositModal);
    if (!card) return null;
    return /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: `p-3 rounded-xl text-center ${darkMode ? "bg-[#1E1B2E]" : "bg-gray-50"}` }, /* @__PURE__ */ React.createElement("p", { className: `text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}` }, card.name), /* @__PURE__ */ React.createElement("p", { className: "text-2xl font-bold text-emerald-500" }, formatMoney(card.balance)), /* @__PURE__ */ React.createElement("p", { className: `text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}` }, "Current Balance")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: `block text-sm font-bold mb-1 ${darkMode ? "text-gray-400" : "text-gray-500"}` }, "Deposit Amount"), /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "number",
        placeholder: "0.00",
        value: depositAmount,
        onChange: (e) => setDepositAmount(e.target.value),
        className: `candy-input ${darkMode ? "candy-input-dark" : "candy-input-light"}`,
        autoFocus: true
      }
    )));
  })(), /* @__PURE__ */ React.createElement("div", { className: "flex gap-3 mt-4" }, /* @__PURE__ */ React.createElement(CandyButton, { onClick: () => makeDebitDeposit(showDepositModal) }, "Deposit"), /* @__PURE__ */ React.createElement(CandyButton, { variant: "ghost", onClick: () => {
    setShowDepositModal(null);
    setDepositAmount("");
  } }, "Cancel")))), showAchievements && /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "fixed inset-0 z-50 bg-black/50",
      onTouchMove: (e) => e.preventDefault(),
      onClick: () => setShowAchievements(false)
    },
    /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 flex items-center justify-center p-4" }, /* @__PURE__ */ React.createElement(
      "div",
      {
        className: `max-w-2xl w-full rounded-3xl border-2 shadow-2xl ${darkMode ? "bg-[#252233] border-[#3D3A4E]" : "bg-white border-gray-200"}`,
        onClick: (e) => e.stopPropagation(),
        style: { maxHeight: "80vh", display: "flex", flexDirection: "column" }
      },
      /* @__PURE__ */ React.createElement("div", { className: `p-6 pb-4 border-b flex-shrink-0 ${darkMode ? "border-[#3D3A4E]" : "border-gray-200"}` }, /* @__PURE__ */ React.createElement("h3", { className: `text-2xl font-black flex items-center gap-3 ${darkMode ? "text-gray-100" : "text-gray-700"}` }, /* @__PURE__ */ React.createElement(Trophy, { className: "w-8 h-8 text-yellow-500" }), "Achievements", /* @__PURE__ */ React.createElement("span", { className: `text-lg ${darkMode ? "text-gray-500" : "text-gray-400"}` }, "(", unlockedAchievements.length, "/", achievements.length, ")"))),
      /* @__PURE__ */ React.createElement(
        "div",
        {
          className: "p-6 pt-4 overflow-y-scroll flex-1",
          onTouchMove: (e) => e.stopPropagation(),
          style: {
            WebkitOverflowScrolling: "touch",
            minHeight: 0
          }
        },
        /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-4 pb-2" }, achievements.map((a) => {
          const unlocked = unlockedAchievements.includes(a.id);
          return /* @__PURE__ */ React.createElement(
            "div",
            {
              key: a.id,
              className: `p-4 rounded-2xl border-2 text-center transition-all ${unlocked ? darkMode ? "bg-yellow-900/30 border-yellow-600" : "bg-yellow-50 border-yellow-300" : darkMode ? "bg-[#1E1B2E] border-[#3D3A4E] opacity-50" : "bg-gray-50 border-gray-200 opacity-50"}`
            },
            /* @__PURE__ */ React.createElement("div", { className: "text-4xl mb-2" }, a.icon),
            /* @__PURE__ */ React.createElement("p", { className: `font-bold ${darkMode ? "text-gray-100" : "text-gray-700"}` }, a.name),
            /* @__PURE__ */ React.createElement("p", { className: `text-xs mt-1 ${darkMode ? "text-gray-500" : "text-gray-400"}` }, a.description),
            unlocked && /* @__PURE__ */ React.createElement("p", { className: "text-xs text-yellow-500 font-bold mt-2" }, "\u2713 Unlocked!")
          );
        }))
      ),
      /* @__PURE__ */ React.createElement("div", { className: `p-4 border-t flex-shrink-0 ${darkMode ? "border-[#3D3A4E]" : "border-gray-200"}` }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-center" }, /* @__PURE__ */ React.createElement(CandyButton, { variant: "ghost", onClick: () => setShowAchievements(false) }, "Close")))
    ))
  ), showConfetti && /* @__PURE__ */ React.createElement(Confetti, null), newAchievement && /* @__PURE__ */ React.createElement(AchievementPopup, { achievement: newAchievement }), showCharacter && /* @__PURE__ */ React.createElement(CharacterPopup, null), showScrollTop && /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }),
      className: "fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 text-white shadow-lg shadow-pink-300/50 flex items-center justify-center btn-bounce z-30"
    },
    /* @__PURE__ */ React.createElement(ArrowUp, { className: "w-6 h-6" })
  ))));
}
var container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(/* @__PURE__ */ React.createElement(FinanceTracker, null));
  const loading = document.getElementById("loading");
  if (loading) loading.style.display = "none";
}
