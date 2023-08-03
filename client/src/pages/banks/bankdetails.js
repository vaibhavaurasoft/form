import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, NavLink } from "react-router-dom";

const BankDetailsPage = () => { 
  const [userData, setUserData] = useState({});
  const { id } = useParams();

  const callAboutPage = async () => {
    try {
      const { data } = await axios.get(`/bank/${id}`);
      setUserData(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    callAboutPage();
  }, []);
  return (
    <>
      <main id="main" className="main">
      
        <section className="section profile d-flex align-item-center p-3">
          <div className="row">


            <div className="  ">
              <div className="card">
                <div className="card-body pt-3">
                  <ul className="nav nav-tabs nav-tabs-bordered">
                    <li className="nav-item">
                      <button
                        className="nav-link active"
                        data-bs-toggle="tab"
                        data-bs-target="#profile-overview"
                      >
                        Overview
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className="nav-link"
                        data-bs-toggle="tab"
                        data-bs-target="#profile-edit"
                      >
                        Edit Bank details
                      </button>
                    </li>
                  </ul>
                  <div className="tab-content pt-2">
                    <div
                      className="tab-pane fade show active profile-overview"
                      id="profile-overview"
                    >
                      <p className="small fst-italic p-3">
                        {/* this is {userData.role} profile */}
                      </p>
                      <table class="table">
                        <thead>
                          <tr>
                            <th scope="col">Name</th>
                            <td scope="col" className="ShowData">
                              {/* {userData.name} */}
                            </td>
                          </tr>
                          <tr>
                            <th scope="col">Email</th>
                            {/* <td className="ShowData">{userData.email}</td> */}
                          </tr>
                          <tr>
                            <th scope="col">Role</th>
                            {/* <td className="ShowData">{userData.role}</td> */}
                          </tr>
                          <tr>
                            <th scope="col">Id</th>
                            {/* <td className="ShowData">{userData._id}</td> */}
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            {/* <th>{userData.name}</th> */}
                            {/* <td>Mark</td> */}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <a
        href="#"
        className="back-to-top d-flex align-items-center justify-content-center"
      >
        <i className="bi bi-arrow-up-short"></i>
      </a>
    </>
  );
};

export default BankDetailsPage;
