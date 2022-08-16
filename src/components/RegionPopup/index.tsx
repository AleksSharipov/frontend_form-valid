import React, { useRef, useState, useEffect } from 'react';

import { region } from '../../utils/constants';

import { addRegion } from '../../redux/slices/numberSlice';

import style from './RegionPopup.module.scss';
import { useDispatch } from 'react-redux';

type PopupClickType = MouseEvent & {
  path: Node[]
};

const RegionPopup: React.FC = () => {

  const regionRef = useRef(null);
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [activRegion, setActiveRegion] = useState(0);
  const keyCountryNumber = region[activRegion].keyCode;
  const dispatch = useDispatch();

  const habdleClickKey = (el: number, keyCode: string) => {
    setActiveRegion(el);
    setVisiblePopup(false);
    dispatch(addRegion(keyCode));
  }

  const togleVisiblePopup = () => {
    setVisiblePopup(!visiblePopup);
  }

  useEffect(() => {
    const clickOutside = (event: MouseEvent) => {
      const _event = event as PopupClickType

      if (regionRef.current && !_event.path.includes(regionRef.current)) {
        setVisiblePopup(false);
      }
    }
    document.body.addEventListener('click', clickOutside);

    dispatch(addRegion('+7'))
  }, []);

  return (
    <div ref={regionRef} className={style.number}>
      <div className={style.number__label}>
        <span onClick={togleVisiblePopup}>{keyCountryNumber}</span>
      </div>
      {visiblePopup && <div className={style.number__popup}>
        <ul>
          {region && region.map((obj, index) => {
            return (
              <li
                key={`${obj.keyCode}_${index}`}
                onClick={() => { habdleClickKey(index, obj.keyCode) }}
                className={activRegion === index ? "active" : ""}
              >{obj.keyCode}</li>
            )
          })}
        </ul>
      </div>}
    </div>
  )
}

export default RegionPopup;