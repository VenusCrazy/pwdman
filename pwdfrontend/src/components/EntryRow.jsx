import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaCopy, FaTrashCan, FaShareNodes } from "react-icons/fa6";
import Toast from "./Toast";
import useCopy from "../hooks/useCopy";

function EntryRow({ entry, onDelete }) {
  const [revealed, setRevealed] = useState(false);
  const { copied, triggerCopy, copyToken } = useCopy(entry.password);
  const navigate = useNavigate();

  function handleShare() {
    navigate(`/share-preview/${entry.id}`);
  }

  return (
    <div className="flex items-center justify-between py-3 gap-2 -mx-6 px-6 transition-[background-color] hover:bg-white/5">
      <div className="min-w-0">
        <p className="text-sm font-medium text-white/90 truncate">{entry.label}</p>
        <p className="text-sm font-mono tracking-wide text-neutral-400 truncate">
          {revealed ? entry.password : "••••••••"}
        </p>
      </div>

      <div className="flex items-center gap-1 shrink-0">
        <button
          onClick={() => setRevealed((prev) => !prev)}
          className="p-2 rounded-lg text-neutral-400 transition hover:text-white hover:scale-105 cursor-pointer"
          aria-label={revealed ? "Hide password" : "Reveal password"}
        >
          {revealed ? <FaEyeSlash /> : <FaEye />}
        </button>

        <button
          onClick={triggerCopy}
          className={`p-2 rounded-lg transition-all cursor-pointer ${
            copied
              ? "text-green-500 bg-green-600/10 scale-105"
              : "text-neutral-400 hover:text-white hover:scale-105"
          }`}
          aria-label="Copy password"
        >
          <FaCopy />
        </button>

        <button
          onClick={handleShare}
          className="p-2 rounded-lg text-neutral-400 transition hover:text-white hover:scale-105 cursor-pointer"
          aria-label="Share entry"
        >
          <FaShareNodes />
        </button>

        <button
          onClick={() => onDelete(entry.id)}
          className="p-2 rounded-lg text-neutral-400 transition hover:text-red-500 hover:scale-105 cursor-pointer"
          aria-label="Delete entry"
        >
          <FaTrashCan />
        </button>
      </div>

      <Toast token={copyToken} message="Copied to clipboard" />
    </div>
  );
}

export default EntryRow;