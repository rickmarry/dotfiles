var ShareDialog=function(e){var t;Dialog.call(this,e,{nextButtonText:"Share",buttonAlign:this.RIGHT_ALIGN}),this.enterpriseInvite=null,this.items=null,this.existingShares=null,this.friends=null,this.recipients=null,this.dataContainer=null,this.existingItems={},(t=this).shareItemOverrides={getContextMenuItems:function(e){return[new LPTools.ContextMenuItem(Constants.ACTION_REMOVE)]},getItemButtonActions:function(){return[Constants.ACTION_EDIT,Constants.ACTION_REMOVE]},isOverride:function(e){return e===Constants.ACTION_REMOVE},remove:function(){delete t.existingItems[this._model.getID()],this.destruct()}}};ShareDialog.prototype=Object.create(Dialog.prototype),ShareDialog.prototype.constructor=ShareDialog,function(e){ShareDialog.prototype.open=function(e,t,i){this.existingShares=t,this.friends=i,this.items=e,this.recipients=null,Dialog.prototype.open.call(this,{title:1===this.getItemCount()?"Share "+e[0].toString():"Share an Item"})},ShareDialog.prototype.getItemCount=function(){return this.items?this.items.length:0},ShareDialog.prototype.initialize=function(){var e;Dialog.prototype.initialize.apply(this,arguments),e=this,Topics.get(Topics.REMOVED_SHARED_FOLDER_USER).subscribe(function(t){e.recipients&&delete e.recipients[t.getID()]}),e.inputFields.itemSearch=new VaultItemTypeahead(document.getElementById("shareDialogItems"),{sourceFunction:function(){var e=LPProxy.getSites().concat(LPProxy.getNotes()).concat(LPProxy.getApplications());return LPProxy.assignItemsToGroups(e)},filter:function(t){return!e.existingItems[t._model.getID()]&&!t.isExcludedAction(Constants.ACTION_SHARE)}}),e.inputFields.itemSearch.onChange(function(t){e.addItem(t)})},ShareDialog.prototype.addItem=function(e){if(e){var t=LPProxy.getSite(e);null===t&&(t=LPProxy.getNote(e)),this.containers.shareItem.addChild(t),this.existingItems[e]=!0,this.inputFields.itemSearch.clear(),this.inputFields.itemSearch.focus()}},ShareDialog.prototype.setup=function(t,i){this.existingShares&&this.existingShares.length>0?(this.containers.share=new IndividualShareContainer(this.existingShares,{minimized:!0,additionalGroupClasses:"dialogItemGroup",excludeActions:[Constants.ACTION_EDIT,Constants.ACTION_SHARE]}),this.containers.share.initialize(e.getElementById("shareDialogExistingShares")),this.$element.removeClass("noShares")):this.$element.addClass("noShares"),1===this.getItemCount()&&this.items[0]instanceof Note?$("#shareDialogPermissionContainer").hide():$("#shareDialogPermissionContainer").show(),function(t){if(LPProxy.isEnterpriseUser()?(t.recipients={},t.enterpriseInvite||(t.enterpriseInvite=!0,t.inputFields.inviteInput=new BloodhoundDropdown(document.getElementById("shareDialogEmails"),{local:this.friends,identify:function(e){return e.email},remote:{url:LPProxy.getBaseURL()+"typeahead_remote.php?q=%QUERY",wildcard:"%QUERY"}},{optionLabel:function(e){return new ShareRecipient(e).getLabel()},ignore:function(e){return t.recipients[e]}},{autoCompleteBlurs:!1}),t.inputFields.inviteInput.onChange(function(e){var i=new ShareRecipient(e);t.recipients[i.getID()]=!0,t.addRecipient(i)}))):((null===t.enterpriseInvite||t.enterpriseInvite)&&(t.enterpriseInvite=!1,t.inputFields.inviteInput=new TypeaheadDropdown(document.getElementById("shareDialogEmails"),null,{autoCompleteBlurs:!1}),t.inputFields.inviteInput.onChange(function(e){e&&t.addRecipient(new ShareRecipient({email:e}))})),t.inputFields.inviteInput.setValues(t.friends)),t.setupComplete&&t.inputFields.inviteInput.adjustView(),t.inputFields.inviteInput.autocomplete=function(e){var i=e.target.value;if(null===this.hint&&i){for(var n=t.parseRecipientInput(i),s=0,a=n.length;s<a;++s)t.addRecipient(n[s]);e.preventDefault()}TypeaheadDropdown.prototype.autocomplete.apply(this,arguments)},1===t.getItemCount())t.$element.addClass("site");else if(t.$element.removeClass("site"),t.containers.shareItem=new Container([],{display:VaultItemBaseDisplay.prototype.DISPLAY_LIST,additionalItemClasses:"dialogItem",allowDrag:!1,override:function(){return t.shareItemOverrides},publishSelect:!1}),t.containers.shareItem.initialize(e.getElementById("shareItemsContainer")),t.getItemCount()>0)for(var i=0,n=t.items.length;i<n;++i)t.addItem(t.items[i].getID())}(this),Dialog.prototype.setup.apply(this,arguments)},ShareDialog.prototype.close=function(){Dialog.prototype.close.apply(this,arguments)&&(this.existingItems={})},ShareDialog.prototype.parseRecipientInput=function(e){if(null===e)throw new Error("Argument can not be null.");var t=e.match(Constants.EmailAddressRegularExpression);return t?t.map(function(e){var t=new ShareRecipient({email:e});return t.setEditable(!0),t}):[]},ShareDialog.prototype.addRecipient=function(e){this.containers.recipients||(this.containers.recipients=new Container([],{additionalItemClasses:"dialogItem"}),this.containers.recipients.initialize(document.getElementById("shareDialogRecipients"))),this.containers.recipients.addChild(e),this.inputFields.inviteInput.clear(),this.inputFields.inviteInput.focus()};ShareDialog.prototype.getData=function(){var e=Dialog.prototype.getData.apply(this,arguments),t=[];this.containers.recipients&&(t=this.containers.recipients.getItemChildren()),e.inviteInput&&(t=t.concat(this.parseRecipientInput(e.inviteInput)));for(var i=[],n=0,s=t.length;n<s;++n)i.push(t[n].getEmail());return e.emails=i.join(","),1===this.getItemCount()?e.aids=[this.items[0].getID()]:e.aids=function(e){for(var t=[],i=0,n=e.length;i<n;++i)t.push(e[i].getID());return t}(this.containers.shareItem.getItemModelChildren()),e},ShareDialog.prototype.validate=function(e){var t=Dialog.prototype.validate.apply(this,arguments);return""===e.emails&&(this.addError("inviteInput","You must enter at least one recipient email address."),t=!1),e.aids&&0!==e.aids.length||(this.addError("itemSearch","You must select at least one item to share."),t=!1),t},ShareDialog.prototype.handleSubmit=function(e){LPRequest.makeUpdateRequest(LPProxy.shareItems,{params:e})}}(document);
//# sourceMappingURL=sourcemaps/shareDialog.js.map
