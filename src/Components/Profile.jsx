import React from 'react'
import {Link} from "react-router-dom"

function Profile() {
  return (
    <div>
      <h1>Welcome to the Anuj page</h1>
      <Link to="/"><button>Clik me to go back</button></Link>
    </div>
  )
}
export default Profile