import { useState } from "react";
import "../css/Postulations.css";
import { usePostulations, useCandidate, isValidGithubUrl } from "../scripts/hooks";
import { postAplication } from "../scripts/callback";
import ErrorModal from "./ErrorModal"; // componente modal para mostrar errores
import SuccessModal from "./SuccessModal";


// email candidato
const email = "tomignacio2022@gmail.com";

const PostulationsList = () => {

    const postulations = usePostulations();// hook para obtener las posiciones abiertas desde la api

    const candidate = useCandidate(email); // hook para obtener los datos del candidato por email

    const [inputErrors, setInputErrors] = useState({});// erstado para errores de input

    const [repos, setRepos] = useState({});//almacena las urls de repositorios ingresadas

    const [error, setError] = useState("");//errores generales
    const [success, setSuccess] = useState("");

    //maneja cambios en los inputs
    const handleChange = (id, value) => {
        setRepos(function(prev) {
            const newObj = { ...prev };
            newObj[id] = value;
            return newObj;
        });

        if (value && !isValidGithubUrl(value)) {
            setInputErrors(prev => ({
                ...prev,
                [id]: "La URL debe comenzar con https://github.com/"   //validacion de la url en input
            }));
        } else {
            setInputErrors(prev => ({// si es valido, borra el error del input
                ...prev,
                [id]: ""
            }));
        }
    };

    const handleSubmit = async (jobId) => { //enviar la postulacion
        if (!candidate){
            setError("El candidato aún no se cargó");
            return;
        } 

        if (!isValidGithubUrl(repos[jobId])) { // validacion de url antes de enviar
            setError("La URL debe comenzar con https://github.com/");
            return;
        }

        try{
            console.log("aplicando:", jobId, "repo:", repos[jobId]);  //envio del POST

            const res = await postAplication(
                candidate.uuid,
                jobId,
                candidate.candidateId,
                repos[jobId],
                candidate.applicationId
            ); 

            setSuccess("¡Postulación enviada correctamente!");

            setRepos(prev => ({ ...prev, [jobId]: "" })); // limpia el input del repositorio despues de enviar

            return res;
        }
        catch(err){
            console.error(err);
            setError("Error al enviar la postulacion");
        }
    };

    if (!postulations.length) return <div>Cargando posiciones...</div>;

    return (
        <div className="container">
            <h2 className="title">Postulaciones abiertas</h2>

            <div className="cardsBox">
                {postulations.map((job) => (
                    <div key={job.id} className="card">

                        <h3 className="jobTitle">{job.title}</h3>

                        <div className="cardData">
                            <p className="jobId">ID: {job.id}</p>

                            {inputErrors[job.id] && (
                                <p className="inputError">{inputErrors[job.id]}</p>
                            )}

                            <input
                                className="input"
                                type="text"
                                placeholder="ingresar URL repo GitHub"
                                value={repos[job.id] || ""}
                                onChange={(e) => handleChange(job.id, e.target.value)}
                            />

                            <button
                                className="button"
                                onClick={() => handleSubmit(job.id)}
                                disabled={isValidGithubUrl(repos[job.id]) ? false : true}>
                                Submit
                            </button>
                        </div>

                    </div>
                ))}
            </div>
            <ErrorModal
                message={error}
                onClose={() => setError("")}
            />

            <SuccessModal
                message={success}
                onClose={() => setSuccess("")} // cierra modal de exito
            />
           
        </div> 
    );
};

export default PostulationsList;
