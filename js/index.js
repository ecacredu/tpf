var config = {apiKey: "AIzaSyCeKzl-tU5opURUgcc4RZfNHOYtmvGyb1U",authDomain: "the-perfect-author.firebaseapp.com",databaseURL: "https://the-perfect-author.firebaseio.com",projectId: "the-perfect-author",storageBucket: "the-perfect-author.appspot.com"};firebase.initializeApp(config);
var snackbarContainer = document.querySelector('#successsnack');
        // showSnackbarButton.style.backgroundColor = '#' +
        //         Math.floor(Math.random() * 0xFFFFFF).toString(16);
                var data = {
                message: 'Thank you for subscribing !',
                timeout: 2000,
            };

        $("#subscribe").click(function() {


        var database = firebase.database();


        
        var email = $("#form_email").val();

        if(email == null || email == '' || email == undefined){
            alert("Please enter valid email address !");
            return;
        }

        document.getElementById("p2").style.display = "block";    
        // var dataString = {'form_email':email};
        // alert(dataString);

        // var subsRef = firebase.database().ref('subscriptions/');

        firebase.auth().createUserWithEmailAndPassword(email, 'password').then(function(res){
            var currentUser= firebase.auth().currentUser;
            if(currentUser == null){
                return;
            }
            firebase.database().ref('users/'+currentUser.uid+'/email').set(currentUser.email).then(function (response){
                firebase.auth().signOut().then(function() {}).catch(function(error) {});
            })
            document.getElementById("p2").style.display = "none";
            snackbarContainer.MaterialSnackbar.showSnackbar(data);
        })
        .catch(function(error) {
            if(error.code== 'auth/email-already-in-use'){
                document.getElementById("p2").style.display = "none";
                snackbarContainer.MaterialSnackbar.showSnackbar({
                    message: 'You are already subscribed , Thank you !',
                    timeout: 2000,
                });
                return;
            }
            document.getElementById("p2").style.display = "none";
            snackbarContainer.MaterialSnackbar.showSnackbar({
                    message: 'Something went wrong , please try again later !',
                    timeout: 2000,
                });
        });

        return false;
    });

    $("#share").jsSocials({
            showLabel: false,
            showCount: false,
            url: "https://www.theperfectauthor.in/",
            text: "The Perfect Author - Story About An Excellent Story By Best Author",
            logo: "The Perfect Author is a Mythical Fiction, Web Story.It is an  Artistically creative Novel about the Best Story about the Best Book written by the Best Author.",
            shares: [{ share: "twitter", via: "DPerfectAuthor", hashtags: "theperfectauthor" }, "facebook", "googleplus"]
        });