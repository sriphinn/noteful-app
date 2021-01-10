import React from 'react';
import { Link } from 'react-router-dom';
import dummyStore from './dummy-store';

export default function FolderList() {
    return (
        <div>
            <p><h2>Folder List</h2></p>
            <ul className="folder-list">
                {dummyStore.folders.map(folder =>
                    <li key={folder.id}>
                        <Link to={`/folder/${folder.id}`}>
                            {folder.name}
                        </Link>
                    </li>)}
                    <li>Add folder</li>
            </ul>
        </div>
    )
}