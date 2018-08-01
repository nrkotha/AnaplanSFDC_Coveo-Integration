function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var Dom_1 = __webpack_require__(59);
	var DateUtils_1 = __webpack_require__(58);
	var FileTypes_1 = __webpack_require__(61);
	var Utils_1 = __webpack_require__(13);
	var StringUtils_1 = __webpack_require__(62);
	var DomUtils = (function () {
	    function DomUtils() {
	    }
	    DomUtils.getPopUpCloseButton = function (captionForClose, captionForReminder) {
	        var container = document.createElement('span');
	        var closeButton = document.createElement('span');
	        Dom_1.$$(closeButton).addClass('coveo-close-button');
	        container.appendChild(closeButton);
	        var iconClose = document.createElement('span');
	        Dom_1.$$(iconClose).addClass('coveo-icon');
	        Dom_1.$$(iconClose).addClass('coveo-sprites-quickview-close');
	        closeButton.appendChild(iconClose);
	        Dom_1.$$(closeButton).text(captionForClose);
	        var closeReminder = document.createElement('span');
	        Dom_1.$$(closeReminder).addClass('coveo-pop-up-reminder');
	        Dom_1.$$(closeReminder).text(captionForReminder);
	        container.appendChild(closeReminder);
	        return container.outerHTML;
	    };
	    DomUtils.getBasicLoadingAnimation = function () {
	        var loadDotClass = 'coveo-loading-dot';
	        var dom = document.createElement('div');
	        dom.className = 'coveo-first-loading-animation';
	        dom.innerHTML = "<div class='coveo-logo' ></div>\n    <div class='coveo-loading-container'>\n      <div class='" + loadDotClass + "'></div>\n      <div class='" + loadDotClass + "'></div>\n      <div class='" + loadDotClass + "'></div>\n      <div class='" + loadDotClass + "'></div>\n    </div>";
	        return dom;
	    };
	    DomUtils.highlightElement = function (initialString, valueToSearch) {
	        var regex = new RegExp(Utils_1.Utils.escapeRegexCharacter(StringUtils_1.StringUtils.latinize(valueToSearch)), 'i');
	        var firstChar = StringUtils_1.StringUtils.latinize(initialString).search(regex);
	        var lastChar = firstChar + valueToSearch.length;
	        return StringUtils_1.StringUtils.htmlEncode(initialString.slice(0, firstChar)) + "<span class='coveo-highlight'>" + StringUtils_1.StringUtils.htmlEncode(initialString.slice(firstChar, lastChar)) + "</span>" + StringUtils_1.StringUtils.htmlEncode(initialString.slice(lastChar));
	    };
	    DomUtils.getLoadingSpinner = function () {
	        var loading = Dom_1.$$('div', {
	            className: 'coveo-loading-spinner'
	        });
	        return loading.el;
	    };
	    DomUtils.getModalBoxHeader = function (title) {
	        var header = Dom_1.$$('div');
	        header.el.innerHTML = "<div class='coveo-modalbox-right-header'>\n        <span class='coveo-modalbox-close-button'>\n          <span class='coveo-icon coveo-sprites-common-clear'></span>\n        </span>\n      </div>\n      <div class='coveo-modalbox-left-header'>\n        <span class='coveo-modalbox-pop-up-reminder'> " + (title || '') + "</span>\n      </div>";
	        return header;
	    };
	    DomUtils.getQuickviewHeader = function (result, options, bindings) {
	        var date = '';
	        if (options.showDate) {
	            date = DateUtils_1.DateUtils.dateTimeToString(new Date(Utils_1.Utils.getFieldValue(result, 'commondate')));
	        }
	        var fileType = FileTypes_1.FileTypes.get(result);
	        var header = Dom_1.$$('div');                
			var imgIcon="";
			var sourceName="";
			
			if(result.raw.liboardinteractionstyle== "forum"){
				imgIcon='\Icons\icon_article.svg';
			}
			else if(result.raw.liboardinteractionstyle== "tkb"){
				imgIcon='\Icons\icon_article.svg';
			}
			else if(result.raw.liboardinteractionstyle== "blog"){
				imgIcon='\Icons\icon_blog.png';
			}
			else if(result.raw.liboardinteractionstyle== "group"){
				imgIcon='\Icons\icon_group.svg';
			}
			else if(result.raw.liboardid== "Videos"){
				imgIcon='\Icons\icon_videos.svg';
			}
			else if(result.raw.liboardid == "TrainingClasses"){
				imgIcon='\Icons\icon_training.svg';
			}
			else
			{
				imgIcon="";
			}
			if (imgIcon==""){
				header.el.innerHTML = "<div class='coveo-quickview-right-header'>\n        <span class='coveo-quickview-time'>" + date + "</span>\n        <span class='coveo-quickview-close-button'>\n          <span class='coveo-icon coveo-sprites-common-clear'></span>\n        </span>\n      </div>\n      <div class='coveo-quickview-left-header'>\n        <span class='coveo-quickview-icon coveo-small " + fileType.icon + "'></span>\n        <a class='coveo-quickview-pop-up-reminder'> " + (options.title || '') + "</a>\n      </div>\n <div style=\"float: left;margin-left: 38px;margin-top: -6px;\">"+sourceName+"</div>\n";
			}
			else
			{
				header.el.innerHTML = "<div class='coveo-quickview-right-header'>\n        <span class='coveo-quickview-time'>" + date + "</span>\n        <span class='coveo-quickview-close-button'>\n          <span class='coveo-icon coveo-sprites-common-clear'></span>\n        </span>\n      </div>\n      <div class='coveo-quickview-left-header'>\n        <span class='coveo-quickview-icon coveo-small'><img style='width: 25px;height: 25px;'src=" +imgIcon + "></span>\n        <a class='coveo-quickview-pop-up-reminder'> " + (options.title || '') + "</a>\n      </div>\n  <div style=\"float: left;margin-left: 38px;margin-top: -6px;\">"+sourceName+"</div>\n";
			}
	        
	        new Coveo[Coveo['Salesforce'] ? 'SalesforceResultLink' : 'ResultLink'](header.find('.coveo-quickview-pop-up-reminder'), undefined, bindings, result);
	        return header;
	    };
	    return DomUtils;
	}());
	exports.DomUtils = DomUtils;
}