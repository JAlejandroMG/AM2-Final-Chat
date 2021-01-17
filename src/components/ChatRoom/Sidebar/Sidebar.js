import { React, useState, useEffect, useRef, memo } from "react";
import "./Sidebar.css";
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../redux/actions/authActions';
import { fetchContacts } from '../../../redux/actions/contactsActions';
import { deleteConversation, fetchConversations, resetConversations } from '../../../redux/actions/chatActions';
import SidebarChat from "./SidebarChat/SidebarChat";
import SidebarDropdown from './SidebarDropdown/SidebarDropdown';
//* Material
import ChatIcon from "@material-ui/icons/Chat";
// import DonutLargeIcon from "@material-ui/icons/DonutLarge";
// import MoreVertIcon from "@material-ui/icons/MoreVert";
import { IconButton, Avatar } from "@material-ui/core";
// import { SearchOutlined } from "@material-ui/icons";
import { DeleteOutline, MeetingRoomOutlined, SearchOutlined } from "@material-ui/icons";



//{ Called from ChatRoom.jsx, PrivateChatRoom.jsx
const Sidebar = memo(() => {
  //* Estado Local
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchUser, setSearchUser] = useState("");
  const inputSearchRef = useRef();
  //* Estado Global
  const { user } = useSelector(state => state.auth);
  const { atLeastOneConversationSelected, ownConversations } = useSelector(state => state.chat);
  const { contacts, userApp } = useSelector(state => state.contacts);
  const dispatch = useDispatch();
  const history = useHistory();
  /* 
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
   */


  useEffect(() => {
    //*-------------------------------- Contacts --------------------------------*//
    (async function() {
      try{
        // console.log("Sidebar: useEffect: contacts"); //! SOLO PARA PRUEBAS
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
        // console.log("Sidebar: useEffect: getConversations"); //! SOLO PARA PRUEBAS
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
      // console.log("Sidebar: logoutUser"); //! SOLO PARA PRUEBAS
      const message = await dispatch(logout()); //authActions.js
      alert(`Sidebar: logoutUser => ${message}`); //! DESPEDIDA
      history.push("/");
    } catch(error) {
      alert(`Sidebar: logoutUser er => ${error.message}`);
    }
  };

  const handleFocus = () => {
    const inputSearch = inputSearchRef.current;
    if(!showDropdown) {
      inputSearch.focus();
      setShowDropdown(true);
    } else {
      inputSearch.blur();
      inputSearch.value = "";
      setSearchUser("");
      setShowDropdown(false);
    }
  };

  const handleSearchUser = (e) => {
    const inputSearch = inputSearchRef.current;
    setSearchUser(inputSearch.value);
  };

  const removeConversation = () => {
    ownConversations.forEach( async(conversation) =>{
      try{
        // console.log(conversation.conversationSelected);
        const conversationsLastPosition = ownConversations.length - 1;
        if(conversation.conversationSelected === true){
          await dispatch(deleteConversation(conversation._id));
        }
        if(conversation._id === ownConversations[conversationsLastPosition]._id){
          const baseURL = `https://academlo-whats.herokuapp.com/api/v1/users/${userApp[0].uid}/conversations`;
          await dispatch(fetchConversations(baseURL));
        };
        dispatch(resetConversations());
      }catch(error){
        alert(`Chat: removeConversation er => ${error.message}`);
      }
    });
  };


  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={user.photoURL} />
        <div className="sidebar__headerRight">
          {/* <IconButton>
            <DonutLargeIcon />
          </IconButton> */}
          {atLeastOneConversationSelected && 
            <IconButton onClick={removeConversation}>
              <DeleteOutline/>
            </IconButton>
          }
          <IconButton onClick={handleFocus}>
            <ChatIcon />
          </IconButton>
          <IconButton onClick={logoutUser}>
          <MeetingRoomOutlined/>
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input
            placeholder={`${showDropdown ? "Busca o inicia un chat" : "Da clic en icono de mensaje"}`}
            type="text"
            ref={inputSearchRef}
            onChange={handleSearchUser}
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
                <SidebarDropdown key={i} photo={contact.photoUrl} firstName={contact.firstName} lastName={contact.lastName} id={contact._id} handleFocusFn={handleFocus} />
              )
            })          
          :
            ownConversations.map((conversation, i) => {
              const myconversation = conversation.members.find( member => member === userApp[0]._id);
              if(conversation.membersObj) {
                  if(myconversation) {
                    const chatUser = conversation.membersObj.find(member => member._id !== userApp[0]._id);
                    return (
                      <Link key={i} to={`/chat/${conversation._id}`}>
                        <SidebarChat key={i} photo={chatUser.photoUrl} userName={chatUser.username} conversationId={conversation._id} conversationSelected={conversation.conversationSelected} />
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
