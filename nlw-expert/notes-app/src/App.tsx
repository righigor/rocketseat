import { ChangeEvent, useState } from 'react';
import logo from './assets/Logo.svg';
import NewNoteCard from './components/NewNoteCard';
import NoteCard from './components/NoteCard';

type Note = {
  id: string,
  date: Date,
  content: string,
}

function App() {
  const [search, setSearch] = useState('');
  const [notes, setNotes] = useState<Note[]>(() => {
    const lsNotes = localStorage.getItem('notes');
    if (lsNotes) {
      return JSON.parse(lsNotes);
    }
    return [];
  });

  function onNoteCreated(content: string) {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    }
    const notesArray = [newNote, ...notes];
    setNotes(notesArray);

    localStorage.setItem('notes', JSON.stringify(notesArray));
  }

  function onNoteDeleted(id: string) {
    const notesArray = notes.filter(note => {
      return note.id !== id
    })

    setNotes(notesArray);
    localStorage.setItem('notes', JSON.stringify(notesArray))
  }

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    const query = e.target.value;
    setSearch(query);
  }

  const filterdNote = search !== ''
    ? notes.filter(n => n.content.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    : notes
  
  return (
    <div className='mx-auto max-w-6xl my-12 space-y-6 px-5'>
      <img src={ logo } alt="nlw-expert" />
      <form className='w-full'>
        <input 
          type="text" 
          placeholder='Busque em suas notas...'
          onChange={ handleSearch }
          className='w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500'
        />
      </form>
      <div className='h-px bg-slate-700'/>
      <div className='grid grid-cols-1 md:grid-clos-2 lg:grid-cols-3 gap-6 auto-rows-[250px]'>
        <NewNoteCard onNoteCreated={ onNoteCreated } />
        {filterdNote.map((note) => {
          return <NoteCard key={note.id} note={ note } onNoteDeleted={ onNoteDeleted } />
        })}
      </div>
    </div>
  )
}

export default App
