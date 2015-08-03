+function(c){var b=false;var d=function(f,e){var g=this;this.init("confirmation",f,e);c(f).on("show.bs.confirmation",function(j){g.options.onShow(j,this);c(this).addClass("open");var h=g.options;var i=h.all_selector;if(h.singleton){c(i+".in").not(g.$element).confirmation("hide")}});c(f).on("hide.bs.confirmation",function(h){g.options.onHide(h,this);c(this).removeClass("open")});c(f).on("shown.bs.confirmation",function(j){var h=g.options;var i=h.all_selector;g.$element.on("click.dismiss.bs.confirmation",'[data-dismiss="confirmation"]',c.proxy(g.hide,g));if(g.isPopout()){if(!b){b=c("body").on("click",function(k){if(g.$element.is(k.target)){return}if(g.$element.has(k.target).length){return}if(c(".popover").has(k.target).length){return}g.$element.confirmation("hide");c("body").unbind(k);b=false;return})}}});c(f).on("click",function(h){h.preventDefault()})};if(!c.fn.popover||!c.fn.tooltip){throw new Error("Confirmation requires popover.js and tooltip.js")}d.DEFAULTS=c.extend({},c.fn.popover.Constructor.DEFAULTS,{placement:"right",title:"Are you sure?",btnOkClass:"btn btn-sm btn-danger",btnOkLabel:"Delete",btnOkIcon:"glyphicon glyphicon-ok",btnCancelClass:"btn btn-sm btn-default",btnCancelLabel:"Cancel",btnCancelIcon:"glyphicon glyphicon-remove",href:"#",target:"_self",singleton:true,popout:true,onShow:function(f,e){},onHide:function(f,e){},onConfirm:function(f,e){},onCancel:function(f,e){},template:'<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"><a data-apply="confirmation">Yes</a> <a data-dismiss="confirmation">No</a></div></div>'});d.prototype=c.extend({},c.fn.popover.Constructor.prototype);d.prototype.constructor=d;d.prototype.getDefaults=function(){return d.DEFAULTS};d.prototype.setContent=function(){var h=this;var j=this.tip();var i=this.getTitle();var e=j.find('[data-apply="confirmation"]');var f=j.find('[data-dismiss="confirmation"]');var g=this.options;e.addClass(this.getBtnOkClass()).html(this.getBtnOkLabel()).prepend(c("<i></i>").addClass(this.getBtnOkIcon())," ").attr("href",this.getHref()).attr("target",this.getTarget()).off("click").on("click",function(k){g.onConfirm(k,h.$element);h.$element.confirmation("hide")});f.addClass(this.getBtnCancelClass()).html(this.getBtnCancelLabel()).prepend(c("<i></i>").addClass(this.getBtnCancelIcon())," ").off("click").on("click",function(k){g.onCancel(k,h.$element);h.$element.confirmation("hide")});j.find(".popover-title")[this.options.html?"html":"text"](i);j.removeClass("fade top bottom left right in");if(!j.find(".popover-title").html()){j.find(".popover-title").hide()}};d.prototype.getBtnOkClass=function(){var e=this.$element;var f=this.options;return e.attr("data-btnOkClass")||(typeof f.btnOkClass=="function"?f.btnOkClass.call(e[0]):f.btnOkClass)};d.prototype.getBtnOkLabel=function(){var e=this.$element;var f=this.options;return e.attr("data-btnOkLabel")||(typeof f.btnOkLabel=="function"?f.btnOkLabel.call(e[0]):f.btnOkLabel)};d.prototype.getBtnOkIcon=function(){var e=this.$element;var f=this.options;return e.attr("data-btnOkIcon")||(typeof f.btnOkIcon=="function"?f.btnOkIcon.call(e[0]):f.btnOkIcon)};d.prototype.getBtnCancelClass=function(){var e=this.$element;var f=this.options;return e.attr("data-btnCancelClass")||(typeof f.btnCancelClass=="function"?f.btnCancelClass.call(e[0]):f.btnCancelClass)};d.prototype.getBtnCancelLabel=function(){var e=this.$element;var f=this.options;return e.attr("data-btnCancelLabel")||(typeof f.btnCancelLabel=="function"?f.btnCancelLabel.call(e[0]):f.btnCancelLabel)};d.prototype.getBtnCancelIcon=function(){var e=this.$element;var f=this.options;return e.attr("data-btnCancelIcon")||(typeof f.btnCancelIcon=="function"?f.btnCancelIcon.call(e[0]):f.btnCancelIcon)};d.prototype.getHref=function(){var e=this.$element;var f=this.options;return e.attr("data-href")||(typeof f.href=="function"?f.href.call(e[0]):f.href)};d.prototype.getTarget=function(){var e=this.$element;var f=this.options;return e.attr("data-target")||(typeof f.target=="function"?f.target.call(e[0]):f.target)};d.prototype.isPopout=function(){var f;var e=this.$element;var g=this.options;f=e.attr("data-popout")||(typeof g.popout=="function"?g.popout.call(e[0]):g.popout);if(f=="false"){f=false}return f};var a=c.fn.confirmation;c.fn.confirmation=function(e){var f=this;return this.each(function(){var i=c(this);var h=i.data("bs.confirmation");var g=typeof e=="object"&&e;g=g||{};g.all_selector=f.selector;if(!h&&e=="destroy"){return}if(!h){i.data("bs.confirmation",(h=new d(this,g)))}if(typeof e=="string"){h[e]()}})};c.fn.confirmation.Constructor=d;c.fn.confirmation.noConflict=function(){c.fn.confirmation=a;return this}}(jQuery);