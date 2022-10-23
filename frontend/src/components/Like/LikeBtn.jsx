import React from "react";
import {AiTwotoneHeart} from "react-icons/ai"
function LikeBtn(props) {


  const like = async (id) => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer "+localStorage.getItem("token")
    );

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };
    await fetch(
      `${process.env.REACT_APP_MICROSERVICE_2}/api/likes/${id}`,
      requestOptions
    )
      .then((response) => response.json())
      //.then((result) => console.log(result))
      .catch((error) => console.log("error", error));
      
  };
  return (
    <>
      <button type="button"
        className="btn btn-sm btn-outline-secondary"
        onClick={() => like(props.product._id)} >
          <AiTwotoneHeart/>
      </button>
    </>
  );
}

export default LikeBtn;
