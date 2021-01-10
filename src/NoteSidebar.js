import React from 'react';
import dummyStore from './dummy-store';
import { useHistory } from 'react-router-dom';

export default function NoteSidebar(props) {
    
    const note = dummyStore.notes.find(n =>
        n.id === props.match.params.noteId
    )

    const folderName = dummyStore.folders.find(f =>
        f.id === note.folderId
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