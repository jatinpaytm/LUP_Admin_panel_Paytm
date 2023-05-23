
import { Link } from "react-router-dom"
import { useAuth } from "./AuthContext"
//import { useParams } from "react-router-dom"

export default function HeaderComponent() {

    const authContext = useAuth()
    console.log("link part")
    const nameUrl = window.location.href
    
    // const {register}= useParams()
    //console.log(nameUrl);
    //console.log(nameUrl.endsWith("register"));

    const isAuthenticated = authContext.isAuthenticated

    const role = authContext.role

    function logout() {
         authContext.logout()
    }

    //console.log(authContext)
    //console.log(authContext.number);

    return (
        <header className="border-bottom border-light border-5 mb-5 p-2">
            <div className="container">
                <div className="row">
                    <nav className="navbar navbar-expand-lg">
                        <a className="navbar-brand ms-2 fs-2 fw-bold text-black" href="https://paytm.com/"> <mark className="darkBlue">Pay<mark className="lightBlue">tm</mark></mark> </a>
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav">
                                <li className="nav-item fs-5">
                                    {isAuthenticated && <Link className="nav-link" to="/welcome">Home</Link>}
                                </li>

                               
                            </ul>
                        </div>
                        <ul className="navbar-nav">
                                <li className="nav-item fs-5">
                                    {role==="ADMIN" && isAuthenticated && !nameUrl.endsWith("register") && <Link className="nav-link" to="/register">Register</Link>}
                                </li>
                                <li className="nav-item fs-5">
                                    {!isAuthenticated && !nameUrl.endsWith("login") && !nameUrl.endsWith("/") && <Link className="nav-link" to="/login">Login</Link>}
                                </li>
                                <li className="nav-item fs-5">
                                    {isAuthenticated && <Link className="nav-link" to="/login" onClick={logout}>Logout</Link>}
                                </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}