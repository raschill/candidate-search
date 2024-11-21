import {Candidate} from '../interfaces/Candidate.interface';

export const getSavedCandidates= (): Candidate[]=> {
    const savedCandidates= localStorage.getItem('savedCandidates');
    return savedCandidates ? JSON.parse(savedCandidates) : [];
};

export const saveCandidate= (candidate: Candidate)=> {
    const currentCandidates= getSavedCandidates();
    const updatedCandidates= [...currentCandidates, candidate];
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
};

export const removeCandidate= (id: number) => {
    const currentCandidates= getSavedCandidates();
    const updatedCandidates= currentCandidates.filter((candidate: Candidate) =>
        candidate.id !== id
    );
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
};