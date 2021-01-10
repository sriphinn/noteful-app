import React from 'react';
import dummyStore from './dummy-store';
import { Link } from 'react-router-dom';

export default function NoteList(props) {
    let data;
    if (!props.match.params.folderId) {
        data = dummyStore.notes
    } else {
        data = dummyStore.notes.filter(note =>
            note.folderId === props.match.params.folderId)
    }

    return (
        <div>
            <p><h2>Note List</h2></p>
            <ul className="note-list">
                {data.map(note =>
                    <li key={note.id}>
                        <Link to={`/note/${note.id}`}>
                            <h3>{note.name}</h3>
                        </Link>
                        <p>{note.modified}</p>
                        <button>Delete Note</button>
                    </li>)}
                    <button className="add-note">Add note</button>
            </ul>
        </div>
    )
}

