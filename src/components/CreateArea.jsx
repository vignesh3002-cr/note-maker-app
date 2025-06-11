import React,{useState} from "react";

function CreateArea({onAdd}) {
  const[note,setNote]=useState({title:"",content:""});
  const handleChange=(e)=>{
    const{name,value}=e.target;
    setNote((prev)=>({...prev,[name]:value}));
  };
  const submitNote=(e)=>{
    e.preventDefault();
    if(!note.title||!note.content) return;
    console.log("Submitting:",note);
    onAdd(note);
    setNote({title:"",content:""});
  };
  const submitpriority=(e)=>{
    e.preventDefault();

  }
  return (
    <div>
      <form>
        <input value={note.title} name="title" placeholder="Title" onChange={handleChange} />
        <textarea value={note.content} name="content" placeholder="Take a note..." rows="3" onChange={handleChange} />
        <button onClick={submitNote}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
