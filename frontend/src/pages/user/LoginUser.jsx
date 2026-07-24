import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import {reset, login} from "../../features/auth/authSlice"
import Spinner from "../../components/Spinner"
import { toast } from "react-toastify"

function LoginUser() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const { user, isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.auth
    )

    const {email, password} = formData

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }
        
        if(isSuccess) {
            navigate('/')
        }
        dispatch(reset())
    }, [user, isError, isSuccess, message, dispatch, navigate])

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    const onSubmit = (e) => {
        e.preventDefault()

        const userData = {
            email,
            password
        }
        dispatch(login(userData))
    }

    if(isLoading) {
        return <Spinner />
    }

    return (
        <>
          <section className="heading">
            <h1>Login User</h1>
          </section>
          <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email: </label>
                    <input type="email" className="form-control" 
                           name="email" id="email" value={email}
                           placeholder="Enter your email"
                           onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password: </label>
                    <input type="password" className="form-control" 
                           name="password" id="password" value={password}
                           placeholder="Enter your password"
                           onChange={handleChange} />
                </div>
                <div className="form-group">
                    <button className="form-control btn btn-primary" type="submit">
                        Login
                    </button>
                </div>
            </form>
          </section>
        </>
    )
}

export default LoginUser