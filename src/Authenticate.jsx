import { useState } from "react"
import axios from "axios"

function Authenticate({token}) {
    const [error, setError] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)
     

    async function handleClick() {
        try{
            const response = await fetch(
                "https://fsa-jwt-practice.herokuapp.com/authenticate",
                {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              const result = await response.json();
            if (result.message !== 'Correctly Authenticated!' ) {
                setError(`could not authenticate: ${result.message}, make sure you are logged in`)
                return
            } else {
                setError('')
            }
            setSuccessMessage(result.message) 
        }catch(err){
            setError(err.message)
        }
    }
 
    return (
<> 
    <h2>Authenticate</h2>
    {successMessage && <p>{successMessage}</p>}
    {error && <p>{error}</p>} 
    <button onClick={handleClick}>Authenticate Token</button>
</>
    )
}



export default Authenticate