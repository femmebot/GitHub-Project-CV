/******************************************/
/* Github API display contributions       */
/******************************************/

/* Use repos + commits to determine repos contributed to */
/* https://api.github.com/repos/<username>/<repo name>/commits */

var $githubUsername = 'femmebot';
// var $url = 'https://api.github.com/users/'+ $githubUsername + '/repos';


$( '.btn' ).click ( function () {

  githubCreatedProjects( $githubUsername );

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

  var url = 'https://api.github.com/users/' + encodeURIComponent(userName) + '/repos?sort=created&direction=desc&per_page=100';

    // get GitHub user's public repos
    $.getJSON (url, function ( response ) {
      var matchingRepos = [];
      var pendingChecks = 0;

      $.each (response, function (index, repos) {

        // A created repository must be owned by the user and not be a fork.
        if (repos.fork === false && repos.owner.login.toLowerCase() === userName.toLowerCase()) {
          pendingChecks++;
          var commitsUrl = 'https://api.github.com/repos/' + repos.full_name + '/commits?author=' + encodeURIComponent(userName) + '&per_page=1';

          // Commits on the default branch are commits that made it into the repository.
          $.getJSON (commitsUrl).done (function (commits) {
            if (commits.length > 0) {
              matchingRepos.push(repos);
            }
          }).always (function () {

            pendingChecks--;
            if (pendingChecks === 0) {
              matchingRepos.sort (function (firstRepo, secondRepo) {
                return new Date(secondRepo.created_at) - new Date(firstRepo.created_at);
              });

              $.each (matchingRepos, function (index, matchingRepo) {
                var module = $('<div>', { class: 'col-xs-12 col-md-6 module' });
                var repositoryLink = $('<a>', {
                  href: matchingRepo.html_url,
                  target: '_blank',
                  rel: 'noopener noreferrer',
                  text: 'View Repository'
                });

                module.append($('<h3>', { text: matchingRepo.name }));
                module.append($('<p>', { text: matchingRepo.description || '' }));
                module.append($('<p>').append(repositoryLink));
                $('.row').append(module);
              });
            }
          });
        }

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
