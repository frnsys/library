define("scripts/app", [
			 'jquery',
			 'scripts/utils',
			 'scripts/magic',

			 'handlebars',
			 'text!templates/item.hbs',
			 'text!data.json',
			 'text!templates/empty.hbs'

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

			// Back & initial load
			$(window).bind("popstate", function() {
				if ( window.location.hash ) {
					var targets = window.location.hash.substring(1).split("/");
					var results = s.traverse( targets, s.data );
					s.render( results );
				} else {
					s.render( s.data );
				}
			});
		},

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

		render: function( data ) {
			$(".library").empty();

			if ( ø.isEmptyObj(data) ) {
				var content = this.empty_template();
				console.log(content);
				$(".library").append( content );

			} else {
				for (var key in data) {
					var url = "";
					if (window.location.hash === "") {
						url += "#";
					} else {
						url += window.location.hash + "/";
					}

					if ( this.data[key] instanceof Array ) {
						var books = data[key];
						for (var i = 0; i < books.length; i++) {
							var file = books[i]
								, item = this.template({ title: file, url: url.substring(1) + file });
							$(".library").append( item );
						}
					} else {
						var item = this.template({ title: key, url: url + key, collection: true });
						$(".library").append( item );
					}
				}
			}
		}
	}
});
