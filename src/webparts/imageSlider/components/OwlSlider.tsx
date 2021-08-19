

import * as React from "react";
import { useState, useCallback, useRef ,useEffect} from "react";
import { SPComponentLoader } from '@microsoft/sp-loader';
import * as $ from "jquery";
import {sp} from "@pnp/pnpjs";
SPComponentLoader.loadCss("../../../../node_modules/owl.carousel/dist/assets/owl.carousel.min.css");
SPComponentLoader.loadScript("https://code.jquery.com/jquery-3.2.1.slim.min.js");
import "../../../../node_modules/owl.carousel/dist/owl.carousel.min.js";

const Images=[
    {'URL':'','ImageTitle':0}
  ];

function OwlSlider()
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
    
    return (
        <div>
            <div className="owl-slider">
            <div id="carousel" className="owl-carousel">
                <div className="item">
                    <img className="owl-lazy" src="https://i.pinimg.com/originals/84/67/26/846726299dc5abbeb5d60016f0fb32e9.jpg" alt=""/>
                </div>
                <div className="item">
                    <img className="owl-lazy" src="https://i.pinimg.com/originals/84/67/26/846726299dc5abbeb5d60016f0fb32e9.jpg" alt=""/>
                </div>

                <div className="item">
                    <img className="owl-lazy" src="https://i.pinimg.com/originals/84/67/26/846726299dc5abbeb5d60016f0fb32e9.jpg" alt=""/>
                </div>

                <div className="item">
                    <img className="owl-lazy" src="https://i.pinimg.com/originals/84/67/26/846726299dc5abbeb5d60016f0fb32e9.jpg" alt=""/>
                </div>

                <div className="item">
                    <img className="owl-lazy" src="https://i.pinimg.com/originals/84/67/26/846726299dc5abbeb5d60016f0fb32e9.jpg" alt=""/>
                </div>

            </div>
            </div>
            {$("#carousel").owlCarousel()}
        </div>
       
        );  
}

export {OwlSlider};

