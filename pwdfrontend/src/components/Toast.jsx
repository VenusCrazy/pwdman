import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";

function Toast({ token, message }) {
  const [prevToken, setPrevToken] = useState(0);
  const [visible, setVisible] = useState(false);

  if (token > 0 && token !== prevToken) {
    setPrevToken(token);
    setVisible(true);
  }

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => setVisible(false), 1200);
    return () => clearTimeout(timer);
  }, [visible, prevToken]);

  return (
    <div
      className={`fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-lg border border-white/10 bg-neutral-900 px-4 py-2 text-sm text-white shadow-lg shadow-black/40 transition-all duration-300 pointer-events-none ${
        visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      }`}
    >
      <FaCheck className="text-green-500" />
      {message}
    </div>
  );
}

export default Toast;