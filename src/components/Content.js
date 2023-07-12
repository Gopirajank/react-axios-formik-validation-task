import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "../App.css"
import axios from 'axios'

function Content() {

    useEffect(() => {
        getData();
    }, [])

    let navigate = useNavigate();
    let [data, setData] = useState([])

    let getData = async () => {
        let usersData = await axios.get("https://614eac00b4f6d30017b482d8.mockapi.io/productandusers")
        setData(usersData.data)
    }


    let handleDelete = async (id) => {
        try {
            let deleteUserData = await axios.delete("https://614eac00b4f6d30017b482d8.mockapi.io/productandusers/" + id);
            console.log(deleteUserData)
            getData();
        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <div>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Author Name</th>
                        <th scope="col">ISBN number</th>
                        <th scope="col">Date</th>
                        <th scope="col">Status</th>
                        <th scope="col">Options</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((e, i) => {
                            return <tr key={i}>
                                <th scope="row">{i + 1}</th>
                                <td>{e.user}</td>
                                <td>{e.productName}</td>
                                <td>{e.noOfProduct}</td>
                                <td>{e.Due}</td>
                                <td>{e.status}</td>
                                <td><button onClick={() => navigate("/edit-user/" + e.id)} className="btn btn-primary">Edit</button> &nbsp;&nbsp;
                                    <button onClick={() => handleDelete(e.id)} className="btn btn-danger">Delete</button></td>

                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Content
