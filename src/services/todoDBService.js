import fire from '../Fire';
import axios from 'axios';

//idea oli että täällä tehdään kaikki tietokanta haut ja poistot yms...
//hieman tuo firebase aiheutti harmaitahiuksia keyn suhteen, eli poisto 
const getTodos = async () => {
    const url = fire.options.databaseURL + '/TODOS/.json';
    const response = await axios.get(url);
    let allTodos = [];
    Object.values(response.data).forEach(element => {
        allTodos.push(element);
    });    
    let sorted = allTodos.sort(function(a, b) {
        a.date = a.date.split('.').reverse().join('/');
        b.date = b.date.split('.').reverse().join('/');
        //return a.date > b.date ? 1 : a.date < b.date ? -1 : 0; löyty helpompi tapa, localCompare...
        return a.date.localeCompare(b.date);
      })
      allTodos = sorted;
    return allTodos;
};

const addTodo = ( newTodo ) => {
    let postRef = fire.database().ref();
    postRef.child("TODOS").push().set({
        todo: newTodo.todo,
        date: newTodo.date
 });
 getTodos();

}
//useless, joskus tehdä tämä toiminnallisuus täällä puolella --> 
/*const editTodo = async () => {
    const url = fire.options.databaseURL+'/.json'
    const response = await axios.put(url, );
    return response.data;
}
*/

export default { getTodos, addTodo}