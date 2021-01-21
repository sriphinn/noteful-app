import React from 'react'
import moment from 'moment';
import NotefulContext from './NotefulContext';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class NoteItem extends React.Component {

    static contextType = NotefulContext
    
    render() {
        const {note} = this.props
        return (
            <li key={note.id} className='note'>
                <Link to={`/note/${note.id}`}>
                    <h3>{note.name}</h3>
                </Link>
                <p>Date modified: {moment(note.modified).format("MMM DD YYYY")}</p>
                <button onClick={(e) => this.context.deleteNote(note.id)}>Delete Note</button>
            </li>
        )
    }
}

NoteItem.propTypes = {
    note: PropTypes.shape({
        name: PropTypes.string,
        id: PropTypes.string,
        modified: PropTypes.string,
        content: PropTypes.string,
    }).isRequired
};