var MainActivity = {
    onReady: function () {
        this.renderResources();
        this.renderBlogPosts();
    },

    renderResources: function () {
        let activityFilePath = "../../resources/activity.json";
        $.getJSON(activityFilePath, function(data) {

            let activityItems = data.activity.items;
            activityItems.forEach(MainActivity.createResourceElement)
        })
    },

    createResourceElement: function (resourceData) {
        let simpleResourceTemplate = $("#resource-entry").html();
        let simpleResource = $(simpleResourceTemplate);

        simpleResource.find(".j_title").text( resourceData.title );
        simpleResource.find(".j_summary").html( resourceData.summary );
        simpleResource.find(".j_post_send").attr("href", resourceData.link);

        let postsContainer = $("#news-container");
        postsContainer.prepend(simpleResource);
    },

    createPostElement: function(postData) {
        let simplePostTemplate = $("#blog-entry").html();
        let simplePost = $(simplePostTemplate);
        let postContent = postData.description;

        let firstParagraphEnding = postContent.indexOf("\n", 1);

        if(firstParagraphEnding < 250) {
            firstParagraphEnding = postContent.indexOf("\n", firstParagraphEnding + 1);
        }

        let firstParagraph = MainActivity.cleanupContentPost(postContent.substring(0, firstParagraphEnding));

        simplePost.find(".j_title").text( postData.title );
        simplePost.find(".j_summary").html( firstParagraph );
        simplePost.find(".j_post_send").attr("href", postData.link);

        $("figure", simplePost).remove();

        let postsContainer = $("#news-container");
        postsContainer.append(simplePost);
    },

    renderBlogPosts: function() {
        let userUrl = "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@mote_enrique";

        let success_callback = function (data) {

            let posts = data['items'];
            posts.forEach(MainActivity.createPostElement)
        }

        $.ajax({
            url: userUrl,
            success: success_callback
          });
    },

    cleanupContentPost: function(content) {
        let doc = new DOMParser().parseFromString(content, 'text/html');
        return doc.body.textContent || "";
    }
};

(function ($, window, document) {

    $(function () {
        MainActivity.onReady();
    });

}(window.jQuery, window, document));