import { useEffect, useState } from "react";
import { getCandidate, getOpenPostulations } from "./callback";

export const useCandidate = (email) => {
    const [candidate, setCandidate] = useState(null);

    useEffect(() => { // si hay email, hace el get para obtener los datos del candidato y guardarlos en el estado useCandidate
        if (!email) return;

        getCandidate(email)
        .then((data) => {
            if (!data) return;

            setCandidate({
                uuid: data.uuid,
                candidateId: data.candidateId,
                applicationId: data.applicationId,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
            });
        })
        .catch((err) => {
            console.error(err);
        });
    }, [email]);

    return candidate;
};

export const usePostulations = () => { //obtiene las postulaciones abiertas
    const [postulations, setPostulations] = useState([]);

    useEffect(() => {
        getOpenPostulations().then(setPostulations)// llama a la API y guarda la lista de posiciones abiertas (se ejecuta una vez al cargar el componente) y la guarda en el estado usePostulations
        .catch((err) => {
            console.error(err);
        });
    }, []);

    return postulations;;
};

export const isValidGithubUrl = (url) => { // funcion para validar si una URL es de GitHub
    if (!url) {
        return false;
    } else if (url.startsWith("https://github.com/")) {
        return true;
    } else {
        return false;
    }
};

