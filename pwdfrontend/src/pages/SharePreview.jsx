import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useVault from "../hooks/useVault";
import Toast from "../components/Toast";
import useCopy from "../hooks/useCopy";
import { FaKey, FaEyeSlash, FaTriangleExclamation, FaCopy } from "react-icons/fa6";

const center =
  "min-h-[calc(100vh-8rem)] md:min-h-[calc(100vh-10rem)] lg:min-h-[calc(100vh-12rem)] flex items-center justify-center px-4";

function SharePreview() {
  const { id } = useParams();
  const [entries, setEntries] = useVault();

  const entry = entries.find((e) => e.id === id);

  const [wasUnviewedOnLoad] = useState(() => entry && !entry.viewed);
  const { copied, triggerCopy, copyToken } = useCopy(entry ? entry.password : "");

  useEffect(() => {
    if (entry && !entry.viewed) {
      setEntries(
        entries.map((e) =>
          e.id === id ? { ...e, viewed: true } : e
        )
      );
    }
  }, [id]);

  if (!entry) {
    return (
      <div className={center}>
        <div className="w-full max-w-sm card text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-stone-400">
            <FaTriangleExclamation />
          </div>
          <h1 className="text-xl font-bold">Entry not found</h1>
          <p className="text-sm text-stone-400">
            This share link is invalid or the entry has been deleted.
          </p>
          <Link
            to="/"
            className="px-4 py-2 rounded-lg border border-white/15 hover:bg-white/10 text-white font-medium transition-colors"
          >
            Back to vault
          </Link>
        </div>
      </div>
    );
  }

  if (!wasUnviewedOnLoad) {
    return (
      <div className={center}>
        <div className="w-full max-w-sm card text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-stone-400">
            <FaEyeSlash />
          </div>
          <h1 className="text-xl font-bold">Link already used</h1>
          <p className="text-sm text-stone-400">
            This one-time password link has already been viewed.
          </p>
          <Link
            to="/"
            className="px-4 py-2 rounded-lg border border-white/15 hover:bg-white/10 text-white font-medium transition-colors"
          >
            Back to vault
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={center}>
      <div className="w-full max-w-md card text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-600/10 text-green-500">
          <FaKey />
        </div>
        <h1 className="text-xl font-bold">Shared Password</h1>
        <p className="text-sm text-stone-400">This password was shared with you.</p>

        <div className="h-px bg-white/10" />

        <div>
          <p className="text-sm text-stone-400 mb-1">Label</p>
          <p className="text-lg font-medium">{entry.label}</p>
        </div>

        <div className="flex items-center gap-2 text-left">
          <input
            type="text"
            readOnly
            value={entry.password}
            className="flex-1 rounded-lg border border-white/10 bg-black/40 px-4 py-2.5 font-mono text-sm text-white outline-none"
          />
          <button
            onClick={triggerCopy}
            className={`p-2.5 rounded-lg transition-colors ${
              copied
                ? "text-green-500 bg-green-600/10"
                : "text-stone-400 hover:text-white hover:bg-white/10"
            }`}
            aria-label="Copy password"
          >
            <FaCopy />
          </button>
        </div>

        <p className="text-xs text-stone-500">
          This link can only be viewed once.
        </p>

        <Link
          to="/"
          className="px-4 py-2 rounded-lg border border-white/15 hover:bg-white/10 text-white font-medium transition-colors"
        >
          Back to vault
        </Link>
      </div>

      <Toast token={copyToken} message="Copied to clipboard" />
    </div>
  );
}

export default SharePreview;