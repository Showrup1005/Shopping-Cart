import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from "react-toastify";
import { reset, register } from '../../features/auth/authSlice'
import Spinner from '../../components/Spinner';

function RegisterUser() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const {name, email, password, password2} = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {user, isSuccess, isError, isLoading, message} = useSelector(
        (state) => state.auth
    )

    useEffect(() => {
        if(isError) {
            toast.error(message)
        } 

        if(isSuccess) {
            navigate('/')
        }

        dispatch(reset())
    }, [isSuccess, isError, navigate, dispatch, user, message])

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if(password !== password2) {
            toast.error('Password do not match')
        } else {
            const userData = {
                name,
                email,
                password
            }
            dispatch(register(userData))
        }
    }

    if(isLoading) {
        return <Spinner/>
    }

    return (
        <>
          <section className="heading">
            <h1>Registration Form</h1>
          </section>
          <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input type="text" className="form-control"
                        name='name' id='name' value={name}
                        placeholder="Enter your name"
                        onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email: </label>
                    <input type="email" className="form-control"
                        name='email' id='email' value={email}
                        placeholder="Enter your email"
                        onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password: </label>
                    <input type="password" className="form-control"
                        name='password' id='password' value={password}
                        placeholder="Enter your password"
                        onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password2">Confirm password: </label>
                    <input type="password" className="form-control"
                        name='password2' id='password2' value={password2}
                        placeholder="Enter your password again"
                        onChange={handleChange} />
                </div>
                <div className='form-group'>
                    <button type="submit" className='form-control btn btn-primary' >
                        Register
                    </button>
                </div>
            </form>
          </section>
        </>
    )
}

export default RegisterUser