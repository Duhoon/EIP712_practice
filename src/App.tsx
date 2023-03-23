import React, {useState} from 'react';
import Web3 from 'web3';
import './App.css';

interface Transfer {
  from: string,
  to: string,
  amount: number,
}

function App() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [signature, setSignature] = useState("");

  const clickHandler = async ()=>{
    const {ethereum} = window;
    if (ethereum){
      const account = await ethereum.request({method: 'eth_requestAccounts', params:[]});
      setFrom(account[0]);

      console.log(from, to, amount);

      const typeData = {
        types: {
          EIP712Domain: [
            {name:'name', type:'string'},
            {name:'version', type:'string'},
            {name:'chainId', type:'uint256'},
            {name:'verifyingContract', type:'address'}
          ],
          Permit: [
            {name:'from', type:'address'},
            {name:'to', type:'address'},
            {name:'amount', type:'uint256'},
          ]
        },
        primaryType: "Permit",
        domain: {
          chainId: 1337,
          name: "PermitToken",
          version: "1.0",
          verifyingContract: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
        },
        message: {
          from,
          to,
          amount
        }
      }
      
      try {
        const result = await ethereum.request({
          method: "eth_signTypedData_v4", 
          params: [account[0], JSON.stringify(typeData)]
        })

        console.log(result);
        setSignature(result);

      } catch(err){
        console.log(err);
      }
    }
  }

  return (
    <div className="App">
      <div className="container">
        <h1 className="title">Sign ERC20 Approve</h1>
        <div className="input-group">
          <label>FROM</label>
          <input value={from} disabled/>
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
          <button onClick={clickHandler}>Sign</button>
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
