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
            