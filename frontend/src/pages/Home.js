import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import FileForm from "../components/FileForm"
import Login from "../components/Login";
import Table from "../components/Table"
import homeStyles from "./home.module.css";
import Logout from "../components/Logout";

axios.defaults.withCredentials = true;

const Home = props =>{
	const [user, setUser] = useState();
    const [files, setFiles] = useState([]);

    var refresh = false;

    function updateUser(val){
        setUser(val);
    }
    function updateFiles(val){
        getUser();
    }

	const getUser = async () => {
        console.log("Getting Useerrrss")
		try {
			const url = `${process.env.REACT_APP_SERVER_URL}/auth/login/success`;
			const response = await axios.get(url);
            let data = response.data;
            console.log(data);
			setUser(data.user);
            setFiles(data.user.userFiles);

		} catch (err) {
			console.log(err);
		}
	};
    function changeRefresh(val){
        refresh = val;
    }

	useEffect(() => {
		getUser();
	}, []);

    return (
        <div className={homeStyles.container}>
            {!user && <Login setUser = {updateUser} />}
            {
                user &&
                <Fragment>
                    <Logout user = {user} setUser = {updateUser} />
                    <FileForm refresh = {changeRefresh} addFile = {updateFiles} />
                    { !files && <div className={homeStyles.container}><h5>You don't have any files. Try uploading one.</h5></div>  }
                    { files && 
                        <Fragment>
                            <div className={homeStyles.container}>
                                <h3> Your Files </h3>
                            </div>
                            <Table files = {files} />
                        </Fragment>
                    }
                </Fragment>
            }
        </div>
    )
}

export default Home;