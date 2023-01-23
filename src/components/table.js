import React, { useEffect, useState } from "react";
import axios from "axios";

export default function TableData() {
    const [data, setData] = useState([]);
    const getData = async () => {
        const { data } = await axios.get("https://2q9nuw9rj3.execute-api.us-east-1.amazonaws.com/items")
        setData(data);
      };
    
    // useEffect(() => {
    //     getData();
    //   }, []);
    //   return <div>{JSON.stringify(data)}</div>;
    
    const updateFunction = async (params) => {
        const data = await axios.put("https://2q9nuw9rj3.execute-api.us-east-1.amazonaws.com/items", params )
        return data
    }
    
    const deleteFunction = async (id) => {
        const { data } = await axios.delete(`https://2q9nuw9rj3.execute-api.us-east-1.amazonaws.com/items/${id}`)
        return data
    }
    
    const rows = [{productId:1,productName:"silla"},{productId:2,productName:"mesa"},]
    
  return (
    <div className="container">
    <div className="row">
        <div className="col-12">
        <table className="table table-bordered">
            <thead>
            <tr>
                <th scope="col">Product Id</th>
                <th scope="col">Name</th>
                <th scope="col">Actions</th>
            </tr>
            </thead>
            <tbody>
            {rows.map((row) => (

            <tr key={row.productId}>
                    <>
                    <td>{row.productId}</td>
                    <td>
                        <input type={"text"} value={row.productName} />
                    </td>
                    <td>
                        <button type="button" className="btn btn-info" onClick={ () => (updateFunction(row))}>Update</button>
                        <button type="button" className="btn btn-danger" onClick={ () => (deleteFunction(row.productId))}>Delete</button>
                    </td>
                </>
                </tr>
            ))}

            </tbody>
        </table>
        </div>
    </div>
    </div>
    );
}