import React from 'react';


class Todo extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

//if/else render eli jos searchTodos != null nii se, muuten todos
render(){
  if(this.props.searchTodos === null){
    return(
        <div className="mainContainer">
            <table className="adminTable"> 
            <tbody>
          <tr>
            <th>
              Date
            </th>
            <th>
              TODO
            </th>
          </tr>
          {this.props.todos.map((item, index) => (
            <tr key={index}>
            <td>{item.date}</td>
            <td>{item.todo}</td>
            <td>
              <button id={index} data-key={item.todo} onClick={this.props.deleteTodo}>
              Delete
              </button></td>
              <td>
              <button id={index} data-key={item.todo} data-todo={item.todo} data-date={item.date} onClick={this.props.editTodo}>
              Edit
              </button>
            </td>
            </tr>
          ))}

          </tbody>
            </table>
        </div>
    );}
    else{
      return(
        <div className="mainContainer">
            <table className="adminTable">
            <tbody>
          <tr>
            <th>
              Date
            </th>
            <th>
              TODO
            </th>
          </tr>
          {this.props.searchTodos.map((item, index) => (
            <tr key={index}>
            <td>{item.date}</td>
            <td>{item.todo}</td>
            <td>
              <button id={index} data-key={item.todo} onClick={this.props.deleteTodo}>
              Delete
              </button></td>
              <td>
              <button id={index} data-key={item.todo} data-todo={item.todo} data-date={item.date} onClick={this.props.editTodo}>
              Edit
              </button>
            </td>
            </tr>
          ))}

          </tbody>
            </table>
        </div>
       )}
};
}
export default Todo;