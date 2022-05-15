function prom(my_url) {
    return new Promise(function(resolve, reject) {
        let http = new XMLHttpRequest();
        http.open('GET', my_url, true);

        http.responseType = 'json';

        http.onload = function() {
            if(http.status == 200) {
                resolve(http.response);
            }
            else {
                reject({"status": http.status, "response": http.statusText});
            }
        };

        http.onerror = function() {
            reject("Error");
        };

        http.send();

    })
}

function load() {
    prom("https://reqres.in/api/users?page=2").then(function(res) {
            // console.log(res);
            place(res);
        }).catch(function (error) {
            console.log(error);
        });
}

function place(res) {
    $("#content ul").html("")
    let data = res['data'];
    // console.log(data);
    let parent = $("div#content ul");
    $.each(data, function(key, value) {
        parent.append("<li>"+value['id']+"</li>");
        $("#content ul li").append("<ul></ul>");
        $.each(value, function(nkey, nvalue) {
            $("#content ul li ul").last().append("<li>"+nkey + nvalue +"</li>");
            // console.log(nvalue);
        });
    });
}