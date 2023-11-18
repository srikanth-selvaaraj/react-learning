import {React, useState} from 'react';
import ReactDOM from 'react-dom/client';
import './style/style.css';
import Game from './components/TicTacToe';

const products = [
    {id: 1, name: 'Task1'},
    {id: 2, name: 'Task2'},
    {id: 3, name: 'Task3'}
];

const listItems = products.map(product => 
    <li key={product.id}>{product.name}</li>
); 

function Button({count, onClick}) {
    return (
        <button className='btn btn-info' onClick={onClick}>New</button>
    );
}

function ListItems() {
    return (
        <ul>
            {listItems}
        </ul>
    )
}

export default function App() {
    const [count, setCount] = useState(0)

    function handleClick() {
        setCount(count + 1)
    }

    return (
        <>
        <h1>Your Todo list {count}</h1>
        <ListItems/>
        <Button count={count} onClick={handleClick}/>
        <Button count={count} onClick={handleClick}/>
        </>
    );
}

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />)

const ticTacToe = ReactDOM.createRoot(document.getElementById('tic_tac_toe'))
ticTacToe.render(<Game />)