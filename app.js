import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Plus, X, TrendingUp, ChevronDown, ChevronRight, ChevronLeft, Download, Upload, 
  DollarSign, PieChart, Receipt, Calendar, Search, Check, Star, Maximize2,
  Sparkles, Trophy, Clock, Target, Archive, ArrowUp, Wallet, RotateCcw,
  Briefcase, ListTodo, BarChart3, Settings, Zap, Moon, Sun, Edit3, Printer
} from 'lucide-react';
import { 
  PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, Tooltip, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, LineChart, Line, AreaChart, Area 
} from 'recharts';

// ============= STYLES =============
const styles = `
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
    content: '✨';
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

  /* Static glow effect (was animated) */
  .glow-pulse {
    box-shadow: 0 0 30px rgba(255, 107, 157, 0.4);
  }

  /* Static purple border glow (was animated) */
  .purple-glow-border {
    border: 1.5px solid rgba(168, 85, 247, 0.6);
    box-shadow: 0 0 6px rgba(168, 85, 247, 0.3);
  }

  /* Goal progress bar - simplified (removed infinite shimmer/glow) */
  @keyframes goalProgressFill {
    from { 
      width: 0%; 
      opacity: 0.6;
    }
    to { 
      opacity: 1;
    }
  }
  .goal-progress-bar {
    animation: goalProgressFill 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    background: linear-gradient(to right, #10B981, #14B8A6, #06B6D4);
    box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
  }
  .goal-progress-bar-warning {
    background: linear-gradient(to right, #F59E0B, #EAB308);
    animation: goalProgressFill 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    box-shadow: 0 0 10px rgba(245, 158, 11, 0.5);
  }
  .goal-progress-bar-complete {
    background: linear-gradient(to right, #8B5CF6, #EC4899, #F97316);
    animation: goalProgressFill 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    box-shadow: 0 0 12px rgba(139, 92, 246, 0.6);
  }

  /* Goal slider track */
  .goal-slider-track {
    background: linear-gradient(to right, rgba(139, 92, 246, 0.2), rgba(236, 72, 153, 0.2));
    border: 2px solid rgba(139, 92, 246, 0.3);
  }
  .goal-slider-thumb {
    background: linear-gradient(135deg, #8B5CF6, #EC4899);
    box-shadow: 0 2px 10px rgba(139, 92, 246, 0.4);
    transition: transform 0.1s ease, box-shadow 0.2s ease;
  }
  .goal-slider-thumb:active {
    transform: scale(1.1);
    box-shadow: 0 4px 20px rgba(139, 92, 246, 0.6);
  }

  /* Fullscreen chart button - static glow (was animated) */
  .fullscreen-btn {
    box-shadow: 0 0 6px rgba(139, 92, 246, 0.5), 0 0 12px rgba(236, 72, 153, 0.25);
    transition: all 0.2s ease;
  }
  .fullscreen-btn:hover {
    transform: scale(1.15);
    box-shadow: 0 0 12px rgba(139, 92, 246, 0.7), 0 0 20px rgba(236, 72, 153, 0.4);
  }

  /* Chart scroll animations */
  @keyframes chartFadeSlideIn {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .chart-animate {
    opacity: 0;
  }
  .chart-animate.visible {
    animation: chartFadeSlideIn 0.6s ease-out forwards;
  }
  .chart-animate.visible:nth-child(2) { animation-delay: 0.1s; }
  .chart-animate.visible:nth-child(3) { animation-delay: 0.2s; }

  /* Paid indicator dot - static glow (was animated) */
  .paid-indicator {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #10B981;
    box-shadow: 0 0 6px rgba(16, 185, 129, 0.7), 0 0 10px rgba(16, 185, 129, 0.4);
  }
  
  /* Pay date input glow when set to today - static (was animated) */
  .pay-date-today-glow {
    box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.5), 0 0 14px rgba(16, 185, 129, 0.35);
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
    content: '✓';
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

// Helper function to get local date string (avoids timezone issues with toISOString)
const getLocalDateString = (date = new Date()) => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

// ============= EXTERNAL DATE INPUT COMPONENT =============
// Defined outside the main component to prevent recreation on each render

const CandyDateInput = ({ value, onChange, className = '', darkMode, showTodayButton = true }) => {
  const today = getLocalDateString();
  const isToday = value === today;
  
  const setToday = () => {
    onChange({ target: { value: today } });
    if (navigator.vibrate) navigator.vibrate(10);
  };
  
  return (
    <div className={`relative rounded-2xl overflow-hidden transition-colors duration-300 ${className}`}
    style={darkMode ? {
      background: isToday 
        ? 'linear-gradient(to right, rgba(16,185,129,0.25), rgba(20,184,166,0.25))'
        : 'linear-gradient(to right, rgba(139,92,246,0.2), rgba(236,72,153,0.2))',
      border: isToday 
        ? '2px solid rgba(16,185,129,0.5)'
        : '2px solid rgba(139,92,246,0.3)'
    } : {
      background: isToday
        ? 'linear-gradient(to right, rgba(16,185,129,0.15), rgba(20,184,166,0.15))'
        : 'linear-gradient(to right, rgba(167,139,250,0.15), rgba(244,114,182,0.15))',
      border: isToday
        ? '2px solid rgba(16,185,129,0.4)'
        : '2px solid rgba(167,139,250,0.3)'
    }}>
      <div className="flex items-center">
        <input
          type="date"
          value={value}
          onChange={onChange}
          className={`flex-1 px-4 py-3 text-center font-medium bg-transparent outline-none cursor-pointer ${
            darkMode ? 'text-gray-100' : 'text-gray-700'
          }`}
        />
        {showTodayButton && !isToday && (
          <button
            type="button"
            onClick={setToday}
            className={`px-2 py-1 mr-2 text-xs font-bold rounded-lg transition-all ${
              darkMode 
                ? 'bg-emerald-900/40 text-emerald-400 hover:bg-emerald-900/60' 
                : 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200'
            }`}
          >
            Today
          </button>
        )}
        {isToday && (
          <span className={`px-2 py-1 mr-2 text-xs font-bold rounded-lg ${
            darkMode ? 'text-emerald-400' : 'text-emerald-600'
          }`}>
            ✓ Today
          </span>
        )}
      </div>
    </div>
  );
};

// CandyTimeInput - matches CandyDateInput purple gradient styling
const CandyTimeInput = ({ value, onChange, className = '', darkMode, placeholder = '' }) => (
  <div className={`relative rounded-2xl overflow-hidden transition-colors duration-300 ${className}`}
  style={darkMode ? {
    background: 'linear-gradient(to right, rgba(139,92,246,0.2), rgba(236,72,153,0.2))',
    border: '2px solid rgba(139,92,246,0.3)'
  } : {
    background: 'linear-gradient(to right, rgba(167,139,250,0.15), rgba(244,114,182,0.15))',
    border: '2px solid rgba(167,139,250,0.3)'
  }}>
    <input
      type="time"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-4 py-3 text-center font-medium bg-transparent outline-none cursor-pointer ${
        darkMode ? 'text-gray-100' : 'text-gray-700'
      }`}
    />
  </div>
);

// CandyButton - no darkMode dependency, uses Tailwind dark: classes
const CandyButton = ({ children, onClick, variant = 'primary', size = 'md', className = '', disabled = false }) => {
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
  
  return (
    <button
      onClick={onClick}
      onTouchEnd={handleTouchEnd}
      disabled={disabled}
      className={`${baseClass} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </button>
  );
};

// CandyCard - needs darkMode prop
const CandyCard = ({ children, className = '', highlight = false, darkMode }) => (
  <div className={`card-lift rounded-3xl p-6 shadow-xl border-2 transition-colors duration-300 ${
    darkMode 
      ? `bg-[#252233] border-[#3D3A4E] ${highlight ? 'border-pink-400/50' : ''}` 
      : `bg-white border-gray-100 ${highlight ? 'border-pink-200 glow-pulse' : ''}`
  } ${className}`}>
    {children}
  </div>
);

// CandySelect - needs darkMode prop
const CandySelect = ({ value, onChange, children, className = '', variant = 'default', darkMode }) => {
  const isPurple = variant === 'purple';
  
  const baseStyle = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='${darkMode ? '%23A8A3B8' : '%236B6789'}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 12px center'
  };
  
  const purpleDarkStyle = {
    ...baseStyle,
    background: 'linear-gradient(to right, rgba(139,92,246,0.2), rgba(236,72,153,0.2))',
    border: '2px solid rgba(139,92,246,0.3)',
    backgroundImage: baseStyle.backgroundImage,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 12px center'
  };
  
  const purpleLightStyle = {
    ...baseStyle,
    background: 'linear-gradient(to right, rgba(167,139,250,0.15), rgba(244,114,182,0.15))',
    border: '2px solid rgba(167,139,250,0.3)',
    backgroundImage: baseStyle.backgroundImage,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 12px center'
  };
  
  const getStyle = () => {
    if (isPurple) {
      return darkMode ? purpleDarkStyle : purpleLightStyle;
    }
    return baseStyle;
  };
  
  return (
    <select
      value={value}
      onChange={onChange}
      className={`input-candy px-4 py-3 rounded-2xl outline-none shadow-inner cursor-pointer appearance-none pr-8 transition-colors duration-300 ${
        isPurple
          ? darkMode ? 'text-gray-100' : 'text-gray-700'
          : darkMode 
            ? 'bg-[#1E1B2E] text-gray-100' 
            : 'bg-white/80 text-gray-700'
      } ${className}`}
      style={getStyle()}
    >
      {children}
    </select>
  );
};

// AnimatedNumber - counts up/down to target value
const AnimatedNumber = ({ value, duration = 500, prefix = '', suffix = '', className = '', formatter = null }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const previousValue = useRef(0);
  const animationRef = useRef(null);
  
  useEffect(() => {
    const startValue = previousValue.current;
    const endValue = typeof value === 'number' ? value : parseFloat(value) || 0;
    const startTime = performance.now();
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = startValue + (endValue - startValue) * easeOut;
      
      setDisplayValue(current);
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        previousValue.current = endValue;
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [value, duration]);
  
  const formattedValue = formatter 
    ? formatter(displayValue) 
    : displayValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  
  return <span className={className}>{prefix}{formattedValue}{suffix}</span>;
};

// TrendArrow - shows up/down arrow based on change
const TrendArrow = ({ current, previous, className = '' }) => {
  if (!previous || previous === 0) return null;
  
  const percentChange = ((current - previous) / previous) * 100;
  
  if (Math.abs(percentChange) < 1) return null; // Don't show for tiny changes
  
  const isUp = current > previous;
  
  return (
    <span className={`inline-flex items-center text-xs font-bold ml-1 ${isUp ? 'text-emerald-500' : 'text-rose-500'} ${className}`}>
      {isUp ? '↑' : '↓'}
      <span className="ml-0.5">{Math.abs(percentChange).toFixed(0)}%</span>
    </span>
  );
};

// StatBubble - needs darkMode prop, now supports trend arrows
const StatBubble = ({ icon, label, value, color = 'pink', pop = false, darkMode, trend = null, previousValue = null }) => {
  const colors = {
    pink: { gradient: 'from-pink-400 to-rose-400', text: 'text-pink-500', bgLight: 'bg-pink-50', bgDark: 'bg-pink-900/20' },
    blue: { gradient: 'from-blue-400 to-cyan-400', text: 'text-blue-500', bgLight: 'bg-blue-50', bgDark: 'bg-blue-900/20' },
    green: { gradient: 'from-emerald-400 to-teal-400', text: 'text-emerald-500', bgLight: 'bg-emerald-50', bgDark: 'bg-emerald-900/20' },
    purple: { gradient: 'from-purple-400 to-violet-400', text: 'text-purple-500', bgLight: 'bg-purple-50', bgDark: 'bg-purple-900/20' },
    orange: { gradient: 'from-orange-400 to-amber-400', text: 'text-orange-500', bgLight: 'bg-orange-50', bgDark: 'bg-orange-900/20' }
  };
  const c = colors[color];
  
  // Extract numeric value for animation
  const numericValue = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.-]/g, '')) || 0 : value;
  const isMoneyFormat = typeof value === 'string' && value.includes('$');
  
  return (
    <div className={`flex items-center gap-3 p-4 rounded-2xl transition-colors duration-300 ${darkMode ? c.bgDark : c.bgLight}`}>
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.gradient} flex items-center justify-center text-white shadow-lg`}>
        {icon}
      </div>
      <div>
        <p className={`text-xs font-medium uppercase tracking-wide ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{label}</p>
        <div className={`flex items-center ${pop ? 'number-pop' : ''}`}>
          <AnimatedNumber 
            value={numericValue} 
            prefix={isMoneyFormat ? '$' : ''} 
            className={`text-xl font-bold ${c.text}`}
            formatter={(val) => val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          />
          {previousValue !== null && <TrendArrow current={numericValue} previous={previousValue} />}
        </div>
      </div>
    </div>
  );
};

// Shared constants
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// MonthYearSelector - needs darkMode prop
const MonthYearSelector = ({ month, year, setMonth, setYear, className = '', variant = 'default', darkMode }) => (
  <div className={`flex gap-2 ${className}`}>
    <CandySelect value={month} onChange={(e) => setMonth(parseInt(e.target.value))} className="min-w-[80px]" variant={variant} darkMode={darkMode}>
      {MONTH_NAMES.map((m, i) => <option key={i} value={i}>{m}</option>)}
    </CandySelect>
    <CandySelect value={year} onChange={(e) => setYear(parseInt(e.target.value))} className="min-w-[90px]" variant={variant} darkMode={darkMode}>
      {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 5 + i).map(y => (
        <option key={y} value={y}>{y}</option>
      ))}
    </CandySelect>
  </div>
);

// TabButton - needs darkMode prop
const TabButton = ({ active, onClick, icon, label, darkMode }) => (
  <button
    onClick={onClick}
    className={`btn-bounce relative px-4 py-3 rounded-2xl font-semibold flex items-center gap-2 transition-all ${
      active
        ? darkMode 
          ? 'bg-[#2D2A3E] text-pink-400 shadow-lg scale-105'
          : 'bg-white text-pink-600 shadow-lg scale-105'
        : darkMode
          ? 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
          : 'text-gray-500 hover:text-gray-700 hover:bg-white/50'
    }`}
  >
    {icon}
    <span className="hidden sm:inline">{label}</span>
    {active && (
      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-2 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 rounded-full shadow-lg" />
    )}
  </button>
);

// EmptyState - simplified with defaults
const EmptyState = ({ darkMode, icon = "📊", title = "No data yet", subtitle = "Start tracking to see insights!" }) => (
  <div className="text-center py-10 fade-in-up">
    <div className="text-5xl mb-3">{icon}</div>
    <h3 className={`text-lg font-bold mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{title}</h3>
    <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{subtitle}</p>
  </div>
);

export default function FinanceTrackerRevamped() {
  // ============= STATE =============
  const [viewMode, setViewMode] = useState('income');
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoadedSuccessfully, setHasLoadedSuccessfully] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage first, then system preference
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('financial-darkmode');
      if (saved !== null) return JSON.parse(saved);
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  
  // Income state
  const [oneTimeIncomes, setOneTimeIncomes] = useState([]);
  const [oneTimeName, setOneTimeName] = useState('');
  const [oneTimeAmount, setOneTimeAmount] = useState('');
  const [oneTimeNotes, setOneTimeNotes] = useState('');
  const [oneTimeDate, setOneTimeDate] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  });
  const [selectedIncomeMonth, setSelectedIncomeMonth] = useState(new Date().getMonth());
  const [selectedIncomeYear, setSelectedIncomeYear] = useState(new Date().getFullYear());
  const [expandedOneTime, setExpandedOneTime] = useState({});
  const [annualIncomeCategories, setAnnualIncomeCategories] = useState([]);
  const [incomeInputMode, setIncomeInputMode] = useState('manual'); // 'manual' or 'quick'
  const [quickSources, setQuickSources] = useState(['Salary', 'Freelance', 'Gift']);
  const [editingQuickSource, setEditingQuickSource] = useState(null);

  // Cards state (unified credit + debit)
  const [cards, setCards] = useState([]); // Each card has a 'type' field: 'credit' or 'debit'
  const [cardViewFilter, setCardViewFilter] = useState('all'); // 'all', 'credit', 'debit'
  const [expandedCards, setExpandedCards] = useState({});
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [addCardType, setAddCardType] = useState('credit'); // 'credit' or 'debit'
  const [newCardName, setNewCardName] = useState('');
  const [newCardBalance, setNewCardBalance] = useState('');
  const [newCardLimit, setNewCardLimit] = useState('');
  const [newCardAPR, setNewCardAPR] = useState('');
  const [newCardMinPayment, setNewCardMinPayment] = useState('');
  const [newCardDueDay, setNewCardDueDay] = useState('15');
  const [showPaymentModal, setShowPaymentModal] = useState(null); // card id
  const [paymentAmount, setPaymentAmount] = useState('');
  const [showDepositModal, setShowDepositModal] = useState(null); // debit card id
  const [depositAmount, setDepositAmount] = useState('');
  const [showSpendModal, setShowSpendModal] = useState(null); // credit card id for spending
  const [spendAmount, setSpendAmount] = useState('');
  const [showWithdrawModal, setShowWithdrawModal] = useState(null); // debit card id for withdrawal
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [cardTxPage, setCardTxPage] = useState({}); // { cardId: pageNumber }
  const [categoryBreakdownView, setCategoryBreakdownView] = useState('monthly'); // 'monthly', 'alltime-pie'
  const [insightSet, setInsightSet] = useState(0); // 0 = first set, 1 = second set
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  
  // Goals state
  const [goals, setGoals] = useState([]);
  const [archivedGoals, setArchivedGoals] = useState([]);
  const [showGoalArchives, setShowGoalArchives] = useState(false);
  const [goalsUnlocked, setGoalsUnlocked] = useState(false);
  const [goalSliderPosition, setGoalSliderPosition] = useState(0); // 0 = locked, 100 = unlocked
  const [isDraggingGoalSlider, setIsDraggingGoalSlider] = useState(false);
  const [showAddGoalModal, setShowAddGoalModal] = useState(false);
  const [newGoalName, setNewGoalName] = useState('');
  const [newGoalAmount, setNewGoalAmount] = useState('');
  const [newGoalStartDate, setNewGoalStartDate] = useState(getLocalDateString());
  const [newGoalEndDate, setNewGoalEndDate] = useState('');
  const [newGoalType, setNewGoalType] = useState('auto'); // 'auto' or 'manual'
  const [newGoalCategory, setNewGoalCategory] = useState('savings'); // for auto-linked
  const [newGoalCurrentAmount, setNewGoalCurrentAmount] = useState(''); // for manual
  
  // Expense heatmap state
  const [heatmapMonth, setHeatmapMonth] = useState(new Date().getMonth());
  const [heatmapYear, setHeatmapYear] = useState(new Date().getFullYear());

  // Fullscreen chart state
  const [fullscreenChart, setFullscreenChart] = useState(null); // 'expense', 'income', 'savings', 'category'
  const chartRefs = useRef([]);

  // Investment state
  const [investments, setInvestments] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState('');
  const [investAmount, setInvestAmount] = useState('');
  const [investQuantity, setInvestQuantity] = useState('');
  const [investType, setInvestType] = useState('buy'); // 'buy' or 'sell'
  const [investMonth, setInvestMonth] = useState(new Date().getMonth());
  const [investYear, setInvestYear] = useState(new Date().getFullYear());
  const [expandedAssets, setExpandedAssets] = useState({});
  const [currentValues, setCurrentValues] = useState({}); // Current price per unit for each asset
  const [investCalendarYear, setInvestCalendarYear] = useState(new Date().getFullYear()); // For monthly investment calendar
  const [assetInputMode, setAssetInputMode] = useState('manual'); // 'manual' or 'quick'
  const [quickAssets, setQuickAssets] = useState(['Morpho', 'Mamo', 'Btc']);
  const [editingQuickAsset, setEditingQuickAsset] = useState(null); // Index being edited

  // Expense state
  const [expenses, setExpenses] = useState([]);
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('Food');
  const [expenseDate, setExpenseDate] = useState(getLocalDateString());
  const [expenseNotes, setExpenseNotes] = useState('');
  const [selectedBudgetMonth, setSelectedBudgetMonth] = useState(new Date().getMonth());
  const [selectedBudgetYear, setSelectedBudgetYear] = useState(new Date().getFullYear());
  const [categoryNotes, setCategoryNotes] = useState({ Subscriptions: '', Misc: '' });
  const [recurringExpenses, setRecurringExpenses] = useState([]);
  const [showRecurringModal, setShowRecurringModal] = useState(false);
  const [newRecurringName, setNewRecurringName] = useState('');
  const [newRecurringAmount, setNewRecurringAmount] = useState('');
  const [newRecurringCategory, setNewRecurringCategory] = useState('Subscriptions');
  const [newRecurringDay, setNewRecurringDay] = useState('1');

  // Work state
  const [workLogs, setWorkLogs] = useState([]);
  const [workHours, setWorkHours] = useState('');
  const [workJob, setWorkJob] = useState('');
  const [workDescription, setWorkDescription] = useState('');
  const [workDate, setWorkDate] = useState(getLocalDateString());
  const [workHourlyRate, setWorkHourlyRate] = useState('');
  const [jobRates, setJobRates] = useState({});
  const [expandedJobs, setExpandedJobs] = useState({});
  const [selectedWorkMonth, setSelectedWorkMonth] = useState(new Date().getMonth());
  const [selectedWorkYear, setSelectedWorkYear] = useState(new Date().getFullYear());
  const [workMode, setWorkMode] = useState('hours'); // 'hours' or 'clock'
  const [clockInTime, setClockInTime] = useState('');
  const [clockOutTime, setClockOutTime] = useState('');
  const [jobInputMode, setJobInputMode] = useState('manual'); // 'manual' or 'quick'
  const [quickJobs, setQuickJobs] = useState(['Main Job', 'Side Gig', 'Freelance']);
  const [editingQuickJob, setEditingQuickJob] = useState(null);

  // Pagination states
  const [assetTransactionPages, setAssetTransactionPages] = useState({}); // { assetName: pageNumber }
  const [expensePage, setExpensePage] = useState(0);
  const [workLogPages, setWorkLogPages] = useState({}); // { jobName: pageNumber }
  
  // Job payment tracking
  const [jobLastPaidDates, setJobLastPaidDates] = useState({}); // { jobName: 'YYYY-MM-DD' }
  const [showPayDateModal, setShowPayDateModal] = useState(false);
  const [selectedJobForPay, setSelectedJobForPay] = useState(null);
  const [payDateInput, setPayDateInput] = useState('');

  // Todo state
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState('');
  const [todoDate, setTodoDate] = useState(getLocalDateString());
  const [todoTime, setTodoTime] = useState('');
  const [todoPriority, setTodoPriority] = useState('medium'); // 'low', 'medium', 'high'
  const [addingSubtaskFor, setAddingSubtaskFor] = useState(null);
  const [subtaskText, setSubtaskText] = useState('');
  const [archivedTodos, setArchivedTodos] = useState([]);
  const [showArchives, setShowArchives] = useState(false);
  const [archivePage, setArchivePage] = useState(0); // For pagination

  // Trends state
  const [trendsStartMonth, setTrendsStartMonth] = useState(() => {
    const now = new Date();
    return { month: Math.max(0, now.getMonth() - 5), year: now.getFullYear() };
  });
  const [trendsEndMonth, setTrendsEndMonth] = useState(() => {
    const now = new Date();
    return { month: now.getMonth(), year: now.getFullYear() };
  });
  const [reviewYear, setReviewYear] = useState(new Date().getFullYear());

  // UI state
  const [showBackupModal, setShowBackupModal] = useState(false);
  const [backupData, setBackupData] = useState('');
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [restoreText, setRestoreText] = useState('');
  const [showSaveIndicator, setShowSaveIndicator] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showAnalyticsExport, setShowAnalyticsExport] = useState(false);
  const [analyticsExportData, setAnalyticsExportData] = useState('');
  const [newAchievement, setNewAchievement] = useState(null);
  const [unlockedAchievements, setUnlockedAchievements] = useState([]);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [newItemId, setNewItemId] = useState(null);
  const [shakeField, setShakeField] = useState(null);
  const [popTotal, setPopTotal] = useState(null);
  const [lastSaved, setLastSaved] = useState(null);
  const [collapsedSections, setCollapsedSections] = useState({});

  // Animation states
  const [deletingItems, setDeletingItems] = useState(new Set()); // Track items being deleted
  const [successButton, setSuccessButton] = useState(null); // Track which button shows success

  // Undo deletion state
  const [pendingDeletion, setPendingDeletion] = useState(null); // { type, item, timeoutId }
  const [showUndoToast, setShowUndoToast] = useState(false);

  // Swipe navigation state
  const [swipeDirection, setSwipeDirection] = useState(null); // 'left' or 'right' for animation
  const [isTransitioning, setIsTransitioning] = useState(false);
  const touchStartRef = useRef({ x: 0, y: 0 });
  const touchEndRef = useRef({ x: 0, y: 0 });
  const mainContentRef = useRef(null);

  // Long-press context menu
  const [contextMenu, setContextMenu] = useState(null); // { type, item, x, y }
  const longPressTimerRef = useRef(null);

  // Input refs for auto-focus
  const incomeNameRef = useRef(null);
  const investAssetRef = useRef(null);
  const expenseAmountRef = useRef(null);
  const workHoursRef = useRef(null);
  const todoTextRef = useRef(null);

  // Character easter egg
  const [showCharacter, setShowCharacter] = useState(false);
  const [characterQuote, setCharacterQuote] = useState('');
  const idleTimerRef = useRef(null);

  // ============= CONSTANTS =============
  const EXPENSE_CATEGORIES = ['Food', 'Gas', 'Parking', 'Car', 'Subscriptions', 'Misc'];
  
  const CATEGORY_STYLES = {
    'Food': { color: '#5FCFB5', bg: '#E8FBF6', icon: '🍕', gradient: 'from-emerald-400 to-teal-400' },
    'Gas': { color: '#FFB347', bg: '#FFF4E6', icon: '⛽', gradient: 'from-orange-400 to-amber-400' },
    'Parking': { color: '#6BB9F0', bg: '#E6F4FF', icon: '🅿️', gradient: 'from-blue-400 to-cyan-400' },
    'Car': { color: '#C490E4', bg: '#F5E6FF', icon: '🚗', gradient: 'from-purple-400 to-violet-400' },
    'Subscriptions': { color: '#FF6B9D', bg: '#FFE6EE', icon: '📱', gradient: 'from-pink-400 to-rose-400' },
    'Misc': { color: '#FFD93D', bg: '#FFFBE6', icon: '📦', gradient: 'from-yellow-400 to-amber-300' }
  };

  const CHART_COLORS = ['#FF6B9D', '#6BB9F0', '#5FCFB5', '#FFD93D', '#C490E4', '#FFB347', '#FF8C7F'];
  
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const fullMonthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const motivationalQuotes = [
    "You're doing amazing! 🌟",
    "Every penny counts! 💰",
    "Keep crushing those goals! 🎯",
    "Financial freedom ahead! 🚀",
    "You're a budgeting superstar! ⭐",
    "Smart money moves! 💪",
    "Building wealth one day at a time! 🏆",
    "Your future self thanks you! 🙌"
  ];

  // ============= ACHIEVEMENTS =============
  const achievements = [
    { id: 'first_expense', name: 'First Step', description: 'Log your first expense', icon: '👣', check: () => expenses.length >= 1 },
    { id: 'expense_10', name: 'Tracker', description: 'Log 10 expenses', icon: '📝', check: () => expenses.length >= 10 },
    { id: 'expense_50', name: 'Dedicated', description: 'Log 50 expenses', icon: '📊', check: () => expenses.length >= 50 },
    { id: 'expense_100', name: 'Centurion', description: 'Log 100 expenses', icon: '💯', check: () => expenses.length >= 100 },
    { id: 'first_income', name: 'Money Maker', description: 'Log your first income', icon: '💵', check: () => oneTimeIncomes.length >= 1 },
    { id: 'income_1000', name: 'Thousandaire', description: 'Earn $1,000 total', icon: '💰', check: () => oneTimeIncomes.reduce((sum, i) => sum + i.amount, 0) >= 1000 },
    { id: 'income_5000', name: 'High Roller', description: 'Earn $5,000 total', icon: '🤑', check: () => oneTimeIncomes.reduce((sum, i) => sum + i.amount, 0) >= 5000 },
    { id: 'income_10000', name: 'Big League', description: 'Earn $10,000 total', icon: '🏆', check: () => oneTimeIncomes.reduce((sum, i) => sum + i.amount, 0) >= 10000 },
    { id: 'first_investment', name: 'Investor', description: 'Make your first investment', icon: '📈', check: () => investments.length >= 1 },
    { id: 'invest_5000', name: 'Portfolio Builder', description: 'Invest $5,000 total', icon: '💎', check: () => investments.reduce((sum, i) => sum + i.amount, 0) >= 5000 },
    { id: 'first_todo', name: 'Planner', description: 'Create your first task', icon: '✅', check: () => todos.length >= 1 || archivedTodos.length >= 1 },
    { id: 'todo_25', name: 'Task Master', description: 'Complete 25 tasks', icon: '🎯', check: () => archivedTodos.filter(t => t.completed).length >= 25 },
    { id: 'first_work', name: 'Clock Puncher', description: 'Log your first work hours', icon: '⏰', check: () => workLogs.length >= 1 },
    { id: 'work_100', name: 'Hard Worker', description: 'Log 100 work hours', icon: '💪', check: () => workLogs.reduce((sum, w) => sum + w.hours, 0) >= 100 },
    { id: 'diversified', name: 'Diversified', description: 'Invest in 3+ assets', icon: '🌈', check: () => [...new Set(investments.map(i => i.asset))].length >= 3 },
    { id: 'budget_categories', name: 'Organizer', description: 'Use all categories', icon: '🗂️', check: () => [...new Set(expenses.map(e => e.category))].length >= 6 },
  ];

  // ============= EFFECTS =============
  useEffect(() => {
    loadData();
  }, []);

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem('financial-darkmode', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    if (!isLoading && hasLoadedSuccessfully) {
      saveData();
    }
  }, [oneTimeIncomes, investments, expenses, workLogs, todos, archivedTodos, categoryNotes, recurringExpenses, jobRates, currentValues, unlockedAchievements, annualIncomeCategories, cards, quickAssets, quickSources, quickJobs, goals, archivedGoals, jobLastPaidDates, viewMode, isLoading, hasLoadedSuccessfully]);

  useEffect(() => {
    if (isLoading) return;
    achievements.forEach(achievement => {
      if (!unlockedAchievements.includes(achievement.id) && achievement.check()) {
        setUnlockedAchievements(prev => [...prev, achievement.id]);
        setNewAchievement(achievement);
        setTimeout(() => {
          setNewAchievement(null);
        }, 5000);
      }
    });
  }, [expenses, oneTimeIncomes, investments, todos, archivedTodos, workLogs, isLoading]);

  // Debounced scroll handler to prevent excessive re-renders
  useEffect(() => {
    let scrollTimeout = null;
    let lastScrollTop = 0;
    
    const handleScroll = () => {
      // Only update state if we've crossed the threshold
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
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, []);

  // Lock body scroll when achievements modal is open - iOS Safari fix
  useEffect(() => {
    if (showAchievements) {
      // Store current scroll position
      const scrollY = window.scrollY;
      // Lock body
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      }
    }
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
    };
  }, [showAchievements]);

  // Use a ref to track character visibility to avoid state updates on every keypress
  const showCharacterRef = useRef(false);
  
  // Idle character easter egg - using minimal events to avoid touch interference
  useEffect(() => {
    const resetIdle = () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      // Only update state if character is actually showing (avoids unnecessary re-renders)
      if (showCharacterRef.current) {
        showCharacterRef.current = false;
        setShowCharacter(false);
      }
      idleTimerRef.current = setTimeout(() => {
        setCharacterQuote(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);
        showCharacterRef.current = true;
        setShowCharacter(true);
      }, 90000);
    };
    // Only listen to keydown - removed touch/click events that interfere with buttons
    const events = ['keydown'];
    events.forEach(e => document.addEventListener(e, resetIdle, { passive: true }));
    resetIdle();
    return () => {
      events.forEach(e => document.removeEventListener(e, resetIdle));
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, []);

  // ============= DATA FUNCTIONS =============
  const loadData = () => {
    try {
      // Try loading from single unified key first
      const savedData = localStorage.getItem('financial-app-data');
      
      if (savedData) {
        // New unified format
        const data = JSON.parse(savedData);
        
        if (data.investments) {
          const loaded = data.investments;
          loaded.forEach(inv => inv.date = new Date(inv.date));
          setInvestments(loaded);
        }
        if (data.settings?.viewMode) setViewMode(data.settings.viewMode);
        if (data.expenses) setExpenses(data.expenses);
        if (data.workLogs) setWorkLogs(data.workLogs);
        if (data.jobLastPaidDates) setJobLastPaidDates(data.jobLastPaidDates);
        if (data.todos) setTodos(data.todos);
        if (data.oneTimeIncomes) setOneTimeIncomes(data.oneTimeIncomes);
        if (data.annualIncomeCategories) setAnnualIncomeCategories(data.annualIncomeCategories);
        if (data.archivedTodos) {
          // Migrate old format { date, todos: [] } to flat list
          const archives = data.archivedTodos;
          if (archives.length > 0 && archives[0].todos) {
            // Old format - flatten it
            const flattened = [];
            archives.forEach(archive => {
              archive.todos.forEach(task => flattened.push({ ...task, archivedOn: archive.archivedOn }));
            });
            setArchivedTodos(flattened);
          } else {
            // Already flat format
            setArchivedTodos(archives);
          }
        }
        if (data.categoryNotes) setCategoryNotes(data.categoryNotes);
        if (data.recurringExpenses) setRecurringExpenses(data.recurringExpenses);
        if (data.jobRates) setJobRates(data.jobRates);
        if (data.currentValues) setCurrentValues(data.currentValues);
        if (data.unlockedAchievements) setUnlockedAchievements(data.unlockedAchievements);
        if (data.cards) setCards(data.cards);
        if (data.quickAssets) setQuickAssets(data.quickAssets);
        if (data.quickSources) setQuickSources(data.quickSources);
        if (data.quickJobs) setQuickJobs(data.quickJobs);
        if (data.goals) setGoals(data.goals);
        if (data.archivedGoals) setArchivedGoals(data.archivedGoals);
        
        setHasLoadedSuccessfully(true);
      } else {
        // Migration from legacy multi-key format
        const savedInvestments = localStorage.getItem('financial-investments');
        const savedSettings = localStorage.getItem('financial-settings');
        const savedExpenses = localStorage.getItem('financial-expenses');
        const savedWorkLogs = localStorage.getItem('financial-worklogs');
        const savedJobPaidDates = localStorage.getItem('financial-job-paid-dates');
        const savedTodos = localStorage.getItem('financial-todos');
        const savedOneTime = localStorage.getItem('financial-onetime');
        const savedAnnual = localStorage.getItem('financial-annual');
        const savedArchived = localStorage.getItem('financial-archived-todos');
        const savedNotes = localStorage.getItem('financial-category-notes');
        const savedRecurring = localStorage.getItem('financial-recurring');
        const savedJobRates = localStorage.getItem('financial-jobrates');
        const savedCurrentValues = localStorage.getItem('financial-currentvalues');
        const savedAchievements = localStorage.getItem('financial-achievements');
        const savedCards = localStorage.getItem('financial-cards');
        const savedCreditCards = localStorage.getItem('financial-creditcards');
        const savedDebitCards = localStorage.getItem('financial-debitcards');
        const savedQuickAssets = localStorage.getItem('financial-quickassets');
        const savedQuickSources = localStorage.getItem('financial-quicksources');
        const savedQuickJobs = localStorage.getItem('financial-quickjobs');
        const savedGoals = localStorage.getItem('financial-goals');
        const savedArchivedGoals = localStorage.getItem('financial-archived-goals');

        // Check if any legacy data exists
        const hasLegacyData = savedInvestments || savedExpenses || savedWorkLogs || savedTodos || savedOneTime || savedCards || savedCreditCards || savedDebitCards || savedGoals;

        if (hasLegacyData) {
          if (savedInvestments) {
            const loaded = JSON.parse(savedInvestments);
            loaded.forEach(inv => inv.date = new Date(inv.date));
            setInvestments(loaded);
          }
          if (savedSettings) {
            const settings = JSON.parse(savedSettings);
            setViewMode(settings.viewMode || 'income');
          }
          if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
          if (savedWorkLogs) setWorkLogs(JSON.parse(savedWorkLogs));
          if (savedJobPaidDates) setJobLastPaidDates(JSON.parse(savedJobPaidDates));
          if (savedTodos) setTodos(JSON.parse(savedTodos));
          if (savedOneTime) setOneTimeIncomes(JSON.parse(savedOneTime));
          if (savedAnnual) setAnnualIncomeCategories(JSON.parse(savedAnnual));
          if (savedArchived) {
            const archives = JSON.parse(savedArchived);
            if (archives.length > 0 && archives[0].todos) {
              const flattened = [];
              archives.forEach(archive => {
                archive.todos.forEach(task => flattened.push({ ...task, archivedOn: archive.archivedOn }));
              });
              setArchivedTodos(flattened);
            } else {
              setArchivedTodos(archives);
            }
          }
          if (savedNotes) setCategoryNotes(JSON.parse(savedNotes));
          if (savedRecurring) setRecurringExpenses(JSON.parse(savedRecurring));
          if (savedJobRates) setJobRates(JSON.parse(savedJobRates));
          if (savedCurrentValues) setCurrentValues(JSON.parse(savedCurrentValues));
          if (savedAchievements) setUnlockedAchievements(JSON.parse(savedAchievements));
          
          // Migrate cards
          if (savedCards) {
            setCards(JSON.parse(savedCards));
          } else {
            const migratedCards = [];
            if (savedCreditCards) {
              JSON.parse(savedCreditCards).forEach(c => migratedCards.push({ ...c, type: 'credit' }));
            }
            if (savedDebitCards) {
              JSON.parse(savedDebitCards).forEach(c => migratedCards.push({ ...c, type: 'debit' }));
            }
            if (migratedCards.length > 0) setCards(migratedCards);
          }
          
          if (savedQuickAssets) setQuickAssets(JSON.parse(savedQuickAssets));
          if (savedQuickSources) setQuickSources(JSON.parse(savedQuickSources));
          if (savedQuickJobs) setQuickJobs(JSON.parse(savedQuickJobs));
          if (savedGoals) setGoals(JSON.parse(savedGoals));
          if (savedArchivedGoals) setArchivedGoals(JSON.parse(savedArchivedGoals));
          
          setHasLoadedSuccessfully(true);
        }
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveData = () => {
    try {
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
        cards,
        quickAssets,
        quickSources,
        quickJobs,
        goals,
        archivedGoals,
        jobLastPaidDates,
        settings: { viewMode },
        savedAt: new Date().toISOString()
      };
      
      localStorage.setItem('financial-app-data', JSON.stringify(allData));
      
      setLastSaved(new Date());
      setShowSaveIndicator(true);
      setTimeout(() => setShowSaveIndicator(false), 1500);
    } catch (error) {
      console.error('Failed to save:', error);
    }
  };

  const exportData = () => {
    const allData = {
      investments, expenses, workLogs, todos, oneTimeIncomes,
      annualIncomeCategories, archivedTodos, categoryNotes,
      recurringExpenses, jobRates, currentValues, unlockedAchievements,
      cards, quickAssets, quickSources, quickJobs, goals, archivedGoals,
      jobLastPaidDates,
      settings: { viewMode },
      exportDate: new Date().toISOString()
    };
    setBackupData(JSON.stringify(allData));
    setShowBackupModal(true);
  };

  const restoreFromText = () => {
    if (!restoreText.trim()) return;
    try {
      const data = JSON.parse(restoreText);
      if (data.investments) {
        data.investments.forEach(inv => inv.date = new Date(inv.date));
        setInvestments(data.investments);
      }
      if (data.expenses) setExpenses(data.expenses);
      if (data.workLogs) setWorkLogs(data.workLogs);
      if (data.todos) setTodos(data.todos);
      if (data.oneTimeIncomes) setOneTimeIncomes(data.oneTimeIncomes);
      if (data.annualIncomeCategories) setAnnualIncomeCategories(data.annualIncomeCategories);
      if (data.archivedTodos) {
        const archives = data.archivedTodos;
        if (archives.length > 0 && archives[0].todos) {
          const flattened = [];
          archives.forEach(archive => {
            archive.todos.forEach(task => flattened.push({ ...task, archivedOn: archive.archivedOn }));
          });
          setArchivedTodos(flattened);
        } else {
          setArchivedTodos(archives);
        }
      }
      if (data.categoryNotes) setCategoryNotes(data.categoryNotes);
      if (data.recurringExpenses) setRecurringExpenses(data.recurringExpenses);
      if (data.jobRates) setJobRates(data.jobRates);
      if (data.currentValues) setCurrentValues(data.currentValues);
      if (data.unlockedAchievements) setUnlockedAchievements(data.unlockedAchievements);
      // Handle cards - new format or migrate from legacy
      if (data.cards) {
        setCards(data.cards);
      } else {
        const migratedCards = [];
        if (data.creditCards) data.creditCards.forEach(c => migratedCards.push({ ...c, type: 'credit' }));
        if (data.debitCards) data.debitCards.forEach(c => migratedCards.push({ ...c, type: 'debit' }));
        if (migratedCards.length > 0) setCards(migratedCards);
      }
      if (data.quickAssets) setQuickAssets(data.quickAssets);
      if (data.quickSources) setQuickSources(data.quickSources);
      if (data.quickJobs) setQuickJobs(data.quickJobs);
      if (data.goals) setGoals(data.goals);
      if (data.archivedGoals) setArchivedGoals(data.archivedGoals);
      if (data.jobLastPaidDates) setJobLastPaidDates(data.jobLastPaidDates);
      setRestoreText('');
      setShowRestoreModal(false);
    } catch (error) {
      alert('Error: Invalid backup data');
    }
  };

  const clearAllData = () => {
    // Remove unified key and all legacy keys
    const legacyKeys = ['financial-investments', 'financial-settings', 'financial-expenses', 'financial-worklogs', 
      'financial-todos', 'financial-onetime', 'financial-annual', 'financial-archived-todos',
      'financial-category-notes', 'financial-recurring', 'financial-jobrates', 'financial-currentvalues', 
      'financial-achievements', 'financial-cards', 'financial-creditcards', 'financial-debitcards', 'financial-quickassets',
      'financial-quicksources', 'financial-quickjobs', 'financial-goals', 'financial-archived-goals',
      'financial-job-paid-dates'];
    localStorage.removeItem('financial-app-data');
    legacyKeys.forEach(k => localStorage.removeItem(k));
    
    setInvestments([]); setExpenses([]); setWorkLogs([]); setTodos([]);
    setOneTimeIncomes([]); setAnnualIncomeCategories([]); setArchivedTodos([]);
    setCategoryNotes({ Subscriptions: '', Misc: '' }); setRecurringExpenses([]);
    setJobRates({}); setCurrentValues({}); setUnlockedAchievements([]);
    setCards([]); setGoals([]); setArchivedGoals([]);
    setJobLastPaidDates({});
    setQuickAssets(['Morpho', 'Mamo', 'Btc']);
    setQuickSources(['Salary', 'Freelance', 'Gift']);
    setQuickJobs(['Main Job', 'Side Gig', 'Freelance']);
    setViewMode('income'); setShowClearConfirm(false);
  };

  // ============= UTILITY FUNCTIONS =============
  const triggerShake = (fieldId) => {
    setShakeField(fieldId);
    setTimeout(() => setShakeField(null), 400);
    // Light vibration for error feedback
    if (navigator.vibrate) navigator.vibrate(50);
  };

  const triggerPop = (totalId) => {
    setPopTotal(totalId);
    setTimeout(() => setPopTotal(null), 300);
  };

  const triggerSuccess = (buttonId) => {
    setSuccessButton(buttonId);
    setTimeout(() => setSuccessButton(null), 600);
    // Subtle haptic feedback on success
    if (navigator.vibrate) navigator.vibrate([10, 30, 10]);
  };

  // Number formatting utility - format with commas
  const formatNumberInput = (value) => {
    // Remove non-numeric except decimal
    const cleaned = value.replace(/[^0-9.]/g, '');
    // Handle multiple decimals
    const parts = cleaned.split('.');
    if (parts.length > 2) {
      return parts[0] + '.' + parts.slice(1).join('');
    }
    // Format integer part with commas
    if (parts[0]) {
      parts[0] = parseInt(parts[0], 10).toLocaleString();
    }
    return parts.join('.');
  };

  // Parse formatted number back to raw number
  const parseFormattedNumber = (formatted) => {
    if (!formatted) return '';
    return formatted.replace(/,/g, '');
  };

  // Auto-rotate insights every 30 seconds when on trends tab
  useEffect(() => {
    if (viewMode !== 'trends') return;
    
    const interval = setInterval(() => {
      setInsightSet(prev => prev === 0 ? 1 : 0);
    }, 30000);
    
    return () => clearInterval(interval);
  }, [viewMode]);

  // Close category dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setShowCategoryDropdown(false);
    if (showCategoryDropdown) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showCategoryDropdown]);

  // Scroll animation observer for charts
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    // Observe all chart containers
    const chartElements = document.querySelectorAll('.chart-animate');
    chartElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [viewMode]); // Re-run when tab changes

  // Tab order for swipe navigation
  const tabOrder = ['income', 'investments', 'budget', 'clockin', 'todos', 'trends'];

  // Swipe gesture handlers
  const handleTouchStart = (e) => {
    if (contextMenu) {
      setContextMenu(null);
      return;
    }
    
    // Don't track swipe if touching interactive elements
    const target = e.target;
    const isInteractive = target.closest('button, input, textarea, select, a, [role="button"], .press-feedback, .touch-target');
    if (isInteractive) {
      touchStartRef.current = { x: 0, y: 0, cancelled: true, hasMoved: false };
      return;
    }
    
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      cancelled: false,
      hasMoved: false
    };
    // Reset touchEnd to detect if touchMove actually happens
    touchEndRef.current = { x: 0, y: 0 };
  };

  const handleTouchMove = (e) => {
    if (touchStartRef.current.cancelled) return;
    touchStartRef.current.hasMoved = true;
    touchEndRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    };
  };

  const handleTouchEnd = () => {
    // Skip if touch was on interactive element or if transitioning
    if (touchStartRef.current.cancelled || isTransitioning) {
      touchStartRef.current = { x: 0, y: 0, cancelled: false, hasMoved: false };
      touchEndRef.current = { x: 0, y: 0 };
      return;
    }
    
    // Skip if touchMove was never called (this was just a tap, not a swipe)
    if (!touchStartRef.current.hasMoved) {
      touchStartRef.current = { x: 0, y: 0, cancelled: false, hasMoved: false };
      touchEndRef.current = { x: 0, y: 0 };
      return;
    }
    
    const deltaX = touchEndRef.current.x - touchStartRef.current.x;
    const deltaY = touchEndRef.current.y - touchStartRef.current.y;
    
    // Only trigger if horizontal swipe is dominant and significant
    // Require at least 80px horizontal movement and horizontal must dominate vertical
    if (Math.abs(deltaX) > 80 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
      // Handle swipe from goals tab
      if (viewMode === 'goals') {
        if (deltaX > 0) {
          // Swipe right from goals - go to trends
          setSwipeDirection('right');
          setIsTransitioning(true);
          setTimeout(() => {
            setViewMode('trends');
            setGoalSliderPosition(0);
            setGoalsUnlocked(false);
            setSwipeDirection(null);
            setIsTransitioning(false);
          }, 300);
        }
        // Reset touch positions and return early
        touchStartRef.current = { x: 0, y: 0, cancelled: false, hasMoved: false };
        touchEndRef.current = { x: 0, y: 0 };
        return;
      }
      
      const currentIndex = tabOrder.indexOf(viewMode);
      
      if (deltaX < 0 && currentIndex < tabOrder.length - 1) {
        // Swipe left - go to next tab
        setSwipeDirection('left');
        setIsTransitioning(true);
        setTimeout(() => {
          setViewMode(tabOrder[currentIndex + 1]);
          setSwipeDirection(null);
          setIsTransitioning(false);
        }, 300);
      } else if (deltaX > 0 && currentIndex > 0) {
        // Swipe right - go to previous tab
        setSwipeDirection('right');
        setIsTransitioning(true);
        setTimeout(() => {
          setViewMode(tabOrder[currentIndex - 1]);
          setSwipeDirection(null);
          setIsTransitioning(false);
        }, 300);
      }
    }
    
    // Reset touch positions
    touchStartRef.current = { x: 0, y: 0, cancelled: false, hasMoved: false };
    touchEndRef.current = { x: 0, y: 0 };
  };

  // Undo deletion system - simpler approach
  const scheduleDelete = (type, item, restoreCallback) => {
    // Cancel any existing pending deletion (don't restore - it's already gone)
    if (pendingDeletion?.timeoutId) {
      clearTimeout(pendingDeletion.timeoutId);
    }
    
    // Show the undo toast
    setShowUndoToast(true);
    
    // Schedule clearing the undo option (item is already removed from state)
    const timeoutId = setTimeout(() => {
      setPendingDeletion(null);
      setShowUndoToast(false);
    }, 3500);
    
    setPendingDeletion({ type, item, timeoutId, restoreCallback });
  };

  const undoDelete = () => {
    if (pendingDeletion) {
      // Restore the item
      pendingDeletion.restoreCallback?.();
      
      // Clear the timeout and pending state
      if (pendingDeletion.timeoutId) {
        clearTimeout(pendingDeletion.timeoutId);
      }
    }
    setPendingDeletion(null);
    setShowUndoToast(false);
  };

  // Long-press context menu handlers
  const longPressTriggeredRef = useRef(false);
  
  const handleLongPressStart = (e, type, item) => {
    const touch = e.touches ? e.touches[0] : e;
    const x = touch.clientX;
    const y = touch.clientY;
    
    longPressTriggeredRef.current = false;
    
    longPressTimerRef.current = setTimeout(() => {
      longPressTriggeredRef.current = true;
      setContextMenu({ type, item, x, y });
      // Haptic feedback if available
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
    
    // If long press was triggered, prevent the touchend/mouseup from doing anything else
    if (longPressTriggeredRef.current) {
      e.preventDefault();
      e.stopPropagation();
      // Reset after a short delay to allow menu to stay open
      setTimeout(() => {
        longPressTriggeredRef.current = false;
      }, 100);
    }
  };

  const handleLongPressMove = (e) => {
    // Cancel long press if user moves finger
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  };

  const handleContextMenuAction = (action) => {
    if (!contextMenu) return;
    
    const { type, item } = contextMenu;
    
    switch (action) {
      case 'delete':
        if (type === 'income') removeOneTimeIncome(item.id);
        else if (type === 'investment') removeInvestment(item.id);
        else if (type === 'expense') removeExpense(item.id);
        else if (type === 'worklog') removeWorkLog(item.id);
        else if (type === 'todo') deleteTodo(item.id);
        break;
      case 'duplicate':
        if (type === 'income') {
          const newItem = { ...item, id: Date.now(), date: getLocalDateString() };
          setOneTimeIncomes([newItem, ...oneTimeIncomes]);
        } else if (type === 'expense') {
          const newItem = { ...item, id: Date.now(), date: getLocalDateString() };
          setExpenses([newItem, ...expenses]);
        } else if (type === 'investment') {
          const newItem = { ...item, id: Date.now(), date: new Date(), month: new Date().getMonth(), year: new Date().getFullYear() };
          setInvestments([newItem, ...investments]);
        } else if (type === 'worklog') {
          const newItem = { ...item, id: Date.now(), date: getLocalDateString() };
          setWorkLogs([newItem, ...workLogs]);
        }
        break;
      case 'edit':
        // Pre-fill form with item data
        if (type === 'income') {
          setOneTimeName(item.name);
          setOneTimeAmount(item.amount.toString());
          setOneTimeNotes(item.notes || '');
          setOneTimeDate(item.date);
          // Remove the item so it can be re-added with edits
          setOneTimeIncomes(oneTimeIncomes.filter(i => i.id !== item.id));
        } else if (type === 'expense') {
          setExpenseAmount(item.amount.toString());
          setExpenseCategory(item.category);
          setExpenseNotes(item.notes || '');
          setExpenseDate(item.date);
          setExpenses(expenses.filter(e => e.id !== item.id));
        } else if (type === 'investment') {
          setSelectedAsset(item.asset);
          setInvestAmount(item.amount.toString());
          setInvestQuantity(item.quantity?.toString() || '');
          setInvestType(item.type || 'buy');
          setInvestMonth(item.month);
          setInvestYear(item.year);
          setInvestments(investments.filter(i => i.id !== item.id));
        } else if (type === 'worklog') {
          setWorkJob(item.job);
          setWorkHours(item.hours.toString());
          setWorkDescription(item.description || '');
          setWorkHourlyRate(item.hourlyRate?.toString() || '');
          setWorkDate(item.date);
          setWorkLogs(workLogs.filter(w => w.id !== item.id));
        }
        break;
    }
    
    setContextMenu(null);
  };

  // Close context menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      // Don't close if long press just triggered
      if (longPressTriggeredRef.current) {
        return;
      }
      
      if (contextMenu) {
        // Check if the click is inside the context menu
        const menuElement = document.querySelector('.context-menu');
        if (menuElement && menuElement.contains(e.target)) {
          // Click is inside menu, don't close
          return;
        }
        setContextMenu(null);
      }
    };
    
    // Small delay before adding listeners to prevent immediate closure
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }, 50);
    
    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [contextMenu]);

  // Animated delete with callback
  const animatedDelete = (id, deleteCallback) => {
    setDeletingItems(prev => new Set([...prev, id]));
    setTimeout(() => {
      deleteCallback();
      setDeletingItems(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 400);
  };

  // Clear form functions
  const clearIncomeForm = () => {
    setOneTimeName('');
    setOneTimeAmount('');
    setOneTimeNotes('');
    const now = new Date();
    setOneTimeDate(`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`);
    incomeNameRef.current?.focus();
  };

  const clearInvestmentForm = () => {
    setSelectedAsset('');
    setInvestAmount('');
    setInvestQuantity('');
    setInvestType('buy');
    investAssetRef.current?.focus();
  };

  const clearExpenseForm = () => {
    setExpenseAmount('');
    setExpenseCategory('Food');
    setExpenseDate(getLocalDateString());
    setExpenseNotes('');
    expenseAmountRef.current?.focus();
  };

  const clearWorkForm = () => {
    setWorkHours('');
    setWorkDescription('');
    setWorkDate(getLocalDateString());
    setClockInTime('');
    setClockOutTime('');
    workHoursRef.current?.focus();
  };

  const clearTodoForm = () => {
    setTodoText('');
    setTodoTime('');
    setTodoDate(getLocalDateString());
    setTodoPriority('medium');
    todoTextRef.current?.focus();
  };

  const formatDateDisplay = (dateStr) => {
    const parts = dateStr.split('-');
    return `${monthNames[parseInt(parts[1]) - 1]} ${parseInt(parts[2])}, ${parts[0]}`;
  };

  const formatMoney = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  // ============= INCOME FUNCTIONS =============
  const addOneTimeIncome = () => {
    if (!oneTimeName.trim()) { triggerShake('income-name'); return; }
    if (!oneTimeAmount) { triggerShake('income-amount'); return; }
    const newId = Date.now();
    setOneTimeIncomes([...oneTimeIncomes, {
      id: newId,
      name: oneTimeName,
      amount: parseFloat(oneTimeAmount),
      date: oneTimeDate,
      notes: oneTimeNotes.trim() || null
    }]);
    setOneTimeName('');
    setOneTimeAmount('');
    setOneTimeNotes('');
    setNewItemId(newId);
    setTimeout(() => setNewItemId(null), 500);
    triggerPop('income-total');
    triggerSuccess('add-income');
    setTimeout(() => incomeNameRef.current?.focus(), 100);
  };

  const removeOneTimeIncome = (id) => {
    const item = oneTimeIncomes.find(i => i.id === id);
    if (!item) return;
    
    // Animate and remove immediately
    setDeletingItems(prev => new Set([...prev, id]));
    setTimeout(() => {
      setOneTimeIncomes(prev => prev.filter(i => i.id !== id));
      setDeletingItems(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      
      // Schedule undo option (restore callback adds item back)
      scheduleDelete('income', item, () => {
        setOneTimeIncomes(prev => [item, ...prev]);
      });
    }, 400);
  };

  const getUniqueOneTimeNames = () => [...new Set(oneTimeIncomes.map(i => i.name))];

  const getOneTimeIncomesByNameForMonth = (name) => {
    return oneTimeIncomes.filter(income => {
      const parts = income.date.split('-');
      return income.name === name && parseInt(parts[1]) - 1 === selectedIncomeMonth && parseInt(parts[0]) === selectedIncomeYear;
    }).sort((a, b) => b.date.localeCompare(a.date));
  };

  const getOneTimeTotalByNameForMonth = (name) => {
    return oneTimeIncomes.filter(income => {
      const parts = income.date.split('-');
      return income.name === name && parseInt(parts[1]) - 1 === selectedIncomeMonth && parseInt(parts[0]) === selectedIncomeYear;
    }).reduce((sum, income) => sum + income.amount, 0);
  };

  const getTotalIncomeForMonth = () => {
    return oneTimeIncomes.filter(income => {
      const parts = income.date.split('-');
      return parseInt(parts[1]) - 1 === selectedIncomeMonth && parseInt(parts[0]) === selectedIncomeYear;
    }).reduce((sum, i) => sum + i.amount, 0);
  };

  const getPreviousMonthIncome = () => {
    const prevMonth = selectedIncomeMonth === 0 ? 11 : selectedIncomeMonth - 1;
    const prevYear = selectedIncomeMonth === 0 ? selectedIncomeYear - 1 : selectedIncomeYear;
    return oneTimeIncomes.filter(income => {
      const parts = income.date.split('-');
      return parseInt(parts[1]) - 1 === prevMonth && parseInt(parts[0]) === prevYear;
    }).reduce((sum, i) => sum + i.amount, 0);
  };

  const calculateAnnualIncome = () => {
    const totals = {};
    getUniqueOneTimeNames().filter(name => annualIncomeCategories.includes(name)).forEach(name => {
      totals[name] = oneTimeIncomes.filter(i => i.name === name).reduce((sum, i) => sum + i.amount, 0);
    });
    return Object.values(totals).reduce((sum, val) => sum + val, 0);
  };

  // ============= CREDIT CARD / DEBT FUNCTIONS =============
  const CARD_COLORS = [
    { emoji: '💳', bg: 'from-violet-500 to-purple-600', light: 'bg-violet-100', dark: 'bg-violet-900/30' },
    { emoji: '💳', bg: 'from-blue-500 to-cyan-600', light: 'bg-blue-100', dark: 'bg-blue-900/30' },
    { emoji: '💳', bg: 'from-emerald-500 to-teal-600', light: 'bg-emerald-100', dark: 'bg-emerald-900/30' },
    { emoji: '💳', bg: 'from-rose-500 to-pink-600', light: 'bg-rose-100', dark: 'bg-rose-900/30' },
    { emoji: '💳', bg: 'from-amber-500 to-orange-600', light: 'bg-amber-100', dark: 'bg-amber-900/30' },
    { emoji: '💳', bg: 'from-indigo-500 to-blue-600', light: 'bg-indigo-100', dark: 'bg-indigo-900/30' },
  ];

  const DEBIT_COLORS = [
    { bg: 'from-green-500 to-emerald-600', light: 'bg-green-100', dark: 'bg-green-900/30' },
    { bg: 'from-teal-500 to-cyan-600', light: 'bg-teal-100', dark: 'bg-teal-900/30' },
    { bg: 'from-lime-500 to-green-600', light: 'bg-lime-100', dark: 'bg-lime-900/30' },
    { bg: 'from-cyan-500 to-blue-600', light: 'bg-cyan-100', dark: 'bg-cyan-900/30' },
  ];

  // Unified card functions
  const creditCards = cards.filter(c => c.type === 'credit');
  const debitCards = cards.filter(c => c.type === 'debit');

  const addCard = () => {
    if (!newCardName.trim()) return;
    if (!newCardBalance && addCardType === 'credit') return;
    
    const colorArray = addCardType === 'credit' ? CARD_COLORS : DEBIT_COLORS;
    const existingOfType = cards.filter(c => c.type === addCardType);
    
    const newCard = {
      id: Date.now(),
      type: addCardType,
      name: newCardName,
      balance: parseFloat(newCardBalance) || 0,
      colorIndex: existingOfType.length % colorArray.length,
      createdAt: new Date().toISOString(),
      ...(addCardType === 'credit' ? {
        creditLimit: parseFloat(newCardLimit) || 0,
        apr: parseFloat(newCardAPR) || 0,
        minPayment: parseFloat(newCardMinPayment) || 0,
        dueDay: parseInt(newCardDueDay) || 15,
        payments: [],
      } : {
        transactions: [],
      })
    };
    
    setCards([...cards, newCard]);
    setNewCardName('');
    setNewCardBalance('');
    setNewCardLimit('');
    setNewCardAPR('');
    setNewCardMinPayment('');
    setNewCardDueDay('15');
    setShowAddCardModal(false);
  };

  const removeCard = (id) => {
    animatedDelete(id, () => setCards(cards.filter(c => c.id !== id)));
  };

  const makeCardPayment = (cardId) => {
    if (!paymentAmount || parseFloat(paymentAmount) <= 0) return;
    
    setCards(cards.map(card => {
      if (card.id === cardId && card.type === 'credit') {
        const payment = {
          id: Date.now(),
          amount: parseFloat(paymentAmount),
          date: getLocalDateString()
        };
        return {
          ...card,
          balance: Math.max(0, card.balance - parseFloat(paymentAmount)),
          payments: [...(card.payments || []), payment]
        };
      }
      return card;
    }));
    
    setPaymentAmount('');
    setShowPaymentModal(null);
  };

  const makeCreditCardSpend = (cardId) => {
    if (!spendAmount || parseFloat(spendAmount) <= 0) return;
    
    setCards(cards.map(card => {
      if (card.id === cardId && card.type === 'credit') {
        const spend = {
          id: Date.now(),
          amount: parseFloat(spendAmount),
          date: getLocalDateString(),
          type: 'spend'
        };
        return {
          ...card,
          balance: card.balance + parseFloat(spendAmount),
          payments: [...(card.payments || []), spend]
        };
      }
      return card;
    }));
    
    setSpendAmount('');
    setShowSpendModal(null);
  };

  const updateCardBalance = (cardId, newBalance) => {
    setCards(cards.map(card => 
      card.id === cardId ? { ...card, balance: parseFloat(newBalance) || 0 } : card
    ));
  };

  const makeDebitDeposit = (cardId) => {
    if (!depositAmount || parseFloat(depositAmount) <= 0) return;
    
    setCards(cards.map(card => {
      if (card.id === cardId && card.type === 'debit') {
        const transaction = {
          id: Date.now(),
          type: 'deposit',
          amount: parseFloat(depositAmount),
          date: getLocalDateString()
        };
        return {
          ...card,
          balance: card.balance + parseFloat(depositAmount),
          transactions: [...(card.transactions || []), transaction]
        };
      }
      return card;
    }));
    
    setDepositAmount('');
    setShowDepositModal(null);
  };

  const makeDebitWithdrawal = (cardId) => {
    if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) return;
    
    setCards(cards.map(card => {
      if (card.id === cardId && card.type === 'debit') {
        const transaction = {
          id: Date.now(),
          type: 'withdrawal',
          amount: parseFloat(withdrawAmount),
          date: getLocalDateString()
        };
        return {
          ...card,
          balance: Math.max(0, card.balance - parseFloat(withdrawAmount)),
          transactions: [...(card.transactions || []), transaction]
        };
      }
      return card;
    }));
    
    setWithdrawAmount('');
    setShowWithdrawModal(null);
  };

  const getCardDueDate = (card) => {
    const now = new Date();
    let dueDate = new Date(now.getFullYear(), now.getMonth(), card.dueDay);
    
    if (dueDate < now) {
      dueDate = new Date(now.getFullYear(), now.getMonth() + 1, card.dueDay);
    }
    
    const daysUntil = Math.ceil((dueDate - now) / (1000 * 60 * 60 * 24));
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
    
    if (months >= maxMonths) return { months: -1, message: 'Will take 30+ years' };
    
    const payoffDate = new Date();
    payoffDate.setMonth(payoffDate.getMonth() + months);
    
    return { 
      months, 
      date: payoffDate,
      message: months === 1 ? '1 month' : `${months} months`
    };
  };

  const getTotalDebt = () => creditCards.reduce((sum, card) => sum + card.balance, 0);
  const getTotalCreditLimit = () => creditCards.reduce((sum, card) => sum + (card.creditLimit || 0), 0);
  const getOverallUtilization = () => {
    const totalLimit = getTotalCreditLimit();
    if (totalLimit <= 0) return 0;
    return (getTotalDebt() / totalLimit) * 100;
  };
  const getTotalCheckingBalance = () => debitCards.reduce((sum, card) => sum + card.balance, 0);

  // ============= INVESTMENT FUNCTIONS =============
  const addInvestment = () => {
    if (!selectedAsset) { triggerShake('invest-asset'); return; }
    if (!investAmount) { triggerShake('invest-amount'); return; }
    
    // For sells, validate that we have enough quantity to sell
    if (investType === 'sell' && investQuantity) {
      const holdings = getAssetHoldings(selectedAsset);
      if (parseFloat(investQuantity) > holdings.totalQuantity) {
        triggerShake('invest-quantity');
        return;
      }
    }
    
    setInvestments([...investments, {
      id: Date.now(),
      asset: selectedAsset,
      amount: parseFloat(investAmount),
      quantity: investQuantity ? parseFloat(investQuantity) : null,
      type: investType, // 'buy' or 'sell'
      month: investMonth,
      year: investYear,
      date: new Date()
    }]);
    setInvestAmount('');
    setInvestQuantity('');
    triggerPop('invest-total');
    triggerSuccess('add-investment');
    setTimeout(() => investAssetRef.current?.focus(), 100);
  };

  const removeInvestment = (id) => {
    const item = investments.find(i => i.id === id);
    if (!item) return;
    
    setDeletingItems(prev => new Set([...prev, id]));
    setTimeout(() => {
      setInvestments(prev => prev.filter(i => i.id !== id));
      setDeletingItems(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      
      scheduleDelete('investment', item, () => {
        setInvestments(prev => [item, ...prev]);
      });
    }, 400);
  };

  const uniqueAssets = [...new Set(investments.map(i => i.asset))];

  // Get total cost basis (buys - sells)
  const getTotalInvested = () => investments.reduce((sum, i) => {
    if (i.type === 'sell') return sum - i.amount;
    return sum + i.amount;
  }, 0);

  // Get total buys only
  const getTotalBuys = () => investments.filter(i => i.type !== 'sell').reduce((sum, i) => sum + i.amount, 0);

  // Get total sells only
  const getTotalSells = () => investments.filter(i => i.type === 'sell').reduce((sum, i) => sum + i.amount, 0);

  // Get holdings for a specific asset (quantity owned, cost basis, average price)
  // Separates "tracked" (with quantities) from "untracked" (without quantities) for accurate P&L
  const getAssetHoldings = (asset) => {
    const assetInvestments = investments.filter(i => i.asset === asset);
    
    // Separate tracked (with quantity) from untracked (without quantity)
    let trackedQuantity = 0;
    let trackedCost = 0;
    let untrackedCost = 0;
    let realizedPnL = 0;
    let hasTracked = false;
    let hasUntracked = false;
    
    // Process all transactions
    assetInvestments.forEach(inv => {
      if (inv.type === 'sell') {
        // For sells, calculate realized P&L only if we have tracked quantity
        if (inv.quantity && trackedQuantity > 0) {
          const avgCostPerUnit = trackedCost / trackedQuantity;
          const costBasis = avgCostPerUnit * inv.quantity;
          realizedPnL += inv.amount - costBasis;
          trackedQuantity -= inv.quantity;
          trackedCost -= costBasis;
          hasTracked = true;
        } else if (inv.quantity) {
          // Sell with quantity but no tracked holdings - just reduce untracked
          untrackedCost -= inv.amount;
        } else {
          // Sell without quantity - reduce from untracked first, then tracked
          if (untrackedCost > 0) {
            untrackedCost -= Math.min(untrackedCost, inv.amount);
          } else {
            trackedCost -= inv.amount;
          }
        }
      } else {
        // Buy
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
    
    // Calculate P&L only from tracked holdings (where we know the quantity)
    const avgPrice = trackedQuantity > 0 ? trackedCost / trackedQuantity : 0;
    const currentPrice = currentValues[asset] || 0;
    const currentValue = trackedQuantity > 0 ? trackedQuantity * currentPrice : 0;
    // Only calculate unrealized P&L if we have tracked holdings AND a current price
    const unrealizedPnL = (currentPrice > 0 && trackedQuantity > 0) ? currentValue - trackedCost : 0;
    
    // Total cost includes both tracked and untracked
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
      hasMixedEntries: hasTracked && hasUntracked, // Flag for UI warning
      hasTrackedHoldings: hasTracked && trackedQuantity > 0
    };
  };

  // Get overall P&L across all assets
  const getTotalPnL = () => {
    let totalRealized = 0;
    let totalUnrealized = 0;
    let anyMixedEntries = false;
    let anyTrackedHoldings = false;
    
    uniqueAssets.forEach(asset => {
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
    return investments.filter(inv => inv.asset === asset).sort((a, b) => b.date - a.date);
  };

  const getPieChartData = () => {
    return uniqueAssets.map(asset => {
      const holdings = getAssetHoldings(asset);
      return {
        name: asset,
        value: Math.max(0, holdings.totalCost) // Only show positive holdings
      };
    }).filter(item => item.value > 0); // Filter out sold-off assets
  };

  // Get investment totals by month for the calendar
  const getMonthlyInvestments = (year) => {
    const monthlyData = {};
    for (let m = 0; m < 12; m++) {
      monthlyData[m] = { buys: 0, sells: 0 };
    }
    investments.forEach(inv => {
      // Use inv.year and inv.month (the selected investment period), not inv.date (record creation date)
      if (inv.year === year) {
        const month = inv.month;
        if (inv.type === 'sell') {
          monthlyData[month].sells += inv.amount;
        } else {
          monthlyData[month].buys += inv.amount;
        }
      }
    });
    return monthlyData;
  };

  // ============= GOALS FUNCTIONS =============
  const addGoal = () => {
    if (!newGoalName.trim() || !newGoalAmount || !newGoalEndDate) return;
    if (goals.length >= 5) {
      alert('Maximum 5 goals allowed. Please remove a goal first.');
      return;
    }
    
    const newGoal = {
      id: Date.now(),
      name: newGoalName.trim(),
      targetAmount: parseFloat(newGoalAmount),
      startDate: newGoalStartDate,
      endDate: newGoalEndDate,
      type: newGoalType, // 'auto' or 'manual'
      category: newGoalType === 'auto' ? newGoalCategory : null,
      manualAmount: newGoalType === 'manual' ? parseFloat(newGoalCurrentAmount) || 0 : 0,
      createdAt: new Date().toISOString()
    };
    
    setGoals([...goals, newGoal]);
    setNewGoalName('');
    setNewGoalAmount('');
    setNewGoalEndDate('');
    setNewGoalType('auto');
    setNewGoalCategory('savings');
    setNewGoalCurrentAmount('');
    setShowAddGoalModal(false);
    triggerSuccess('add-goal');
  };

  const removeGoal = (id) => {
    setGoals(goals.filter(g => g.id !== id));
  };

  const archiveGoal = (id) => {
    const goal = goals.find(g => g.id === id);
    if (!goal) return;
    const { currentAmount, progress } = calculateGoalProgress(goal);
    const archivedGoal = {
      ...goal,
      archivedOn: new Date().toISOString(),
      finalProgress: progress,
      finalAmount: currentAmount
    };
    setArchivedGoals([...archivedGoals, archivedGoal]);
    setGoals(goals.filter(g => g.id !== id));
  };

  const archiveAllCompletedGoals = () => {
    const completed = goals.filter(g => {
      const { progress } = calculateGoalProgress(g);
      return progress >= 100;
    });
    if (completed.length === 0) return;
    const archivedWithProgress = completed.map(goal => {
      const { currentAmount, progress } = calculateGoalProgress(goal);
      return {
        ...goal,
        archivedOn: new Date().toISOString(),
        finalProgress: progress,
        finalAmount: currentAmount
      };
    });
    setArchivedGoals([...archivedGoals, ...archivedWithProgress]);
    setGoals(goals.filter(g => {
      const { progress } = calculateGoalProgress(g);
      return progress < 100;
    }));
  };

  const restoreGoal = (id) => {
    const goal = archivedGoals.find(g => g.id === id);
    if (!goal) return;
    const { archivedOn, finalProgress, finalAmount, ...cleanGoal } = goal;
    setGoals([...goals, cleanGoal]);
    setArchivedGoals(archivedGoals.filter(g => g.id !== id));
  };

  const deleteArchivedGoal = (id) => {
    setArchivedGoals(archivedGoals.filter(g => g.id !== id));
  };

  const updateGoalManualAmount = (id, amount) => {
    setGoals(goals.map(g => 
      g.id === id ? { ...g, manualAmount: parseFloat(amount) || 0 } : g
    ));
  };

  const calculateGoalProgress = (goal) => {
    let currentAmount = 0;
    
    if (goal.type === 'manual') {
      currentAmount = goal.manualAmount || 0;
    } else {
      // Auto-linked categories
      const startDate = goal.startDate;
      const endDate = goal.endDate;
      
      switch (goal.category) {
        case 'savings':
          // Savings = Income - Expenses within date range
          const incomeInRange = oneTimeIncomes.filter(i => i.date >= startDate && i.date <= endDate)
            .reduce((sum, i) => sum + i.amount, 0);
          const expensesInRange = expenses.filter(e => e.date >= startDate && e.date <= endDate)
            .reduce((sum, e) => sum + e.amount, 0);
          currentAmount = Math.max(0, incomeInRange - expensesInRange);
          break;
        case 'income':
          currentAmount = oneTimeIncomes.filter(i => i.date >= startDate && i.date <= endDate)
            .reduce((sum, i) => sum + i.amount, 0);
          break;
        case 'investments':
          currentAmount = investments.filter(i => {
            const invDate = `${i.year}-${String(i.month + 1).padStart(2, '0')}-01`;
            return invDate >= startDate && invDate <= endDate && i.type !== 'sell';
          }).reduce((sum, i) => sum + i.amount, 0);
          break;
        default:
          // Check for debit card balance goal
          if (goal.category && goal.category.startsWith('debit-')) {
            const cardId = parseInt(goal.category.replace('debit-', ''));
            const card = debitCards.find(c => c.id === cardId);
            if (card) {
              currentAmount = card.balance || 0;
            }
          }
          // Check for credit card payoff goal (track how much paid off)
          else if (goal.category && goal.category.startsWith('credit-')) {
            const cardId = parseInt(goal.category.replace('credit-', ''));
            const card = creditCards.find(c => c.id === cardId);
            if (card) {
              // Calculate total payments made in date range (exclude spends which have type: 'spend')
              const payments = (card.payments || [])
                .filter(p => !p.type && p.date >= startDate && p.date <= endDate)
                .reduce((sum, p) => sum + p.amount, 0);
              currentAmount = payments;
            }
          }
          // Category-specific expense limit (spending goal)
          else if (EXPENSE_CATEGORIES.includes(goal.category)) {
            currentAmount = expenses.filter(e => e.date >= startDate && e.date <= endDate && e.category === goal.category)
              .reduce((sum, e) => sum + e.amount, 0);
          }
      }
    }
    
    const progress = Math.min((currentAmount / goal.targetAmount) * 100, 100);
    return { currentAmount, progress };
  };

  // ============= EXPENSE HEATMAP FUNCTIONS =============
  const getExpenseHeatmapData = () => {
    const year = heatmapYear;
    const month = heatmapMonth;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfWeek = new Date(year, month, 1).getDay();
    
    // Get all expenses for this month
    const monthExpenses = expenses.filter(e => {
      const parts = e.date.split('-');
      return parseInt(parts[0]) === year && parseInt(parts[1]) - 1 === month;
    });
    
    // Group by day
    const dailyTotals = {};
    let maxAmount = 0;
    monthExpenses.forEach(e => {
      const day = parseInt(e.date.split('-')[2]);
      dailyTotals[day] = (dailyTotals[day] || 0) + e.amount;
      if (dailyTotals[day] > maxAmount) maxAmount = dailyTotals[day];
    });
    
    // Build calendar grid
    const weeks = [];
    let currentWeek = new Array(firstDayOfWeek).fill(null); // Padding for first week
    
    for (let day = 1; day <= daysInMonth; day++) {
      const amount = dailyTotals[day] || 0;
      const intensity = maxAmount > 0 ? amount / maxAmount : 0;
      currentWeek.push({ day, amount, intensity });
      
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }
    
    // Pad last week if needed
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) currentWeek.push(null);
      weeks.push(currentWeek);
    }
    
    return { weeks, maxAmount };
  };

  // ============= EXPENSE FUNCTIONS =============
  const addExpense = () => {
    if (!expenseAmount) { triggerShake('expense-amount'); return; }
    const newId = Date.now();
    setExpenses([...expenses, {
      id: newId,
      amount: parseFloat(expenseAmount),
      category: expenseCategory,
      date: expenseDate,
      notes: expenseNotes.trim() || null
    }]);
    setExpenseAmount('');
    setExpenseNotes('');
    setNewItemId(newId);
    setTimeout(() => setNewItemId(null), 500);
    triggerPop('expense-total');
    triggerSuccess('add-expense');
    setTimeout(() => expenseAmountRef.current?.focus(), 100);
  };

  const removeExpense = (id) => {
    const item = expenses.find(e => e.id === id);
    if (!item) return;
    
    setDeletingItems(prev => new Set([...prev, id]));
    setTimeout(() => {
      setExpenses(prev => prev.filter(e => e.id !== id));
      setDeletingItems(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      
      scheduleDelete('expense', item, () => {
        setExpenses(prev => [item, ...prev]);
      });
    }, 400);
  };

  const getCategoryTotal = (category) => {
    return expenses.filter(exp => {
      if (exp.category !== category) return false;
      const parts = exp.date.split('-');
      return parseInt(parts[1]) - 1 === selectedBudgetMonth && parseInt(parts[0]) === selectedBudgetYear;
    }).reduce((sum, exp) => sum + exp.amount, 0);
  };

  const getTotalExpensesForMonth = () => {
    return expenses.filter(exp => {
      const parts = exp.date.split('-');
      return parseInt(parts[1]) - 1 === selectedBudgetMonth && parseInt(parts[0]) === selectedBudgetYear;
    }).reduce((sum, exp) => sum + exp.amount, 0);
  };

  const getPreviousMonthExpenses = () => {
    const prevMonth = selectedBudgetMonth === 0 ? 11 : selectedBudgetMonth - 1;
    const prevYear = selectedBudgetMonth === 0 ? selectedBudgetYear - 1 : selectedBudgetYear;
    return expenses.filter(exp => {
      const parts = exp.date.split('-');
      return parseInt(parts[1]) - 1 === prevMonth && parseInt(parts[0]) === prevYear;
    }).reduce((sum, exp) => sum + exp.amount, 0);
  };

  const getRecentExpenses = () => {
    return [...expenses].filter(exp => {
      const parts = exp.date.split('-');
      return parseInt(parts[1]) - 1 === selectedBudgetMonth && parseInt(parts[0]) === selectedBudgetYear;
    }).sort((a, b) => b.date.localeCompare(a.date));
  };

  const getBudgetPieData = () => {
    return EXPENSE_CATEGORIES.map(cat => ({
      name: cat,
      value: getCategoryTotal(cat)
    })).filter(item => item.value > 0);
  };

  // Recurring expenses
  const addRecurringExpense = () => {
    if (!newRecurringName.trim() || !newRecurringAmount) return;
    setRecurringExpenses([...recurringExpenses, {
      id: Date.now(),
      name: newRecurringName,
      amount: parseFloat(newRecurringAmount),
      category: newRecurringCategory,
      dayOfMonth: parseInt(newRecurringDay)
    }]);
    setNewRecurringName('');
    setNewRecurringAmount('');
    setShowRecurringModal(false);
  };

  const removeRecurringExpense = (id) => setRecurringExpenses(recurringExpenses.filter(r => r.id !== id));

  // Get upcoming bills (due within next 7 days or overdue)
  const getUpcomingBills = () => {
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    return recurringExpenses.map(recurring => {
      let dueDate = new Date(currentYear, currentMonth, recurring.dayOfMonth);
      
      // If due date has passed this month, show next month's
      if (recurring.dayOfMonth < currentDay) {
        dueDate = new Date(currentYear, currentMonth + 1, recurring.dayOfMonth);
      }
      
      const daysUntilDue = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
      const isOverdue = daysUntilDue < 0;
      const isDueSoon = daysUntilDue >= 0 && daysUntilDue <= 7;
      
      return {
        ...recurring,
        dueDate,
        daysUntilDue,
        isOverdue,
        isDueSoon
      };
    }).filter(bill => bill.isOverdue || bill.isDueSoon)
      .sort((a, b) => a.daysUntilDue - b.daysUntilDue);
  };

  const applyRecurringExpenses = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const newExpenses = recurringExpenses.map(recurring => ({
      id: Date.now() + Math.random(),
      amount: recurring.amount,
      category: recurring.category,
      date: `${year}-${month}-${String(recurring.dayOfMonth).padStart(2, '0')}`,
      recurringName: recurring.name
    }));
    setExpenses([...expenses, ...newExpenses]);
  };

  // ============= WORK LOG FUNCTIONS =============
  // Calculate hours from clock in/out times
  const calculateHoursFromTimes = (clockIn, clockOut) => {
    if (!clockIn || !clockOut) return 0;
    const [inH, inM] = clockIn.split(':').map(Number);
    const [outH, outM] = clockOut.split(':').map(Number);
    let inMinutes = inH * 60 + inM;
    let outMinutes = outH * 60 + outM;
    // Handle overnight shifts
    if (outMinutes < inMinutes) outMinutes += 24 * 60;
    return Math.round(((outMinutes - inMinutes) / 60) * 100) / 100;
  };

  // Get yesterday's most recent work log for "same as yesterday"
  const getYesterdayWorkLog = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = getLocalDateString(yesterday);
    return workLogs.find(log => log.date === yesterdayStr);
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
    
    if (workMode === 'clock') {
      if (!clockInTime) { triggerShake('clock-in'); return; }
      if (!clockOutTime) { triggerShake('clock-out'); return; }
      hours = calculateHoursFromTimes(clockInTime, clockOutTime);
      if (hours <= 0) { triggerShake('clock-out'); return; }
    } else {
      if (!workHours) { triggerShake('work-hours'); return; }
      hours = parseFloat(workHours);
    }
    
    if (!workJob) { triggerShake('work-job'); return; }
    if (!workDescription) { triggerShake('work-desc'); return; }
    
    const rate = workHourlyRate ? parseFloat(workHourlyRate) : (jobRates[workJob] || 0);
    setWorkLogs([...workLogs, {
      id: Date.now(),
      hours: hours,
      job: workJob,
      description: workDescription,
      date: workDate,
      hourlyRate: rate,
      clockIn: workMode === 'clock' ? clockInTime : null,
      clockOut: workMode === 'clock' ? clockOutTime : null
    }]);
    if (workHourlyRate && parseFloat(workHourlyRate) > 0) {
      setJobRates({ ...jobRates, [workJob]: parseFloat(workHourlyRate) });
    }
    setWorkHours('');
    setWorkJob('');
    setWorkDescription('');
    setWorkHourlyRate('');
    setClockInTime('');
    setClockOutTime('');
    triggerPop('work-total');
    triggerSuccess('add-work');
    setTimeout(() => workHoursRef.current?.focus(), 100);
  };

  const removeWorkLog = (id) => {
    const item = workLogs.find(l => l.id === id);
    if (!item) return;
    
    setDeletingItems(prev => new Set([...prev, id]));
    setTimeout(() => {
      setWorkLogs(prev => prev.filter(l => l.id !== id));
      setDeletingItems(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      
      scheduleDelete('worklog', item, () => {
        setWorkLogs(prev => [item, ...prev]);
      });
    }, 400);
  };

  const getUniqueJobs = () => [...new Set(workLogs.map(l => l.job))];

  const getJobHoursThisMonth = (job) => {
    return workLogs.filter(log => {
      const parts = log.date.split('-');
      return log.job === job && parseInt(parts[1]) - 1 === selectedWorkMonth && parseInt(parts[0]) === selectedWorkYear;
    }).reduce((sum, log) => sum + log.hours, 0);
  };

  const getTotalHoursThisMonth = () => {
    return workLogs.filter(log => {
      const parts = log.date.split('-');
      return parseInt(parts[1]) - 1 === selectedWorkMonth && parseInt(parts[0]) === selectedWorkYear;
    }).reduce((sum, log) => sum + log.hours, 0);
  };

  const getTotalEarningsThisMonth = () => {
    return workLogs.filter(log => {
      const parts = log.date.split('-');
      return parseInt(parts[1]) - 1 === selectedWorkMonth && parseInt(parts[0]) === selectedWorkYear;
    }).reduce((sum, log) => sum + (log.hours * (log.hourlyRate || 0)), 0);
  };

  const getJobLogs = (job) => {
    return workLogs.filter(log => {
      const parts = log.date.split('-');
      return log.job === job && parseInt(parts[1]) - 1 === selectedWorkMonth && parseInt(parts[0]) === selectedWorkYear;
    }).sort((a, b) => b.date.localeCompare(a.date));
  };

  // ============= TODO FUNCTIONS =============
  const addTodo = () => {
    if (!todoText.trim()) { triggerShake('todo-text'); return; }
    const newId = Date.now();
    setTodos([...todos, {
      id: newId,
      text: todoText,
      date: todoDate,
      time: todoTime,
      completed: false,
      priority: todoPriority,
      subtasks: []
    }]);
    setTodoText('');
    setTodoTime('');
    setTodoPriority('medium');
    setNewItemId(newId);
    setTimeout(() => setNewItemId(null), 500);
    triggerSuccess('add-todo');
    setTimeout(() => todoTextRef.current?.focus(), 100);
  };

  const toggleTodo = (todoId) => {
    setTodos(todos.map(t =>
      t.id === todoId ? { ...t, completed: !t.completed } : t
    ));
  };

  const removeTodo = (id) => {
    animatedDelete(id, () => setTodos(todos.filter(t => t.id !== id)));
  };

  const addSubtask = (todoId) => {
    if (!subtaskText.trim()) return;
    setTodos(todos.map(todo => {
      if (todo.id === todoId) {
        return { ...todo, subtasks: [...todo.subtasks, { id: Date.now(), text: subtaskText, completed: false }] };
      }
      return todo;
    }));
    setSubtaskText('');
    setAddingSubtaskFor(null);
  };

  const toggleSubtask = (todoId, subtaskId) => {
    setTodos(todos.map(todo => {
      if (todo.id === todoId) {
        return {
          ...todo,
          subtasks: todo.subtasks.map(sub =>
            sub.id === subtaskId ? { ...sub, completed: !sub.completed } : sub
          )
        };
      }
      return todo;
    }));
  };

  const removeSubtask = (todoId, subtaskId) => {
    setTodos(todos.map(todo => {
      if (todo.id === todoId) {
        return { ...todo, subtasks: todo.subtasks.filter(sub => sub.id !== subtaskId) };
      }
      return todo;
    }));
  };

  const archiveAllCompleted = () => {
    const completed = todos.filter(t => t.completed);
    if (completed.length === 0) return;
    
    // Add archivedOn timestamp to each task and prepend to archives (newest first)
    const tasksToArchive = completed.map(task => ({
      ...task,
      archivedOn: new Date().toISOString()
    }));
    
    setArchivedTodos([...tasksToArchive, ...archivedTodos]);
    setTodos(todos.filter(t => !t.completed));
  };

  const getTodosByDate = () => [...todos].sort((a, b) => a.date.localeCompare(b.date));

  const getTodoStats = () => {
    const todayStr = getLocalDateString();
    const completed = todos.filter(t => t.completed).length;
    const pending = todos.filter(t => !t.completed && t.date >= todayStr).length;
    const overdue = todos.filter(t => !t.completed && t.date < todayStr).length;
    return { completed, pending, overdue, total: todos.length };
  };

  // ============= TRENDS FUNCTIONS =============
  const getMonthsInRange = () => {
    const months = [];
    let current = { ...trendsStartMonth };
    const end = trendsEndMonth;
    while (current.year < end.year || (current.year === end.year && current.month <= end.month)) {
      months.push({ ...current, label: `${monthNames[current.month]} ${current.year}` });
      current.month++;
      if (current.month > 11) { current.month = 0; current.year++; }
    }
    return months;
  };

  const getMonthlyExpenseTotals = () => {
    return getMonthsInRange().map(m => {
      const total = expenses.filter(exp => {
        const parts = exp.date.split('-');
        return parseInt(parts[1]) - 1 === m.month && parseInt(parts[0]) === m.year;
      }).reduce((sum, exp) => sum + exp.amount, 0);
      return { ...m, total };
    });
  };

  const getMonthlyIncomeTotals = () => {
    return getMonthsInRange().map(m => {
      const total = oneTimeIncomes.filter(inc => {
        const parts = inc.date.split('-');
        return parseInt(parts[1]) - 1 === m.month && parseInt(parts[0]) === m.year;
      }).reduce((sum, inc) => sum + inc.amount, 0);
      return { ...m, total };
    });
  };

  const getMonthlyInvestmentTotals = () => {
    return getMonthsInRange().map(m => {
      const monthInvestments = investments.filter(inv => inv.month === m.month && inv.year === m.year);
      const buys = monthInvestments.filter(i => i.type !== 'sell').reduce((sum, i) => sum + i.amount, 0);
      const sells = monthInvestments.filter(i => i.type === 'sell').reduce((sum, i) => sum + i.amount, 0);
      const net = buys - sells;
      return { ...m, buys, sells, net };
    });
  };

  const getMonthlyHoursWorked = () => {
    return getMonthsInRange().map(m => {
      const hours = workLogs.filter(log => {
        const parts = log.date.split('-');
        return parseInt(parts[1]) - 1 === m.month && parseInt(parts[0]) === m.year;
      }).reduce((sum, log) => sum + log.hours, 0);
      const earnings = workLogs.filter(log => {
        const parts = log.date.split('-');
        return parseInt(parts[1]) - 1 === m.month && parseInt(parts[0]) === m.year;
      }).reduce((sum, log) => sum + (log.hours * (log.hourlyRate || 0)), 0);
      return { ...m, hours, earnings };
    });
  };

  const getTrendsData = () => {
    const months = getMonthsInRange();
    return months.map(m => {
      const income = oneTimeIncomes.filter(inc => {
        const parts = inc.date.split('-');
        return parseInt(parts[1]) - 1 === m.month && parseInt(parts[0]) === m.year;
      }).reduce((sum, inc) => sum + inc.amount, 0);
      
      const expenses_total = expenses.filter(exp => {
        const parts = exp.date.split('-');
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
    return getMonthsInRange().map(m => {
      const data = { ...m };
      EXPENSE_CATEGORIES.forEach(cat => {
        data[cat] = expenses.filter(exp => {
          const parts = exp.date.split('-');
          return exp.category === cat && parseInt(parts[1]) - 1 === m.month && parseInt(parts[0]) === m.year;
        }).reduce((sum, exp) => sum + exp.amount, 0);
      });
      return data;
    });
  };

  // All-time category totals for pie chart
  const getAllTimeCategoryPieData = () => {
    return EXPENSE_CATEGORIES.map(cat => ({
      name: cat,
      value: expenses.filter(e => e.category === cat).reduce((sum, e) => sum + e.amount, 0),
      color: CATEGORY_STYLES[cat]?.color || '#888'
    })).filter(item => item.value > 0);
  };

  // ============= NET WORTH FUNCTIONS =============
  const getCurrentNetWorth = () => {
    // Assets
    const checkingBalance = getTotalCheckingBalance();
    const investmentValue = uniqueAssets.reduce((sum, asset) => {
      const holdings = getAssetHoldings(asset);
      const currentPrice = currentValues[asset] || (holdings.totalQuantity > 0 ? holdings.totalCost / holdings.totalQuantity : 0);
      return sum + (holdings.totalQuantity * currentPrice);
    }, 0);
    
    // Liabilities
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
    return getMonthsInRange().map(m => {
      // Calculate assets at end of month
      // Investments bought up to and including this month
      const investmentsUpToMonth = investments.filter(inv => 
        inv.year < m.year || (inv.year === m.year && inv.month <= m.month)
      );
      
      const assetHoldings = {};
      investmentsUpToMonth.forEach(inv => {
        if (!assetHoldings[inv.asset]) {
          assetHoldings[inv.asset] = { quantity: 0, amount: 0 };
        }
        if (inv.type === 'sell') {
          assetHoldings[inv.asset].quantity -= inv.quantity || 0;
          assetHoldings[inv.asset].amount -= inv.amount;
        } else {
          assetHoldings[inv.asset].quantity += inv.quantity || 0;
          assetHoldings[inv.asset].amount += inv.amount;
        }
      });
      
      // Estimate investment value (using cost basis as proxy for historical value)
      const investmentValue = Object.values(assetHoldings).reduce((sum, h) => sum + Math.max(0, h.amount), 0);
      
      // For checking accounts, we'll use current balance as we don't track historical
      // This is a simplification - in a real app we'd track historical balances
      const checkingBalance = getTotalCheckingBalance();
      
      // For debt, use current debt (another simplification)
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

  // ============= SMART INSIGHTS =============
  const getSmartInsights = (setIndex = 0) => {
    const insights = [];
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const currentDay = now.getDate();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysElapsed = currentDay;
    const daysRemaining = daysInMonth - currentDay;
    
    // Get this month's data
    const thisMonthExpenses = expenses.filter(exp => {
      const parts = exp.date.split('-');
      return parseInt(parts[1]) - 1 === currentMonth && parseInt(parts[0]) === currentYear;
    });
    const thisMonthIncome = oneTimeIncomes.filter(inc => {
      const parts = inc.date.split('-');
      return parseInt(parts[1]) - 1 === currentMonth && parseInt(parts[0]) === currentYear;
    });
    
    const totalExpensesThisMonth = thisMonthExpenses.reduce((sum, e) => sum + e.amount, 0);
    const totalIncomeThisMonth = thisMonthIncome.reduce((sum, i) => sum + i.amount, 0);
    
    // Get last month's data
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    
    const lastMonthExpenses = expenses.filter(exp => {
      const parts = exp.date.split('-');
      return parseInt(parts[1]) - 1 === lastMonth && parseInt(parts[0]) === lastMonthYear;
    });
    const lastMonthIncome = oneTimeIncomes.filter(inc => {
      const parts = inc.date.split('-');
      return parseInt(parts[1]) - 1 === lastMonth && parseInt(parts[0]) === lastMonthYear;
    });
    
    const totalExpensesLastMonth = lastMonthExpenses.reduce((sum, e) => sum + e.amount, 0);
    const totalIncomeLastMonth = lastMonthIncome.reduce((sum, i) => sum + i.amount, 0);
    
    // All-time data
    const totalAllTimeExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
    const totalAllTimeIncome = oneTimeIncomes.reduce((sum, i) => sum + i.amount, 0);
    const allTimeTransactions = expenses.length + oneTimeIncomes.length;
    
    // === SET 1 INSIGHTS (indexes 0-5) ===
    
    // === INSIGHT 1: Income vs Expense (Net Income / Savings Rate) ===
    const netIncome = totalIncomeThisMonth - totalExpensesThisMonth;
    const savingsRate = totalIncomeThisMonth > 0 ? (netIncome / totalIncomeThisMonth) * 100 : 0;
    
    if (totalIncomeThisMonth > 0 || totalExpensesThisMonth > 0) {
      if (netIncome >= 0) {
        insights.push({
          type: 'positive',
          icon: '💰',
          title: 'Net Income',
          message: `You're ${savingsRate >= 20 ? 'saving strong' : 'in the green'} this month!`,
          detail: `+${formatMoney(netIncome)} net (${savingsRate.toFixed(0)}% savings rate)`,
          priority: 1,
          set: 0
        });
      } else {
        insights.push({
          type: 'warning',
          icon: '⚠️',
          title: 'Overspending',
          message: `You're spending more than you're earning this month.`,
          detail: `${formatMoney(netIncome)} net - consider reducing expenses`,
          priority: 1,
          set: 0
        });
      }
    }
    
    // === INSIGHT 2: Projected Month-End ===
    if (daysElapsed >= 5 && totalExpensesThisMonth > 0) {
      const dailyAvgExpense = totalExpensesThisMonth / daysElapsed;
      const projectedExpenses = dailyAvgExpense * daysInMonth;
      const projectedRemaining = dailyAvgExpense * daysRemaining;
      
      const projectedIncome = totalIncomeThisMonth;
      const projectedNet = projectedIncome - projectedExpenses;
      
      insights.push({
        type: projectedNet >= 0 ? 'info' : 'warning',
        icon: '📅',
        title: 'Month-End Projection',
        message: `At current pace, you'll spend ~${formatMoney(projectedExpenses)} this month.`,
        detail: `~${formatMoney(projectedRemaining)} more in remaining ${daysRemaining} days`,
        priority: 2,
        set: 0
      });
    }
    
    // === INSIGHT 3: Category Comparisons (vs Last Month) ===
    EXPENSE_CATEGORIES.forEach(category => {
      const thisMonthCat = thisMonthExpenses.filter(e => e.category === category).reduce((sum, e) => sum + e.amount, 0);
      const lastMonthCat = lastMonthExpenses.filter(e => e.category === category).reduce((sum, e) => sum + e.amount, 0);
      
      if (lastMonthCat > 0 && thisMonthCat > 0) {
        const percentChange = ((thisMonthCat - lastMonthCat) / lastMonthCat) * 100;
        
        if (percentChange >= 30) {
          insights.push({
            type: 'warning',
            icon: CATEGORY_STYLES[category]?.icon || '📦',
            title: `${category} Up`,
            message: `${category} spending is up ${percentChange.toFixed(0)}% from last month.`,
            detail: `${formatMoney(lastMonthCat)} → ${formatMoney(thisMonthCat)}`,
            priority: 3,
            set: 0
          });
        } else if (percentChange <= -30) {
          insights.push({
            type: 'positive',
            icon: CATEGORY_STYLES[category]?.icon || '📦',
            title: `${category} Down`,
            message: `Great job! ${category} spending is down ${Math.abs(percentChange).toFixed(0)}%.`,
            detail: `${formatMoney(lastMonthCat)} → ${formatMoney(thisMonthCat)}`,
            priority: 3,
            set: 0
          });
        }
      }
    });
    
    // === INSIGHT 4: Spending Velocity ===
    if (daysElapsed >= 3 && totalExpensesThisMonth > 0) {
      const dailyAvg = totalExpensesThisMonth / daysElapsed;
      const lastMonthDailyAvg = totalExpensesLastMonth / daysInMonth;
      
      if (lastMonthDailyAvg > 0) {
        const velocityChange = ((dailyAvg - lastMonthDailyAvg) / lastMonthDailyAvg) * 100;
        
        if (velocityChange >= 20) {
          insights.push({
            type: 'warning',
            icon: '🔥',
            title: 'Spending Faster',
            message: `Daily spending is ${velocityChange.toFixed(0)}% higher than last month's average.`,
            detail: `${formatMoney(lastMonthDailyAvg)}/day → ${formatMoney(dailyAvg)}/day`,
            priority: 2,
            set: 0
          });
        } else if (velocityChange <= -20) {
          insights.push({
            type: 'positive',
            icon: '🎯',
            title: 'Spending Slower',
            message: `Daily spending is ${Math.abs(velocityChange).toFixed(0)}% lower than last month.`,
            detail: `${formatMoney(lastMonthDailyAvg)}/day → ${formatMoney(dailyAvg)}/day`,
            priority: 2,
            set: 0
          });
        }
      }
    }
    
    // === INSIGHT 5: Unusual Single Expense ===
    const avgExpense = totalExpensesThisMonth / Math.max(thisMonthExpenses.length, 1);
    const largeExpenses = thisMonthExpenses.filter(e => e.amount > avgExpense * 3 && e.amount > 50);
    
    if (largeExpenses.length > 0) {
      const largest = largeExpenses.sort((a, b) => b.amount - a.amount)[0];
      insights.push({
        type: 'info',
        icon: '👀',
        title: 'Large Expense',
        message: `Notable expense: ${formatMoney(largest.amount)} on ${largest.category}.`,
        detail: largest.notes || `This is ${(largest.amount / avgExpense).toFixed(1)}x your average expense`,
        priority: 4,
        set: 0
      });
    }
    
    // === INSIGHT 6: Income Trend ===
    if (totalIncomeLastMonth > 0 && totalIncomeThisMonth > 0) {
      const incomeChange = ((totalIncomeThisMonth - totalIncomeLastMonth) / totalIncomeLastMonth) * 100;
      
      if (Math.abs(incomeChange) >= 15) {
        insights.push({
          type: incomeChange > 0 ? 'positive' : 'info',
          icon: incomeChange > 0 ? '📈' : '📉',
          title: incomeChange > 0 ? 'Income Up' : 'Income Down',
          message: `Income is ${incomeChange > 0 ? 'up' : 'down'} ${Math.abs(incomeChange).toFixed(0)}% from last month.`,
          detail: `${formatMoney(totalIncomeLastMonth)} → ${formatMoney(totalIncomeThisMonth)}`,
          priority: 2,
          set: 0
        });
      }
    }
    
    // === SET 2 INSIGHTS (indexes 6-11) ===
    
    // === INSIGHT 7: Work Hours Insight ===
    const thisMonthWork = workLogs.filter(log => {
      const parts = log.date.split('-');
      return parseInt(parts[1]) - 1 === currentMonth && parseInt(parts[0]) === currentYear;
    });
    const thisMonthHours = thisMonthWork.reduce((sum, l) => sum + l.hours, 0);
    const thisMonthEarnings = thisMonthWork.reduce((sum, l) => sum + (l.hours * (l.hourlyRate || 0)), 0);
    
    if (thisMonthHours > 0 && thisMonthEarnings > 0) {
      const effectiveRate = thisMonthEarnings / thisMonthHours;
      insights.push({
        type: 'info',
        icon: '⏰',
        title: 'Work Summary',
        message: `You've logged ${thisMonthHours.toFixed(1)} hours this month.`,
        detail: `Earning ${formatMoney(effectiveRate)}/hr avg → ${formatMoney(thisMonthEarnings)} total`,
        priority: 4,
        set: 1
      });
    }
    
    // === INSIGHT 8: All-Time Overview ===
    if (allTimeTransactions >= 10) {
      const allTimeNet = totalAllTimeIncome - totalAllTimeExpenses;
      insights.push({
        type: allTimeNet >= 0 ? 'positive' : 'info',
        icon: '🏆',
        title: 'All-Time Summary',
        message: `Tracked ${allTimeTransactions} transactions since you started.`,
        detail: `Net lifetime: ${allTimeNet >= 0 ? '+' : ''}${formatMoney(allTimeNet)}`,
        priority: 5,
        set: 1
      });
    }
    
    // === INSIGHT 9: Top Spending Category (All Time) ===
    const categoryTotals = {};
    expenses.forEach(e => {
      categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount;
    });
    const sortedCategories = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);
    
    if (sortedCategories.length > 0) {
      const [topCat, topAmount] = sortedCategories[0];
      const percentage = totalAllTimeExpenses > 0 ? (topAmount / totalAllTimeExpenses * 100).toFixed(0) : 0;
      insights.push({
        type: 'info',
        icon: CATEGORY_STYLES[topCat]?.icon || '📊',
        title: 'Biggest Category',
        message: `${topCat} is your #1 expense category all-time.`,
        detail: `${formatMoney(topAmount)} total (${percentage}% of all expenses)`,
        priority: 5,
        set: 1
      });
    }
    
    // === INSIGHT 10: Average Transaction Size ===
    if (thisMonthExpenses.length >= 5) {
      const avgThisMonth = totalExpensesThisMonth / thisMonthExpenses.length;
      const avgLastMonth = lastMonthExpenses.length > 0 ? totalExpensesLastMonth / lastMonthExpenses.length : 0;
      
      insights.push({
        type: avgLastMonth > 0 && avgThisMonth > avgLastMonth * 1.2 ? 'warning' : 'info',
        icon: '🧮',
        title: 'Avg Transaction',
        message: `Your average expense this month is ${formatMoney(avgThisMonth)}.`,
        detail: avgLastMonth > 0 ? `Last month avg: ${formatMoney(avgLastMonth)}` : `${thisMonthExpenses.length} transactions total`,
        priority: 5,
        set: 1
      });
    }
    
    // === INSIGHT 11: Weekend vs Weekday Spending ===
    const weekendExpenses = thisMonthExpenses.filter(e => {
      const day = new Date(e.date).getDay();
      return day === 0 || day === 6;
    }).reduce((sum, e) => sum + e.amount, 0);
    const weekdayExpenses = totalExpensesThisMonth - weekendExpenses;
    
    if (thisMonthExpenses.length >= 5) {
      const weekendPct = totalExpensesThisMonth > 0 ? (weekendExpenses / totalExpensesThisMonth * 100).toFixed(0) : 0;
      insights.push({
        type: weekendExpenses > weekdayExpenses ? 'warning' : 'info',
        icon: '📆',
        title: 'Weekend Spending',
        message: weekendExpenses > weekdayExpenses ? 'You spend more on weekends!' : 'Weekday spending is higher.',
        detail: `Weekend: ${formatMoney(weekendExpenses)} (${weekendPct}%) | Weekday: ${formatMoney(weekdayExpenses)}`,
        priority: 6,
        set: 1
      });
    }
    
    // === INSIGHT 12: Expense Frequency ===
    if (daysElapsed >= 7 && thisMonthExpenses.length >= 3) {
      const txPerDay = thisMonthExpenses.length / daysElapsed;
      insights.push({
        type: 'info',
        icon: '🔄',
        title: 'Expense Frequency',
        message: `You average ${txPerDay.toFixed(1)} transactions per day.`,
        detail: `${thisMonthExpenses.length} expenses in ${daysElapsed} days`,
        priority: 6,
        set: 1
      });
    }
    
    // === INSIGHT 13 (Fallback for Set 1): Monthly Budget Progress ===
    if (daysElapsed > 0 && totalExpensesThisMonth > 0) {
      const progressPercent = (daysElapsed / daysInMonth * 100).toFixed(0);
      const spendingPercent = totalIncomeThisMonth > 0 ? (totalExpensesThisMonth / totalIncomeThisMonth * 100).toFixed(0) : 0;
      insights.push({
        type: parseInt(spendingPercent) > parseInt(progressPercent) ? 'warning' : 'positive',
        icon: '📊',
        title: 'Budget Progress',
        message: `${progressPercent}% through the month, ${spendingPercent}% of income spent.`,
        detail: parseInt(spendingPercent) <= parseInt(progressPercent) ? 'On track!' : 'Spending ahead of schedule',
        priority: 7,
        set: 0
      });
    }
    
    // === INSIGHT 14 (Fallback for Set 2): Investment Tracking ===
    if (investments.length > 0) {
      const totalInvested = investments.filter(i => i.type === 'buy').reduce((sum, i) => sum + i.amount, 0);
      const totalSold = investments.filter(i => i.type === 'sell').reduce((sum, i) => sum + i.amount, 0);
      insights.push({
        type: 'info',
        icon: '📈',
        title: 'Investment Activity',
        message: `You've made ${investments.length} investment transactions.`,
        detail: `Bought: ${formatMoney(totalInvested)} | Sold: ${formatMoney(totalSold)}`,
        priority: 7,
        set: 1
      });
    }
    
    // Filter by set and return top 6
    const setInsights = insights.filter(i => i.set === setIndex);
    const otherSetInsights = insights.filter(i => i.set !== setIndex);
    
    // If not enough in the requested set, fill from other set
    let result = setInsights.sort((a, b) => a.priority - b.priority).slice(0, 5);
    if (result.length < 5) {
      const filler = otherSetInsights.sort((a, b) => a.priority - b.priority).slice(0, 5 - result.length);
      result = [...result, ...filler];
    }
    
    return result;
  };

  // Memoized Smart Insights - only recalculates when data changes
  const memoizedInsights = useMemo(() => {
    return {
      set0: getSmartInsights(0),
      set1: getSmartInsights(1)
    };
  }, [expenses, oneTimeIncomes, workLogs, investments]);
  
  // Use memoized insights based on current set
  const currentInsights = insightSet === 0 ? memoizedInsights.set0 : memoizedInsights.set1;

  // ============= SEARCH =============
  const getSearchResults = () => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    const results = [];
    
    expenses.forEach(exp => {
      const notesMatch = exp.notes && exp.notes.toLowerCase().includes(query);
      if (exp.category.toLowerCase().includes(query) || String(exp.amount).includes(query) || notesMatch) {
        results.push({ 
          type: 'expense', 
          display: `${CATEGORY_STYLES[exp.category]?.icon || '📦'} ${formatMoney(exp.amount)} - ${exp.category}${exp.notes ? ` (${exp.notes})` : ''}`, 
          date: exp.date 
        });
      }
    });
    
    oneTimeIncomes.forEach(inc => {
      const notesMatch = inc.notes && inc.notes.toLowerCase().includes(query);
      if (inc.name.toLowerCase().includes(query) || String(inc.amount).includes(query) || notesMatch) {
        results.push({ type: 'income', display: `💰 ${formatMoney(inc.amount)} - ${inc.name}${inc.notes ? ` (${inc.notes})` : ''}`, date: inc.date });
      }
    });
    
    workLogs.forEach(log => {
      if (log.job.toLowerCase().includes(query) || log.description.toLowerCase().includes(query)) {
        results.push({ type: 'work', display: `⏰ ${log.hours}h - ${log.job}`, date: log.date });
      }
    });
    
    todos.forEach(todo => {
      if (todo.text.toLowerCase().includes(query)) {
        results.push({ type: 'todo', display: `${todo.completed ? '✅' : '⬜'} ${todo.text}`, date: todo.date });
      }
    });
    
    return results.slice(0, 10);
  };

  const AchievementPopup = ({ achievement }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="achievement-unlock bg-white rounded-3xl p-8 shadow-2xl border-4 border-yellow-400 text-center">
        <div className="text-6xl mb-4">{achievement.icon}</div>
        <p className="text-sm font-bold text-yellow-600 mb-1">🎉 Achievement Unlocked!</p>
        <h3 className="text-2xl font-black text-gray-800">{achievement.name}</h3>
        <p className="text-gray-500 mt-2">{achievement.description}</p>
      </div>
    </div>
  );

  const CharacterPopup = () => (
    <div 
      className="fixed bottom-4 left-4 z-40 cursor-pointer"
      onClick={() => setShowCharacter(false)}
    >
      <div className="fade-in-up flex items-end gap-3">
        <div className="character-bounce">
          <svg width="80" height="100" viewBox="0 0 80 100">
            <ellipse cx="40" cy="70" rx="25" ry="20" fill="#FF6B9D" />
            <circle cx="40" cy="35" r="25" fill="#FFD93D" />
            <ellipse cx="32" cy="32" rx="5" ry="6" fill="white" />
            <ellipse cx="48" cy="32" rx="5" ry="6" fill="white" />
            <circle cx="34" cy="33" r="2.5" fill="#2D2A3E" />
            <circle cx="50" cy="33" r="2.5" fill="#2D2A3E" />
            <path d="M32 45 Q40 55 48 45" stroke="#2D2A3E" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <circle cx="22" cy="40" r="4" fill="#FFB6C1" opacity="0.6" />
            <circle cx="58" cy="40" r="4" fill="#FFB6C1" opacity="0.6" />
            <ellipse cx="28" cy="88" rx="10" ry="7" fill="#E5598A" />
            <ellipse cx="52" cy="88" rx="10" ry="7" fill="#E5598A" />
          </svg>
        </div>
        <div className={`rounded-2xl p-4 shadow-xl border-2 max-w-xs slide-in-right ${
          darkMode ? 'bg-[#252233] border-pink-400/30' : 'bg-white border-pink-200'
        }`}>
          <p className={`font-bold ${darkMode ? 'text-gray-100' : 'text-gray-700'}`}>{characterQuote}</p>
          <p className={`text-xs mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Tap to dismiss</p>
        </div>
      </div>
    </div>
  );

  // ============= RENDER =============
  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        darkMode 
          ? 'bg-gradient-to-br from-[#1A1625] via-[#1E1B2E] to-[#1A2025]' 
          : 'bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100'
      }`}>
        <div className="text-center">
          <div className="text-6xl character-bounce mb-4">💰</div>
          <p className={`text-xl font-bold ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Loading your finances...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className={`${darkMode ? 'dark-mode' : ''}`}>
        <div className="app-container min-h-screen p-4 sm:p-6 relative pb-24">
        
        {/* Header */}
        <header className="max-w-6xl mx-auto mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center shadow-lg shadow-pink-300/50">
                <Wallet className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
                  Money Buddy
                </h1>
                <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-400'}`}>Your cheerful finance tracker</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`dark-mode-toggle w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  darkMode 
                    ? 'bg-yellow-400/20 text-yellow-400 hover:bg-yellow-400/30' 
                    : 'bg-indigo-100 text-indigo-500 hover:bg-indigo-200'
                }`}
                title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <CandyButton variant="ghost" size="sm" onClick={() => setShowAchievements(true)}>
                <Trophy className="w-4 h-4" />
                <span className="hidden sm:inline">{unlockedAchievements.length}/{achievements.length}</span>
              </CandyButton>
              <CandyButton variant="ghost" size="sm" onClick={exportData} className={showSaveIndicator ? 'save-pulse' : ''}>
                <Download className="w-4 h-4" />
              </CandyButton>
              <CandyButton variant="ghost" size="sm" onClick={() => setShowRestoreModal(true)}>
                <Upload className="w-4 h-4" />
              </CandyButton>
            </div>
          </div>

          {/* Search */}
          <div className="mt-4 max-w-md relative">
            <div className={`flex items-center rounded-2xl shadow-lg border-2 overflow-hidden transition-colors duration-300 ${
              darkMode 
                ? 'bg-[#1E1B2E] border-[#3D3A4E]' 
                : 'bg-white/80 border-white/50'
            }`}>
              <Search className={`w-5 h-5 ml-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
              <input
                type="text"
                placeholder="Search your finances..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setShowSearchResults(e.target.value.length > 0); }}
                onFocus={() => searchQuery && setShowSearchResults(true)}
                onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
                className={`flex-1 px-3 py-3 bg-transparent outline-none ${
                  darkMode ? 'text-gray-100 placeholder-gray-500' : 'text-gray-700 placeholder-gray-400'
                }`}
              />
              {searchQuery && (
                <button onClick={() => { setSearchQuery(''); setShowSearchResults(false); }} className={`pr-4 ${darkMode ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}>
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            {showSearchResults && searchQuery && (
              <div className={`absolute top-full left-0 right-0 mt-2 rounded-2xl shadow-2xl border-2 overflow-hidden z-30 fade-in-up ${
                darkMode ? 'bg-[#252233] border-[#3D3A4E]' : 'bg-white border-gray-100'
              }`}>
                {getSearchResults().length > 0 ? (
                  <div className="max-h-80 overflow-y-auto">
                    <div className={`px-4 py-2 text-xs font-bold uppercase tracking-wide ${
                      darkMode ? 'bg-[#1E1B2E] text-gray-400' : 'bg-gray-50 text-gray-500'
                    }`}>
                      {getSearchResults().length} results
                    </div>
                    {getSearchResults().map((result, idx) => (
                      <div
                        key={idx}
                        className={`px-4 py-3 cursor-pointer border-b last:border-0 transition-colors ${
                          darkMode 
                            ? 'hover:bg-pink-900/30 border-[#3D3A4E]' 
                            : 'hover:bg-pink-50 border-gray-50'
                        }`}
                        style={{
                          backgroundColor: darkMode ? '#252233' : '#ffffff'
                        }}
                        onMouseDown={() => {
                          if (result.type === 'expense') setViewMode('budget');
                          else if (result.type === 'income') setViewMode('income');
                          else if (result.type === 'work') setViewMode('clockin');
                          else if (result.type === 'todo') setViewMode('todos');
                          setShowSearchResults(false);
                          setSearchQuery('');
                        }}
                      >
                        <p className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{result.display}</p>
                        <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{formatDateDisplay(result.date)}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="px-4 py-8 text-center">
                    <p className={darkMode ? 'text-gray-500' : 'text-gray-400'}>No results found</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </header>

        {/* Tab Navigation */}
        <nav className="max-w-6xl mx-auto mb-8">
          <div className={`flex gap-1 sm:gap-2 p-2 rounded-3xl overflow-x-auto shadow-lg border-2 transition-colors duration-300 ${
            darkMode ? 'bg-[#1E1B2E] border-[#3D3A4E]' : 'bg-gray-100 border-gray-200'
          }`}>
            <TabButton darkMode={darkMode} active={viewMode === 'income'} onClick={() => { setViewMode('income'); setGoalSliderPosition(0); setGoalsUnlocked(false); }} icon={<DollarSign className="w-5 h-5" />} label="Income" />
            <TabButton darkMode={darkMode} active={viewMode === 'investments'} onClick={() => { setViewMode('investments'); setGoalSliderPosition(0); setGoalsUnlocked(false); }} icon={<PieChart className="w-5 h-5" />} label="Invest" />
            <TabButton darkMode={darkMode} active={viewMode === 'budget'} onClick={() => { setViewMode('budget'); setGoalSliderPosition(0); setGoalsUnlocked(false); }} icon={<Receipt className="w-5 h-5" />} label="Budget" />
            <TabButton darkMode={darkMode} active={viewMode === 'clockin'} onClick={() => { setViewMode('clockin'); setGoalSliderPosition(0); setGoalsUnlocked(false); }} icon={<Briefcase className="w-5 h-5" />} label="Work" />
            <TabButton darkMode={darkMode} active={viewMode === 'todos'} onClick={() => { setViewMode('todos'); setGoalSliderPosition(0); setGoalsUnlocked(false); }} icon={<ListTodo className="w-5 h-5" />} label="Tasks" />
            <TabButton darkMode={darkMode} active={viewMode === 'trends'} onClick={() => { setViewMode('trends'); setGoalSliderPosition(0); setGoalsUnlocked(false); }} icon={<BarChart3 className="w-5 h-5" />} label="Trends" />
            
            {/* Spacer */}
            <div className="flex-grow min-w-4" />
            
            {/* Goals Slider Button */}
            <div 
              className={`relative flex items-center rounded-2xl overflow-hidden goal-slider-track flex-shrink-0 ${
                goalsUnlocked ? 'ring-2 ring-purple-400' : ''
              }`}
              style={{ width: '180px', height: '44px' }}
            >
              <div 
                className="absolute inset-y-1 left-12 right-12 rounded-xl flex items-center justify-center text-xs font-bold pointer-events-none"
                style={{ color: darkMode ? '#9CA3AF' : '#6B7280' }}
              >
                {goalsUnlocked ? '← Slide' : 'Goals →'}
              </div>
              <div
                className="goal-slider-thumb absolute w-10 h-10 rounded-xl flex items-center justify-center cursor-grab active:cursor-grabbing z-10"
                style={{ 
                  left: `${2 + (goalSliderPosition / 100) * 126}px`,
                  touchAction: 'none'
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  const startX = e.clientX;
                  const startPos = goalSliderPosition;
                  let lastPos = startPos;
                  
                  const onMove = (moveE) => {
                    const deltaX = moveE.clientX - startX;
                    lastPos = Math.max(0, Math.min(100, startPos + (deltaX / 126) * 100));
                    setGoalSliderPosition(lastPos);
                  };
                  
                  const onUp = () => {
                    window.removeEventListener('mousemove', onMove);
                    window.removeEventListener('mouseup', onUp);
                    
                    if (lastPos > 70) {
                      setGoalSliderPosition(100);
                      setGoalsUnlocked(true);
                      setViewMode('goals');
                      if (navigator.vibrate) navigator.vibrate([10, 30, 10]);
                    } else if (lastPos < 30) {
                      setGoalSliderPosition(0);
                      setGoalsUnlocked(false);
                      setViewMode('trends');
                      if (navigator.vibrate) navigator.vibrate(10);
                    } else {
                      if (lastPos > 50) {
                        setGoalSliderPosition(100);
                        setGoalsUnlocked(true);
                        setViewMode('goals');
                      } else {
                        setGoalSliderPosition(0);
                        setGoalsUnlocked(false);
                        setViewMode('trends');
                      }
                    }
                  };
                  
                  window.addEventListener('mousemove', onMove);
                  window.addEventListener('mouseup', onUp);
                }}
                onTouchStart={(e) => {
                  const touch = e.touches[0];
                  const startX = touch.clientX;
                  const startPos = goalSliderPosition;
                  let lastPos = startPos;
                  
                  const onMove = (moveE) => {
                    const touch = moveE.touches[0];
                    const deltaX = touch.clientX - startX;
                    lastPos = Math.max(0, Math.min(100, startPos + (deltaX / 126) * 100));
                    setGoalSliderPosition(lastPos);
                  };
                  
                  const onEnd = () => {
                    window.removeEventListener('touchmove', onMove);
                    window.removeEventListener('touchend', onEnd);
                    window.removeEventListener('touchcancel', onEnd);
                    
                    if (lastPos > 70) {
                      setGoalSliderPosition(100);
                      setGoalsUnlocked(true);
                      setViewMode('goals');
                      if (navigator.vibrate) navigator.vibrate([10, 30, 10]);
                    } else if (lastPos < 30) {
                      setGoalSliderPosition(0);
                      setGoalsUnlocked(false);
                      setViewMode('trends');
                      if (navigator.vibrate) navigator.vibrate(10);
                    } else {
                      if (lastPos > 50) {
                        setGoalSliderPosition(100);
                        setGoalsUnlocked(true);
                        setViewMode('goals');
                      } else {
                        setGoalSliderPosition(0);
                        setGoalsUnlocked(false);
                        setViewMode('trends');
                      }
                    }
                  };
                  
                  window.addEventListener('touchmove', onMove, { passive: true });
                  window.addEventListener('touchend', onEnd);
                  window.addEventListener('touchcancel', onEnd);
                }}
              >
                <Target className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main 
          className="max-w-6xl mx-auto"
          ref={mainContentRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* INCOME TAB */}
          {viewMode === 'income' && (
            <div className={`space-y-6 tab-content ${swipeDirection === 'left' ? 'slide-left-exit' : swipeDirection === 'right' ? 'slide-right-exit' : 'active'}`}>
              <CandyCard darkMode={darkMode}>
                <h2 className={`text-xl font-black mb-4 flex items-center gap-2 ${darkMode ? 'text-gray-100' : 'text-gray-700'}`}>
                  <span className="text-2xl">💸</span> Add Income
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    {/* Source Input Mode Toggle */}
                    <div className="flex items-center justify-between mb-2">
                      <div className={`flex rounded-xl overflow-hidden border-2 ${darkMode ? 'border-[#3D3A4E]' : 'border-gray-200'}`}>
                        <button
                          onClick={() => setIncomeInputMode('manual')}
                          className={`px-3 py-1 text-xs font-bold transition-all ${
                            incomeInputMode === 'manual'
                              ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white'
                              : darkMode ? 'text-gray-400 hover:bg-white/5' : 'text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          Source Name
                        </button>
                        <button
                          onClick={() => setIncomeInputMode('quick')}
                          className={`px-3 py-1 text-xs font-bold transition-all ${
                            incomeInputMode === 'quick'
                              ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white'
                              : darkMode ? 'text-gray-400 hover:bg-white/5' : 'text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          Quick Sources
                        </button>
                      </div>
                    </div>
                    
                    {/* Manual Input Mode */}
                    {incomeInputMode === 'manual' && (
                      <>
                        <input
                          ref={incomeNameRef}
                          id="income-name"
                          placeholder="e.g., Freelance gig"
                          value={oneTimeName}
                          onChange={(e) => setOneTimeName(e.target.value)}
                          onKeyDown={(e) => (e.key === 'Enter' || e.keyCode === 13) && addOneTimeIncome()}
                          list="income-names"
                          className={`candy-input ${darkMode ? 'candy-input-dark' : 'candy-input-light'} ${shakeField === 'income-name' ? 'shake border-red-400' : ''}`}
                        />
                        <datalist id="income-names">
                          {getUniqueOneTimeNames().map(name => <option key={name} value={name} />)}
                        </datalist>
                      </>
                    )}
                    
                    {/* Quick Sources Mode */}
                    {incomeInputMode === 'quick' && (
                      <div className="flex gap-2">
                        {quickSources.map((source, idx) => (
                          <div key={idx} className="flex-1 relative group">
                            {editingQuickSource === idx ? (
                              <input
                                autoFocus
                                type="text"
                                value={source}
                                onChange={(e) => {
                                  const newSources = [...quickSources];
                                  newSources[idx] = e.target.value;
                                  setQuickSources(newSources);
                                }}
                                onBlur={() => setEditingQuickSource(null)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') setEditingQuickSource(null);
                                }}
                                className={`w-full px-2 py-2.5 text-xs font-bold rounded-xl outline-none text-center ${
                                  darkMode 
                                    ? 'bg-[#252233] text-gray-100 border-2 border-purple-500' 
                                    : 'bg-white text-gray-700 border-2 border-purple-400'
                                }`}
                              />
                            ) : (
                              <button
                                onClick={() => setOneTimeName(source)}
                                onTouchEnd={(e) => {
                                  e.preventDefault();
                                  setOneTimeName(source);
                                }}
                                onDoubleClick={() => setEditingQuickSource(idx)}
                                className={`w-full px-2 py-2.5 text-xs font-bold rounded-xl transition-all press-feedback ${
                                  oneTimeName === source
                                    ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-lg scale-105'
                                    : darkMode 
                                      ? 'bg-[#252233] text-gray-300 hover:bg-[#2D2A3E] border-2 border-[#3D3A4E]'
                                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-2 border-gray-200'
                                }`}
                              >
                                {source}
                              </button>
                            )}
                            {editingQuickSource !== idx && (
                              <div 
                                onClick={() => setEditingQuickSource(idx)}
                                className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity ${
                                  darkMode ? 'bg-purple-600 text-white' : 'bg-purple-400 text-white'
                                }`}
                              >
                                <Edit3 className="w-2.5 h-2.5" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {incomeInputMode === 'quick' && oneTimeName && (
                      <div className={`mt-2 text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        Selected: <span className={`font-bold ${darkMode ? 'text-purple-400' : 'text-purple-500'}`}>{oneTimeName}</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className={`block text-sm font-bold mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Notes <span className={`font-normal ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>(optional)</span>
                    </label>
                    <input
                      placeholder="What was this for?"
                      value={oneTimeNotes}
                      onChange={(e) => setOneTimeNotes(e.target.value)}
                      onKeyDown={(e) => (e.key === 'Enter' || e.keyCode === 13) && addOneTimeIncome()}
                      className={`candy-input ${darkMode ? 'candy-input-dark' : 'candy-input-light'}`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-bold mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Amount ($)</label>
                    <input
                      id="income-amount"
                      type="text"
                      inputMode="decimal"
                      placeholder="100"
                      value={oneTimeAmount ? formatNumberInput(oneTimeAmount) : ''}
                      onChange={(e) => setOneTimeAmount(parseFormattedNumber(e.target.value))}
                      onKeyDown={(e) => (e.key === 'Enter' || e.keyCode === 13) && addOneTimeIncome()}
                      className={`candy-input ${darkMode ? 'candy-input-dark' : 'candy-input-light'} ${shakeField === 'income-amount' ? 'shake border-red-400' : ''}`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-bold mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Date</label>
                    <CandyDateInput darkMode={darkMode}
                      value={oneTimeDate}
                      onChange={(e) => setOneTimeDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mt-4 flex justify-end gap-2">
                  {(oneTimeName || oneTimeAmount || oneTimeNotes) && (
                    <CandyButton variant="ghost" size="sm" onClick={clearIncomeForm} className="press-feedback">
                      <X className="w-4 h-4" /> Clear
                    </CandyButton>
                  )}
                  <CandyButton 
                    onClick={addOneTimeIncome} 
                    className={`btn-press ${successButton === 'add-income' ? 'success-flash' : ''}`}
                  >
                    {successButton === 'add-income' ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    {successButton === 'add-income' ? 'Added!' : 'Add Income'}
                  </CandyButton>
                </div>
              </CandyCard>

              {/* Stats Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <StatBubble darkMode={darkMode}
                  icon={<DollarSign className="w-6 h-6" />}
                  label="This Month"
                  value={formatMoney(getTotalIncomeForMonth())}
                  color="green"
                  pop={popTotal === 'income-total'}
                  previousValue={getPreviousMonthIncome()}
                />
                <StatBubble darkMode={darkMode}
                  icon={<Star className="w-6 h-6" />}
                  label="Annual (selected)"
                  value={formatMoney(calculateAnnualIncome())}
                  color="purple"
                />
                <StatBubble darkMode={darkMode}
                  icon={<TrendingUp className="w-6 h-6" />}
                  label="All Time"
                  value={formatMoney(oneTimeIncomes.reduce((s, i) => s + i.amount, 0))}
                  color="blue"
                />
              </div>

              {/* Month Filter */}
              <CandyCard darkMode={darkMode}>
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <h2 className={`text-xl font-black flex items-center gap-2 ${darkMode ? 'text-gray-100' : 'text-gray-700'}`}>
                    <span className="text-2xl">📊</span> Income by Source
                  </h2>
                  <MonthYearSelector
                    month={selectedIncomeMonth}
                    year={selectedIncomeYear}
                    setMonth={setSelectedIncomeMonth}
                    setYear={setSelectedIncomeYear}
                    darkMode={darkMode}
                    variant="purple"
                  />
                </div>

                {getUniqueOneTimeNames().length === 0 ? (
                  <EmptyState darkMode={darkMode} />
                ) : (
                  <div className="space-y-3">
                    {getUniqueOneTimeNames().map(name => {
                      const monthTotal = getOneTimeTotalByNameForMonth(name);
                      const monthIncomes = getOneTimeIncomesByNameForMonth(name);
                      const isExpanded = expandedOneTime[name];
                      const isAnnual = annualIncomeCategories.includes(name);

                      return (
                        <div
                          key={name}
                          className={`rounded-2xl border-2 overflow-hidden transition-all ${
                            isAnnual 
                              ? darkMode ? 'border-purple-700 bg-purple-900/20' : 'border-purple-200 bg-purple-50/50' 
                              : darkMode ? 'border-[#3D3A4E] bg-[#252233]' : 'border-gray-100 bg-white'
                          }`}
                        >
                          <div
                            className={`flex items-center justify-between p-4 cursor-pointer transition-colors press-feedback ${
                              darkMode ? 'hover:bg-white/5' : 'hover:bg-gray-50/50'
                            }`}
                            onClick={() => setExpandedOneTime({ ...expandedOneTime, [name]: !isExpanded })}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 ${
                                isExpanded ? 'rotate-90' : ''
                              } ${
                                isExpanded 
                                  ? (darkMode ? 'bg-pink-900/30' : 'bg-pink-100') 
                                  : (darkMode ? 'bg-[#2D2A3E]' : 'bg-gray-100')
                              }`}>
                                <ChevronRight className={`w-5 h-5 ${isExpanded ? 'text-pink-500' : (darkMode ? 'text-gray-500' : 'text-gray-400')}`} />
                              </div>
                              <div>
                                <p className={`font-bold ${darkMode ? 'text-gray-100' : 'text-gray-700'}`}>{name}</p>
                                <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{monthIncomes.length} entries</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setAnnualIncomeCategories(isAnnual
                                    ? annualIncomeCategories.filter(c => c !== name)
                                    : [...annualIncomeCategories, name]
                                  );
                                }}
                                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                                  isAnnual 
                                    ? (darkMode ? 'bg-purple-900/50 text-purple-300' : 'bg-purple-200 text-purple-700')
                                    : (darkMode ? 'bg-[#2D2A3E] text-gray-400 hover:bg-purple-900/30' : 'bg-gray-100 text-gray-500 hover:bg-purple-100')
                                }`}
                              >
                                {isAnnual ? '✓ Annual' : 'Add to Annual'}
                              </button>
                              <span className="text-xl font-black text-emerald-500">{formatMoney(monthTotal)}</span>
                            </div>
                          </div>

                          {/* Smooth Accordion Content */}
                          <div className={`accordion-content ${isExpanded ? 'expanded' : ''}`}>
                            <div>
                              {monthIncomes.length > 0 && (
                                <div className={`border-t ${darkMode ? 'border-[#3D3A4E] bg-[#1E1B2E]/50' : 'border-gray-100 bg-gray-50/50'}`}>
                                  {monthIncomes.map(income => (
                                    <div
                                      key={income.id}
                                      className={`flex items-center justify-between px-4 py-3 border-b last:border-0 ${
                                        deletingItems.has(income.id) ? 'delete-animation' : ''
                                      } ${
                                        darkMode ? 'border-[#3D3A4E]' : 'border-gray-100'
                                      } ${newItemId === income.id ? 'fade-in-up' : ''} ${
                                        newItemId === income.id ? (darkMode ? 'bg-emerald-900/20' : 'bg-emerald-50') : ''
                                      }`}
                                      onTouchStart={(e) => handleLongPressStart(e, 'income', income)}
                                      onTouchEnd={handleLongPressEnd}
                                      onTouchMove={handleLongPressMove}
                                      onMouseDown={(e) => handleLongPressStart(e, 'income', income)}
                                      onMouseUp={handleLongPressEnd}
                                      onMouseLeave={handleLongPressEnd}
                                    >
                                      <div className="flex-1">
                                        <span className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{formatDateDisplay(income.date)}</span>
                                        {income.notes && (
                                          <p className={`text-xs mt-1 italic ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                            "{income.notes}"
                                          </p>
                                        )}
                                      </div>
                                      <div className="flex items-center gap-3">
                                        <span className={`font-bold ${darkMode ? 'text-gray-100' : 'text-gray-700'}`}>{formatMoney(income.amount)}</span>
                                        <button
                                          onClick={() => removeOneTimeIncome(income.id)}
                                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors touch-target press-feedback ${
                                            darkMode 
                                              ? 'bg-red-900/30 text-red-400 hover:bg-red-900/50' 
                                              : 'bg-red-100 text-red-500 hover:bg-red-200'
                                          }`}
                                        >
                                          <X className="w-5 h-5" />
                                        </button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CandyCard>

              {/* Accounts & Debt Tracker */}
              <CandyCard darkMode={darkMode}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className={`text-xl font-black flex items-center gap-2 ${darkMode ? 'text-gray-100' : 'text-gray-700'}`}>
                    <span className="text-2xl">🏦</span> Accounts & Debt
                  </h2>
                  <CandyButton variant="ghost" size="sm" onClick={() => setShowAddCardModal(true)}>
                    <Plus className="w-4 h-4" /> Add Account
                  </CandyButton>
                </div>

                {/* Summary Stats */}
                {(creditCards.length > 0 || debitCards.length > 0) && (
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-4">
                    <div className={`p-3 rounded-xl text-center ${darkMode ? 'bg-emerald-900/20' : 'bg-emerald-50'}`}>
                      <p className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Checking</p>
                      <p className="text-lg font-bold text-emerald-500">{formatMoney(getTotalCheckingBalance())}</p>
                    </div>
                    <div className={`p-3 rounded-xl text-center ${darkMode ? 'bg-rose-900/20' : 'bg-rose-50'}`}>
                      <p className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Debt</p>
                      <p className="text-lg font-bold text-rose-500">{formatMoney(getTotalDebt())}</p>
                    </div>
                    <div className={`p-3 rounded-xl text-center ${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
                      <p className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Credit Limit</p>
                      <p className="text-lg font-bold text-blue-500">{formatMoney(getTotalCreditLimit())}</p>
                    </div>
                    <div className={`p-3 rounded-xl text-center ${darkMode ? 'bg-purple-900/20' : 'bg-purple-50'}`}>
                      <p className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Available Credit</p>
                      <p className="text-lg font-bold text-purple-500">{formatMoney(getTotalCreditLimit() - getTotalDebt())}</p>
                    </div>
                    <div className={`p-3 rounded-xl text-center ${
                      getOverallUtilization() > 30 
                        ? (darkMode ? 'bg-amber-900/20' : 'bg-amber-50')
                        : (darkMode ? 'bg-emerald-900/20' : 'bg-emerald-50')
                    }`}>
                      <p className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Utilization</p>
                      <p className={`text-lg font-bold ${
                        getOverallUtilization() > 30 ? 'text-amber-500' : 'text-emerald-500'
                      }`}>{getTotalCreditLimit() > 0 ? getOverallUtilization().toFixed(0) : 0}%</p>
                    </div>
                  </div>
                )}

                {/* Debit Cards (Checking Accounts) */}
                {debitCards.length > 0 && (
                  <div className="mb-4">
                    <h3 className={`text-sm font-bold mb-3 flex items-center gap-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      💵 Checking Accounts
                    </h3>
                    <div className="space-y-3">
                      {debitCards.map((card, idx) => {
                        const cardColor = DEBIT_COLORS[card.colorIndex || idx % DEBIT_COLORS.length];
                        const isExpanded = expandedCards[`debit-${card.id}`];
                        
                        return (
                          <div
                            key={card.id}
                            className={`rounded-2xl border-2 overflow-hidden transition-all ${
                              deletingItems.has(card.id) ? 'delete-animation' : ''
                            } ${darkMode ? 'border-[#3D3A4E]' : 'border-gray-100'}`}
                          >
                            <div
                              onClick={() => setExpandedCards({ ...expandedCards, [`debit-${card.id}`]: !isExpanded })}
                              className={`p-4 cursor-pointer transition-colors press-feedback ${
                                darkMode ? 'hover:bg-white/5' : 'hover:bg-gray-50'
                              }`}
                            >
                              <div className="flex items-center gap-4">
                                <div className={`w-12 h-8 rounded-lg bg-gradient-to-br ${cardColor.bg} flex items-center justify-center shadow-lg relative overflow-hidden`}>
                                  <div className="absolute inset-0 bg-white/10 rounded-lg" />
                                  <span className="text-sm">💵💸</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className={`font-bold truncate ${darkMode ? 'text-gray-100' : 'text-gray-700'}`}>{card.name}</h4>
                                  <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Checking Account</p>
                                </div>
                                <div className="text-right">
                                  <p className="text-lg font-bold text-emerald-500">{formatMoney(card.balance)}</p>
                                </div>
                                <ChevronRight className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-90' : ''} ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                              </div>
                            </div>
                            <div className={`accordion-content ${isExpanded ? 'expanded' : ''}`}>
                              <div className={`p-4 pt-0 border-t-2 ${darkMode ? 'border-[#3D3A4E]' : 'border-gray-100'}`}>
                                {card.transactions && card.transactions.length > 0 && (
                                  <div className="mt-4">
                                    {(() => {
                                      const txPerPage = 10;
                                      const currentPage = cardTxPage[card.id] || 0;
                                      const allTransactions = [...card.transactions].reverse();
                                      const totalPages = Math.ceil(allTransactions.length / txPerPage);
                                      const paginatedTx = allTransactions.slice(currentPage * txPerPage, (currentPage + 1) * txPerPage);
                                      
                                      return (
                                        <>
                                          <div className="flex items-center justify-between mb-2">
                                            <p className={`text-xs font-bold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Recent Transactions</p>
                                            {totalPages > 1 && (
                                              <div className="flex items-center gap-1">
                                                <button
                                                  onClick={(e) => { e.stopPropagation(); setDebitCardTxPage({...cardTxPage, [card.id]: Math.max(0, currentPage - 1)}); }}
                                                  disabled={currentPage === 0}
                                                  className={`px-2 py-0.5 text-xs font-bold rounded-lg ${currentPage === 0 ? 'opacity-30' : ''} ${darkMode ? 'text-purple-400' : 'text-purple-500'}`}
                                                >‹</button>
                                                <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{currentPage + 1}/{totalPages}</span>
                                                <button
                                                  onClick={(e) => { e.stopPropagation(); setDebitCardTxPage({...cardTxPage, [card.id]: Math.min(totalPages - 1, currentPage + 1)}); }}
                                                  disabled={currentPage >= totalPages - 1}
                                                  className={`px-2 py-0.5 text-xs font-bold rounded-lg ${currentPage >= totalPages - 1 ? 'opacity-30' : ''} ${darkMode ? 'text-purple-400' : 'text-purple-500'}`}
                                                >›</button>
                                              </div>
                                            )}
                                          </div>
                                          <div className="space-y-1">
                                            {paginatedTx.map(tx => (
                                              <div key={tx.id} className={`flex justify-between text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                                <span>{formatDateDisplay(tx.date)}</span>
                                                <span className={tx.type === 'deposit' ? 'text-emerald-500 font-medium' : 'text-rose-500 font-medium'}>
                                                  {tx.type === 'deposit' ? '+' : '-'}{formatMoney(tx.amount)}
                                                </span>
                                              </div>
                                            ))}
                                          </div>
                                        </>
                                      );
                                    })()}
                                  </div>
                                )}
                                <div className="flex gap-2 mt-4">
                                  <button onClick={(e) => { e.stopPropagation(); setShowDepositModal(card.id); }}
                                    className={`flex-1 py-2 px-3 rounded-xl text-sm font-bold transition-all ${darkMode ? 'bg-emerald-900/30 text-emerald-400 hover:bg-emerald-900/50' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'}`}>
                                    💰 Deposit
                                  </button>
                                  <button onClick={(e) => { e.stopPropagation(); setShowWithdrawModal(card.id); }}
                                    className={`flex-1 py-2 px-3 rounded-xl text-sm font-bold transition-all ${darkMode ? 'bg-amber-900/30 text-amber-400 hover:bg-amber-900/50' : 'bg-amber-50 text-amber-600 hover:bg-amber-100'}`}>
                                    💸 Withdraw
                                  </button>
                                  <button onClick={(e) => { e.stopPropagation(); removeCard(card.id); }}
                                    className={`py-2 px-3 rounded-xl text-sm font-bold transition-all ${darkMode ? 'bg-rose-900/30 text-rose-400 hover:bg-rose-900/50' : 'bg-rose-50 text-rose-600 hover:bg-rose-100'}`}>
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Credit Card List */}
                {creditCards.length > 0 && (
                  <div>
                    <h3 className={`text-sm font-bold mb-3 flex items-center gap-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      💳 Credit Cards
                    </h3>
                    <div className="space-y-3">
                      {creditCards.map((card, idx) => {
                        const cardColor = CARD_COLORS[card.colorIndex || idx % CARD_COLORS.length];
                        const isExpanded = expandedCards[card.id];
                        const { dueDate, daysUntil } = getCardDueDate(card);
                        const payoffInfo = calculatePayoffDate(card);
                        const utilization = card.creditLimit > 0 ? (card.balance / card.creditLimit) * 100 : 0;
                      
                      return (
                        <div
                          key={card.id}
                          className={`rounded-2xl border-2 overflow-hidden transition-all ${
                            deletingItems.has(card.id) ? 'delete-animation' : ''
                          } ${darkMode ? 'border-[#3D3A4E]' : 'border-gray-100'}`}
                        >
                          {/* Card Header - Clickable */}
                          <div
                            onClick={() => setExpandedCards({ ...expandedCards, [card.id]: !isExpanded })}
                            className={`p-4 cursor-pointer transition-colors press-feedback ${
                              darkMode ? 'hover:bg-white/5' : 'hover:bg-gray-50'
                            }`}
                          >
                            <div className="flex items-center gap-4">
                              {/* Colored Card Icon */}
                              <div className={`w-12 h-8 rounded-lg bg-gradient-to-br ${cardColor.bg} flex items-center justify-center shadow-lg relative overflow-hidden`}>
                                <div className="absolute inset-0 bg-white/10 rounded-lg" />
                                <span className="text-white text-xs font-bold">💳</span>
                              </div>
                              
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <h4 className={`font-bold truncate ${darkMode ? 'text-gray-100' : 'text-gray-700'}`}>
                                    {card.name}
                                  </h4>
                                  {daysUntil <= 7 && (
                                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                      daysUntil <= 3 
                                        ? 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400'
                                        : 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'
                                    }`}>
                                      {daysUntil === 0 ? 'Due today!' : daysUntil === 1 ? 'Due tomorrow' : `Due in ${daysUntil}d`}
                                    </span>
                                  )}
                                </div>
                                <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                  {formatMoney(card.balance)} / {formatMoney(card.creditLimit)}
                                </p>
                              </div>
                              
                              <div className="text-right">
                                <p className="text-lg font-bold text-rose-500">{formatMoney(card.balance)}</p>
                                <p className={`text-xs ${utilization > 30 ? 'text-amber-500' : 'text-emerald-500'}`}>
                                  {utilization.toFixed(0)}% used
                                </p>
                              </div>
                              
                              <ChevronRight className={`w-5 h-5 transition-transform ${
                                isExpanded ? 'rotate-90' : ''
                              } ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                            </div>
                            
                            {/* Utilization Bar */}
                            <div className={`mt-3 h-2 rounded-full overflow-hidden ${darkMode ? 'bg-[#1E1B2E]' : 'bg-gray-100'}`}>
                              <div 
                                className={`h-full rounded-full transition-all ${
                                  utilization > 50 ? 'bg-rose-500' : utilization > 30 ? 'bg-amber-500' : 'bg-emerald-500'
                                }`}
                                style={{ width: `${Math.min(100, utilization)}%` }}
                              />
                            </div>
                          </div>
                          
                          {/* Expanded Details */}
                          <div className={`accordion-content ${isExpanded ? 'expanded' : ''}`}>
                            <div className={`p-4 pt-0 border-t-2 ${darkMode ? 'border-[#3D3A4E]' : 'border-gray-100'}`}>
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                                <div className={`p-2 rounded-xl text-center ${darkMode ? 'bg-[#1E1B2E]' : 'bg-gray-50'}`}>
                                  <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>APR</p>
                                  <p className={`font-bold ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{card.apr}%</p>
                                </div>
                                <div className={`p-2 rounded-xl text-center ${darkMode ? 'bg-[#1E1B2E]' : 'bg-gray-50'}`}>
                                  <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Min Payment</p>
                                  <p className={`font-bold ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{formatMoney(card.minPayment)}</p>
                                </div>
                                <div className={`p-2 rounded-xl text-center ${darkMode ? 'bg-[#1E1B2E]' : 'bg-gray-50'}`}>
                                  <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Due Date</p>
                                  <p className={`font-bold ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Day {card.dueDay}</p>
                                </div>
                                <div className={`p-2 rounded-xl text-center ${darkMode ? 'bg-[#1E1B2E]' : 'bg-gray-50'}`}>
                                  <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Payoff Time</p>
                                  <p className={`font-bold ${
                                    payoffInfo && payoffInfo.months === -1 ? 'text-rose-500' : darkMode ? 'text-gray-200' : 'text-gray-700'
                                  }`}>
                                    {card.balance <= 0 ? 'Paid off! 🎉' : payoffInfo ? payoffInfo.message : 'N/A'}
                                  </p>
                                </div>
                              </div>
                              
                              {/* Payment History */}
                              {card.payments && card.payments.length > 0 && (
                                <div className="mt-4">
                                  {(() => {
                                    const txPerPage = 10;
                                    const currentPage = cardTxPage[card.id] || 0;
                                    const allPayments = [...card.payments].reverse();
                                    const totalPages = Math.ceil(allPayments.length / txPerPage);
                                    const paginatedPayments = allPayments.slice(currentPage * txPerPage, (currentPage + 1) * txPerPage);
                                    
                                    return (
                                      <>
                                        <div className="flex items-center justify-between mb-2">
                                          <p className={`text-xs font-bold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Recent Activity</p>
                                          {totalPages > 1 && (
                                            <div className="flex items-center gap-1">
                                              <button
                                                onClick={(e) => { e.stopPropagation(); setCreditCardTxPage({...cardTxPage, [card.id]: Math.max(0, currentPage - 1)}); }}
                                                disabled={currentPage === 0}
                                                className={`px-2 py-0.5 text-xs font-bold rounded-lg ${currentPage === 0 ? 'opacity-30' : ''} ${darkMode ? 'text-purple-400' : 'text-purple-500'}`}
                                              >‹</button>
                                              <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{currentPage + 1}/{totalPages}</span>
                                              <button
                                                onClick={(e) => { e.stopPropagation(); setCreditCardTxPage({...cardTxPage, [card.id]: Math.min(totalPages - 1, currentPage + 1)}); }}
                                                disabled={currentPage >= totalPages - 1}
                                                className={`px-2 py-0.5 text-xs font-bold rounded-lg ${currentPage >= totalPages - 1 ? 'opacity-30' : ''} ${darkMode ? 'text-purple-400' : 'text-purple-500'}`}
                                              >›</button>
                                            </div>
                                          )}
                                        </div>
                                        <div className="space-y-1">
                                          {paginatedPayments.map(payment => (
                                            <div key={payment.id} className={`flex justify-between text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                              <span>{formatDateDisplay(payment.date)}</span>
                                              <span className={payment.type === 'spend' ? 'text-rose-500 font-medium' : 'text-emerald-500 font-medium'}>
                                                {payment.type === 'spend' ? '+' : '-'}{formatMoney(payment.amount)}
                                              </span>
                                            </div>
                                          ))}
                                        </div>
                                      </>
                                    );
                                  })()}
                                </div>
                              )}
                              
                              {/* Action Buttons */}
                              <div className="flex gap-2 mt-4">
                                <button
                                  onClick={(e) => { e.stopPropagation(); setShowPaymentModal(card.id); }}
                                  className={`flex-1 py-2 px-3 rounded-xl text-sm font-bold transition-all ${
                                    darkMode 
                                      ? 'bg-emerald-900/30 text-emerald-400 hover:bg-emerald-900/50' 
                                      : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                                  }`}
                                >
                                  💵 Pay
                                </button>
                                <button
                                  onClick={(e) => { e.stopPropagation(); setShowSpendModal(card.id); }}
                                  className={`flex-1 py-2 px-3 rounded-xl text-sm font-bold transition-all ${
                                    darkMode 
                                      ? 'bg-purple-900/30 text-purple-400 hover:bg-purple-900/50' 
                                      : 'bg-purple-50 text-purple-600 hover:bg-purple-100'
                                  }`}
                                >
                                  🛒 Spend
                                </button>
                                <button
                                  onClick={(e) => { e.stopPropagation(); removeCard(card.id); }}
                                  className={`py-2 px-3 rounded-xl text-sm font-bold transition-all ${
                                    darkMode 
                                      ? 'bg-rose-900/30 text-rose-400 hover:bg-rose-900/50' 
                                      : 'bg-rose-50 text-rose-600 hover:bg-rose-100'
                                  }`}
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                )}

                {/* Empty State */}
                {creditCards.length === 0 && debitCards.length === 0 && (
                  <div className={`text-center py-8 rounded-2xl ${darkMode ? 'bg-[#1E1B2E]' : 'bg-gray-50'}`}>
                    <span className="text-4xl mb-3 block">🏦</span>
                    <p className={`font-bold ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>No accounts tracked</p>
                    <p className={`text-sm mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                      Add checking accounts or credit cards to track your finances
                    </p>
                  </div>
                )}
              </CandyCard>
            </div>
          )}
          {viewMode === 'investments' && (
            <div className={`space-y-6 tab-content ${swipeDirection === 'left' ? 'slide-left-exit' : swipeDirection === 'right' ? 'slide-right-exit' : 'active'}`}>
              <CandyCard darkMode={darkMode}>
                <h2 className={`text-xl font-black mb-4 flex items-center gap-2 ${darkMode ? 'text-gray-100' : 'text-gray-700'}`}>
                  <span className="text-2xl">{investType === 'buy' ? '📈' : '📉'}</span> {investType === 'buy' ? 'Buy' : 'Sell'} Investment
                </h2>
                
                {/* Buy/Sell Toggle */}
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => setInvestType('buy')}
                    className={`flex-1 py-3 px-4 rounded-2xl font-bold transition-all ${
                      investType === 'buy'
                        ? 'bg-gradient-to-r from-emerald-400 to-teal-500 text-white shadow-lg'
                        : darkMode 
                          ? 'bg-[#1E1B2E] text-gray-400 hover:text-gray-200'
                          : 'bg-gray-100 text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <TrendingUp className="w-4 h-4 inline mr-2" />
                    Buy
                  </button>
                  <button
                    onClick={() => setInvestType('sell')}
                    className={`flex-1 py-3 px-4 rounded-2xl font-bold transition-all ${
                      investType === 'sell'
                        ? 'bg-gradient-to-r from-rose-400 to-pink-500 text-white shadow-lg'
                        : darkMode 
                          ? 'bg-[#1E1B2E] text-gray-400 hover:text-gray-200'
                          : 'bg-gray-100 text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <TrendingUp className="w-4 h-4 inline mr-2 rotate-180" />
                    Sell
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div className="lg:col-span-2">
                    {/* Asset Input Mode Toggle */}
                    <div className="flex items-center justify-between mb-2">
                      <div className={`flex rounded-xl overflow-hidden border-2 ${darkMode ? 'border-[#3D3A4E]' : 'border-gray-200'}`}>
                        <button
                          onClick={() => setAssetInputMode('manual')}
                          className={`px-3 py-1 text-xs font-bold transition-all ${
                            assetInputMode === 'manual'
                              ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white'
                              : darkMode ? 'text-gray-400 hover:bg-white/5' : 'text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          Asset Name
                        </button>
                        <button
                          onClick={() => setAssetInputMode('quick')}
                          className={`px-3 py-1 text-xs font-bold transition-all ${
                            assetInputMode === 'quick'
                              ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white'
                              : darkMode ? 'text-gray-400 hover:bg-white/5' : 'text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          Quick Assets
                        </button>
                      </div>
                    </div>
                    
                    {/* Manual Input Mode */}
                    {assetInputMode === 'manual' && (
                      <>
                        <input
                          ref={investAssetRef}
                          id="invest-asset"
                          placeholder="e.g., AAPL, Bitcoin, ETF"
                          value={selectedAsset}
                          onChange={(e) => setSelectedAsset(e.target.value)}
                          onKeyDown={(e) => (e.key === 'Enter' || e.keyCode === 13) && addInvestment()}
                          list="asset-names"
                          className={`candy-input ${darkMode ? 'candy-input-dark' : 'candy-input-light'} ${shakeField === 'invest-asset' ? 'shake border-red-400' : ''}`}
                        />
                        <datalist id="asset-names">
                          {uniqueAssets.map(a => <option key={a} value={a} />)}
                        </datalist>
                      </>
                    )}
                    
                    {/* Quick Assets Mode */}
                    {assetInputMode === 'quick' && (
                      <div className="flex gap-2">
                        {quickAssets.map((asset, idx) => (
                          <div key={idx} className="flex-1 relative group">
                            {editingQuickAsset === idx ? (
                              <input
                                autoFocus
                                type="text"
                                value={asset}
                                onChange={(e) => {
                                  const newAssets = [...quickAssets];
                                  newAssets[idx] = e.target.value;
                                  setQuickAssets(newAssets);
                                }}
                                onBlur={() => setEditingQuickAsset(null)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') setEditingQuickAsset(null);
                                }}
                                className={`w-full px-3 py-2.5 text-sm font-bold rounded-xl outline-none text-center ${
                                  darkMode 
                                    ? 'bg-[#252233] text-gray-100 border-2 border-purple-500' 
                                    : 'bg-white text-gray-700 border-2 border-purple-400'
                                }`}
                              />
                            ) : (
                              <button
                                onClick={() => setSelectedAsset(asset)}
                                onTouchEnd={(e) => {
                                  e.preventDefault();
                                  setSelectedAsset(asset);
                                }}
                                onDoubleClick={() => setEditingQuickAsset(idx)}
                                className={`w-full px-3 py-2.5 text-sm font-bold rounded-xl transition-all press-feedback ${
                                  selectedAsset === asset
                                    ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-lg scale-105'
                                    : darkMode 
                                      ? 'bg-[#252233] text-gray-300 hover:bg-[#2D2A3E] border-2 border-[#3D3A4E]'
                                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-2 border-gray-200'
                                }`}
                              >
                                {asset}
                              </button>
                            )}
                            {/* Edit hint on hover */}
                            {editingQuickAsset !== idx && (
                              <div 
                                onClick={() => setEditingQuickAsset(idx)}
                                className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity ${
                                  darkMode ? 'bg-purple-600 text-white' : 'bg-purple-400 text-white'
                                }`}
                                title="Click to edit"
                              >
                                <Edit3 className="w-2.5 h-2.5" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* Selected asset indicator when in quick mode */}
                    {assetInputMode === 'quick' && selectedAsset && (
                      <div className={`mt-2 text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        Selected: <span className={`font-bold ${darkMode ? 'text-purple-400' : 'text-purple-500'}`}>{selectedAsset}</span>
                        <span className={`ml-2 opacity-60`}>(double-tap to edit buttons)</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className={`block text-sm font-bold mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {investType === 'buy' ? 'Cost ($)' : 'Proceeds ($)'}
                    </label>
                    <input
                      id="invest-amount"
                      type="text"
                      inputMode="decimal"
                      placeholder="500"
                      value={investAmount ? formatNumberInput(investAmount) : ''}
                      onChange={(e) => setInvestAmount(parseFormattedNumber(e.target.value))}
                      onKeyDown={(e) => (e.key === 'Enter' || e.keyCode === 13) && addInvestment()}
                      className={`candy-input ${darkMode ? 'candy-input-dark' : 'candy-input-light'} ${shakeField === 'invest-amount' ? 'shake border-red-400' : ''}`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-bold mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Quantity <span className={`font-normal text-xs ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>(optional)</span>
                    </label>
                    <input
                      id="invest-quantity"
                      type="text"
                      inputMode="decimal"
                      placeholder="e.g., 2.5"
                      value={investQuantity ? formatNumberInput(investQuantity) : ''}
                      onChange={(e) => setInvestQuantity(parseFormattedNumber(e.target.value))}
                      onKeyDown={(e) => (e.key === 'Enter' || e.keyCode === 13) && addInvestment()}
                      className={`candy-input ${darkMode ? 'candy-input-dark' : 'candy-input-light'} ${shakeField === 'invest-quantity' ? 'shake border-red-400' : ''}`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-bold mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Month/Year</label>
                    <MonthYearSelector
                      month={investMonth}
                      year={investYear}
                      setMonth={setInvestMonth}
                      setYear={setInvestYear}
                      darkMode={darkMode}
                      variant="purple"
                    />
                  </div>
                </div>
                <div className="mt-4 flex justify-end gap-2">
                  {(selectedAsset || investAmount || investQuantity) && (
                    <CandyButton variant="ghost" size="sm" onClick={clearInvestmentForm} className="press-feedback">
                      <X className="w-4 h-4" /> Clear
                    </CandyButton>
                  )}
                  <CandyButton 
                    variant={investType === 'buy' ? 'success' : 'primary'} 
                    onClick={addInvestment}
                    className={`btn-press ${successButton === 'add-investment' ? 'success-flash' : ''}`}
                  >
                    {successButton === 'add-investment' ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    {successButton === 'add-investment' ? 'Added!' : (investType === 'buy' ? 'Add Buy' : 'Add Sell')}
                  </CandyButton>
                </div>
              </CandyCard>

              {/* Stats Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <StatBubble darkMode={darkMode}
                  icon={<TrendingUp className="w-6 h-6" />}
                  label="Total Bought"
                  value={formatMoney(getTotalBuys())}
                  color="purple"
                  pop={popTotal === 'invest-total'}
                />
                <StatBubble darkMode={darkMode}
                  icon={<TrendingUp className="w-6 h-6 rotate-180" />}
                  label="Total Sold"
                  value={formatMoney(getTotalSells())}
                  color="pink"
                />
                <StatBubble darkMode={darkMode}
                  icon={<DollarSign className="w-6 h-6" />}
                  label="Net Invested"
                  value={formatMoney(getTotalInvested())}
                  color="blue"
                />
                <StatBubble darkMode={darkMode}
                  icon={<Sparkles className="w-6 h-6" />}
                  label={
                    <span className="flex items-center gap-1">
                      {getTotalPnL().total >= 0 ? 'Total P&L' : 'Total Loss'}
                      {getTotalPnL().hasMixedEntries && (
                        <span className={`text-[10px] ${darkMode ? 'text-amber-400' : 'text-amber-500'}`} title="Some entries missing quantities">*</span>
                      )}
                    </span>
                  }
                  value={(getTotalPnL().total >= 0 ? '+' : '') + formatMoney(getTotalPnL().total)}
                  color={getTotalPnL().total >= 0 ? 'green' : 'orange'}
                />
              </div>
              
              {/* Mixed entries note */}
              {getTotalPnL().hasMixedEntries && (
                <div className={`text-xs text-center ${darkMode ? 'text-amber-400/70' : 'text-amber-600/70'}`}>
                  * P&L calculated only from entries with quantities. Expand holdings for details.
                </div>
              )}

              {uniqueAssets.length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <CandyCard darkMode={darkMode}>
                    <h3 className={`text-lg font-bold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-700'}`}>Portfolio Breakdown</h3>
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Pie Chart */}
                      <div className="flex-1">
                        <ResponsiveContainer width="100%" height={200}>
                          <RechartsPie>
                            <Pie
                              data={getPieChartData()}
                              dataKey="value"
                              nameKey="name"
                              cx="50%"
                              cy="50%"
                              outerRadius={70}
                              innerRadius={45}
                              paddingAngle={5}
                            >
                              {getPieChartData().map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value) => formatMoney(value)} />
                            <Legend />
                          </RechartsPie>
                        </ResponsiveContainer>
                      </div>
                      
                      {/* Monthly Investment Calendar */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <span className={`text-sm font-bold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Monthly Activity</span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setInvestCalendarYear(y => y - 1)}
                              className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                                darkMode ? 'hover:bg-white/10 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
                              }`}
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </button>
                            <span className={`text-sm font-bold min-w-[50px] text-center ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                              {investCalendarYear}
                            </span>
                            <button
                              onClick={() => setInvestCalendarYear(y => y + 1)}
                              className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                                darkMode ? 'hover:bg-white/10 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
                              }`}
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, idx) => {
                            const monthData = getMonthlyInvestments(investCalendarYear)[idx];
                            const hasBuys = monthData.buys > 0;
                            const hasSells = monthData.sells > 0;
                            const hasActivity = hasBuys || hasSells;
                            const netAmount = monthData.buys - monthData.sells;
                            const isCurrentMonth = idx === new Date().getMonth() && investCalendarYear === new Date().getFullYear();
                            const isMostlyBuys = monthData.buys >= monthData.sells;
                            
                            return (
                              <div
                                key={month}
                                className={`group relative p-2 rounded-xl text-center transition-all cursor-default ${
                                  hasActivity
                                    ? darkMode 
                                      ? 'bg-purple-900/30 border-2 border-purple-500/30 hover:border-purple-400/50' 
                                      : 'bg-purple-50 border-2 border-purple-200 hover:border-purple-300'
                                    : darkMode
                                      ? 'bg-[#1E1B2E] border-2 border-transparent'
                                      : 'bg-gray-50 border-2 border-transparent'
                                } ${isCurrentMonth ? 'ring-2 ring-pink-400' : ''}`}
                              >
                                <div className={`text-xs font-bold mb-1 ${
                                  darkMode ? 'text-gray-400' : 'text-gray-500'
                                }`}>
                                  {month}
                                </div>
                                {hasActivity ? (
                                  <div className="text-xs font-bold text-emerald-500">
                                    +{formatMoney(monthData.buys).replace('$', '')}
                                  </div>
                                ) : (
                                  <div className={`text-xs ${darkMode ? 'text-gray-600' : 'text-gray-300'}`}>—</div>
                                )}
                                {/* Activity indicator badge */}
                                {hasActivity && (
                                  <div className="absolute top-1 right-1">
                                    <span className={`w-2 h-2 rounded-full block ${
                                      isMostlyBuys ? 'bg-emerald-400' : 'bg-rose-400'
                                    }`} />
                                  </div>
                                )}
                                {/* Hover tooltip */}
                                {hasActivity && (
                                  <div className={`absolute z-20 bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none ${
                                    darkMode ? 'bg-[#1E1B2E] border border-purple-500/30 shadow-xl' : 'bg-white border border-purple-200 shadow-lg'
                                  }`}>
                                    <div className={`font-bold mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{month} {investCalendarYear}</div>
                                    <div className="flex items-center gap-2">
                                      <span className={`w-2 h-2 rounded-full ${netAmount >= 0 ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                                      <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Net:</span>
                                      <span className={`font-bold ${netAmount >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                                        {netAmount >= 0 ? '+' : ''}{formatMoney(netAmount)}
                                      </span>
                                    </div>
                                    {hasSells && (
                                      <div className="flex items-center gap-2 mt-1">
                                        <span className="w-2 h-2 rounded-full bg-rose-400" />
                                        <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Sold:</span>
                                        <span className="text-rose-500 font-bold">{formatMoney(monthData.sells)}</span>
                                      </div>
                                    )}
                                    {/* Tooltip arrow */}
                                    <div className={`absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent ${
                                      darkMode ? 'border-t-[#1E1B2E]' : 'border-t-white'
                                    }`} />
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                        <div className="flex justify-center gap-4 mt-3">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-400" />
                            <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Mostly Buys</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-rose-400" />
                            <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Mostly Sells</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CandyCard>

                  <CandyCard darkMode={darkMode}>
                    <h3 className={`text-lg font-bold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-700'}`}>Holdings</h3>
                    
                    <div className="space-y-3 max-h-[400px] overflow-y-auto">
                      {uniqueAssets.map((asset, idx) => {
                        const holdings = getAssetHoldings(asset);
                        const isExpanded = expandedAssets[asset];
                        const pnlColor = holdings.unrealizedPnL >= 0 ? 'text-emerald-500' : 'text-rose-500';
                        
                        return (
                          <div key={asset} className={`border-2 rounded-xl overflow-hidden transition-colors ${
                            darkMode ? 'border-[#3D3A4E]' : 'border-gray-100'
                          }`}>
                            {/* Header */}
                            <div
                              className={`flex items-center justify-between p-3 cursor-pointer transition-colors press-feedback ${
                                darkMode ? 'hover:bg-white/5' : 'hover:bg-gray-50'
                              }`}
                              onClick={() => setExpandedAssets({ ...expandedAssets, [asset]: !isExpanded })}
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-6 h-6 rounded-lg flex items-center justify-center transition-transform duration-300 ${
                                    isExpanded ? 'rotate-90' : ''
                                  } ${darkMode ? 'bg-purple-900/30' : 'bg-purple-100'}`}
                                >
                                  <ChevronRight className={`w-4 h-4 ${darkMode ? 'text-purple-400' : 'text-purple-500'}`} />
                                </div>
                                <div
                                  className="w-4 h-4 rounded-full"
                                  style={{ backgroundColor: CHART_COLORS[idx % CHART_COLORS.length] }}
                                />
                                <div>
                                  <span className={`font-bold ${darkMode ? 'text-gray-100' : 'text-gray-700'}`}>{asset}</span>
                                  {holdings.totalQuantity > 0 && (
                                    <span className={`ml-2 text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                      {holdings.totalQuantity.toLocaleString(undefined, { maximumFractionDigits: 6 })} units
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-bold text-purple-500">{formatMoney(holdings.totalCost)}</div>
                                {holdings.hasTrackedHoldings && holdings.currentPrice > 0 && (
                                  <div className={`text-xs font-medium ${pnlColor}`}>
                                    {holdings.unrealizedPnL >= 0 ? '+' : ''}{formatMoney(holdings.unrealizedPnL)}
                                    {holdings.hasMixedEntries && <span className="opacity-60">*</span>}
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            {/* Expanded Details - Smooth Accordion */}
                            <div className={`accordion-content ${isExpanded ? 'expanded' : ''}`}>
                              <div>
                                <div className={`border-t p-3 space-y-3 ${
                                  darkMode ? 'border-[#3D3A4E] bg-[#1E1B2E]/50' : 'border-gray-100 bg-gray-50/50'
                                }`}>
                                  {/* Current Price Input */}
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <label className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                      Current Price/Unit:
                                    </label>
                                    <div className="relative flex-1 max-w-[120px]">
                                      <span className={`absolute left-3 top-1/2 -translate-y-1/2 text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>$</span>
                                      <input
                                        type="number"
                                        step="any"
                                        placeholder="0.00"
                                        value={currentValues[asset] || ''}
                                        onChange={(e) => setCurrentValues({ ...currentValues, [asset]: parseFloat(e.target.value) || 0 })}
                                        className={`w-full pl-7 pr-2 py-1.5 text-sm rounded-lg outline-none ${
                                          darkMode 
                                            ? 'bg-[#252233] text-gray-100 placeholder-gray-600' 
                                            : 'bg-white text-gray-700 placeholder-gray-400 border border-gray-200'
                                        }`}
                                      />
                                    </div>
                                  </div>
                                  
                                  {/* Holdings Summary */}
                                  {holdings.totalQuantity > 0 && (
                                    <div className={`grid grid-cols-2 gap-2 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                      <div>Avg Cost: <span className={darkMode ? 'text-gray-200' : 'text-gray-700'}>{formatMoney(holdings.avgPrice)}/unit</span></div>
                                      {holdings.currentPrice > 0 && (
                                        <div>Current Value: <span className={darkMode ? 'text-gray-200' : 'text-gray-700'}>{formatMoney(holdings.currentValue)}</span></div>
                                      )}
                                      {holdings.realizedPnL !== 0 && (
                                        <div>Realized P&L: <span className={holdings.realizedPnL >= 0 ? 'text-emerald-500' : 'text-rose-500'}>
                                          {holdings.realizedPnL >= 0 ? '+' : ''}{formatMoney(holdings.realizedPnL)}
                                        </span></div>
                                      )}
                                    </div>
                                  )}
                                  
                                  {/* Mixed entries warning */}
                                  {holdings.hasMixedEntries && (
                                    <div className={`p-2 rounded-lg text-xs ${
                                      darkMode ? 'bg-amber-900/20 text-amber-400' : 'bg-amber-50 text-amber-600'
                                    }`}>
                                      <div className="flex items-start gap-2">
                                        <span>⚠️</span>
                                        <div>
                                          <div className="font-medium">Mixed entries detected</div>
                                          <div className="mt-0.5 opacity-80">
                                            P&L is calculated only from entries with quantities.
                                            {holdings.untrackedCost > 0 && (
                                              <span className="block mt-1">
                                                Tracked: {formatMoney(holdings.trackedCost)} ({holdings.totalQuantity.toLocaleString(undefined, { maximumFractionDigits: 4 })} units)
                                                <br />Untracked: {formatMoney(holdings.untrackedCost)} (no qty)
                                              </span>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                  
                                  {/* No tracked holdings info */}
                                  {!holdings.hasTrackedHoldings && holdings.untrackedCost > 0 && (
                                    <div className={`p-2 rounded-lg text-xs ${
                                      darkMode ? 'bg-blue-900/20 text-blue-400' : 'bg-blue-50 text-blue-600'
                                    }`}>
                                      <div className="flex items-start gap-2">
                                        <span>ℹ️</span>
                                        <div>
                                          <div className="font-medium">No quantity data</div>
                                          <div className="mt-0.5 opacity-80">
                                            Add quantities to your buys to enable P&L tracking.
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                  
                                  {/* Transaction History with Pagination */}
                                  {(() => {
                                    const history = getInvestmentHistory(asset);
                                    const itemsPerPage = 8;
                                    const currentPage = assetTransactionPages[asset] || 0;
                                    const totalPages = Math.ceil(history.length / itemsPerPage);
                                    const startIdx = currentPage * itemsPerPage;
                                    const paginatedHistory = history.slice(startIdx, startIdx + itemsPerPage);
                                    
                                    return (
                                      <>
                                        <div className="flex items-center justify-between mb-1">
                                          <span className={`text-xs font-medium ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                            Recent Transactions
                                          </span>
                                          {totalPages > 1 && (
                                            <div className="flex items-center gap-1">
                                              <button
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  setAssetTransactionPages({ ...assetTransactionPages, [asset]: Math.max(0, currentPage - 1) });
                                                }}
                                                disabled={currentPage === 0}
                                                className={`px-2 py-0.5 text-xs font-bold rounded-lg transition-all ${
                                                  currentPage === 0
                                                    ? 'opacity-30 cursor-not-allowed'
                                                    : 'hover:scale-105 active:scale-95'
                                                } ${darkMode ? 'text-purple-400' : 'text-purple-500'}`}
                                              >
                                                ‹ Prev
                                              </button>
                                              <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                                {currentPage + 1}/{totalPages}
                                              </span>
                                              <button
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  setAssetTransactionPages({ ...assetTransactionPages, [asset]: Math.min(totalPages - 1, currentPage + 1) });
                                                }}
                                                disabled={currentPage >= totalPages - 1}
                                                className={`px-2 py-0.5 text-xs font-bold rounded-lg transition-all ${
                                                  currentPage >= totalPages - 1
                                                    ? 'opacity-30 cursor-not-allowed'
                                                    : 'hover:scale-105 active:scale-95'
                                                } ${darkMode ? 'text-purple-400' : 'text-purple-500'}`}
                                              >
                                                Next ›
                                              </button>
                                            </div>
                                          )}
                                        </div>
                                        {paginatedHistory.map(inv => (
                                          <div 
                                            key={inv.id} 
                                            className={`flex items-center justify-between py-2 text-sm border-t ${
                                              deletingItems.has(inv.id) ? 'delete-animation' : ''
                                            } ${
                                            darkMode ? 'border-[#3D3A4E]/50' : 'border-gray-100'
                                          }`}
                                            onTouchStart={(e) => handleLongPressStart(e, 'investment', inv)}
                                            onTouchEnd={handleLongPressEnd}
                                            onTouchMove={handleLongPressMove}
                                            onMouseDown={(e) => handleLongPressStart(e, 'investment', inv)}
                                            onMouseUp={handleLongPressEnd}
                                            onMouseLeave={handleLongPressEnd}
                                          >
                                          <div className="flex items-center gap-2">
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                                              inv.type === 'sell' 
                                                ? 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400'
                                                : 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'
                                            }`}>
                                              {inv.type === 'sell' ? 'SELL' : 'BUY'}
                                            </span>
                                            <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                                              {monthNames[inv.month]} {inv.year}
                                            </span>
                                          </div>
                                          <div className="flex items-center gap-3">
                                            <div className="text-right">
                                              <span className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                                                {formatMoney(inv.amount)}
                                              </span>
                                              {inv.quantity && (
                                                <span className={`ml-1 text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                                  ({inv.quantity} units)
                                                </span>
                                              )}
                                            </div>
                                            <button
                                              onClick={(e) => { e.stopPropagation(); removeInvestment(inv.id); }}
                                              className={`p-1 rounded-lg transition-colors ${
                                                darkMode 
                                                  ? 'text-gray-500 hover:text-red-400 hover:bg-red-900/20' 
                                                  : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                                              }`}
                                            >
                                              <X className="w-4 h-4" />
                                            </button>
                                          </div>
                                        </div>
                                      ))}
                                      </>
                                    );
                                  })()}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CandyCard>
                </div>
              )}

              {uniqueAssets.length === 0 && (
                <CandyCard darkMode={darkMode}>
                  <EmptyState darkMode={darkMode} />
                </CandyCard>
              )}
            </div>
          )}

          {/* BUDGET TAB */}
          {viewMode === 'budget' && (
            <div className={`space-y-6 tab-content ${swipeDirection === 'left' ? 'slide-left-exit' : swipeDirection === 'right' ? 'slide-right-exit' : 'active'}`}>
              <CandyCard darkMode={darkMode}>
                <h2 className={`text-sm font-bold uppercase tracking-wider mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Log Expense
                </h2>
                
                {/* Horizontal layout: Amount+Notes | Categories | Date+Button */}
                <div className="expense-grid">
                  {/* Amount & Notes - Left */}
                  <div className="space-y-3">
                    <div>
                      <label className={`block text-xs font-bold uppercase tracking-wider mb-3 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        Amount
                      </label>
                      <div className={`relative rounded-2xl overflow-hidden ${
                        darkMode ? 'bg-[#1E1B2E]' : 'bg-gray-50'
                      }`}>
                        <span className={`absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold ${
                          darkMode ? 'text-gray-500' : 'text-gray-400'
                        }`}>$</span>
                        <input
                          ref={expenseAmountRef}
                          id="expense-amount"
                          type="text"
                          inputMode="decimal"
                          placeholder="0.00"
                          value={expenseAmount ? formatNumberInput(expenseAmount) : ''}
                          onChange={(e) => setExpenseAmount(parseFormattedNumber(e.target.value))}
                          onKeyDown={(e) => (e.key === 'Enter' || e.keyCode === 13) && addExpense()}
                          className={`w-full pl-10 pr-4 py-4 text-lg font-bold bg-transparent outline-none ${
                            darkMode ? 'text-gray-100 placeholder-gray-600' : 'text-gray-700 placeholder-gray-300'
                          } ${shakeField === 'expense-amount' ? 'shake' : ''}`}
                        />
                      </div>
                    </div>
                    <div>
                      <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        Notes <span className="font-normal opacity-60">(optional)</span>
                      </label>
                      <input
                        placeholder="e.g., Lunch at cafe"
                        value={expenseNotes}
                        onChange={(e) => setExpenseNotes(e.target.value)}
                        onKeyDown={(e) => (e.key === 'Enter' || e.keyCode === 13) && addExpense()}
                        className={`w-full px-4 py-3 rounded-2xl text-sm font-medium bg-transparent outline-none transition-colors ${
                          darkMode 
                            ? 'bg-[#1E1B2E] text-gray-100 placeholder-gray-600' 
                            : 'bg-gray-50 text-gray-700 placeholder-gray-400'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Category Grid - Center */}
                  <div>
                    <label className={`block text-xs font-bold uppercase tracking-wider mb-3 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                      Category
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {EXPENSE_CATEGORIES.map(cat => {
                        const isSelected = expenseCategory === cat;
                        const style = CATEGORY_STYLES[cat];
                        return (
                          <button
                            key={cat}
                            onClick={() => setExpenseCategory(cat)}
                            className={`px-3 py-3 rounded-xl font-bold text-sm transition-all press-feedback ${
                              isSelected
                                ? 'text-white shadow-lg scale-105'
                                : darkMode
                                  ? 'bg-[#1E1B2E] text-gray-400 hover:text-gray-200 hover:bg-[#2D2A3E]'
                                  : 'bg-gray-100 text-gray-500 hover:text-gray-700 hover:bg-gray-200'
                            }`}
                            style={isSelected ? { 
                              background: `linear-gradient(135deg, ${style.color}, ${style.color}dd)`,
                              boxShadow: `0 4px 15px ${style.color}50`
                            } : {}}
                          >
                            <span className="flex items-center justify-center gap-2">
                              <span className="text-lg">{style.icon}</span>
                              <span className="uppercase tracking-wide">{cat}</span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Date & Button - Right */}
                  <div className="space-y-3">
                    <div>
                      <label className={`block text-xs font-bold uppercase tracking-wider mb-3 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        Date
                      </label>
                      <CandyDateInput 
                        darkMode={darkMode}
                        value={expenseDate}
                        onChange={(e) => setExpenseDate(e.target.value)}
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={addExpense}
                        className={`flex-1 group flex items-center justify-center gap-2 px-4 py-4 rounded-2xl font-bold text-white transition-all hover:scale-105 active:scale-95 btn-press border-2 border-emerald-300/30 ${
                          successButton === 'add-expense' ? 'success-flash' : ''
                        }`}
                        style={{
                          background: successButton === 'add-expense' 
                            ? 'linear-gradient(135deg, #34D399, #10B981)'
                            : 'linear-gradient(to right, #34D399, #2DD4BF, #22D3EE)',
                          boxShadow: successButton === 'add-expense'
                            ? '0 4px 20px rgba(52, 211, 153, 0.4)'
                            : '0 4px 20px rgba(52, 211, 153, 0.3)'
                        }}
                      >
                        {successButton === 'add-expense' ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                        <span className="uppercase tracking-wider text-sm">{successButton === 'add-expense' ? 'Logged!' : 'Log'}</span>
                      </button>
                      {(expenseAmount || expenseNotes) && (
                        <button
                          onClick={clearExpenseForm}
                          className={`px-4 py-4 rounded-2xl font-bold text-sm transition-all press-feedback ${
                            darkMode 
                              ? 'bg-[#1E1B2E] text-gray-400 hover:text-gray-200' 
                              : 'bg-gray-100 text-gray-500 hover:text-gray-700'
                          }`}
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </CandyCard>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <StatBubble darkMode={darkMode}
                  icon={<Receipt className="w-6 h-6" />}
                  label="This Month"
                  value={formatMoney(getTotalExpensesForMonth())}
                  color="orange"
                  pop={popTotal === 'expense-total'}
                  previousValue={getPreviousMonthExpenses()}
                />
                <StatBubble darkMode={darkMode}
                  icon={<Calendar className="w-6 h-6" />}
                  label="Daily Average"
                  value={formatMoney(getTotalExpensesForMonth() / Math.max(new Date().getDate(), 1))}
                  color="blue"
                />
              </div>

              {/* Category Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {EXPENSE_CATEGORIES.map(cat => {
                  const style = CATEGORY_STYLES[cat];
                  const total = getCategoryTotal(cat);
                  return (
                    <div
                      key={cat}
                      className={`card-lift p-4 rounded-2xl border-2 transition-all ${
                        darkMode ? 'border-opacity-30' : ''
                      }`}
                      style={{ 
                        backgroundColor: darkMode ? `${style.color}15` : style.bg, 
                        borderColor: `${style.color}${darkMode ? '40' : '40'}` 
                      }}
                    >
                      <div className="text-3xl mb-2">{style.icon}</div>
                      <p className={`font-bold text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{cat}</p>
                      <p className="text-xl font-black" style={{ color: style.color }}>{formatMoney(total)}</p>
                    </div>
                  );
                })}
              </div>

              {/* Month Filter & Charts */}
              <CandyCard darkMode={darkMode}>
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <h3 className={`text-lg font-bold ${darkMode ? 'text-gray-100' : 'text-gray-700'}`}>Spending Breakdown</h3>
                  <MonthYearSelector
                    month={selectedBudgetMonth}
                    year={selectedBudgetYear}
                    setMonth={setSelectedBudgetMonth}
                    setYear={setSelectedBudgetYear}
                    darkMode={darkMode}
                    variant="purple"
                  />
                </div>

                {getBudgetPieData().length > 0 ? (
                  <ResponsiveContainer width="100%" height={250}>
                    <RechartsPie>
                      <Pie
                        data={getBudgetPieData()}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        innerRadius={50}
                        paddingAngle={5}
                      >
                        {getBudgetPieData().map((entry) => (
                          <Cell key={entry.name} fill={CATEGORY_STYLES[entry.name]?.color || '#999'} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatMoney(value)} />
                      <Legend />
                    </RechartsPie>
                  </ResponsiveContainer>
                ) : (
                  <EmptyState darkMode={darkMode} />
                )}
              </CandyCard>

              {/* Recent Expenses */}
              <CandyCard darkMode={darkMode}>
                {(() => {
                  const recentExpenses = getRecentExpenses();
                  const itemsPerPage = 15;
                  const totalPages = Math.ceil(recentExpenses.length / itemsPerPage);
                  const startIdx = expensePage * itemsPerPage;
                  const paginatedExpenses = recentExpenses.slice(startIdx, startIdx + itemsPerPage);
                  
                  return (
                    <>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className={`text-lg font-bold ${darkMode ? 'text-gray-100' : 'text-gray-700'}`}>Recent Expenses</h3>
                        {totalPages > 1 && (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setExpensePage(Math.max(0, expensePage - 1))}
                              disabled={expensePage === 0}
                              className={`px-3 py-1 text-sm font-bold rounded-xl transition-all ${
                                expensePage === 0
                                  ? 'opacity-30 cursor-not-allowed'
                                  : 'hover:scale-105 active:scale-95'
                              } ${darkMode ? 'text-purple-400' : 'text-purple-500'}`}
                            >
                              ‹ Prev
                            </button>
                            <span className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                              {expensePage + 1}/{totalPages}
                            </span>
                            <button
                              onClick={() => setExpensePage(Math.min(totalPages - 1, expensePage + 1))}
                              disabled={expensePage >= totalPages - 1}
                              className={`px-3 py-1 text-sm font-bold rounded-xl transition-all ${
                                expensePage >= totalPages - 1
                                  ? 'opacity-30 cursor-not-allowed'
                                  : 'hover:scale-105 active:scale-95'
                              } ${darkMode ? 'text-purple-400' : 'text-purple-500'}`}
                            >
                              Next ›
                            </button>
                          </div>
                        )}
                      </div>
                      {paginatedExpenses.length > 0 ? (
                        <div className="space-y-2 max-h-[500px] overflow-y-auto">
                          {paginatedExpenses.map(exp => {
                            const style = CATEGORY_STYLES[exp.category];
                            return (
                              <div
                                key={exp.id}
                                className={`flex items-center justify-between p-3 rounded-xl border-2 transition-all hover:shadow-md ${
                                  deletingItems.has(exp.id) ? 'delete-animation' : ''
                                } ${newItemId === exp.id ? 'fade-in-up' : ''}`}
                                style={{ 
                                  backgroundColor: darkMode ? `${style.color}15` : style.bg, 
                                  borderColor: `${style.color}30` 
                                }}
                                onTouchStart={(e) => handleLongPressStart(e, 'expense', exp)}
                                onTouchEnd={handleLongPressEnd}
                                onTouchMove={handleLongPressMove}
                                onMouseDown={(e) => handleLongPressStart(e, 'expense', exp)}
                                onMouseUp={handleLongPressEnd}
                                onMouseLeave={handleLongPressEnd}
                              >
                                <div className="flex items-center gap-3">
                                  <span className="text-2xl">{style.icon}</span>
                                  <div>
                                    <p className={`font-bold ${darkMode ? 'text-gray-100' : 'text-gray-700'}`}>{exp.category}</p>
                                    <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{formatDateDisplay(exp.date)}</p>
                                    {exp.notes && (
                                      <p className={`text-xs mt-1 italic ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                        "{exp.notes}"
                                      </p>
                                    )}
                                  </div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className="font-black text-lg" style={{ color: style.color }}>{formatMoney(exp.amount)}</span>
                                  <button
                                    onClick={() => removeExpense(exp.id)}
                                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all touch-target press-feedback ${
                                      darkMode 
                                        ? 'bg-red-900/30 text-red-400 hover:bg-red-900/50 hover:text-red-300' 
                                        : 'bg-white/80 text-red-400 hover:bg-red-100 hover:text-red-600'
                                    }`}
                                  >
                                    <X className="w-5 h-5" />
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <EmptyState darkMode={darkMode} />
                      )}
                    </>
                  );
                })()}
              </CandyCard>

              {/* Recurring Expenses & Bill Reminders */}
              <CandyCard darkMode={darkMode}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-lg font-bold ${darkMode ? 'text-gray-100' : 'text-gray-700'}`}>Recurring Expenses</h3>
                  <div className="flex gap-2">
                    <CandyButton variant="ghost" size="sm" onClick={() => setShowRecurringModal(true)}>
                      <Plus className="w-4 h-4" /> Add
                    </CandyButton>
                    {recurringExpenses.length > 0 && (
                      <CandyButton variant="success" size="sm" onClick={applyRecurringExpenses}>
                        <Zap className="w-4 h-4" /> Apply All
                      </CandyButton>
                    )}
                  </div>
                </div>
                
                {/* Due Soon / Upcoming Bills Section */}
                {getUpcomingBills().length > 0 && (
                  <div className={`mb-4 p-4 rounded-2xl border-2 ${
                    darkMode ? 'bg-amber-900/20 border-amber-500/30' : 'bg-amber-50 border-amber-200'
                  }`}>
                    <h4 className={`text-sm font-bold mb-3 flex items-center gap-2 ${
                      darkMode ? 'text-amber-400' : 'text-amber-600'
                    }`}>
                      <Calendar className="w-4 h-4" /> Due Soon
                    </h4>
                    <div className="space-y-2">
                      {getUpcomingBills().map(bill => (
                        <div key={bill.id} className={`flex items-center justify-between p-2 rounded-xl ${
                          darkMode ? 'bg-[#1E1B2E]' : 'bg-white'
                        }`}>
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{CATEGORY_STYLES[bill.category]?.icon}</span>
                            <div>
                              <p className={`font-bold text-sm ${darkMode ? 'text-gray-100' : 'text-gray-700'}`}>{bill.name}</p>
                              <p className={`text-xs ${
                                bill.isOverdue 
                                  ? 'text-rose-500 font-bold' 
                                  : bill.daysUntilDue <= 3 
                                    ? 'text-amber-500' 
                                    : darkMode ? 'text-gray-500' : 'text-gray-400'
                              }`}>
                                {bill.isOverdue 
                                  ? `⚠️ Overdue by ${Math.abs(bill.daysUntilDue)} days`
                                  : bill.daysUntilDue === 0 
                                    ? '📅 Due today!'
                                    : bill.daysUntilDue === 1
                                      ? '📅 Due tomorrow'
                                      : `📅 Due in ${bill.daysUntilDue} days`
                                }
                              </p>
                            </div>
                          </div>
                          <span className={`font-bold ${darkMode ? 'text-gray-100' : 'text-gray-700'}`}>
                            {formatMoney(bill.amount)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {recurringExpenses.length > 0 ? (
                  <div className="space-y-2">
                    {recurringExpenses.map(rec => {
                      const today = new Date().getDate();
                      const daysUntil = rec.dayOfMonth >= today 
                        ? rec.dayOfMonth - today 
                        : (new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate() - today) + rec.dayOfMonth;
                      
                      return (
                        <div key={rec.id} className={`flex items-center justify-between p-3 rounded-xl ${
                          darkMode ? 'bg-[#1E1B2E]' : 'bg-gray-50'
                        }`}>
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{CATEGORY_STYLES[rec.category]?.icon}</span>
                            <div>
                              <p className={`font-bold ${darkMode ? 'text-gray-100' : 'text-gray-700'}`}>{rec.name}</p>
                              <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                Day {rec.dayOfMonth} • {rec.category}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`font-bold ${darkMode ? 'text-gray-100' : 'text-gray-700'}`}>{formatMoney(rec.amount)}</span>
                            <button onClick={() => removeRecurringExpense(rec.id)} className="text-red-400 hover:text-red-600 press-feedback">
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className={`text-center py-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>No recurring expenses set up</p>
                )}
              </CandyCard>
            </div>
          )}

          {/* CLOCK-IN TAB */}
          {viewMode === 'clockin' && (
            <div className={`space-y-6 tab-content ${swipeDirection === 'left' ? 'slide-left-exit' : swipeDirection === 'right' ? 'slide-right-exit' : 'active'}`}>
              <CandyCard darkMode={darkMode}>
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <h2 className={`text-xl font-black flex items-center gap-2 ${darkMode ? 'text-gray-100' : 'text-gray-700'}`}>
                    <span className="text-2xl">⏰</span> Log Work Hours
                  </h2>
                  <div className="flex items-center gap-2">
                    {/* Same as Yesterday Button */}
                    {getYesterdayWorkLog() && (
                      <button
                        onClick={fillFromYesterday}
                        className={`px-3 py-2 rounded-xl text-xs font-bold transition-all press-feedback ${
                          darkMode 
                            ? 'bg-purple-900/30 text-purple-400 hover:bg-purple-900/50' 
                            : 'bg-purple-50 text-purple-600 hover:bg-purple-100'
                        }`}
                      >
                        📋 Same as Yesterday
                      </button>
                    )}
                    {/* Mode Toggle */}
                    <div className={`flex rounded-xl overflow-hidden border-2 ${darkMode ? 'border-[#3D3A4E]' : 'border-gray-200'}`}>
                      <button
                        onClick={() => setWorkMode('hours')}
                        className={`px-3 py-2 text-xs font-bold transition-all ${
                          workMode === 'hours'
                            ? 'bg-gradient-to-r from-emerald-400 to-teal-400 text-white'
                            : darkMode ? 'text-gray-400 hover:bg-white/5' : 'text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        Hours
                      </button>
                      <button
                        onClick={() => setWorkMode('clock')}
                        className={`px-3 py-2 text-xs font-bold transition-all ${
                          workMode === 'clock'
                            ? 'bg-gradient-to-r from-emerald-400 to-teal-400 text-white'
                            : darkMode ? 'text-gray-400 hover:bg-white/5' : 'text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        Clock In/Out
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  {workMode === 'hours' ? (
                    <div>
                      <label className={`block text-sm font-bold mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Hours</label>
                      <input
                        ref={workHoursRef}
                        id="work-hours"
                        type="number"
                        placeholder="8"
                        value={workHours}
                        onChange={(e) => setWorkHours(e.target.value)}
                        onKeyDown={(e) => (e.key === 'Enter' || e.keyCode === 13) && addWorkLog()}
                        className={`candy-input ${darkMode ? 'candy-input-dark' : 'candy-input-light'} ${shakeField === 'work-hours' ? 'shake border-red-400' : ''}`}
                      />
                    </div>
                  ) : (
                    <>
                      <div>
                        <label className={`block text-sm font-bold mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Clock In</label>
                        <CandyTimeInput
                          darkMode={darkMode}
                          value={clockInTime}
                          onChange={(e) => setClockInTime(e.target.value)}
                          className={shakeField === 'clock-in' ? 'shake' : ''}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-bold mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Clock Out</label>
                        <CandyTimeInput
                          darkMode={darkMode}
                          value={clockOutTime}
                          onChange={(e) => setClockOutTime(e.target.value)}
                          className={shakeField === 'clock-out' ? 'shake' : ''}
                        />
                        {clockInTime && clockOutTime && (
                          <p className={`text-xs mt-1 font-medium ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                            = {calculateHoursFromTimes(clockInTime, clockOutTime)}h
                          </p>
                        )}
                      </div>
                    </>
                  )}
                  <div>
                    {/* Job Input Mode Toggle */}
                    <div className="flex items-center justify-between mb-2">
                      <div className={`flex rounded-xl overflow-hidden border-2 ${darkMode ? 'border-[#3D3A4E]' : 'border-gray-200'}`}>
                        <button
                          onClick={() => setJobInputMode('manual')}
                          className={`px-3 py-1 text-xs font-bold transition-all ${
                            jobInputMode === 'manual'
                              ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white'
                              : darkMode ? 'text-gray-400 hover:bg-white/5' : 'text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          Job/Client
                        </button>
                        <button
                          onClick={() => setJobInputMode('quick')}
                          className={`px-3 py-1 text-xs font-bold transition-all ${
                            jobInputMode === 'quick'
                              ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white'
                              : darkMode ? 'text-gray-400 hover:bg-white/5' : 'text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          Quick Jobs
                        </button>
                      </div>
                    </div>
                    
                    {/* Manual Input Mode */}
                    {jobInputMode === 'manual' && (
                      <>
                        <input
                          id="work-job"
                          placeholder="e.g., Freelance"
                          value={workJob}
                          onChange={(e) => setWorkJob(e.target.value)}
                          list="job-names"
                          className={`candy-input ${darkMode ? 'candy-input-dark' : 'candy-input-light'} ${shakeField === 'work-job' ? 'shake border-red-400' : ''}`}
                        />
                        <datalist id="job-names">
                          {getUniqueJobs().map(j => <option key={j} value={j} />)}
                        </datalist>
                      </>
                    )}
                    
                    {/* Quick Jobs Mode */}
                    {jobInputMode === 'quick' && (
                      <div className="flex gap-2">
                        {quickJobs.map((job, idx) => (
                          <div key={idx} className="flex-1 relative group">
                            {editingQuickJob === idx ? (
                              <input
                                autoFocus
                                type="text"
                                value={job}
                                onChange={(e) => {
                                  const newJobs = [...quickJobs];
                                  newJobs[idx] = e.target.value;
                                  setQuickJobs(newJobs);
                                }}
                                onBlur={() => setEditingQuickJob(null)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') setEditingQuickJob(null);
                                }}
                                className={`w-full px-2 py-2.5 text-xs font-bold rounded-xl outline-none text-center ${
                                  darkMode 
                                    ? 'bg-[#252233] text-gray-100 border-2 border-purple-500' 
                                    : 'bg-white text-gray-700 border-2 border-purple-400'
                                }`}
                              />
                            ) : (
                              <button
                                onClick={() => setWorkJob(job)}
                                onTouchEnd={(e) => {
                                  e.preventDefault();
                                  setWorkJob(job);
                                }}
                                onDoubleClick={() => setEditingQuickJob(idx)}
                                className={`w-full px-2 py-2.5 text-xs font-bold rounded-xl transition-all press-feedback ${
                                  workJob === job
                                    ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-lg scale-105'
                                    : darkMode 
                                      ? 'bg-[#252233] text-gray-300 hover:bg-[#2D2A3E] border-2 border-[#3D3A4E]'
                                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-2 border-gray-200'
                                }`}
                              >
                                {job}
                              </button>
                            )}
                            {editingQuickJob !== idx && (
                              <div 
                                onClick={() => setEditingQuickJob(idx)}
                                className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity ${
                                  darkMode ? 'bg-purple-600 text-white' : 'bg-purple-400 text-white'
                                }`}
                              >
                                <Edit3 className="w-2.5 h-2.5" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {jobInputMode === 'quick' && workJob && (
                      <div className={`mt-2 text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        Selected: <span className={`font-bold ${darkMode ? 'text-purple-400' : 'text-purple-500'}`}>{workJob}</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className={`block text-sm font-bold mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Description</label>
                    <input
                      id="work-desc"
                      placeholder="What did you do?"
                      value={workDescription}
                      onChange={(e) => setWorkDescription(e.target.value)}
                      className={`candy-input ${darkMode ? 'candy-input-dark' : 'candy-input-light'} ${shakeField === 'work-desc' ? 'shake border-red-400' : ''}`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-bold mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Hourly Rate ($)</label>
                    <input
                      type="number"
                      placeholder={jobRates[workJob] || '20'}
                      value={workHourlyRate}
                      onChange={(e) => setWorkHourlyRate(e.target.value)}
                      className={`candy-input ${darkMode ? 'candy-input-dark' : 'candy-input-light'}`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-bold mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Date</label>
                    <CandyDateInput darkMode={darkMode}
                      value={workDate}
                      onChange={(e) => setWorkDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mt-4 flex justify-end gap-2">
                  {(workHours || workJob || workDescription || clockInTime || clockOutTime) && (
                    <CandyButton variant="ghost" size="sm" onClick={clearWorkForm} className="press-feedback">
                      <X className="w-4 h-4" /> Clear
                    </CandyButton>
                  )}
                  <CandyButton 
                    variant="success" 
                    onClick={addWorkLog}
                    className={`btn-press ${successButton === 'add-work' ? 'success-flash' : ''}`}
                  >
                    {successButton === 'add-work' ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    {successButton === 'add-work' ? 'Logged!' : 'Log Hours'}
                  </CandyButton>
                </div>
              </CandyCard>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <StatBubble darkMode={darkMode}
                  icon={<Clock className="w-6 h-6" />}
                  label="Hours This Month"
                  value={`${getTotalHoursThisMonth()}h`}
                  color="blue"
                  pop={popTotal === 'work-total'}
                />
                <StatBubble darkMode={darkMode}
                  icon={<DollarSign className="w-6 h-6" />}
                  label="Earnings"
                  value={formatMoney(getTotalEarningsThisMonth())}
                  color="green"
                />
                <StatBubble darkMode={darkMode}
                  icon={<Briefcase className="w-6 h-6" />}
                  label="Jobs"
                  value={getUniqueJobs().length}
                  color="purple"
                />
              </div>

              <CandyCard darkMode={darkMode}>
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <h3 className={`text-lg font-bold ${darkMode ? 'text-gray-100' : 'text-gray-700'}`}>Work History</h3>
                  <MonthYearSelector
                    month={selectedWorkMonth}
                    year={selectedWorkYear}
                    setMonth={setSelectedWorkMonth}
                    setYear={setSelectedWorkYear}
                    darkMode={darkMode}
                    variant="purple"
                  />
                </div>

                {getUniqueJobs().length === 0 ? (
                  <EmptyState darkMode={darkMode} />
                ) : (
                  <div className="space-y-3">
                    {getUniqueJobs().map(job => {
                      const hours = getJobHoursThisMonth(job);
                      const logs = getJobLogs(job);
                      const isExpanded = expandedJobs[job];
                      const earnings = logs.reduce((s, l) => s + (l.hours * (l.hourlyRate || 0)), 0);
                      
                      // Calculate unpaid totals
                      const lastPaidDate = jobLastPaidDates[job];
                      const unpaidLogs = lastPaidDate 
                        ? logs.filter(l => l.date > lastPaidDate)
                        : logs;
                      const unpaidHours = unpaidLogs.reduce((s, l) => s + l.hours, 0);
                      const unpaidEarnings = unpaidLogs.reduce((s, l) => s + (l.hours * (l.hourlyRate || 0)), 0);

                      if (logs.length === 0) return null;

                      return (
                        <div key={job} className={`border-2 rounded-2xl overflow-hidden ${
                          darkMode ? 'border-[#3D3A4E] bg-[#252233]' : 'border-gray-100 bg-white'
                        }`}>
                          <div
                            className={`flex items-center justify-between p-4 cursor-pointer transition-colors press-feedback ${
                              darkMode ? 'hover:bg-white/5' : 'hover:bg-gray-50'
                            }`}
                            onClick={() => setExpandedJobs({ ...expandedJobs, [job]: !isExpanded })}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 ${
                                isExpanded ? 'rotate-90' : ''
                              } ${
                                isExpanded 
                                  ? (darkMode ? 'bg-blue-900/30' : 'bg-blue-100')
                                  : (darkMode ? 'bg-[#2D2A3E]' : 'bg-gray-100')
                              }`}>
                                <ChevronRight className={`w-5 h-5 ${isExpanded ? 'text-blue-500' : (darkMode ? 'text-gray-500' : 'text-gray-400')}`} />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <p className={`font-bold ${darkMode ? 'text-gray-100' : 'text-gray-700'}`}>{job}</p>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedJobForPay(job);
                                      setPayDateInput(jobLastPaidDates[job] || getLocalDateString());
                                      setShowPayDateModal(true);
                                    }}
                                    className={`p-1 rounded-lg transition-colors ${darkMode ? 'hover:bg-white/10' : 'hover:bg-gray-200'}`}
                                    title="Set last paid date"
                                  >
                                    <span className="text-sm">⚙️</span>
                                  </button>
                                </div>
                                <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                  {logs.length} logs • {hours}h total
                                  {lastPaidDate && (
                                    <span className="ml-2 text-emerald-500">• Paid thru {formatDateDisplay(lastPaidDate)}</span>
                                  )}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-xl font-black text-emerald-500">{formatMoney(earnings)}</span>
                              {lastPaidDate && unpaidEarnings > 0 && (
                                <p className={`text-xs font-medium ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>
                                  {formatMoney(unpaidEarnings)} unpaid
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Smooth Accordion Content */}
                          <div className={`accordion-content ${isExpanded ? 'expanded' : ''}`}>
                            <div>
                              <div className={`border-t ${darkMode ? 'border-[#3D3A4E] bg-[#1E1B2E]/50' : 'border-gray-100 bg-gray-50/50'}`}>
                                {(() => {
                                  const itemsPerPage = 8;
                                  const currentPage = workLogPages[job] || 0;
                                  const totalPages = Math.ceil(logs.length / itemsPerPage);
                                  const startIdx = currentPage * itemsPerPage;
                                  const paginatedLogs = logs.slice(startIdx, startIdx + itemsPerPage);
                                  
                                  return (
                                    <>
                                      {totalPages > 1 && (
                                        <div className={`flex items-center justify-between px-4 py-2 ${darkMode ? 'bg-[#252233]' : 'bg-gray-100'}`}>
                                          <span className={`text-xs font-medium ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                            Showing {startIdx + 1}-{Math.min(startIdx + itemsPerPage, logs.length)} of {logs.length}
                                          </span>
                                          <div className="flex items-center gap-2">
                                            <button
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                setWorkLogPages({ ...workLogPages, [job]: Math.max(0, currentPage - 1) });
                                              }}
                                              disabled={currentPage === 0}
                                              className={`px-2 py-1 text-xs font-bold rounded-lg transition-all ${
                                                currentPage === 0
                                                  ? 'opacity-30 cursor-not-allowed'
                                                  : 'hover:scale-105 active:scale-95'
                                              } ${darkMode ? 'text-purple-400' : 'text-purple-500'}`}
                                            >
                                              ‹ Prev
                                            </button>
                                            <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                              {currentPage + 1}/{totalPages}
                                            </span>
                                            <button
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                setWorkLogPages({ ...workLogPages, [job]: Math.min(totalPages - 1, currentPage + 1) });
                                              }}
                                              disabled={currentPage >= totalPages - 1}
                                              className={`px-2 py-1 text-xs font-bold rounded-lg transition-all ${
                                                currentPage >= totalPages - 1
                                                  ? 'opacity-30 cursor-not-allowed'
                                                  : 'hover:scale-105 active:scale-95'
                                              } ${darkMode ? 'text-purple-400' : 'text-purple-500'}`}
                                            >
                                              Next ›
                                            </button>
                                          </div>
                                        </div>
                                      )}
                                      {paginatedLogs.map(log => {
                                        const isPaid = lastPaidDate && log.date <= lastPaidDate;
                                        return (
                                        <div 
                                          key={log.id} 
                                          className={`flex items-center justify-between px-4 py-3 border-b last:border-0 ${
                                            deletingItems.has(log.id) ? 'delete-animation' : ''
                                          } ${darkMode ? 'border-[#3D3A4E]' : 'border-gray-100'}`}
                                          onTouchStart={(e) => handleLongPressStart(e, 'worklog', log)}
                                          onTouchEnd={handleLongPressEnd}
                                          onTouchMove={handleLongPressMove}
                                          onMouseDown={(e) => handleLongPressStart(e, 'worklog', log)}
                                          onMouseUp={handleLongPressEnd}
                                          onMouseLeave={handleLongPressEnd}
                                        >
                                          <div className="flex items-center gap-2">
                                            {isPaid && <div className="paid-indicator" title="Paid" />}
                                            <div>
                                              <p className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{log.description}</p>
                                              <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{formatDateDisplay(log.date)} • {log.hours}h @ ${log.hourlyRate}/hr</p>
                                            </div>
                                          </div>
                                          <div className="flex items-center gap-3">
                                            <span className={`font-bold ${darkMode ? 'text-gray-100' : 'text-gray-700'}`}>{formatMoney(log.hours * (log.hourlyRate || 0))}</span>
                                            <button 
                                              onClick={() => removeWorkLog(log.id)} 
                                              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors touch-target press-feedback ${
                                                darkMode 
                                                  ? 'bg-red-900/30 text-red-400 hover:bg-red-900/50' 
                                                  : 'bg-red-100 text-red-500 hover:bg-red-200'
                                              }`}
                                            >
                                              <X className="w-5 h-5" />
                                            </button>
                                          </div>
                                        </div>
                                        );
                                      })}
                                    </>
                                  );
                                })()}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CandyCard>
            </div>
          )}

          {/* TODOS TAB */}
          {viewMode === 'todos' && (
            <div className={`space-y-6 tab-content ${swipeDirection === 'left' ? 'slide-left-exit' : swipeDirection === 'right' ? 'slide-right-exit' : 'active'}`}>
              <CandyCard darkMode={darkMode}>
                <h2 className={`text-xl font-black mb-4 flex items-center gap-2 ${darkMode ? 'text-gray-100' : 'text-gray-700'}`}>
                  <span className="text-2xl">✨</span> Add Task
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="sm:col-span-2">
                    <label className={`block text-sm font-bold mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>What needs doing?</label>
                    <input
                      ref={todoTextRef}
                      id="todo-text"
                      placeholder="e.g., Finish project proposal"
                      value={todoText}
                      onChange={(e) => setTodoText(e.target.value)}
                      onKeyDown={(e) => (e.key === 'Enter' || e.keyCode === 13) && addTodo()}
                      className={`candy-input ${darkMode ? 'candy-input-dark' : 'candy-input-light'} ${shakeField === 'todo-text' ? 'shake border-red-400' : ''}`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-bold mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Date</label>
                    <CandyDateInput darkMode={darkMode}
                      value={todoDate}
                      onChange={(e) => setTodoDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-bold mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Time (optional)</label>
                    <CandyTimeInput 
                      darkMode={darkMode}
                      value={todoTime}
                      onChange={(e) => setTodoTime(e.target.value)}
                    />
                  </div>
                </div>
                
                {/* Priority & Linked Expense Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                  <div>
                    <label className={`block text-sm font-bold mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Priority</label>
                    <div className={`flex rounded-xl overflow-hidden border-2 ${darkMode ? 'border-[#3D3A4E]' : 'border-gray-200'}`}>
                      {['low', 'medium', 'high'].map((p) => (
                        <button
                          key={p}
                          onClick={() => setTodoPriority(p)}
                          className={`flex-1 px-3 py-2 text-xs font-bold transition-all capitalize ${
                            todoPriority === p
                              ? p === 'high' 
                                ? 'bg-rose-500/20 text-rose-500'
                                : p === 'medium'
                                  ? 'bg-amber-500/20 text-amber-500'
                                  : 'bg-emerald-500/20 text-emerald-500'
                              : darkMode ? 'text-gray-500 hover:bg-white/5' : 'text-gray-400 hover:bg-gray-50'
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-end gap-2">
                  {(todoText || todoTime || todoPriority !== 'medium') && (
                    <CandyButton variant="ghost" size="sm" onClick={clearTodoForm} className="press-feedback">
                      <X className="w-4 h-4" /> Clear
                    </CandyButton>
                  )}
                  <CandyButton 
                    onClick={addTodo}
                    className={`btn-press ${successButton === 'add-todo' ? 'success-flash' : ''}`}
                  >
                    {successButton === 'add-todo' ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    {successButton === 'add-todo' ? 'Added!' : 'Add Task'}
                  </CandyButton>
                </div>
              </CandyCard>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <StatBubble darkMode={darkMode} icon={<ListTodo className="w-6 h-6" />} label="Total" value={getTodoStats().total} color="blue" />
                <StatBubble darkMode={darkMode} icon={<Check className="w-6 h-6" />} label="Done" value={getTodoStats().completed} color="green" />
                <StatBubble darkMode={darkMode} icon={<Clock className="w-6 h-6" />} label="Pending" value={getTodoStats().pending} color="orange" />
                <StatBubble darkMode={darkMode} icon={<Target className="w-6 h-6" />} label="Overdue" value={getTodoStats().overdue} color="pink" />
              </div>

              {/* Archive Controls */}
              <div className="flex flex-wrap gap-2">
                {todos.some(t => t.completed) && (
                  <CandyButton variant="ghost" size="sm" onClick={archiveAllCompleted}>
                    <Archive className="w-4 h-4" /> Archive Completed
                  </CandyButton>
                )}
                {archivedTodos.length > 0 && (
                  <CandyButton variant="ghost" size="sm" onClick={() => { setShowArchives(!showArchives); setArchivePage(0); }}>
                    <Calendar className="w-4 h-4" />
                    {showArchives ? 'Hide' : 'View'} Archives ({archivedTodos.length})
                  </CandyButton>
                )}
              </div>

              {/* Task List */}
              <CandyCard darkMode={darkMode}>
                <h3 className={`text-lg font-bold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-700'}`}>Your Tasks</h3>
                {todos.length === 0 ? (
                  <EmptyState darkMode={darkMode} />
                ) : (
                  <div className="space-y-3">
                    {getTodosByDate().map(todo => {
                      const isOverdue = !todo.completed && todo.date < getLocalDateString();
                      return (
                        <div
                          key={todo.id}
                          className={`p-4 rounded-2xl border-2 transition-all ${
                            deletingItems.has(todo.id) ? 'delete-animation' : ''
                          } ${
                            todo.completed
                              ? darkMode ? 'bg-emerald-900/20 border-emerald-700' : 'bg-emerald-50 border-emerald-200'
                              : isOverdue
                                ? darkMode ? 'bg-red-900/20 border-red-700' : 'bg-red-50 border-red-200'
                                : darkMode ? 'bg-[#252233] border-[#3D3A4E]' : 'bg-white border-gray-100'
                          } ${newItemId === todo.id ? 'fade-in-up' : ''}`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="checkbox-sparkles relative">
                              <button
                                onClick={(e) => {
                                  // Add sparkle effect
                                  const container = e.currentTarget.parentElement;
                                  if (!todo.completed) {
                                    container.classList.add('sparkle-active');
                                    setTimeout(() => container.classList.remove('sparkle-active'), 500);
                                  }
                                  toggleTodo(todo.id);
                                }}
                                className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all flex-shrink-0 touch-target-sm press-feedback ${
                                  todo.completed
                                    ? 'bg-emerald-500 text-white checkbox-burst'
                                    : darkMode 
                                      ? 'border-2 border-gray-600 hover:border-emerald-400 hover:bg-emerald-900/20'
                                      : 'border-2 border-gray-300 hover:border-emerald-400 hover:bg-emerald-50'
                                }`}
                              >
                                {todo.completed && <Check className="w-5 h-5 check-pop" />}
                              </button>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                {/* Priority indicator - subtle dot */}
                                {todo.priority && todo.priority !== 'medium' && (
                                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
                                    todo.priority === 'high' ? 'bg-rose-400' : 'bg-emerald-400'
                                  }`} title={`${todo.priority} priority`} />
                                )}
                                <p className={`font-bold transition-all duration-300 ${
                                  todo.completed 
                                    ? darkMode ? 'text-gray-500 line-through' : 'text-gray-400 line-through' 
                                    : darkMode ? 'text-gray-100' : 'text-gray-700'
                                }`}>
                                  {todo.text}
                                </p>
                              </div>
                              <div className={`text-sm mt-1 flex flex-wrap items-center gap-x-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                <span>{formatDateDisplay(todo.date)}</span>
                                {todo.time && <span>at {todo.time}</span>}
                                {isOverdue && <span className="text-red-500 font-bold">• Overdue!</span>}
                              </div>

                              {/* Subtasks */}
                              {todo.subtasks.length > 0 && (
                                <div className={`mt-3 pl-4 border-l-2 space-y-2 ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                                  {todo.subtasks.map(sub => (
                                    <div key={sub.id} className="flex items-center gap-2">
                                      <div className="checkbox-sparkles relative">
                                        <button
                                          onClick={(e) => {
                                            const container = e.currentTarget.parentElement;
                                            if (!sub.completed) {
                                              container.classList.add('sparkle-active');
                                              setTimeout(() => container.classList.remove('sparkle-active'), 500);
                                            }
                                            toggleSubtask(todo.id, sub.id);
                                          }}
                                          className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all press-feedback ${
                                            sub.completed 
                                              ? 'bg-emerald-400 text-white checkbox-burst' 
                                              : darkMode 
                                                ? 'border-2 border-gray-600 hover:border-emerald-400'
                                                : 'border-2 border-gray-300 hover:border-emerald-400'
                                          }`}
                                        >
                                          {sub.completed && <Check className="w-3 h-3 check-pop" />}
                                        </button>
                                      </div>
                                      <span className={`text-sm transition-all duration-300 ${
                                        sub.completed 
                                          ? darkMode ? 'text-gray-500 line-through' : 'text-gray-400 line-through' 
                                          : darkMode ? 'text-gray-300' : 'text-gray-600'
                                      }`}>{sub.text}</span>
                                      <button 
                                        onClick={() => removeSubtask(todo.id, sub.id)} 
                                        className={`ml-auto p-1 rounded transition-colors ${
                                          darkMode ? 'text-gray-600 hover:text-red-400' : 'text-gray-300 hover:text-red-400'
                                        }`}
                                      >
                                        <X className="w-4 h-4" />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {/* Add subtask */}
                              {addingSubtaskFor === todo.id ? (
                                <div className="mt-3 flex gap-2">
                                  <input
                                    placeholder="Subtask..."
                                    value={subtaskText}
                                    onChange={(e) => setSubtaskText(e.target.value)}
                                    onKeyDown={(e) => (e.key === 'Enter' || e.keyCode === 13) && addSubtask(todo.id)}
                                    className={`flex-1 text-sm py-2 px-3 rounded-xl outline-none ${
                                      darkMode ? 'bg-[#1E1B2E] text-gray-100 placeholder-gray-500' : 'bg-gray-100 text-gray-700 placeholder-gray-400'
                                    }`}
                                  />
                                  <CandyButton size="sm" onClick={() => addSubtask(todo.id)}>Add</CandyButton>
                                  <CandyButton variant="ghost" size="sm" onClick={() => setAddingSubtaskFor(null)}>Cancel</CandyButton>
                                </div>
                              ) : (
                                <button
                                  onClick={() => setAddingSubtaskFor(todo.id)}
                                  className="mt-2 text-sm text-gray-400 hover:text-pink-500 transition-colors"
                                >
                                  + Add subtask
                                </button>
                              )}
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2">
                              <button
                                onClick={() => removeTodo(todo.id)}
                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors touch-target press-feedback ${
                                  darkMode 
                                    ? 'bg-red-900/30 text-red-400 hover:bg-red-900/50' 
                                    : 'bg-red-100 text-red-500 hover:bg-red-200'
                                }`}
                              >
                                <X className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CandyCard>

              {/* Archives - Flat List with Pagination */}
              {showArchives && archivedTodos.length > 0 && (
                <CandyCard darkMode={darkMode}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`text-lg font-bold ${darkMode ? 'text-gray-100' : 'text-gray-700'}`}>📁 Archived Tasks</h3>
                    {archivedTodos.length > 50 && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setArchivePage(Math.max(0, archivePage - 1))}
                          disabled={archivePage === 0}
                          className={`px-2 py-1 text-sm font-bold rounded-lg ${archivePage === 0 ? 'opacity-30' : ''} ${darkMode ? 'text-purple-400' : 'text-purple-500'}`}
                        >‹ Prev</button>
                        <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                          {archivePage + 1}/{Math.ceil(archivedTodos.length / 50)}
                        </span>
                        <button
                          onClick={() => setArchivePage(Math.min(Math.ceil(archivedTodos.length / 50) - 1, archivePage + 1))}
                          disabled={archivePage >= Math.ceil(archivedTodos.length / 50) - 1}
                          className={`px-2 py-1 text-sm font-bold rounded-lg ${archivePage >= Math.ceil(archivedTodos.length / 50) - 1 ? 'opacity-30' : ''} ${darkMode ? 'text-purple-400' : 'text-purple-500'}`}
                        >Next ›</button>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    {archivedTodos.slice(archivePage * 50, (archivePage + 1) * 50).map(todo => (
                      <div key={todo.id} className={`flex items-center gap-2 p-2 rounded-xl text-sm ${darkMode ? 'bg-[#1E1B2E]' : 'bg-gray-50'}`}>
                        <span className={todo.completed ? 'text-emerald-500' : 'text-gray-400'}>
                          {todo.completed ? '✅' : '⬜'}
                        </span>
                        <span className={`flex-1 truncate ${todo.completed ? (darkMode ? 'text-gray-400' : 'text-gray-600') : (darkMode ? 'text-gray-500' : 'text-gray-400')}`}>
                          {todo.text}
                        </span>
                        <span className={`text-xs ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                          {formatDateDisplay(todo.date)}
                        </span>
                      </div>
                    ))}
                  </div>
                </CandyCard>
              )}
            </div>
          )}

          {/* TRENDS TAB */}
          {viewMode === 'trends' && (
            <div className={`space-y-6 tab-content ${swipeDirection === 'left' ? 'slide-left-exit' : swipeDirection === 'right' ? 'slide-right-exit' : 'active'}`}>
              {/* Date Range Selector */}
              <CandyCard darkMode={darkMode}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className={`text-xl font-black flex items-center gap-2 ${darkMode ? 'text-gray-100' : 'text-gray-700'}`}>
                    <span className="text-2xl">📊</span> Analytics Period
                  </h2>
                  <div className="flex items-center gap-2">
                    {/* CSV Export Button */}
                    <button
                      onClick={() => {
                        // Generate CSV data
                        const data = getTrendsData();
                        const hoursData = getHoursWorkedData();
                        let csv = 'Month,Income,Expenses,Net,Hours Worked\n';
                        data.forEach((row, idx) => {
                          const hours = hoursData[idx]?.hours || 0;
                          csv += `${row.name},${row.income},${row.expenses},${row.net},${hours}\n`;
                        });
                        csv += `\nTotal Income,${data.reduce((s,r) => s + r.income, 0)}\n`;
                        csv += `Total Expenses,${data.reduce((s,r) => s + r.expenses, 0)}\n`;
                        csv += `Net Total,${data.reduce((s,r) => s + r.net, 0)}\n`;
                        csv += `Total Hours,${hoursData.reduce((s,r) => s + r.hours, 0)}\n`;
                        
                        // Show modal with CSV data (iOS compatible)
                        setAnalyticsExportData(csv);
                        setShowAnalyticsExport(true);
                      }}
                      className={`p-3 rounded-xl transition-all hover:scale-105 active:scale-95 ${
                        darkMode 
                          ? 'bg-purple-900/30 text-purple-400 hover:bg-purple-900/50' 
                          : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                      }`}
                      title="Export Analytics to CSV"
                    >
                      <Printer className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <div>
                    <label className={`block text-sm font-bold mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>From</label>
                    <MonthYearSelector
                      month={trendsStartMonth.month}
                      year={trendsStartMonth.year}
                      setMonth={(m) => setTrendsStartMonth({ ...trendsStartMonth, month: m })}
                      setYear={(y) => setTrendsStartMonth({ ...trendsStartMonth, year: y })}
                      variant="purple"
                      darkMode={darkMode}
                      
                    />
                  </div>
                  <span className="text-gray-400 font-bold mt-6">→</span>
                  <div>
                    <label className={`block text-sm font-bold mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>To</label>
                    <MonthYearSelector
                      month={trendsEndMonth.month}
                      year={trendsEndMonth.year}
                      setMonth={(m) => setTrendsEndMonth({ ...trendsEndMonth, month: m })}
                      setYear={(y) => setTrendsEndMonth({ ...trendsEndMonth, year: y })}
                      variant="purple"
                      darkMode={darkMode}
                      
                    />
                  </div>
                </div>
              </CandyCard>

              {/* Net Worth Dashboard */}
              <CandyCard darkMode={darkMode}>
                <h2 className={`text-xl font-black mb-4 flex items-center gap-2 ${darkMode ? 'text-gray-100' : 'text-gray-700'}`}>
                  <span className="text-2xl">💎</span> Net Worth
                </h2>
                
                {/* Net Worth Summary */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
                  <div className={`p-4 rounded-2xl text-center ${darkMode ? 'bg-emerald-900/20 border-2 border-emerald-500/30' : 'bg-emerald-50 border-2 border-emerald-200'}`}>
                    <p className={`text-xs font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Checking</p>
                    <AnimatedNumber value={getCurrentNetWorth().checking} prefix="$" className="text-xl font-bold text-emerald-500" />
                  </div>
                  <div className={`p-4 rounded-2xl text-center ${darkMode ? 'bg-blue-900/20 border-2 border-blue-500/30' : 'bg-blue-50 border-2 border-blue-200'}`}>
                    <p className={`text-xs font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Investments</p>
                    <AnimatedNumber value={getCurrentNetWorth().investments} prefix="$" className="text-xl font-bold text-blue-500" />
                  </div>
                  <div className={`p-4 rounded-2xl text-center ${darkMode ? 'bg-purple-900/20 border-2 border-purple-500/30' : 'bg-purple-50 border-2 border-purple-200'}`}>
                    <p className={`text-xs font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Assets</p>
                    <AnimatedNumber value={getCurrentNetWorth().totalAssets} prefix="$" className="text-xl font-bold text-purple-500" />
                  </div>
                  <div className={`p-4 rounded-2xl text-center ${darkMode ? 'bg-rose-900/20 border-2 border-rose-500/30' : 'bg-rose-50 border-2 border-rose-200'}`}>
                    <p className={`text-xs font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Debt</p>
                    <AnimatedNumber value={getCurrentNetWorth().debt} prefix="-$" className="text-xl font-bold text-rose-500" />
                  </div>
                  <div className={`p-4 rounded-2xl text-center col-span-2 md:col-span-1 ${
                    getCurrentNetWorth().netWorth >= 0 
                      ? (darkMode ? 'bg-gradient-to-br from-emerald-900/30 to-teal-900/30 border-2 border-emerald-500/50' : 'bg-gradient-to-br from-emerald-100 to-teal-100 border-2 border-emerald-300')
                      : (darkMode ? 'bg-gradient-to-br from-rose-900/30 to-pink-900/30 border-2 border-rose-500/50' : 'bg-gradient-to-br from-rose-100 to-pink-100 border-2 border-rose-300')
                  }`}>
                    <p className={`text-xs font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Net Worth</p>
                    <AnimatedNumber 
                      value={Math.abs(getCurrentNetWorth().netWorth)} 
                      prefix={getCurrentNetWorth().netWorth >= 0 ? '$' : '-$'} 
                      className={`text-2xl font-black ${getCurrentNetWorth().netWorth >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}
                    />
                  </div>
                </div>
                
                {/* Net Worth Chart */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className={`text-sm font-bold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Monthly Net Worth Trend</h3>
                    {getMonthlyNetWorth().length > 0 && (
                      <button
                        onClick={() => setFullscreenChart('networth')}
                        className={`fullscreen-btn p-1.5 rounded-lg ${darkMode ? 'bg-purple-500/20' : 'bg-purple-100'}`}
                        title="View fullscreen"
                      >
                        <Maximize2 className={`w-3.5 h-3.5 ${darkMode ? 'text-purple-400' : 'text-purple-500'}`} />
                      </button>
                    )}
                  </div>
                  {getMonthlyNetWorth().length > 0 ? (
                    <ResponsiveContainer width="100%" height={250}>
                      <AreaChart data={getMonthlyNetWorth()}>
                        <defs>
                          <linearGradient id="netWorthGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="assetsGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#3D3A4E' : '#E8E4EE'} />
                        <XAxis dataKey="label" tick={{ fill: darkMode ? '#9CA3AF' : '#6B6789', fontSize: 11 }} />
                        <YAxis tick={{ fill: darkMode ? '#9CA3AF' : '#6B6789', fontSize: 11 }} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
                        <Tooltip 
                          formatter={(value, name) => [formatMoney(value), name === 'netWorth' ? 'Net Worth' : name === 'investments' ? 'Investments' : name === 'checking' ? 'Checking' : 'Debt']}
                          contentStyle={{ 
                            backgroundColor: darkMode ? '#252233' : '#fff',
                            border: `2px solid ${darkMode ? '#3D3A4E' : '#E8E4EE'}`,
                            borderRadius: '12px'
                          }}
                        />
                        <Area type="monotone" dataKey="netWorth" stroke="#10B981" fill="url(#netWorthGradient)" strokeWidth={3} name="netWorth" />
                      </AreaChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className={`text-center py-8 rounded-2xl ${darkMode ? 'bg-[#1E1B2E]' : 'bg-gray-50'}`}>
                      <span className="text-3xl mb-2 block">📊</span>
                      <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Add investments or accounts to see your net worth trend</p>
                    </div>
                  )}
                </div>
                
                {/* Asset Breakdown Bar */}
                {getCurrentNetWorth().totalAssets > 0 && (
                  <div className="mt-4">
                    <h3 className={`text-sm font-bold mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Asset Breakdown</h3>
                    <div className="h-4 rounded-full overflow-hidden flex">
                      {getCurrentNetWorth().checking > 0 && (
                        <div 
                          className="bg-emerald-500 h-full" 
                          style={{ width: `${(getCurrentNetWorth().checking / getCurrentNetWorth().totalAssets) * 100}%` }}
                          title={`Checking: ${formatMoney(getCurrentNetWorth().checking)}`}
                        />
                      )}
                      {getCurrentNetWorth().investments > 0 && (
                        <div 
                          className="bg-blue-500 h-full" 
                          style={{ width: `${(getCurrentNetWorth().investments / getCurrentNetWorth().totalAssets) * 100}%` }}
                          title={`Investments: ${formatMoney(getCurrentNetWorth().investments)}`}
                        />
                      )}
                    </div>
                    <div className="flex gap-4 mt-2 text-xs">
                      <span className="flex items-center gap-1">
                        <span className="w-3 h-3 rounded bg-emerald-500"></span>
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Checking ({((getCurrentNetWorth().checking / getCurrentNetWorth().totalAssets) * 100).toFixed(0)}%)</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-3 h-3 rounded bg-blue-500"></span>
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Investments ({((getCurrentNetWorth().investments / getCurrentNetWorth().totalAssets) * 100).toFixed(0)}%)</span>
                      </span>
                    </div>
                  </div>
                )}
              </CandyCard>

              {/* Smart Insights */}
              <CandyCard darkMode={darkMode} className="overflow-hidden chart-animate">
                <div 
                  className="flex items-center justify-between mb-4 cursor-pointer"
                  onClick={() => setInsightSet(prev => prev === 0 ? 1 : 0)}
                >
                  <h2 className={`text-xl font-black flex items-center gap-2 ${darkMode ? 'text-gray-100' : 'text-gray-700'}`}>
                    <span className="text-2xl">🧠</span> Smart Insights
                  </h2>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className={`w-2 h-2 rounded-full transition-all ${insightSet === 0 ? 'bg-purple-500' : darkMode ? 'bg-gray-600' : 'bg-gray-300'}`} />
                      <div className={`w-2 h-2 rounded-full transition-all ${insightSet === 1 ? 'bg-purple-500' : darkMode ? 'bg-gray-600' : 'bg-gray-300'}`} />
                    </div>
                    <span className={`text-xs font-medium px-3 py-1 rounded-full purple-glow-border ${
                      darkMode ? 'bg-purple-900/30 text-purple-400' : 'bg-purple-100 text-purple-600'
                    }`}>
                      AI-Powered
                    </span>
                  </div>
                </div>
                
                {currentInsights.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {currentInsights.map((insight, idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-2xl border-2 transition-all hover:scale-[1.02] ${
                          insight.type === 'positive'
                            ? darkMode 
                              ? 'bg-emerald-900/20 border-emerald-500/30' 
                              : 'bg-emerald-50 border-emerald-200'
                            : insight.type === 'warning'
                              ? darkMode
                                ? 'bg-amber-900/20 border-amber-500/30'
                                : 'bg-amber-50 border-amber-200'
                              : darkMode
                                ? 'bg-[#1E1B2E] border-[#3D3A4E]'
                                : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">{insight.icon}</span>
                          <div className="flex-1 min-w-0">
                            <h4 className={`font-bold text-sm ${
                              insight.type === 'positive'
                                ? 'text-emerald-600 dark:text-emerald-400'
                                : insight.type === 'warning'
                                  ? 'text-amber-600 dark:text-amber-400'
                                  : darkMode ? 'text-gray-200' : 'text-gray-700'
                            }`}>
                              {insight.title}
                            </h4>
                            <p className={`text-sm mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                              {insight.message}
                            </p>
                            <p className={`text-xs mt-2 font-medium ${
                              insight.type === 'positive'
                                ? 'text-emerald-500'
                                : insight.type === 'warning'
                                  ? 'text-amber-500'
                                  : darkMode ? 'text-gray-500' : 'text-gray-400'
                            }`}>
                              {insight.detail}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={`text-center py-8 rounded-2xl ${darkMode ? 'bg-[#1E1B2E]' : 'bg-gray-50'}`}>
                    <span className="text-4xl mb-3 block">📊</span>
                    <p className={`font-bold ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Not enough data yet</p>
                    <p className={`text-sm mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                      Keep tracking your income and expenses to unlock insights!
                    </p>
                  </div>
                )}
                
                {/* Summary Stats Row */}
                {(expenses.length > 0 || oneTimeIncomes.length > 0) && (
                  <div className={`mt-4 pt-4 border-t-2 ${darkMode ? 'border-[#3D3A4E]' : 'border-gray-100'}`}>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {(() => {
                        const now = new Date();
                        const currentMonth = now.getMonth();
                        const currentYear = now.getFullYear();
                        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
                        const daysElapsed = now.getDate();
                        
                        const thisMonthExpenses = expenses.filter(exp => {
                          const parts = exp.date.split('-');
                          return parseInt(parts[1]) - 1 === currentMonth && parseInt(parts[0]) === currentYear;
                        }).reduce((sum, e) => sum + e.amount, 0);
                        
                        const thisMonthIncome = oneTimeIncomes.filter(inc => {
                          const parts = inc.date.split('-');
                          return parseInt(parts[1]) - 1 === currentMonth && parseInt(parts[0]) === currentYear;
                        }).reduce((sum, i) => sum + i.amount, 0);
                        
                        const netIncome = thisMonthIncome - thisMonthExpenses;
                        const savingsRate = thisMonthIncome > 0 ? (netIncome / thisMonthIncome) * 100 : 0;
                        const dailyAvg = thisMonthExpenses / Math.max(daysElapsed, 1);
                        const projected = dailyAvg * daysInMonth;
                        
                        return (
                          <>
                            <div className={`p-3 rounded-xl text-center ${darkMode ? 'bg-emerald-900/20' : 'bg-emerald-50'}`}>
                              <p className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Income</p>
                              <p className="text-lg font-bold text-emerald-500">{formatMoney(thisMonthIncome)}</p>
                            </div>
                            <div className={`p-3 rounded-xl text-center ${darkMode ? 'bg-rose-900/20' : 'bg-rose-50'}`}>
                              <p className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Expenses</p>
                              <p className="text-lg font-bold text-rose-500">{formatMoney(thisMonthExpenses)}</p>
                            </div>
                            <div className={`p-3 rounded-xl text-center ${netIncome >= 0 ? (darkMode ? 'bg-purple-900/20' : 'bg-purple-50') : (darkMode ? 'bg-amber-900/20' : 'bg-amber-50')}`}>
                              <p className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Net</p>
                              <p className={`text-lg font-bold ${netIncome >= 0 ? 'text-purple-500' : 'text-amber-500'}`}>
                                {netIncome >= 0 ? '+' : ''}{formatMoney(netIncome)}
                              </p>
                            </div>
                            <div className={`p-3 rounded-xl text-center ${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
                              <p className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Projected</p>
                              <p className="text-lg font-bold text-blue-500">{formatMoney(projected)}</p>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                )}
              </CandyCard>

              {/* Expense Trend with Heatmap - Side by Side */}
              <CandyCard darkMode={darkMode} className="chart-animate">
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-lg font-bold ${darkMode ? 'text-gray-100' : 'text-gray-700'}`}>📉 Expense Trend</h3>
                  {getMonthlyExpenseTotals().some(m => m.total > 0) && (
                    <button
                      onClick={() => setFullscreenChart('expense')}
                      className={`fullscreen-btn p-2 rounded-xl ${darkMode ? 'bg-purple-500/20' : 'bg-purple-100'}`}
                      title="View fullscreen"
                    >
                      <Maximize2 className={`w-4 h-4 ${darkMode ? 'text-purple-400' : 'text-purple-500'}`} />
                    </button>
                  )}
                </div>
                
                <div className="flex gap-4">
                  {/* Main Chart - Left Side */}
                  <div className="flex-1 min-w-0">
                    {getMonthlyExpenseTotals().some(m => m.total > 0) ? (
                      <ResponsiveContainer width="100%" height={280}>
                        <AreaChart data={getMonthlyExpenseTotals()}>
                          <defs>
                            <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#FF6B9D" stopOpacity={0.4} />
                              <stop offset="95%" stopColor="#FF6B9D" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#3D3A4E' : '#E8E4EE'} />
                          <XAxis dataKey="label" tick={{ fill: darkMode ? '#9CA3AF' : '#6B6789', fontSize: 11 }} />
                          <YAxis tick={{ fill: darkMode ? '#9CA3AF' : '#6B6789', fontSize: 11 }} />
                          <Tooltip formatter={(value) => formatMoney(value)} contentStyle={{ backgroundColor: darkMode ? '#252233' : '#fff', border: 'none', borderRadius: '12px' }} />
                          <Area type="monotone" dataKey="total" stroke="#FF6B9D" fill="url(#expenseGradient)" strokeWidth={3} />
                        </AreaChart>
                      </ResponsiveContainer>
                    ) : (
                      <EmptyState darkMode={darkMode} />
                    )}
                  </div>
                  
                  {/* Daily Heatmap - Right Side */}
                  <div className={`flex-shrink-0 pl-4 border-l ${darkMode ? 'border-[#3D3A4E]' : 'border-gray-200'}`} style={{ width: '175px' }}>
                    {/* Header */}
                    <p className={`text-xs font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Daily Spending</p>
                    
                    {/* Month Navigation */}
                    <div className="flex items-center justify-between mb-3">
                      <button
                        onClick={() => {
                          if (heatmapMonth === 0) {
                            setHeatmapMonth(11);
                            setHeatmapYear(heatmapYear - 1);
                          } else {
                            setHeatmapMonth(heatmapMonth - 1);
                          }
                        }}
                        className={`p-0.5 rounded transition-colors ${darkMode ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}
                      >
                        <ChevronLeft className="w-3 h-3" />
                      </button>
                      <span className={`text-[10px] font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {MONTH_NAMES[heatmapMonth].slice(0, 3)} {heatmapYear}
                      </span>
                      <button
                        onClick={() => {
                          if (heatmapMonth === 11) {
                            setHeatmapMonth(0);
                            setHeatmapYear(heatmapYear + 1);
                          } else {
                            setHeatmapMonth(heatmapMonth + 1);
                          }
                        }}
                        className={`p-0.5 rounded transition-colors ${darkMode ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}
                      >
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                    
                    {/* Heatmap Grid */}
                    <div className="flex gap-[3px]">
                      {/* Day labels */}
                      <div className="flex flex-col gap-[3px]">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                          <div key={i} className={`text-[8px] flex items-center justify-end pr-0.5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} style={{ width: '14px', height: '14px' }}>
                            {i % 2 === 1 ? d : ''}
                          </div>
                        ))}
                      </div>
                      {/* Weeks */}
                      <div className="flex gap-[3px]">
                        {getExpenseHeatmapData().weeks.map((week, weekIdx) => (
                          <div key={weekIdx} className="flex flex-col gap-[3px]">
                            {week.map((day, dayIdx) => (
                              <div
                                key={dayIdx}
                                className={`rounded-sm cursor-default transition-all hover:ring-1 hover:ring-white/30 ${
                                  day === null 
                                    ? 'opacity-0' 
                                    : day.intensity === 0 
                                      ? darkMode ? 'bg-gray-700/50' : 'bg-gray-200'
                                      : ''
                                }`}
                                style={{
                                  width: '14px',
                                  height: '14px',
                                  ...(day && day.intensity > 0 ? { backgroundColor: `rgba(255, 107, 157, ${0.2 + day.intensity * 0.7})` } : {})
                                }}
                                title={day ? `${MONTH_NAMES[heatmapMonth]} ${day.day}: ${formatMoney(day.amount)}` : ''}
                              />
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Legend */}
                    <div className="flex items-center gap-1 mt-2">
                      <span className={`text-[8px] ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Less</span>
                      {[0.15, 0.4, 0.65, 0.9].map((intensity, i) => (
                        <div
                          key={i}
                          className="w-2 h-2 rounded-sm"
                          style={{ backgroundColor: `rgba(255, 107, 157, ${0.2 + intensity * 0.7})` }}
                        />
                      ))}
                      <span className={`text-[8px] ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>More</span>
                    </div>
                  </div>
                </div>
              </CandyCard>

              {/* Income Trend */}
              <CandyCard darkMode={darkMode} className="chart-animate">
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-lg font-bold ${darkMode ? 'text-gray-100' : 'text-gray-700'}`}>📈 Income Trend</h3>
                  {getMonthlyIncomeTotals().some(m => m.total > 0) && (
                    <button
                      onClick={() => setFullscreenChart('income')}
                      className={`fullscreen-btn p-2 rounded-xl ${darkMode ? 'bg-purple-500/20' : 'bg-purple-100'}`}
                      title="View fullscreen"
                    >
                      <Maximize2 className={`w-4 h-4 ${darkMode ? 'text-purple-400' : 'text-purple-500'}`} />
                    </button>
                  )}
                </div>
                {getMonthlyIncomeTotals().some(m => m.total > 0) ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={getMonthlyIncomeTotals()}>
                      <defs>
                        <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#5FCFB5" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#5FCFB5" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E8E4EE" />
                      <XAxis dataKey="label" tick={{ fill: '#6B6789', fontSize: 12 }} />
                      <YAxis tick={{ fill: '#6B6789', fontSize: 12 }} />
                      <Tooltip formatter={(value) => formatMoney(value)} />
                      <Area type="monotone" dataKey="total" stroke="#5FCFB5" fill="url(#incomeGradient)" strokeWidth={3} />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <EmptyState darkMode={darkMode} />
                )}
              </CandyCard>

              {/* Investment Trend */}
              <CandyCard darkMode={darkMode} className="chart-animate">
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-lg font-bold ${darkMode ? 'text-gray-100' : 'text-gray-700'}`}>💎 Investment Activity</h3>
                  {getMonthlyInvestmentTotals().some(m => m.buys > 0 || m.sells > 0) && (
                    <button
                      onClick={() => setFullscreenChart('investments')}
                      className={`fullscreen-btn p-2 rounded-xl ${darkMode ? 'bg-purple-500/20' : 'bg-purple-100'}`}
                      title="View fullscreen"
                    >
                      <Maximize2 className={`w-4 h-4 ${darkMode ? 'text-purple-400' : 'text-purple-500'}`} />
                    </button>
                  )}
                </div>
                {getMonthlyInvestmentTotals().some(m => m.buys > 0 || m.sells > 0) ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={getMonthlyInvestmentTotals()}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E8E4EE" />
                      <XAxis dataKey="label" tick={{ fill: '#6B6789', fontSize: 12 }} />
                      <YAxis tick={{ fill: '#6B6789', fontSize: 12 }} />
                      <Tooltip 
                        formatter={(value, name) => [formatMoney(value), name === 'buys' ? 'Bought' : 'Sold']}
                      />
                      <Legend formatter={(value) => value === 'buys' ? 'Bought' : 'Sold'} />
                      <Bar dataKey="buys" fill="#8B5CF6" name="buys" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="sells" fill="#EC4899" name="sells" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <EmptyState darkMode={darkMode} />
                )}
              </CandyCard>

              {/* Hours Worked Trend */}
              <CandyCard darkMode={darkMode} className="chart-animate">
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-lg font-bold ${darkMode ? 'text-gray-100' : 'text-gray-700'}`}>⏰ Hours Worked</h3>
                  {getMonthlyHoursWorked().some(m => m.hours > 0) && (
                    <button
                      onClick={() => setFullscreenChart('hours')}
                      className={`fullscreen-btn p-2 rounded-xl ${darkMode ? 'bg-purple-500/20' : 'bg-purple-100'}`}
                      title="View fullscreen"
                    >
                      <Maximize2 className={`w-4 h-4 ${darkMode ? 'text-purple-400' : 'text-purple-500'}`} />
                    </button>
                  )}
                </div>
                {getMonthlyHoursWorked().some(m => m.hours > 0) ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={getMonthlyHoursWorked()}>
                      <defs>
                        <linearGradient id="hoursGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.4} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#3D3A4E' : '#E8E4EE'} />
                      <XAxis dataKey="label" tick={{ fill: '#6B6789', fontSize: 12 }} />
                      <YAxis yAxisId="hours" tick={{ fill: '#6B6789', fontSize: 12 }} />
                      <YAxis yAxisId="earnings" orientation="right" tick={{ fill: '#6B6789', fontSize: 12 }} />
                      <Tooltip 
                        formatter={(value, name) => [
                          name === 'hours' ? `${value} hrs` : formatMoney(value), 
                          name === 'hours' ? 'Hours' : 'Earnings'
                        ]}
                        contentStyle={{ 
                          backgroundColor: darkMode ? '#252233' : '#fff',
                          border: `2px solid ${darkMode ? '#3D3A4E' : '#E8E4EE'}`,
                          borderRadius: '12px'
                        }}
                      />
                      <Legend formatter={(value) => value === 'hours' ? 'Hours Worked' : 'Earnings'} />
                      <Bar yAxisId="hours" dataKey="hours" fill="url(#hoursGradient)" name="hours" radius={[4, 4, 0, 0]} />
                      <Bar yAxisId="earnings" dataKey="earnings" fill="#10B981" name="earnings" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <EmptyState darkMode={darkMode} />
                )}
              </CandyCard>

              {/* Category Breakdown */}
              <CandyCard darkMode={darkMode} className="chart-animate">
                <div className="flex items-center justify-between mb-4">
                  <div className="relative">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setShowCategoryDropdown(!showCategoryDropdown); }}
                      className={`text-lg font-bold flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity ${darkMode ? 'text-gray-100' : 'text-gray-700'}`}
                    >
                      📊 Category Breakdown
                      <ChevronDown className={`w-5 h-5 transition-transform ${showCategoryDropdown ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {showCategoryDropdown && (
                      <div 
                        className={`absolute top-full left-0 mt-2 rounded-xl border-2 shadow-xl z-20 overflow-hidden`}
                        style={{
                          backgroundColor: darkMode ? '#252233' : '#ffffff',
                          borderColor: darkMode ? '#3D3A4E' : '#e5e7eb'
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => { setCategoryBreakdownView('monthly'); setShowCategoryDropdown(false); }}
                          className={`w-full px-4 py-3 text-left text-sm font-medium flex items-center gap-2 transition-colors`}
                          style={{
                            backgroundColor: categoryBreakdownView === 'monthly' 
                              ? (darkMode ? 'rgba(147, 51, 234, 0.2)' : '#f3e8ff')
                              : (darkMode ? '#252233' : '#ffffff'),
                            color: categoryBreakdownView === 'monthly'
                              ? (darkMode ? '#c084fc' : '#9333ea')
                              : (darkMode ? '#d1d5db' : '#374151')
                          }}
                        >
                          📊 Monthly Stacked (Default)
                        </button>
                        <button
                          onClick={() => { setCategoryBreakdownView('alltime-pie'); setShowCategoryDropdown(false); }}
                          className={`w-full px-4 py-3 text-left text-sm font-medium flex items-center gap-2 transition-colors`}
                          style={{
                            backgroundColor: categoryBreakdownView === 'alltime-pie' 
                              ? (darkMode ? 'rgba(147, 51, 234, 0.2)' : '#f3e8ff')
                              : (darkMode ? '#252233' : '#ffffff'),
                            color: categoryBreakdownView === 'alltime-pie'
                              ? (darkMode ? '#c084fc' : '#9333ea')
                              : (darkMode ? '#d1d5db' : '#374151')
                          }}
                        >
                          🥧 All-Time Pie Chart
                        </button>
                      </div>
                    )}
                  </div>
                  {/* Fullscreen button - shows for all views when data exists */}
                  {expenses.length > 0 && (
                    <button
                      onClick={() => setFullscreenChart(`category-${categoryBreakdownView}`)}
                      className={`fullscreen-btn p-2 rounded-xl ${darkMode ? 'bg-purple-500/20' : 'bg-purple-100'}`}
                      title="View fullscreen"
                    >
                      <Maximize2 className={`w-4 h-4 ${darkMode ? 'text-purple-400' : 'text-purple-500'}`} />
                    </button>
                  )}
                </div>
                
                {/* Monthly Stacked Bar Chart (Default) */}
                {categoryBreakdownView === 'monthly' && (() => {
                  const data = getCategoryBreakdownByMonth();
                  const hasData = data && data.length > 0 && data.some(m => EXPENSE_CATEGORIES.some(c => m[c] > 0));
                  return hasData ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#3D3A4E' : '#E8E4EE'} />
                        <XAxis dataKey="label" tick={{ fill: darkMode ? '#9CA3AF' : '#6B6789', fontSize: 12 }} />
                        <YAxis tick={{ fill: darkMode ? '#9CA3AF' : '#6B6789', fontSize: 12 }} />
                        <Tooltip formatter={(value) => formatMoney(value)} contentStyle={{ backgroundColor: darkMode ? '#252233' : '#fff', border: 'none', borderRadius: '12px' }} />
                        <Legend />
                        {EXPENSE_CATEGORIES.map((cat) => (
                          <Bar key={cat} dataKey={cat} fill={CATEGORY_STYLES[cat]?.color || '#888'} stackId="a" />
                        ))}
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <EmptyState darkMode={darkMode} />
                  );
                })()}
                
                {/* All-Time Pie Chart */}
                {categoryBreakdownView === 'alltime-pie' && (() => {
                  const data = getAllTimeCategoryPieData();
                  const hasData = data && data.length > 0;
                  return hasData ? (
                    <div>
                      <p className={`text-sm mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Total all-time spending: {formatMoney(expenses.reduce((sum, e) => sum + e.amount, 0))}
                      </p>
                      <ResponsiveContainer width="100%" height={300}>
                        <RechartsPie>
                          <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {data.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color || '#888'} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => formatMoney(value)} contentStyle={{ backgroundColor: darkMode ? '#252233' : '#fff', border: 'none', borderRadius: '12px' }} />
                          <Legend />
                        </RechartsPie>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <EmptyState darkMode={darkMode} />
                  );
                })()}
              </CandyCard>
            </div>
          )}

          {/* GOALS TAB */}
          {viewMode === 'goals' && (
            <div className={`space-y-4 tab-content ${swipeDirection === 'left' ? 'slide-left-exit' : swipeDirection === 'right' ? 'slide-right-exit' : 'active'}`}>
              
              {/* Compact Tips Strip */}
              <div className={`flex items-center gap-2 p-3 rounded-2xl overflow-x-auto ${darkMode ? 'bg-[#252233]' : 'bg-white'} shadow-md`}>
                <span className="text-sm">💡</span>
                <div className="flex gap-2 flex-nowrap">
                  <span className={`px-2 py-1 rounded-lg text-xs whitespace-nowrap ${darkMode ? 'bg-emerald-900/30 text-emerald-400' : 'bg-emerald-100 text-emerald-600'}`}>
                    💰 Savings = Income - Expenses
                  </span>
                  <span className={`px-2 py-1 rounded-lg text-xs whitespace-nowrap ${darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                    📊 Auto-link to data
                  </span>
                  <span className={`px-2 py-1 rounded-lg text-xs whitespace-nowrap ${darkMode ? 'bg-amber-900/30 text-amber-400' : 'bg-amber-100 text-amber-600'}`}>
                    🛑 80% = Warning
                  </span>
                  <span className={`px-2 py-1 rounded-lg text-xs whitespace-nowrap ${darkMode ? 'bg-purple-900/30 text-purple-400' : 'bg-purple-100 text-purple-600'}`}>
                    ✏️ Manual tracking
                  </span>
                </div>
              </div>

              <CandyCard darkMode={darkMode}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className={`text-xl font-black flex items-center gap-2 ${darkMode ? 'text-gray-100' : 'text-gray-700'}`}>
                    <span className="text-2xl">🎯</span> Goal Tracker
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {goals.length}/5 goals
                    </span>
                    {goals.some(g => calculateGoalProgress(g).progress >= 100) && (
                      <CandyButton variant="ghost" size="sm" onClick={archiveAllCompletedGoals}>
                        <Archive className="w-4 h-4" /> Archive Done
                      </CandyButton>
                    )}
                    {archivedGoals.length > 0 && (
                      <CandyButton variant="ghost" size="sm" onClick={() => setShowGoalArchives(!showGoalArchives)}>
                        <Archive className="w-4 h-4" />
                        {showGoalArchives ? 'Hide' : 'View'} Archives
                      </CandyButton>
                    )}
                    {goals.length < 5 && (
                      <CandyButton size="sm" onClick={() => setShowAddGoalModal(true)}>
                        <Plus className="w-4 h-4" /> Add Goal
                      </CandyButton>
                    )}
                  </div>
                </div>

                {goals.length > 0 ? (
                  <div className="space-y-4">
                    {goals.map((goal, idx) => {
                      const { currentAmount, progress } = calculateGoalProgress(goal);
                      const isComplete = progress >= 100;
                      const isWarning = progress >= 80 && !isComplete && goal.category && EXPENSE_CATEGORIES.includes(goal.category);
                      const daysLeft = Math.max(0, Math.ceil((new Date(goal.endDate) - new Date()) / (1000 * 60 * 60 * 24)));
                      const isExpired = new Date(goal.endDate) < new Date();
                      
                      return (
                        <div
                          key={goal.id}
                          className={`p-4 rounded-2xl border-2 transition-all ${
                            isComplete 
                              ? darkMode ? 'bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-500/50' : 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-300'
                              : darkMode ? 'bg-[#1E1B2E] border-[#3D3A4E]' : 'bg-gray-50 border-gray-200'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className={`font-bold flex items-center gap-2 ${darkMode ? 'text-gray-100' : 'text-gray-700'}`}>
                                {isComplete && <span className="text-lg">🎉</span>}
                                {goal.name}
                              </h4>
                              <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                {goal.type === 'auto' ? `📊 Auto: ${
                                  goal.category === 'savings' ? 'Net Savings' :
                                  goal.category === 'income' ? 'Total Income' :
                                  goal.category === 'investments' ? 'Investments' :
                                  goal.category?.startsWith('debit-') ? (debitCards.find(c => c.id === parseInt(goal.category.replace('debit-', '')))?.name || 'Debit Card') + ' Balance' :
                                  goal.category?.startsWith('credit-') ? (creditCards.find(c => c.id === parseInt(goal.category.replace('credit-', '')))?.name || 'Credit Card') + ' Payoff' :
                                  goal.category
                                }` : '✏️ Manual'} 
                                {' • '}
                                {isExpired ? 'Ended' : `${daysLeft} days left`}
                              </p>
                            </div>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => archiveGoal(goal.id)}
                                className={`p-1.5 rounded-lg transition-colors ${darkMode ? 'hover:bg-white/10 text-gray-400' : 'hover:bg-gray-200 text-gray-500'}`}
                                title="Archive goal"
                              >
                                <Archive className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => removeGoal(goal.id)}
                                className={`p-1.5 rounded-lg transition-colors ${darkMode ? 'hover:bg-white/10 text-gray-400' : 'hover:bg-gray-200 text-gray-500'}`}
                                title="Delete goal"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          
                          {/* Progress Bar */}
                          <div className={`h-4 rounded-full overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                            <div
                              className={`h-full rounded-full goal-progress-bar ${
                                isComplete ? 'goal-progress-bar-complete' : isWarning ? 'goal-progress-bar-warning' : ''
                              }`}
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                          
                          {/* Stats */}
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-1">
                              <AnimatedNumber 
                                value={currentAmount} 
                                prefix="$" 
                                className={`font-bold ${isComplete ? 'text-purple-500' : darkMode ? 'text-gray-200' : 'text-gray-700'}`}
                              />
                              <span className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                / {formatMoney(goal.targetAmount)}
                              </span>
                            </div>
                            <span className={`text-sm font-bold ${
                              isComplete ? 'text-purple-500' : isWarning ? 'text-amber-500' : darkMode ? 'text-gray-300' : 'text-gray-600'
                            }`}>
                              {progress.toFixed(0)}%
                            </span>
                          </div>
                          
                          {/* Manual Update Input */}
                          {goal.type === 'manual' && (
                            <div className="mt-3 pt-3 border-t border-dashed" style={{ borderColor: darkMode ? '#3D3A4E' : '#e5e7eb' }}>
                              <label className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                Update Progress
                              </label>
                              <div className="flex gap-2 mt-1">
                                <input
                                  type="number"
                                  value={goal.manualAmount || ''}
                                  onChange={(e) => updateGoalManualAmount(goal.id, e.target.value)}
                                  placeholder="Current amount"
                                  className="flex-1 px-3 py-2 rounded-xl text-sm outline-none border-2 transition-colors"
                                  style={{
                                    backgroundColor: darkMode ? '#252233' : '#fff',
                                    borderColor: darkMode ? '#3D3A4E' : '#e5e7eb',
                                    color: darkMode ? '#f3f4f6' : '#374151'
                                  }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className={`text-center py-12 rounded-2xl ${darkMode ? 'bg-[#1E1B2E]' : 'bg-gray-50'}`}>
                    <span className="text-5xl mb-4 block">🎯</span>
                    <p className={`font-bold text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>No goals yet</p>
                    <p className={`text-sm mt-1 mb-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                      Set financial goals to track your progress!
                    </p>
                    <CandyButton onClick={() => setShowAddGoalModal(true)}>
                      <Plus className="w-4 h-4" /> Create Your First Goal
                    </CandyButton>
                  </div>
                )}
                
                {/* Archived Goals */}
                {showGoalArchives && archivedGoals.length > 0 && (
                  <div className={`mt-6 pt-4 border-t ${darkMode ? 'border-[#3D3A4E]' : 'border-gray-200'}`}>
                    <h4 className={`text-sm font-bold mb-3 flex items-center gap-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      <Archive className="w-4 h-4" /> Archived Goals ({archivedGoals.length})
                    </h4>
                    <div className="space-y-2">
                      {archivedGoals.sort((a, b) => new Date(b.archivedOn) - new Date(a.archivedOn)).map(goal => (
                        <div
                          key={goal.id}
                          className={`p-3 rounded-xl border ${
                            goal.finalProgress >= 100
                              ? darkMode ? 'bg-purple-900/10 border-purple-500/30' : 'bg-purple-50/50 border-purple-200'
                              : darkMode ? 'bg-[#1E1B2E]/50 border-[#3D3A4E]/50' : 'bg-gray-50/50 border-gray-200/50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1 min-w-0">
                              <p className={`font-medium text-sm truncate ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                {goal.finalProgress >= 100 ? '🎉 ' : ''}{goal.name}
                              </p>
                              <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                {formatMoney(goal.finalAmount)} / {formatMoney(goal.targetAmount)} ({Math.round(goal.finalProgress)}%)
                                {' • '}Archived {new Date(goal.archivedOn).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="flex items-center gap-1 ml-2">
                              {goals.length < 5 && (
                                <button
                                  onClick={() => restoreGoal(goal.id)}
                                  className={`p-1.5 rounded-lg transition-colors ${darkMode ? 'hover:bg-white/10 text-gray-400' : 'hover:bg-gray-200 text-gray-500'}`}
                                  title="Restore goal"
                                >
                                  <RotateCcw className="w-3.5 h-3.5" />
                                </button>
                              )}
                              <button
                                onClick={() => deleteArchivedGoal(goal.id)}
                                className={`p-1.5 rounded-lg transition-colors ${darkMode ? 'hover:bg-white/10 text-gray-400' : 'hover:bg-gray-200 text-gray-500'}`}
                                title="Delete permanently"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CandyCard>
            </div>
          )}
        </main>

        {/* Fullscreen Chart Modal */}
        {fullscreenChart && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setFullscreenChart(null)}
            onTouchEnd={(e) => { e.preventDefault(); setFullscreenChart(null); }}
          >
            <div 
              className={`flex flex-col w-full max-w-5xl rounded-3xl ${darkMode ? 'bg-[#252233]' : 'bg-white'}`}
              style={{ height: 'min(80vh, 600px)' }}
              onClick={(e) => e.stopPropagation()}
              onTouchEnd={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: darkMode ? '#3D3A4E' : '#e5e7eb' }}>
                <h2 className={`text-xl font-black ${darkMode ? 'text-gray-100' : 'text-gray-700'}`}>
                  {fullscreenChart === 'expense' && '📉 Expense Trend'}
                  {fullscreenChart === 'income' && '📈 Income Trend'}
                  {fullscreenChart === 'savings' && '💰 Savings Trend'}
                  {fullscreenChart === 'category' && '📊 Category Breakdown'}
                  {fullscreenChart === 'category-monthly' && '📊 Monthly Category Breakdown'}
                  {fullscreenChart === 'category-alltime-pie' && '🥧 All-Time Category Breakdown'}
                  {fullscreenChart === 'investments' && '💎 Investment Activity'}
                  {fullscreenChart === 'hours' && '⏰ Hours Worked'}
                  {fullscreenChart === 'networth' && '💰 Net Worth Trend'}
                </h2>
                <button
                  onClick={() => setFullscreenChart(null)}
                  className={`p-3 rounded-xl transition-colors ${darkMode ? 'bg-white/10 hover:bg-white/20 text-gray-100' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              {/* Chart Container - use explicit height for Safari compatibility */}
              <div className="p-4" style={{ height: 'calc(100% - 80px)' }}>
                {fullscreenChart === 'expense' && (
                  getMonthlyExpenseTotals().some(m => m.total > 0) ? (
                    <ResponsiveContainer width="100%" height={450}>
                      <AreaChart data={getMonthlyExpenseTotals()}>
                        <defs>
                          <linearGradient id="expenseGradientFull" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#FF6B9D" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#FF6B9D" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#3D3A4E' : '#E8E4EE'} />
                        <XAxis dataKey="label" tick={{ fill: darkMode ? '#9CA3AF' : '#6B6789', fontSize: 12 }} />
                        <YAxis tick={{ fill: darkMode ? '#9CA3AF' : '#6B6789', fontSize: 12 }} />
                        <Tooltip formatter={(value) => formatMoney(value)} contentStyle={{ backgroundColor: darkMode ? '#252233' : '#fff', border: 'none', borderRadius: '12px' }} />
                        <Area type="monotone" dataKey="total" stroke="#FF6B9D" fill="url(#expenseGradientFull)" strokeWidth={3} />
                      </AreaChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>No expense data to display</p>
                    </div>
                  )
                )}
                {fullscreenChart === 'income' && (
                  getMonthlyIncomeTotals().some(m => m.total > 0) ? (
                    <ResponsiveContainer width="100%" height={450}>
                      <AreaChart data={getMonthlyIncomeTotals()}>
                        <defs>
                          <linearGradient id="incomeGradientFull" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#5FCFB5" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#5FCFB5" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#3D3A4E' : '#E8E4EE'} />
                        <XAxis dataKey="label" tick={{ fill: darkMode ? '#9CA3AF' : '#6B6789', fontSize: 12 }} />
                        <YAxis tick={{ fill: darkMode ? '#9CA3AF' : '#6B6789', fontSize: 12 }} />
                        <Tooltip formatter={(value) => formatMoney(value)} contentStyle={{ backgroundColor: darkMode ? '#252233' : '#fff', border: 'none', borderRadius: '12px' }} />
                        <Area type="monotone" dataKey="total" stroke="#5FCFB5" fill="url(#incomeGradientFull)" strokeWidth={3} />
                      </AreaChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>No income data to display</p>
                    </div>
                  )
                )}
                {fullscreenChart === 'savings' && (
                  <ResponsiveContainer width="100%" height={450}>
                    <AreaChart data={getMonthlyIncomeTotals().map((inc, idx) => {
                      const exp = getMonthlyExpenseTotals()[idx];
                      return { label: inc.label, savings: inc.total - (exp?.total || 0) };
                    })}>
                      <defs>
                        <linearGradient id="savingsGradientFull" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#3D3A4E' : '#E8E4EE'} />
                      <XAxis dataKey="label" tick={{ fill: darkMode ? '#9CA3AF' : '#6B6789', fontSize: 12 }} />
                      <YAxis tick={{ fill: darkMode ? '#9CA3AF' : '#6B6789', fontSize: 12 }} />
                      <Tooltip formatter={(value) => formatMoney(value)} contentStyle={{ backgroundColor: darkMode ? '#252233' : '#fff', border: 'none', borderRadius: '12px' }} />
                      <Area type="monotone" dataKey="savings" stroke="#8B5CF6" fill="url(#savingsGradientFull)" strokeWidth={3} />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
                {/* Category Monthly Stacked */}
                {fullscreenChart === 'category-monthly' && (() => {
                  const data = getCategoryBreakdownByMonth();
                  const hasData = data && data.length > 0 && data.some(m => EXPENSE_CATEGORIES.some(c => m[c] > 0));
                  return hasData ? (
                    <ResponsiveContainer width="100%" height={450}>
                      <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#3D3A4E' : '#E8E4EE'} />
                        <XAxis dataKey="label" tick={{ fill: darkMode ? '#9CA3AF' : '#6B6789', fontSize: 12 }} />
                        <YAxis tick={{ fill: darkMode ? '#9CA3AF' : '#6B6789', fontSize: 12 }} />
                        <Tooltip formatter={(value) => formatMoney(value)} contentStyle={{ backgroundColor: darkMode ? '#252233' : '#fff', border: 'none', borderRadius: '12px' }} />
                        <Legend />
                        {EXPENSE_CATEGORIES.map((cat) => (
                          <Bar key={cat} dataKey={cat} fill={CATEGORY_STYLES[cat]?.color || '#888'} stackId="a" />
                        ))}
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>No category data to display</p>
                    </div>
                  );
                })()}
                {/* Category All-Time Pie */}
                {/* Category All-Time Pie */}
                {(fullscreenChart === 'category' || fullscreenChart === 'category-alltime-pie') && (() => {
                  const data = getAllTimeCategoryPieData();
                  const hasData = data && data.length > 0;
                  return hasData ? (
                    <ResponsiveContainer width="100%" height={450}>
                      <RechartsPie>
                        <Pie
                          data={data}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={180}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          labelLine={{ stroke: darkMode ? '#9CA3AF' : '#6B6789' }}
                        >
                          {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color || '#888'} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => formatMoney(value)} contentStyle={{ backgroundColor: darkMode ? '#252233' : '#fff', border: 'none', borderRadius: '12px' }} />
                        <Legend />
                      </RechartsPie>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>No category data to display</p>
                    </div>
                  );
                })()}
                {fullscreenChart === 'investments' && (
                  getMonthlyInvestmentTotals().some(m => m.buys > 0 || m.sells > 0) ? (
                    <ResponsiveContainer width="100%" height={450}>
                      <BarChart data={getMonthlyInvestmentTotals()}>
                        <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#3D3A4E' : '#E8E4EE'} />
                        <XAxis dataKey="label" tick={{ fill: darkMode ? '#9CA3AF' : '#6B6789', fontSize: 12 }} />
                        <YAxis tick={{ fill: darkMode ? '#9CA3AF' : '#6B6789', fontSize: 12 }} />
                        <Tooltip 
                          formatter={(value, name) => [formatMoney(value), name === 'buys' ? 'Bought' : 'Sold']}
                          contentStyle={{ backgroundColor: darkMode ? '#252233' : '#fff', border: 'none', borderRadius: '12px' }}
                        />
                        <Legend formatter={(value) => value === 'buys' ? 'Bought' : 'Sold'} />
                        <Bar dataKey="buys" fill="#8B5CF6" name="buys" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="sells" fill="#EC4899" name="sells" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>No investment data to display</p>
                    </div>
                  )
                )}
                {fullscreenChart === 'hours' && (
                  getMonthlyHoursWorked().some(m => m.hours > 0) ? (
                    <ResponsiveContainer width="100%" height={450}>
                      <BarChart data={getMonthlyHoursWorked()}>
                        <defs>
                          <linearGradient id="hoursGradientFull" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.4} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#3D3A4E' : '#E8E4EE'} />
                        <XAxis dataKey="label" tick={{ fill: darkMode ? '#9CA3AF' : '#6B6789', fontSize: 12 }} />
                        <YAxis yAxisId="hours" tick={{ fill: darkMode ? '#9CA3AF' : '#6B6789', fontSize: 12 }} />
                        <YAxis yAxisId="earnings" orientation="right" tick={{ fill: darkMode ? '#9CA3AF' : '#6B6789', fontSize: 12 }} />
                        <Tooltip 
                          formatter={(value, name) => [
                            name === 'hours' ? `${value} hrs` : formatMoney(value), 
                            name === 'hours' ? 'Hours' : 'Earnings'
                          ]}
                          contentStyle={{ backgroundColor: darkMode ? '#252233' : '#fff', border: 'none', borderRadius: '12px' }}
                        />
                        <Legend formatter={(value) => value === 'hours' ? 'Hours Worked' : 'Earnings'} />
                        <Bar yAxisId="hours" dataKey="hours" fill="url(#hoursGradientFull)" name="hours" radius={[4, 4, 0, 0]} />
                        <Bar yAxisId="earnings" dataKey="earnings" fill="#10B981" name="earnings" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>No hours data to display</p>
                    </div>
                  )
                )}
                {fullscreenChart === 'networth' && (
                  getMonthlyNetWorth().length > 0 ? (
                    <ResponsiveContainer width="100%" height={450}>
                      <AreaChart data={getMonthlyNetWorth()}>
                        <defs>
                          <linearGradient id="netWorthGradientFull" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#3D3A4E' : '#E8E4EE'} />
                        <XAxis dataKey="label" tick={{ fill: darkMode ? '#9CA3AF' : '#6B6789', fontSize: 12 }} />
                        <YAxis tick={{ fill: darkMode ? '#9CA3AF' : '#6B6789', fontSize: 12 }} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
                        <Tooltip 
                          formatter={(value) => [formatMoney(value), 'Net Worth']}
                          contentStyle={{ backgroundColor: darkMode ? '#252233' : '#fff', border: 'none', borderRadius: '12px' }}
                        />
                        <Area type="monotone" dataKey="netWorth" stroke="#10B981" fill="url(#netWorthGradientFull)" strokeWidth={3} name="netWorth" />
                      </AreaChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>No net worth data to display</p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        )}

        {/* Pay Date Modal */}
        {showPayDateModal && selectedJobForPay && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <CandyCard darkMode={darkMode} className="max-w-sm w-full">
              <h3 className={`text-xl font-black mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-700'}`}>
                ⚙️ Payment Settings
              </h3>
              <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {selectedJobForPay}
              </p>
              
              <div className="mb-4">
                <label className={`block text-sm font-bold mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Last paid through:
                </label>
                <div className={`rounded-2xl transition-all ${payDateInput === getLocalDateString() ? 'pay-date-today-glow' : ''}`}>
                  <CandyDateInput
                    darkMode={darkMode}
                    value={payDateInput}
                    onChange={(e) => setPayDateInput(e.target.value)}
                  />
                </div>
                <p className={`text-xs mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  All work logged on or before this date will be marked as paid
                </p>
              </div>
              
              {jobLastPaidDates[selectedJobForPay] && (
                <div className={`mb-4 p-3 rounded-xl ${darkMode ? 'bg-emerald-900/20' : 'bg-emerald-50'}`}>
                  <p className={`text-sm ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                    Currently paid through: <strong>{formatDateDisplay(jobLastPaidDates[selectedJobForPay])}</strong>
                  </p>
                </div>
              )}
              
              <div className="flex gap-3">
                <CandyButton 
                  onClick={() => {
                    if (payDateInput) {
                      setJobLastPaidDates({ ...jobLastPaidDates, [selectedJobForPay]: payDateInput });
                    }
                    setShowPayDateModal(false);
                    setSelectedJobForPay(null);
                    setPayDateInput('');
                  }}
                >
                  Save
                </CandyButton>
                {jobLastPaidDates[selectedJobForPay] && (
                  <CandyButton 
                    variant="ghost"
                    onClick={() => {
                      const updated = { ...jobLastPaidDates };
                      delete updated[selectedJobForPay];
                      setJobLastPaidDates(updated);
                      setShowPayDateModal(false);
                      setSelectedJobForPay(null);
                      setPayDateInput('');
                    }}
                  >
                    Clear
                  </CandyButton>
                )}
                <CandyButton 
                  variant="ghost" 
                  onClick={() => {
                    setShowPayDateModal(false);
                    setSelectedJobForPay(null);
                    setPayDateInput('');
                  }}
                >
                  Cancel
                </CandyButton>
              </div>
            </CandyCard>
          </div>
        )}

        {/* Modals */}
        {showRestoreModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <CandyCard darkMode={darkMode} className="max-w-lg w-full">
              <h3 className={`text-xl font-black mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-700'}`}>📥 Restore Data</h3>
              <textarea
                value={restoreText}
                onChange={(e) => setRestoreText(e.target.value)}
                placeholder="Paste your backup data here..."
                className={`w-full h-40 p-4 rounded-xl border-2 outline-none focus:border-pink-400 resize-none transition-colors ${
                  darkMode ? 'bg-[#1E1B2E] border-[#3D3A4E] text-gray-100 placeholder-gray-500' : 'bg-gray-50 border-gray-200 text-gray-700'
                }`}
              />
              <div className="flex gap-3 mt-4">
                <CandyButton onClick={restoreFromText}>Restore</CandyButton>
                <CandyButton variant="ghost" onClick={() => setShowRestoreModal(false)}>Cancel</CandyButton>
              </div>
            </CandyCard>
          </div>
        )}

        {/* Add Goal Modal */}
        {showAddGoalModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <CandyCard darkMode={darkMode} className="max-w-md w-full max-h-[90vh] overflow-y-auto">
              <h3 className={`text-xl font-black mb-4 flex items-center gap-2 ${darkMode ? 'text-gray-100' : 'text-gray-700'}`}>
                <span className="text-2xl">🎯</span> Create New Goal
              </h3>
              
              <div className="space-y-4">
                {/* Goal Name */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Goal Name
                  </label>
                  <input
                    type="text"
                    value={newGoalName}
                    onChange={(e) => setNewGoalName(e.target.value)}
                    placeholder="e.g., Emergency Fund, Vacation Savings..."
                    className="w-full px-4 py-3 rounded-xl border-2 outline-none transition-colors"
                    style={{
                      backgroundColor: darkMode ? '#1E1B2E' : '#f9fafb',
                      borderColor: darkMode ? '#3D3A4E' : '#e5e7eb',
                      color: darkMode ? '#f3f4f6' : '#374151'
                    }}
                  />
                </div>
                
                {/* Target Amount */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Target Amount
                  </label>
                  <input
                    type="number"
                    value={newGoalAmount}
                    onChange={(e) => setNewGoalAmount(e.target.value)}
                    placeholder="$0.00"
                    className="w-full px-4 py-3 rounded-xl border-2 outline-none transition-colors"
                    style={{
                      backgroundColor: darkMode ? '#1E1B2E' : '#f9fafb',
                      borderColor: darkMode ? '#3D3A4E' : '#e5e7eb',
                      color: darkMode ? '#f3f4f6' : '#374151'
                    }}
                  />
                </div>
                
                {/* Date Range */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Start Date
                    </label>
                    <CandyDateInput 
                      darkMode={darkMode}
                      value={newGoalStartDate}
                      onChange={(e) => setNewGoalStartDate(e.target.value)}
                      showTodayButton={true}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      End Date
                    </label>
                    <CandyDateInput 
                      darkMode={darkMode}
                      value={newGoalEndDate}
                      onChange={(e) => setNewGoalEndDate(e.target.value)}
                      showTodayButton={false}
                    />
                  </div>
                </div>
                
                {/* Tracking Type */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Tracking Method
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setNewGoalType('auto')}
                      className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                        newGoalType === 'auto'
                          ? 'border-purple-500 bg-purple-500/20 text-purple-500'
                          : darkMode ? 'border-[#3D3A4E] text-gray-400 hover:border-gray-500' : 'border-gray-200 text-gray-500 hover:border-gray-300'
                      }`}
                    >
                      📊 Auto-Link
                    </button>
                    <button
                      onClick={() => setNewGoalType('manual')}
                      className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                        newGoalType === 'manual'
                          ? 'border-purple-500 bg-purple-500/20 text-purple-500'
                          : darkMode ? 'border-[#3D3A4E] text-gray-400 hover:border-gray-500' : 'border-gray-200 text-gray-500 hover:border-gray-300'
                      }`}
                    >
                      ✏️ Manual
                    </button>
                  </div>
                </div>
                
                {/* Auto-Link Category Selection */}
                {newGoalType === 'auto' && (
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Link To
                    </label>
                    <select
                      value={newGoalCategory}
                      onChange={(e) => setNewGoalCategory(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 outline-none transition-colors cursor-pointer"
                      style={{
                        backgroundColor: darkMode ? '#1E1B2E' : '#f9fafb',
                        borderColor: darkMode ? '#3D3A4E' : '#e5e7eb',
                        color: darkMode ? '#f3f4f6' : '#374151'
                      }}
                    >
                      <optgroup label="📈 Income & Savings">
                        <option value="savings">💰 Net Savings (Income - Expenses)</option>
                        <option value="income">💵 Total Income</option>
                        <option value="investments">📊 Investment Contributions</option>
                      </optgroup>
                      {(creditCards.length > 0 || debitCards.length > 0) && (
                        <optgroup label="💳 Cards">
                          {debitCards.map(card => (
                            <option key={`debit-${card.id}`} value={`debit-${card.id}`}>💳 {card.name} Balance</option>
                          ))}
                          {creditCards.map(card => (
                            <option key={`credit-${card.id}`} value={`credit-${card.id}`}>💳 {card.name} Payoff</option>
                          ))}
                        </optgroup>
                      )}
                      <optgroup label="💸 Spending Limits (by category)">
                        {EXPENSE_CATEGORIES.map(cat => (
                          <option key={cat} value={cat}>🛑 {cat} Limit</option>
                        ))}
                      </optgroup>
                    </select>
                  </div>
                )}
                
                {/* Manual Starting Amount */}
                {newGoalType === 'manual' && (
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Current Progress (optional)
                    </label>
                    <input
                      type="number"
                      value={newGoalCurrentAmount}
                      onChange={(e) => setNewGoalCurrentAmount(e.target.value)}
                      placeholder="$0.00"
                      className="w-full px-4 py-3 rounded-xl border-2 outline-none transition-colors"
                      style={{
                        backgroundColor: darkMode ? '#1E1B2E' : '#f9fafb',
                        borderColor: darkMode ? '#3D3A4E' : '#e5e7eb',
                        color: darkMode ? '#f3f4f6' : '#374151'
                      }}
                    />
                  </div>
                )}
              </div>
              
              <div className="flex gap-3 mt-6">
                <CandyButton onClick={addGoal} className="flex-1">
                  <Plus className="w-4 h-4" /> Create Goal
                </CandyButton>
                <CandyButton variant="ghost" onClick={() => {
                  setShowAddGoalModal(false);
                  setNewGoalName('');
                  setNewGoalAmount('');
                  setNewGoalEndDate('');
                  setNewGoalType('auto');
                  setNewGoalCategory('savings');
                  setNewGoalCurrentAmount('');
                }}>
                  Cancel
                </CandyButton>
              </div>
            </CandyCard>
          </div>
        )}

        {/* Undo Toast */}
        {showUndoToast && pendingDeletion && (
          <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-50 undo-toast">
            <div className={`flex items-center gap-4 px-5 py-3 rounded-2xl shadow-2xl border-2 ${
              darkMode 
                ? 'bg-[#252233] border-[#3D3A4E] text-gray-100' 
                : 'bg-white border-gray-200 text-gray-700'
            }`}>
              <span className="text-sm font-medium">
                {pendingDeletion.type === 'income' && '💸'}
                {pendingDeletion.type === 'expense' && '🧾'}
                {pendingDeletion.type === 'investment' && '📈'}
                {pendingDeletion.type === 'worklog' && '⏰'}
                {' '}Deleted
              </span>
              <button
                onTouchEnd={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  undoDelete();
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  undoDelete();
                }}
                className="px-4 py-1.5 rounded-xl font-bold text-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-400 hover:to-pink-400 transition-all active:scale-95"
              >
                Undo
              </button>
            </div>
          </div>
        )}

        {/* Context Menu */}
        {contextMenu && (
          <div 
            className="fixed z-[100] context-menu"
            style={{ 
              left: Math.min(contextMenu.x, window.innerWidth - 160),
              top: Math.min(contextMenu.y, window.innerHeight - 180)
            }}
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            onTouchEnd={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div 
              className="rounded-2xl overflow-hidden min-w-[150px] border-2"
              style={{
                backgroundColor: darkMode ? '#1a1625' : '#ffffff',
                borderColor: darkMode ? '#3D3A4E' : '#e5e7eb',
                boxShadow: darkMode 
                  ? '0 10px 40px rgba(0,0,0,0.8), 0 0 0 1px rgba(0,0,0,0.3)' 
                  : '0 10px 40px rgba(0,0,0,0.15)'
              }}
            >
              <button
                onTouchEnd={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleContextMenuAction('edit');
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleContextMenuAction('edit');
                }}
                className="w-full px-4 py-3 text-left text-sm font-medium flex items-center gap-3 transition-colors"
                style={{
                  color: darkMode ? '#e5e7eb' : '#374151',
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = darkMode ? 'rgba(255,255,255,0.1)' : '#f9fafb'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <Edit3 className="w-4 h-4" />
                Edit
              </button>
              <button
                onTouchEnd={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleContextMenuAction('duplicate');
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleContextMenuAction('duplicate');
                }}
                className="w-full px-4 py-3 text-left text-sm font-medium flex items-center gap-3 transition-colors"
                style={{
                  color: darkMode ? '#e5e7eb' : '#374151',
                  backgroundColor: 'transparent',
                  borderTop: `1px solid ${darkMode ? '#3D3A4E' : '#f3f4f6'}`
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = darkMode ? 'rgba(255,255,255,0.1)' : '#f9fafb'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <Plus className="w-4 h-4" />
                Duplicate
              </button>
              <button
                onTouchEnd={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleContextMenuAction('delete');
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleContextMenuAction('delete');
                }}
                className="w-full px-4 py-3 text-left text-sm font-medium flex items-center gap-3 transition-colors"
                style={{
                  color: darkMode ? '#f87171' : '#ef4444',
                  backgroundColor: 'transparent',
                  borderTop: `1px solid ${darkMode ? '#3D3A4E' : '#f3f4f6'}`
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = darkMode ? 'rgba(239,68,68,0.15)' : '#fef2f2'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <X className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        )}

        {showBackupModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <CandyCard darkMode={darkMode} className="max-w-lg w-full">
              <h3 className={`text-xl font-black mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-700'}`}>📤 Backup Data</h3>
              <textarea
                value={backupData}
                readOnly
                className={`w-full h-40 p-4 rounded-xl border-2 outline-none text-xs font-mono ${
                  darkMode ? 'bg-[#1E1B2E] border-[#3D3A4E] text-gray-300' : 'bg-gray-50 border-gray-200 text-gray-700'
                }`}
              />
              <div className="flex gap-3 mt-4">
                <CandyButton onClick={() => { navigator.clipboard.writeText(backupData); alert('Copied!'); }}>
                  Copy to Clipboard
                </CandyButton>
                <CandyButton variant="ghost" onClick={() => setShowBackupModal(false)}>Close</CandyButton>
              </div>
            </CandyCard>
          </div>
        )}

        {/* Analytics Export Modal */}
        {showAnalyticsExport && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <CandyCard darkMode={darkMode} className="max-w-lg w-full">
              <h3 className={`text-xl font-black mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-700'}`}>📊 Analytics Export (CSV)</h3>
              <p className={`text-sm mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Copy this data and paste into a spreadsheet app, or save as a .csv file
              </p>
              <textarea
                value={analyticsExportData}
                readOnly
                className={`w-full h-48 p-4 rounded-xl border-2 outline-none text-xs font-mono ${
                  darkMode ? 'bg-[#1E1B2E] border-[#3D3A4E] text-gray-300' : 'bg-gray-50 border-gray-200 text-gray-700'
                }`}
              />
              <div className="flex gap-3 mt-4">
                <CandyButton onClick={() => { 
                  navigator.clipboard.writeText(analyticsExportData); 
                  alert('Copied to clipboard! Paste into Numbers, Excel, or Google Sheets.'); 
                }}>
                  📋 Copy to Clipboard
                </CandyButton>
                <CandyButton variant="ghost" onClick={() => setShowAnalyticsExport(false)}>Close</CandyButton>
              </div>
            </CandyCard>
          </div>
        )}

        {showRecurringModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <CandyCard darkMode={darkMode} className="max-w-md w-full">
              <h3 className={`text-xl font-black mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-700'}`}>🔄 Add Recurring Expense</h3>
              <div className="space-y-4">
                <input 
                  placeholder="Name" 
                  value={newRecurringName} 
                  onChange={(e) => setNewRecurringName(e.target.value)}
                  className={`candy-input ${darkMode ? 'candy-input-dark' : 'candy-input-light'}`}
                />
                <input 
                  type="number" 
                  placeholder="Amount" 
                  value={newRecurringAmount} 
                  onChange={(e) => setNewRecurringAmount(e.target.value)}
                  className={`candy-input ${darkMode ? 'candy-input-dark' : 'candy-input-light'}`}
                />
                <CandySelect darkMode={darkMode} value={newRecurringCategory} onChange={(e) => setNewRecurringCategory(e.target.value)}>
                  {EXPENSE_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </CandySelect>
                <CandySelect darkMode={darkMode} value={newRecurringDay} onChange={(e) => setNewRecurringDay(e.target.value)}>
                  {Array.from({ length: 28 }, (_, i) => <option key={i + 1} value={i + 1}>Day {i + 1}</option>)}
                </CandySelect>
              </div>
              <div className="flex gap-3 mt-4">
                <CandyButton onClick={addRecurringExpense}>Add</CandyButton>
                <CandyButton variant="ghost" onClick={() => setShowRecurringModal(false)}>Cancel</CandyButton>
              </div>
            </CandyCard>
          </div>
        )}

        {/* Add Account Modal */}
        {showAddCardModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <CandyCard darkMode={darkMode} className="max-w-md w-full">
              <h3 className={`text-xl font-black mb-4 flex items-center gap-2 ${darkMode ? 'text-gray-100' : 'text-gray-700'}`}>
                {addCardType === 'credit' ? '💳' : '💵'} Add {addCardType === 'credit' ? 'Credit Card' : 'Checking Account'}
              </h3>
              
              {/* Account Type Toggle */}
              <div className={`flex rounded-xl overflow-hidden border-2 mb-4 ${darkMode ? 'border-[#3D3A4E]' : 'border-gray-200'}`}>
                <button
                  onClick={() => setAddCardType('debit')}
                  className={`flex-1 py-2 px-3 text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                    addCardType === 'debit'
                      ? 'bg-gradient-to-r from-emerald-400 to-teal-400 text-white'
                      : darkMode ? 'text-gray-400 hover:bg-white/5' : 'text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  💵 Checking
                </button>
                <button
                  onClick={() => setAddCardType('credit')}
                  className={`flex-1 py-2 px-3 text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                    addCardType === 'credit'
                      ? 'bg-gradient-to-r from-violet-400 to-purple-400 text-white'
                      : darkMode ? 'text-gray-400 hover:bg-white/5' : 'text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  💳 Credit Card
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-bold mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {addCardType === 'credit' ? 'Card Name' : 'Account Name'}
                  </label>
                  <input 
                    placeholder={addCardType === 'credit' ? 'e.g., Chase Sapphire' : 'e.g., Main Checking'}
                    value={newCardName} 
                    onChange={(e) => setNewCardName(e.target.value)}
                    className={`candy-input ${darkMode ? 'candy-input-dark' : 'candy-input-light'}`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-bold mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {addCardType === 'credit' ? 'Current Balance (Owed)' : 'Current Balance'}
                  </label>
                  <input 
                    type="number"
                    placeholder="0.00"
                    value={newCardBalance} 
                    onChange={(e) => setNewCardBalance(e.target.value)}
                    className={`candy-input ${darkMode ? 'candy-input-dark' : 'candy-input-light'}`}
                  />
                </div>
                
                {/* Credit Card Only Fields */}
                {addCardType === 'credit' && (
                  <>
                    <div>
                      <label className={`block text-sm font-bold mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Credit Limit</label>
                      <input 
                        type="number"
                        placeholder="5000"
                        value={newCardLimit} 
                        onChange={(e) => setNewCardLimit(e.target.value)}
                        className={`candy-input ${darkMode ? 'candy-input-dark' : 'candy-input-light'}`}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className={`block text-sm font-bold mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>APR %</label>
                        <input 
                          type="number"
                          placeholder="24.99"
                          value={newCardAPR} 
                          onChange={(e) => setNewCardAPR(e.target.value)}
                          className={`candy-input ${darkMode ? 'candy-input-dark' : 'candy-input-light'}`}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-bold mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Min Payment</label>
                        <input 
                          type="number"
                          placeholder="25"
                          value={newCardMinPayment} 
                          onChange={(e) => setNewCardMinPayment(e.target.value)}
                          className={`candy-input ${darkMode ? 'candy-input-dark' : 'candy-input-light'}`}
                        />
                      </div>
                    </div>
                    <div>
                      <label className={`block text-sm font-bold mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Payment Due Day</label>
                      <CandySelect darkMode={darkMode} value={newCardDueDay} onChange={(e) => setNewCardDueDay(e.target.value)}>
                        {Array.from({ length: 28 }, (_, i) => <option key={i + 1} value={i + 1}>Day {i + 1}</option>)}
                      </CandySelect>
                    </div>
                  </>
                )}
              </div>
              <div className="flex gap-3 mt-4">
                <CandyButton onClick={addCard}>
                  Add {addCardType === 'credit' ? 'Card' : 'Account'}
                </CandyButton>
                <CandyButton variant="ghost" onClick={() => { setShowAddCardModal(false); setAddCardType('credit'); }}>Cancel</CandyButton>
              </div>
            </CandyCard>
          </div>
        )}

        {/* Make Payment Modal */}
        {showPaymentModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <CandyCard darkMode={darkMode} className="max-w-sm w-full">
              <h3 className={`text-xl font-black mb-4 flex items-center gap-2 ${darkMode ? 'text-gray-100' : 'text-gray-700'}`}>
                💵 Make Payment
              </h3>
              {(() => {
                const card = creditCards.find(c => c.id === showPaymentModal);
                if (!card) return null;
                return (
                  <div className="space-y-4">
                    <div className={`p-3 rounded-xl text-center ${darkMode ? 'bg-[#1E1B2E]' : 'bg-gray-50'}`}>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{card.name}</p>
                      <p className="text-2xl font-bold text-rose-500">{formatMoney(card.balance)}</p>
                      <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Current Balance</p>
                    </div>
                    <div>
                      <label className={`block text-sm font-bold mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Payment Amount</label>
                      <input 
                        type="number"
                        placeholder={card.minPayment.toString()}
                        value={paymentAmount} 
                        onChange={(e) => setPaymentAmount(e.target.value)}
                        className={`candy-input ${darkMode ? 'candy-input-dark' : 'candy-input-light'}`}
                        autoFocus
                      />
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => setPaymentAmount(String(card.minPayment))}
                          className={`text-xs px-2 py-1 rounded-lg ${darkMode ? 'bg-purple-900/30 text-purple-400' : 'bg-purple-100 text-purple-600'}`}
                        >
                          Min ({formatMoney(card.minPayment)})
                        </button>
                        <button
                          onClick={() => setPaymentAmount(String(card.balance))}
                          className={`text-xs px-2 py-1 rounded-lg ${darkMode ? 'bg-emerald-900/30 text-emerald-400' : 'bg-emerald-100 text-emerald-600'}`}
                        >
                          Pay Full
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })()}
              <div className="flex gap-3 mt-4">
                <CandyButton onClick={() => makeCardPayment(showPaymentModal)}>Pay</CandyButton>
                <CandyButton variant="ghost" onClick={() => { setShowPaymentModal(null); setPaymentAmount(''); }}>Cancel</CandyButton>
              </div>
            </CandyCard>
          </div>
        )}

        {/* Deposit Modal for Debit Cards */}
        {showDepositModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <CandyCard darkMode={darkMode} className="max-w-sm w-full">
              <h3 className={`text-xl font-black mb-4 flex items-center gap-2 ${darkMode ? 'text-gray-100' : 'text-gray-700'}`}>
                💰 Make Deposit
              </h3>
              {(() => {
                const card = debitCards.find(c => c.id === showDepositModal);
                if (!card) return null;
                return (
                  <div className="space-y-4">
                    <div className={`p-3 rounded-xl text-center ${darkMode ? 'bg-[#1E1B2E]' : 'bg-gray-50'}`}>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{card.name}</p>
                      <p className="text-2xl font-bold text-emerald-500">{formatMoney(card.balance)}</p>
                      <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Current Balance</p>
                    </div>
                    <div>
                      <label className={`block text-sm font-bold mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Deposit Amount</label>
                      <input 
                        type="number"
                        placeholder="0.00"
                        value={depositAmount} 
                        onChange={(e) => setDepositAmount(e.target.value)}
                        className={`candy-input ${darkMode ? 'candy-input-dark' : 'candy-input-light'}`}
                        autoFocus
                      />
                    </div>
                  </div>
                );
              })()}
              <div className="flex gap-3 mt-4">
                <CandyButton onClick={() => makeDebitDeposit(showDepositModal)}>Deposit</CandyButton>
                <CandyButton variant="ghost" onClick={() => { setShowDepositModal(null); setDepositAmount(''); }}>Cancel</CandyButton>
              </div>
            </CandyCard>
          </div>
        )}

        {/* Withdraw Modal */}
        {showWithdrawModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <CandyCard darkMode={darkMode} className="max-w-sm w-full">
              <h3 className={`text-xl font-black mb-4 flex items-center gap-2 ${darkMode ? 'text-gray-100' : 'text-gray-700'}`}>
                💸 Make Withdrawal
              </h3>
              {(() => {
                const card = debitCards.find(c => c.id === showWithdrawModal);
                if (!card) return null;
                return (
                  <div className="space-y-4">
                    <div className={`p-3 rounded-xl text-center ${darkMode ? 'bg-[#1E1B2E]' : 'bg-gray-50'}`}>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{card.name}</p>
                      <p className="text-2xl font-bold text-emerald-500">{formatMoney(card.balance)}</p>
                      <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Current Balance</p>
                    </div>
                    <div>
                      <label className={`block text-sm font-bold mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Withdrawal Amount</label>
                      <input 
                        type="number"
                        placeholder="0.00"
                        value={withdrawAmount} 
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        className={`candy-input ${darkMode ? 'candy-input-dark' : 'candy-input-light'}`}
                        autoFocus
                      />
                    </div>
                  </div>
                );
              })()}
              <div className="flex gap-3 mt-4">
                <CandyButton onClick={() => makeDebitWithdrawal(showWithdrawModal)}>Withdraw</CandyButton>
                <CandyButton variant="ghost" onClick={() => { setShowWithdrawModal(null); setWithdrawAmount(''); }}>Cancel</CandyButton>
              </div>
            </CandyCard>
          </div>
        )}

        {/* Spend Credit Modal */}
        {showSpendModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <CandyCard darkMode={darkMode} className="max-w-sm w-full">
              <h3 className={`text-xl font-black mb-4 flex items-center gap-2 ${darkMode ? 'text-gray-100' : 'text-gray-700'}`}>
                🛒 Add Spending
              </h3>
              {(() => {
                const card = creditCards.find(c => c.id === showSpendModal);
                if (!card) return null;
                const utilizationPercent = card.creditLimit ? Math.round((card.balance / card.creditLimit) * 100) : 0;
                return (
                  <div className="space-y-4">
                    <div className={`p-3 rounded-xl text-center ${darkMode ? 'bg-[#1E1B2E]' : 'bg-gray-50'}`}>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{card.name}</p>
                      <p className="text-2xl font-bold text-rose-500">{formatMoney(card.balance)}</p>
                      <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Current Balance ({utilizationPercent}% used)</p>
                      {card.creditLimit && (
                        <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                          Available: {formatMoney(card.creditLimit - card.balance)}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className={`block text-sm font-bold mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Spend Amount</label>
                      <input 
                        type="number"
                        placeholder="0.00"
                        value={spendAmount} 
                        onChange={(e) => setSpendAmount(e.target.value)}
                        className={`candy-input ${darkMode ? 'candy-input-dark' : 'candy-input-light'}`}
                        autoFocus
                      />
                    </div>
                  </div>
                );
              })()}
              <div className="flex gap-3 mt-4">
                <CandyButton onClick={() => makeCreditCardSpend(showSpendModal)}>Add Spend</CandyButton>
                <CandyButton variant="ghost" onClick={() => { setShowSpendModal(null); setSpendAmount(''); }}>Cancel</CandyButton>
              </div>
            </CandyCard>
          </div>
        )}

        {showAchievements && (
          <div 
            className="fixed inset-0 z-50 bg-black/50"
            onTouchMove={(e) => e.preventDefault()}
            onClick={() => setShowAchievements(false)}
          >
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <div 
                className={`max-w-2xl w-full rounded-3xl border-2 shadow-2xl ${
                  darkMode 
                    ? 'bg-[#252233] border-[#3D3A4E]' 
                    : 'bg-white border-gray-200'
                }`}
                onClick={(e) => e.stopPropagation()}
                style={{ maxHeight: '80vh', display: 'flex', flexDirection: 'column' }}
              >
                {/* Fixed Header */}
                <div className={`p-6 pb-4 border-b flex-shrink-0 ${darkMode ? 'border-[#3D3A4E]' : 'border-gray-200'}`}>
                  <h3 className={`text-2xl font-black flex items-center gap-3 ${darkMode ? 'text-gray-100' : 'text-gray-700'}`}>
                    <Trophy className="w-8 h-8 text-yellow-500" />
                    Achievements
                    <span className={`text-lg ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>({unlockedAchievements.length}/{achievements.length})</span>
                  </h3>
                </div>
                
                {/* Scrollable Content */}
                <div 
                  className="p-6 pt-4 overflow-y-scroll flex-1"
                  onTouchMove={(e) => e.stopPropagation()}
                  style={{ 
                    WebkitOverflowScrolling: 'touch',
                    minHeight: 0
                  }}
                >
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pb-2">
                    {achievements.map(a => {
                      const unlocked = unlockedAchievements.includes(a.id);
                      return (
                        <div
                          key={a.id}
                          className={`p-4 rounded-2xl border-2 text-center transition-all ${
                            unlocked 
                              ? darkMode ? 'bg-yellow-900/30 border-yellow-600' : 'bg-yellow-50 border-yellow-300' 
                              : darkMode ? 'bg-[#1E1B2E] border-[#3D3A4E] opacity-50' : 'bg-gray-50 border-gray-200 opacity-50'
                          }`}
                        >
                          <div className="text-4xl mb-2">{a.icon}</div>
                          <p className={`font-bold ${darkMode ? 'text-gray-100' : 'text-gray-700'}`}>{a.name}</p>
                          <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{a.description}</p>
                          {unlocked && <p className="text-xs text-yellow-500 font-bold mt-2">✓ Unlocked!</p>}
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                {/* Fixed Footer */}
                <div className={`p-4 border-t flex-shrink-0 ${darkMode ? 'border-[#3D3A4E]' : 'border-gray-200'}`}>
                  <div className="flex justify-center">
                    <CandyButton variant="ghost" onClick={() => setShowAchievements(false)}>Close</CandyButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Achievement Popup */}
        {newAchievement && <AchievementPopup achievement={newAchievement} />}

        {/* Character Easter Egg */}
        {showCharacter && <CharacterPopup />}

        {/* Scroll to top button */}
        {showScrollTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 text-white shadow-lg shadow-pink-300/50 flex items-center justify-center btn-bounce z-30"
          >
            <ArrowUp className="w-6 h-6" />
          </button>
        )}
      </div>
      </div>
    </>
  );
}
