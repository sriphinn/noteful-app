import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import NotefulContext from './NotefulContext';

export default function FolderList() {
    const context = useContext(NotefulContext)
    return (
        <div>
            <p><h2>Folder List</h2></p>
            <ul className="folder-list">
                {context.folders.map(folder =>
                    <li key={folder.id}>
                        <Link to={`/folder/${folder.id}`}>
                            {folder.name}
                        </Link>
                    </li>)}
                    <li>
                        <Link to={'/add-folder'}>
                            <button>Add Folder</button>
                        </Link> 
                    </li>
            </ul>
        </div>
    )
}