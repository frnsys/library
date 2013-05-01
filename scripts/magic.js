define("scripts/magic", [
			 'jquery'
],
function( $ ) {
	return {
		float: function() {
			this.up( $(".magic") );
		},

		up: function( $el ) {
			var self = this;
			$el.animate({
				top: "1em"
			}, 900, function() {
				self.down( $el );
			});
		},

		down: function( $el ) {
			var self = this;
			$el.animate({
				top: 0
			}, 900, function() {
				self.up( $el );
			});
		}
	}
});
