import * as React from 'react';
import {useCallback, useRef ,useEffect} from "react";
import styles from './ImageSlider.module.scss';
import { IImageSliderProps } from './IImageSliderProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { SPComponentLoader } from '@microsoft/sp-loader';
import * as $ from "jquery";
import { Banner } from './Banner';

export default class ImageSlider extends React.Component<IImageSliderProps, {}> 
{
  

  public render(): React.ReactElement<IImageSliderProps> 
  {
      
      return(<div>
        <Banner></Banner>
      </div>)
  }




}
