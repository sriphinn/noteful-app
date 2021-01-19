import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import NotefulContext from './NotefulContext';
import PropTypes from 'prop-types';

export default function FolderList() {
    const context = useContext(NotefulContext)
    return (
        <div>
            <h2>Folder List</h2>
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

FolderList.propTypes = {
    folder: PropTypes.arrayOf(PropTypes.object)
};