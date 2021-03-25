import React, {useContext} from 'react';
import NotefulContext from './NotefulContext';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function NoteSidebar(props) {
    
    const context = useContext(NotefulContext);

    const note = context.notes.find(n =>
        n.id === parseInt(props.match.params.noteId)
    )

    const folderName = context.folders.find(f =>
        f.id === note.folder_id
    )

    console.log('folderName', folderName)
    
    const history = useHistory()
    function handleClick() {
        history.goBack();
    }

    return (
        <div className="note-sidebar">
            <button onClick={handleClick}>Go back</button>
            <h3>{folderName.name} Folder</h3>
        </div>
    )
}

NoteSidebar.propTypes = {
    folder: PropTypes.arrayOf(PropTypes.object),
    notes: PropTypes.arrayOf(PropTypes.object)
};