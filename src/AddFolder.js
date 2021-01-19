import React from 'react';
import NotefulContext from './NotefulContext';
import propTypes from 'prop-types';

const Required = () => (
    <span className='AddBookmark__required'>*</span>
  )

export default class AddFolder extends React.Component {

    static contextType = NotefulContext; 
    
    handleSubmit = e => {
        e.preventDefault()
        const {name} = e.target
        const folder = {
            name: name.value
        }
        fetch(`http://localhost:9090/folders`, {
            method: 'POST',
            body: JSON.stringify(folder),
            headers: {
                'content-type': 'application/json'
            }
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
            <h2>Add a folder</h2>
            <form
                className='AddFolder-form'
                onSubmit={this.handleSubmit}
            >
              {/* <div className='AddBookmark__error' role='alert'>
                {error && <p>{error.message}</p>}
              </div> */}
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
                  required
                />
                </p>
              </div>
              <div className='AddBookmark__buttons'>
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

AddFolder.propTypes = {
  history: propTypes.any.isRequired
}