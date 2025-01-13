Este repositorio contiene una aplicacion donde se desarrollo unicamente el frontend, para su desarrollo y los datos que debian mostrarse fue necesario comsumir los endpoint de la API de pokemon https://pokeapi.co/. Como no era necesario persistir datos en una base de datos lo que hice fue utilizar la store por medio de vueX con el fin de que cada vez que detectaran cambios de estado en la lista de favoritos esta lista se actualizara en tiempo real y persistieran esos datos sin necesidad de una conexión a base de datos.

las tecnologias utilizadas fueron:


typeScript: se utilizo para tener control y previniendo errores como acceder a una propiedad inexistente o mal escrita y detectar esto errores mientras se esta desarrollando y no en la ejcucicón.


Vue 3: que era el framework en el que de debía hacer la aplicación.


Vue Router: Necesariamente utilizado para hacer el enrutamiento de las vistas.


Tailwind CSS: Un framework de css que es mobility first y facilita mucho el diseño responsive además de que su sintaxis es muy amena cuando se utiliza para aplicar estilos en componentes reutilizables.

Axios: Que facilita mucho las peticiones http y es muy robusto ofreciendo interceptores, aunque no se usaron, 
