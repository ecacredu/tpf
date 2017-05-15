 var config = {apiKey: "AIzaSyCeKzl-tU5opURUgcc4RZfNHOYtmvGyb1U",authDomain: "the-perfect-author.firebaseapp.com",databaseURL: "https://the-perfect-author.firebaseio.com",projectId: "the-perfect-author",storageBucket: "the-perfect-author.appspot.com"};firebase.initializeApp(config);
 $(function(){
            $("#includedContent").load("./menu.html"); 
            
            
            $('.message .close')
            .on('click', function() {
                $(this)
                .closest('.message')
                .transition('fade')
                ;
            });

            $("#subscribe").click(function() {

                    var database = firebase.database();

                    var email = $("#form_email").val();

                    if(email == null || email == '' || email == undefined){
                        alert("Please enter valid email address !");
                        return;
                    }

                    document.getElementById("p2").style.display = "block";
                    firebase.auth().createUserWithEmailAndPassword(email, 'password').then(function(res){
                        var currentUser= firebase.auth().currentUser;
                        if(currentUser == null){
                            return;
                        }
                        firebase.database().ref('users/'+currentUser.uid+'/email').set(currentUser.email).then(function (response){
                            firebase.auth().signOut().then(function() {}).catch(function(error) {});
                        })
                        document.getElementById("p2").style.display = "none";
                        document.getElementById("m2").style.display = "block";
                        $(".hidden.transition").css('visibility', 'visible');
                    })
                    .catch(function(error) {
                        if(error.code== 'auth/email-already-in-use'){
                            document.getElementById("p2").style.display = "none";
                            document.getElementById("m2").style.display = "block";
                            $(".hidden.transition").css('visibility', 'visible');
                            return;
                        }
                        document.getElementById("p2").style.display = "none";
                        document.getElementById("m2").style.display = "block";
                        $(".hidden.transition").css('visibility', 'visible');
                    });

                    return false;
                });
            
        });

        

        configurePopUp();

        function configurePopUp(){
                $('#sharePop')
                .popup({
                    on:'click',
                    position:'bottom center',
                    lastResort:true,
                    boundary : $('body'),
                    inline:     true,
                    exclusive:  true,
                    html: `<div id="share"></div>`,
                    onCreate : function(value){
                        
                        $("#share").jsSocials({
                            showLabel: false,
                            showCount: false,
                            url: "https://www.theperfectauthor.in/",
                            text: "The Perfect Author - Story About An Excellent Story By Best Author",
                            logo: "https://www.theperfectauthor.in/pics/book_cover.jpg",
                            shares: [{ share: "twitter", via: "DPerfectAuthor", hashtags: "theperfectauthor" }, "facebook", { share: "whatsapp", text: "\nReally breath holding... Waiting for the next release !" }]
                        });
                    }
                });
        }
        
        

            var variable;
            function myFunction(x) {
                variable=x;
                x.classList.toggle("change");
                $('.ui.sidebar').sidebar({
                    silent : true,
                    onChange : function(){
                        configurePopUp();
                    }
                }).sidebar('toggle');
            }

            $(document).on('click touchstart', '.dimmed', function () {
               myFunction(variable);
                //console.log('dimmed');
            });

            $(document).on("click", "#querySubmit", function (event) {
            event.preventDefault();
             var user = firebase.auth().currentUser;
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
                    
                });
            })
        });

        $(document).on("click", "#reviewSubmit", function (event) {
            event.preventDefault();
             var user = firebase.auth().currentUser;
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
                    
                });
            })
        });

            $("#postReview").click(function() {
                   
                    var user = firebase.auth().currentUser;
                    console.log(user);
                     if(user){
                             $('.review.ui.modal').modal({
                                closable:false
                            }).modal('show');
                     }else{
                        $('.login.ui.modal').modal({
                            closable:false
                        }).modal('show');
                     }

                });

                $("#postQuery").click(function() {
                    var user = firebase.auth().currentUser;
                    console.log(user);
                     if(user){
                        $('.query.ui.modal').modal({
                            closable:false
                        }).modal('show');
                     }else{
                        $('.login.ui.modal').modal({
                            closable:false
                        }).modal('show');
                     }
                });

                $(document).on("click", "#submitLogin", function (event) {
                    event.preventDefault();
                    var email = $('#txt_username').val();
                    var password = $('#txt_password').val();
                    firebase.auth().signInWithEmailAndPassword(email, password).then(function(val) {
                        console.log(val);
                        $('.review.ui.modal').modal({
                                closable:false
                            }).modal('show');
                    }).catch(function(error) {
                    // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        // ...
                        console.log(errorMessage);
                    });
                });

                $(document).on("click", "#emailLogId", function (event) {
                    event.preventDefault();
                    $('.loginMail.ui.modal').modal({
                            closable:false
                        }).modal('show');
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
                    $('.review.ui.modal').modal({
                                closable:false
                            }).modal('show');
                }).catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // The email of the user's account used.
                    console.log(errorMessage);
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
                    $('.review.ui.modal').modal({
                                closable:false
                            }).modal('show');
                }).catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorMessage);
                    // The email of the user's account used.
                    var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;
                    // ...
                });
            });
           
            function showPopup(){
                 $('.example .custom.button').popup({
                     popup : $('.custom.popup')
                });
            }

            function showShareButton(){
                if($( ".key" ).hasClass( "opacityControler" )){
                    $(".key").removeClass("opacityControler");

                    setTimeout(function() {   //calls click event after a certain time
                    displayFunction('show');
                    
                    }, 500);
                }else{
                    $(".key").addClass("showButtons");
                    setTimeout(function() {   //calls click event after a certain time
                    displayFunction('opacity');
                    }, 50);
                    
                }
                 
            }
            function displayFunction(value){
                if(value=='show'){
                    $( ".key" ).removeClass( "showButtons" );
                }else if(value=='opacity'){
                    $(".key").addClass("opacityControler");
                }
            }
            