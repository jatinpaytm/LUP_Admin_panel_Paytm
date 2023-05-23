import { useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import { updateEmailApi ,retrieveRootById} from './api/rootsApi'
import 'react-toastify/dist/ReactToastify.css';
import {Formik, Form, Field, ErrorMessage} from 'formik'


export default function UpdateComponent(){

    const {_id} = useParams()
    //console.log(_id)

    const[email, setEmail] = useState('')

    const navigate = useNavigate();

   
    // this is used to call function to render effect
    useEffect(
        () => retrieveEmail(_id)
        )

    function retrieveEmail(_id){
        // will not work for new Todo
        
            retrieveRootById(_id)
            .then(response => {
                //console.log(response)
                //console.log(response.data[0].email)
                setEmail(response.data[0].email)
                // setTargetDate(response.data.targetDate)
        
            })
            .catch(error => console.log(error))
        
        
    
    }
    // function is used to update a todo element
    function onSubmit(values) {
        console.log("priting internal values "+ values.email)
       
            updateEmailApi(_id,values.email)
            .then(response => {
                var para = "lead_id&" + _id;
                navigate(`/search/${para}`)
               
                
            })
            .catch(error => console.log(error))
        
    }

    function validate(values){
        const errors = {};
        if(!values.email || !values.email.endsWith("@paytm.com")){
            errors.email = "Enter a Valid Paytm Email Id"
        }
        //console.log(errors);
        return errors;
    }


    return (
        <div className="container">
            <h1 className='text-center' >Enter The New Email </h1>
            <div>
                {console.log(email)}
                <Formik initialValues={ { email} } 
                    // below will intitialise the form with the current values.. before change
                    enableReinitialize = {true}
                    onSubmit = {onSubmit}
                    validate = {validate}
                    // below 2 will make changes in console when we hit save
                    validateOnChange = {false}
                    validateOnBlur = {false}
                >
                
                    <Form>
                    <ErrorMessage 
                        name="email"
                        component="div"
                        className = "alert alert-warning"
                    />
                                
                    <fieldset className="form-group">
                                    
                        <Field type="Email" className="form-control" name="email" />
                    </fieldset>
                            
                    <div style={{textAlign:"center"}}>
                        <button className="btn btn-secondary m-5"  type="submit">Save</button>
                        
                    </div>
                    </Form>
                    
                
                
                </Formik>
                <div style={{textAlign:"center"}}>
                <button class="button1"  onClick={() => navigate(-1)} ><span>Go Back </span></button>
                </div>
                
            </div>
            
        </div>
    )
}