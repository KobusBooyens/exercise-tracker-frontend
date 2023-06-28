import React, {useState} from 'react'
import axios from 'axios'

const CreateUser = () => {

    const [userName,setUserName] = useState('')

    function onChangeUserName(e){
        setUserName( e.target.value)
        console.log(userName)
    }

    function onSubmit(e){
        e.preventDefault()

        const newUser = {
            userName: userName
        }

        console.log(newUser)
        axios.post('http://localhost:7000/api/users/add', newUser)
            .then((response) => {
                console.log(response.data)
                setUserName('')
            }).catch((error) => {
                console.error(error)
            })
    }

    return (
        <div className='form-create'>
            <h3>Create New User</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>UserName:</label>
                    <input className="form-control"
                           type="text"
                           required
                           value={userName}
                           onChange={onChangeUserName}
                    />
                </div>
                <div className='form-group'>
                    <button className='btn btn-primary'
                            type='submit'>
                        Create User
                    </button>
                </div>
            </form>
        </div>
    )
}
export default CreateUser
