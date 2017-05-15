var config = {apiKey: "AIzaSyCeKzl-tU5opURUgcc4RZfNHOYtmvGyb1U",authDomain: "the-perfect-author.firebaseapp.com",databaseURL: "https://the-perfect-author.firebaseio.com",projectId: "the-perfect-author",storageBucket: "the-perfect-author.appspot.com"};firebase.initializeApp(config);
var snackbarContainer = document.querySelector('#successsnack');

$('#queryAjax').click(function(event) {
  event.preventDefault();

  var user = firebase.auth().currentUser;
  if(user){
        openQuery(user);
  }else{
        loginModal();
  }
});

$('#reviewAjax').click(function(event) {
  event.preventDefault();

  var user = firebase.auth().currentUser;
  if(user){
     openReview(user);
  }else{
        loginModal();
        
  }
});

function openReview(user){
      $(document).on("click", "#postReview", function (event) {
            event.preventDefault();
            
            var review = $('#reviewText').val();

            if(review == null || review == ''){
                return;
            }

            var newPostKey = firebase.database().ref().child('reviews/').push().key;
            var obj = {
                review: review,
                date: new Date().toString(),
                user: user.uid,
                ref:   window.location.href+''
            }
                location.url
            firebase.database().ref('reviews/'+newPostKey).set(obj).then(function (response){
                firebase.database().ref('users/'+user.uid+'/reviews/'+newPostKey).set(obj).then(function (response){
                    snackbarContainer.MaterialSnackbar.showSnackbar({
                        message: 'Posted successfully !',
                        timeout: 2000,
                    });
                     $('.modal').remove();
                    sharePrompt();
                });
            })
        });
        
      
        $.get("templates/postReview.html", function(html) {
            $(html).appendTo('body').modal({
                clickClose: false,
                showClose: false
            });
            
        });

}

function openQuery(user){
    
        $(document).on("click", "#postQuery", function (event) {
            event.preventDefault();
            
            var query = $('#queryText').val();

            if(query == null || query == ''){
                return;
            }

            var newPostKey = firebase.database().ref().child('queries/').push().key;
            var obj = {
                query: query,
                date: new Date().toString(),
                user: user.uid,
                ref:window.location.href+''
            }

            firebase.database().ref('queries/'+newPostKey).set(obj).then(function (response){
                firebase.database().ref('users/'+user.uid+'/queries/'+newPostKey).set(obj).then(function (response){
                    snackbarContainer.MaterialSnackbar.showSnackbar({
                        message: 'Posted successfully !',
                        timeout: 2000,
                    });
                    $('.modal').remove();
                    sharePrompt();
                });
            })
        });
        
      
        $.get("templates/postQuery.html", function(html) {
            $(html).appendTo('body').modal({
                clickClose: false,
                showClose: false
            });
            
        });
}

function sharePrompt(){
    $(document).on($.modal.OPEN, function(event,modal){
            $("#share").jsSocials({
                    showCount: false,
                    url: "https://www.theperfectauthor.in/",
                    text: "The Perfect Author - Story About An Excellent Story By Best Author",
                    logo: "https://www.theperfectauthor.in/pics/book_cover.jpg",
                    shares: [{ share: "twitter", via: "DPerfectAuthor", hashtags: "theperfectauthor" }, {share:"facebook", label: "Share"}, "googleplus"]
                });
    });

    $.get("templates/share.html", function(html) {
              
            $(html).appendTo('body').modal({
                clickClose: false,
                showClose: false
            });
            
    });



}


function loginModal(){
        $(document).on("click", "#emailLogId", function (event) {
            event.preventDefault();
            $.get("templates/loginWithMail.html", function(Loginhtml) {
                $(Loginhtml).appendTo('body').modal({
                clickClose: false,
                showClose: false
            });
                
            });
            
        });

        $(document).on("click", "#submitLogin", function (event) {
                    event.preventDefault();
                    var email = $('#txt_username').val();
                    var password = $('#txt_password').val();
                    firebase.auth().signInWithEmailAndPassword(email, password).then(function(val) {
                        console.log(val);
                    }).catch(function(error) {
                    // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        // ...
                        console.log(errorMessage);
                    });
                });
       
        $.get("templates/login.html", function(html) {
              
            $(html).appendTo('body').modal({
                clickClose: false,
                showClose: false
            });

            $('#googleLogId').click(function(event) {
                event.preventDefault();
                var provider = new firebase.auth.GoogleAuthProvider();
                firebase.auth().signInWithPopup(provider).then(function(result) {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    var token = result.credential.accessToken;
                    // The signed-in user info.
                    var user = result.user;
                    // ...
                    $.modal.close();
                    openQuery(user);
                }).catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // The email of the user's account used.
                    var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;
                    // ...
                });
            });

            $('#fbLogId').click(function(event) {
                event.preventDefault();
                var provider = new firebase.auth.FacebookAuthProvider();
                firebase.auth().signInWithPopup(provider).then(function(result) {
                    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                    var token = result.credential.accessToken;
                    // The signed-in user info.
                    var user = result.user;
                    // ...
                    $.modal.close();
                    openReview(user);
                }).catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // The email of the user's account used.
                    var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;
                    // ...
                });
            });
        });
}
