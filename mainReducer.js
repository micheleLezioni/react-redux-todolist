export default function mainReducer(state, action) {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        taskList: [action.payload, ...state.taskList] // state.tasklist.concat(action.payload)
      };
    case "SET_COMPLETED":
      var oldItem = state.taskList[action.index]; //[1,2,3] => ar[0] => 1  [{},{}] => ar[0] => {}
      if (oldItem !== undefined) {
        return {
          ...state,
          taskList: [
            ...state.taskList.slice(0, action.index),
            Object.assign({}, { ...oldItem, completed: !oldItem.completed }),
            ...state.taskList.slice(action.index + 1)
          ]
        };
      } else return state;
    case "TOGGLE_SHOW_ALL":
      return {
        ...state,
        visibilityFilter: {
          ...state.visibilityFilter,
          SHOW_ALL: !state.visibilityFilter.SHOW_ALL
        }
      };

    default:
      return state;
  }
}

/* 
const initialState = {
  taskList: [{}],
  visibilityFilter: {
    SHOW_ALL: true
  }
}; 


 
var myObj= {a:22, b:"ciao"}
var myObj2= {myObj} => console.log(myObj2) => { {a:22, b:"ciao"}}
var myObj2= {...myObj} => console.log(myObj2) => {a:22, b:"ciao"}
//COSA POSSO FARE
//AGGIUNGERE
var myObj= {a:22, b:"ciao"}
var myObj2= {...myObj, c:2} => {a:22, b:"ciao", c:2}
//MODIFICARE
var myObj= {a:22, b:"ciao"}
var myObj2= {...myObj, a:10} => {a:10, b:"ciao"}
myObj.a= "ciao" => myObj = {a:"ciao", b:"ciao"}



var myObj= {a:2}
var myObj2 = myObj => {a:2}
myObj2.a = 3 => console.log(myObj2) => {a:3}
anche my myObj => {a:3}

var myObj= {a:2}
var myObj2= Object.assign({}, myObj ) => {a:2}
myObj2.a =3 => non influenzo myObj

// resituisce un oggetto nuovo
Object.assign({},{...oldItem, completed: !oldItem.completed} )
Object.assign({}, { text:"salima", completed:true   }) => ritorna un oggetto => { text:"salima", completed:true   }

oldItem =  {
        text: "salima",
        completed: false
      }

{...oldItem, comoldItepleted: !m.completed} => { text:"salima", completed:true   }
*/
