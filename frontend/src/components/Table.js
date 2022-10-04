import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import TableRow from './TableRow';

function Table(props){
	console.log(props.files);
    return (
        <div className='table-responsive'>
				<table className="table">
					<thead className="table-dark">
						<tr>
						<th scope="col">#</th>
						<th scope="col">File Name</th>
						<th scope="col">Upload Date</th>
						<th scope="col">Link</th>
						</tr>
					</thead>
					<tbody>
						{props.files.map((file, index)=>{
							return  (<TableRow key={index} id={index+1} idName= {file.idName} name={file.fileName} date={file.uploadDate.split("T")[0]} />);
						})}
					</tbody>
				</table>
			</div>
    )
}

export default Table;