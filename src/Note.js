import React from 'react';
import dummyStore from './dummy-store';

export default function Note(props) {
    const note = dummyStore.notes.find(n =>
        n.id === props.match.params.noteId
    )
    console.log(props.match.params.noteId)
    return (
        <div className="note">
            <p>{note.modified}</p>
            <button>Delete Note</button>
            <p>{note.content}</p>
        </div>
    )
}