import { useEffect, useState } from "react";
import { getCandidate, getOpenPostulations } from "./callback";

export const useCandidate = (email) => {
    const [candidate, setCandidate] = useState(null);

    useEffect(() => {
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
        .catch((err) => console.error(err));
    }, [email]);

    return candidate;
};

export const usePostulations = () => {
    const [postulations, setPostulations] = useState([]);

    useEffect(() => {
        getOpenPostulations().then(setPostulations);
    }, []);

    return postulations;
};

export const isValidGithubUrl = (url) => {
    if (!url) {
        return false;
    } else if (url.startsWith("https://github.com/")) {
        return true;
    } else {
        return false;
    }
};

