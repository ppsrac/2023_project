import { Link } from "react-router-dom";

// import React from 'react';
function NotFound() {
  return (
    <>
      <div
        style={{
          height: "50vh",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          minHeight: "300px",
        }}
      >
        <div
          style={{
            // marginTop: "auto",
            fontSize: "70px",
            fontWeight: "700",
          }}
        >
          404
        </div>
        <div
          style={{
            // marginTop: "auto",
            fontSize: "30px",
            fontWeight: "700",
          }}
        >
          Not Found
        </div>
        <div
          style={{
            width: "200px",
            marginLeft: "auto",
            marginRight: "auto",
            fontSize: "12px",
          }}
        >
          <hr />
          <div>
            The Page you are looking for doesn't exist or and other error
            occured.
          </div>
          <hr />
          <div style={{ textDecorationLine: "underline" }}>
            {" "}
            <Link to="">{`Go to Homepage ⇀`}</Link>{" "}
          </div>
        </div>
      </div>
    </>
  );
}
export default NotFound;
