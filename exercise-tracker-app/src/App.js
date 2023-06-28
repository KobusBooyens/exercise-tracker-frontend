import {Route, BrowserRouter as Router } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Navbar from "./components/navbar";
import ExerciseList from "./components/exercise-list";
import EditExercise from "./components/edit-exercise";
import CreateExercise from "./components/create-exercise";
import CreateUser from "./components/create-user";

function App() {
  return (
      <>
          <Router basename='/'>
              <div className='container'>
                  <Navbar/>
                  <br />
                  <Route path='/' exact component={ExerciseList}/>
                  <Route path='/edit/:id' component={EditExercise}/>
                  <Route path='/create' component={CreateExercise}/>
                  <Route path='/user' component={CreateUser}/>
              </div>
          </Router>
      </>
  );
}

export default App;
