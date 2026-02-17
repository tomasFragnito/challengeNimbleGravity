import { useState } from "react";
import "../css/Postulations.css";
import { usePostulations, useCandidate, isValidGithubUrl } from "../scripts/hooks";
import { postAplication } from "../scripts/callback";
import ErrorModal from "./ErrorModal";

const email = "tomignacio2022@gmail.com";

const PostulationsList = () => {

    const postulations = usePostulations();
    const candidate = useCandidate(email);

    const [inputErrors, setInputErrors] = useState({});

    const [repos, setRepos] = useState({});

    const [error, setError] = useState("");

    const handleChange = (id, value) => {
        setRepos(function(prev) {
            const newObj = { ...prev };
            newObj[id] = value;
            return newObj;
        });

        if (value && !isValidGithubUrl(value)) {
            setInputErrors(prev => ({
                ...prev,
                [id]: "La URL debe comenzar con https://github.com/"
            }));
        } else {
            setInputErrors(prev => ({
                ...prev,
                [id]: ""
            }));
        }
    };

    const handleSubmit = async (jobId) => {
        if (!candidate){
            setError("El candidato aún no se cargó");
            return;
        } 

        if (!isValidGithubUrl(repos[jobId])) {
            setError("La URL debe comenzar con https://github.com/");
            return;
        }

        try{
            console.log("aplicando:", jobId, "repo:", repos[jobId]);

            const res = await postAplication({
                uuid: candidate.uuid,
                jobId: jobId,
                candidateId: candidate.candidateId,
                repoUrl: repos[jobId],
            }); 

            console.log(res);
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
           
        </div> 
    );
};

export default PostulationsList;
