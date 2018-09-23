import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import { Table } from 'semantic-ui-react'
import { Form, Button, Message, Menu, Grid, Image, Icon, Accordion } from 'semantic-ui-react'

const styleTestForMenu = {
  color: 'black',
  background: 'lightblue',
  fontSize: 20,
  fontColor: 'yellow',
  borderStyle: 'solid',
  borderRadius: 1,
  padding: 10,
  marginBottom: 10
}

const MenuC = () => (
  <Menu inverted>
    <Menu.Item link>
      <NavLink exact to="/anecdotes"  activeStyle={{fontWeight: 'bold', color: 'red'}}>anecdotes</NavLink> 
    </Menu.Item>
    <Menu.Item link>
      <NavLink exact to="/create"  activeStyle={{fontWeight: 'bold', color: 'red' }}>create</NavLink>
    </Menu.Item>
    <Menu.Item link>
      <NavLink exact to="/about"  activeStyle={{fontWeight: 'bold', color: 'red' }}>about</NavLink> 
    </Menu.Item>
  </Menu>
)

const Anecdote = ({anecdote}) => {
  console.log(anecdote)
  return (
    <div>
    <h2>{anecdote.content}</h2>
    has {anecdote.votes} votes
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <Table striped celled>
      <Table.Body>
       {anecdotes.map(anecdote => 
          <Table.Row key={anecdote.id} >
            <Table.Cell>
              <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  </div>
)


const About = () => (
  <div>
      <Grid>
        <Grid.Column width={13}>
          <h2>About anecdote app</h2>
          <p>According to Wikipedia:</p>
          
          <em>An anecdote is a brief, revealing account of an individual person or an incident. 
            Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, 
            such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. 
            An anecdote is "a story with a point."</em>

          <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
        </Grid.Column>
        <Grid.Column width={3}>
          <Image src='http://www.stroustrup.com/xBjarne2018.jpg.pagespeed.ic.OKK5_X_jLu.webp' />
        </Grid.Column>
      </Grid>
  </div>
)

const panels = [
  {
    key: 'what-is-dog',
    title: 'Linkkejä',
    content: [
      'https://courses.helsinki.fi/fi/TKT21009/121540749',
      'https://github.com/mluukkai/routed-anecdotes'
    ].join(' '),
  }
  
]

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code. 
    <Accordion defaultActiveIndex={0} panels={panels} />
  </div>

)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: '',
      notification: ''

    }
  }

  handleChange = (e) => {
    //console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.history.push('/')
  }

  render() {
    return(
      <div>
        <h2>create a new anecdote</h2>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <Form.Field>
            <label>content </label>
            <input name='content' value={this.state.content} onChange={this.handleChange} />
          </Form.Field>
          <Form.Field>
            <label>author</label>
            <input name='author' value={this.state.author} onChange={this.handleChange} />
          </Form.Field>
          <Form.Field>
            <label>url for more info</label>
            <input name='info' value={this.state.info} onChange={this.handleChange} />
          </Form.Field>
          <Button animated>
            <Button.Content visible>Create</Button.Content>
            <Button.Content hidden>
              <Icon name='arrow right' />
            </Button.Content>
          </Button>
        </Form>
      </div>  
    )

  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: '',
      page: 'home'
    } 
  }


  toPage = (page) => (event) => {
    event.preventDefault()
    this.setState({ page })
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote), notification:`anecdote created ${anecdote.content}` })
    
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  

  render() {
    const anecdoteById = (id) => {
      return this.state.anecdotes.find(a => Number(a.id) === Number(id))
    }
    let styleTest = null
    if (this.state.notification.length > 0) {
      styleTest = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
      }
      setTimeout(() => {
        this.setState({ notification: '' })
      }, 5000)
    }

    
    
    //<div style = {styleTest}>{this.state.notification}</div>
    return (
      <Container>
        <h1>Software anecdotes</h1>
        <div>
          <Router>
            <div>
              {(this.state.notification && <Message success>{this.state.notification}</Message>)}
              <MenuC />
              <Route exact path="/" render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
              <Route exact path="/anecdotes" render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
              <Route path="/create" render={({history}) => <CreateNew history={history} addNew={this.addNew} /> } />
              <Route path="/about" render={() => <About />} />
              <Route exact path="/anecdotes/:id" render={({match}) =>
                <Anecdote anecdote = {anecdoteById(match.params.id)} />}
              />
            </div>
          </Router>
        </div>
        <Footer />
      </Container>
    );
  }
}

export default App;
