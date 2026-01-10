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

  function validate(): boolean {
    if (x1[x1.length -1] !== x2[x2.length -1] || x3[x3.length -1] !== x2[x2.length -1]
      || y1[y1.length -1] !== y2[y2.length -1] || y3[y3.length -1] !== y2[y2.length -1]
      || z1[z1.length -1] !== z2[z2.length -1] || z3[z3.length -1] !== z2[z2.length -1]
    ) {
      toast.error("variables should be the same, check your equations");
      return false;
    }

    setFirstVariable(x1[x1.length -1]);
    setSecondVariable(y1[y1.length -1]);
    setThirdVariable(z1[z1.length -1]);

    const regex = /[a-zA-Z]/;
    if (regex.test(answer1) || regex.test(answer2) || regex.test(answer3)) {
      toast.error("answers should not contain variables");
      return false;
    }

    return true;
  }

  function solve(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if(!validate()) return;
    const firstX: number = normalizeCoefficient(x1);
    const firstY: number = normalizeCoefficient(y1);
    const firstZ: number = normalizeCoefficient(z1);
    const secondX: number = normalizeCoefficient(x2);
    const secondY: number = normalizeCoefficient(y2);
    const secondZ: number = normalizeCoefficient(z2);
    const thirdX: number = normalizeCoefficient(x3);
    const thirdY: number = normalizeCoefficient(y3);
    const thirdZ: number = normalizeCoefficient(z3);

    const d1: number = ((firstX*secondY*thirdZ)+(firstZ*secondX*thirdY)+(firstY*secondZ*thirdX))-
        ((firstZ*secondY*thirdX)+(firstX*secondZ*thirdY)+(firstY*secondX*thirdZ));

    const dx: number = ((Number(answer1.trim())*Number(secondY)*Number(thirdZ))+(Number(firstZ)*Number(answer2.trim())*Number(thirdY))+(Number(firstY)*Number(secondZ)*Number(answer3.trim())))-
        ((Number(firstZ)*Number(secondY)*Number(answer3.trim()))+((Number(answer1.trim()))*Number(secondZ)*Number(thirdY))+(Number(firstY)*(Number(answer2.trim()))*Number(thirdZ))); 
        
    const dy: number = ((Number(firstX)*Number(answer2.trim())*Number(thirdZ))+(Number(firstZ)*Number(secondX)*Number(answer3.trim()))+(Number(answer1.trim())*Number(secondZ)*Number(thirdX)))-
        ((Number(firstZ)*Number(answer2.trim())*Number(thirdX))+(Number(firstX))*Number(secondZ)*Number(answer3.trim())+(Number(answer1.trim()))*(Number(secondX))*Number(thirdZ)); 
        
    const dz: number = Number((Number(firstX)*Number(secondY)*Number(answer3.trim())+Number(answer1.trim())*Number(secondX)*Number(thirdY)+Number(firstY)*Number(answer2.trim())*Number(thirdX))-
        (Number(answer1.trim())*Number(secondY)*Number(thirdX)+Number(firstX)*Number(answer2.trim())*Number(thirdY)+Number(firstY)*Number(secondX)*Number(answer3.trim())));
      
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
