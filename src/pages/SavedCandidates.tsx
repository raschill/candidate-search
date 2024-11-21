import {useState, useEffect} from 'react';
import {getSavedCandidates, removeCandidate} from '../utils/localStorageU';
import {Candidate} from '../interfaces/Candidate.interface';

const SavedCandidates = () => {

  const [savedCandidates, setSavedCandidates]= useState<Candidate[]>([]);

  useEffect(() => {
    const candidates= getSavedCandidates();
    setSavedCandidates(candidates);
  }, []);

  const handleRemoveCandidate= (id:number) => {
    removeCandidate(id);
    setSavedCandidates(getSavedCandidates());
  };

  if(savedCandidates.length === 0) {
    return <p>No saved candidates.</p>;
  }


  return (
    <div>
      <h1>Potential Candidates</h1>
      <table className= 'table'>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Location</th>
            <th>Email</th>
            <th>Company</th>
            <th>Bio</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {savedCandidates.map((candidate)=> (
            <tr key={candidate.id}>
              <td style= {{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                <img src= {candidate.avatar_url} alt= {`Candidate's avatar`} style= {{margin: '8px', width: '60px', borderRadius: '20%'}}/>
              </td>
              <td>{candidate.name ? `${candidate.name} (${candidate.login})` : candidate.login}</td>
              <td>{candidate.location || 'N/A'}</td>
              <td>{candidate.email || 'N/A'}</td>
              <td>{candidate.company || 'N/A'}</td>
              <td>{candidate.bio || 'N/A'}</td>
              <td style= {{textAlign: 'center', verticalAlign: 'middle', marginTop: '10px'}}>
        
        <button className= "circle-button-minus" 
        onClick= {() =>handleRemoveCandidate(candidate.id)} 
        style= {{height: '50px', width: '50px', fontSize: '40px', display: 'inline-flex', alignItems: 'center'}}>
          <code>&#8212;</code>
        </button>

      </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SavedCandidates;
