import React, {useEffect, useRef, useState} from 'react'
import axios from 'axios'
import {Link} from "react-router-dom";

const Exercise = (props) => (
    <tr>
        <td>{props.exercise.userName}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0,10)}</td>
        <td>
            <Link to={`/edit/${props.exercise._id}`}>Edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>Delete</a>
        </td>
    </tr>
)

const ExerciseList = () => {
    const [exercises, setExercises] = useState([])

    const gotTheData = useRef(false)
    useEffect(() => {
        if(gotTheData && exercises.length > 0){
            gotTheData.current = true
        }
        axios.get('http://localhost:7000/api/exercises')
            .then((response) => {
                setExercises(response.data)
            })
            .catch((error) => {
                console.log(error)
            })

    }, [])

    function deleteExercise(id){
        axios.delete(`http://localhost:7000/api/exercises/${id}`)
            .then((response) => {{
                console.log(response.data)
                setExercises((prevState => {
                    return prevState.filter(exercise => exercise._id !== id)
                }))
            }}).catch((error) => {
            console.log(error)
        })
    }

    return (
        <div>
            <h3>Logged Exercises</h3>
            <table className="table">
                <thead className="thead-light">
                <tr>
                    <th>Username</th>
                    <th>Description</th>
                    <th>Duration</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                    { exercises.map(exercise => <Exercise exercise={exercise} deleteExercise={deleteExercise} key={exercise._id} />) }
                </tbody>
            </table>
        </div>
    )
}
export default ExerciseList
