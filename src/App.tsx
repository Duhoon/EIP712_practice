import React, {useState} from 'react';
import './App.css';

function App() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [signature, setSignature] = useState("");

  return (
    <div className="App">
      <div className="container">
        <h1 className="title">Sign ERC20 Approve</h1>
        <div className="input-group">
          <label>FROM</label>
          <input value={from} onChange={e=>setFrom(e.target.value)}/>
        </div>
        <div className="input-group">
          <label>TO</label>
          <input value={to} onChange={e=>setTo(e.target.value)}/>
        </div>
        <div className="input-group">
          <label>Amount</label>
          <input 
            value={amount} 
            onChange={e=>setAmount(e.target.value)}
          />
        </div>
        <div className="button-group">
          <button>Sign</button>
        </div>
        <div className="input-group">
          <label>Signature</label>
          <input
            value={signature}
            disabled
          />
        </div>
      </div>
    </div>
  );
}

export default App;
