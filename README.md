# gestionBaresTIPFrontend
## Pasos a seguir para correr la aplicacion en tu maquina local:
### Como primer paso debe clonarse los repositorios:
**https://github.com/tipBares/gestionBaresTIPFrontend.git**  
**https://github.com/tipBares/gestionBaresTIPBackend.git**

## BACKEND:
### Siguiente paso abrir el backend en el entorno Eclipse, ir a Help -> Eclipse Marketplace e instalar Spring Tools 4 en el caso de no tenerlo para poder utilizar sus herramientas. ###
### Debe ir a src/main/resources/application.properties y poner spring.jpa.hibernate.ddl-auto en create. ###
### Luego debe correr la aplicacion, para eso debe ir a src/main/java/com.tip.gestionBares/GestionBaresApplication.java, click derecho -> Run As -> Spring Boot App. En la consola en el lado derecho debe mostrar Started GestionBaresApplication, esto indica que esta corriendo correctamente. ###
### Despues volver a src/main/resources/application.properties y poner spring.jpa.hibernate.ddl-auto en none. ###

## FRONTEND:
### Abre el frontEnd en su entorno, como requisito debe tener instalado Node, en la consola se para en la carpeta del repositorio y escriba npm install para instalar las librerias de la aplicacion y luego para correrla npm start. ### 
### Una vez levantada la app abre la aplicacion postman y tira un endPoint, para esto desplegue la solapa de peticionas y seleccione POST, al lado pegue esta url http://localhost:8080/mesas, luego va a headers y completa con Content-Type en la columna key y con application/json, por ultimo va a body selecciona raw y coloca el json a continuacion y le da send: ### 
```java
{
    "abierta":"false",
    "nroMesa":1
    
}
```

### Finalizado este paso puede ir al browser y comenzar a utilizar la aplicación. ###
### Para crear un producto de ir a menu → categoria, crear categoria, volver a menu y ahi crear el producto, para el mozo simplemente va a mozo → crear mozo y lo crea. En salon se van a mostrar las mesas creadas, seleccionando la mesa puede generar un ticket o ver el ticket en curso e ingresarle los datos correspondiente, como por ejemplo: agregar mozo, agregar producto, aplicar descuento, cancelar y finzalizarlo e imprimirlo. Los mismos se pueden visualizar en historial tickets una vez finalizado. ###
