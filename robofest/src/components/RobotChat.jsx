import { useEffect, useRef, useState } from 'react';
import { Bot, X, Send, ArrowUpRight, GripVertical } from 'lucide-react';
import { answerQuestion } from './robotAnswers.js';
import './RobotChat.css';

function keepOnScreen(position, panel) {
  const { width, height } = panel.getBoundingClientRect();
  return {
    x: Math.max(12, Math.min(position.x, document.documentElement.clientWidth - width - 12)),
    y: Math.max(12, Math.min(position.y, window.innerHeight - height - 12)),
  };
}

const suggestions = ['What events are there?', 'How do I register?', 'Team sizes?', 'When is Robofest?', 'Do I need experience?'];

export default function RobotChat({ open, onClose, events, faqs }) {
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState('');
  const [position, setPosition] = useState(null);
  const [dragging, setDragging] = useState(false);
  const dragRef = useRef(null);
  const panelRef = useRef(null);
  const inputRef = useRef(null);
  const logRef = useRef(null);
  useEffect(() => {
    setDragging(false);
    if (open) inputRef.current?.focus({ preventScroll: true });
  }, [open]);
  useEffect(() => {
    if (open && logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [messages, open]);
  useEffect(() => {
    if (!open) return;
    const dismissOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) onClose(false);
    };
    document.addEventListener('pointerdown', dismissOutside);
    return () => document.removeEventListener('pointerdown', dismissOutside);
  }, [open, onClose]);
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const reposition = () => setPosition(previous => {
      if (!previous) return previous;
      const next = keepOnScreen(previous, panel);
      return next.x === previous.x && next.y === previous.y ? previous : next;
    });
    const observer = new ResizeObserver(reposition);
    observer.observe(panel);
    window.addEventListener('resize', reposition);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', reposition);
      dragRef.current = null;
    };
  }, [open]);
  if (!open) return null;
  function startDrag(event) {
    if (!event.isPrimary || event.button !== 0) return;
    const bounds = panelRef.current.getBoundingClientRect();
    dragRef.current = { pointerId: event.pointerId, offsetX: event.clientX - bounds.left, offsetY: event.clientY - bounds.top };
    event.currentTarget.setPointerCapture(event.pointerId);
    event.preventDefault();
    setPosition(keepOnScreen({ x: bounds.left, y: bounds.top }, panelRef.current));
    setDragging(true);
  }
  function moveDrag(event) {
    const drag = dragRef.current;
    if (!drag || event.pointerId !== drag.pointerId) return;
    setPosition(keepOnScreen({ x: event.clientX - drag.offsetX, y: event.clientY - drag.offsetY }, panelRef.current));
  }
  function stopDrag(event) {
    if (dragRef.current?.pointerId !== event.pointerId) return;
    dragRef.current = null;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }
  function moveWithKeyboard(event) {
    const directions = { ArrowLeft: [-20, 0], ArrowRight: [20, 0], ArrowUp: [0, -20], ArrowDown: [0, 20] };
    if (event.key === 'Home') { event.preventDefault(); setPosition(null); return; }
    const direction = directions[event.key];
    if (!direction) return;
    event.preventDefault();
    const bounds = panelRef.current.getBoundingClientRect();
    setPosition(keepOnScreen({ x: bounds.left + direction[0], y: bounds.top + direction[1] }, panelRef.current));
  }
  function ask(text) {
    const value = text.trim();
    if (!value) return;
    const answer = answerQuestion(value, events, faqs);
    setMessages(previous => [...previous.slice(-38), { role: 'user', text: value }, { role: 'bolt', ...answer }]);
    setQuestion('');
    inputRef.current?.focus({ preventScroll: true });
  }
  return (
    <section ref={panelRef} className={`bolt-chat${dragging ? " bolt-chat-dragging" : ""}`}
      style={position ? { left: position.x, top: position.y, right: "auto", bottom: "auto", animation: "none" } : undefined} id="bolt-chat" role="dialog" aria-modal="false" aria-labelledby="bolt-chat-title"
      onKeyDown={e => { if (e.key === 'Escape') { e.stopPropagation(); onClose(); } }}>
      <header className="bolt-chat-header">
        <div className="bolt-chat-drag-handle" tabIndex={0} role="group"
          aria-label="Move chat: drag here, or use arrow keys. Home resets position."
          title="Drag to move · Arrow keys to reposition"
          onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={stopDrag}
          onPointerCancel={stopDrag} onLostPointerCapture={stopDrag} onKeyDown={moveWithKeyboard}>
          <span className="bolt-chat-avatar"><Bot size={24} /></span>
          <div><h2 id="bolt-chat-title">Ask Bolt</h2><p>Your Robofest event guide</p></div>
          <GripVertical size={16} className="bolt-chat-grip" aria-hidden="true" />
        </div>
        <button type="button" className="bolt-chat-close" onClick={onClose} aria-label="Close chat"><X size={20} /></button>
      </header>
      <div className="bolt-chat-log" role="log" aria-label="Conversation with Bolt" aria-live="polite" aria-relevant="additions" ref={logRef}>
        <div className="bolt-message bolt-message-bolt"><span>BOLT</span><p>Hey! Got a doubt? I can help with events, team sizes, dates, and registration.</p></div>
        {messages.map((message, i) => <div key={i} className={`bolt-message bolt-message-${message.role}`}>
          <span>{message.role === 'user' ? 'YOU' : 'BOLT'}</span><p>{message.text}</p>
          {message.link && <a href={message.link} target="_blank" rel="noreferrer">Official event details <ArrowUpRight size={14} /></a>}
        </div>)}
      </div>
      <div className="bolt-suggestions" aria-label="Suggested questions">
        {suggestions.map(text => <button type="button" key={text} onClick={() => ask(text)}>{text}</button>)}
      </div>
      <form className="bolt-chat-form" onSubmit={e => { e.preventDefault(); ask(question); }}>
        <label className="sr-only" htmlFor="bolt-question">Your question for Bolt</label>
        <input ref={inputRef} id="bolt-question" value={question} onChange={e => setQuestion(e.target.value)} maxLength={300} placeholder="Ask about Robofest…" autoComplete="off" />
        <button type="submit" disabled={!question.trim()} aria-label="Send question"><Send size={19} /></button>
      </form>
      <p className="bolt-chat-note">Answers from this site’s event guide. Check official updates for new editions.</p>
    </section>
  );
}
