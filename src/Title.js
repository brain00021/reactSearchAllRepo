import React from 'react';
import LOGO from './assets/img/GitHubLoad.png'
import Tip from './assets/img/pzAslBq.png'
const Title = () => (
    <div>
        <h1 className="text-center text-white">
            <img src={LOGO} alt="" width="50px" />
            <br />
            Get GitHub All Repo
        </h1>
        <ul className="list-group">
            <li className="list-group-item list-group-item-info">若不知道自己GitHub名稱，就<a href={Tip}
                    target="_black">請按我</a></li>
            <li className="list-group-item">※輸入完畢，按下Enter即可顯示。(建議複製貼上使用者名稱)</li>
            <li className="list-group-item">※可透過關注保存使用者名稱(暫存瀏覽器)。</li>
            <li className="list-group-item">※點擊欄位標題可排序</li>
            <li className="list-group-item list-group-item-warning">※GitHub有限制查詢次數約60次，請不要過度使用，否則會被封鎖IP位址數分鐘。
            </li>
        </ul>
    </div>
);

export default Title;