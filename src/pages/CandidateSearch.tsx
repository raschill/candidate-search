import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import {Candidate} from '../interfaces/Candidate.interface';
import {saveCandidate} from '../utils/localStorageU';

const CandidateSearch = () => {
  const [candidates, setCandidates]= useState<string[]>([]);
  const [currentCandidate, setCurrentCandidate]= useState<Candidate | null>(null);
  const [currentIndex, setCurrentIndex]= useState(0);
  const [loading, setLoading]= useState(true);

  useEffect(() => {
    const fetchCandidates= async () => {
      const data= await searchGithub();
      setCandidates(data.map((candidate: {login: string}) => candidate.login));
      setLoading(false);
    };
    fetchCandidates();
  }, []);

  useEffect(() => {
    if (candidates.length>0 && currentIndex< candidates.length) {
      const fetchCandidateInfo= async () => {
        setLoading(true);
        const candidateInfo= await searchGithubUser(candidates[currentIndex]);

        if(candidateInfo && candidateInfo.id) {
          setCurrentCandidate(candidateInfo);
        }
        else {
          console.log('Account details not retrieved.')
          handleNextCandidate();
        }
        setLoading(false);
      };

      fetchCandidateInfo();
    }
  }, [currentIndex, candidates]);

  const handleSaveCandidate= (candidate: Candidate) => {
    saveCandidate(candidate);
    handleNextCandidate();
  };

  const handleNextCandidate= () => {
    setCurrentIndex((prevIndex)=> prevIndex +1);
  };

  const handleSkipCandidate= () => {
    handleNextCandidate();
  };

  if (loading) {
    return <p>Now loading candidates.</p>;
  }

  if (currentIndex >= candidates.length || !currentCandidate) {
    return <p>No further candidates at this time.</p>;
  }

  return (
  <div>
    <h1>CandidateSearch</h1>

    <div style={{width: '300px', margin: '20px auto', borderRadius: '12px', overflow: 'hidden'}}>
      <div style={{ display: 'flex', flexFlow: 'column', alignItems: 'center', borderRadius: '12px'}}>
        <img src= {currentCandidate.avatar_url} alt= {`Candidate ${currentCandidate.login}'s avatar`}
        style= {{width: '300px', height: '100%', borderRadius: '12px'}}/>
        <div style= {{width: '300px', flexGrow: 1, backgroundColor: 'blue', color: 'fuchsia', padding: '12px', borderRadius: '12px'}}>
          <p>Name: {`${currentCandidate.name || 'N/A'} (${currentCandidate.login})`}</p>
          <p>Location: {currentCandidate.location || 'N/A'}</p>
          <p>Email: {currentCandidate.email || 'N/A'}</p>
          <p>Company: {currentCandidate.company || 'N/A'}</p>
          <p>Bio: {currentCandidate.bio || 'N/A'}</p>
        </div>
      </div>

      <div className= "button-container" style= {{display: 'flex', justifyContent: 'center', marginTop: '10px'}}>
        <button onClick= {handleSkipCandidate} className= "circle-button-minus">
          <code>&#8212;</code>
        </button>
        
        <button onClick= {()=> handleSaveCandidate(currentCandidate)} className= "circle-button-plus">+</button>
      </div>
    </div>
  </div>
  );
};

export default CandidateSearch;
