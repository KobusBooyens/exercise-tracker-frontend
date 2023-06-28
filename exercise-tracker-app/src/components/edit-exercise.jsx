import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'

const EditExercise = () => {
    const [users, setUsers] = useState( {
        users: [],
        userName: ''
    })

     const params = useParams()
    const [exercise, setExercise] = useState({
        userName: '',
        description: '',
        duration: 0,
        date: new Date(),
        users: []
    })

    useEffect( () => {

        function getExercise() {
            axios.get(`http://localhost:7000/api/exercises/${params.id}`)
                .then((response) => {
                    if (response.data) {
                        setExercise({
                            userName: response.data.userName,
                            description: response.data.description,
                            duration: response.data.duration,
                            date: new Date(response.data.date)
                        })
                    }
                })
                .catch((error) => {
                    console.error(error)
                })
        }

        function getUsers() {
            axios.get(`http://localhost:7000/api/users`)
                .then((response) => {
                    if (response.data.length > 0) {
                        setUsers({
                            users: response.data.map(user => user.userName)
                        })
                    }
                })
                .catch((error) => {
                    console.error(error)
                })
        }
        getExercise()
        getUsers()
        console.log(users)
    }, [])

    function onChangeUserName(e){
        setExercise({...exercise, userName: e.target.value})
        console.log(exercise)
    }

    function onChangeDescription(e){
        setExercise({...exercise, description: e.target.value})
        console.log(exercise)
    }

    function onChangeDuration(e){
        setExercise({...exercise, duration: e.target.value})
        console.log(exercise)
    }

    function onChangeDate(date){
        setExercise({...exercise, date: date})
    }

    function onSubmit(e){
        e.preventDefault()

        const newExercise = {
            userName: exercise.userName,
            description: exercise.description,
            duration: exercise.duration,
            date: exercise.date
        }

        console.log(newExercise)

        axios.post(`http://localhost:7000/api/exercises/update/${params.id}`, newExercise)
            .then((response) => {
                console.log(response.data)
                window.location = '/'
            }).catch((err) => {
            console.error(err)
        })
    }

    return (
        <div className='form-create'>
            <h3>Edit Exercise Log</h3>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label>UserName:</label>
                    <select className='form-select'
                            value={exercise.userName}

                            onChange={(e) => { onChangeUserName(e) }}
                            required>
                        { users.users.map(user => {
                            return <option key={user}>{user}</option>
                        })}
                    </select>
                </div>
                <div className='form-group'>
                    <label>Description:</label>
                    <input className='form-control'
                           type='text'
                           required
                           value={exercise.description}
                           onChange={(e) => {onChangeDescription(e)}}
                    />
                </div>
                <div className='form-group'>
                    <label>Duration (in minutes):</label>
                    <input className='form-control'
                           type='text'
                           required
                           value={exercise.duration}
                           onChange={(e) => {onChangeDuration(e)}}
                    />
                </div>
                <div className='form-group'>
                    <label>Date:</label>
                    <div>
                        <DatePicker selected={exercise.date}
                                    onChange={(e) => {onChangeDate(e)}}
                        />
                    </div>
                </div>

                <div className='form-group'>
                    <button className='btn btn-primary'
                            type='submit'>
                        Edit Exercise Log
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditExercise
