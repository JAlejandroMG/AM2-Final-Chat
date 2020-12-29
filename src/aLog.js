//+------------------------- Bitácora de actividades ------------------------+//
//} 20201213
//* Reestructura de componentes
//* Se agrego el archivo HomeChat y se acomodaron componentes existentes de acuerdo a su anidación en código
//* Se agregaron los archivos Home, HomeChat, Login y Register
//* React Router, Route y Switch
//* Firebase
//  Register en proceso
//} 20201214
//  Register pendiente de validar que la contraseña sea de al menos 6 caracteres de acuerdo a lo requerido por Firebase, además de establecer todos los campos como required
//* Se eliminó Home y en su ruta se dejó a Login, se cambió el nombre de HomeChat por ChatRoom
//* Register se validaron campos vacíos, requisito de caracteres y reseteo de inputs
//} 20201215
//* Login
//* Reafactoring de Login y Register
//* ProtectedRoute de ChatRoom
//* / Dar acceso al chat sin usar barra de navegación
//} 20201216
//* Reestablecer contraseña
//* Logout
//} 20201217
//* Aclaración de dudas con profe Óscar
//} 20201218
//* Login fixed a warning
//* Enlace de Login a Register
//* Redireccionamiento después de reestablecer la contraseña
//! Mensaje de correo enviado al solicitar reestablecer la contraseña (alert temporalmente)
//! useCallback al momento de hacer fetch a BD de aplicación
//* Captura del nombre separando firstName lastName
//* Consumo de API para enviar datos de usuario con método POST
//* Cambio de sintaxis para enlazar el componente Chat y poder pasarle props //BUSCAR OPCIONES PARA HACERLO DINAMICO
//} 20201219
//* SearchDropdown quedó roto...
//} 20201220
//* SearchDropdown se integró en el área de SidebarChat
//* Se paso el estado de contacts (users) y su actualización a Redux, usando React-Redux, Logger y Thunk
//} 20201221
//} 20201222
//* Refactoring en Register se cambió la captura de inputs de useState a useRef con lo que mejora el rendimiento de la app al dejar de renderizar ese componente al capturar los datos de la forma.
//  Commit
//} 20201223
//* Register refactoring, all logic has been passed to authActions.
//* Register, authActions and Chatbar cleanup
//* Sidebar and contactsActions refactoring.
//  Commit
//* Quitar de la lista de usuarios al anfitrión.
//* Login=>loginUser refactring logic regarding authorization has been passed to authActions.
//} 20201224
//* Login refactoring, all logic regarding authorization has been passed to authActions
//* Chat refactoring, all logic regarding authorization has been passed to authActions
//  Commit
//} 20201225
//* Fixed appRegister call from login in authActions
//* Added conversations shown in SidebarChat
//* Changed logout from Chat to Sidebar
//* Added messages shown in Chat
//  Commit
//} 20201225
//* Project status revision
//} 20201226
//* Code revision
//} 20201227
//* Other conversation's user's photo and name are shown in chat
//* Message creation enabled
//* Fixed a Sidebar bug, photo and name on conversation now shows other user

//! CORREGIR
//! En SidebarChat getMessages() modificar baseURL una vez que el endpoint Get Conversations solo me de las conversaciones del usuario cuyo id se manda en la petición
//] Pendientes
//  Formato a las páginas de Login Register y 404
//  Opcional homologar la imágen de todas las páginas
//  Dirigir las conversaciones a /chat/:id
//  Presentar los datos del usuario en las conversaciones
//  Crear conversaciones
//  Eliminar conversaciones
//  Eliminar mensajes
//  Loader


//+ Proyecto final chat en tiempo real React
//{ Objetivo: Crear una aplicación para enviar mensajes en tiempo real usando react, react router, react hooks, redux y firebase.
// https://gitlab.com/academlo-fullstack-dev/proyecto-final



//+ Requerimientos (obligatorios): 
//* React Hooks
//* React Router
//* Firebase
//+ Requerimientos (opcionales):
//* React redux
//* Redux thunk
//[* Redux logger



//+ Crear las rutas
//* Las rutas tendrás que crearlas usando react router dom
//[ / Dar acceso al chat sin usar barra de navegación
//* /login
//* /register
//* /chat (protegida)
//! /chat/:id (protegida) Protegida como consecuencia de proteger /chat ya que se accede a través de éste último
//[ Logout

//+ Firebase
//* Crea un nuevo proyecto en firebase y crea una aplicación web para usar el servicio de autenticación con los proveedores (email/password y google). 
//* Login (Firebase)
//* Crearás el inicio de sesión con un formulario para ingresar el correo electrónico/contraseña y un botón para iniciar sesión con google, en este formulario tendrás que validar que no hayan campos vacíos al iniciar sesión y deberás de mostrar un mensaje de error en caso de que la contraseña sea incorrecta.

//+ Validación formulario
//* Inicio de sesión con email y contraseña 
//* Inicio de sesión con Google
//* Restablecer contraseña
//* https://firebase.google.com/docs/auth/web/manage-users#send_a_password_reset_email
//* Enviar los datos de usuario (objeto user) a través de la api con el método POST
//* https://academlo-whats.herokuapp.com/api/v1/users 

//+ Register (Firebase)
//* Crear un formulario de registro y validar que no haya campos vacíos y redireccionar al usuario al inicio (¿Login o al Chat?) una vez que haya registrado su cuenta.

//+ Validación formulario de registro
//* Formulario con los campos de nombre completo, email, contraseña y confirmación de contraseña.
//* Registrar el usuario en firebase con el nombre completo, email y contraseña y agregar una imagen de perfil por defecto
//* https://firebase.google.com/docs/auth/web/manage-users#update_a_users_profile

//+ Chat
//{ La ruta del chat será una ruta protegida por lo que sólo podrá ser mostrada por los usuarios autenticados. Al cargar la vista del Chat (Componente Chat) se tendrá que consumir la API para obtener las conversaciones del usuario:
//} GET https://academlo-whats.herokuapp.com/api/v1/conversations/:uid //id del usuario
//{ Tendrás que enviar el siguiente token a través de la cabecera Authorization: Bearer <token> 
//{ El token es: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ

//+ Chat (Messages)
//{ Al dar click sobre cada componente de conversación dentro del sidebar deberás redireccionar al usuario a la siguiente ruta /chat/:id donde tendrás que sustituir el parámetro :id con el id de la conversación. Tendrás que declarar un estado para guardar el conversationId y actualizarlo con el id de la conversación y con ayuda de useEffect tendrás que agregar a conversationId como dependencia para hacer una petición de tipo GET sobre la siguiente ruta:
//} https://academlo-whats.herokuapp.com/api/v1/conversations/:uid/messages //id de la conversación
//{ Y tendrás que listar los mensajes en su contenedor.

//[ ************************************************************************************************************
//[ ChatRoom
//{ La ruta del ChatRoom será una ruta protegida por lo que sólo podrá ser mostrada por los usuarios autenticados. Al cargar la vista se tendrá que consumir la API para obtener las conversaciones del usuario:
//} GET https://academlo-whats.herokuapp.com/api/v1/conversations/:uid //id del usuario
//{ Tendrás que enviar el siguiente token a través de la cabecera Authorization: Bearer <token> 
//{ El token es: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ

//[ SidebarChat
//{ Dentro del Sidebar se tienen diversas (Salas de) conversaciones, y al dar click sobre una de ellas deberás redireccionar al usuario a la siguiente ruta /chat/:id donde tendrás que sustituir el parámetro :id con el id de la conversación. Tendrás que declarar un estado para guardar el conversationId y actualizarlo con el id de la conversación que fue seleccionada y con ayuda de useEffect tendrás que agregar a conversationId como dependencia para hacer una petición de tipo GET sobre la siguiente ruta:
//} https://academlo-whats.herokuapp.com/api/v1/conversations/:uid/messages
//{ Y tendrás que listar los mensajes en su contenedor Chat.



//! Este documento se actualizará pronto...
