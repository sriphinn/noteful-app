import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import NotefulContext from './NotefulContext';
import PropTypes from 'prop-types';
import NoteItem from './NoteItem.js';

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
                {data.map((note, id) => <NoteItem note={note} key={id}/>)}
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
    match: PropTypes.any.isRequired,
};

