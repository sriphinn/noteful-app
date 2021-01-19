import React from 'react';
import NotefulContext from './NotefulContext';
import propTypes from 'prop-types';

const Required = () => (
    <span className='add-note-required'>*</span>
)

export default class AddNote extends React.Component {

  state = {
    message: ""
  }

  static contextType = NotefulContext;

  validateName(name) {
    if (!name || name.trim() === "") {
      this.setState({
        message: <p className="noteError">Note must have a name.</p>
      })
    return ;
    } 
    return name;
  }

  handleNoteSubmit = e => {
    e.preventDefault()
    const {name, folderId, content} = e.target
    const validName = this.validateName(name.value);
    const note = {
      name: validName,
      folderId: folderId.value,
      content: content.value,
      modified: new Date()
    }
    fetch(`http://localhost:9090/notes`, {
      method: 'POST',
      body: JSON.stringify(note),
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(res => {
      if (!res.ok) {
        throw new Error("Something went wrong.")
      } return res.json();
    })
    .then((e) => {
      this.context.getData()
      this.props.history.push('/')
    })  
  }

  handleClickCancel = () => {
    this.props.history.push('/')
  };
    
    render() {
        return (
          <section className='AddFolder'>
            <h2>Add a note</h2>
            <form
                className='AddNote-form'
                onSubmit={this.handleNoteSubmit}
            >
              <div>
                <label htmlFor='name'>
                  Name
                  {' '}
                  <Required />
                </label>
                <p>
                <input
                  type='text'
                  id='name'
                  placeholder='ex: Meeting Notes'
                  name='name'
                  required
                />
                </p>
                {this.state.message}
              </div>
              <div>
          </div>
          <div>
            <label htmlFor='folder'>
              Folder
              {' '}
              <Required />
            </label>
              <select name="folderId" id="folderId">
                {this.context.folders.map(folder =>
                    <option key={folder.id} value={folder.id}>
                      {folder.name}
                    </option>)}

              </select>
          </div>
          <div>
            <label htmlFor='content'>
              Content
              <Required />
            </label>
            <textarea
              name='content'
              id='content'
            />
          </div>
              <div className='add-note-buttons'>
                <button type='button' onClick={this.handleClickCancel}>
                  Cancel
                </button>
                {' '}
                <button type='submit'>
                  Save
                </button>
              </div>
            </form>
          </section>
        );
    }    
}

AddNote.propTypes = {
  history: propTypes.any.isRequired
}