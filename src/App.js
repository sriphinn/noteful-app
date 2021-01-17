import React from 'react'
import './App.css';
import { Route, Link } from 'react-router-dom';
import FolderList from './FolderList';
import NoteList from './NoteList';
import Note from './Note';
import NoteSidebar from './NoteSidebar';
import NotefulContext from './NotefulContext';
import AddFolder from './AddFolder';

export default class App extends React.Component {
  state = {
    folders: [],
    notes: [],
  };

  setFolders = folders => {
    this.setState({
      folders,
      error: null,
    })
  }

  setNotes = notes => {
    this.setState({
      notes,
      error: null,
    })
  }

  componentDidMount() {
    fetch(`http://localhost:9090/folders`, {
      method: 'GET'
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
      .then(this.setFolders)
      .catch(error => this.setState({ error }))

    fetch(`http://localhost:9090/notes`, {
      method: 'GET'
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
      .then(this.setNotes)
      .catch(error => this.setState({ error }))
  }

  deleteNote = (id) => {
    fetch(`http://localhost:9090/notes/${id}`, {
      method: 'DELETE'
    })
      .then(data => {
        // call the callback when the request is successful
        // this is where the App component can remove it from state
        const newNotes = this.state.notes.filter(note =>
          note.id !== id)
        this.setState({
          notes: newNotes
        })
      })
      .catch(error => {
        console.error(error)
      })
  }

  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.deleteNote
    }
    return (
      <div className="App">
        <header>
          <Link to="/"><h1>Noteful</h1></Link>
        </header>
        <NotefulContext.Provider value={contextValue}>
          <main>
            <aside className='folder-list-container'>
              <Route exact path="/" component={FolderList} />
              <Route path="/folder/:folderId" component={FolderList} />
              <Route path="/note/:noteId" component={NoteSidebar} />
              <Route path="/add-folder" component={AddFolder} />
            </aside>
            <section className='note-list-container'>
              <Route exact path="/" component={NoteList} />
              <Route path="/folder/:folderId" component={NoteList} />
              <Route path="/note/:noteId" component={Note} />
            </section>
          </main>
        </NotefulContext.Provider>
      </div>
    );
  }
}