import { React, useState, useEffect, useRef, memo } from "react";
import "./Sidebar.css";
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../redux/actions/authActions';
import { fetchContacts } from '../../../redux/actions/contactsActions';
import { fetchConversations } from '../../../redux/actions/chatActions';
import SidebarChat from "./SidebarChat/SidebarChat";
import SidebarDropdown from './SidebarDropdown/SidebarDropdown';
//* Material
import ChatIcon from "@material-ui/icons/Chat";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { IconButton, Avatar } from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";



//{ Called from ChatRoom.jsx, PrivateChatRoom.jsx
const Sidebar = memo(() => {
  //* Estado Local
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchUser, setSearchUser] = useState("");
  //* Estado Global
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
  })
  //! SOLO PARA PRUEBAS
  useEffect(() => {
    console.log(searchUser);
  }, [searchUser])


  useEffect(() => {
    //*-------------------------------- Contacts --------------------------------*//
    (async function() {
      try{
        console.log("Sidebar: useEffect: contacts"); //! SOLO PARA PRUEBAS
        const baseURL = 'https://academlo-whats.herokuapp.com/api/v1/users';
        await dispatch(fetchContacts(baseURL, user.uid));
        // const message = await dispatch(fetchContacts(baseURL, user.uid));
        getConversations();
        // alert(`Sidebar: useEffect: contacts => ${message}`);//! SOLO PARA PRUEBAS
      }catch(error){
        alert(`Sidebar: useEffect: contacts er => ${error.message}`);
      }
    })();
    //*------------------------------ Conversations -----------------------------*//
    const getConversations = async() => {
      try{
        console.log("Sidebar: useEffect: getConversations"); //! SOLO PARA PRUEBAS
        const baseURL = `https://academlo-whats.herokuapp.com/api/v1/users/${user.uid}/conversations`;
        await dispatch(fetchConversations(baseURL));
        // const message = await dispatch(fetchConversations(baseURL));
        // alert(`Sidebar: useEffect: getConversations => ${message}`); //! SOLO PARA PRUEBAS
      }catch(error){
        alert(`Sidebar: useEffect: getConversations er => ${error.message}`);
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const logoutUser = async () => {
    try {
      console.log("Sidebar: logoutUser"); //! SOLO PARA PRUEBAS
      const message = await dispatch(logout()); //authActions.js
      alert(`Sidebar: logoutUser => ${message}`); //! DESPEDIDA
      history.push("/");
    } catch(error) {
      alert(`Sidebar: logoutUser er => ${error.message}`);
    }
  };


  const showDropdownMenu = () => {
    setShowDropdown(true);
  };
  /* const hideDropdownMenu = () => {
    setShowDropdown(false);
  }; */
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
            // onBlur={hideDropdownMenu}
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
            const myconversation = conversation.members.find( member => member === userApp[0]._id);
            if(conversation.membersObj) {
                if(myconversation) {
                  const chatUser = conversation.membersObj.find(member => member._id !== userApp[0]._id);
                  return (
                    <Link key={i} to={`/chat/${conversation._id}`}>
                      <SidebarChat key={i} photo={chatUser.photoUrl} userName={chatUser.username} conversationId={conversation._id} />
                    </Link>
                  )
                }
              return true;
            } else {
              return (
                <SidebarChat key={i} />
              )
            }
          })          
        }
      </div>
    </div>
  );
});



export default Sidebar;
