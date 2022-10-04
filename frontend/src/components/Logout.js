import axios from "axios";

const Logout = props =>{
    const logoutHandler = async (e)=>{
        e.preventDefault();
        let url = `${process.env.REACT_APP_SERVER_URL}/auth/logout`;
        try{
            await axios.get(url);
        }catch(e){
            console.log(e);
        }
        props.setUser(null);
    }
    return (
        <div style={{padding: "30px", margin: "30px"}} className="row">

            <div className="col-6">
                {props.user.userName}
            </div>
            <div className="col-6">
                <button className="btn btn-warning" onClick={logoutHandler}>Logout</button>
            </div>
        </div>
    )
}
export default Logout;