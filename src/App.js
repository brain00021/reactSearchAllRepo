import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// 安裝所有的檔案
import './assets/css/bootstrap.min.css';
import './assets/css/all.css';
import Title from './Title'
class App extends Component {
  state ={
    urlApi: 'https://api.github.com/users/',
    typeApi: '/repos',
    urlName: 'vuejs',
    sortApi: '?sort=updated',
    repo:[],
    searchPage: '&per_page=5&sha=',
    urlAll: ''
  };
  componentDidMount(){
    this.initRepo();
  }
  initRepo = () => {
    const localUserName = JSON.parse(window.localStorage.getItem('githubName')) || [];
    if (localUserName.length !== 0) {
      this.setState({
        urlName:localUserName
      })
    }
    this.ajaxRepo();
  }
  addRepo = () =>{
    const {urlName} = this.state;
    window.localStorage.setItem('githubName', JSON.stringify(urlName));
    window.alert(`已將目前 ${urlName} 對象加入關注。`);
  }
  ajaxRepo= async () => {
    try {
      const {urlApi , urlName ,typeApi, sortApi ,searchPage} = this.state
      const url = urlApi + urlName +  typeApi + sortApi + searchPage;
      const response = await fetch(url,{ method: 'get' });
      const data = await response.json();
      this.setState({
        repo:data,
        urlAll: url
      })
      console.log(data);
    } catch (err) {
      window.alert(`目前出現錯誤：${err}`);
    }
  }
  
  changeSortApi = (sortApiName) =>{
    this.setState({
      sortApi: sortApiName
    },()=>{
      this.ajaxRepo();
    })
  }
  changeSearchPage = (searchNumber) =>{
    this.setState({
      searchPage: searchNumber
    },()=>{
      this.ajaxRepo();
    })
  }
  handleKeyPress= (event) => {
    if(event.key === 'Enter'){
      this.ajaxRepo();
      console.log('enter press here! ')
    }
  }
  changeSerach = (e)=>{
    this.setState({
      urlName: e.target.value,
    })
  }
  render() {
    const {urlName,repo,urlAll} = this.state;

    return (
      <div id="app" className="wrap rounded">
        {/* serach block */}
        <div className="container py-5">
          <Title />
          <div className="form-group text-center d-flex justify-content-center align-items-center flex-column">
            <label htmlFor="repoUserName" className="text-white font-weight-bold h3">輸入使用者名稱</label>
            <div className="form-inline">
              <div className="form-group">
                <input type="text" id="repoUserName" className="form-control" value={urlName} onChange={this.changeSerach} onKeyPress={this.handleKeyPress} placeholder="Github UserName"/>
              </div>
              <button className="btn btn-outline-primary mx-2" type="button" onClick={this.ajaxRepo}>查詢</button>
              <button className="btn btn-outline-primary" type="button" onClick={this.addRepo}>關注</button>
            </div>
            <div className="text-center text-white mt-2">目前查詢名稱：{urlName} </div>
          </div>
          <div className="text-center my-2">
            <button class="btn btn-outline-primary " onClick={()=>this.changeSearchPage('&per_page=5&sha=')}>僅查詢5筆</button>
            <button class="btn btn-outline-primary"  onClick={()=>this.changeSearchPage('&per_page=10&sha=')}>僅查詢10筆</button>
            <button class="btn btn-outline-primary" onClick={()=>this.changeSearchPage('')}>查詢全部</button>
          </div>
          {/*  detail for list */}
          <div className="table-responsive-md">
            <table className="table table-hover table-bordered table-striped text-center">
              <thead className="thead-light sticky-top">
                <tr>
                  <th width="5%">Index</th>
                  {/* 重點寫法 */}
                  <th width="40%" className="sort" value="`?sort=full_name&`" onClick={()=>this.changeSortApi(`?sort=full_name&`)}>Repo Name</th>
                  <th width="20%" className="sort" value="?sort=created&" onClick={()=>this.changeSortApi(`?sort=created&`)}>Set Date</th>
                  <th width="30%" className="sort" value="?sort=updated&" onClick={()=>this.changeSortApi(`?sort=updated&`)}>Last Update</th>
                  <th width="10%">Link</th>
                </tr>
              </thead>
              <tbody className="text-white">
              {repo.map((record,index)=>(
                <tr key={index+1}>
                  <td>{index + 1}</td>
                  <td>{record.name}</td>
                  <td>{record.created_at}</td>
                  <td>{record.updated_at}</td> 
                  <td><a href={record.svn_url}>快速連結</a></td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
          <div className="text-white text-center">
            目前API Url：{urlAll}
          </div>
          </div>
      </div>
    );
  }
}

export default App;