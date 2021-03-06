import {
  CREATE_ARTICLE, GET_ARTICLE, FAILED_ARTICLE_CREATION, UPDATE_ARTICLE, FAILED_ARTICLE_UPDATE,
  GET_FEED, SET_LOADING, ARTICLE_GET_FAIL, RATE_ARTICLE_SUCCESS, RATE_ARTICLE_START, RATE_ARTICLE_FAILURE, GET_RATING
} from '../../redux/actions/actionTypes';
import articles from '../../redux/reducers/articles';

describe('Article Reducer', () => {
  it('should return payload when CREATE_ARTICLE types performed', () => {
    const payload = {
      message: 'created success',
      article: {
        title: 'title',
        body: 'body',
        slug: 'slug',
        image: 'image',
        tagList: 'sjdas',
        rating: 'lslk',
        description: 'dskfdbsf',
      },
    };
    const initialState = {
      article: {},
    };
    const state = articles(initialState, {
      type: CREATE_ARTICLE,
      payload,
    });
    expect(state).toEqual({ article: payload });
  });
  it('should return payload when GET_ARTICLE types performed', () => {
    const payload = {
      article: {
        time: '2 minutes',
        slug: 'slug',
        title: 'title',
        rateAvg: 0,
        description: 'description',
        body: 'Best ever',
        tagList: 'best',
        image: 'image',
      },
      authenticated: undefined,
      owner: true,
      fetched: true,
    }
    const initialState = {
      article: {
        rating: {
          rating: [],
        },
      },
    };
    const state = articles(initialState, {
      type: GET_ARTICLE,
      payload,
    });
    expect(state).toEqual(payload);
  });
  it('should return payload when FAILED_ARTICLE_CREATION types performed', () => {
    const payload = {
      article: {
        error: 'failed to create article',
      },
    };
    const initialState = {
      article: {},
    };
    const state = articles(initialState, {
      type: FAILED_ARTICLE_CREATION,
      payload,
    });
    expect(state).toEqual({ article: payload });
  });
  it('should return SET_LOADING types performed', () => {
    const payload = {
      loading: false
    };
    const initialState = {
      loading: {},
    };
    const state = articles(initialState, {
      type: SET_LOADING,
      payload,
    });
    expect(state).toEqual({ loading: payload });
  });
  it('should return ARTICLE_GET_FAIL types performed', () => {
    const payload = {
      article: undefined,
      fetched: false,
    };
    const initialState = {
      article: {},
    };
    const state = articles(initialState, {
      type: ARTICLE_GET_FAIL,
      payload,
    });
  });
  it('should return payload when FAILED_ARTICLE_CREATION types performed', () => {
    const payload = {
      article: {
        message: 'Article updated successfully',
        article: {
          title: 'title',
          body: 'body',
          slug: 'slug',
          image: 'image',
          tagList: 'sjdas',
          rating: 'lslk',
          description: 'dskfdbsf',
        },
      },
    };
    const initialState = {
      article: {},
    };
    const state = articles(initialState, {
      type: UPDATE_ARTICLE,
      payload,
    });
    expect(state).toEqual({ article: payload });
  });
  it('should return payload when FAILED_ARTICLE_CREATION types performed', () => {
    const payload = {
      article: {
        error: 'Failed to update the article, please try again',
      },
    };
    const initialState = {
      article: {},
    };
    const state = articles(initialState, {
      type: FAILED_ARTICLE_UPDATE,
      payload,
    });
    expect(state).toEqual({ article: payload });
  });
  it('should return payload when FEED_ARTICLE type performed', () => {
    const payload = {
      feed: {
        time: '2 minutes',
        slug: 'slug',
        title: 'title',
        description: 'description',
        body: 'Best ever',
        tagList: 'best',
        image: 'image',
      },
      owner: true,
      fetched: true,
    }
    const initialState = {
      feed: [],
    };
    const state = articles(initialState, {
      type: GET_FEED,
      payload,
      page: 1,
      nextPage: 1,
      previousPage: null,
      totalPages: 7
    });
    expect(state).toBeDefined();
  });
  it('should set loading to true rating submit is clicked', () => {
    const initialState = {
      article: {},
      alert: '',
      rating: '',
    };
    expect(articles(initialState, {
      type: RATE_ARTICLE_START,
    })).toEqual({
      ...initialState,
      loading: true,
    });
  });
  it('should set loading to false rating submit fails', () => {
    const initialState = {
      article: {},
      alert: '',
      rating: '',
    };
    expect(articles(initialState, {
      type: RATE_ARTICLE_FAILURE,
    })).toEqual({
      ...initialState,
      loading: false,
    });
  });
  it('should set loading to false rating submit succeeds', () => {
    const initialState = {
      article: {},
      alert: '',
      rating: { rating: {} },
    };
    const state = articles(initialState, {
      type: RATE_ARTICLE_SUCCESS,
      payload: { rating: {} },
    });
  })
});
