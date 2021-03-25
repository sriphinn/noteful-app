import React from 'react';
import NotefulContext from './NotefulContext';
import propTypes from 'prop-types';

const Required = () => (
    <span className='add-note-required'>*</span>
)

export default class AddNote extends React.Component {

  state = {
    message: "",
    error: null
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

  validateContent(content) {
    if (!content || content.trim() === "") {
      this.setState({
        message: <p className="noteError">Content must include text.</p>
      })
    return ;
    } 
    return content;
  }

  handleNoteSubmit = e => {
    e.preventDefault()
    const {name, folder_id, content} = e.target
    const validName = this.validateName(name.value);
      if (!validName){
        return
      }
    const validContent = this.validateContent(content.value);
      if (!validContent){
        return
    }
    const note = {
      name: validName,
      folder_id: folder_id.value,
      content: validContent,
      modified: new Date()
    }
    fetch(`http://localhost:8000/api/notes`, {
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
    .catch(error => {
      this.setState({ error })
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
                />
                </p>
              </div>
              <div>
          </div>
          <div>
            <label htmlFor='folder'>
              Folder
              {' '}
              <Required />
            </label>
              <select name="folder_id" id="folder_id">
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
              required
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
                {this.state.message}
              </div>
            </form>
          </section>
        );
    }    
}

AddNote.propTypes = {
  history: propTypes.any.isRequired
}