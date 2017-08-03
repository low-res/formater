
define([
    "src/formater"
], function(Formater) {

    var o, id;

    beforeEach(function() {
        Formater.setLocale('en');
    });

    afterEach(function() {

    });

    describe('Formater', function() {

        it('should be possible to set the locale', function(){
            var l = 'de';
            Formater.setLocale(l);
            expect(Formater.getLocale()).toEqual(l);
        });

        it('should format values to float', function() {
            var f = Formater.formatValueToType(1000, "float");
            expect(f).toEqual("1,000.00");
        });

        it('should format non numeric values to float as 0.00', function() {
            var f = Formater.formatValueToType("abc", "float");
            expect(f).toEqual("0.00");
        });

        it('should format values to float with a locale set', function() {
            Formater.setLocale('de');
            var f = Formater.formatValueToType(1000, "float");
            expect(f).toEqual("1.000,00");
        });

        it('should format values to float with precision 1', function() {
            var f = Formater.formatValueToType(1000, "float-1");
            expect(f).toEqual("1,000.0");
        });

        it('test int', function(){
            var f = Formater.formatValueToType( 123.456, "int");
            expect(f).toEqual("123");
        });

        it('test percent', function(){
            var f = Formater.formatValueToType( 12, "percent");
            expect(f).toEqual("12.0 %");
        });

        it('test percent-ceil', function(){
            var f = Formater.formatValueToType( 34, "percent-ceil");
            expect(f).toEqual("34 %");
        });

        it('test time', function(){
            f = Formater.formatValueToType( "63846", "time");
            expect(f).toEqual("17:44:06");
        });

        it('test date', function(){
            var f = Formater.formatValueToType( "2015-01-01", "date");
            expect(f).toEqual("2015-01-01");

            Formater.setLocale('de');
            f = Formater.formatValueToType( "2015-10-05 12:00:00", "date");
            expect(f).toEqual("05.10.2015");
        });

        it('test date from DateObject', function(){
            Formater.setLocale('de');
            var f = Formater.formatValueToType( new Date("2015-09-14"), "date");
            expect(f).toEqual("14.09.2015");
        });

        it('test currency', function(){
            var f = Formater.formatValueToType( 1000, "currency");
            expect(f).toEqual("$ 1,000.00");

            Formater.setLocale('de');
            f = Formater.formatValueToType( 1000, "currency");
            expect(f).toEqual("€ 1.000,00");
        });

        it('should be able to add custom format definitions', function() {
            Formater.addCustomFormat('xyz', function(value,locale){ return "xyz"+value; });
            var f = Formater._getFormat('xyz');
            expect(f.key).toEqual("xyz");
        });

        it('should be able to remove custom format definitions', function() {
            Formater.addCustomFormat('xyz', function(value,locale){ return "xyz"+value; });
            var f = Formater._getFormat('xyz');
            expect(f).toBeDefined();

            Formater.removeCustomFormat('xyz');
            f = Formater._getFormat('xyz');
            expect(f.key).toEqual("null");
        });

        it('should apply custom format definitions', function() {
            Formater.addCustomFormat('xyz', function(value,locale){ return "xyz"+value; });
            var f = Formater.formatValueToType( 1000, "xyz");
            expect(f).toEqual("xyz1000");
        });

    });

});
