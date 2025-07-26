import { useCallback, useState,useEffect, useRef} from 'react'
import './App.css'

function App() {

  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false)
  const [password, setPassword] = useState("")

  //useRef hook
  const passwordRef = useRef(null)
  
  let passwordGenerator = useCallback(() => {

    let pass = ""
    let str = "abcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"

    if (characterAllowed) str += "!@#$%^&*(){}~?"

    for (let i = 1; i <= length; i++) {

      let char = Math.floor(Math.random() * str.length + 1)

      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, numberAllowed, characterAllowed, setPassword])


  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
    
    passwordRef.current?.setSelectionRange(0,100);

  },[password])
  useEffect(() => {
    
  passwordGenerator()
  }, [length,numberAllowed,characterAllowed,passwordGenerator])
  

  return (
    <div className="w-150 max-w-md mx-auto shadow-md
     rounded-lg px-4 my-8 py-4 bg-gray-700 text-orange-500 text-xl">

      <h1 className='text-white text-center my-3'>PASSWORD GENERATOR</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type='text'
          value={password}
          className="outline-none w-full py-1  px-3"
          placeholder='Password'
          readOnly
          ref={ passwordRef}
        />

        <button
        onClick={copyPasswordToClipboard}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        >Copy</button>

      </div>

      <div className='flex text-sm gap-x-2 text-xl ' >
        <div className='flex items-center gap-x-1'>
          <input type="range" 
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>{ setLength(e.target.value)}}
          />
          <label>Length:{length}</label>
        </div>
        <div className='flex item-center gap-x-1' >
          <input type="checkbox"
           defaultChecked={numberAllowed}
            id="numberInput"
            onChange={()=>{
              setNumberAllowed((prev)=>
              !prev);
            }} />
            <label htmlFor="numberInput">Numbers</label>
        </div>

        <div className='flex item-center gap-x-1'>
          <input type="checkbox"
          defaultChecked={characterAllowed}
          id="CharacterInput"
          onChange={()=>{
            setCharacterAllowed((prev)=>
            !prev);
          }} />
          <label htmlFor="characterInput">Character</label>

        </div>
     
      </div>
    </div>

  )
}

export default App
