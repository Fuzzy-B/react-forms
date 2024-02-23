import { useState, useEffect } from "react" 
import axios from "axios"

function SignUpForm({setToken}) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null) 
    const [displayUser, setDisplayUser] = useState(null)

    useEffect(()=> {
        if (username.length < 8 && username) {
            setError('please enter username that is at least 8 characters long')
        } else {
            setError('')
        }
    }, [username])

    async function handleSubmit(event) {
        event.preventDefault()
        
        try {
            if(error){
                setError('cannot create account with username under 8 characters')
                return
            }
            const result = await axios.post('https://fsa-jwt-practice.herokuapp.com/signup')
            setToken(result.data.token)   
            setDisplayUser(username)  
        } catch(err){
            setError(err.message)
        }
         
    } 

    return (
    <>  
         
        {displayUser && (<><h4>Logged in as:</h4> <p>{displayUser}</p> </>)}
        <h2>Sign Up</h2>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
            <label>
                Username: <input value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <label>
                Password: <input value={password} onChange={(e)=> setPassword(e.target.value)} />
            </label>
            <button>Submit</button>
        </form>
    </>
    )
}


export default SignUpForm 