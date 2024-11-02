import React,{useState} from 'react'

function UserList({users,handleUserSelect}) {
    //console.log(users)
const [searchTerm, setSearchTerm] = useState('');
  return (
   
   
    <div className="col-span-5 md:col-span-2 m-0 bg-green-100 px-3">
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search by name"
      className="p-2 my-3 border border-gray-300 rounded-md "
    />
    {
    users.filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .map((user) => (
      <div
        key={user._id}
        className="user-item flex items-center gap-4 my-4 cursor-pointer"
        onClick={() => handleUserSelect(user)}
      >
        <img src={user.photo} alt={user.name} className="rounded-full w-10 h-10" />
        <div>{user.name}</div>
      </div>
    ))}
  </div>

  )
}

export default UserList