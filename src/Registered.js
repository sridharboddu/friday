import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios';
import {Link,withRouter} from 'react-router-dom';
function Registered(props) {

let[data,setData]=React.useState("")
    useEffect(()=>{
        let uid=props.match.params.uid;
        console.log(uid);
        // alert(uid)
        axios.post(`http://friday-deploy.herokuapp.com/registration/account-confirm-email/${uid}/`)
        .then(resp=>{
            console.log(resp.data)
            setData(resp.data)
        })
        .catch(error=>{
            console.log(error,"error")
            // props.history.push("/signup")
        })
    },[])
    return (
        <div>
               { data &&
                <div style={{position:"absolute",top:"50%",left:"50%"}}>
                 <h2>Registered Successfull..! Click here to<Link to="/"> Signin</Link> </h2>
                 </div>
                } 
        
           
        </div>
    )
}

Registered.propTypes = {

}

export default withRouter(Registered)
