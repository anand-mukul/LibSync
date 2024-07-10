// "use client";

// import axios from "axios";
// import { useEffect, useState } from "react";

// export default function UserDetails() {
//     const [user, setUser] = useState(null);
//     useEffect(() => {
//         axios
//             .get("/api/users/current-user", {
//                 withCredentials: true,
//             })
//             .then((response) => setUser(response.data.data.user));
//     }, []);
//     return (
//         <div>
//             {user && (
//                 <div>
//                     <h1>{user.fullNname}</h1>
//                     <p>{user.email}</p> 
//                 </div>
//             )}
//         </div>
//     );
// }