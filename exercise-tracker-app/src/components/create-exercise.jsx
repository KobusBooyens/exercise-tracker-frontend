import React, {useEffect, useState} from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'

const CreateExercise = () => {
    const [users, setUsers] = useState( {
        users: [],
        userName: ''
    })

    const [exercise, setExercise] = useState({
        userName: '',
        description: '',
        duration: 0,
        date: new Date(),
        users: []
    })

    useEffect( () => {
         function getUsers() {
            axios.get('http://localhost:7000/api/users/')
                .then((response) => {
                    if (response.data.length > 0) {
                        setUsers({
                            users: response.data.map(user => user.userName),
                            userName: response.data.map(user => user.userName)[0]
                        })
                    }
                })
                .catch((error) => {
                    console.error(error)
                })
        }

         getUsers()
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

        axios.post('http://localhost:7000/api/exercises/add', newExercise)
            .then((response) => {
                console.log(response.data)
                window.location = '/'
            }).catch((err) => {
            console.error(err)
        })

        setExercise({...exercise, description: '', duration: '', date: new Date()})
    }

    return (
        <div className='form-create'>
            <h3>Create New Exercise Log</h3>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label>UserName:</label>
                    <select className='form-select'
                            value={exercise.userName}
                            onChange={(e) => { onChangeUserName(e) }}
                            required>
                        <option key={'first'}> </option>
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
                           type='number'
                           min={0}
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
                        Create Exercise Log
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateExercise
