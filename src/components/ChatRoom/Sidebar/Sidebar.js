import { React, useState, useEffect, useRef } from "react";
import "./Sidebar.css";
import {useHistory} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchConversations } from '../../../redux/actions/chatActions';
import { fetchContacts } from '../../../redux/actions/contactsActions';
import { logout } from '../../../redux/actions/authActions';
import ChatIcon from "@material-ui/icons/Chat";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { IconButton, Avatar } from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import SidebarChat from "./SidebarChat/SidebarChat";
import SidebarDropdown from './SidebarDropdown/SidebarDropdown';


//{ Called from ChatRoom.jsx
const Sidebar = () => {
  //{ Estado Local
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchUser, setSearchUser] = useState("");
  //{ Estado Global
  const { user } = useSelector(state => state.auth);
  const { conversations } = useSelector(state => state.chat);
  const { contacts, userApp } = useSelector(state => state.contacts);
  const dispatch = useDispatch();
  const history = useHistory();
  
  //! SOLO PARA PRUEBAS
  const refContador = useRef(1);
  useEffect(() => {
    console.log(`Sidebar: render => ${refContador.current}`);
    refContador.current++;
    // console.log(user.uid);
    // console.log(contacts); // Requiero el contacts[],uid
  })


//*-------------------------------- API call --------------------------------*//
  useEffect(() => {
    //*-------------------------------- Contacts --------------------------------*//
    (async function() {
      try{
        console.log("Sidebar: useEffect: contacts");
        const baseURL = 'https://academlo-whats.herokuapp.com/api/v1/users';
        const message = await dispatch(fetchContacts(baseURL, user.uid));
        getConversations();
        alert(`Sidebar: useEffect: contacts => ${message}`);
      }catch(error){
        alert(`Sidebar: useEffect: contacts er => ${error.message}`);
      }
    })();
    //*------------------------------ Conversations -----------------------------*//
    const getConversations = async() => {
      try{
        console.log("Sidebar: useEffect: getConversations");
        const baseURL = `https://academlo-whats.herokuapp.com/api/v1/users/${user.uid}/conversations`;
        const message = await dispatch(fetchConversations(baseURL));
        alert(`Sidebar: useEffect: getConversations => ${message}`);
      }catch(error){
        alert(`Sidebar: useEffect: getConversations er => ${error.message}`);
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const logoutUser = async () => {
    try {
      console.log("Sidebar: logoutUser")
      const message = await dispatch(logout());
      alert(`Sidebar: logoutUser => ${message}`);
      history.push("/");
    } catch(error) {
      alert(`Sidebar: logoutUser er => ${error}`);
    }
  };


  const showDropdownMenu = () => {
    setShowDropdown(true);
  };
  const hideDropdownMenu = () => {
    setShowDropdown(false);
  };
  const handleSearchUser = (e) => {
    setSearchUser(e.target.value);
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
          <IconButton onClick={logoutUser}>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input
            placeholder="Busca o inicia un chat"
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
              <SidebarDropdown key={i} photo={contact.photoUrl} firstName={contact.firstName} lastName={contact.lastName} id={contact._id} />
            )
          }) :
          conversations.map((conversation, i) => {
            const chatUser = conversation.membersObj.find(member => member._id !== userApp[0]._id);
            return (
              <SidebarChat key={i} photo={chatUser.photoUrl} userName={chatUser.username} conversationId={conversation._id} />
            )
          })          
        }
      </div>
    </div>
  );
};

export default Sidebar;
