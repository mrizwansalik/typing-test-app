import React, { Component } from 'react';
import Perview from './Perview'
import Speed from './Speed';
import getText from './getText'

const initialState = {
  text : getText(),
  userInput: '',
  symbols : 0,
  sec : 0,
  started: false,
  finished: false,
}

class App extends Component{

  state = initialState

  handleRestart = ()=>{
    this.setState(initialState)
  }

  onUserInputChange = (e)=>{
    const v = e.target.value
    this.setTimer()
    this.onFinish(v)
    this.setState({
      userInput:v,
      symbols: this.countSymbols(v)
    })
  }

  onFinish (userInput) {
    if(userInput === this.state.text) {
      clearInterval(this.interval)
      this.setState({
        finished: true
      })
    }
  }

  countSymbols = (userInput)=>{
    const text = this.state.text.replace(' ', '')
    return userInput.replace(' ', '').split('').filter((s,i)=> s === text[i]).length 
  }

  setTimer (){
    if(!this.state.started){
      this.setState({started: true})
      this.interval = setInterval(()=>{
        this.setState(prevProps =>{
          return {sec: prevProps.sec + 1}
        })
      }, 1000)
    }
  }

render() {
  return (
    <div className="container mb-5 mb-5">
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <Perview text={this.state.text} userInput={this.state.userInput}/>
          <textarea className='form-control mb-3' placeholder='start typing.....' value={this.state.userInput} onChange={this.onUserInputChange} readOnly={this.state.finished} >

          </textarea>
          <div className='text-right'>
            <button className='btn btn-light' onClick={this.handleRestart}>Restart</button>
          </div>
           <Speed sec ={this.state.sec} symbols={this.state.symbols} />
        </div>
      </div>
    </div>
  );
}
}

export default App;
