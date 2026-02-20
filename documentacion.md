DESCRIPCION DEL FUNCIONAMIENTO:

La app se basa en un componente central, componente Postulations.js, cual se encarga de renderizar las postulaicones abiertas.
utiliza el archivo hooks.js cual a su vez se encarga de comunicarse con los callbacks para llamados GET.
callback.js es el script que se comunica directamente con la API.

todo manejo del usuario y manejo de errores se encuentra dentro del componente Postulations, que se carga dinamicamente dentro de app.js.

Existe ErrorModal.js el cual es un modal encargado de visualizar al usuario los errores
y SuccessModal solamente muestra al usuario por modal si la postulacion fue correctamente enviada


---------------------------------------------------------------------------------------------------
*La app utiliza estos llamados a la API:

GET getOpenPostulations -> devuelve un listado de todas las postulacions abiertas.

GET getCandidate -> devuelve informacion del candidato solo si se brinda un email valido como parametro.

POST postAplication -> envia por body los datos uuid, jobId, candidateId, repoUrl y applicationId. Luego del envio retorna si su subida fue exitosa o con errores.

-----------------------
*OTROS
(en la consigna la utilizacion del body postAplication excluye el parametro applicationId, 
pero este es requerido para su correcto envio a la API)

