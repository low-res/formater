define([
    "lodash",
    "./default_formats.js"
], function( _, defaultFormats  ) {

    var instance = null;
    var p = Formater.prototype;


    /**
     * Formats numbers, dates and other objects to nicely formated strings
     *
     * @constructor
     */
    function Formater() {
        this.locale         = "en";
        this.defaultFormats = defaultFormats;
        this.customFormats  = [];
        this.nullProcessor = function( value ){ return value; };
    }



    //////////////////////////////////////////////////////////////////////
    //
    //      PUBLIC API

    /**
     *
     * @param {*} value
     * @param {string} formatId
     * @param {*} context - can be any additional information that should be passed to the processor
     * @return {string} formated value
     * @private
     */
    p.formatValueToType = function ( value, formatId, context) {
        var format = this._getFormat( formatId );
        var result = format.processor.call(this, value, this.locale, context);
        return result;
    }


    /**
     * define a custom format with the given id
     * @param {string} formatId
     * @param {function} processorFunction
     */
    p.addCustomFormat = function ( formatId, processorFunction ) {
        var o = {
            key: formatId,
            processor: processorFunction
        }
        this.customFormats.push(o);
    }


    /**
     *
     * @param {string} formatId
     */
    p.removeCustomFormat = function ( formatId ) {
        _.remove(this.customFormats, {key:formatId});
    }


    p.hasFormat = function( formatId ) {
        return this._findFormat( formatId );
    }

    p.setLocale = function( locale ) {
        this.locale = locale;
    }


    p.getLocale = function () {
        return this.locale;
    }
    
    
    Formater.getInstance = function () {
        if(!instance) {
            instance = new Formater();
        }
        return instance;
    }



    //////////////////////////////////////////////////////////////////////
    //
    //      IMPLEMENTATION DETAIL

    p._getFormat = function (formatId) {
        var format = this._findFormat( formatId );
        if(!format) {
            console.log( "No formatdefinition found for: "+formatId );
            format = { key:"null", processor:this.nullProcessor };
        }

        if(!_.isFunction(format.processor)) {
            throw "Formatdefinition MUST have property 'processor' of type function !";
        }

        return format;
    }


    p._findFormat = function( formatId ){
        var format = null;
        format = _.find(this.customFormats, {key:formatId});
        if(!format) format = _.find(this.defaultFormats, {key:formatId});
        return format;
    }

    return Formater.getInstance();

});