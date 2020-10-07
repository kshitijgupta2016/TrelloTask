import React, { Component } from 'react';
import TrelloCard from "./TrelloCard";
import TrelloActionButton from "./TrelloActionButton";
import {Droppable} from "react-beautiful-dnd";
import {connect} from "react-redux";
import {sortToDo,sortDoing} from "../actions";



class TrelloList extends Component {

  //sortToDo = ()=>{
    //var arr[] = [];
    //cards.map((card,index)=>
    //push(card.todoID),

  //)}
  sortToDo = () =>{

    const {dispatch,listID} = this.props;
    dispatch(sortToDo(listID));

  }
  sortDoing = () =>{
    const {dispatch,listID} = this.props;
    dispatch(sortDoing(listID));
  }
  render() {
    const {title,cards,listID} = this.props;
     return(
       <Droppable droppableId={String(listID)}>

         {provided =>(
             <div
             {...provided.droppableProps}
             ref={provided.innerRef}
             style={styles.container}
             >
             <h4>{title}</h4>



             <button
             style={listID !== "list-0" ? styles.buttonGroup : styles.invisible}
             onClick={this.sortToDo}> Sort To Do </button>
             <button
             style={listID === "list-2" ? styles.buttonGroup : styles.invisible}
             onClick={this.sortDoing}> Sort Doing </button>

             {cards.map((card,index)=>(<TrelloCard
               key={card.id}
               text={card.text}
               id={card.id}
               index={index}
               />
             ))}

             <TrelloActionButton listID={listID}/>
             {provided.placeholder}
             </div>
         )}

       </Droppable>
     );
  }

}

const styles={
  container:{
    backgroundColor:"#dfe3e6",
    borderRadius:3,
    width:300,
    padding:8,
    marginRight:8,
    height: "100%"
  },
  invisible:{
    opacity:0
  },
  buttonGroup:{
    
  }

};

export default connect()(TrelloList);
