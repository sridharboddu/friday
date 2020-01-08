import React from 'react'
import PropTypes from 'prop-types'
import {Typography,Grid,List,ListItem,ListItemIcon,ListItemText,Card,CardContent} from '@material-ui/core';
import Lens from '@material-ui/core/Icon';
import './Style.css'
import axios from 'axios';
import {withRouter} from 'react-router-dom'
import EditIcon from '@material-ui/icons/Edit';
function ProjectView_Personas(props) {
    let [data,setData]=React.useState([]);
    let [path,setPath]=React.useState("https://friday-deploy.herokuapp.com/media/")

   React.useEffect(()=>{
       let id=localStorage.getItem("project_id");
       let token=localStorage.getItem("token");
       console.log(id,"id")
   axios.post(`http://friday-deploy.herokuapp.com/api/persona-view/`,{"id":id},
     {headers:{"Authorization":`Token ${token}`}})
   .then(resp=>{
       console.log(resp.data)
       setData(resp.data)
   })

   },[])

   let editStory=(id)=>{
       console.log(id,"edit_id")
    localStorage.setItem("edit_id",id);
    props.history.push("/project_personas")

   }

    return (
        <div>


    {
        data.map(i=>(
            
            <React.Fragment>              
             
            <div class="row projectview_personas_maindiv">

            &nbsp;
                                 <Grid container>
            
            
            {/* <Grid sm={3}></Grid> */}
            
            
            
            <Grid container justify = "center">
            
            
            <Grid sm={6}   class="bor-b">
            
            <Grid container spacing={3}>
             
                    <Grid item xs={4} >
                       
            
                    <div class="left-div">          
                                         
                                       
                    <div class="profile-img">
                        <div>
                        <div class="img-border">
                     <img src={i.fields.picture} alt="virat img" class="projectview_personas_img"/>
                     </div>
                     <div class="profile-name">
                     <Typography class="projectview_personas_name" ><b>{i.fields.username}</b></Typography>
                     <Typography class="profile_name_designation" ><b>{i.fields.profession}</b></Typography>
                     </div>
                     </div>
                     </div>
                    
                    
                     <Grid container spacing={0} >
                    
                            <Grid item xs={6}>
                            <b>Experience:</b>
                            </Grid>
                            <Grid item xs={6}>
                             {i.fields.experience}
                            </Grid>
                    
                            <Grid item xs={6}>
                            <b>Family:</b>
                            </Grid>
                            <Grid item xs={6}>
                            {i.fields.family}
                            </Grid>
                        
                            <Grid item xs={6}>
                            <b>Location:</b>
                            </Grid>
                            <Grid item xs={6}>
                            {i.fields.location}
                            </Grid>
                            
                            </Grid>
                    
                        
                    
                    
                    
                     <h1 class="projectview_personas_Description">Description</h1>
                    
                    
                     <Typography class="projectview_personas_Description-mtr">{i.fields.description}</Typography>                     
                        
                     </div>
                            </Grid>
                    
                            <Grid item xs={8}>
                         
                    
                          <div class="panel-b">
                                                     <h1>Needs/Goals</h1>
                                                     <div class="panel-body">
                    
                                                         <ul>
                                                                <li>{i.fields.needs}  </li>
                                                                
                                                         </ul>                                   
                                                     </div>
                           </div>                                           
                    
                                             <div class="panel-b">
                                                     <h1>Challenges/Frustrations</h1>
                                                     <div class="panel-body">
                    
                                                         <ul>
                                                         <li>{i.fields.challenges}  </li>                                                                         
                                                                                                                                       
                    
                                                                                                  
                    
                    
                    
                                                         </ul>
                                                    </div>
                                                    
                                         <div class="projectview_personas_btns" >
                                         <button class=" btn  primary waves-effect waves-light right sub-btn btn_edit_projectview_personas" onClick={e=>editStory(i.pk)}>Edit</button>    
                                                 
                                                  </div>
                                                 </div>
                            </Grid>
                    
                    
                            </Grid>
                    
                        </Grid>
                    </Grid>                    
                   
                                         </Grid>
                    
                                      
                    &nbsp;
                    
                    
                    
                                              <br/>                                
                    
                    
                    
                    
                                          </div>
             
            
            </React.Fragment>

        ))
    }          

          
        </div>
    )
}

ProjectView_Personas.propTypes = {

}

export default withRouter(ProjectView_Personas) 