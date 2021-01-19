import React from 'react'

const NotefulContext = React.createContext({
  folders: [],
  notes: [],
  deleteNote: () => {},
  getData: () => {}
})

export default NotefulContext