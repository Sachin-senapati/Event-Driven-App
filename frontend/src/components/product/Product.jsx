import { useEffect,useState } from "react";
import {Link } from "react-router-dom"
function Products(){
    const [products,setproduts]=useState([])
    useEffect(()=>{
        loadProducts();
    },[products]);
    const loadProducts=async()=>{
        var myHeaders = new Headers();
        myHeaders.append(
          "Authorization",
          "Bearer "+localStorage.getItem("token")
        );

        var requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };

    await fetch(
      `${process.env.REACT_APP_MICROSERVICE_1}/api/find_all`,
      requestOptions
    )
      .then(async (response) => {
        const resp_json = await response.json();
        setproduts(resp_json);
        //console.log(resp_json)
      })
      .catch((error) => console.log("error", error));
    }
    const deleteUser = async id => {
        var myHeaders = new Headers();
        myHeaders.append(
          "Authorization",
          "Bearer " + localStorage.getItem("token")
        );

        var requestOptions = {
          method: "DELETE",
          headers: myHeaders,
          redirect: "follow",
        };

    await fetch(
      `${process.env.REACT_APP_MICROSERVICE_1}/api/delete/${id}`,
      requestOptions
    )
      .then(async (response) => {
        await response.json();
        await loadProducts();
      })
      //.then(result => console.log(result))
      .catch((error) => console.log("error", error));
      };
    return(
    <div className="container ">
      <div className="py-4">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr >
              <th scope="col">Sl No.</th>
              <th scope="col">Image</th>
              <th scope="col">Title</th>
              <th scope="col">Likes</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product._id}>
                <th scope="row">{index + 1}</th>
                <td><img src={product.image} alt="products" className="img" /></td>
                <td><p>{product.title}</p></td>
                <td><p>{product.likes}</p></td>
                <td>
                  <Link
                    className="btn btn-outline-primary m-2"
                    to={`/product/update/${product._id}`}
                  >
                    Edit
                  </Link>
                  <Link
                    className="btn btn-danger mr-2"
                    onClick={() => deleteUser(product._id)}
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    )
};
export default Products;