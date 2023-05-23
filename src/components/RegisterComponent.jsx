import {useState} from 'react';
import {Formik,Form,Field,ErrorMessage} from 'formik';
import {useNavigate} from 'react-router-dom';
import {executeJwtRegisterService} from './api/RegisterApi.js'
import './loginRegister.css';

export default function RegisterComponent(){

    const navigate = useNavigate()
    const [showErrorMessage,setShowErrorMessage] = useState(false)

    function onSubmit(values){
       
        executeJwtRegisterService(values.firstName,values.lastName,values.email,values.password,values.role)
        .then((response) => {
            
            //console.log(response)
            if(response.data.register === false){
                
                navigate(`/login`)
            }
            else{
                setShowErrorMessage(true)
            }
        })
        .catch(
            () => setShowErrorMessage(true)
        )
       
    }

    function validate(values){
        const errors = {};
        var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");

        if(!values.firstName){
            errors.firstName = "Enter your first Name"
        }
        else if(!values.lastName){
            errors.lastName = "Enter your last Name"
        }
        else if(!values.role || !(values.role==="ADMIN" || values.role==="USER")){
            errors.role = "The role should be either ADMIN or USER"
        }
        else if(!values.email || !(values.email.endsWith("@paytm.com") || values.email.endsWith("@ocltp.com") || values.email.endsWith("@paytmbank.com") || values.email.endsWith("@paytmpayment.com"))){
            errors.email = "Enter a Valid Paytm Email Id"
        }
        else if(!strongRegex.test(values.password) ){
            errors.password = "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
            
        }

        return errors;
    }


    return (
        <>
        <div className="LoginComponent">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-6">

                <div>
                    <b><h1 className="m-5 text-center"> Register for LUP Admin Panel  </h1></b>
                </div>

                <Formik   onSubmit={onSubmit}
                          validate={validate}
                          validateOnChange={false}
                          validateOnBlur={false}
                          //initialValues={{username:"" , password:""}}
                          initialValues={{firstName:"",lastName:"",role:"",email:"" , password:""}}

                          enableReinitialize={true}
                    >
                    {
                        (props) => (
                            <Form className="row justify-content-center m-5">

                                <fieldSet className="form-group m-3">
                                    <label> First Name </label>
                                    <Field type="text" className="form-control" name="firstName" placeholder="Enter Your First Name"/>
                                    <ErrorMessage name="firstName" component="div" className = "alert alert-danger" />
                                </fieldSet>

                                <fieldSet className="form-group m-3">
                                    <label> Last Name </label>
                                    <Field type="text" className="form-control" name="lastName" placeholder="Enter Your Last Name"/>
                                    <ErrorMessage name="lastName" component="div" className = "alert alert-danger" />
                                </fieldSet>

                                <fieldSet className="form-group m-3">
                                    <label> User Role </label>
                                    <Field type="text" className="form-control" name="role" placeholder="ADMIN / USER"/>
                                    <ErrorMessage name="role" component="div" className = "alert alert-danger" />
                                </fieldSet>


                                <fieldSet className="form-group m-3">
                                    <label> Email Id </label>
                                    <Field type="email" className="form-control" name="email" placeholder="Enter Your Paytm Email Id"/>
                                    <ErrorMessage name="email" component="div" className = "alert alert-danger" />
                                </fieldSet>

                                <fieldSet className="form-group m-3">
                                    <label> Password </label>
                                    <Field type="password" className="form-control" name="password" placeholder="Enter Your Password"/>
                                    <ErrorMessage name="password" component="div" className = "alert alert-danger" />
                                </fieldSet>

                                {showErrorMessage && <div className="errorMessage text-center text-danger">
                                                    <span>Already Registered , Register a New Member</span>
                                                    </div>
                                }

                                <button className="btn bg-dark text-white m-5 text-center" type="submit" > Register </button>
                            </Form>
                        )
                    }
                </Formik>
              </div>
            </div>
          </div>
          <div style={{textAlign:"center"}}>
                <button class="button1"  onClick={() => navigate(-1)} ><span>Go Back </span></button>
          </div>
        </div>
        

        </>
    )
}

