/******************************************/
/* Github API display contributions       */
/******************************************/

/* Use repos + commits to determine repos contributed to */
/* https://api.github.com/repos/<username>/<repo name>/commits */

// var $githubUsername = 'femmebot';
// var $url = 'https://api.github.com/users/'+ $githubUsername + '/repos';


$( '.btn' ).click ( function () {

  githubCreatedProjects( 'femmebot' );

});

// $("#githubNameForm").bind('submit', function() {
$( '#userNameButton' ).click ( function () {
  // e.preventDefault();
  if ( $( '#userName' ).val() != '' ) {

    $githubUsername = $( '#userName' ).val();
    githubCreatedProjects( $githubUsername );

  };
});



// Define functions

var githubCreatedProjects = function ( userName ) {

  console.log(userName);

  // $('.text').text('fetching Github projects created by ' + userName + '...');

  $url = 'https://api.github.com/users/'+ userName + '/repos';

    // get GitHub user's public repos
    $.getJSON ($url, function ( response ) {
      $.each (response, function (index, repos) {

        // eliminate forked repos from display
        if (repos.fork === false) {

          var currentRepo = '';

              if ( repos.name != currentRepo ) {
                // construct module
                $moduleOpen = '<div class="col-xs-12 col-md-6 module">';
                $moduleClose = '</div>';

                $('.row').append($moduleOpen +
                  '<h3>' + repos.name + '</h3>' +
                  '<p>' + repos.description + '</p>' +
                  '<p>' + '<a href="' + repos.html_url + ' target="_blank">View Repository</a>' + '</p>' +
                  $moduleClose);
                currentRepo = repos.name;
                // console.log(document.documentElement.innerHTML);
              } // end if statement

          // repoName += '<p>' + repos.full_name + '</p>';
          // $('.text').append('<p>' + repos.full_name + '</p>');        }
          // $('.text').text( repoName );

        } // end repos.fork if statement

      }) // end .each response callback function
    }) // end main response callback

} // end function githubCreatedProjects





/*************************************/
/* Display Github API raw JSON       */
/*************************************/

//
// $('.btn').click(function() {
//
//   $('.text').text('loading . . .');
//
//   $.ajax({
//     type:"GET",
//     url:"https://api.github.com/users/femmebot/repos",
//     success: function(data) {
//       $('.text').html('');
//       $('.text').text(JSON.stringify(data));
//     },
//     dataType: 'jsonp',
//   });
//
// });
