import { useEffect, useState } from "react";
import { Note } from "./models/note";

function App() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const response = await fetch("/api/notes", {
          method: "GET",
        });

        console.log(response);

        const fetchedNotes = await response.json();
        setNotes(fetchedNotes);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    };

    loadNotes();
  }, []);

  return (
    <div className="bg-black h-screen p-4 text-white">
      {JSON.stringify(notes)}
    </div>
  );
}

export default App;
