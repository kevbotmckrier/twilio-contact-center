'use strict';

var _ = require('lodash');
var Q = require('q');
var Page = require('../../../../../base/Page');
var deserialize = require('../../../../../base/deserialize');
var serialize = require('../../../../../base/serialize');
var values = require('../../../../../base/values');

var FeedbackSummaryPage;
var FeedbackSummaryList;
var FeedbackSummaryInstance;
var FeedbackSummaryContext;

/* jshint ignore:start */
/**
 * @constructor Twilio.Api.V2010.AccountContext.CallContext.FeedbackSummaryPage
 * @augments Page
 * @description Initialize the FeedbackSummaryPage
 *
 * @param {Twilio.Api.V2010} version - Version of the resource
 * @param {object} response - Response from the API
 * @param {object} solution - Path solution
 *
 * @returns FeedbackSummaryPage
 */
/* jshint ignore:end */
function FeedbackSummaryPage(version, response, solution) {
  // Path Solution
  this._solution = solution;

  Page.prototype.constructor.call(this, version, response, this._solution);
}

_.extend(FeedbackSummaryPage.prototype, Page.prototype);
FeedbackSummaryPage.prototype.constructor = FeedbackSummaryPage;

/* jshint ignore:start */
/**
 * Build an instance of FeedbackSummaryInstance
 *
 * @function getInstance
 * @memberof Twilio.Api.V2010.AccountContext.CallContext.FeedbackSummaryPage
 * @instance
 *
 * @param {object} payload - Payload response from the API
 *
 * @returns FeedbackSummaryInstance
 */
/* jshint ignore:end */
FeedbackSummaryPage.prototype.getInstance = function getInstance(payload) {
  return new FeedbackSummaryInstance(
    this._version,
    payload,
    this._solution.accountSid
  );
};


/* jshint ignore:start */
/**
 * @constructor Twilio.Api.V2010.AccountContext.CallContext.FeedbackSummaryList
 * @description Initialize the FeedbackSummaryList
 *
 * @param {Twilio.Api.V2010} version - Version of the resource
 * @param {string} accountSid -
 *          The unique id of the Account responsible for creating this Call
 */
/* jshint ignore:end */
function FeedbackSummaryList(version, accountSid) {
  /* jshint ignore:start */
  /**
   * @function feedbackSummaries
   * @memberof Twilio.Api.V2010.AccountContext.CallContext
   * @instance
   *
   * @param {string} sid - sid of instance
   *
   * @returns {Twilio.Api.V2010.AccountContext.CallContext.FeedbackSummaryContext}
   */
  /* jshint ignore:end */
  function FeedbackSummaryListInstance(sid) {
    return FeedbackSummaryListInstance.get(sid);
  }

  FeedbackSummaryListInstance._version = version;
  // Path Solution
  FeedbackSummaryListInstance._solution = {
    accountSid: accountSid
  };
  FeedbackSummaryListInstance._uri = _.template(
    '/Accounts/<%= accountSid %>/Calls/FeedbackSummary.json' // jshint ignore:line
  )(FeedbackSummaryListInstance._solution);
  /* jshint ignore:start */
  /**
   * create a FeedbackSummaryInstance
   *
   * @function create
   * @memberof Twilio.Api.V2010.AccountContext.CallContext.FeedbackSummaryList
   * @instance
   *
   * @param {object} opts - ...
   * @param {Date} opts.startDate - The start_date
   * @param {Date} opts.endDate - The end_date
   * @param {string} [opts.includeSubaccounts] - The include_subaccounts
   * @param {string} [opts.statusCallback] - The status_callback
   * @param {string} [opts.statusCallbackMethod] - The status_callback_method
   * @param {function} [callback] - Callback to handle processed record
   *
   * @returns {Promise} Resolves to processed FeedbackSummaryInstance
   */
  /* jshint ignore:end */
  FeedbackSummaryListInstance.create = function create(opts, callback) {
    if (_.isUndefined(opts)) {
      throw new Error('Required parameter "opts" missing.');
    }
    if (_.isUndefined(opts.startDate)) {
      throw new Error('Required parameter "opts.startDate" missing.');
    }
    if (_.isUndefined(opts.endDate)) {
      throw new Error('Required parameter "opts.endDate" missing.');
    }

    var deferred = Q.defer();
    var data = values.of({
      'StartDate': serialize.iso8601Date(opts.startDate),
      'EndDate': serialize.iso8601Date(opts.endDate),
      'IncludeSubaccounts': opts.includeSubaccounts,
      'StatusCallback': opts.statusCallback,
      'StatusCallbackMethod': opts.statusCallbackMethod
    });

    var promise = this._version.create({
      uri: this._uri,
      method: 'POST',
      data: data
    });

    promise = promise.then(function(payload) {
      deferred.resolve(new FeedbackSummaryInstance(
        this._version,
        payload,
        this._solution.accountSid,
        this._solution.sid
      ));
    }.bind(this));

    promise.catch(function(error) {
      deferred.reject(error);
    });

    if (_.isFunction(callback)) {
      deferred.promise.nodeify(callback);
    }

    return deferred.promise;
  };

  /* jshint ignore:start */
  /**
   * Constructs a feedback_summary
   *
   * @function get
   * @memberof Twilio.Api.V2010.AccountContext.CallContext.FeedbackSummaryList
   * @instance
   *
   * @param {string} sid - The sid
   *
   * @returns {Twilio.Api.V2010.AccountContext.CallContext.FeedbackSummaryContext}
   */
  /* jshint ignore:end */
  FeedbackSummaryListInstance.get = function get(sid) {
    return new FeedbackSummaryContext(
      this._version,
      this._solution.accountSid,
      sid
    );
  };

  return FeedbackSummaryListInstance;
}


/* jshint ignore:start */
/**
 * @constructor Twilio.Api.V2010.AccountContext.CallContext.FeedbackSummaryInstance
 * @description Initialize the FeedbackSummaryContext
 *
 * @property {string} accountSid - The account_sid
 * @property {number} callCount - The call_count
 * @property {number} callFeedbackCount - The call_feedback_count
 * @property {Date} dateCreated - The date_created
 * @property {Date} dateUpdated - The date_updated
 * @property {Date} endDate - The end_date
 * @property {string} includeSubaccounts - The include_subaccounts
 * @property {string} issues - The issues
 * @property {number} qualityScoreAverage - The quality_score_average
 * @property {number} qualityScoreMedian - The quality_score_median
 * @property {number} qualityScoreStandardDeviation -
 *          The quality_score_standard_deviation
 * @property {string} sid - The sid
 * @property {Date} startDate - The start_date
 * @property {feedback_summary.status} status - The status
 *
 * @param {Twilio.Api.V2010} version - Version of the resource
 * @param {object} payload - The instance payload
 * @param {sid} accountSid - The account_sid
 * @param {sid} sid - The sid
 */
/* jshint ignore:end */
function FeedbackSummaryInstance(version, payload, accountSid, sid) {
  this._version = version;

  // Marshaled Properties
  this.accountSid = payload.account_sid; // jshint ignore:line
  this.callCount = deserialize.integer(payload.call_count); // jshint ignore:line
  this.callFeedbackCount = deserialize.integer(payload.call_feedback_count); // jshint ignore:line
  this.dateCreated = deserialize.rfc2822DateTime(payload.date_created); // jshint ignore:line
  this.dateUpdated = deserialize.rfc2822DateTime(payload.date_updated); // jshint ignore:line
  this.endDate = deserialize.iso8601DateTime(payload.end_date); // jshint ignore:line
  this.includeSubaccounts = payload.include_subaccounts; // jshint ignore:line
  this.issues = payload.issues; // jshint ignore:line
  this.qualityScoreAverage = deserialize.decimal(payload.quality_score_average); // jshint ignore:line
  this.qualityScoreMedian = deserialize.decimal(payload.quality_score_median); // jshint ignore:line
  this.qualityScoreStandardDeviation = deserialize.decimal(payload.quality_score_standard_deviation); // jshint ignore:line
  this.sid = payload.sid; // jshint ignore:line
  this.startDate = deserialize.iso8601DateTime(payload.start_date); // jshint ignore:line
  this.status = payload.status; // jshint ignore:line

  // Context
  this._context = undefined;
  this._solution = {
    accountSid: accountSid,
    sid: sid || this.sid,
  };
}

Object.defineProperty(FeedbackSummaryInstance.prototype,
  '_proxy', {
  get: function() {
    if (!this._context) {
      this._context = new FeedbackSummaryContext(
        this._version,
        this._solution.accountSid,
        this._solution.sid
      );
    }

    return this._context;
  },
});

/* jshint ignore:start */
/**
 * fetch a FeedbackSummaryInstance
 *
 * @function fetch
 * @memberof Twilio.Api.V2010.AccountContext.CallContext.FeedbackSummaryInstance
 * @instance
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed FeedbackSummaryInstance
 */
/* jshint ignore:end */
FeedbackSummaryInstance.prototype.fetch = function fetch(callback) {
  return this._proxy.fetch(callback);
};

/* jshint ignore:start */
/**
 * remove a FeedbackSummaryInstance
 *
 * @function remove
 * @memberof Twilio.Api.V2010.AccountContext.CallContext.FeedbackSummaryInstance
 * @instance
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed FeedbackSummaryInstance
 */
/* jshint ignore:end */
FeedbackSummaryInstance.prototype.remove = function remove(callback) {
  return this._proxy.remove(callback);
};


/* jshint ignore:start */
/**
 * @constructor Twilio.Api.V2010.AccountContext.CallContext.FeedbackSummaryContext
 * @description Initialize the FeedbackSummaryContext
 *
 * @param {Twilio.Api.V2010} version - Version of the resource
 * @param {sid} accountSid - The account_sid
 * @param {sid} sid - The sid
 */
/* jshint ignore:end */
function FeedbackSummaryContext(version, accountSid, sid) {
  this._version = version;

  // Path Solution
  this._solution = {
    accountSid: accountSid,
    sid: sid,
  };
  this._uri = _.template(
    '/Accounts/<%= accountSid %>/Calls/FeedbackSummary/<%= sid %>.json' // jshint ignore:line
  )(this._solution);
}

/* jshint ignore:start */
/**
 * fetch a FeedbackSummaryInstance
 *
 * @function fetch
 * @memberof Twilio.Api.V2010.AccountContext.CallContext.FeedbackSummaryContext
 * @instance
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed FeedbackSummaryInstance
 */
/* jshint ignore:end */
FeedbackSummaryContext.prototype.fetch = function fetch(callback) {
  var deferred = Q.defer();
  var promise = this._version.fetch({
    uri: this._uri,
    method: 'GET'
  });

  promise = promise.then(function(payload) {
    deferred.resolve(new FeedbackSummaryInstance(
      this._version,
      payload,
      this._solution.accountSid,
      this._solution.sid
    ));
  }.bind(this));

  promise.catch(function(error) {
    deferred.reject(error);
  });

  if (_.isFunction(callback)) {
    deferred.promise.nodeify(callback);
  }

  return deferred.promise;
};

/* jshint ignore:start */
/**
 * remove a FeedbackSummaryInstance
 *
 * @function remove
 * @memberof Twilio.Api.V2010.AccountContext.CallContext.FeedbackSummaryContext
 * @instance
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed FeedbackSummaryInstance
 */
/* jshint ignore:end */
FeedbackSummaryContext.prototype.remove = function remove(callback) {
  var deferred = Q.defer();
  var promise = this._version.remove({
    uri: this._uri,
    method: 'DELETE'
  });

  promise = promise.then(function(payload) {
    deferred.resolve(payload);
  }.bind(this));

  promise.catch(function(error) {
    deferred.reject(error);
  });

  if (_.isFunction(callback)) {
    deferred.promise.nodeify(callback);
  }

  return deferred.promise;
};

module.exports = {
  FeedbackSummaryPage: FeedbackSummaryPage,
  FeedbackSummaryList: FeedbackSummaryList,
  FeedbackSummaryInstance: FeedbackSummaryInstance,
  FeedbackSummaryContext: FeedbackSummaryContext
};
