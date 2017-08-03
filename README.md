# formater
VERY basic formater. Takes a number or date and converts it to a nicely formated string.

The module will return a singleton instance of the Formater.
 
## Usage 
 
`var formatedString = Formater.formatValueToType( 1000, "float" );`

There are several default formats defined:

* float (precission 2)
* float-1 (precision 1)
* int
* percent
* percent-ceil
* time
* date
* currency

## i18l

Currently `en` and `de` are supportet

Change the locale with:

`Formater.setLocale('de');`

request the currently set locale with `Formater.getLocale();`
 
## custom formats

You can also define your own formats. Every format is defined in an object.

<pre>Formater.addCustomFormat( "xyz", function( initialValue, currentLocale ){
                                         var formatedValue = initialValue;
                                         return formatedValue;
                                     } );                                      
</pre>

then use it with:

`var formatedString = Formater.formatValueToType( 1000, "xyz" );`



