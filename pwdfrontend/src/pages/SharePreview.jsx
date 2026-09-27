import { Link, useLocation } from "react-router-dom";
import { FaShareNodes, FaTriangleExclamation, FaCopy } from "react-icons/fa6";
import Toast from "../components/Toast";
import useCopy from "../hooks/useCopy";

const center =
  "min-h-[calc(100vh-8rem)] md:min-h-[calc(100vh-10rem)] lg:min-h-[calc(100vh-12rem)] flex items-center justify-center px-4";

function SharePreview() {
  const location = useLocation();
  const url = location.state?.url;
  const { copied, triggerCopy, copyToken } = useCopy(url || "");

  if (!url) {
    return (
      <div className={center}>
        <div className="w-full max-w-sm card text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-stone-400">
            <FaTriangleExclamation />
          </div>
          <h1 className="text-xl font-bold">No active share link</h1>
          <p className="text-sm text-stone-400">
            Go to your vault and press the share icon to create a link.
          </p>
          <Link
            to="/vault"
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
          <FaShareNodes />
        </div>
        <h1 className="text-xl font-bold">Share link ready</h1>
        <p className="text-sm text-stone-400">
          Send this link to anyone. It can be opened once and expires after 1 hour.
        </p>

        <div className="h-px bg-white/10" />

        <div className="flex items-center gap-2 text-left">
          <input
            type="text"
            readOnly
            value={url}
            className="flex-1 rounded-lg border border-white/10 bg-black/40 px-4 py-2.5 font-mono text-sm text-white outline-none"
          />
          <button
            onClick={triggerCopy}
            className={`p-2.5 rounded-lg transition-colors ${
              copied
                ? "text-green-500 bg-green-600/10"
                : "text-stone-400 hover:text-white hover:bg-white/10"
            }`}
            aria-label="Copy link"
          >
            <FaCopy />
          </button>
        </div>

        <Link
          to="/vault"
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