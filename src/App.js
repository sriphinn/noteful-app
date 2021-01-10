import React from 'react'
import './App.css';
import { Route, Link } from 'react-router-dom';
import FolderList from './FolderList';
import NoteList from './NoteList';
import Note from './Note';
import NoteSidebar from './NoteSidebar';

export default class App extends React.Component {
  
  render() {
    return (
      <div className="App">
        <header>
          <Link to="/"><h1>Noteful</h1></Link>
        </header>
        <main>
          <Route exact path="/" component={NoteList} />
          <Route path="/folder/:folderId" component={NoteList} />
          <Route path="/note/:noteId" component={Note} />
        </main>
        <aside>
          <Route exact path="/" component={FolderList} />
          <Route path="/folder/:folderId" component={FolderList} />
          <Route path="/note/:noteId" component={NoteSidebar} />
        </aside>
        
      </div>
    );
  }
}