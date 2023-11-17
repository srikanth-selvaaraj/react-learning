import React from 'react';
import ReactDOM from 'react-dom/client';
import Php  from './Php';

// baic element
const myFirstElement = <h1 className='title'>Hello React!, My age is {10 + 10}</h1>

// table - Need one top level tag
const table = (
    <table>
        <tr>
            <th>Name</th>
            <th>Age</th>
        </tr>
        <tr>
            <td>Srikanth</td>
            <td>20</td>
        </tr>
    </table>
)

const root = ReactDOM.createRoot(document.getElementById('table'));
root.render(<Php color='red' skin='white'/>)
// root.render(myFirstElement)