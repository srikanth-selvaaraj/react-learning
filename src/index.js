import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/style.css';
import 'bootstrap/dist/css/bootstrap.css'
import Game from './components/game';
import Todo from './components/todo'

const ticTacToe = ReactDOM.createRoot(document.getElementById('tic_tac_toe'))
ticTacToe.render(<Game />)

const todo = ReactDOM.createRoot(document.getElementById('todo'))
todo.render(<Todo />)