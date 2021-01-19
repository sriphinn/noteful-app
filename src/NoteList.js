import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import NotefulContext from './NotefulContext';
import moment from 'moment';
import PropTypes from 'prop-types';

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
            <h2>Note List</h2>
            <ul className="note-list">
                {data.map(note =>
                    <li key={note.id} className='note'>
                        <Link to={`/note/${note.id}`}>
                            <h3>{note.name}</h3>
                        </Link>
                        <p>Date modified: {moment(note.modified).format("MMM DD YYYY")}</p>
                        <button onClick={(e)=>context.deleteNote(note.id)}>Delete Note</button>
                    </li>)}
                    <Link to={"/add-note"}>
                        <button className="add-note">
                            Add note
                        </button>
                    </Link>
            </ul>
        </div>
    )
}

NoteList.propTypes = {
    folder: PropTypes.arrayOf(PropTypes.object),
    notes: PropTypes.arrayOf(PropTypes.object)
};

