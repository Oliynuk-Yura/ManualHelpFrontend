var friendsCart = function (friend) {
    var html = "";

    html += '<div class="col-md-6 col-sm-6">'
        html += '<div class="friend-card">'
         html += "<img src='images/covers/1.jpg' alt='profile-cover' class='img-responsive cover' />"
            html += '<div class="card-info">'
                html += "<img src=" + friend.avatarPath + " alt='user' class='profile-photo-lg' />"
                html += '<div class="friend-info">'
                    html += '<a href="#" class="pull-right text-green">My Friend</a>'
                    html += "<h5><a href='timeline.html' class='profile-link'>" + friend.firstName + "</a></h5>"
                    html += "<p>" + friend.lastName + "</p>"
                html += '</div>'
            html += '</div>'
        html += '</div>'
    html += '</div>'

    return html;

};

function GetAllFriends(idUser) {
    $.ajax({
        url: 'api/values/GetListFriends/' + idUser,
        type: 'GET',
        dataType: 'json',
        contentType: "application/json",
        success: function (result) {
            //if (IsNullOrEmpty(result)) {
            //    alert("Server returned null.");
            //}
            //else
            if (result.Success) {

                alert("Server responded an error: " + result.ErrorMessage);
            }
            else {
                // alert("s");
                var friendsCarts = "";

                $.each(result.content, function (index, user) {

                    friendsCarts += friendsCart(user);

                })

                $("#result").children().append(friendsCarts);
            }
        },
        error: function (error) {
            alert(error.responseText);
        }

    });
}