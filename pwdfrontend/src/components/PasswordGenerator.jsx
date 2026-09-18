import { useState } from "react";
import { FaCopy } from "react-icons/fa6";
import Toast from "./Toast";
import useCopy from "../hooks/useCopy";

const sliderCSS = `
.vault-range{
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 6px;
  border-radius: 0.5rem;
  background: linear-gradient(
    to right,
    rgb(22 163 74) var(--fill, 0%),
    rgba(255, 255, 255, 0.1) var(--fill, 0%)
  );
  outline: none;
}
.vault-range::-webkit-slider-thumb{
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 9999px;
  background: white;
  border: 2px solid rgb(34 197 94);
  cursor: pointer;
  transition: box-shadow 0.15s ease, transform 0.15s ease;
}
.vault-range::-webkit-slider-thumb:hover,
.vault-range:focus-visible::-webkit-slider-thumb{
  box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.2);
  transform: scale(1.1);
}
.vault-range::-moz-range-thumb{
  width: 18px;
  height: 18px;
  border-radius: 9999px;
  background: white;
  border: 2px solid rgb(34 197 94);
  cursor: pointer;
}
`;

function PasswordGenerator({ generatedPassword, onGenerated }) {
  const [length, setLength] = useState(12);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const { copied, triggerCopy, copyToken } = useCopy(generatedPassword);

  function generate() {
    let pool = "";
    if (useLower) pool += "abcdefghijklmnopqrstuvwxyz";
    if (useUpper) pool += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (useNumbers) pool += "0123456789";
    if (useSymbols) pool += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (pool === "") {
      onGenerated("Pick at least one option!");
      return;
    }

    const array = new Uint32Array(length);
    crypto.getRandomValues(array);

    let password = "";
    for (let i = 0; i < length; i++) {
      password += pool[array[i] % pool.length];
    }
    onGenerated(password);
  }

  const options = [
    { label: "Uppercase", value: useUpper, toggle: setUseUpper },
    { label: "Lowercase", value: useLower, toggle: setUseLower },
    { label: "Numbers", value: useNumbers, toggle: setUseNumbers },
    { label: "Symbols", value: useSymbols, toggle: setUseSymbols },
  ];

  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-6 flex flex-col gap-4">
      <style>{sliderCSS}</style>
      <h2 className="text-lg font-bold tracking-wide text-white mb-4 pb-4 border-b border-white/10">
        Password Generator
      </h2>

      <div className="flex items-center justify-between">
        <label htmlFor="length" className="text-sm font-medium text-neutral-300">
          Length
        </label>
        <span className="text-sm px-2 py-0.5 rounded-lg border border-white/10 bg-neutral-900 font-semibold tabular-nums">
          {length}
        </span>
      </div>

      <input
        id="length"
        type="range"
        min="6"
        max="32"
        value={length}
        onChange={(e) => setLength(Number(e.target.value))}
        className="vault-range"
        style={{ "--fill": `${((length - 6) / 26) * 100}%` }}
      />

      <div className="grid grid-cols-2 gap-3">
        {options.map((opt) => (
          <label
            key={opt.label}
            className="flex items-center gap-3 px-3 py-2 rounded-lg border border-white/15 bg-transparent text-sm font-medium text-neutral-400 cursor-pointer transition-colors has-[:checked]:border-green-500 has-[:checked]:bg-green-600/10 has-[:checked]:text-white"
          >
            <input
              type="checkbox"
              checked={opt.value}
              onChange={(e) => opt.toggle(e.target.checked)}
              className="accent-green-600"
            />
            {opt.label}
          </label>
        ))}
      </div>

      <button
        onClick={generate}
        className="w-full px-4 py-2.5 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-semibold tracking-wide transition-colors cursor-pointer"
      >
        Generate
      </button>

      {generatedPassword && (
        <div className="flex items-center gap-3 rounded-lg border border-white/15 bg-neutral-950 p-4">
          <input
            type="text"
            value={generatedPassword}
            readOnly
            className="flex-1 bg-transparent font-mono text-lg tracking-wide text-white outline-none"
          />
          <button
            onClick={triggerCopy}
            className={`p-2 rounded-lg transition-colors shrink-0 cursor-pointer ${
              copied
                ? "text-green-500 bg-green-600/10"
                : "text-neutral-400 hover:text-white"
            }`}
            aria-label="Copy generated password"
          >
            <FaCopy />
          </button>
        </div>
      )}

      <Toast token={copyToken} message="Copied to clipboard" />
    </div>
  );
}

export default PasswordGenerator;