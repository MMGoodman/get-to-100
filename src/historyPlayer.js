import React from "react";
const HistoryPlayer = () => {
const history =  JSON.parse(localStorage.getItem("usersGame")) || [];
console.log(history);
 return (
    <div>
        {history.map((element,index)=>{return(<button className="historyButton" type="button" value={()=>element[index].score}>history</button>)})}
    </div>
 )

}
export default HistoryPlayer