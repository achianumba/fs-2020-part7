import React, { useState } from 'react';
import {
  Switch,
  Route,
  useRouteMatch,
  useHistory
} from 'react-router-dom';
import AnecdoteList from './components/AnecdoteList';
import Menu from './components/Menu';
import CreateNew from './components/CreateNew';
import Anecdote from './components/Anecdote';
import About from './components/About';
import Footer from './components/Footer';

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState({
    message: '',
    timeout: null
  });

  const hideNotification = () => {
    const timeoutId = setTimeout(() => {
      setNotification({
        message: '',
        timeout: null
      });
    }, 1e4);
    
    return timeoutId
  }

  const showNotification = (msg) => {
    if (notification.timeout) clearTimeout(notification.timeout);

    setNotification({
      message: `Added a new anecdote: ${msg}`,
      timeout: hideNotification()
    });
  }

  const matchedAnecdote = useRouteMatch('/anecdotes/:id');
  const anecdote = matchedAnecdote ? anecdotes.find(({id}) => id === Number(matchedAnecdote.params.id)) : null;
  
  const history = useHistory();

  const addNew = (anecdote) => {
    setAnecdotes(anecdotes.concat(anecdote))
    history.push('/');
    showNotification(anecdote.content);
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center', display: notification.message === '' ? 'none' :  'block'}}>{notification.message}</h1>
      <h1>Software anecdotes</h1>
      <Menu />
      <Switch>
      <Route path="/anecdotes/:id">
        <Anecdote anecdote={anecdote} />
      </Route>
      <Route path="/about">
        <About />
      </Route>
      <Route path="/create_new">
        <CreateNew addNew={addNew} />
      </Route>
      <Route path="/">
        <AnecdoteList anecdotes={anecdotes} />
      </Route>
      </Switch>
      <Footer />
    </div>
  )
}

export default App;
