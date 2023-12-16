import { useState, useRef, useEffect } from 'react';

const useTyping = () => {
  const [text, setText] = useState(' ');
  const [key, setKey] = useState(0);

  const typeStart = (text = '') => {
    setKey(current => current + 1);
    setText(text);
  };
  const typeEnd = (timer) => {
    clearTimeout(timer);
  };

  return {
    typeStart,
    typeEnd,
    key,
    text,
  }

};

const TypeWriterText = ({ text, typeEnd }) => {
  const [message, setMessage] = useState(' ');
  const timer = useRef(null);
  const msgEl = useRef(null);
  useEffect(() => {
    const charItr = text[Symbol.iterator]();
    const showChar = () => {
      const nextChar = charItr.next();
      if(nextChar.done) {
        typeEnd(timer.current);
        return;
      }
      setMessage(current => current + nextChar.value);
    }
    timer.current = setInterval(showChar, 40);

    return () => clearTimeout(timer.current);
  }, []);

  useEffect(() => {
    const el = msgEl.current;
    if(el.clientHeight < el.scrollHeight) {
      el.scrollTop = el.scrollHeight - el.clientHeight;
    }
  })

  return (
    <p ref={msgEl} style={{ whiteSpace: 'pre-line' }}>
      {message}
    </p>
  );
}

export { useTyping, TypeWriterText };