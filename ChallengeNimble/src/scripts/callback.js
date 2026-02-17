
const BASE_URL = "https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net";

//get de  postulacion
export const getCandidate = async (email) => {
  const res = await fetch(BASE_URL + "/api/candidate/get-by-email?email=" + email, { method: "GET" });

  if (!res.ok) throw new Error("Error al obtener candidato por GET");

  return res.json();
};

//get de posiciones abiertas
export const getOpenPostulations = async () => {
  const res = await fetch(BASE_URL + "/api/jobs/get-list", { method: "GET" });

  if (!res.ok) throw new Error("Error al obtener postulacion abierta por GET");

  return res.json();
};

//post de la postulacion para la posicion, los datos se obtienen del hook useCandidate y del estado de repositorios ingresados en los inputs
export const postAplication = async (uuid, jobId, candidateId, repoUrl, applicationId) => {

  const res = await fetch(BASE_URL + "/api/candidate/apply-to-job", {
    method: "POST",
    headers: {"Content-Type": "application/json",},
    body: JSON.stringify({
      uuid,
      jobId,
      candidateId,
      repoUrl,
      applicationId,
    }),
  });
  
  const data = await res.json();

  if (!res.ok) throw new Error("error en aplicacion de la postulacion, error de POST :" + data.message);

  return data;
};

