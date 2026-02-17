
const BASE_URL = "https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net";

//get postulacion
export const getCandidate = async (email) => {
  const res = await fetch(BASE_URL + "/api/candidate/get-by-email?email=" + email, { method: "GET" });

  if (!res.ok) {
    throw new Error("Error al obtener candidato por GET");
  }

  return res.json();
};

//get posiciones abiertas
export const getOpenPostulations = async () => {
  const res = await fetch(BASE_URL + "/api/jobs/get-list", { method: "GET" });

  if (!res.ok) {
    throw new Error("Error al obtener postulacion abierta por GET");
  }

  return res.json();
};

export const postAplication = async (uuid, jobId, candidateId, repoUrl) => {

    const res = await fetch(BASE_URL + "/api/candidate/apply-to-job", {
        method: "POST",
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify({
            uuid: uuid,
            jobId: jobId,
            candidateId: candidateId,
            repoUrl: repoUrl,
        }),
    });

    if (!res.ok) throw new Error("error en aplicacion de la postulacion, error de POST");

    return res.json();
};

