import { useState } from "react";
import { FaVault } from "react-icons/fa6";
import useVault from "../hooks/useVault";
import PasswordGenerator from "../components/PasswordGenerator";
import SaveEntry from "../components/SaveEntry";
import EntryList from "../components/EntryList";

function Vault() {
  const [generatedPassword, setGeneratedPassword] = useState("");
  const { entries, addEntry, deleteEntry } = useVault();

  return (
    <div className="relative min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)] lg:min-h-[calc(100vh-6rem)] bg-black overflow-hidden">
      <div className="pointer-events-none absolute -top-24 -right-16 h-80 w-80 rounded-full bg-green-600/20 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -left-24 h-96 w-96 rounded-full bg-green-600/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -left-20 h-80 w-80 rounded-full border border-green-500/15" />
      <div className="pointer-events-none absolute -bottom-12 left-0 h-48 w-48 rounded-full border border-green-500/10" />

      <div className="relative max-w-5xl mx-auto px-4 py-8 md:py-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-green-500/25 bg-green-600/15 text-green-500">
            <FaVault className="text-2xl" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              Vault Dashboard
            </h1>
            <p className="text-neutral-400 text-sm leading-relaxed mt-1">
              Generate, save, and manage your passwords.
            </p>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <PasswordGenerator
              generatedPassword={generatedPassword}
              onGenerated={setGeneratedPassword}
            />
            <SaveEntry
              generatedPassword={generatedPassword}
              onSave={addEntry}
            />
          </div>

          <EntryList entries={entries} onDelete={deleteEntry} />
        </div>
      </div>
    </div>
  );
}

export default Vault;