import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Listings } from './sections'

ReactDOM.render(
  <React.StrictMode>
    <Listings title='House' />
  </React.StrictMode>,
  document.getElementById('root'),
)
