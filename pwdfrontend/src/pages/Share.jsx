import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api";
import Toast from "../components/Toast";
import useCopy from "../hooks/useCopy";
import { FaKey, FaEyeSlash, FaCopy } from "react-icons/fa6";

const center =
  "min-h-[calc(100vh-8rem)] md:min-h-[calc(100vh-10rem)] lg:min-h-[calc(100vh-12rem)] flex items-center justify-center px-4";

function Share() {
  const { token } = useParams();
  const [result, setResult] = useState({ status: "loading", label: "", password: "" });
  const [error, setError] = useState("");
  const { copied, triggerCopy, copyToken } = useCopy(result.password);

  useEffect(() => {
    api
      .get(`/api/share/${token}`)
      .then(({ data }) =>
        setResult({ status: "success", label: data.label, password: data.password })
      )
      .catch((err) => {
        setResult({ status: "error", label: "", password: "" });
        setError(err.response?.data?.error || "Invalid share link");
      });
  }, [token]);

  if (result.status === "loading") {
    return (
      <div className={center}>
        <div className="flex flex-col items-center gap-3 text-stone-400">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-green-500" />
          <p className="text-sm">Loading shared password…</p>
        </div>
      </div>
    );
  }

  if (result.status === "error") {
    return (
      <div className={center}>
        <div className="w-full max-w-sm card text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-stone-400">
            <FaEyeSlash />
          </div>
          <h1 className="text-xl font-bold">Link unavailable</h1>
          <p className="text-sm text-stone-400">{error}</p>
          <Link
            to="/"
            className="px-4 py-2 rounded-lg border border-white/15 hover:bg-white/10 text-white font-medium transition-colors"
          >
            Back to home
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
          <p className="text-lg font-medium">{result.label}</p>
        </div>

        <div className="flex items-center gap-2 text-left">
          <input
            type="text"
            readOnly
            value={result.password}
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

        <p className="text-xs text-stone-500">This link can only be viewed once.</p>
      </div>

      <Toast token={copyToken} message="Copied to clipboard" />
    </div>
  );
}

export default Share;