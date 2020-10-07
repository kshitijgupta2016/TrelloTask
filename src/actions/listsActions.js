import {CONSTANTS} from "../actions";


export const addList = title => {
  return {
    type:CONSTANTS.ADD_LIST,
    payload:title
  };
};

export const sort = (
  droppableIdStart,
  droppableIdEnd,
  droppableIndexStart,
  droppableIndexEnd,
  draggableId
) => {
  return{
    type: CONSTANTS.DRAG_HAPPENED,
    payload:{
      droppableIdStart,
      droppableIdEnd,
      droppableIndexStart,
      droppableIndexEnd,
      draggableId
    }
  }
}

export const sortToDo = listID =>{
  return{
    type:CONSTANTS.SORT_TODO,
    payload:listID
  }
}

export const sortDoing = listID =>{
  return{
    type:CONSTANTS.SORT_DOING,
    payload:listID
  }
}
