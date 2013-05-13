// Should eventually port this to Backbone via Bane

define("scripts/app", [
			 'jquery',
			 'scripts/utils',
			 'scripts/magic',

			 'handlebars',
			 'text!templates/item.html',
			 'text!data.html',
			 'text!templates/empty.html'
],
function( $, ø, magic, hbs, tpl, data, empty_tpl ) {
	return {
		template: hbs.compile( tpl ),
		empty_template: hbs.compile( empty_tpl ),
		data: JSON.parse(data),

		init: function() {
			var s = this;

			// Floating wizard hat
			magic.float();

			// Book links
			$(".library a").on("click", function() {
				var targets = $(this).attr("href").substring(1).split("/");
				var results = s.traverse( targets, s.data );
				s.render( results );

				window.location.hash = $(this).attr("href");

				return false;
			});

			s.load( s.data );


			// Back (popstate)
			// Check for initial (useless) popstate.
			// http://goo.gl/pA8cN
			var popped = ('state' in window.history && window.history.state !== null), initialURL = location.href;
			$(window).bind("popstate", function() {
				var initialPop = !popped && location.href == initialURL
				popped = true
				if ( initialPop ) return

				s.load( s.data );
			});
		},

		// Find a target set of books in data
		traverse: function( targets, data ) {
			var target = targets.shift();
			if (targets.length > 0) {
				if (data[target]) {
					return this.traverse( targets, data[target] );
				} else {
					return false;
				}
			}
			return data[target];
		},

		// Load set of books based on hash
		load: function( data ) {
			var s = this;
			if ( window.location.hash ) {
				var targets = window.location.hash.substring(1).split("/");
				var results = s.traverse( targets, data );
				s.render( results );
			} else {
				s.render( data );
			}
		},

		// Show the books
		render: function( data ) {
			var s = this;
			$(".library").animate({
				opacity: 0,
				marginTop: "-6em"
			}, function() {
				$(".library").empty();

				if ( ø.isEmptyObj(data) ) {
					var content = s.empty_template();
					$(".library").append( content );

				} else {
					for (var key in data) {
						var url = "";
						if (window.location.hash === "") {
							url += "#";
						} else {
							url += window.location.hash + "/";
						}

						if ( data[key] instanceof Array ) {
							var books = data[key];
							for (var i = 0; i < books.length; i++) {
								var file = books[i]
									, item = s.template({ title: file, url: "tomes/" + url.substring(1) + file });
								$(".library").append( item );
							}
						} else {
							console.log(url);
							var item = s.template({ title: key, url: url + key, collection: true });
							$(".library").append( item );
						}
					}
				}

				$(".library").animate({
					opacity: 1,
					marginTop: "0em"
				});
			});
		}
	}
});
