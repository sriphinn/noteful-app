import React, {useContext} from 'react';
import NotefulContext from './NotefulContext';
import moment from 'moment';

export default function Note(props) {
    
    const context = useContext(NotefulContext)
    const note = context.notes.find(n =>
        n.id === props.match.params.noteId
    ) || {}
    console.log(props.match.params.noteId)
    
    const onDeleteNote = (e) => {
        context.deleteNote(note.id)
        props.history.push("/")
    }

    return (
        <div>
            <div className="note">
                <h3>{note.name}</h3>
                <p>Date modified: {moment(note.modified).format("MMM DD YYYY")}</p>
                <button onClick={onDeleteNote}>Delete Note</button>
            </div>
            <p>{note.content}</p>
        </div>
    )
}