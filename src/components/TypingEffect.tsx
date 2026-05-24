import { useEffect, useState } from "react";

interface TypingEffectProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export default function TypingEffect({
  words,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
}: TypingEffectProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const activeWord = words[currentWordIndex];

    const handleTyping = () => {
      if (!isDeleting) {
        // Typing text
        const nextText = activeWord.slice(0, currentText.length + 1);
        setCurrentText(nextText);

        if (nextText === activeWord) {
          // Pause before deleting
          timer = setTimeout(() => setIsDeleting(true), pauseDuration);
        } else {
          timer = setTimeout(handleTyping, typingSpeed);
        }
      } else {
        // Deleting text
        const nextText = activeWord.slice(0, currentText.length - 1);
        setCurrentText(nextText);

        if (nextText === "") {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        } else {
          timer = setTimeout(handleTyping, deletingSpeed);
        }
      }
    };

    timer = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className="font-mono text-xl sm:text-2xl md:text-3xl font-medium tracking-wide">
      <span className="bg-gradient-to-r from-neon-blue to-neon-cyan bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(0,240,255,0.25)]">
        {currentText}
      </span>
      <span className="ml-1 inline-block w-[3px] h-[1.3em] bg-neon-cyan animate-pulse align-middle" />
    </span>
  );
}
