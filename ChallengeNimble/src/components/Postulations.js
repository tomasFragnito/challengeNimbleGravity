import { useState } from "react";
import "../css/Postulations.css";
import { usePostulations, useCandidate } from "./hooks";
import { postAplication } from "./callback";

const email = "tomignacio2022@gmail.com";

const PostulationsList = () => {

    const postulations = usePostulations();
    const candidate = useCandidate(email);

    const [repos, setRepos] = useState({});

    const handleChange = (id, value) => {
        setRepos(function(prev) {
            const newObj = { ...prev };
            newObj[id] = value;
            return newObj;
        });
    };

    const handleSubmit = (jobId) => {
        if (!candidate) return;

        try{
            console.log("aplicando:", jobId, "repo:", repos[jobId]);

            const res = postAplication({
                uuid: candidate.uuid,
                jobId: jobId,
                candidateId: candidate.candidateId,
                repoUrl: repos[jobId],
            }); 

            console.log(res.ok);
        }
        catch(err){
            console.error(err);
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
                            <p>ID: {job.id}</p>

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
                                disabled={!repos[job.id]}>
                                Submit
                            </button>
                        </div>

                    </div>
                ))}
            </div>
           
        </div> 
    );
};

export default PostulationsList;
