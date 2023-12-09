import { useState, useRef, useEffect } from 'react';

const useTyping = () => {
  const [text, setText] = useState('');
  const [key, setKey] = useState('');

  const typeStart = (text = '') => {
    setKey(current => current + 1);
    setText(text);
  };
  const typeEnd = () => {
    // do nothing
  };

  return {
    typeStart,
    typeEnd,
    key,
    text,
  }

};

const TypeWriterText = ({ text, typeEnd }) => {
  const [message, setMessage] = useState('');
  const msgEl = useRef(null);
  useEffect(() => {
    const charItr = text[Symbol.iterator]();
    let timer;

    (function showChar() {
      const nextChar = charItr.next();
      if(nextChar.done) {
        typeEnd();
        return;
      }
      setMessage(current => current + nextChar.value);
      timer = setTimeout(showChar, 50);
    }());

    return () => clearTimeout(timer);

  }, []);

  useEffect(() => {
    const el = msgEl.current;
    if(el.clientHeight < el.scrollHeight) {
      el.scrollTop = el.scrollHeight - el.clientHeight;
    }
  })

  return (
    <p ref={msgEl}>
      {message}
    </p>
  );
}

export { useTyping, TypeWriterText };