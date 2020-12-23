import { React, useState, useEffect } from "react";
import "./Sidebar.css";
import ChatIcon from "@material-ui/icons/Chat";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { IconButton, Avatar } from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import SidebarChat from "./SidebarChat/SidebarChat";
import SidebarDropdown from './SidebarDropdown/SidebarDropdown';
//*React-Redux
import { fetchContacts } from '../../../redux/actions/contactsActions';
import { useSelector, useDispatch } from 'react-redux';


const Sidebar = ({ user }) => {
  //{ Estado Local
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchUser, setSearchUser] = useState("");
  //* Estado en Store
  const contacts = useSelector(state => state.contacts)
  const dispatch = useDispatch();



  //*Llamada a la API
  useEffect(() => { 
    (async function() {
      try{
        const baseURL = 'https://academlo-whats.herokuapp.com/api/v1/users';
        const message = await dispatch(fetchContacts(baseURL));
        alert(`Sidebar: useEffect => Se han recibido los contactos correctamente. ${message}`);
      }catch(error){
        alert(`Sidebar: useEffect er => ${error.message}`);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const showDropdownMenu = () => {
    setShowDropdown(true);
  };
  const hideDropdownMenu = () => {
    setShowDropdown(false);
  };
  const handleSearchUser = (e) => {
    setSearchUser(e.target.value)
    console.log(e.target.value);
  };


  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={user.photoURL} />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input
            placeholder= "Busca o inicia un nuevo chat"
            type="text"
            onFocus={showDropdownMenu}
            onBlur={hideDropdownMenu}
            onChange={handleSearchUser}
            value={searchUser}
          />
        </div>
      </div>
      <div className="sidebar__chats">
        {
          showDropdown ?          
          contacts.filter(contact => 
            contact.username.toLowerCase().includes(searchUser.toLowerCase())
          ).map((contact , i) => {
            return (
              <SidebarDropdown key={i} photo={contact.photoUrl} fName={contact.firstName} lName={contact.lastName} id={contact._id} />
            )
          }) :
          <SidebarChat />
        }
      </div>
    </div>
  );
};

export default Sidebar;
