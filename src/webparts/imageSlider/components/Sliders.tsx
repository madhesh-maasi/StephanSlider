
import * as React from "react";
import { useState, useCallback, useRef ,useEffect} from "react";
import * as $ from "jquery";
import {sp} from "@pnp/pnpjs";


const Images=[
    {'URL':'','ImageTitle':0}
  ];

function Slider()
{
    const[Column,setColumn]=useState(Images);
    useEffect(()=>
    {
        getimages();
    },Images);
    
    async function getimages() 
    {
      await sp.web.getFolderByServerRelativeUrl("TestingLib").files.get().then(files => 
        {
        var arrImages=[];
        for (var i = 0; i < files.length; i++) 
        {
            var _ServerRelativeUrl = files[i].ServerRelativeUrl;
            console.log(_ServerRelativeUrl);
            arrImages.push({'URL':_ServerRelativeUrl,'ImageTitle':i})
            /*sp.web.getFileByServerRelativeUrl(_ServerRelativeUrl).getItem().then(item=> 
            {
                console.log(item);
            });*/
        }
        setColumn(arrImages);
    }).catch((error)=>
    {
          console.log(error);
      })
    }

    function bindcarousel()
    {
        /*setTimeout(() => {
            
        }, 2000);*/
        $('.carousel[data-type="multi"] .item').each(function(){
            var next = $(this).next();
            if (!next.length) {
                next = $(this).siblings(':first');
            }
            next.children(':first-child').clone().appendTo($(this));
            
            for (var i=0;i<2;i++) {
                next=next.next();
                if (!next.length) {
                next = $(this).siblings(':first');
                }
                next.children(':first-child').clone().appendTo($(this));
            }
        });
    }

    return (
        <div>

            
        <div className="container">
        <h1>Bootstrap Multiple image sliding demo</h1>
        <div className="container text-center">
        <div className="carousel slide row" data-ride="carousel" data-type="multi" data-interval="2000" id="fruitscarousel">
        <div className="carousel-inner">
        {
            Column.map((cval,cindex)=>
            {
                if(cindex==0)
                return(<div className="item active">
                <div className="col-md-3 col-sm-4 col-xs-12"><a href="#"><img src={cval.URL} className="img-responsive"/></a></div>
                </div>)
                else
                return(<div className="item">
                <div className="col-md-3 col-sm-4 col-xs-12"><a href="#"><img src={cval.URL} className="img-responsive"/></a></div>
                </div>)

            })
        }
        </div>
        <a className="left carousel-control" href="#fruitscarousel" data-slide="prev"><i className="glyphicon glyphicon-chevron-left"></i></a>
        <a className="right carousel-control" href="#fruitscarousel" data-slide="next"><i className="glyphicon glyphicon-chevron-right"></i></a> 
        
        </div>
        </div>
        </div>
        </div>
       
        );  
}

export {Slider};