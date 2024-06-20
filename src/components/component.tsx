import { useReducer } from 'react';
import './component.scss'
interface Joke {
    id: number;
    joke: string;
    rating: number;
    }
    
type Action =
    | { type: 'increase_rating'; id: number }
    | { type: 'decrease_rating'; id: number }
    | { type: 'delete'; id: number }
    | { type: 'add'; payload: Joke };


  const Jokes: Joke[] = [
    { id: 1, joke: "Why don't scientists trust atoms? Because they make up everything!", rating: 0 },
    { id: 2, joke: "Why did the scarecrow win an award? Because he was outstanding in his field!", rating: 0 },
    { id: 3, joke: "Why don't skeletons fight each other? They don't have the guts.", rating: 0 },
    { id: 4, joke: "What do you call fake spaghetti? An impasta!", rating: 0 },
    { id: 5, joke: "Why do cows have hooves instead of feet? Because they lactose.", rating: 0 },
    { id: 6, joke: "Why did the bicycle fall over? Because it was two-tired!", rating: 0 },
    { id: 7, joke: "What do you call cheese that isn't yours? Nacho cheese!", rating: 0 },
    { id: 8, joke: "Why don't some couples go to the gym? Because some relationships don't work out.", rating: 0 },
    { id: 9, joke: "What do you get if you cross a snowman and a vampire? Frostbite.", rating: 0 },
    { id: 10, joke: "Why did the math book look sad? Because it had too many problems.", rating: 0 }
  ];

const reducer=(state:Joke[],action: Action)=>{
    switch(action.type){
        case 'increase_rating':
            return state.map(joke=>{
                if(joke.id===action.id){
                    return{...joke,rating:joke.rating+1}
                }
                return joke
            })
        case 'decrease_rating':
            return state.map(joke=>{
                if(joke.id===action.id){
                    return{...joke,rating:joke.rating-1}
                }
                return joke
            })
        case 'add':

            return[...state,action.payload]
        
        case 'delete':
            return state.filter(joke=>joke.id!==action.id)

        default:
            return state
    }
}

const Component=()=>{
    
    const[state,dispatch]=useReducer(reducer,Jokes)
    
    const handleSubmit=(e: any)=>{
        e.preventDefault()
        const joke=e.target[0].value
        if(!joke){
            return
        }
        const newJoke={
            id:state.length+1,
            joke,
            rating:0
        }
        dispatch({type:'add', payload: newJoke})
        e.target[0].value=''
    }
    
    return(
        <div className="jokes">
            <h3>jokes 😂</h3>
            <form onSubmit={handleSubmit} className='inputTag'>
                <input className='inputJoke' type="text" />
                <button>Add</button>
            </form>
            {state.sort((a,b)=> b.rating-a.rating).map((joke,index)=>{
                return <div key={index} className="joke">
                    {/* <h4>{joke.id}</h4> */}
                    <p>{joke.joke}</p>
                    <small>Likes: {joke.rating}</small>
                    <div className="btns">
                        <button onClick={()=>dispatch({type:'increase_rating', id: joke.id})}>👍🏿</button>
                        <button onClick={()=>dispatch({type:'decrease_rating', id: joke.id})}>👎🏾</button>
                        <button onClick={()=>dispatch({type:'delete', id: joke.id})}>Delete</button>
                    </div>
                </div>       
            })}
        </div>
    )
}

export default Component