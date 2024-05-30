import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import axios from "axios";
import { Navigate } from "react-router-dom"; // Assuming Navigate is imported from react-router-dom
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";
import { toast } from "react-toastify";

const Dashboard = () => {
   const { isAuthenticated, admin } = useContext(Context); // Corrected destructuring

   const [appointments, setAppointments] = useState([]);

   useEffect(() => {
      const fetchAppointments = async () => {
         try {
            const { data } = await axios.get(
               "http://localhost:4000/api/v1/appointment/get",
               { withCredentials: true }
            );
            // console.log(data);
            setAppointments(data.appointment);
         } catch (error) {
            console.error("Error fetching appointments:", error);
            setAppointments([]);
         }
      };

      fetchAppointments(); // Corrected function name
   }, []);

   const handleUpdateStatus = async (appointmentId, status) => {
      try {
         const { data } = await axios.put(
            `http://localhost:4000/api/v1/appointment/update/${appointmentId}`,
            { status },
            {
               withCredentials: true,
            }
         );

         // Update local state without causing page refresh
         setAppointments((prevAppointments) =>
            prevAppointments.map((appointment) =>
               appointment._id === appointmentId
                  ? { ...appointment, status }
                  : appointment
            )
         );

         toast.success(data.message);
      } catch (error) {
         toast.error(error.response.data.message);
      }
   };

   if (!isAuthenticated) {
      return <Navigate to={"/login"} />; // Assuming you want to redirect to login if not authenticated
   }

   return (
      <>
         <section className="dashboard page">
            <div className="banner">
               <div className="firstBox">
                  <img src="/doc.png" alt="docImg" />
                  <div className="content">
                     <div>
                        <p>Hello ,</p>
                        <h5>
                           {admin && `${admin.firstName} ${admin.lastName}`}{" "}
                        </h5>
                     </div>
                     <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Facilis, nam molestias. Eaque molestiae ipsam
                        commodi neque. Assumenda repellendus necessitatibus
                        itaque.
                     </p>
                  </div>
               </div>
               <div className="secondBox">
                  <p>Total Appointments</p>
                  <h3>1500</h3>
               </div>
               <div className="thirdBox">
                  <p>Registered Doctors</p>
                  <h3>10</h3>
               </div>
            </div>
            <div className="banner">
               <h5>Appointment</h5>
               <table>
                  <thead>
                     <tr>
                        <th>Patient</th>
                        <th>Date</th>
                        <th>Doctor</th>
                        <th>Department</th>
                        <th>Status</th>
                        <th>Visited</th>
                     </tr>
                  </thead>
                  <tbody>
                     {appointments && appointments.length > 0 ? (
                        appointments.map((appointment) => {
                           //  console.log(appointment.firstName);
                           return (
                              <tr key={appointment._id}>
                                 <td>{`${appointment.firstName} ${appointment.lastName}`}</td>
                                 <td>{`${appointment.appoinment_date.substring(
                                    0,
                                    16
                                 )}`}</td>
                                 <td>{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
                                 <td>{`${appointment.department}`}</td>
                                 {/* <td>{`${appointment.status}`}</td> */}
                                 <td>
                                    {" "}
                                    <select
                                       className={
                                          appointment.status === "Pending"
                                             ? "value-pending"
                                             : appointment.status === "Accepted"
                                             ? "value-accepted"
                                             : "value-rejected"
                                       }
                                       value={appointment.status}
                                       onChange={(e) =>
                                          handleUpdateStatus(
                                             appointment._id,
                                             e.target.value
                                          )
                                       }
                                    >
                                       <option
                                          value="pending"
                                          className="value-pending"
                                       >
                                          Pending
                                       </option>
                                       <option
                                          value="accepted"
                                          className="value-accepted"
                                       >
                                          Accepted
                                       </option>
                                       <option
                                          value="rejected"
                                          className="value-rejected"
                                       >
                                          Rejected
                                       </option>
                                    </select>
                                 </td>
                                 <td>
                                    {appointment.visited ? (
                                       <GoCheckCircleFill className="green" />
                                    ) : (
                                       <AiFillCloseCircle className="red" />
                                    )}
                                 </td>
                              </tr>
                           );
                        })
                     ) : (
                        <h1>Not Found</h1>
                     )}
                  </tbody>
               </table>
            </div>
         </section>
      </>
   );
};

export default Dashboard;
