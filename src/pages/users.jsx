import {
  Search,
  Eye,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  UserPlus,
  Download,
  Copy
} from "lucide-react";

import {
  useState,
  useMemo,
  useCallback
} from "react";

import { motion, AnimatePresence } from "framer-motion";

export default function Users() {

  const [users,setUsers] = useState(sampleUsers);

  const [search,setSearch] = useState("");

  const [page,setPage] = useState(1);

  const [sortBy,setSortBy] = useState("name");

  const [selectedUser,setSelectedUser] = useState(null);

  const rowsPerPage = 5;

  const handleSearch = useCallback((e)=>{

    setSearch(e.target.value);

  },[]);

  const filteredUsers = useMemo(()=>{

    return users.filter(user=>

      user.name.toLowerCase().includes(search.toLowerCase()) ||

      user.email.toLowerCase().includes(search.toLowerCase()) ||

      user.role.toLowerCase().includes(search.toLowerCase())

    );

  },[search,users]);

  const sortedUsers = useMemo(()=>{

    return [...filteredUsers].sort((a,b)=>{

      if(sortBy==="name")
        return a.name.localeCompare(b.name);

      if(sortBy==="date")
        return new Date(b.date)-new Date(a.date);

      return 0;
    });

  },[filteredUsers,sortBy]);

  const paginatedUsers = useMemo(()=>{

    const start=(page-1)*rowsPerPage;

    return sortedUsers.slice(start,start+rowsPerPage);

  },[page,sortedUsers]);

  const deleteUser = (id)=>{

    setUsers(prev=>
      prev.filter(user=>user.id!==id)
    );

  };

  const toggleStatus=(id)=>{

    setUsers(prev=>

      prev.map(user=>

        user.id===id
          ? {
              ...user,
              status:user.status==="Active"
              ? "Inactive"
              : "Active"
            }
          : user
      )
    );
  };

  const exportUsers=()=>{

    const data = JSON.stringify(users,null,2);

    const blob = new Blob([data]);

    const url = URL.createObjectURL(blob);

    const a=document.createElement("a");

    a.href=url;

    a.download="users.json";

    a.click();
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">

      {/* HEADER */}

      <div className="flex flex-col md:flex-row justify-between gap-4">

        <h1 className="text-3xl font-bold">
          Users
        </h1>

        <div className="flex gap-3">

          <div className="relative">

            <Search
              className="absolute left-3 top-3 text-gray-400"
              size={18}
            />

            <input
              value={search}
              onChange={handleSearch}
              placeholder="Search Users..."
              className="pl-10 h-11 w-72 border rounded-xl"
            />

          </div>

          <button
            onClick={exportUsers}
            className="bg-slate-900 text-white px-4 rounded-xl"
          >
            <Download size={18}/>
          </button>

        </div>

      </div>

      {/* STATS */}

      <div className="grid md:grid-cols-4 gap-6 mt-8">

        {[
          {
            title:"Total Users",
            value:users.length
          },
          {
            title:"Active Users",
            value:users.filter(x=>x.status==="Active").length
          },
          {
            title:"Inactive Users",
            value:users.filter(x=>x.status==="Inactive").length
          },
          {
            title:"New Users",
            value:54
          }
        ].map((card,index)=>(

          <motion.div
            key={index}
            whileHover={{y:-5}}
            className="bg-white rounded-2xl p-6 shadow-sm"
          >
            <h3>{card.title}</h3>

            <h1 className="text-4xl font-bold mt-4">
              {card.value}
            </h1>

          </motion.div>

        ))}

      </div>

      {/* TABLE */}

      <div className="bg-white mt-8 rounded-2xl shadow-sm overflow-hidden">

        <div className="p-6 border-b flex justify-between">

          <h2 className="text-xl font-semibold">
            Users List
          </h2>

          {/* ADD USER BUTTON HIDDEN */}
        </div>

        <table className="w-full">

          <thead>

            <tr className="bg-slate-50">

              <th className="text-left p-4">
                User
              </th>

              <th>Email</th>

              <th>Role</th>

              <th>Status</th>

              <th>Date</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            <AnimatePresence>

            {paginatedUsers.map(user=>(

              <motion.tr
                key={user.id}
                initial={{opacity:0}}
                animate={{opacity:1}}
                exit={{opacity:0}}
                className="border-b"
              >

                <td className="p-4">
                  {user.name}
                </td>

                <td>
                  {user.email}
                </td>

                <td>
                  {user.role}
                </td>

                <td>

                  <button
                    onClick={()=>
                      toggleStatus(user.id)
                    }
                    className={`
                      px-3 py-1 rounded-full
                      ${
                        user.status==="Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                      }
                    `}
                  >
                    {user.status}
                  </button>

                </td>

                <td>
                  {user.date}
                </td>

                <td>

                  <div className="flex gap-2">

                    <button
                      onClick={()=>
                        setSelectedUser(user)
                      }
                    >
                      <Eye size={18}/>
                    </button>

                    <button>
                      <Edit size={18}/>
                    </button>

                    <button
                      onClick={()=>
                        deleteUser(user.id)
                      }
                    >
                      <Trash2 size={18}/>
                    </button>

                    <button>
                      <Copy size={18}/>
                    </button>

                  </div>

                </td>

              </motion.tr>

            ))}

            </AnimatePresence>

          </tbody>

        </table>

        {/* PAGINATION */}

        <div className="flex justify-center gap-3 p-6">

          <button
            onClick={()=>
              setPage(prev=>
                Math.max(1,prev-1)
              )
            }
          >
            <ChevronLeft/>
          </button>

          <span>
            Page {page}
          </span>

          <button
            onClick={()=>
              setPage(prev=>prev+1)
            }
          >
            <ChevronRight/>
          </button>

        </div>

      </div>

    </div>
  );
}