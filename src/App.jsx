import "./App.css";

// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";

export default function App() {
  const [profileData, setProfileData] = useState([
    { name: "carlos", email: "rr@kk", fetchId: 105 },
  ]);

  const handleSubmit = (name, email) => {
    setProfileData((prev) => [...prev, { name, email }]);
  };

  const handleUpdateUser = (fetchData, userId) => {
    console.log("testing update");
    setProfileData((prev) =>
      prev.map((item) => {
        if (item.id === userId) item.fetchId = fetchData.id;
        return item;
      })
    );
  };

  return (
    <div className="container">
      <div>
        <Signup onSubmit={handleSubmit} />
        <Users users={profileData} handleUpdateUser={handleUpdateUser} />
      </div>
    </div>
  );
}

// eslint-disable-next-line react/prop-types
function Signup({ onSubmit }) {
  const [name, setName] = useState("Name");
  const [email, setEmail] = useState("eMail");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(name, email);
    setName("");
    setEmail("");
  };

  return (
    <div className="signup">
      <h2>Sign Up</h2>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="name"> Enter your name:</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="email"> Enter your name:</label>
        <input
          name="email"
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div>
          <button type="submit"> Signup!</button>
        </div>
      </form>
    </div>
  );
}

// eslint-disable-next-line react/prop-types
function Users({ users, handleUpdateUser }) {
  const fetchPost = (item) => {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: item.name, email: item.email }), // body data type must match "Content-Type" header
    })
      .then((res) => res.json())
      .then((data) => handleUpdateUser(data, item.id));
  };

  return (
    <div>
      <h2> Users</h2>
      <div className="map">
        {users.map((item, index) => (
          <p key={index} onClick={() => fetchPost(item)}>
            User {++index}: {item.name}
            {item.fetchId && ` User:${item.fetchId}`}
          </p>
        ))}
      </div>
    </div>
  );
}

// import "./App.css";
// import React, { useState } from "react";

// export default function App() {
//   const [users, setUsers] = useState([]);

//   const handleSubmit = (name, email) => {
//     setUsers((prev) => [...prev, { name, email, id: prev.length + 1 }]);
//   };

//   const handleUpdateUser = (data, id) => {
//     setUsers((prev) =>
//       prev.map((item) => {
//         if (item.id === id) item.fetchId = data.id;
//         return item;
//       })
//     );
//   };

//   return (
//     <div className="container">
//       <div>
//         <SignupForm onSubmit={handleSubmit} />
//         <Users users={users} updateUser={handleUpdateUser} />
//       </div>
//     </div>
//   );
// }

// function SignupForm({ onSubmit }) {
//   const [name, setName] = useState("Papaya");
//   const [email, setEmail] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(name, email);
//     setName("");
//     setEmail("");
//     e.target.reset();
//   };

//   return (
//     <div className="signup">
//       <h3>Sign Up</h3>
//       <form action="" onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="name"> Enter your name:</label>
//           <input
//             name="name"
//             id="name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </div>
//         <div>
//           <label htmlFor="email"> Email your email:</label>
//           <input
//             name="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>
//         <div className="center">
//           <button type="submit">Signup!</button>
//         </div>
//       </form>
//     </div>
//   );
// }

// function Users({ users, updateUser }) {
//   const [data, setData] = useState({});

//   const fetchPost = (item) => {
//     fetch("https://jsonplaceholder.typicode.com/posts", {
//       method: "POST",
//       mode: "cors", // no-cors, *cors, same-origin
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ name: item.name, email: item.email }),
//     })
//       .then((res) => res.json())
//       .then((data) => updateUser(data, item.id));
//   };

//   return (
//     <div>
//       <h1>Users</h1>
//       {users.map((item, index) => (
//         <p key={item.id} onClick={() => fetchPost(item)}>
//           User {++index}: {item.name} {item.fetchId && `ID ${item.fetchId}`}
//         </p>
//       ))}
//     </div>
//   );
// }
