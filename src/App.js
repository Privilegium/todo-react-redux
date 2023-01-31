import React from 'react';

import TodoList from './features/TodoList/TodoList';
import Header from './features/Header/Header';
import Footer from './features/Footer/Footer';

import './App.scss'
import './features/styles/reset.scss';

function App() {
    return (
        <div className="App">
            <Header/>

            <TodoList className='todo-list'/>

            {/* <Footer/> */}
        </div>
  );
}

export default App;
