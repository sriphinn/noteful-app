import React from 'react'
import './App.css';
import { Route, Link } from 'react-router-dom';
import FolderList from './FolderList';
import NoteList from './NoteList';
import Note from './Note';
import NoteSidebar from './NoteSidebar';
import NotefulContext from './NotefulContext';
import AddFolder from './AddFolder';
import AddNote from './AddNote';
import config from './config';

const { API_ENDPOINT } = config;

export default class App extends React.Component {
  state = {
    folders: [],
    notes: [],
    error: null
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
    this.getData()
  }

  getData = () => {
    fetch(`${API_ENDPOINT}/api/folders`, {
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

    fetch(`${API_ENDPOINT}/api/notes`, {
      method: 'GET'
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
      .catch(error => {
        this.setState({ error })
      })
      .then(this.setNotes)
  }

  deleteNote = (id) => {
    fetch(`${API_ENDPOINT}/api/notes/${id}`, {
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
      folders: this.state.folders || [],
      notes: this.state.notes || [],
      deleteNote: this.deleteNote,
      getData: this.getData
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
              <Route path="/folder/:folder_id" component={FolderList} />
              <Route path="/note/:noteId" component={NoteSidebar} />
              <Route path="/add-folder" component={AddFolder} />
            </aside>
            <section className='note-list-container'>
              <Route exact path="/" component={NoteList} />
              <Route path="/folder/:folder_id" component={NoteList} />
              <Route 
                path="/note/:noteId" 
                render={(props) => (
                  <Note {...props} notes={this.state.notes} />
                )}
              />
              <Route path="/add-note" component={AddNote} />
            </section>
          </main>
        </NotefulContext.Provider>
      </div>
    );
  }
}