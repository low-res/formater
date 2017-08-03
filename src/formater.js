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
     * @return {string} formated value
     * @private
     */
    p.formatValueToType = function ( value, formatId) {
        var format = this._getFormat( formatId );
        var result = format.processor.call(this, value, this.locale);
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
        var format;
        format = _.find(this.customFormats, {key:formatId});
        if(!format) format = _.find(this.defaultFormats, {key:formatId});
        if(!format) {
            console.log( "No formatdefinition found for: "+formatId );
            format = { key:"null", processor:this.nullProcessor };
        }

        if(!_.isFunction(format.processor)) {
            throw "Formatdefinition MUST have prperty 'processor' of type function !";
        }

        return format;
    }

    return Formater.getInstance();

});