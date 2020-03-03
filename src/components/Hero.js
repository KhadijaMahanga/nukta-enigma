import React from 'react';
import PropTypes from 'prop-types';
import Cardshow from './Cardshow.js';

function Hero({ slides }) {
  return (
    <div className="container">
      <div className="h-600x h-sm-auto">
        <div className="h-2-3 h-sm-auto oflow-hidden">
          <Cardshow
            cardClass="pb-5 pr-5 pr-sm-0 float-left float-sm-none w-2-3 w-sm-100 h-100 h-sm-300x font-14"
            cardInfo={slides[0]}
          />
          <div className="float-left float-sm-none w-1-3 w-sm-100 h-100 h-sm-600x">
            <Cardshow
              cardClass="pl-5 pb-5 pl-sm-0 ptb-sm-5 pos-relative h-50"
              cardInfo={slides[1]}
            />
            <Cardshow
              cardClass="pl-5 ptb-5 pl-sm-0 pos-relative h-50"
              cardInfo={slides[2]}
            />
          </div>
        </div>
        <div className="h-1-3 oflow-hidden">
          <Cardshow
            cardClass="pr-5 pr-sm-0 pt-5 float-left float-sm-none pos-relative w-1-3 w-sm-100 h-100 h-sm-300x"
            cardInfo={slides[3]}
          />
          <Cardshow
            cardClass="plr-5 plr-sm-0 pt-5 pt-sm-10 float-left float-sm-none pos-relative w-1-3 w-sm-100 h-100 h-sm-300x"
            cardInfo={slides[4]}
          />
          <Cardshow
            cardClass="pl-5 pl-sm-0 pt-5 pt-sm-10 float-left float-sm-none pos-relative w-1-3 w-sm-100 h-100 h-sm-300x"
            cardInfo={slides[5]}
          />
        </div>
      </div>
    </div>
  );
}

Hero.propTypes = {
  slides: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

export default Hero;
