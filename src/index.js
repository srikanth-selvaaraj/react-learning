import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/style.css';
import 'bootstrap/dist/css/bootstrap.css'
import Blog from './components/blog';

const blog = ReactDOM.createRoot(document.getElementById('blog'))
blog.render(<Blog />)