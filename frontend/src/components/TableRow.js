const TableRow = props =>{
    return (
        <tr className='table-dark'>
            <th scope="row">{props.id}</th>
            <td>{props.name}</td>
            <td>{props.date}</td>
            <td><a href= {process.env.REACT_APP_SERVER_URL + "/upload/" + props.idName } >View File</a></td>
        </tr>
    )
}
export default TableRow;