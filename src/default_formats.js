define([
    "numeral",
    "moment"
], function( numeral, moment ) {

    if(numeral.locales['de'] == undefined ){
        numeral.register('locale', 'de', {
            delimiters: {
                thousands: '.',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b',
                trillion: 't'
            },
            ordinal: function (number) {
                return '.';
            },
            currency: {symbol: '€'}
        });
    }

    var d = [
        {
            key:"float",
            processor : function( v, loc ) {
                numeral.locale( loc || "en" );
                return numeral( v ).format( '0,0.00' );
            }
        },

        {
            key:"float-1",
            processor : function( v, loc ) {
                numeral.locale( loc || "en" );
                return numeral( v ).format( '0,0.0' );
            }
        },

        {
            key:"int",
            processor : function( v, loc ) {
                numeral.locale( loc || "en" );
                return numeral( v ).format( '0,0' );
            }
        },

        {
            key:"percent",
            processor : function( v, loc ) {
                numeral.locale( loc || "en" );
                return numeral( v / 100.0 ).format('0.0 %');
            }
        },

        {
            key:"percent-ceil",
            processor : function( v, loc ) {
                numeral.locale( loc || "en" );
                return numeral( v / 100.0 ).format('0 %');
            }
        },

        {
            key:"time",
            processor : function( v, loc ) {
                numeral.locale( loc || "en" );
                return numeral( v ).format('00:00:00');
            }
        },

        {
            key:"date",
            processor : function( v, loc ) {
                var dateFormat = loc == "de" ? 'DD.MM.YYYY' : 'YYYY-MM-DD';
                var m = moment(v);
                return m.isValid() ? m.format( dateFormat ) : "" ;
            }
        },

        {
            key:"currency",
            processor : function( v, loc ) {
                numeral.locale( loc || "en" );
                return numeral(v).format( '$ 0,0.00' );
            }
        },
    ];

    return d;

});