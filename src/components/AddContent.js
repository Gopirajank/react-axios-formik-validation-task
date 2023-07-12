import axios from "axios";
import { useFormik } from "formik";
import { React } from "react";
import { useNavigate } from 'react-router-dom';
import * as yup from "yup"

function AddContent() {

    let navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            Title: "",
            Author: "",
            noOfProduct: "",
            Due: "",
            status: "",
        },
        validationSchema: yup.object({
            Title: yup.string().required("Please enter Title!"),
            Author: yup.string().required("Please enter Author"),
            noOfProduct: yup.number().min(1).max(20).required("Please enter product count!"),
            Due: yup.string().required("Please mark due!"),
            status: yup.string().required("Please mark status!")
        }),
        onSubmit: values => {
            handleSave(values)
            console.log(values)
        }
    })

    let handleSave = async (data) => {
        let addUserData = await axios.post("https://614eac00b4f6d30017b482d8.mockapi.io/productandusers", data)
        console.log(addUserData)
        navigate('/ProductAndUsers')
    }

    return <div>
        <h1>Add User</h1>
        <form onSubmit={formik.handleSubmit}>
     
            <div class="form-group">
                <label for="user">Title</label>
                <input type="text" name="Title" id="Title" class="form-control" placeholder="Enter Name" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.Title} />
                {formik.touched.Title && formik.errors.Title ? (<div style={{ color: "red" }}>{formik.errors.Title}</div>) : null}
            </div>
            <div class="form-group">
                <label for="Author">Author</label>
                <input type="text" name="Author" id="Author" class="form-control" placeholder="Enter Product" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.Author} />
                {formik.touched.Author && formik.errors.Author ? (<div style={{ color: "red" }}>{formik.errors.Author}</div>) : null}
            </div>
            <div class="form-group">
                <label for="noOfProduct">No Of Product</label>
                <input type="number" name="noOfProduct" id="noOfProduct" class="form-control" placeholder="Enter No of Product" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.noOfProduct} />
                {formik.touched.noOfProduct && formik.errors.noOfProduct ? (<div style={{ color: "red" }}>{formik.errors.noOfProduct}</div>) : null}
            </div>
            <div class="form-group">
                <label for="Due">Due</label><br />
                <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                    <input type="radio" class="btn-check" name="Due" value="Paid" id="btnpaid" onChange={formik.handleChange} defaultChecked={formik.values.gender === "Paid"} />
                    <label class="btn btn-outline-success" for="btnpaid">Paid</label>

                    <input type="radio" class="btn-check" name="Due" value="Not Paid" id="btnnotpaid" onChange={formik.handleChange} defaultChecked={formik.values.gender === "Not Paid"} />
                    <label class="btn btn-outline-danger" for="btnnotpaid">Not Paid</label>
                    {formik.touched.Due && formik.errors.Due ? (<div style={{ color: "red" }}>{formik.errors.Due}</div>) : null}
                </div>
            </div>
            <div class="form-group">
                <label for="status">Status</label><br />
                <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                    <input type="radio" class="btn-check" name="status" value="Pending" id="btnradio1" onChange={formik.handleChange} defaultChecked={formik.values.gender === "Pending"} />
                    <label class="btn btn-outline-primary" for="btnradio1">Pending</label>

                    <input type="radio" class="btn-check" name="status" value="In-Progress" id="btnradio2" onChange={formik.handleChange} defaultChecked={formik.values.gender === "In-Progress"} />
                    <label class="btn btn-outline-secondary" for="btnradio2">In-Progress</label>

                    <input type="radio" class="btn-check" name="status" value="Completed" id="btnradio3" onChange={formik.handleChange} defaultChecked={formik.values.gender === "Completed"} />
                    <label class="btn btn-outline-success" for="btnradio3">Completed</label>
                    {formik.touched.status && formik.errors.status ? (<div style={{ color: "red" }}>{formik.errors.status}</div>) : null}
                </div>
            </div>

            <button type="submit" onClick={handleSave} class="btn btn-primary">Submit</button>
        </form>

    </div>;
}

export default AddContent;
