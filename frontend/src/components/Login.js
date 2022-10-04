import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit';

const Login = props =>{
    function loginHandler(e){
        e.preventDefault();
        console.log(process.env.REACT_APP_SERVER_URL);
        console.log("Login Handler")
        window.location.href = `${process.env.REACT_APP_SERVER_URL}/auth/google`;
    }
    return (
        <div style={{marginTop: "10%"}}>
            <MDBBtn className='m-1' style={{ backgroundColor: '#dd4b39' }} onClick={loginHandler}>
                <MDBIcon fab icon='google' />
                &nbsp; Login/Signup With Google
            </MDBBtn>
        </div>
    )
}

export default Login;