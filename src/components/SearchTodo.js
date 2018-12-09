import React from 'react';


class Todo extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }


render(){
    return(
        <div className="mainContainer">
        <div className="search">
            <input type="text" name="search" placeholder="Search" onChange={this.props.inputChanged} value={this.props.search}></input>
            <button onClick={this.props.findTodo}>Search!</button>
        </div></div>
    );
};
}
export default Todo;