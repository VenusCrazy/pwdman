import { useState } from "react";
import { FaTag, FaKey } from "react-icons/fa6";

const CLASSES = [
  { re: /[a-z]/, size: 26 },
  { re: /[A-Z]/, size: 26 },
  { re: /\d/, size: 10 },
  { re: /[^a-zA-Z0-9]/, size: 32 },
];

function longestSequenceRun(password) {
  let longest = 1;
  let current = 1;
  let prevDiff = null;

  for (let i = 1; i < password.length; i++) {
    const diff = password.charCodeAt(i) - password.charCodeAt(i - 1);

    if ((diff === 1 || diff === -1) && diff === prevDiff) {
      current++;
    } else if (diff === 1 || diff === -1) {
      current = 2;
    } else {
      current = 1;
    }

    longest = Math.max(longest, current);
    prevDiff = diff;
  }

  return longest;
}

function scorePassword(password) {
  const uniqueChars = new Set(password).size;

  const pool = CLASSES.reduce(
    (width, c) => width + (c.re.test(password) ? c.size : 0),
    0
  );

  const run = longestSequenceRun(password);
  const penalty = run >= 4 ? (run - 1) * Math.log2(pool) : 0;
  const bits = (pool > 0 ? uniqueChars * Math.log2(pool) : 0) - penalty;

  if (bits < 40) return { tier: 1, label: "Weak", bar: "bg-red-500", text: "text-red-500" };
  if (bits < 60) return { tier: 2, label: "Fair", bar: "bg-amber-500", text: "text-amber-500" };
  if (bits < 80) return { tier: 3, label: "Strong", bar: "bg-green-600", text: "text-green-600" };
  return { tier: 4, label: "Very strong", bar: "bg-green-400", text: "text-green-400" };
}

function SaveEntry({ generatedPassword, entries, setEntries }) {
  const [label, setLabel] = useState("");
  const [password, setPassword] = useState("");
  const strength = scorePassword(password);

  function handleSave() {
    const newEntry = {
      id: crypto.randomUUID(),
      label: label,
      password: password,
      viewed: false,
    };
    setEntries([...entries, newEntry]);
    setLabel("");
    setPassword("");
  }

  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-6 flex flex-col gap-4">
      <h3 className="text-lg font-bold tracking-wide text-white mb-4 pb-4 border-b border-white/10">
        Save Entry
      </h3>

      <div className="flex items-center gap-3 rounded-lg border border-white/15 bg-transparent px-3 py-2 transition-colors focus-within:border-green-500/50 focus-within:ring-1 focus-within:ring-green-500/20">
        <FaTag className="text-neutral-500" />
        <input
          type="text"
          placeholder="Label"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="flex-1 bg-transparent text-sm text-white placeholder:text-neutral-500 outline-none"
        />
      </div>

      <div className="flex items-center gap-3 rounded-lg border border-white/15 bg-transparent px-3 py-2 transition-colors focus-within:border-green-500/50 focus-within:ring-1 focus-within:ring-green-500/20">
        <FaKey className="text-neutral-500" />
        <input
          type="text"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="flex-1 bg-transparent text-sm text-white placeholder:text-neutral-500 outline-none"
        />
      </div>

      {password && (
        <div className="flex items-center gap-2">
          <div className="flex flex-1 gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full ${
                  i < strength.tier ? strength.bar : "bg-white/10"
                }`}
              />
            ))}
          </div>
          <span className={`text-xs font-semibold tracking-wide ${strength.text}`}>
            {strength.label}
          </span>
        </div>
      )}

      <button
        onClick={() => setPassword(generatedPassword)}
        className="px-4 py-2.5 rounded-lg border border-white/15 hover:bg-white/10 text-white text-sm font-medium tracking-wide transition-colors cursor-pointer"
      >
        Use generated password
      </button>

      <button
        onClick={handleSave}
        className="px-4 py-2.5 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-semibold tracking-wide transition-colors cursor-pointer"
      >
        Save
      </button>
    </div>
  );
}

export default SaveEntry;