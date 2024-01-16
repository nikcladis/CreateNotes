import { useEffect, useState } from "react";
import { Note } from "./models/note";
import NoteCard from "@/components/custom/Note";
import { ModeToggle } from "./components/ui/mode-toggle";

function App() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const response = await fetch("/api/notes/", {
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
    <>
      <header className="relative p-4">
        <h1 className="text-2xl">Notes</h1>
        <button className="absolute top-4 right-4">
          <ModeToggle />
        </button>
      </header>
      <main className="p-4">
        <article className="flex flex-col md:flex-row flex-wrap gap-3">
          {notes.map((note) => {
            return <NoteCard key={note._id} note={note} />;
          })}
        </article>
      </main>
    </>
  );
}

export default App;
