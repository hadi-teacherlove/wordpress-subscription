const zl = require("zip-lib");

class zipFiles {
	apply( compiler ) {
		compiler.hooks.done.tap(
			'Zip plugin!',
			(
				stats /* stats is passed as an argument when done hook is tapped.  */
			) => {
				if ( 'development' === stats.compilation.options.mode ) {
					return;
				}

				const zip = new zl.Zip();
				// Adds a folder from the file system, putting its contents at the root of archive
				zip.addFolder( 'inc', 'inc' );
				zip.addFolder( 'assets', 'assets' );
				zip.addFile( 'wordpress-subscription.php', 'wordpress-subscription.php' );
				// Generate zip file.
				zip.archive( './wp-subscription.zip' ).then(function () {
					console.log( 'Zip file created.' );
					zl.extract("./wp-subscription.zip", "release").then(function () {
						console.log("release done");
					}, function (err) {
						console.log(err);
					});
				}, function ( err ) {
					console.log( err );
				});
			}
		);
	}
  }

module.exports = zipFiles;
