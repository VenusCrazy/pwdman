import { useEffect, useState } from "react";
import { FaCheck, FaCircleExclamation } from "react-icons/fa6";

function Toast({ token, message, variant = "success", duration = 1200 }) {
  const [prevToken, setPrevToken] = useState(0);
  const [visible, setVisible] = useState(false);
  const isError = variant === "error";

  if (token > 0 && token !== prevToken) {
    setPrevToken(token);
    setVisible(true);
  }

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [visible, prevToken, duration]);

  return (
    <div
      className={`fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-lg border bg-neutral-900 px-4 py-2 text-sm shadow-lg shadow-black/40 transition-all duration-300 pointer-events-none ${
        isError ? "border-red-500/30 text-red-300" : "border-white/10 text-white"
      } ${visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
    >
      {isError ? (
        <FaCircleExclamation className="text-red-500" />
      ) : (
        <FaCheck className="text-green-500" />
      )}
      {message}
    </div>
  );
}

export default Toast;