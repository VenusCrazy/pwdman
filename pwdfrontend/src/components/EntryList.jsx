import EntryRow from "./EntryRow";
import { FaLock } from "react-icons/fa6";

function EntryList({ entries, setEntries }) {
  function handleDelete(id) {
    setEntries(entries.filter((entry) => entry.id !== id));
  }

  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
        <h3 className="text-lg font-bold tracking-wide text-white">Saved Entries</h3>
        <span className="text-sm px-2 py-0.5 rounded-lg bg-green-600/20 text-green-500 font-semibold tabular-nums">
          {entries.length}
        </span>
      </div>

      {entries.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-3 py-10 text-center">
          <FaLock className="text-4xl text-neutral-600" />
          <p className="text-sm font-medium text-neutral-400">No passwords saved yet</p>
          <p className="text-neutral-500 text-sm">Generate one to get started</p>
        </div>
      ) : (
        <div className="divide-y divide-white/10">
          {entries.map((entry) => (
            <EntryRow key={entry.id} entry={entry} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}

export default EntryList;