import React, {useState} from 'react';
import Web3 from 'web3';
import './App.css';

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

      console.log(to, from, amount);

      const typeData = {
        types: {
          EIP712Domain: [
            {name:'name', type:'string'},
            {name:'version', type:'string'},
            {name:'chainId', type:'uint256'},
            {name:'verifyingContract', type:'address'}
          ],
          Transfer: [
            {name:'from', type:'address'},
            {name:'to', type:'address'},
            {name:'amount', type:'uint256'},
          ]
        },
        primaryType: "Transfer",
        domain: {
          chainId: 5,
          name: "PermitToken",
          version: "1.0",
          verifyingContract: '0x'
        },
        message: {
          contents: "Approve To",
          amount,
          from,
          to
        }
      }
      
      const result = await ethereum.request({
        method: "eth_signTypedData_v4", 
        params: [account[0], JSON.stringify(typeData)]
      })

      console.log(result);
      setSignature(result);
    }
  }

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
