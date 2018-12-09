import React, { Component } from 'react';
import './App.css';
import Todo from './components/Todo';
import fire from './Fire';
import todoDBService from './services/todoDBService';
import Axios from 'axios';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import SearchTodo from './components/SearchTodo';
import Header from './components/Header';


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      todo : "",
      date : "",
      todos : [],
      searchTodos : null,
      search : "",
      selectedDay: undefined,
    }
  };
 
  //service käsittelee tietokanta yhteyden ja hakee datan kannasta eli App.js ei tehdä mitään DB-juttuja vain kutsutaan tuota services
  componentDidMount = async() => {
    const dbTodos = await todoDBService.getTodos();
    console.log("Dis from App.js "+dbTodos )
    this.setState({ todos: dbTodos});
  };

  inputChanged = (event) => {
    this.setState({ [event.target.name] : event.target.value });
  };

  //Findilla luodaan uusi, renderöitävä lista TODOista, josta on filtteröity poist muut paitsi haetut
  ////Todo.js sisältää if/else renderin riippuen siitä onko searchTodos === null vai ei.
  findTodo = (search, event) => {
  search = this.state.search;
  if (search === ""){
    this.setState({searchTodos: null});
  }else{
  var updatedList = this.state.todos;
  updatedList = updatedList.filter(function(item){
      console.log(item);
      return item.todo.toLowerCase().search(
        search.toLowerCase()) !== -1;
    });
    this.setState({searchTodos : updatedList})
  }};

  //Kasataan uusi TODO-olio joka passataan tuonne servicen puolelle joka hoitaa sen kantaan.
  addTodo = async(event) => {
    event.preventDefault();
    let newTodo = {
      todo : this.state.todo,
      date : this.state.date
    };
    console.log(newTodo);
    await todoDBService.addTodo(newTodo);
    this.setState({todos: await todoDBService.getTodos(), todo : "", date : "" })
    this.forceUpdate();
  };

  //Tämä on rumaa, pitäisi hoidella servicen puolella tämä melkein kokonaan...
  //Ongelma tuon firebasen keyn saannissa, jotenkin todella kiusallisen oloista liikutella sitä komponentista toiseen.
  //Tällä sain toimimaan eli, it aint stupid if it works... ehkä vähän tässä tapauksessa
  deleteTodo = async (event) => {
    const todoTobeDeleted = event.target.dataset.key;
    const url = fire.options.databaseURL;
    console.log(todoTobeDeleted);
    let todoKey = "";
    await fire.database().ref('/TODOS/').orderByChild('todo').equalTo(todoTobeDeleted).once('value', function(snapshot){
      todoKey = Object.keys(snapshot.val());
      return todoKey;
    });
    console.log(todoKey);
    await Axios.delete(url + '/TODOS/' + todoKey + '/.json');
    this.setState({todos: await todoDBService.getTodos() })

  }
  
  //Jälleen samaa ongelmaa keyn kanssa.
  //Tässä myös poistetaan muokkauksen kohteena oleva TODO-listasta kun painetaan "EDIT"
  editTodo = async(event) => {
    this.setState({todo : event.target.dataset.todo, date : event.target.dataset.date});
    const todoTobeDeleted = event.target.dataset.key;
    const url = fire.options.databaseURL;
    console.log(todoTobeDeleted);
    let todoKey = "";
    await fire.database().ref('/TODOS/').orderByChild('todo').equalTo(todoTobeDeleted).once('value', function(snapshot){
      todoKey = Object.keys(snapshot.val());
      return todoKey;
    });
    console.log(todoKey);
    await Axios.delete(url + '/TODOS/' + todoKey + '/.json');
    this.setState({todos: await todoDBService.getTodos() })
    //samaa ku delessä eri axios kutsua vaan sitte serviceen

  }

  //React-day-picker, aika suoraan napattu niiden dokumentaatiosta
  //En ihan perillä tän henki-elämästä mutta in a nut shell, poimitaan käyttäjän valinta ja setataan stateen...
  handleDayChange = (date, modifiers, dayPickerInput) => {
    const input = dayPickerInput.getInput();
    this.setState({
     // date,
      isEmpty: !input.value.trim(),
      isDisabled: modifiers.disabled === true,
      date: date.toLocaleDateString()
      });
  }

  render() {
    return (
      <div className="App">
      <Header></Header>
      <div className="todoForm">
        <form onSubmit={this.addTodo}>
          What Needs To Be Done: 
            <input type="text" name="todo" onChange={this.inputChanged} value={this.state.todo}></input>
          When It Needs To Be Done: 
          <DayPickerInput value={this.state.date} onDayChange={this.handleDayChange}
          dayPickerProps={{
            date: this.state.date
          }} 
          />
            <input type="hidden" name="date" onChange={this.inputChanged} value={this.state.date}></input>
            <input type="submit" value="Add TODO!"></input>
        </form>
      </div>
      <SearchTodo todos={this.state.todos} search={this.state.search} findTodo={this.findTodo} inputChanged={this.inputChanged}></SearchTodo>
        <Todo searchTodos={this.state.searchTodos} todos={this.state.todos} deleteTodo={this.deleteTodo} editTodo={this.editTodo}></Todo>
      </div>
    );
  }
}

export default App;
