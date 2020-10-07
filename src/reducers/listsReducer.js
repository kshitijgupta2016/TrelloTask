import {CONSTANTS} from "../actions";

let listID=3;
let cardID=0;
let todoID=0;
let doingID=0;

const initialState = [
  {
    title: "To Do",
    id: `list-${0}`,
    cards: []
  },
  {
    title: "Doing",
    id: `list-${1}`,
    cards: []
  },
  {
    title: "Done",
    id: `list-${2}`,
    cards: []
  }
];




const listsReducer = (state = initialState,action) =>{
  switch (action.type){
    case CONSTANTS.ADD_LIST:

      const newList = {
        title:action.payload,
        cards:[],
        id: `list-${listID}`
      };
      listID +=1;
      return [...state,newList];

    case CONSTANTS.ADD_CARD: {
      if(action.payload.listID==="list-0"){ //restricting add card functionality only to the to do list
      const newCard = {
        text: action.payload.text,
        id:`card-${cardID}`,
        todoID: `todo-${todoID}`,
        doingID:`doing-${doingID}`
      }
      cardID +=1;
      todoID +=1;
      console.log(newCard.todoID);


      const newState= state.map(list=>{
        if(list.id === action.payload.listID){
          return{
            ...list,
            cards: [...list.cards,newCard]
          };
        }
        else{
          return list
        }
      });

      return newState;
    }
    else{
      return state;
    }}

    case CONSTANTS.DRAG_HAPPENED:
      const{
        droppableIdStart,
        droppableIdEnd,
        droppableIndexEnd,
        droppableIndexStart,
        draggableId
      } = action.payload;
      const newState = [...state];
      //in the same list
      if(droppableIdStart === droppableIdEnd){
        const list = state.find(list => droppableIdStart === list.id);
        const card = list.cards.splice(droppableIndexStart,1);
        list.cards.splice(droppableIndexEnd,0,...card)
      }

      //other list

      if(droppableIdStart !== droppableIdEnd){

        if(droppableIdStart<droppableIdEnd){
        //find the list where drag happened
        const listStart = state.find(list => droppableIdStart ===list.id)
        //pull out the card from this list
        const card = listStart.cards.splice(droppableIndexStart,1);
        //find the list where drag ended
        const listEnd = state.find(list => droppableIdEnd ===list.id);
        //put the card in the new list
        listEnd.cards.splice(droppableIndexEnd,0,...card);
        if(droppableIdStart === "list-0" && droppableIdEnd==="list-1"){
          card.doingID = `doing-${doingID}` //maybe not updating to state. debug
          console.log(card)
          console.log(`doing-${doingID}`)
          doingID +=1;
        }
      }
    }

      return newState;

      case CONSTANTS.SORT_TODO: {
        const {listID} = action.payload;
        // if(listID==="list-1"){
        //   const
        // }
        var newCardArr = [];
        var newCardSorted=[];
        var newCardFinal= [];
        const sort = state.map(list=>{
            if(list.id===action.payload){ //only if list id = list id of list clicked.
            list.cards.map(card=>{
              newCardArr.push(card.todoID);  //extract to do IDs of cards
          })
         }
        })
        //sorted function
        var newCardSorted = newCardArr.sort();

        //array with sorted to do IDs
        console.log(newCardSorted);

        //below for each card in the org array whose id=respective element push it
        // to newcards array, and return it as sorted cards array
        var i;
        for(i=0;i<newCardSorted.length;i++){
          const check = state.map(list=>{
              if(list.id===action.payload){
                list.cards.map(card=>{
                  if(card.todoID===newCardSorted[i]){
                    newCardFinal.push(card);
                  }
                })
              }
          })
        }
        //sorted cards array
        console.log(newCardFinal);

        const newState = state.map(list=>{
          if(list.id === action.payload){
            return{
              ...list,
              cards: newCardFinal
            };
          }
          else{
            return list
          }
        });

        return newState;
        // return state;

   }

//    case CONSTANTS.SORT_DOING: {
//      const {listID} = action.payload;
//      // if(listID==="list-1"){
//      //   const
//      // }
//      var newCardArr = [];
//      var newCardSorted=[];
//      var newCardFinal= [];
//      const sort = state.map(list=>{
//          if(list.id===action.payload){ //only if list id = list id of list clicked.
//          list.cards.map(card=>{
//            newCardArr.push(card.doingID);  //extract doing IDs of cards
//        })
//       }
//      })
//      //sorted function
//      var newCardSorted = newCardArr.sort();
//
//      //array with sorted to do IDs
//      console.log(newCardSorted);
//
//      //below for each card in the org array whose id=respective element push it
//      // to newcards array, and return it as sorted cards array
//      var i;
//      for(i=0;i<newCardSorted.length;i++){
//        const check = state.map(list=>{
//            if(list.id===action.payload){
//              list.cards.map(card=>{
//                if(card.doingID===newCardSorted[i]){
//                  newCardFinal.push(card);
//                }
//              })
//            }
//        })
//      }
//      //sorted cards array
//      console.log(newCardFinal);
//
//      const newState = state.map(list=>{
//        if(list.id === action.payload){
//          return{
//            ...list,
//            cards: newCardFinal
//          };
//        }
//        else{
//          return list
//        }
//      });
//
//      return newState;
// }

    default:
      return state;

  }
};

export default listsReducer;

//last updated vid 6 end
