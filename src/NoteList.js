import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import NotefulContext from './NotefulContext';

export default function NoteList(props) {
    const context = useContext(NotefulContext)

    let data;
    if (!props.match.params.folderId) {
        data = context.notes
    } else {
        data = context.notes.filter(note =>
            note.folderId === props.match.params.folderId)
    }

    return (
        <div>
            <p><h2>Note List</h2></p>
            <ul className="note-list">
                {data.map(note =>
                    <li key={note.id} className='note'>
                        <Link to={`/note/${note.id}`}>
                            <h3>{note.name}</h3>
                        </Link>
                        <p>Date modified: {note.modified}</p>
                        <button onClick={(e)=>context.deleteNote(note.id)}>Delete Note</button>
                    </li>)}
                    <button className="add-note">Add note</button>
            </ul>
        </div>
    )
}

