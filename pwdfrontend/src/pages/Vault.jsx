import { useState } from "react";
import useVault from "../hooks/useVault";
import PasswordGenerator from "../components/PasswordGenerator";
import SaveEntry from "../components/SaveEntry";
import EntryList from "../components/EntryList";

function Vault() {
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [entries, setEntries] = useVault();

  return (
    <div className="min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)] lg:min-h-[calc(100vh-6rem)] bg-black">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold tracking-tight text-white mb-1">Vault Dashboard</h1>
        <p className="text-neutral-400 text-sm leading-relaxed mb-8">
          Generate, save, and manage your passwords.
        </p>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <PasswordGenerator
              generatedPassword={generatedPassword}
              onGenerated={setGeneratedPassword}
            />
            <SaveEntry
              generatedPassword={generatedPassword}
              entries={entries}
              setEntries={setEntries}
            />
          </div>

          <EntryList entries={entries} setEntries={setEntries} />
        </div>
      </div>
    </div>
  );
}

export default Vault;