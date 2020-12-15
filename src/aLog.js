//+ Bitácora de actividades
//} 20201213
//* Reestructura de componentes
//* Se agrego el archivo HomeChat y se acomodaron componentes existentes de acuerdo a su anidación en código
//* Se agregaron los archivos Home, HomeChat, Login y Register
//* React Router, Route y Switch
//* Firebase
//  Register en proceso
//} 20201214
//  Register pendiente de validar que la contraseña sea de al menos 6 caracteres de acuerdo a lo requerido por Firebase, además de establecer todos los campos como required




//+ Proyecto final chat en tiempo real React
//{ Objetivo: Crear una aplicación para enviar mensajes en tiempo real usando react, react router, react hooks, redux y firebase.
// https://gitlab.com/academlo-fullstack-dev/proyecto-final


//+ Requerimientos (obligatorios): 
//* React Hooks
//* React Router
//* Firebase

//+ Requerimientos (opcionales):
//[ React redux
//[ Redux thunk
//[ Redux logger


//+ Crear las rutas
//{ Las rutas tendrás que crearlas usando react router dom
//* /  Adicional para dar acceso al chat sin usar barra de navegación
//* /login
//* /register
//{ /chat (protegida)
//{ /chat/:id (protegida)

//+ Firebase
//{ Crea un nuevo proyecto en firebase y crea una aplicación web para usar el servicio de autenticación con los proveedores (email/password y google). 
//{ Login (Firebase)
//{ Crearás el inicio de sesión con un formulario para ingresar el correo electrónico/contraseña y un botón para iniciar sesión con google, en este formulario tendrás que validar que no hayan campos vacíos al iniciar sesión y deberás de mostrar un mensaje de error en caso de que la contraseña sea incorrecta.

//+ Validación formulario
//{ Inicio de sesión con email y contraseña 
//{ Inicio de sesión con Google
//{ Restablecer contraseña
//} https://firebase.google.com/docs/auth/web/manage-users#send_a_password_reset_email
//{ Enviar los datos de usuario (objeto user) a través de la api con el método POST
//} https://academlo-whats.herokuapp.com/api/v1/users 

//+ Register (Firebase)
//{ Crear un formulario de registro y validar que no haya campos vacíos y redireccionar al usuario al inicio (¿Login o al Chat?) una vez que haya registrado su cuenta.

//+ Validación formulario de registro
//* Formulario con los campos de nombre completo, email, contraseña y confirmación de contraseña.
//* Registrar el usuario en firebase con el nombre completo, email y contraseña y agregar una imagen de perfil por defecto
//} https://firebase.google.com/docs/auth/web/manage-users#update_a_users_profile

//+ Chat
//{ La ruta del chat será una ruta protegida por lo que sólo podrá ser mostrada por los usuarios autenticados. Al cargar la vista del Chat (Componente Chat) se tendrá que consumir la API para obtener las conversaciones del usuario:
//} GET https://academlo-whats.herokuapp.com/api/v1/conversations/:uid
//{ Tendrás que enviar el siguiente token a través de la cabecera Authorization: Bearer <token> 
//{ El token es: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ

//+ Chat (Messages)
//{ Al dar click sobre cada componente de conversación dentro del sidebar deberás redireccionar al usuario a la siguiente ruta /chat/:id donde tendrás que sustituir el parámetro :id con el id de la conversación. Tendrás que declarar un estado para guardar el conversationId y actualizarlo con el id de la conversación y con ayuda de useEffect tendrás que agregar a conversationId como dependencia para hacer una petición de tipo GET sobre la siguiente ruta:
//} https://academlo-whats.herokuapp.com/api/v1/conversations/:uid/messages
//{ Y tendrás que listar los mensajes en su contenedor.


//! Este documento se actualizará pronto...
