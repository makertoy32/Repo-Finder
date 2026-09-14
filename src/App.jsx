import { useEffect, useState } from 'react'

import './App.css'

function App() {
  
  const [repoInfo, setrepoInfo] = useState({})

  const language = "Javascript";
  async function fetchData() {
    
    
    try {

    const respsone = await fetch(`https://api.github.com/search/repositories?q=language:${language}`)

    if(!respsone.ok){
      throw new Error(`Github Reposone : ${respsone.status}`)
    }

    const data = await respsone.json();
   
    return data;
    
    
    
    
    
    
    
    
    
  } catch (error) {
    alert(error);
  }
}

async function click() {
  const it = await fetchData();
  const randomNum = Math.floor(Math.random() * it.items.length);
  setrepoInfo(it.items[randomNum])
    console.log(it.items[randomNum]);
}


return (
  <>
  <h1 className='text-4xl text-red-500'>hello</h1>

{repoInfo.full_name && 
<div className="card border-2 bg-blue-400 w-fit m-10 p-5">
  <h2>Repo name : {repoInfo.full_name}</h2>
  <h2>Description : {repoInfo.description}</h2>
  <span>Language : {language}</span>
  <div className='flex flex-row gap-3'>
    <span>Stars : {repoInfo.stargazers_count}</span>
    <span>Forks : {repoInfo.forks_count}</span>
    <span>Open Issues : {repoInfo.open_issues_count}</span>

  </div>
  
  
</div>
}
<button onClick={click} className='border-2 '>Refresh</button>

  
  </>
)
}

export default App
