import { useState, useEffect } from "react";

function useVault() {
  const [entries, setEntries] = useState(() => {
    try {
      const saved = localStorage.getItem("entries");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  })

  useEffect(()=>{
    localStorage.setItem("entries",  JSON.stringify(entries))
   },[entries])

   return [entries,setEntries];
}

export default useVault;