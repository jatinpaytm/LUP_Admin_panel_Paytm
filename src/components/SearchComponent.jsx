import {useState,useEffect} from 'react';
import {useParams,Link} from 'react-router-dom';
import {retrieveRootsByIdApi} from './api/rootsApi.js'
import {useNavigate } from 'react-router-dom';
import './SearchComponent.scss';
// import {useAuth} from './AuthContext';

// import Root from './Root'

export default function SearchComponent(){



    const [roots,setRoots] = useState([])

    const {values} = useParams()

    const navigate = useNavigate()

    //const authContext = useAuth()
    

    useEffect(
        () => refreshRoots(values)
    )

    function refreshRoots(values){
      // console.log(authContext.username);
      // console.log(authContext.email);
        retrieveRootsByIdApi(values)
            .then((response)=> setRoots(response.data) )
            .catch((error)=> console.log(error))
    }
    

    return (
      <>
         <div className="SearchComponent container">
            <h2 className="m-5 text-center"> Your Results appear here</h2>
            <div className="">
                <ul className="responsive-table">
                       <li className="table-header">
                           
                                <div class="col col-1"> Lead Id</div>
                                <div class="col col-2"> Customer Id </div>
                                <div class="col col-3"> Product Type</div>
                                <div class="col col-4"> Email </div>
                            
                       </li>

                      
                            {
                              roots.map(
                                    root => (
                                    <li className="table-row" key={root._id}>

                                                <div class="col col-1">
                                                  <Link to='/root'
                                                        state = {{root}}
                                                  >
                                                    {root._id}
                                                  </Link>
                                                </div>

                                                <div class="col col-2"> {root.customerId}</div>
                                                <div class="col col-3"> {root.productType}  </div>
                                                <div class="col col-4"> {root.email}  </div>
                                        </li>
                                    )
                                )
                            }
                      
                </ul>
            </div>
            <div style={{textAlign:"center"}}>
                <button class="button1"  onClick={() => navigate(-1)} ><span>Go Back </span></button>
            </div>
        </div>

        
      </>
       
    );
}