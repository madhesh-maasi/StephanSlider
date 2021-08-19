import * as React from "react";
import { useState, useCallback, useRef ,useEffect} from "react";
import { SPComponentLoader } from '@microsoft/sp-loader';
import * as $ from "jquery";
import {sp} from "@pnp/pnpjs";
import "../../../CSS/style.css";

SPComponentLoader.loadScript("https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js");
SPComponentLoader.loadCss("https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css");
SPComponentLoader.loadScript("https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js");

/*SPComponentLoader.loadCss("../../../CSS/bootstrap.css");
SPComponentLoader.loadScript("../../../JS/bootstrap.min.js");*/

let count;
const Images=[
    {'URL':'','ImageTitle':0}
  ];

function Banner()
{
    var listname="ImageGallery";
    const[Column,setColumn]=useState(Images);
    const[idcount,setCount]=useState(count);
    useEffect(()=>
    {
        count=document.getElementsByClassName('carousel').length+1;
        count="id"+count;
        
        console.log(count);
        setCount(count);
        getimages();
    },Images);
    
    async function getimages() 
    {
      
        await sp.web.getFolderByServerRelativeUrl(listname).files.get().then(async files => 
        {
        var arrImages=[];
        for (var i = 0; i < files.length; i++) 
        {
            var _ServerRelativeUrl = files[i].ServerRelativeUrl;
                await sp.web.getFileByServerRelativeUrl(_ServerRelativeUrl).listItemAllFields().then(item=> 
                { 
                    if(item.Active)
                    arrImages.push({'URL':_ServerRelativeUrl,'ImageTitle':i,'Order':item.ItemOrder})
                });
            
        }

        arrImages.sort(function(a, b){
            let dateA = a.Order;
            let dateB = b.Order;
            if (dateA < dateB) 
            {
              return -1;
            }    
            else if (dateA > dateB)
            {
              return 1;
            }   
            return 0;
          });

        setColumn(arrImages);
    }).catch((error)=>
    {
          console.log(error); 
      })
    }

    var idForHtml="#"+idcount
    if(Column.length==0)
    {
        return (<div className="container caro-sec"><div>No Records</div></div>)
    }
    return (
<div className="container caro-sec">
  <div id={idcount} className="carousel slide" data-ride="carousel">
    <ol className="carousel-indicators" style={{display:"none"}}>
    {
        Column.map((cval,cindex)=>
        {
            if(cindex==0)
            return(<li data-target={idcount} data-slide-to={cindex} className="active"></li>)
            else
            return(<li data-target={idcount} data-slide-to={cindex}></li>)
        })
    }
    </ol>

    <div className="carousel-inner">
    {
        Column.map((cval,cindex)=>
        {
            if(cindex==0)
            return(<div className="item active">
            <img src={cval.URL} alt="" style={{width:"100%",height:"400px"}}/>
          </div>)
            else
            return(<div className="item">
            <img src={cval.URL} alt="" style={{width:"100%",height:"400px"}}/>
          </div>)

        })
    }
</div>
    <a className="left carousel-control" href={idForHtml} data-slide="prev">
      <span className="glyphicon glyphicon-chevron-left"></span>
      <span className="sr-only">Previous</span>
    </a>
    <a className="right carousel-control" href={idForHtml} data-slide="next">
      <span className="glyphicon glyphicon-chevron-right"></span>
      <span className="sr-only">Next</span>
    </a>
  </div>
</div>
       
        );  
}

export {Banner};