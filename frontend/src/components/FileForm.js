import axios from "axios";
import { useState } from "react";

const FileForm = props => {
    const [file, setFile] = useState(null);
    const formSubmitHandler = async(event) => {
        console.log("formSubmit")
        event.preventDefault()
        const formData = new FormData();
        formData.append("newFile", file);
        try {

            let url = `${process.env.REACT_APP_SERVER_URL}/auth/upload`
            const response = await axios({
                method: "post",
                url: url,
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            });
            let data = response.data
            console.log(data)
            props.addFile(data.fileDetails)
        } catch(error) {
          console.log(error)
        }
    }

    function changeFileHandler(e){
        setFile(e.target.files[0]);
    }
    
    return (
        <div>
            <form className="row row-cols-lg-auto g-3 align-items-center" onSubmit={formSubmitHandler}>
                <div className="form-outline form-white">
                    {/* <label class="form-label" for="customFile">Default file input example</label> */}
                    <input type="file" className="form-control" id="customFile" onChange={changeFileHandler} />
                </div>
                <div className="form-outline form-white">
                    <input type="text" id="form12" className="form-control" placeholder="Enter File Name" />
                    {/* <label className="form-label" htmlFor="form12">Enter File Name</label> */}
                </div>

                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}
export default FileForm;