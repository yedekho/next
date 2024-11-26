import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PenLine, LogIn, UserPlus } from 'lucide-react';

const words = ['CONTENT', 'TEXT', 'IMAGES', 'IDEAS', 'CREATIONS'];

export default function Home() {
  const navigate = useNavigate();
  const [wordIndex, setWordIndex] = React.useState(0);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [text, setText] = React.useState('');
  const [delta, setDelta] = React.useState(200);

  React.useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => clearInterval(ticker);
  }, [text, isDeleting, wordIndex]);

  const tick = () => {
    let currentWord = words[wordIndex];
    let updatedText = isDeleting 
      ? currentWord.substring(0, text.length - 1)
      : currentWord.substring(0, text.length + 1);

    setText(updatedText);

    if (!isDeleting && updatedText === currentWord) {
      setIsDeleting(true);
      setDelta(100);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
      setDelta(200);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-light tracking-tight text-gray-900 mb-4">
          SHARE YOUR{' '}
          <span className="font-medium relative">
            <span className="inline-block min-w-[120px] border-r-2 border-gray-900">
              {text}
            </span>
          </span>
        </h1>
      </div>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        <button 
          onClick={() => navigate('/publish')}
          className="group relative px-8 py-3 bg-black text-white rounded-full overflow-hidden transition-all duration-300 hover:bg-gray-900 flex items-center justify-center gap-2"
        >
          <PenLine className="w-4 h-4" />
          <span className="font-medium">PUBLISH</span>
          <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        </button>

        <button className="group relative px-8 py-3 bg-gray-100 text-gray-900 rounded-full overflow-hidden transition-all duration-300 hover:bg-gray-200 flex items-center justify-center gap-2">
          <LogIn className="w-4 h-4" />
          <span className="font-medium">LOGIN</span>
          <div className="absolute inset-0 bg-black/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        </button>

        <button className="group relative px-8 py-3 bg-gray-100 text-gray-900 rounded-full overflow-hidden transition-all duration-300 hover:bg-gray-200 flex items-center justify-center gap-2">
          <UserPlus className="w-4 h-4" />
          <span className="font-medium">SIGN UP</span>
          <div className="absolute inset-0 bg-black/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        </button>
      </div>
    </div>
  );
}