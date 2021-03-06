import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Link from 'next/link';
import Moment from 'react-moment';
import Cardlow from '../../../components/Cardlow';
import Page from '../../../components/Page';
import RelatedContent from '../../../components/RelatedContent';
import PopularList from '../../../components/PopularList';
import Subscribe from '../../../components/Subscribe';
import config from '../../../config';

import 'moment/locale/sw';
import Error from '../../_error';

import {
  getArticle,
  getPopularPosts,
  getRelatedArticles
} from '../../../fetchAPIData';

function ArticlePage({
  popularPosts,
  article,
  relatedarticles,
  section,
  inlineRelatedArticles
}) {
  const [blocks, setBlocks] = useState();

  useEffect(() => {
    if (inlineRelatedArticles.length > 0) {
      Array.from(document.querySelectorAll("div[id='relatedArticles']")).map(
        el => {
          setBlocks(
            ReactDOM.createPortal(
              <>
                <hr />
                <p>
                  <strong>Zinazohusiana</strong>
                </p>
                <div className="row">
                  <div className="col-sm-6">
                    <Cardlow
                      key={inlineRelatedArticles[0].id}
                      cardClass="oflow-hidden pos-relative mb-20 dplay-block"
                      cardInfo={inlineRelatedArticles[0]}
                    />
                  </div>
                  { inlineRelatedArticles.length > 1 && <div className="col-sm-6">
                    <Cardlow
                      key={inlineRelatedArticles[1].id}
                      cardClass="oflow-hidden pos-relative mb-20 dplay-block"
                      cardInfo={inlineRelatedArticles[1]}
                    />
                  </div>}
                </div>
                <hr />
              </>,
              el
            )
          );
        }
      );
    }
  }, []);

  if (!article) {
    return <Error statusCode={404} />;
  }

  const articleDate = new Date(article.date);
  const videoUrl = [];

  const categoryName = section ? section.name : 'Habari';
  const categorySlug = section ? section.slug : 'habari';

  const image = article.full_image_src || article.jetpack_featured_media_url;

  const author = article._embedded.author[0].name;

  let articleContent = article.content.rendered;
  const content = articleContent.split('</p>');
  if (inlineRelatedArticles.length > 0) {
    articleContent =
      content.length > 5
        ? `${content
            .slice(0, 5)
            .join('</p>')}<div id='relatedArticles'></div>${content
            .slice(5, -1)
            .join('</p>')}`
        : `${content.join('</p>')}<div id='relatedArticles'></div>`;
  }

  return (
    <Page title={article.title.rendered || 'Habari'}>
      <>
        <div className="brdr-ash-1 opacty-5" />
        <div className="section pv-50 text-left">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-lg-8">
                {videoUrl && videoUrl.length > 0 ? (
                  <iframe
                    title={article.title.rendered}
                    src={videoUrl}
                    allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                    className="rw60 bg-layer"
                    style={{
                      width: '100%',
                      height: '40vh',
                      paddingBottom: '0',
                      border: '0'
                    }}
                  />
                ) : (
                  <img
                    className="lazyload bg-layer"
                    data-src={image}
                  />
                )}
                <h3 className="mt-30">
                  <b>{article.title.rendered}</b>
                </h3>
                <ul className="list-li-mr-20 mtb-15">
                  <li>
                    by <span className="color-primary">{author}</span>&nbsp;
                    <Moment locale="sw" format="D MMM, YYYY" withTitle>
                      {articleDate}
                    </Moment>
                  </li>
                </ul>
                <hr />
                <div
                  className="article-contents"
                  dangerouslySetInnerHTML={{
                    __html: articleContent
                      .replace(/style=".*"/g, '')
                      .replace(/<h1>/g, '')
                      .replace(/<\/h1>/g, '')
                      .replace(/<li>/g, '<li><span>')
                      .replace(/<\/li>/g, '</span></li>')
                      .replace(/<hr>/g, '')
                      .replace(/<hr \/>/g, '')
                      .replace(/<\/ul>/, '</ul><hr />')
                  }}
                />
                {blocks}
                <div className="float-left-right text-center mt-40 mt-sm-20">
                  <ul className="mb-30 list-li-mt-10 list-li-mr-5 list-a-plr-15 list-a-ptb-7 list-a-bg-grey list-a-br-2 list-a-hvr-primary ">
                    <li>
                      <Link href="/[sectionSlug]" as={`/${categorySlug}`}>
                        {categoryName}
                      </Link>
                    </li>
                  </ul>
                  <ul className="mb-30 list-a-bg-grey list-a-hw-radial-35 list-a-hvr-primary list-li-ml-5">
                    <li className="mr-10 ml-0">Share</li>
                    <li>
                      <a href="">
                        <i className="ion-social-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a href="">
                        <i className="ion-social-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href="">
                        <i className="ion-social-google"></i>
                      </a>
                    </li>
                    <li>
                      <a href="">
                        <i className="ion-social-instagram"></i>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="brdr-ash-1 opacty-5"></div>
                {relatedarticles && relatedarticles.length > 0 && (
                  <RelatedContent postIds={relatedarticles} />
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
      </>
    </Page>
  );
}

ArticlePage.propTypes = {
  article: PropTypes.shape({}).isRequired,
  popularPosts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  relatedarticles: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  section: PropTypes.shape({}).isRequired,
  inlineRelatedArticles: PropTypes.arrayOf(PropTypes.shape({}))
};

ArticlePage.getInitialProps = async props => {
  const {
    query: { articleSlug, sectionSlug }
  } = props;

  const section = config.menus.find(sec => sec.slug === sectionSlug);
  const article = await getArticle(articleSlug);
  const inlineRelatedArticles = [];
  if (article && article.acf) {
    const {
      acf: {
        related_article_1: relatedArticleOne,
        related_article_2: relatedArticleTwo
      }
    } = article;

    if (relatedArticleOne) {
      const artOne = await getArticle(relatedArticleOne.post_name);
      if (artOne) {
        inlineRelatedArticles.push(relatedArticleOne);
      }
    }

    if (relatedArticleTwo) {
      const artTwo = await getArticle(relatedArticleTwo.post_name);
      if (artTwo) {
        inlineRelatedArticles.push(artTwo);
      }
    }
  }
  const relatedarticles = article ? await getRelatedArticles(article.id) : [];
  const popularPosts = await getPopularPosts();

  return {
    article,
    popularPosts,
    relatedarticles,
    inlineRelatedArticles,
    section
  };
};

export default ArticlePage;
