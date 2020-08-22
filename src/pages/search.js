import React from 'react';
import PropTypes from 'prop-types';

import Page from '../components/Page';
import PopularList from '../components/PopularList';
import Subscribe from '../components/Subscribe';
import Title from '../components/Title';

import { getSearchResults, getPopularPosts } from '../fetchAPIData';

function Search({ popularPosts, stories }) {
  return (
    <Page title={'Search'}>
      <div className="brdr-ash-1 opacty-5"></div>
      <div className="section pv-25 text-left">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-8">
              {stories && stories.length > 0 ? (
                <MoreNews
                  titleName={section.name}
                  cardDiv="row category-news"
                  cardClass="col-sm-6"
                  newsList={stories}
                  number={10}
                />
              ) : (
                <Title name="Hatuna habari kwenye sehemu hii" />
              )}
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="pl-20 pl-md-0">
                <Subscribe />
                <div className="mb-50">
                  <PopularList popularPosts={popularPosts} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

Search.propTypes = {
  stories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  videos: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  popularPosts: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

Search.getInitialProps = async ({ query: { search } }) => {
  const stories = await getSearchResults(search);
  const popularPosts = await getPopularPosts();

  return {
    popularPosts,
    stories,
    videos
  };
};

export default Home;
