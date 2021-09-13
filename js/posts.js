var Posts = {
    onReady: function () {
        this.getMediumPosts();
    },

    createMainPostElement: function(postData) {
        let mainPostTemplate = $("#main-post").html();
        let mainPost = $(mainPostTemplate);

        let postContent = postData.description;

        var firstParagraphEnding = postContent.indexOf("\n", 1);

        if(firstParagraphEnding < 250) {
            firstParagraphEnding = postContent.indexOf("\n", firstParagraphEnding + 1);
        }

        let firstParagraph = postContent.substring(0, firstParagraphEnding);

        mainPost.find(".j_title").text( postData.title );
        mainPost.find(".j_summary").html( firstParagraph );

        $("figure", mainPost).remove();

        let postsContainer = $("#main-post-container");
        postsContainer.append(mainPost);
    },

    createPostElement: function(postData) {
        let simplePostTemplate = $("#simple-post").html();
        let simplePost = $(simplePostTemplate);
        let postContent = postData.description;

        var firstParagraphEnding = postContent.indexOf("\n", 1);

        if(firstParagraphEnding < 250) {
            firstParagraphEnding = postContent.indexOf("\n", firstParagraphEnding + 1);
        }

        let firstParagraph = postContent.substring(0, firstParagraphEnding);

        simplePost.find(".j_title").text( postData.title );
        simplePost.find(".j_summary").html( firstParagraph );

        $("figure", simplePost).remove();

        let postsContainer = $("#posts-container");
        postsContainer.append(simplePost);
    },

    getMediumPosts: function() {
        let userUrl = "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@mote_enrique";

        success_callback = function(data) {
            
            let posts = data['items'];
            var randomPost = Math.floor(Math.random() * (posts.length - 0));

            Posts.createMainPostElement(posts[randomPost]);

            for(postIdx = 0; postIdx < posts.length; postIdx++) {

                if(postIdx === randomPost) {
                    continue;
                }

                console.log("Creating submain post no: " + postIdx)
                Posts.createPostElement(posts[postIdx]);
            }

        }

        $.ajax({
            url: userUrl,
            success: success_callback
          });
    }
};

(function ($, window, document) {

    $(function () {
        Posts.onReady();
    });

}(window.jQuery, window, document));