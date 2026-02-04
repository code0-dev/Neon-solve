import { useState, useRef } from 'react'
import "./home.css";
import { toast } from "react-toastify";

const Home = () => {
  const [firstVariable, setFirstVariable] = useState<string>("x");
  const [secondVariable, setSecondVariable] = useState<string>("y");
  const [thirdVariable, setThirdVariable] = useState<string>("z");
  const resultRef = useRef<HTMLOutputElement>(null);

  const [x1, setX1] = useState<string>("");
  const [y1, setY1] = useState<string>("");
  const [z1, setZ1] = useState<string>("");
  const [answer1, setAnswer1] = useState<string>("");
    
  const [x2, setX2] = useState<string>("");
  const [y2, setY2] = useState<string>("");
  const [z2, setZ2] = useState<string>("");
  const [answer2, setAnswer2] = useState<string>("");

  const [x3, setX3] = useState<string>("");
  const [y3, setY3] = useState<string>("");
  const [z3, setZ3] = useState<string>("");
  const [answer3, setAnswer3] = useState<string>("");
  const [result, setResult] = useState<string>("")

  function normalizeCoefficient(value: string): number {
    const coefficient = value.trim().slice(0, -1);
    if (coefficient === "" || coefficient === "+") return 1
    if (coefficient === "-") return -1
    return Number(coefficient);
  }

  function cleanValue(value: string): string {
    return value.replace(/\s+/g, "");
  }

  function validate(): boolean {
    console.log(x1.length)
    if (x1.trim()[x1.trim().length -1] !== x2.trim()[x2.trim().length -1] || x3.trim()[x3.trim().length -1] !== x2.trim()[x2.trim().length -1]
      || y1.trim()[y1.trim().length -1] !== y2.trim()[y2.trim().length -1] || y3.trim()[y3.trim().length -1] !== y2.trim()[y2.trim().length -1]
      || z1.trim()[z1.trim().length -1] !== z2.trim()[z2.trim().length -1] || z3.trim()[z3.trim().length -1] !== z2.trim()[z2.trim().length -1]
    ) {
      toast.error("variables should be the same, check your equations");
      return false;
    }

    setFirstVariable(x1.trim()[x1.trim().length -1]);
    setSecondVariable(y1.trim()[y1.trim().length -1]);
    setThirdVariable(z1.trim()[z1.trim().length -1]);

    const regex = /[a-zA-Z]/;
    if (regex.test(answer1) || regex.test(answer2) || regex.test(answer3)) {
      toast.error("answers should not contain variables");
      return false;
    }
    return true;
  }

  function solve(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const cleanX1: string = cleanValue(x1);
    const cleanX2: string = cleanValue(x2);
    const cleanX3: string = cleanValue(x3);
    const cleanY1: string = cleanValue(y1);
    const cleanY2: string = cleanValue(y2);
    const cleanY3: string = cleanValue(y3);
    const cleanZ1: string = cleanValue(z1);
    const cleanZ2: string = cleanValue(z2);
    const cleanZ3: string = cleanValue(z3);

    if(!validate()) return;
    const firstX: number = normalizeCoefficient(cleanX1);
    const firstY: number = normalizeCoefficient(cleanY1);
    const firstZ: number = normalizeCoefficient(cleanZ1);
    const secondX: number = normalizeCoefficient(cleanX2);
    const secondY: number = normalizeCoefficient(cleanY2);
    const secondZ: number = normalizeCoefficient(cleanZ2);
    const thirdX: number = normalizeCoefficient(cleanX3);
    const thirdY: number = normalizeCoefficient(cleanY3);
    const thirdZ: number = normalizeCoefficient(cleanZ3);

    const d1: number = ((firstX*secondY*thirdZ)+(firstZ*secondX*thirdY)+(firstY*secondZ*thirdX))-
        ((firstZ*secondY*thirdX)+(firstX*secondZ*thirdY)+(firstY*secondX*thirdZ));

    const dx: number = ((Number(cleanValue(answer1).trim())*Number(secondY)*Number(thirdZ))+(Number(firstZ)*Number(cleanValue(answer2).trim())*Number(thirdY))+(Number(firstY)*Number(secondZ)*Number(cleanValue(answer3).trim())))-
        ((Number(firstZ)*Number(secondY)*Number(cleanValue(answer3).trim()))+((Number(cleanValue(answer1).trim()))*Number(secondZ)*Number(thirdY))+(Number(firstY)*(Number(cleanValue(answer2).trim()))*Number(thirdZ))); 
        
    const dy: number = ((Number(firstX)*Number(cleanValue(answer2).trim())*Number(thirdZ))+(Number(firstZ)*Number(secondX)*Number(cleanValue(answer3).trim()))+(Number(cleanValue(answer1).trim())*Number(secondZ)*Number(thirdX)))-
        ((Number(firstZ)*Number(cleanValue(answer2).trim())*Number(thirdX))+(Number(firstX))*Number(secondZ)*Number(cleanValue(answer3).trim())+(Number(cleanValue(answer1).trim()))*(Number(secondX))*Number(thirdZ)); 
        
    const dz: number = Number((Number(firstX)*Number(secondY)*Number(cleanValue(answer3).trim())+Number(cleanValue(answer1).trim())*Number(secondX)*Number(thirdY)+Number(firstY)*Number(cleanValue(answer2).trim())*Number(thirdX))-
        (Number(cleanValue(answer1).trim())*Number(secondY)*Number(thirdX)+Number(firstX)*Number(cleanValue(answer2).trim())*Number(thirdY)+Number(firstY)*Number(secondX)*Number(cleanValue(answer3).trim())));
      
    const x: number = Number((dx/d1).toFixed(2));
    const y: number = Number((dy/d1).toFixed(2));
    const z: number = Number((dz/d1).toFixed(2));

    if (isNaN(x) || isNaN(y) || isNaN(z)) {
      toast.error("An error occurred, please check you equations");
      return;
    }
    resultRef.current?.classList.add("glass-sweep");
    setTimeout(()=> resultRef.current?.classList.remove("glass-sweep"), 2000);
    console.log(`${firstVariable}=${x}, ${secondVariable}=${y}, ${thirdVariable}=${z}`);
    setResult(`${firstVariable}=${x}, ${secondVariable}=${y}, ${thirdVariable}=${z}`);
  }

  return (
    <div>
      <h1 className='title'>NeonSolve</h1>
      <form className='cont' onSubmit={solve}>
        <div className="input-cont">
            <input type="text" className="input" placeholder="x" value={x1} onChange={e => setX1(e.target.value.toLowerCase())}/>
            <input type="text" className="input" placeholder="y" value={y1} onChange={e => setY1(e.target.value.toLowerCase())}/>
            <input type="text" className="input" placeholder="-z" value={z1} onChange={e => setZ1(e.target.value.toLowerCase())}/>
            =
            <input type="text" className="input" placeholder="3" value={answer1} onChange={e => setAnswer1(e.target.value.toLowerCase())}/>
        </div>
        <div className="input-cont">
            <input type="text" className="input" placeholder="2x" value={x2} onChange={e => setX2(e.target.value.toLowerCase())}/>
            <input type="text" className="input" placeholder="-y" value={y2} onChange={e => setY2(e.target.value.toLowerCase())}/>
            <input type="text" className="input" placeholder="z" value={z2} onChange={e => setZ2(e.target.value.toLowerCase())}/>
            =
            <input type="text" className="input" placeholder="3" value={answer2} onChange={e => setAnswer2(e.target.value.toLowerCase())}/>
        </div>
        <div className="input-cont">
            <input type="text" className="input" placeholder="2x" value={x3} onChange={e => setX3(e.target.value.toLowerCase())}/>
            <input type="text" className="input" placeholder="-2y" value={y3} onChange={e => setY3(e.target.value.toLowerCase())}/>
            <input type="text" className="input" placeholder="z" value={z3} onChange={e => setZ3(e.target.value.toLowerCase())}/>
            =
            <input type="text" className="input" placeholder="4" value={answer3} onChange={e => setAnswer3(e.target.value.toLowerCase())}/>
        </div>
        <button type="submit" className="solve-btn">solve</button>
        <output ref={resultRef} className='result'>{result}</output>
      </form>
    </div>
  )
}

export default Home;